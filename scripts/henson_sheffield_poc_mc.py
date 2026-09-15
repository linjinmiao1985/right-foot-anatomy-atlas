#!/usr/bin/env python3
"""
Henson Sheffield one-subject marching-cubes POC (gastroc med/lat + soleus).

Downloads are expected at:
  third_party/henson-sheffield/downloads/Aug_8_segmentations.dcm

Outputs (gitignored):
  third_party/henson-sheffield/poc/meshes/*.obj|.glb
  third_party/henson-sheffield/poc/spatial_qa_raw.json

Committed summary (small):
  third_party/henson-sheffield/poc_spatial_qa.json

DOES NOT write to public/models/ or structures.json.
"""
from __future__ import annotations

import json
import math
from pathlib import Path

import numpy as np
import pydicom
import trimesh
from skimage import measure

ROOT = Path(__file__).resolve().parents[1]
DICOM = ROOT / "third_party/henson-sheffield/downloads/Aug_8_segmentations.dcm"
POC = ROOT / "third_party/henson-sheffield/poc"
MESH_DIR = POC / "meshes"
SUMMARY = ROOT / "third_party/henson-sheffield/poc_spatial_qa.json"
ACHILLES = ROOT / "public/models/right-foot/calcaneal_tendon_BP5098.glb"
CALCANEUS = ROOT / "public/models/right-foot/calcaneus_BP9040.glb"

# Greyscale encoding: class_id i -> round(i * 255 / 37) (verified on Aug_8)
CLASSES = {
    10: "gastrocnemius_lateralis",
    11: "gastrocnemius_medialis",
    31: "soleus",
}
SPACING_MM = (1.0, 1.0, 1.0)  # paper: resampled isotropic 1 mm

# Andreassen / atlas gates (teaching sketch; not clinical)
ACHILLES_DISTAL10_MAX_MM = 15.0
FOOT_PAD_MM = 40.0


def class_to_grey(class_id: int) -> int:
    return int(round(class_id * 255 / 37))


def load_volume(path: Path) -> np.ndarray:
    ds = pydicom.dcmread(str(path), force=True)
    arr = ds.pixel_array  # (Z, Y, X)
    if arr.ndim != 3:
        raise RuntimeError(f"expected 3D volume, got {arr.shape}")
    return arr


def marching_cubes_mm(mask: np.ndarray, spacing: tuple[float, float, float]):
    if mask.sum() == 0:
        return None
    verts, faces, normals, _ = measure.marching_cubes(
        mask.astype(np.float32), level=0.5, spacing=spacing
    )
    mesh = trimesh.Trimesh(vertices=verts, faces=faces, vertex_normals=normals, process=True)
    return mesh


def mesh_stats(mesh: trimesh.Trimesh) -> dict:
    bmin, bmax = mesh.bounds
    return {
        "n_verts": int(len(mesh.vertices)),
        "n_faces": int(len(mesh.faces)),
        "volume_mm3_approx": float(mesh.volume) if mesh.is_watertight else None,
        "aabb_min_mm": [float(x) for x in bmin],
        "aabb_max_mm": [float(x) for x in bmax],
        "centroid_mm": [float(x) for x in mesh.centroid],
        "extents_mm": [float(x) for x in (bmax - bmin)],
    }


def load_glb(path: Path) -> trimesh.Trimesh:
    m = trimesh.load(str(path), force="mesh")
    if isinstance(m, trimesh.Scene):
        m = trimesh.util.concatenate(list(m.geometry.values()))
    return m


def min_dist(a: np.ndarray, b: np.ndarray, sample_a: int = 4000) -> float:
    """Approximate nearest distance (mm) from points a to points b."""
    if len(a) > sample_a:
        rng = np.random.default_rng(0)
        a = a[rng.choice(len(a), sample_a, replace=False)]
    # chunked brute force for POC scale
    best = np.full(len(a), np.inf)
    step = 8000
    for i in range(0, len(b), step):
        chunk = b[i : i + step]
        # (Na, Nc)
        d = np.linalg.norm(a[:, None, :] - chunk[None, :, :], axis=2)
        best = np.minimum(best, d.min(axis=1))
    return float(best.min())


def distal_fraction_verts(mesh: trimesh.Trimesh, axis: int, low: bool, frac: float = 0.1):
    v = mesh.vertices
    vals = v[:, axis]
    thr = np.quantile(vals, frac if low else 1.0 - frac)
    if low:
        return v[vals <= thr]
    return v[vals >= thr]


def apply_similarity(verts: np.ndarray, scale: float, R: np.ndarray, t: np.ndarray) -> np.ndarray:
    return (scale * (verts @ R.T)) + t


def kabsch(P: np.ndarray, Q: np.ndarray):
    """Rigid R,t mapping P->Q (both Nx3)."""
    pc, qc = P.mean(0), Q.mean(0)
    X, Y = P - pc, Q - qc
    H = X.T @ Y
    U, _, Vt = np.linalg.svd(H)
    R = Vt.T @ U.T
    if np.linalg.det(R) < 0:
        Vt[-1, :] *= -1
        R = Vt.T @ U.T
    t = qc - R @ pc
    return R, t


def main():
    MESH_DIR.mkdir(parents=True, exist_ok=True)
    if not DICOM.exists():
        raise SystemExit(f"missing DICOM: {DICOM}")

    vol = load_volume(DICOM)
    print("volume", vol.shape, vol.dtype)

    grey_map = {cid: class_to_grey(cid) for cid in CLASSES}
    print("class→grey", grey_map)

    meshes = {}
    native = {}
    for cid, name in CLASSES.items():
        g = grey_map[cid]
        mask = vol == g
        n = int(mask.sum())
        print(f"{name} (class {cid} grey {g}): {n} voxels")
        mesh = marching_cubes_mm(mask, SPACING_MM)
        if mesh is None:
            native[name] = {"error": "empty_mask", "voxels": 0}
            continue
        # skimage returns (z,y,x) spacing order matching array axes → verts in (Z,Y,X) mm
        # Remap to (X,Y,Z) for conventional mesh export
        v = mesh.vertices.copy()
        mesh.vertices = np.column_stack([v[:, 2], v[:, 1], v[:, 0]])
        meshes[name] = mesh
        st = mesh_stats(mesh)
        st["class_id"] = cid
        st["grey_value"] = g
        st["voxels"] = n
        native[name] = st
        obj_path = MESH_DIR / f"{name}.obj"
        glb_path = MESH_DIR / f"{name}.glb"
        mesh.export(obj_path)
        mesh.export(glb_path)
        print(f"  wrote {obj_path.name} verts={st['n_verts']} AABB={st['aabb_min_mm']}..{st['aabb_max_mm']}")

    ach = load_glb(ACHILLES)
    calc = load_glb(CALCANEUS)
    ach_stats = mesh_stats(ach)
    calc_stats = mesh_stats(calc)
    foot_bmin = calc.bounds[0] - FOOT_PAD_MM
    foot_bmax = calc.bounds[1] + FOOT_PAD_MM
    # expand with Achilles too
    foot_bmin = np.minimum(foot_bmin, ach.bounds[0] - FOOT_PAD_MM)
    foot_bmax = np.maximum(foot_bmax, ach.bounds[1] + FOOT_PAD_MM)

    # --- Native MRI anatomy sanity (no BP3D) ---
    # In this volume axis convention after remap: X=col, Y=row, Z=slice.
    # Gastroc med vs lat should separate along a medial-lateral axis.
    laterality_native = {}
    if "gastrocnemius_medialis" in meshes and "gastrocnemius_lateralis" in meshes:
        cm = np.array(native["gastrocnemius_medialis"]["centroid_mm"])
        cl = np.array(native["gastrocnemius_lateralis"]["centroid_mm"])
        delta = cm - cl
        laterality_native = {
            "med_minus_lat_centroid_mm": [float(x) for x in delta],
            "dominant_separation_axis": ["X", "Y", "Z"][int(np.argmax(np.abs(delta)))],
            "dominant_separation_mm": float(np.max(np.abs(delta))),
            "note": "MRI subject frame — not BP3D. Separation confirms med/lat masks distinct.",
        }

    # Distal tip of soleus / gastrocs: lowest Z in native (slice axis after remap is Z)
    native_distal = {}
    for name, mesh in meshes.items():
        # try both ends of Z and of each axis — report lowest-Z tip (ankle-ward if Z increases proximal)
        zmin_idx = int(np.argmin(mesh.vertices[:, 2]))
        zmax_idx = int(np.argmax(mesh.vertices[:, 2]))
        native_distal[name] = {
            "zmin_point_mm": [float(x) for x in mesh.vertices[zmin_idx]],
            "zmax_point_mm": [float(x) for x in mesh.vertices[zmax_idx]],
            "z_extent_mm": float(mesh.bounds[1][2] - mesh.bounds[0][2]),
        }

    # --- BP3D alignment sketches ---
    # Landmark sketch: map MRI distal tips of three bellies → Achilles proximal/distal band,
    # and med/lat gastroc centroids → left/right of Achilles (with optional X flip for right-side).
    trials = []

    def evaluate(label: str, transformed: dict[str, np.ndarray]):
        results = {}
        all_right = True
        achilles_ok = True
        for name, verts in transformed.items():
            wrong_side = bool(np.all(verts[:, 0] > 0))
            inside = np.all((verts >= foot_bmin) & (verts <= foot_bmax), axis=1)
            frac_inside = float(inside.mean())
            # distal 10% toward Achilles: Achilles spans Z ~ -56..158; distal attachment near calcaneus (low Z)
            # Use verts with lowest Z as distal-ish after transform
            z = verts[:, 2]
            thr = np.quantile(z, 0.10)
            distal = verts[z <= thr]
            d_ach = min_dist(distal, ach.vertices, sample_a=2000)
            d_all = min_dist(verts, ach.vertices, sample_a=3000)
            results[name] = {
                "wrong_side_all_X_gt_0": wrong_side,
                "frac_inside_padded_foot_aabb": frac_inside,
                "centroid_mm": [float(x) for x in verts.mean(0)],
                "aabb_min_mm": [float(x) for x in verts.min(0)],
                "aabb_max_mm": [float(x) for x in verts.max(0)],
                "min_to_achilles_mm": d_all,
                "distal10_min_to_achilles_mm": d_ach,
                "achilles_distal10_ok": d_ach < ACHILLES_DISTAL10_MAX_MM,
            }
            if wrong_side:
                all_right = False
            if d_ach >= ACHILLES_DISTAL10_MAX_MM:
                achilles_ok = False
        integrate = all_right and achilles_ok and all(
            results[n]["frac_inside_padded_foot_aabb"] > 0.05 for n in results
        )
        # stricter: require at least some foot presence; still teaching sketch
        return {
            "label": label,
            "right_side_ok": all_right,
            "achilles_reasonable_all": achilles_ok,
            "integrate_gate": False if not integrate else False,  # never auto-pass wire
            "would_sketch_pass_laterality_and_achilles": bool(all_right and achilles_ok),
            "meshes": results,
            "note": "integrate_gate forced false — POC must not wire even if sketch looks close",
        }

    if len(meshes) == 3:
        # Build source landmarks in MRI frame
        src = []
        # med/lat centroids
        src.append(meshes["gastrocnemius_medialis"].vertices.mean(0))
        src.append(meshes["gastrocnemius_lateralis"].vertices.mean(0))
        # distal tips = min Z of each belly
        for name in ("gastrocnemius_medialis", "gastrocnemius_lateralis", "soleus"):
            v = meshes[name].vertices
            src.append(v[np.argmin(v[:, 2])])
        src = np.array(src)

        # Target landmarks in BP3D: med/lat offsets around Achilles centroid; distal → Achilles low-Z band
        ach_c = ach.centroid
        ach_low = ach.vertices[ach.vertices[:, 2] <= np.quantile(ach.vertices[:, 2], 0.15)]
        ach_low_c = ach_low.mean(0)
        # BP3D right: negative X; place med more medial (more negative X), lat less negative
        tgt = np.array(
            [
                ach_c + np.array([-25.0, 0.0, 40.0]),  # med
                ach_c + np.array([-5.0, 0.0, 40.0]),  # lat
                ach_low_c + np.array([-20.0, 0.0, 5.0]),
                ach_low_c + np.array([-8.0, 0.0, 5.0]),
                ach_low_c + np.array([-14.0, 0.0, 0.0]),
            ]
        )

        for flip_x in (False, True):
            src_try = src.copy()
            if flip_x:
                src_try[:, 0] *= -1
            R, t = kabsch(src_try, tgt)
            transformed = {}
            for name, mesh in meshes.items():
                v = mesh.vertices.copy()
                if flip_x:
                    v[:, 0] *= -1
                transformed[name] = (v @ R.T) + t
            trials.append(
                evaluate(f"kabsch_distalZ_landmarks_flipX={flip_x}", transformed)
            )

        # Also: pure translate so soleus distal → Achilles low + optional X flip + scale by calf Z extent vs Achilles Z span*2
        sole = meshes["soleus"].vertices
        sole_dist = sole[np.argmin(sole[:, 2])]
        for flip_x in (False, True):
            for scale in (1.0, 0.85, 1.15):
                transformed = {}
                for name, mesh in meshes.items():
                    v = mesh.vertices.copy()
                    if flip_x:
                        v[:, 0] *= -1
                    # translate distal soleus to Achilles low centroid, then scale about that point
                    v = v - sole_dist
                    if flip_x:
                        # sole_dist already used pre-flip inconsistently — recompute
                        pass
                    v = scale * v + ach_low_c
                    transformed[name] = v
                # fix flip+translate properly
                transformed = {}
                sd = sole_dist.copy()
                if flip_x:
                    sd[0] *= -1
                for name, mesh in meshes.items():
                    v = mesh.vertices.copy()
                    if flip_x:
                        v[:, 0] *= -1
                    v = scale * (v - sd) + ach_low_c
                    transformed[name] = v
                trials.append(
                    evaluate(
                        f"translate_scale_soleusDistal_to_achillesLow_flipX={flip_x}_scale={scale}",
                        transformed,
                    )
                )

    any_sketch_pass = any(t["would_sketch_pass_laterality_and_achilles"] for t in trials)
    best = None
    if trials:
        # rank by sum of distal10 gaps
        def score(t):
            return sum(m["distal10_min_to_achilles_mm"] for m in t["meshes"].values())

        best = min(trials, key=score)

    summary = {
        "date": "2026-09-15",
        "day": "4bj",
        "subject": "Aug_8_segmentations.dcm",
        "figshare_file_id": 36572283,
        "doi_labels": "10.15131/shef.data.20440203",
        "license": "CC0",
        "spacing_mm": list(SPACING_MM),
        "spacing_source": "Henson et al. PLoS ONE 2023 — sequences homogenized to 1×1×1 mm before augmentation",
        "volume_shape_zyx": list(vol.shape),
        "greyscale_class_encoding": "round(class_id * 255 / 37)",
        "classes": {str(k): v for k, v in CLASSES.items()},
        "marching_cubes": "skimage.measure.marching_cubes level=0.5",
        "native_mri_frame": native,
        "laterality_native": laterality_native,
        "native_distal_tips": native_distal,
        "bp3d_references": {
            "achilles_glb": str(ACHILLES.relative_to(ROOT)),
            "achilles": ach_stats,
            "calcaneus": calc_stats,
            "padded_foot_aabb_pad_mm": FOOT_PAD_MM,
        },
        "alignment_trials": trials,
        "best_trial_by_achilles_distal10_sum": best,
        "qa_verdict": {
            "mc_surfaces_extracted": len(meshes) == 3,
            "bp3d_right_side_and_achilles_continuity": bool(any_sketch_pass),
            "wire_into_atlas": False,
            "reason": (
                "MC OK for classes 10/11/31; crude landmark/translate sketches "
                + (
                    "did NOT clearly pass right-side + Achilles distal10<15 mm for all three bellies — do not wire."
                    if not any_sketch_pass
                    else "may look close on a sketch trial, but registration is unproven (no bone landmarks / no donor Kabsch) — still do NOT wire."
                )
            ),
        },
        "outputs_gitignored": [
            "third_party/henson-sheffield/downloads/Aug_8_segmentations.dcm",
            "third_party/henson-sheffield/poc/meshes/",
        ],
        "andreassen": "skipped — not re-opened",
    }

    POC.mkdir(parents=True, exist_ok=True)
    raw_path = POC / "spatial_qa_raw.json"
    raw_path.write_text(json.dumps(summary, indent=2))
    # committed summary: drop bulky per-trial mesh dumps if huge — keep all for now (should be small)
    SUMMARY.write_text(json.dumps(summary, indent=2))
    print("wrote", SUMMARY)
    print("QA verdict:", json.dumps(summary["qa_verdict"], indent=2))
    if best:
        print("best trial:", best["label"], "sketch_pass=", best["would_sketch_pass_laterality_and_achilles"])


if __name__ == "__main__":
    main()
