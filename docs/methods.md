# Methods

**Project**: Right Foot Anatomy Atlas (Teaching-Grade Interactive 3D)  
**Version**: Week 2 Day 4am / Phase 6 (teaching atlas in progress; see README + `docs/phase-6-self-review.md` live census; **129** entries / **124** unique; **53** main-tree / **71** BY-SA; 134 discrete GLBs; lazy preload + layer-sorted search + label density + sagittal clip lite + README teaching QA screenshots; TA2 soft-tissue still incomplete — **not a finished product**)  
**Date**: 2026-09-15  
**Licenses**: Code MIT | Assets CC BY 4.0 / CC0 1.0 / CC BY-SA 4.0 (isolated)

---

## Overview

This atlas integrates open-licensed anatomical meshes from BodyParts3D, Universiti Malaya, Z-Anatomy, and Open3D (BY-SA isolate) for interactive right-foot teaching. Live census (Day 4am / Phase 6): **129** entry-level rows / **124** unique structures (**53** main-tree CC BY/CC0 · **71** ShareAlike isolate) — osteology **26/26**; muscle **28** entries / **23** unique (BP3D+UM main + Open3D/ZA BY-SA DI·FB·FT·opponens·plantaris); vessel **29** (7 BP3D + 12 Open3D BY-SA + 10 ZA BY-SA veins/proximal); nerve **17** (6 ZA trunks + 11 Open3D fine/cutaneous); ligament/tendon **29** (2 BP3D long plantar + Achilles + 27 Open3D BY-SA). **Entry-level placeholders: 0**. This is **not** TA2-complete: no per-ray dorsal MTA; several vessels/nerves remain **grouped**; ankle bands incomplete vs named ATFL-set in some texts; gastroc/soleus bellies absent. See `docs/phase-6-self-review.md` and `docs/week2-ligament-fascia-search.md`.

**Soft disclaimer (teaching vs clinical)**: Meshes and Kabsch co-registration are intended **only** for anatomy education (spatial relationships, named structures, layer exploration, classroom cutaways). They are **not** validated for clinical diagnosis, treatment planning, surgical navigation, implant sizing, interventional guidance, or patient-specific modeling. Published landmark residuals support visualization grade only — cite transform JSONs: Open3D→BP3D mean ≈**2.61 mm** (max ≈4.41 mm MT1); UM→BP3D mean ≈**2.22 mm** (max ≈4.38 mm talus); ZA→BP3D mean ≈**1.81 mm** (max ≈3.52 mm calcaneus). Do **not** treat these as surgical registration error bounds.

**Target Audience**: Medical students, anatomy instructors, foot/ankle residents, physical therapists.  
**NOT for**: Clinical diagnosis, treatment planning, surgical navigation, implant planning, or patient-specific modeling.

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

**Coverage** (wired subset; all under `by-sa/`):
- 6 trunk nerves (CURVE→tube): tibial, medial/lateral plantar, deep/superficial fibular, sural
- Soft vessels/veins (Day 4ad–4af mesh-API / Blender exports): e.g. proper/common plantar digital arteries, anterior tibial a., circumflex fibular branch, dorsal/plantar venous arches, plantar digital / metatarsal / med·lat plantar veins — **not** a complete venous atlas
- Note: long plantar + Achilles exist in the ZA blend but are **not** wired (BP3D CC BY already covers both). No named ATFL/CFL/deltoid/retinacula in the harvested blend

**Format**: Zenodo `.blend` / mesh-API OBJ → Kabsch-baked GLB (`za_to_bp3d_transform.json`, mean residual ≈1.81 mm)

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
2. **Dorsal interossei**: Open3D BY-SA fill under `by-sa/` (not main-tree CC BY); prefer future CC0/BY replacement
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

### Transform JSONs (frame registration)
| File | Role | Key metrics |
|------|------|-------------|
| `third_party/open3dmodel/open3d_to_bp3d_transform.json` | Open3D meters → BP3D mm (similarity Kabsch) | scale≈926; 12 landmarks (calcaneus–MT5); mean residual ≈**2.61 mm**; max ≈4.41 mm (MT1) |
| `third_party/um/um_to_bp3d_transform.json` | UM CT/seg → BP3D mm | 7 tarsals; mean residual ≈**2.22 mm** |
| `third_party/z-anatomy/za_to_bp3d_transform.json` | ZA soft → BP3D mm | 9 foot bones; mean residual ≈**1.81 mm** |
| `third_party/open3dmodel/ligament_extract_aabb.json` | Per-ligament AABB/centroid after bake | Day 4s–4v targets + Day 4v scan deferrals |
| `third_party/open3dmodel/ligament_attachment_qa.json` | Centroid→expected bone distances + accept/reject | Reject if wrong side (X>0), min_expect>55 mm (75 mm bands), or outside padded foot AABB |

Re-running a bake: load `scale` / `R` / `t_mm` from the transform JSON; apply `v' = scale * (R @ v) + t` to Open3D/UM vertex coordinates, then `obj2gltf`. Do **not** re-fit Kabsch unless landmarks or donor meshes change — document any new residuals.

### Scripts Available
Repo scripts (prefer these over ad-hoc one-offs):
- `scripts/extract_open3d_ligaments.py` / `extract_open3d_nerves.py` / `extract_open3d_vessels.py` / `extract_open3d_muscles.py` — named `o` objects from literature `lower-limb.obj` → Kabsch-baked GLB under `by-sa/`
- `scripts/integrity-audit.py` — `placeholder:false` ↔ `REAL_*_MODELS` ↔ GLB existence (+ orphan allowlist)
- `scripts/screenshot-pipeline.mjs` — optional teaching QA screenshots → `docs/screenshots/` (`npm run screenshots`; **not** a product gallery)
- `scripts/expand-structures.py` — structures helpers (when used)
- `update_structures_bp3d.py` / `update_structures_um.py` — historical structure wiring
- `third_party/z-anatomy/*` — Blender inventory/export **recipes** (Blender 4.2.9 LTS may be local; Zenodo `.blend` gitignored)
- Historical / optional: `assets-raw/bodyparts3d/*`, `assets-raw/um-asian-male/*` (may live outside this checkout)

### License matrix (redistribution honesty)
| Bucket | License | Where | Notes |
|--------|---------|-------|-------|
| Code | MIT | repo root | App/source |
| BP3D osteology + most soft tissue | CC BY 4.0 | `public/models/right-foot/*.glb` (not `by-sa/`) | Attribution required |
| UM muscles | CC0 1.0 | main tree GLBs | Public domain dedication |
| Z-Anatomy nerves + selected vessels/veins/muscles | CC BY-SA 4.0 | `by-sa/` only | ShareAlike isolate; Kabsch bake is a BY-SA modification |
| Open3D DI / arteries / ligaments / retinacula / fascia / fine nerves | CC BY-SA 4.0 | `by-sa/` only | Same isolate; Kabsch bake is a modification under BY-SA |
| Placeholders | n/a | none currently | — |
| **BY-SA weight (honesty)** | — | **71/124** unique | Prefer future **CC0/CC BY** replacements (Day 4al dig: none integrable) over more SA volume |

Deleting or never loading `by-sa/` yields a MIT + CC BY/CC0-only redistribution surface. Loading BY-SA layers accepts ShareAlike for those meshes and derivatives thereof.

### Git History
Commit history documents asset decisions, `structures.json` evolution, and `FootModel.tsx` `REAL_*_MODELS` wiring. Prefer Day 4m+ transform JSONs over older 8-landmark Open3D fits.

### Data Provenance (examples)
| Structure | Source | Key ID / object |
|-----------|--------|-----------------|
| Calcaneus | BP3D | BP9040 / FMA24497 |
| Abductor hallucis | UM | `Segmentation_Muscle_Abductor Hallucis.stl` |
| Tibial nerve | Z-Anatomy | `Tibial nerve.r` |
| Interosseous talocalcaneal | Open3D | `Interosseus_talocalcaneal_ligament.r` → `by-sa/` |
| _(full list)_ | — | `src/data/structures.json` + `public/models/right-foot/manifest.json` + `by-sa/NOTICE.md` |

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
- **Z-Anatomy soft → BP3D**: Day 4ad+ Kabsch similarity (`za_to_bp3d_transform.json`; 9 foot bone centroids; mean residual ≈**1.81 mm**, max ≈3.52 mm calcaneus). Trunk nerves remain pathway-schematic (CURVE→tube in BP3D-derived frame)

---

## Future Work

### Anatomical Completeness (open-data ceilings — Phase 6)
- **Dorsal interossei**: Open3D BY-SA under `by-sa/`; Day 4al CC0/BY dig found **no** main-tree replacement (TotalSegmentator bones-only; NIH foot NC; Embodi3D NC-SA)
- **Per-ray dorsal MTA / digital arteries**: Still **grouped** only (BP3D + Open3D); no license-clean elemental split found
- **Nerve/ligament SA surface**: Prefer CC0/CC BY replacements that shrink ShareAlike weight (~71/124 unique); skip SA volume for its own sake
- **Gastroc/soleus bellies**: Not in wired open packs (Achilles + plantaris only)
- **Ligaments/joints**: Capsule rendering low priority; named ATFL/CFL absent from ZA blend (Open3D BY-SA covers teaching set incompletely)

### Technical Enhancements
- Screenshot QA pack: `npm run screenshots` → `docs/screenshots/`; Day 4am README embed (careful, no hype) — not product marketing
- Material / animation / WebXR remain optional future work

### Licensing Evolution
- **BY-SA alternatives**: Continue monitoring CC0/CC BY segmented foot soft-tissue sources (HRA organ-scale and TotalSegmentator appendicular bones are **not** substitutes)
- **Digital vessel sources**: Active monitoring of BodyParts3D / open CT segmentations with named foot elementals

---

## Contact

**Repository**: https://github.com/linjinmiao1985/right-foot-anatomy-atlas  
**Issues**: Use GitHub Issues for anatomical corrections, data provenance questions, or license clarifications  
**Citation**: See `README.md` for atlas citation format

---

**Document Version**: 1.4 (2026-09-15)  
**Atlas Version**: Week 2 Day 4am / Phase 6 (teaching-grade in progress; no finished-product claim)


---

## Day 4n — TA2 teaching gaps (2026-09-15)

**placeholders**: none in `structures.json` (64 entries, all `placeholder:false`).

| Gap | Why still open | Search note |
|-----|----------------|-------------|
| Ligaments / plantar fascia / tendon | BP3D long plantar + Achilles; **Day 4s–4w** Open3D BY-SA **27** meshes (isolate). Still incomplete | Monolithic `lower-limb.obj` + attachment QA. Z-Anatomy Zenodo `.blend`; Blender not in apt — recipe only |
| Finer plantar/digital/cutaneous nerves | Day 4x–4z: Open3D Common + Proper + deep/superficial LPN + med/lat dorsal cutaneous + calcaneals + dorsal digitals (sup. + deep fibular) | Grouped commons/proprii/dorsal digitals; sural→LDC continuity note on LDC (no duplicate mesh). Dorsal MTA still grouped only |
| Individual dorsal metatarsal arteries | BP3D grouped dorsal digital + plantar metatarsal remain | See Day 4w ceiling — Open3D `Dorsal_metatarsal_arteries.r` is also **grouped**, not per-ray |
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

## Day 4v — Selective high-teaching-value Open3D ligaments (2026-09-15)

1. Scanned remaining named RIGHT bands; extracted 8 candidates with Day 4m Kabsch; attachment QA all passed distance/side/AABB rules.
2. **Integrated (max 6)**: interosseous talocalcaneal, cervical (anterior) talocalcaneal, talonavicular, deep transverse metatarsal, intercuneiform interosseous, dorsal cuneonavicular.
3. **Day 4v deferred → Day 4w integrated**: medial talocalcaneal, dorsal intercuneiform (prior QA accept).
4. Sub-group filters: added `subtalar`, `midfoot`, `forefoot`.
5. Honesty: still **not** a finished ligament atlas; teaching vs clinical soft disclaimer strengthened above.

## Day 4w — Deferred ligaments + vessel/nerve ceiling (2026-09-15)

1. Integrated Day 4v deferred Open3D bands (prior attachment QA **accept**): medial talocalcaneal, dorsal intercuneiform → `by-sa/` via same Kabsch + `obj2gltf` pipeline.
2. UX: Escape clears selection, isolate mode, **and** structure search query.
3. Vessel/nerve dig (ceiling — no new integrate this pass):
   - **No CC0/CC BY** mesh found that splits dorsal metatarsal arteries or adds plantar digital nerves (BP3D ISA still grouped FJ2072/FJ2096; UM/DU VH no foot digital neurovascular pack).
   - Open3D local `Dorsal_metatarsal_arteries.r` exists but is a **single grouped** object (same honesty class as BP3D grouped vessels) — does **not** satisfy per-ray split.
   - Open3D local `Common_plantar_digital_nerves.r` + `Proper_plantar_digital_branches_(Medial/Lateral_plantar_nerve).r` exist (BY-SA) — would expand nerve ShareAlike isolate beyond Z-Anatomy trunks; deferred pending dedicated nerve Kabsch/QA (prefer CC0/BY if ever available).
4. Honesty: ligament/tendon teaching set expanded (27 Open3D BY-SA) — **still incomplete**; no finished-product claim.

## Day 4x — Open3D fine plantar / deep LPN nerves (2026-09-15)

1. Extracted RIGHT Open3D objects with Day 4m Kabsch → `by-sa/` via `scripts/extract_open3d_nerves.py` + `obj2gltf`:
   - `Common_plantar_digital_nerves.r` → `common_plantar_digital_nerves`
   - `Proper_plantar_digital_branches_(Medial_plantar_nerve).r` → `proper_plantar_digital_nerves_medial`
   - `Proper_plantar_digital_branches_(Lateral_plantar_nerve).r` → `proper_plantar_digital_nerves_lateral`
   - `Deep_branch_of_Lateral_plantar_nerve.r` → `deep_branch_lateral_plantar_nerve` (4th entry; teaching value)
2. Spatial QA (`third_party/open3dmodel/nerve_spatial_qa.json`): vs RIGHT foot bone AABB (±40 mm) + **Open3D** medial/lateral plantar trunks in the **same** Kabsch frame (Z-Anatomy CURVE GLBs are a different frame — not used for residuals). All four **accept** (inside_padded=1.0; trunk centroid distances ≈54–110 mm — distal digitals expected farther).
3. Scanned further clearly named RIGHT foot nerve parts (superficial LPN branch, dorsal digitals, calcaneal nn., cutaneous terminals): spatial QA-pass but **deferred** (cap ≤4 new nerve entries this pass).
4. No CC0/BY fine-nerve alternative found; dorsal MTA remains grouped-only ceiling.
5. Honesty: nerve layer then 10 teaching meshes — **not** a finished peripheral-nerve atlas.

## Day 4y — Deferred Open3D cutaneous / calcaneal / superficial LPN / dorsal digitals (2026-09-15)

1. Wired six Day 4x volume-deferred QA-pass RIGHT nerves (same Kabsch + `scripts/extract_open3d_nerves.py`):
   - `Medial_dorsal_cutaneous_nerve.r` → `medial_dorsal_cutaneous_nerve`
   - `Lateral_dorsal_cutaneous_nerve.r` → `lateral_dorsal_cutaneous_nerve`
   - `Medial_calcaneal_branches_of_Tibial_nerve.r` → `medial_calcaneal_branches`
   - `Lateral_calcaneal_nerves.r` → `lateral_calcaneal_nerves`
   - `Superficial_branch_of_Lateral_plantar_nerve.r` → `superficial_branch_lateral_plantar_nerve`
   - `Dorsal_digital_branches_of_superficial_fibular_nerve.r` → `dorsal_digital_superficial_fibular` (grouped)
2. Still deferred that pass (volume / redundancy): `Sural_nerve,_Lateral_dorsal_cutaneous_nerve.r`; `Dorsal_digital_branches_of_deep_fibular_nerve.r` (resolved Day 4z).
3. Spatial QA reused Day 4x accept criteria (`nerve_spatial_qa.json` `day4y_added`).
4. Honesty: nerve layer then 16 teaching meshes (6 ZA + 10 Open3D) — **still not** a finished peripheral-nerve atlas.

## Day 4z — Deep-fibular dorsal digitals + sural→LDC note + nerve sub-groups (2026-09-15)

1. Integrated `Dorsal_digital_branches_of_deep_fibular_nerve.r` → `dorsal_digital_deep_fibular` (same Kabsch + extract script; QA accept → `day4z_added`).
2. Sural→LDC: Open3D `Sural_nerve,_Lateral_dorsal_cutaneous_nerve.r` has **distinct** transitional verts (Jaccard 0 vs LDC and vs sural). Documented as continuity note on `lateral_dorsal_cutaneous_nerve` rather than wiring a third mesh (avoids dual-source overlap with Z-Anatomy sural + Open3D LDC).
3. Teaching polish: nerve sub-group filter (8 groups) mirroring ligament sub-groups; README coverage table refreshed from live census (104 entry / 99 unique).
4. Honesty: nerve layer now **17** teaching meshes (6 ZA + 11 Open3D) — **still not** a finished peripheral-nerve atlas.

## Day 4aa — Open3D fine vessels / plantar-arch detail (2026-09-15)

1. Scanned `lower-limb.obj` RIGHT arterial objects. **No** individually named 1st–4th dorsal/plantar metatarsal or proper digital artery elementals — only grouped plurals.
2. Integrated **5** BY-SA via `scripts/extract_open3d_vessels.py` + Day 4m Kabsch + `obj2gltf` (spatial QA all **accept** → `vessel_spatial_qa.json`):
   - `Deep_plantar_artery.r` → `deep_plantar_artery`
   - `Deep_plantar_arch.r` → `deep_plantar_arch` (BY-SA deep-arch detail; complements BP3D `plantar_arch` concept — not a second anatomical arch)
   - `Dorsal_metatarsal_arteries.r` → `dorsal_metatarsal_arteries` (**grouped**)
   - `Deep_branch_of_Medial_plantar_artery.r` → `deep_branch_medial_plantar_artery`
   - `Superficial_branch_of_Medial_planter_artery.r` → `superficial_branch_medial_plantar_artery` (source spelling *planter*)
3. Documented-only (not wired): perforating arcuate↔deep arch; lateral/medial tarsal; calcaneal arterial branches; Open3D plantar metatarsal / dorsal digital (BP3D already main-tree); Open3D medial/lateral plantar trunks (BP3D present).
4. Census: **109** entry / **104** unique; vessels **14** (7 BP3D + 7 Open3D BY-SA).
5. Honesty: dorsal MTA remains **grouped-only** soft ceiling; vessel layer teaching-expanded — **not** a finished vascular atlas.

## Day 4ac — Vessel sub-groups + EHB wire + Blender proof (2026-09-15)

1. **Vessel teaching sub-group filter** (mirror nerve/ligament): nine partitions covering all 19 vessel ids — dorsal main/distal, tarsal, proximal leg, plantar main/deep/distal, perforators, calcaneal. UI only; **not** a complete arterial atlas; grouped meshes remain grouped.
2. **Muscle gap census** (`docs/muscle-gap-census.md`): wired orphan BP3D **EHB** (`extensor_hallucis_brevis.glb` already in REAL_MUSCLE_MODELS) into `structures.json` → 24 muscle entries / 19 unique / main-tree +1. Still open: fibularis brevis, fibularis tertius, opponens digiti minimi (no license-clean mesh claimed).
3. **Blender**: Official 4.2.9 LTS tarball installed (apt lacked package). Exported Z-Anatomy proof GLBs for long plantar + calcaneal tendon (`third_party/z-anatomy/proof_exports/`, gitignored). No named ATFL/CFL/deltoid/retinacula in that `.blend` — Open3D BY-SA unchanged. Proof **not** wired (BP3D already covers both).
4. Honesty: teaching-grade in progress — **no finished-product claim**.

## Viewer load strategy (Day 4ah honesty)

| Item | Detail |
|------|--------|
| **On-disk GLB count** | **134** discrete teaching meshes (~**13 MB** total): **59** main tree (`public/models/right-foot/*.glb`) + **75** ShareAlike isolate (`by-sa/`) |
| **Why discrete files** | Per-structure GLBs keep CC BY/CC0 vs BY-SA license boundaries clear; avoid one monolithic pack that would taint redistribution claims |
| **Runtime** | React Three Fiber `useGLTF` per mounted mesh; layer toggle **unmounts** hidden layers (no draw / no hook for those paths) |
| **Preload** | Bones **eager** (`useGLTF.preload`); muscle / vessel / nerve / ligament preload **when that layer is visible** (lazy vs prior preload-all) |
| **Not claimed** | Meshopt/Draco single-file atlas; streaming LOD; finished soft-tissue completeness |



## Day 4ai — bilingual label density (2026-09-15)

Hover label density control (关 / 中文 / 中+拉). Dig: open-twin-xr (MIT + multi-license; NC warning), 3Dentes (MIT code / BY-NC anatomy — reject). No new SA mesh. **No finished-product claim.**

## Day 4aj — sagittal clip lite (2026-09-15)

Single-axis sagittal (X) clip toggle + slider (`ClipPlaneSync`). Dig: Visible Human Viewer (MIT), Anatomy Atlas RU (MIT + BP3D CC BY). Teaching cutaway only — **not** clinical MPR. **No finished-product claim.**

## Phase 6 self-review (2026-09-15)

Wrote `docs/phase-6-self-review.md` (census 129/124; 53 main / 71 BY-SA; residuals; UX inventory; open-data ceilings; next-week targets). Screenshot pipeline: `npm run screenshots` → `docs/screenshots/`. Synced README/methods one-liners.

## Day 4al — CC0/CC BY asset hunt + methods polish (2026-09-15)

1. **Phase-6 target #1**: License-verified dig for DI / per-ray MTA / nerve·ligament main-tree replacements — TotalSegmentator v3 (CC BY; bones only), HRA CCF 3D library (CC BY; whole-body), Schuster foot PLYs (CC0; surface only), NIH 3D foot (CC-BY-NC-SA). Related NC reconfirm: Embodi3D/Scan-the-World foot muscles. **0** meshes integrated.
2. **Phase-6 target #2**: This methods pass — live census 129/124 (53/71), strengthened teaching-vs-clinical disclaimer with cited Kabsch residuals, ZA coverage + license matrix + Future Work ceilings synced to `docs/phase-6-self-review.md`.
3. Honesty: teaching atlas in progress — **no finished-product claim**.

## Day 4am — README screenshot gallery + Cloud Agent handback note (2026-09-15)

1. **Phase-6 target #3**: Embedded the existing five-shot teaching QA pack into `README.md` (table + images) with explicit soft-tissue / BY-SA / not-finished-product caveats. No new meshes. Pack path: `docs/screenshots/` (`npm run screenshots`).
2. **Phase-6 target #4 (docs)**: Cloud Agent handback checklist in `docs/phase-6-self-review.md` — deferred browser/Zenodo/Blender harvest and multi-view capture; resume only with integrity-audit + vitest + build green; prefer CC0/BY over SA spam.
3. Honesty: teaching atlas in progress — **no finished-product claim**.
