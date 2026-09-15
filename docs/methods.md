# Methods

**Project**: Right Foot Anatomy Atlas (Teaching-Grade Interactive 3D)  
**Version**: Week 2 Day 4t (85 structures.json placeholder:false; ligament/tendon = BP3D long plantar + Achilles + 19 Open3D BY-SA ankle/foot ligaments·retinacula·fascia; TA2 soft-tissue still incomplete)  
**Date**: 2026-09-15  
**Licenses**: Code MIT | Assets CC BY 4.0 / CC0 1.0 / CC BY-SA 4.0 (isolated)

---

## Overview

This atlas integrates open-licensed anatomical meshes from BodyParts3D, Universiti Malaya, Z-Anatomy, and Open3D (BY-SA isolate) for interactive right-foot teaching. Real 3D meshes cover **osteology 26/26**, wired muscles including UM teaching extrinsics (TA/FL/EDL/EHL) + BY-SA DI, vessels including 2 honest BP3D grouped meshes + BY-SA proximal arteries, 6 BY-SA trunk nerves, and soft tissue under the ligament/tendon toggle: **1 BP3D ligament** (long plantar) + **1 BP3D tendon** (Achilles) + **19 Open3D BY-SA** teaching meshes (Day 4s–4t: lateral/medial ankle, short plantar, bifurcate, Lisfranc-ish bands, retinacula, plantar fascia; Kabsch→BP3D). **Entry-level placeholders: 0** — but this is **not** TA2-complete (further tarsal/toe bands unextracted; Lisfranc/retinacula grouped; no fine digital nerves; dorsal metatarsal arteries not individually split). See `docs/week2-ligament-fascia-search.md` Day 4s–4t.

**Target Audience**: Medical students, anatomy instructors, foot/ankle residents, physical therapists.  
**NOT for**: Clinical diagnosis, treatment planning, surgical navigation, or patient-specific modeling.

---

## Data Sources

### 1. BodyParts3D Release 4.0 (CC BY 4.0)

**Provider**: Database Center for Life Science (DBCLS), Japan  
**URL**: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/  
**DOI**: 10.18908/lsdba.nbdc00837-007  
**License**: CC BY 4.0 (Attribution)  
**Last Updated**: 2025-02-27 (R4.0)

**Coverage**:
- **21 bones** (7 tarsals, 5 metatarsals, 2 hallux phalanges, 7 phalanges 2-5: 4 proximal + 3 middle)
- 12 muscles (plantar intrinsics: AH oblique/transverse heads, FHB medial, lumbricals 1-4, plantar interossei 1-3, EHB, FDMB)
- 5 vessels (dorsalis pedis, arcuate, medial/lateral plantar, plantar arch)

**Format**: Wavefront OBJ (99% polygon simplification, ~2234 files in archive)

**Attribution**:
```
BodyParts3D, © The Database Center for Life Science licensed under 
CC Attribution 4.0 International.
```

### 2. Universiti Malaya Asian Male LE MSK (CC0 1.0)

**Repository**: UM Research Data Repository  
**DOI**: 10.22452/RD/5T6TZ7  
**URL**: https://researchdata.um.edu.my/dataset.xhtml?persistentId=doi:10.22452/RD/5T6TZ7  
**License**: CC0 1.0 Universal (Public Domain Dedication)  
**Release**: 2026-03-24

**Coverage**:
- **4 bones** (distal phalanges 2-5, separated from grouped Phalanges.stl via Blender loose-parts)
- 8 muscles (STL, high-resolution):
  - 5 intrinsic: Abductor hallucis, flexor digitorum brevis, abductor digiti minimi, quadratus plantae, extensor digitorum brevis
  - 3 extrinsic: Tibialis posterior, flexor digitorum longus, flexor hallucis longus

**Format**: STL (binary, 42 muscles + 1 grouped phalanges STL in dataset)

**Quality**: 2.4-8.7× higher resolution than BP3D for overlapping muscles (verified via vertex count: UM 15k-45k vertices vs BP3D 5k-8k)

**Extraction Method**: `Segmentation_Bone_Phalanges.stl` (1.9MB) separated into 14 components via Blender → separate by loose parts. Spatial analysis (X/Z coordinates, vertex count) identified 4 distal phalanges for toes 2-5

### 3. Z-Anatomy (CC BY-SA 4.0, isolated)

**Repository**: https://github.com/Z-Anatomy/Models-of-human-anatomy  
**License**: CC BY-SA 4.0 (ShareAlike, isolated in `by-sa/` directory)  
**Authors**: Gauthier Kervyn (design), Marcin Zielinski (Blender addon)  
**Base Model**: BodyParts3D (CC BY-SA 2.1 Japan)  
**Commit**: Latest main branch as of 2026-09-14

**Coverage**:
- 6 nerves (CURVE geometry, thin tubes along pathways):
  - Tibial, medial/lateral plantar, deep/superficial fibular, sural

**Format**: Blender `.blend` file (Startup.blend, 306MB) → exported to GLB via Blender 4.0.2 Python API

**Attribution**:
```
"Z-Anatomy - The libre 3D atlas of anatomy - CC BY-SA 4.0"
"BodyParts3D" by Database Center for Life Science licensed under CC BY-SA 2.1 Japan
```

---

## Extraction Methodology

### BodyParts3D (Bones + Muscles + Vessels)

**Challenge**: Archive uses FJ#### filenames, but structures identified by BP#### codes in `isa_parts_list_e.txt`.

**Solution**: Brute-force OBJ header scanning
```python
# assets-raw/bodyparts3d/find_foot_soft_tissue.py
with zipfile.ZipFile('isa_BP3D_4.0_obj_99.zip') as z:
    for obj_file in z.namelist():
        header = z.read(obj_file).decode('utf-8')[:2000]  # First ~50 lines
        if 'BP5054' in header:  # Target BP code
            print(f"Found: {obj_file}")  # Maps to FJ code
```

**Extraction**:
1. Scan 2234 OBJ files → extract BP/FMA identifiers from `# o` comment lines
2. Map 14 bone BP codes → FJ filenames (e.g., BP9040 → FJ1057.obj for calcaneus)
3. Extract 12 muscle BP codes → FJ filenames (e.g., BP5054 → FJ1400.obj for abductor hallucis oblique)
4. Extract 5 vessel BP codes → FJ filenames (e.g., BP6027 → FJ2055.obj for dorsalis pedis artery)

**Shell script**:
```bash
# assets-raw/bodyparts3d/extract_foot_soft_tissue.sh
unzip -p isa_BP3D_4.0_obj_99.zip "isa_BP3D_4.0_obj_99/FJ1057.obj" > calcaneus_BP9040.obj
# ... (repeated for 14 bones + 12 muscles + 5 vessels)
```

### Universiti Malaya (Muscles)

**Download**: Dataverse API
```bash
# Resolved file ID 596 from dataset DOI
wget https://researchdata.um.edu.my/api/access/datafile/596 \
  -O Final_Model_STL_files.zip
```

**Extraction**:
```bash
unzip Final_Model_STL_files.zip "Final Model STL files/Segmentation_Muscle_*.stl"
# Extract 8 foot-relevant muscles (5 intrinsic + 3 extrinsic)
```

**Quality comparison** (Day 2):
- Abductor hallucis: UM 43k vertices vs BP3D 5k vertices (8.7× resolution)
- Flexor digitorum brevis: UM 23k vs BP3D 9k (2.4×)
- Abductor digiti minimi: UM 27k vs BP3D 6k (4.5×)

**Decision**: Use UM for overlapping muscles (higher resolution) + BP3D gaps (quadratus plantae, EDB)

### Z-Anatomy (Nerves)

**Tool**: Blender 4.0.2 (installed via apt, 19sec)

**Inventory**:
```bash
blender --background --python inventory_foot_nerves_vessels.py
# Scanned Startup.blend → found 50 nerve objects, 40 vessel objects
```

**Export**:
```python
# third_party/z-anatomy/export_right_foot_nerves.py
import bpy
bpy.ops.wm.open_mainfile(filepath="Z-Anatomy/Startup.blend")

right_foot_nerves = [
    'Tibial nerve.r', 'Medial plantar nerve.r', 
    'Lateral plantar nerve.r', 'Deep fibular nerve.r',
    'Superficial fibular nerve.r', 'Sural nerve.r'
]

for nerve_name in right_foot_nerves:
    obj = bpy.data.objects[nerve_name]
    bpy.ops.export_scene.gltf(
        filepath=f"foot_nerves_glb/{nerve_name}.glb",
        use_selection=True,
        export_format='GLB'
    )
```

**Result**: 12 nerve GLB exported (6 core + 6 branches), 6 core selected for atlas

---

## Conversion Pipeline

### OBJ/STL → GLB

**Method**: Python `trimesh` library (fallback after `obj2gltf` permission issues)

```python
# assets-raw/*/convert_to_glb.py
import trimesh

mesh = trimesh.load('input.obj')  # or .stl
mesh.export('output.glb', file_type='glb')
```

**Scale factor**: All sources use millimeters → converted to centimeters in three.js via `scale={[0.01, 0.01, 0.01]}`

**Size optimization**:
- BP3D bones: OBJ 16-506KB → GLB 6.6-149KB (68% reduction avg)
- UM muscles: STL 364KB-2.7MB → GLB 377KB-941KB (Draco compression where applicable)
- Z-Anatomy nerves: GLB 61KB-1MB (thin CURVE geometry, minimal compression)

---

## License Isolation for BY-SA Nerves

**Strategy**: Isolate CC BY-SA 4.0 nerves in `public/models/right-foot/by-sa/` subdirectory

**Directory structure**:
```
public/models/right-foot/
├── *.glb                 # CC BY 4.0 (BP3D) + CC0 1.0 (UM)
└── by-sa/
    ├── NOTICE.md         # CC BY-SA 4.0 attribution + removal instructions
    ├── tibial_nerve.glb
    ├── medial_plantar_nerve.glb
    ├── lateral_plantar_nerve.glb
    ├── deep_fibular_nerve.glb
    ├── superficial_fibular_nerve.glb
    └── sural_nerve.glb
```

**Code isolation**:
```typescript
// src/components/FootModel.tsx
const REAL_NERVE_MODELS: Record<string, string> = {
  'tibial_nerve': '/models/right-foot/by-sa/tibial_nerve.glb', // BY-SA
  // ... (5 more BY-SA nerves)
};

// Tooltip shows "Z-Anatomy (BY-SA 4.0)" badge
```

**User choice**: Load nerve layer → accept BY-SA terms. Skip nerve layer → MIT + CC BY/CC0 only.

---

## Limitations

### Anatomical
1. **Teaching-grade, not patient-specific**: Generic anatomy from cadaver scans (BP3D) or segmented CT (UM)
2. **Dorsal interossei absent**: No open-source foot dorsal interossei found in BP3D, UM, or Z-Anatomy
3. **Vessel proximal + per-toe detail**: 2/9 vessels still placeholder (posterior tibial, fibular — proximal to foot proper). Digital/metatarsal branches are present as honest BP3D **grouped** meshes (combined, not per-toe split; labeled （组合）)
4. **Nerve geometry simplified**: CURVE tubes (not volumetric meshes), suitable for pathway teaching but not cross-sectional detail
5. **Extrinsic muscle extent**: Shown from leg origin to foot insertion (teaching context, not isolated foot-only)

### Technical
1. **Not CT/MRI-derived for this atlas**: BP3D is cadaver-derived, UM is one individual's scan
2. **No soft tissue deformation**: Static meshes, no biomechanical modeling
3. **Not validated for surgery**: Educational tool, not surgical planning software
4. **Browser-dependent rendering**: Requires WebGL 2.0, tested on Chrome/Firefox/Safari

### Licensing
1. **ShareAlike nerves**: BY-SA 4.0 applies if nerve layer modified (isolated via `by-sa/` to prevent taint)
2. **Attribution required**: CC BY 4.0 (BP3D) requires citation in derivative works
3. **No commercial restriction**: All licenses permit commercial use (CC0, CC BY, CC BY-SA)

---

## Reproducibility

### Scripts Available
All extraction/conversion scripts retained in repository:
- `assets-raw/bodyparts3d/find_foot_soft_tissue.py` (BP→FJ mapping)
- `assets-raw/bodyparts3d/extract_foot_soft_tissue.sh` (OBJ extraction)
- `assets-raw/um-asian-male/convert_um_stl.py` (intrinsic muscles)
- `assets-raw/um-asian-male/convert_extrinsic_stl.py` (extrinsic muscles)
- `third_party/z-anatomy/inventory_foot_nerves_vessels.py` (Blender inventory)
- `third_party/z-anatomy/export_right_foot_nerves.py` (Blender GLB export)

### Git History
Complete commit history (Day 1-7) documents:
- Asset extraction decisions (e.g., UM vs BP3D quality comparison)
- structures.json evolution (placeholder flag corrections)
- FootModel.tsx updates (REAL_*_MODELS mappings)

### Data Provenance
| Structure | Source | BP/FMA | UM Filename | Z-Anatomy Object |
|-----------|--------|--------|-------------|------------------|
| Calcaneus | BP3D | BP9040/FMA24497 | — | — |
| Abductor hallucis | UM | — | `Segmentation_Muscle_Abductor Hallucis.stl` | — |
| Tibial nerve | Z-Anatomy | — | — | `Tibial nerve.r` |
| _(etc., see manifest.json for full list)_ |

---

## Quality Assurance

### Nomenclature
- **Latin names**: Cross-checked against Terminologia Anatomica 2 (2019)
- **Chinese names**: Aligned with PRC standards (《人体解剖学》第9版)
- **Critical correction**: 踇 (mǔ, hallux) vs 拇 (mǔ, thumb) fixed (Phase 3)

### Anatomical Accuracy
- **Spot-checks**: Gray's Anatomy 42nd ed., Netter's Atlas 7th ed.
- **Peer review**: Expert review checklist provided (`docs/expert-review-checklist.md`)

### Spatial Alignment
- **Scale verification**: All sources use 0.01 factor (mm → cm) after baking into BP3D mm
- **UM-BP3D frame**: Day 4l Kabsch similarity bake (7 tarsal landmarks, mean residual ≈2.2 mm); see `third_party/um/um_to_bp3d_transform.json`
- **Open3D-BP3D frame**: Day 4m Kabsch similarity re-fit (12 landmarks incl. cuboid + 3 cuneiforms after Day 4j ID fix; mean residual ≈2.6 mm vs prior 8-landmark ≈3.0 mm); see `third_party/open3dmodel/open3d_to_bp3d_transform.json`
- **Z-Anatomy derivation**: Based on BP3D, expected coordinate alignment

---

## Future Work

### Anatomical Completeness
- **Dorsal interossei**: Open3D BY-SA fill present under `by-sa/`; prefer future CC0/CC BY replacement for main-tree claim
- **Vessel per-toe splits / proximal arteries**: Grouped digital+metatarsal meshes integrated honestly; posterior tibial + fibular remain out of foot-proper scope unless a finer open source appears
- **Ligaments/joints**: Capsule rendering (low priority for teaching)

### Technical Enhancements
- **Material improvements**: PBR textures, muscle fiber direction
- **Animation**: Muscle contraction cycles, nerve electrical pathway visualization
- **VR/AR support**: WebXR integration for immersive learning

### Licensing Evolution
- **BY-SA nerve alternatives**: If CC BY or CC0 nerve datasets emerge, replace Z-Anatomy
- **Digital vessel sources**: Active monitoring of BodyParts3D updates

---

## Contact

**Repository**: https://github.com/linjinmiao1985/right-foot-anatomy-atlas  
**Issues**: Use GitHub Issues for anatomical corrections, data provenance questions, or license clarifications  
**Citation**: See `README.md` for atlas citation format

---

**Document Version**: 1.0 (2026-09-14)  
**Atlas Version**: Week Sprint Final (88% real coverage, 38/43 structures)


---

## Day 4n — TA2 teaching gaps (2026-09-15)

**placeholders**: none in `structures.json` (64 entries, all `placeholder:false`).

| Gap | Why still open | Search note |
|-----|----------------|-------------|
| Ligaments / plantar fascia / tendon | BP3D long plantar + Achilles; **Day 4s–4t** Open3D BY-SA 19 meshes (isolate). Still incomplete (further bands…) | Monolithic `lower-limb.obj` object inventory + attachment QA. Z-Anatomy Zenodo `.blend` on disk; Blender not in apt — recipe only |
| Finer plantar/digital nerves | Only trunk nerves (Z-Anatomy BY-SA) | Prefer future CC0/BY over expanding SA isolate |
| Individual dorsal metatarsal arteries | BP3D grouped dorsal digital + plantar metatarsal remain | Open3D had dorsal MTA (BY-SA); skipped earlier to avoid SA duplication of grouped teaching vessels |
| Plantar interossei | **Present** (BP3D 1st–3rd) | Not a gap |

**Integrated this day**: 4 orphan UM CC0 extrinsic GLBs (tibialis anterior, fibularis longus / peroneus_longus.glb, EDL, EHL) Kabsch-baked with `third_party/um/um_to_bp3d_transform.json`.

## Day 4s — Open3D ligament/fascia extract (2026-09-15)

1. Confirmed Zenodo Z-Anatomy.zip downloadable (`10.5281/zenodo.4953712`); local copy gitignored; Blender absent → no Z-Anatomy mesh claim.
2. Inventoried literature Open3D `lower-limb.obj` (`o` groups): extracted ATFL, CFL, spring, plantar aponeurosis → `by-sa/` via `scripts/extract_open3d_ligaments.py` + existing Kabsch JSON.
3. Parallel CC0/CC BY search for those four remains dry (BP3D/UM/DU VH knee ligaments).
4. Honesty: teaching expansion under ShareAlike isolate — **not** a finished ligament atlas.

## Day 4t — Expand Open3D ligament/retinaculum extract (2026-09-15)

1. Scanned same literature `lower-limb.obj` for deltoid parts, short plantar, bifurcate, Lisfranc-ish TMT bands, clearly named ankle retinacula (+ PTFL).
2. Extracted + Kabsch-baked 15 new BY-SA GLBs; attachment QA (centroid→expected bones) all accept — see `ligament_attachment_qa.json`.
3. Re-QA Day 4s four: laterality/scale OK.
4. Blender: not installed; apt has no blender package — did not install.
