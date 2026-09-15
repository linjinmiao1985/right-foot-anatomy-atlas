# Right Foot Anatomy Atlas · 右足解剖图谱

Interactive web-based teaching atlas for right foot anatomy.  
基于Web的交互式右足解剖教学图谱。

> ⚕️ **Educational Use Only**: Teaching-grade anatomical resource for medical students, anatomy instructors, and foot/ankle residents. Not for clinical diagnosis or treatment planning.

---

## Coverage

| Layer | Real Meshes | Placeholder | Total | Sources |
|-------|-------------|-------------|-------|---------|
| **Bones** | **25/25 (100%)** ✅ | 0 | 25 | BP3D (21) + UM (4) |
| **Muscles** | 13/14 (93%) | 1 | 14 | BP3D (12) + UM (8) |
| **Vessels** | 5/9 (56%) | 4 | 9 | BodyParts3D (CC BY 4.0) |
| **Nerves** | 6/6 (100%) ✅ | 0 | 6 | Z-Anatomy (CC BY-SA 4.0, isolated) |
| **Total** | **49/54 (91%)** | **5** | **54** | MIT code + open assets |

**Note**: Total structures = 59 in `structures.json` (accounting for multi-part muscles: AH oblique+transverse, FHB medial+lateral, Lumbricals 1-4, Plantar interossei 1-3). Total unique structures = 54 when multi-parts counted once.

### Gaps (5 remaining)
- **Muscles**: Dorsal interossei (absent in BP3D, UM, Z-Anatomy)
- **Vessels**: Dorsal/plantar metatarsal digital branches (4 structures, fine detail, BP3D lacks individual codes)

---

## License Map

| Component | License | Redistribution |
|-----------|---------|----------------|
| **Code** (`src/`, `vite.config.ts`, etc.) | MIT | ✅ Free, commercial OK |
| **Bones + most vessels** | CC BY 4.0 (BodyParts3D) | ✅ Free, attribution required |
| **Muscles** | CC BY 4.0 (BP3D) + CC0 1.0 (UM) | ✅ Free, no strings (UM) |
| **Nerves** (in `by-sa/` only) | CC BY-SA 4.0 (Z-Anatomy) | ⚠️ ShareAlike if modified |

**User Choice**: Load nerve layer → accept BY-SA terms. Skip nerve layer → MIT + CC BY/CC0 only.

---

## Features

- **4-layer toggle**: Bone / Muscle / Nerve / Vessel visibility control
- **Click selection**: Shows Chinese name, Latin name (TA2), summary
- **Hover tooltips**: Quick structure identification
- **OrbitControls**: Zoom, rotate, pan around foot
- **Loading states**: Progress indicators for GLB assets
- **Keyboard**: `Esc` to deselect

---

## Tech Stack

- **Frontend**: Vite + React 18 + TypeScript 5
- **3D Engine**: Three.js + React Three Fiber + @react-three/drei
- **Data**: `structures.json` (59 structures, TA2-compliant naming)
- **Assets**: 55 GLB meshes (~15.4MB total: 25 bones + 13 muscles + 5 vessels + 6 nerves + 6 muscle parts)
- **Testing**: Vitest + @testing-library/react (7/7 tests ✅)

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

### Z-Anatomy (CC BY-SA 4.0, isolated)
- **Repository**: https://github.com/Z-Anatomy/Models-of-human-anatomy
- **Coverage**: 6 nerves (CURVE geometry, thin tubes)
- **Isolation**: `public/models/right-foot/by-sa/` + NOTICE.md
- **Attribution**: "Z-Anatomy - The libre 3D atlas of anatomy - CC BY-SA 4.0"

---

## Limitations

### Anatomical
- **Dorsal interossei**: No open-source foot dorsal interossei found (BP3D/UM/Z-Anatomy lack)
- **Vessel fine detail**: Digital branches missing (BP3D does not segment at this granularity)
- **Nerve geometry**: CURVE tubes (not volumetric meshes like bones/muscles)
- **Extrinsic muscles**: Shown in full leg-to-foot extent (teaching context, not foot-only isolation)

### Technical
- **Not patient-specific**: Teaching-grade generic anatomy (not CT/MRI-derived)
- **Not validated for surgery**: Educational tool, not surgical planning software
- **ShareAlike nerves**: BY-SA 4.0 applies only to `by-sa/` directory (opt-in)

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

**Project Status**: Teaching-grade atlas, week sprint in progress (Day 6/7)  
**Coverage**: 88% real meshes (38/43 structures)  
**Repository**: https://github.com/linjinmiao1985/right-foot-anatomy-atlas
