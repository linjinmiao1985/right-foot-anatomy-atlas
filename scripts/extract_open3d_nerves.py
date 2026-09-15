#!/usr/bin/env python3
"""Extract RIGHT foot nerve meshes from Open3D lower-limb.obj,
apply third_party/open3dmodel/open3d_to_bp3d_transform.json Kabsch, write
raw OBJ under third_party/open3dmodel/extracted/ and GLB under
public/models/right-foot/by-sa/ via obj2gltf.

Day 4x — common + proper plantar digitals + deep branch of lateral plantar
(max 4 new nerve entries; quality over volume).
"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_SRC = Path("/workspace/literature/open3d-assets/lower-limb.obj")
XFORM = ROOT / "third_party/open3dmodel/open3d_to_bp3d_transform.json"
RAW_OUT = ROOT / "third_party/open3dmodel/extracted"
BYSA = ROOT / "public/models/right-foot/by-sa"

# Max 4 new atlas nerve entries this pass (prefer quality).
TARGETS = {
    "Common_plantar_digital_nerves.r": "common_plantar_digital_nerves",
    "Proper_plantar_digital_branches_(Medial_plantar_nerve).r": "proper_plantar_digital_nerves_medial",
    "Proper_plantar_digital_branches_(Lateral_plantar_nerve).r": "proper_plantar_digital_nerves_lateral",
    "Deep_branch_of_Lateral_plantar_nerve.r": "deep_branch_lateral_plantar_nerve",
}


def main() -> int:
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_SRC
    if not src.is_file():
        print(f"Missing source OBJ: {src}", file=sys.stderr)
        return 1
    xf = json.loads(XFORM.read_text())
    scale = float(xf["scale"])
    R = np.array(xf["R"], dtype=float)
    t = np.array(xf["t_mm"], dtype=float)

    def transform_v(v: np.ndarray) -> np.ndarray:
        return scale * (R @ v) + t

    def transform_n(n: np.ndarray) -> np.ndarray:
        nn = R @ n
        norm = np.linalg.norm(nn)
        return nn / norm if norm > 1e-12 else nn

    want = set(TARGETS)
    current = None
    objs: dict[str, dict] = {}
    all_v: list[tuple[float, float, float]] = []
    all_vn: list[tuple[float, float, float]] = []

    def ensure(name: str) -> None:
        objs.setdefault(name, {"v_idx": [], "vn_idx": [], "faces": []})

    with src.open("r", encoding="utf-8", errors="replace") as f:
        for line in f:
            if line.startswith("o "):
                name = line[2:].strip()
                current = name if name in want else None
                if current:
                    ensure(current)
                continue
            if line.startswith("v "):
                parts = line.split()
                all_v.append((float(parts[1]), float(parts[2]), float(parts[3])))
                continue
            if line.startswith("vn "):
                parts = line.split()
                all_vn.append((float(parts[1]), float(parts[2]), float(parts[3])))
                continue
            if current is None:
                continue
            if line.startswith("f "):
                face = []
                for tok in line.split()[1:]:
                    bits = tok.split("/")
                    vi = int(bits[0])
                    vni = int(bits[2]) if len(bits) >= 3 and bits[2] else None
                    face.append((vi, vni))
                objs[current]["faces"].append(face)
                for vi, vni in face:
                    objs[current]["v_idx"].append(vi)
                    if vni is not None:
                        objs[current]["vn_idx"].append(vni)

    missing = want - set(objs)
    if missing:
        print(f"Missing objects: {missing}", file=sys.stderr)
        return 1

    RAW_OUT.mkdir(parents=True, exist_ok=True)
    BYSA.mkdir(parents=True, exist_ok=True)
    aabb_report = {}

    for src_name, out_stem in TARGETS.items():
        data = objs[src_name]
        used_v: list[int] = []
        v_map: dict[int, int] = {}
        for vi in data["v_idx"]:
            if vi not in v_map:
                v_map[vi] = len(used_v) + 1
                used_v.append(vi)
        used_vn: list[int] = []
        vn_map: dict[int, int] = {}
        for vni in data["vn_idx"]:
            if vni not in vn_map:
                vn_map[vni] = len(used_vn) + 1
                used_vn.append(vni)

        raw_path = RAW_OUT / f"{out_stem}.obj"
        with raw_path.open("w") as out:
            out.write(f"# Extracted from Open3DModel lower-limb.obj — {src_name}\n")
            out.write("# License: CC BY-SA 4.0 — AnatomyTOOL Open3D create\n")
            out.write(f"o {src_name}\n")
            for vi in used_v:
                x, y, z = all_v[vi - 1]
                out.write(f"v {x:.6f} {y:.6f} {z:.6f}\n")
            for vni in used_vn:
                x, y, z = all_vn[vni - 1]
                out.write(f"vn {x:.6f} {y:.6f} {z:.6f}\n")
            for face in data["faces"]:
                bits = []
                for vi, vni in face:
                    if vni is not None and vni in vn_map:
                        bits.append(f"{v_map[vi]}//{vn_map[vni]}")
                    else:
                        bits.append(f"{v_map[vi]}")
                out.write("f " + " ".join(bits) + "\n")

        baked_obj = Path("/tmp") / f"{out_stem}_bp3d.obj"
        verts_mm = []
        with baked_obj.open("w") as out:
            out.write(f"# Open3D {src_name} Kabsch-baked to BP3D mm\n")
            out.write(f"o {out_stem}\n")
            for vi in used_v:
                vt = transform_v(np.array(all_v[vi - 1], dtype=float))
                verts_mm.append(vt)
                out.write(f"v {vt[0]:.6f} {vt[1]:.6f} {vt[2]:.6f}\n")
            for vni in used_vn:
                nt = transform_n(np.array(all_vn[vni - 1], dtype=float))
                out.write(f"vn {nt[0]:.6f} {nt[1]:.6f} {nt[2]:.6f}\n")
            for face in data["faces"]:
                bits = []
                for vi, vni in face:
                    if vni is not None and vni in vn_map:
                        bits.append(f"{v_map[vi]}//{vn_map[vni]}")
                    else:
                        bits.append(f"{v_map[vi]}")
                out.write("f " + " ".join(bits) + "\n")

        V = np.array(verts_mm)
        aabb_report[out_stem] = {
            "x": [float(V[:, 0].min()), float(V[:, 0].max())],
            "y": [float(V[:, 1].min()), float(V[:, 1].max())],
            "z": [float(V[:, 2].min()), float(V[:, 2].max())],
            "centroid": [float(V[:, 0].mean()), float(V[:, 1].mean()), float(V[:, 2].mean())],
            "n_verts": int(len(V)),
            "n_faces": int(len(data["faces"])),
            "open3d_object": src_name,
        }
        glb_path = BYSA / f"{out_stem}.glb"
        r = subprocess.run(
            ["obj2gltf", "-i", str(baked_obj), "-o", str(glb_path)],
            capture_output=True,
            text=True,
        )
        if r.returncode != 0:
            print(r.stdout, r.stderr, file=sys.stderr)
            return 1
        print(f"OK {out_stem}: {glb_path} ({glb_path.stat().st_size} B)")

    report = ROOT / "third_party/open3dmodel/nerve_extract_aabb.json"
    report.write_text(
        json.dumps(
            {
                "source": str(src),
                "transform": str(XFORM.relative_to(ROOT)),
                "method": "reuse Open3D→BP3D Kabsch (Day 4m; same donor as DI/arteries/ligaments); Day 4x nerves",
                "kabsch_mean_residual_mm": xf.get("mean_residual_mm"),
                "targets": TARGETS,
                "aabb_bp3d_mm": aabb_report,
            },
            indent=2,
        )
        + "\n"
    )
    print("Wrote", report)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
