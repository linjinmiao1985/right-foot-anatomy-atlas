# Right Foot Anatomy Atlas · 右足解剖图谱

Interactive web-based teaching atlas for right foot anatomy.  
基于Web的交互式右足解剖教学图谱。

> ⚕️ **Educational Use Only**: Teaching-grade anatomical resource for medical students, anatomy instructors, and foot/ankle residents. Not for clinical diagnosis or treatment planning.

---

## Coverage

| Layer | Real Meshes | Placeholder | Total | Sources |
|-------|-------------|-------------|-------|---------|
| **Bones** | **26/26 (100%)** | 0 | 26 | BP3D (26) — **main tree** |
| **Muscles** | **18 unique / 23 entries** | 0 | 18 | Main: BP3D + UM (17 unique) · **BY-SA**: Open3D DI (1) |
| **Vessels** | **9/9 (100%)** | 0 | 9 | Main: BP3D 7 (incl. 2 honest grouped) · **BY-SA**: Open3D PTA + fibular (2) |
| **Nerves** | **10** | 0 | 10 | Z-Anatomy trunks 6 + Open3D fine/branch 4 (BY-SA `by-sa/`); **not** TA2-complete |
| **Ligaments / tendons** | **29** | 0 | 29 | Main: BP3D long plantar + Achilles · **BY-SA**: Open3D 27; **teaching-useful, incomplete** |
| **Unique total** | **92 real** | **0** | **92** | See main vs BY-SA split below |

### Main tree vs BY-SA isolate (honest split)

| Claim | Unique count | Contents |
|-------|--------------|----------|
| **Main (CC BY 4.0 / CC0)** | **52/92** | 26 bones + 17 unique muscles + 7 vessels + 1 ligament + 1 tendon |
| **BY-SA isolate (`by-sa/`)** | **40/92** | 1 DI + 2 proximal arteries + 10 nerves (6 Z-Anatomy + 4 Open3D) + 27 ankle/foot ligaments·retinacula·fascia |
| **Entry-level `structures.json`** | **97/97** `placeholder:false` | Multi-part muscles counted separately (lumbricals/PI) |

**Note**: Unique framing = **92** (lumbricals×4→1, plantar interossei×3→1). Entry-level = **97** rows. **Honest grouped vessels**: dorsal digital + plantar metatarsal remain BP3D combined meshes (dorsal MTA still grouped only). Open3D DI / PTA / fibular / ligaments / retinacula / plantar fascia / fine nerves are **ShareAlike fills**, Kabsch→BP3D mm — **not** CC BY main-tree. **Ligament + nerve layers: teaching-useful but incomplete** (further tarsal/toe bands and additional nerve terminals still unwired; commons/proprii are grouped teaching meshes).

### Remaining soft-tissue caveats (not “gaps” in placeholder sense)
- Prefer future **CC0/CC BY** replacements for Open3D BY-SA DI + proximal arteries
- Cuboid + 3 cuneiforms remapped (Day 4j). Hallux proximal remapped `BP8488`→`BP8785` (Day 4k). Distal phalanges 2–5: UM Y≈−850 meshes replaced with BP3D ISA elemental
- **UM muscles** (8): Kabsch-similarity baked into BP3D mm (Day 4l; mean residual ≈2.2 mm on 7 tarsal landmarks) — teaching-grade, not surgical registration
- **Ligaments / fascia / tendon**: see `docs/week2-ligament-fascia-search.md` Day 4s–4w — BP3D = long plantar + Achilles; Open3D → **27** BY-SA teaching meshes (Day 4w +2 previously deferred: medial talocalcaneal, dorsal intercuneiform). Z-Anatomy `.blend` export recipe only
- Teaching-grade atlas in progress — **no finished-product claim**

---

## License Map

| Component | License | Redistribution |
|-----------|---------|----------------|
| **Code** (`src/`, `vite.config.ts`, etc.) | MIT | ✅ Free, commercial OK |
| **Bones + most vessels** | CC BY 4.0 (BodyParts3D) | ✅ Free, attribution required |
| **Muscles** | CC BY 4.0 (BP3D) + CC0 1.0 (UM) | ✅ Free, no strings (UM) |
| **Nerves** (in `by-sa/` only) | CC BY-SA 4.0 (Z-Anatomy trunks + Open3D fine/branch) | ⚠️ ShareAlike if modified |
| **DI + proximal arteries + ankle/foot ligaments/retinacula/fascia + fine nerves** (`by-sa/`) | CC BY-SA 4.0 (Open3DModel) | ⚠️ ShareAlike if modified |
| **Ligament + tendon** (long plantar + Achilles) | CC BY 4.0 (BodyParts3D) | ✅ Attribution; soft-tissue incomplete |

**User Choice**: Muscle / vessel / nerve / ligament layers may load BY-SA meshes (DI, PTA, fibular, nerves, ankle/foot ligaments, retinacula, fascia). Skip those layers or delete `by-sa/` → MIT + CC BY/CC0 only.

---

## Features

- **5-layer toggle**: Bone / Muscle / Nerve / Vessel / Ligament-Tendon (soft-tissue teaching-useful but incomplete — BP3D 1+1 + Open3D BY-SA 27)
- **Ligament sub-group filter**: lateral ankle / deltoid / subtalar / plantar-arch / midfoot / Lisfranc / forefoot / retinacula / tendon
- **License badge**: StructurePanel shows **主树 · Main** vs **ShareAlike** (by-sa/ isolate)
- **Click selection**: Shows Chinese name, Latin name (TA2), summary
- **Click-to-focus**: Camera frames selected mesh AABB (teaching polish)
- **Hover tooltips**: Quick structure identification
- **OrbitControls**: Zoom, rotate, pan around foot
- **Loading states**: Progress indicators for GLB assets
- **Keyboard**: `I` isolate · `Esc` clears selection + isolate + search
- **Search**: bilingual ZH/LA includes ligament/tendon entries (e.g. 跖长韧带, 跟腱)

---

## Tech Stack

- **Frontend**: Vite + React 18 + TypeScript 5
- **3D Engine**: Three.js + React Three Fiber + @react-three/drei
- **Data**: `structures.json` (93 entries, TA2-oriented naming; not TA2-complete)
- **Assets**: Main-tree GLBs + `by-sa/` structure GLBs (10 nerves + 4 DI + 2 arteries + 27 ligaments/retinacula/fascia)
- **Testing**: Vitest + integrity-audit.py

---

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Run tests
npm test
```

Open `http://localhost:5173` to view the atlas.

---

## Data Sources

### BodyParts3D Release 4.0 (CC BY 4.0)
- **Provider**: Database Center for Life Science (DBCLS), Japan
- **DOI**: 10.18908/lsdba.nbdc00837-007
- **URL**: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/
- **Coverage**: 14 bones, 12 muscles, 5 vessels
- **Attribution**: "BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International"

### Universiti Malaya Asian Male LE MSK (CC0 1.0)
- **DOI**: 10.22452/RD/5T6TZ7
- **URL**: https://researchdata.um.edu.my/dataset.xhtml?persistentId=doi:10.22452/RD/5T6TZ7
- **Coverage**: 8 muscles (5 intrinsic + 3 extrinsic), high-resolution STL
- **License**: Public Domain (CC0), no attribution required
- **Alignment**: Baked UM CT/segmentation mm → BP3D foot mm via Kabsch similarity on Calcaneus/Talus/Navicular/Cuboid/3 cuneiforms (mean residual ≈2.2 mm); transform at `third_party/um/um_to_bp3d_transform.json`; render scale stays `0.01`

### Z-Anatomy (CC BY-SA 4.0, isolated)
- **Repository**: https://github.com/Z-Anatomy/Models-of-human-anatomy
- **Coverage**: 10 nerves (6 Z-Anatomy CURVE tubes + 4 Open3D Kabsch volumetric teaching meshes)
- **Isolation**: `public/models/right-foot/by-sa/` + NOTICE.md
- **Attribution**: "Z-Anatomy - The libre 3D atlas of anatomy - CC BY-SA 4.0"

### Open3DModel / AnatomyTOOL (CC BY-SA 4.0, isolated)
- **Create page**: https://anatomytool.org/open3dmodel-create
- **Coverage**: Foot dorsal interossei (1st–4th) + posterior tibial artery + fibular artery
- **Isolation**: `public/models/right-foot/by-sa/` + NOTICE.md
- **Alignment**: Baked Open3D meters → BP3D mm via Kabsch on Calcaneus/Talus/Navicular/Cuboid/3 cuneiforms/MT1–5 (Day 4m re-fit after tarsal ID fix; mean residual ≈2.6 mm, prior 8-landmark ≈3.0 mm); render scale stays `0.01`

---

## Limitations

### Anatomical
- **BY-SA soft tissue**: DI + proximal PTA/fibular are Open3D ShareAlike fills (prefer future CC0/CC BY)
- **Ligament / fascia / tendon**: BP3D long plantar + Achilles; Open3D BY-SA 25 teaching meshes; further tarsal/toe bands still missing — **teaching-useful, not a finished ligament atlas**
- **Vessel fine detail**: Per-toe digital splits not available as separate BP3D meshes (honest grouped instead)
- **Nerve geometry**: Z-Anatomy CURVE tubes + Open3D volumetric fine branches (teaching-grade; commons/proprii grouped)
- **Extrinsic muscles**: Shown in full leg-to-foot extent (teaching context, not foot-only isolation)

### Technical
- **Not patient-specific**: Teaching-grade generic anatomy (not CT/MRI-derived)
- **Not validated for surgery**: Educational tool, not surgical planning software
- **ShareAlike module**: BY-SA 4.0 applies only to `by-sa/` directory (opt-in via layer toggles)

---

## Documentation

- **Design Spec**: `docs/superpowers/specs/2026-09-14-right-foot-anatomy-atlas-design.md`
- **Implementation Plan**: `docs/superpowers/plans/2026-09-14-right-foot-anatomy-atlas.md`
- **Asset Research**: `docs/assets-research-round2.md` (≥12 sources compared)
- **Terminology**: `docs/terminology.md` (TA2 Latin + PRC Chinese standards)
- **Methods**: `docs/methods.md` (data sources, extraction, limitations)
- **Contributing**: `CONTRIBUTING.md` (license boundaries, NC-trap exclusions)
- **Spatial Alignment QA**: `docs/spatial-alignment-qa.md` (0.01 scale verification)

---

## Development Workflow

### Week Sprint Log (Sep 9-14, 2026)
- **Day 1**: BP3D soft tissue discovery (15 muscles + 3 vessels)
- **Day 2**: UM hybrid strategy (5 muscles, quality-optimized)
- **Day 3**: Vessel expansion (arcuate artery, 5/6 coverage)
- **Day 4**: Z-Anatomy nerve integration (6/6, Blender extraction)
- **Day 5**: UM extrinsic muscles (3 P0 + 4 teaching, 13/14 total)
- **Day 6**: README factual rewrite + interaction QA

See `docs/daily-log.md` for detailed progress.

---

## Tests

```bash
npm test
```

- ✅ `structureLookup.test.ts`: Structure retrieval by ID/meshName
- ✅ `layers.test.ts`: Layer visibility helpers

All tests pass (7/7).

---

## Contributing

See `CONTRIBUTING.md` for:
- License compatibility rules (MIT + CC BY/CC0 accepted, BY-SA isolated, NC rejected)
- Asset contribution guidelines
- Known NC traps to avoid (UBC Krebs textures, Zenodo 21354714, NIH 15850)

---

## Acknowledgments

- **BodyParts3D** team (DBCLS Japan) for osteology + myology base
- **Universiti Malaya** for high-resolution CC0 lower extremity STL
- **Z-Anatomy** project (Gauthier Kervyn, Marcin Zielinski) for nerve CURVE models
- **Terminologia Anatomica 2** for anatomical nomenclature standards
- All open-source contributors to BP3D, UM, Z-Anatomy projects

---

## License

**Code**: MIT License (see `LICENSE`)  
**Assets**: CC BY 4.0 / CC0 1.0 / CC BY-SA 4.0 (see `manifest.json` + `by-sa/NOTICE.md`)

---

**Project Status**: Teaching-grade atlas in progress (Week 2) — **not a finished product**  
**Coverage**: 86 unique / 91 entries; main 52 vs BY-SA 34; ligament/tendon teaching-useful but incomplete (BP3D 1+1 + Open3D 25)  
**Repository**: https://github.com/linjinmiao1985/right-foot-anatomy-atlas
