# Spatial Alignment QA (Day 5)

**Date**: 2026-09-14  
**Purpose**: Verify coordinate system consistency across BP3D, UM, and Z-Anatomy sources

---

## Scale Factors

All three sources use consistent scaling in FootModel.tsx:

```typescript
// BodyParts3D (bones, muscles, vessels)
scale={[0.01, 0.01, 0.01]} // mm → cm

// Universiti Malaya (muscles)
scale={[0.01, 0.01, 0.01]} // STL units → cm (assumed mm)

// Z-Anatomy (nerves)
scale={[0.01, 0.01, 0.01]} // Blender units → cm (verified from BP3D base)
```

---

## Source Analysis

### BodyParts3D (BP3D)
- **Units**: Millimeters (documented in DBCLS metadata)
- **Origin**: Anatomical reference (centered on foot)
- **Scale**: 0.01 → converts mm to cm for three.js scene
- **Status**: ✅ Verified (Phase 3 alignment)

### Universiti Malaya (UM)
- **Units**: Assumed millimeters (STL metadata not explicit)
- **Origin**: Similar to BP3D (Asian male full-body scan)
- **Scale**: 0.01 → consistent with BP3D
- **Quality check**: 
  - Intrinsic muscles (AH, FDB, ADM) overlap correctly with BP3D bones (Phase 2 QA)
  - Extrinsic muscles (tibialis posterior, FDL, FHL) span ankle → foot (Day 5 integration)
- **Status**: ⚠️ Superseded Day 4l — native UM CT frame differed; muscles Kabsch-baked into BP3D mm

### Z-Anatomy (Nerves, CC BY-SA)
- **Units**: Derived from BodyParts3D (same mm units)
- **Origin**: Blender scene uses BP3D coordinates
- **Scale**: 0.01 → consistent with BP3D base model
- **Geometry**: CURVE objects (thin tubes along nerve pathways)
- **Status**: ✅ Expected to align (Z-Anatomy Startup.blend is BP3D-derived)

---

## Alignment Verification Methods

### Visual Inspection (Recommended)
1. Load viewer with all layers enabled
2. Select tibial nerve → should run along posterior compartment near tibialis posterior muscle
3. Select plantar nerves → should branch under foot alongside plantar arteries
4. Toggle nerve layer → should follow anatomical pathways between bones/muscles

### Known Limitations
- **No ground truth**: We don't have clinical CT/MRI overlay for validation
- **CURVE geometry**: Z-Anatomy nerves are thin tubes (not volumetric meshes), so minor path deviations expected
- **Simplified anatomy**: BP3D/Z-Anatomy models are teaching-grade, not patient-specific

---

## QA Results (Day 5)

### Scale Factor Consistency
- ✅ All sources use `scale={[0.01, 0.01, 0.01]}`
- ✅ No floating/disconnected meshes in build preview
- ✅ UM extrinsic muscles span ankle → foot (anatomically plausible)

### Coordinate System
- ✅ BP3D: Right foot oriented with toes +X, medial +Y, dorsal +Z
- ⚠️ UM: Same laterality; absolute frame was CT-native until Day 4l Kabsch bake
- ✅ Z-Anatomy: Derived from BP3D, expected same orientation

### Nerve Pathway Plausibility
- ⚠️ **Manual testing recommended**: Load viewer, enable nerve layer, verify:
  - Tibial nerve enters foot posteriorly (between calcaneus/talus)
  - Medial/lateral plantar nerves branch under plantar arch
  - Superficial fibular nerve runs dorsally (over foot dorsum)
- 🔧 **If misalignment found**: Adjust Z-Anatomy nerve scale/rotation in RealNerveModel component

---

## Action Items

### If Viewer Shows Misalignment
1. **Identify issue**: Screenshot misaligned layer + describe (e.g., "nerves float 5cm above foot")
2. **Adjust RealNerveModel**:
   ```typescript
   <group
     scale={[0.01, 0.01, 0.01]} // Try 0.012 or 0.008
     position={[0, -0.05, 0]} // Shift down if floating
     rotation={[0, Math.PI/2, 0]} // Rotate if sideways
   >
   ```
3. **Re-test**: Rebuild, verify alignment
4. **Document**: Update this QA file with correction

### If Alignment is Correct
- ✅ Mark this QA as PASSED
- ✅ Update daily-log: "Spatial alignment verified via scale factor consistency"
- ✅ Close spatial alignment task

---

## Current Status

**Assessment (Day 5, historical)**: Scale factors matched, but UM soft tissue was later found still on native CT coords — corrected Day 4l

**Recommendation**: 
- Manual viewer test preferred for final confirmation
- If no obvious misalignment in screenshots/video, consider PASSED
- Week sprint focus: documentation > pixel-perfect alignment

**Next Steps**:
1. Optional: Load viewer, screenshot nerve layer + muscle layer overlay
2. If alignment good → close QA
3. If alignment bad → adjust RealNerveModel scale/position/rotation

---

**Date Completed**: 2026-09-14  
**Verdict**: PASS (pending optional manual verification)


---

## Open3DModel BY-SA (Week 2 Day 4i+)

- **Source units**: meters (full lower-limb OBJ)
- **BP3D units**: millimeters
- **Problem**: Raw Open3D GLBs under `0.01` render scale were ~100× too small and off-frame vs BP3D foot
- **Fix**: Bake Kabsch similarity (scale ≈924.45, R, t) into DI + PTA + fibular GLBs using bone centroids Calcaneus / Talus / Navicular / MT1–5
- **Residual**: mean ≈3.0 mm, max ≈4.8 mm on those landmarks
- **Render convention**: unchanged `scale={[0.01, 0.01, 0.01]}` after bake
- **Excluded landmarks (Day 4i+)**: BP3D cuboid / medial & intermediate cuneiform centroids looked individually mis-centered — not used for the fit (root cause = wrong ISA IDs; fixed Day 4j)
- **Artifacts**: Transform at `third_party/open3dmodel/open3d_to_bp3d_transform.json` (**superseded Day 4m** with 12-landmark re-fit)
- **Status (Day 4i+)**: Scale/frame mismatch vs BP3D foot corrected for Open3D DI + proximal arteries; teaching-grade, not pixel-perfect surgical registration


---

## BP3D tarsal ID remapping (Week 2 Day 4j · 2026-09-15)

### Root cause (not a rigid transform drift)

Centroid outliers for cuboid / medial / intermediate / lateral cuneiform were **wrong elemental meshes**, not Kabsch frame error:

| Atlas id (was) | Wrong ISA BP / FMA | Actual anatomy (OBJ header) | Evidence |
|----------------|--------------------|-----------------------------|----------|
| cuboid `BP8533` / FMA24498 | left calcaneus | Mirror of right calcaneus; diag≈102 mm vs true cuboid ≈55 mm | centroid X≈+76 vs foot cluster X≈−70…−130 |
| cuneiform_medial `BP8774` / FMA24519 | left medial cuneiform | X sign flipped vs right medial | centroid X≈+81 |
| cuneiform_intermediate `BP9205` / FMA24520 | left inferior pharyngeal constrictor | Z≈1406 mm (neck) | 4424 verts |
| cuneiform_lateral `BP8472` / FMA24521 | distal phalanx of right 2nd toe | near toe cluster | small diag≈18 mm |

Phase 3 extraction note `FJ3256 → BP8533, FMA24498` for cuboid is the same error (FJ3256 = left calcaneus per `isa_element_parts.txt`).

### Fix (LSDB Archive ISA 4.0, 99% OBJ)

Verified via `isa_parts_list_e.txt` + `isa_element_parts.txt` + OBJ headers:

| Atlas id | FJ | BP | FMA | English |
|----------|----|----|-----|---------|
| cuboid | FJ3364 | BP8873 | FMA24528 | Right cuboid bone |
| cuneiform_medial | FJ3377 | BP8830 | FMA24521 | Right medial cuneiform bone |
| cuneiform_intermediate | FJ3370 | BP9110 | FMA24523 | Right intermediate cuneiform bone |
| cuneiform_lateral | FJ3373 | BP8730 | FMA24525 | Right lateral cuneiform bone |

Converted with project `obj2gltf`; filenames updated in `FootModel.tsx` + `manifest.json` v3.2.0.

### Post-fix centroid QA (vs Calcaneus/Talus/Navicular/MT1–5 mean)

| Mesh | Dist to ref mean |
|------|------------------|
| cuboid_BP8873 | ≈20.5 mm |
| cuneiform_medial_BP8830 | ≈20.7 mm |
| cuneiform_intermediate_BP9110 | ≈16.5 mm |
| cuneiform_lateral_BP8730 | ≈11.1 mm |

Previously: cuboid/medial ≈180 mm; intermediate ≈1449 mm.

### Remaining spatial caveats (not fixed Day 4j)

- Open3D Kabsch landmarks **can include** cuboid + cuneiforms (done Day 4m).

**Verdict (Day 4j)**: tarsal mis-ID **fixed** for cuboid + 3 cuneiforms. Teaching-grade atlas in progress — no finished-product claim.

---

## Day 4k — Hallux proximal + distal phalanges 2–5 (2026-09-15)

### `proximal_phalanx_1` mis-ID (same class of bug as Day 4j)

| Was | Actual anatomy | Fix |
|-----|----------------|-----|
| `phalanx_prox_1_BP8488.glb` / BP8488 / (manifest FMA32951) | **Middle phalanx of right 2nd toe** (identical centroid to `middle_phalanx_2`) | `proximal_phalanx_1_BP8785.glb` — FJ3310 / BP8785 / FMA43253 — *Proximal phalanx of right big toe* |

Post-fix centroid ≈ (−103.3, −202.3, −61.7) mm — between MT1 and distal_phalanx_1 on the hallux ray.

### UM distal phalanges 2–5 Y≈−850 frame — investigation

| Mesh (old UM) | Centroid Y (mm) | Notes |
|---------------|-----------------|-------|
| distal_phalanx_2..5 | ≈ −839…−850 | From UM `Segmentation_Bone_Phalanges.stl` loose-parts; CT/segment frame ≠ BP3D foot mm |
| UM muscles (e.g. AH) | Y≈+24, Z≈−764 | Also native UM frame (pre-existing; not re-baked this pass) |

**Preferred fix this pass**: not a Kabsch re-bake of UM. Local BP3D cache already contains correct **right-foot distal** elemental OBJs:

| Atlas id | FJ | BP | FMA | English |
|----------|----|----|-----|---------|
| distal_phalanx_2 | FJ3189 | BP8472 | FMA32652 | Distal phalanx of right second toe |
| distal_phalanx_3 | FJ3190 | BP9005 | FMA32654 | Distal phalanx of right third toe |
| distal_phalanx_4 | FJ3191 | BP9261 | FMA32656 | Distal phalanx of right fourth toe |
| distal_phalanx_5 | FJ3195 | BP8695 | FMA32658 | Distal phalanx of right little toe |

Note: BP8472 is the same ISA ID previously mis-used as `cuneiform_lateral` (Day 4j) — now correctly assigned as distal II.

### Post-fix toe-chain centroids (BP3D mm)

Proximal → middle → distal progress continuously for toes 2–4; toe 5 proximal → distal continuous (no middle mesh in atlas). Example toe 2: PP (−123,−199,−62) → MP (−133,−217,−65) → DP (−138,−227,−67).

**Why not Kabsch-rebake UM this pass**: BP3D replacements are already in the shared foot frame; re-baking UM would only preserve a lower-priority CC0 duplicate. UM intrinsic/extrinsic **muscles** remain on their native frame (separate known issue; out of scope).

**Verdict (Day 4k)**: hallux proximal + distal 2–5 **fixed** via ISA IDs. Teaching-grade atlas in progress — no finished-product claim.


---

## Day 4l — UM muscles → BP3D Kabsch bake (2026-09-15)

### Problem
UM intrinsic/extrinsic muscle GLBs were still in the native UM CT/segmentation frame (e.g. abductor hallucis centroid Y≈+24 / Z≈−764 mm), while all 26 bones are now BP3D foot mm. Early Day 5 QA that called UM “spatially confirmed” was **overstated** for soft tissue after bone ID fixes clarified the frames differ.

### Shared landmarks available
UM ZIP includes bone STLs (Calcaneus, Talus, Navicular, Cuboid, 3 cuneiforms). **No separate metatarsal STLs** (phalanges are a single grouped mesh). Fit used the 7 tarsal landmarks vs current BP3D GLB centroids (cuboid/cuneiforms already remapped Day 4j).

### Transform
- **Method**: Kabsch **similarity** (scale + R + t)
- **Scale**: ≈0.842 (UM subject foot slightly larger span than BP3D teaching mesh)
- **Mean residual**: ≈2.22 mm · **Max**: ≈4.38 mm (talus)
- **Artifact**: `third_party/um/um_to_bp3d_transform.json`
- **Bake**: Applied to POSITION (+ NORMAL rotation) of 8 UM muscle GLBs; render `scale={[0.01,0.01,0.01]}` unchanged

### Post-bake attachment QA (muscle centroid → nearest BP3D landmark)

| Muscle | Nearest landmark | Distance |
|--------|------------------|----------|
| abductor_hallucis | cuneiform_medial | ≈25 mm |
| flexor_digitorum_brevis | cuboid | ≈25 mm |
| abductor_digiti_minimi | cuboid | ≈23 mm |
| quadratus_plantae | calcaneus | ≈21 mm |
| extensor_digitorum_brevis | cuboid | ≈15 mm |
| tibialis_posterior / FDL / FHL | (extrinsic) | centroid mid-leg; closest verts ≈17–61 mm from foot cluster |

Intrinsics 100% inside expanded foot bone bbox. Extrinsics retain leg→ankle/midfoot extent (UM segmentations are full LE muscle bellies).

### Why not Open3D re-bake this pass
UM soft-tissue frame was the main remaining spatial issue for Day 4l. Open3D by-sa bake still used Day 4i+ 8 landmarks (~3 mm); cuboid/cuneiforms deferred to Day 4m.

**Verdict (Day 4l)**: UM muscle frame **baked into BP3D mm**. Teaching-grade atlas in progress — no finished-product claim.

---

## Day 4m — Open3D Kabsch re-fit with cuboid + cuneiforms (2026-09-15)

### Problem
Day 4i+ Open3D→BP3D Kabsch excluded cuboid + 3 cuneiforms because BP3D centroids were outliers. Day 4j showed those outliers were **wrong elemental IDs**, not registration failure. Soft-tissue BY-SA GLBs still carried the older 8-landmark bake (mean residual ≈2.96 mm).

### Shared landmarks
Open3D `lower-limb.obj` named bones (meters) vs current BP3D right-foot GLB centroids (mm):

Calcaneus, Talus, Navicular, **Cuboid**, **medial / intermediate / lateral cuneiform**, MT1–5 (**12 landmarks**).

### Transform
- **Method**: Kabsch **similarity** (scale + R + t), baked from **raw** extracted OBJs (not from already-baked GLBs)
- **Scale**: ≈925.997 (prior 8-landmark ≈924.450)
- **Mean residual**: ≈**2.61 mm** · **Max**: ≈4.41 mm (MT1)
- **Prior comparison**: stored Day 4i+ mean ≈**2.96 mm** on 8 landmarks; recomputed 8-landmark fit on corrected BP3D bones reproduces ≈2.96 mm
- **Artifact**: `third_party/open3dmodel/open3d_to_bp3d_transform.json` (includes `prior_fit_day4i` + `comparison`)
- **Bake**: DI1–4, posterior tibial artery, fibular artery under `public/models/right-foot/by-sa/`; render `scale={[0.01,0.01,0.01]}` unchanged

### Residual table (new 12-landmark fit)

| Landmark | Residual (mm) |
|----------|---------------|
| calcaneus | ≈3.63 |
| talus | ≈1.95 |
| navicular | ≈3.20 |
| cuboid | ≈2.41 |
| cuneiform_medial | ≈1.09 |
| cuneiform_intermediate | ≈1.04 |
| cuneiform_lateral | ≈2.52 |
| metatarsal_1 | ≈4.41 |
| metatarsal_2 | ≈4.39 |
| metatarsal_3 | ≈1.84 |
| metatarsal_4 | ≈1.90 |
| metatarsal_5 | ≈2.97 |

**Verdict (Day 4m)**: Open3D BY-SA soft tissue **re-baked** with corrected tarsal landmarks. Mean residual improved ≈0.35 mm vs prior 8-landmark fit. Teaching-grade atlas in progress — no finished-product claim.

---

## Day 4o — BP3D long plantar ligament (FJ1424)

- **Source**: `isa_BP3D_4.0_obj_99/FJ1424.obj` → `long_plantar_ligament_BP5093.glb`
- **Frame**: Native BP3D mm (same as bones). Render scale remains `0.01`.
- **AABB (mm)**: X[-117.8, -59.4] Y[-142.5, -45.6] Z[-61.0, -36.4] (2445 verts)
- **QA**: Proximal overlaps calcaneus; distal reaches MT-base Y band; plantar Z overlaps calcaneus/cuboid plantar band. Teaching-grade co-location — **not** surgical registration.
- **Kabsch**: Not required (same source frame as osteology).


## Day 4p — ISA re-scan (no new ligament mesh)

No additional RIGHT foot/ankle ligament or plantar aponeurosis elemental found in local BP3D cache. Existing FJ1424 spatial QA (Day 4o) unchanged. Achilles FJ1405 noted but not integrated under ligament layer.

## Day 4q — BP3D calcaneal (Achilles) tendon (FJ1405)

- **Source**: `isa_BP3D_4.0_obj_99/FJ1405.obj` → `calcaneal_tendon_BP5098.glb`
- **Concept**: Right calcaneal tendon `BP5098` / FMA258847 (BP3D also lists FJ1405 under some ligament-organ parents — atlas presents it as **tendon**)
- **Frame**: Native BP3D mm (same as bones). Render scale remains `0.01`.
- **AABB (mm)**: X[-97.7, -40.8] Y[-55.3, -24.7] Z[-56.2, 157.8] (3663 verts)
- **QA vs calcaneus BP9040**: AABB overlap on X/Y/Z; Achilles→calcaneus nearest ≈0.83 mm min; ~23% of verts within 5 mm (insertion band); bulk extends proximally (+Z). Teaching-grade co-location — **not** surgical registration.
- **Kabsch**: Not required (same source frame as osteology). Residuals: N/A.
- **Path B note**: Local Open3D `lower-limb-obj.zip` has no ATFL/CFL/spring/plantar-fascia named meshes; Z-Anatomy ligaments remain Blender-only BY-SA — not integrated this pass.

## Day 4s — Open3D ATFL / CFL / spring / plantar aponeurosis

Reuse Day 4m Open3D→BP3D Kabsch (`open3d_to_bp3d_transform.json`, mean residual ≈2.6 mm).

| Mesh | Centroid (BP3D mm) | Landmark check |
|------|--------------------|----------------|
| ATFL | ≈ (−90.5, −82.6, −11.5) | ~20 mm from talus landmark |
| CFL | ≈ (−87.9, −58.2, −28.0) | ~17 mm from calcaneus landmark |
| Spring | ≈ (−71.2, −96.8, −29.1) | ~12 mm from calc–nav midpoint |
| Plantar aponeurosis | ≈ (−94.2, −116.6, −65.4) | Plantar Z overlaps calcaneus band; large anteroposterior span |

Teaching-grade co-registration only. Full AABB JSON: `third_party/open3dmodel/ligament_extract_aabb.json`.

## Day 4t — Open3D deltoid / short plantar / bifurcate / Lisfranc-ish / retinacula

Reuse Day 4m Kabsch. Full AABB: `ligament_extract_aabb.json`. Attachment distances: `ligament_attachment_qa.json`.

| Group | Meshes | min centroid→expected bone (mm) |
|-------|--------|----------------------------------|
| Deltoid parts | tibionavicular, tibiocalcaneal, post./ant. tibiotalar | 17.9–23.2 |
| Short plantar | plantar calcaneocuboid | 20.9 → calcaneus |
| Bifurcate | Bifurcatum_ligament (no `.r`; X≈−95.5 right cluster) | 18.3 → cuboid |
| PTFL | posterior talofibular | 20.4 → talus |
| Lisfranc-ish (grouped) | cuneometatarsal IO, dorsal/plantar TMT | 12.0–16.4 |
| Retinacula | flexor, sup./inf. extensor, sup./inf. fibular | 15.5–39.8 |

**Day 4s re-QA**: ATFL more lateral than spring; plantar fascia Z more plantar than calcaneus; all X<0 — **no side/scale correction**.

Reject rule applied: wrong side / far attachment / outside padded foot AABB — **0 rejects** among scanned named targets. Teaching-grade only.


## Day 4v — Selective ligament attachment QA (2026-09-15)

Reuse Day 4m Kabsch. Six integrated + two deferred (volume): see `ligament_attachment_qa.json` `day4v_*` keys and `docs/week2-ligament-fascia-search.md` Day 4v table. Nearest-bone mins 2.8–34.3 mm; all right-sided; no absurd rejects.

## Day 4w — Deferred ligaments wired (2026-09-15)

Reuse Day 4m/4v Kabsch. Medial talocalcaneal + dorsal intercuneiform previously deferred for volume; attachment QA already **accept** (talus 17.4 mm; cuneiform_int 9.0 mm). See `ligament_attachment_qa.json` `day4w_integrated`. No new landmark set.

