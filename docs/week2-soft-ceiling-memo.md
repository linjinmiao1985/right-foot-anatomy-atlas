# Week 2: 软天花板备忘录 / Soft Ceiling Memo

**Date**: 2026-09-22 (Day 4cj) · Phase 7  
**Context**: Right foot anatomy atlas teaching census — honest inventory gap documentation  
**Policy**: CC0 / CC BY preferred; reject NC; BY-SA isolated under `by-sa/` only  

---

## What we searched (搜索范围)

**Exhaustive open-licensing hunt** across 109+ sources (digs **#38–#146**, Day 4ay–4ci):

| Repository class | Examples | Soft-tissue outcome |
|------------------|----------|---------------------|
| **Academic open-data** | Zenodo (foot/ankle CT/MRI/surface cohorts), HuBMAP, HRA/CCF, DU Visible Human, Imperial College | Bones / surfaces / grouped regions — **no** elemental DI/per-ray MTA |
| **Clinical segmentation** | TotalSegmentator CT/MRI (Zenodo 22688904 / 22688334), U Malaya Asian LE (doi:10.22452/RD/5T6TZ7) | Grouped `tarsal`/`metatarsal`/`phalanges_feet` only; **U Malaya readme explicitly excludes intrinsic foot muscles** (DI/plantar/lumbricals) |
| **Cadaver-derived** | Visible Korean (KISTI), DU VH Male/Female, Andreassen 2023 VHM (DOI 10.56902/COB.vh.2022.2) | **Andreassen gastroc/soleus CC BY 4.0**: 7-tarsal Kabsch spatial QA **FAIL** (Day 4az+4ba); foot laterality / Achilles continuity broken; **0 GLB wired** |
| **Augmented DICOM labels** | Henson Sheffield LE (Figshare 20440203 / 20440164) | **CC0** 69 DICOM class volumes (gastroc/soleus/EDL/FDL/…); Aug_8 MC POC OK, **BP3D Achilles alignment sketch FAIL** (Day 4bj); still label masks, not elemental foot DI/NV surface GLBs |
| **Anatomy platforms** | Sketchfab, Cults3D, OpenGameArt, Blender Studio, Wikimedia Commons | CC0 **skin-surface** meshes (not separated anatomy) OR license unconfirmed OR NC clauses |
| **Simulation/computational** | SPARC/Pennsieve scaffolds, OpenSim MSK, TPTBox, BioModels.net | Whole-body paths / computational models — not elemental foot soft tissue STL/GLB |
| **3D print repositories** | NIH 3D Print Exchange, Embodi3D, MedShapeNetCore, Utah Hive | Bones-only or NC-SA restrictions or fused pathology (not teaching anatomy) |
| **Existing CC BY 4.0 pools** | BodyParts3D (BP3D), Z-Anatomy, Open3DModel/AnatomyTOOL | **Already integrated**; BP3D lacks foot DI codes (only hand DI exists); Open3D DI = **grouped**, not per-toe elemental |

**Search methods**: Zenodo API license verification (`curl -s "https://zenodo.org/api/records/<id>" | grep license`), Digital Commons metadata scraping, Figshare API, GitHub 3D anatomy repos, Sketchfab/Cults3D refined searches, Smithsonian/MorphoSource specimens, academic paper supplemental data.

---

## Rejects (拒绝项)

### NC (Non-Commercial) — incompatible with MIT-licensed atlas

| Source | License | Content | Verdict |
|--------|---------|---------|---------|
| Zenodo **20228270** / **20231308** / **21354714** / **21527865** (Scan-the-World foot/ankle muscles) | **CC BY-NC-SA 4.0** (re-verified Day 4ay Zenodo API) | CT-derived foot muscle GLB — **includes DI/plantar interossei** | ❌ **REJECT** — NC clause blocks redistribution |
| NIH 3D Anatomic Human Foot | **CC BY-NC-SA** | Bones only | ❌ **REJECT** — NC + no soft tissue |
| Sheffield ORDA 9934055 (older-women LE) | **CC BY-NC 4.0** (Figshare API Day 4ay) | STL muscle pack | ❌ **REJECT** — NC clause |
| Visible Korean foot-muscle PDF | **CC BY-NC-ND 3.0** | Interactive PDF with lumbricalis / DI / plantar interossei 3D models | ❌ **REJECT** — NC + ND prohibits derivatives |
| Z-Anatomy/Anatria full-body packs (nqwrc/sonuyadav) | **CC BY-NC-SA** (when not BY-SA isolate) | Foot ligaments present | ❌ **REJECT** — NC clauses in united sets |

### SA (ShareAlike) — isolated under `by-sa/` only, not expanded for its own sake

| Source | License | Why not main-tree |
|--------|---------|-------------------|
| Open3D DI / fibularis / ankle ligament pack | **CC BY-SA 4.0** | Already in `by-sa/` isolate (`public/models/by-sa/`, ~71/124 unique meshes); teaching-grade **grouped DI** (not per-toe elemental); prefer CC0/BY replacement over net SA volume growth |
| Z-Anatomy / Anatomography dry nerve + muscle branches | **CC BY-SA 4.0** (Z-A pool) | Already in `by-sa/` teaching gap fill; SA surface stable (~71 unique), not a blocker — prefer shrink via CC0/BY alternative when available |
| BodyParts3D V4.3 mirror STLs (bcl200n legacy Zenodo 835227) | **CC BY-SA 2.1 JP** | Historical archive — same BP3D foot limitation (no DI codes); do not mix into main-tree CC BY 4.0 LSDB claim |

### UM (U Malaya Asian LE) — intrinsic foot muscles explicitly excluded

**Zenodo DOI 10.22452/RD/5T6TZ7** (2026-04-22) · **CC0 1.0** ✅ license compatible

**Content**: 67 STL — 42 muscles (psoas → abductor digiti minimi) + 13 bones + 5 ligaments + 2 tendons (Achilles/quad) + 1 meniscus; MRI-derived hip-to-foot LE

**Reject rationale** (Day 4cd assessment):
- Readme states: **"Intrinsic foot muscles (dorsal/plantar interossei, lumbricals) excluded due to MRI boundary identification difficulty"**
- Whole LE pack = likely hip/thigh/leg muscles + extrinsic tendons only — no foot-specific named soft tissue
- Same whole-LE Kabsch alignment blocker as Andreassen (single similarity transform cannot hold foot+calf; see below)
- 58.3 MB download **not justified** when DI/NV/lumbricals absent per readme

**Verdict**: ❌ **REJECT** integrate — intrinsic foot muscles excluded; `third_party/u-malaya-asian-le/NOTICE.txt` documents CC0 verification + exclusion rationale.

### NIH 3D Print Exchange 3DPX-015850 "Anatomic Human Foot" — bones-only; license unclear

**NIH 3DPX**: entry 15850 (https://3d.nih.gov/entries/15850/1) · License **unclear** (no explicit CC0/CC-BY stated in search results)

**Content** (Day 4cr dig #164 provisional assessment): Anatomic foot model designed in Lightwave 3D (Dr Glass); **26 proper bones + 2 sesamoids** (1st MTP); X3D format available; newer processed .glb versions in version history

**Foot soft-tissue inventory**: ❌ **Bones-only** — description emphasizes foot skeletal anatomy (26 proper + 2 sesamoids); **no mention** of muscles (DI, lumbricals, plantar layers, calf) in search results or entry summary

**Reject rationale**: **Bones-only** (not soft-tissue gap filler); license unclear without full entry page inspection (NIH 3DPX entries vary: some CC0, some CC-BY, some unclear); atlas already has BP3D + UM bones (26 foot bones covered); bones-only = not useful for DI/lumbricals/MTA soft gaps

**Teaching value**: ❌ None — bones-only (atlas bone coverage complete); no soft-tissue inventory

**Verdict**: 🔍 **MONITOR** for license clarity only — **not a soft-tissue gap filler** (bones-only; atlas already complete for foot osteology)

### Zenodo 20231309 Scan-the-World "Muscles of the foot and ankle" — NC disqualifies

**Zenodo DOI 10.5281/zenodo.20231309** (2026-05-12) · **CC BY-NC-SA 4.0** ❌ license **NOT** compatible (NC + SA)

**Content** (deep-check Day 4cq, dig #161b): CT-derived right foot and ankle muscular model (Scan-the-World; embodi3d source); 1 GLB file (1.99 MB) + USDZ + preview PNGs; description: "model of the muscular structure of a right foot and ankle"

**Foot soft-tissue inventory**: Unknown per-muscle detail — API metadata and description do not enumerate individual muscles (e.g., whether DI per-toe, lumbricals, plantar layers, calf bellies are present or grouped); would require GLB inspection to verify inventory, but **license already disqualifies**

**Reject rationale**:
- **NC (Non-Commercial)** clause disqualifies for MIT-licensed atlas main tree (same as Zenodo ScanTW 20228270/20231308/21354714/21527865, Visible Korean, NIH foot, Sheffield 9934055)
- **SA (ShareAlike)** clause would require `by-sa/` isolate even if NC were waived — but atlas policy prefers CC0/CC-BY main-tree replacements over net SA volume growth
- Inventory unknown: description states "muscular structure" but no per-muscle catalog visible without GLB download + inspection; teaching value unverifiable without license compatibility

**Teaching value**: ❌ None — NC license blocks integration regardless of muscle inventory

**Verdict**: ❌ **REJECT** integrate — **NC + SA** disqualifies; inventory inspection not justified when license already fails gate

### LABIM3D (Universidad Austral de Chile) — no foot anatomy in catalog

**GitHub**: FernandandreaTM/labim3d · **CC BY 4.0** (README claim; no LICENSE file) ✅ license compatible

**Content** (deep-check Day 4co, dig #158b): Open-access platform for curated 3D anatomical models (JSON-based CMS, Three.js viewer, print-ready STL); **9 models** catalogued (March 2026 v1.0):
- aparato-vestibular, articulacion-hombro (2 variants), articulacion-rodilla, oido-interno (2 variants), pelvis-completa, vertebra-lumbar, vertebra-toracica

**Foot anatomy search** (Day 4co): Repository cloned and fully inspected; `grep -r "foot\|pie\|inteross\|lumbric\|metatars"` (HTML+JSON) → **0 matches**; 20+ STL files present but **no foot anatomy** (ear/shoulder/knee/pelvis/vertebrae only)

**Reject rationale**:
- **0** foot anatomy models in current catalog (no DI, lumbricals, plantar layers, MTA, calf, or even foot bones)
- Platform architecture promising for future contributions (TecMedHub educational focus; CC BY 4.0; STL + metadata workflow)
- Current content scope excludes foot anatomy entirely

**Verdict**: ❌ **REJECT** as foot soft-tissue source — **monitor** for future foot additions to catalog

### Andreassen (VHM gastroc/soleus) — spatial alignment FAIL

**DU Visible Human Male Final STL** (DOI 10.56902/COB.vh.2022.2) · **CC BY 4.0** ✅ license OK

**Content**: Right LE — gastroc medialis/lateralis + soleus + 7 tarsals (calcaneus/talus/navicular/cuboid/3 cuneiforms) extracted from cryosection-derived STL pack (Sci Data 10.1038/s41597-022-01905-2)

**Day 4az+4ba trial summary**:
1. **7-tarsal Kabsch** (VH tarsals → BP3D tarsals): scale ≈0.796, mean residual ≈**2.30 mm**, max ≈**4.27 mm** (talus) — teaching-grade **on foot bones alone**
2. **Spatial QA FAIL**:
   - Gastroc med/lat **all vertices X>0** (wrong side of foot)
   - Soleus `frac_inside_padded` ≈**0.09**, centroid X>0
   - Achilles min gap gastroc ≈**109 mm** / soleus ≈**32 mm** (continuity broken)
3. **Option A retry** (real BP3D LE landmarks FJ3387 tibia / FJ3366 fibula / FJ3381 patella / FJ3365 femur + VH donor bones): 9 landmark sets in `le_kabash_option_a_trials.json` — **0** pass integrate gate; best near-miss = right-side OK but gastroc lateral Achilles ≈**21.6 mm** FAIL, foot mean ≈**8.8 mm** FAIL
4. **Blocker**: Single similarity transform (rotation + uniform scale + translation) **insufficient** for whole LE (hip→foot); foot anatomical proportion ≠ calf/thigh proportion in VH vs BP3D frames

**Artifacts**: `third_party/andreassen/vh_to_bp3d_transform.json`, `spatial_qa.json`, `le_kabash_option_a_trials.json`, `NOTICE.txt`

**Verdict**: ❌ **BLOCKED** (alignment) — **0** meshes wired; still **reject** as foot DI/per-ray MTA source (only extrinsic leg bellies present); teaching alternative path = multi-stage registration OR TPS OR BP3D-native alternative (see `docs/belly-registration-alternatives.md`)

**Same blocker applies to**: U Malaya LE (hip→foot pack), Sheffield Henson DICOM labels (whole LE masks), DU VH STL cohorts (pelvis→ankle extent)

---

## Remaining gaps (剩余缺口)

| Gap | Current teaching fill | Wanted | Still dry after #38–#146 |
|-----|----------------------|--------|-------------------------|
| **Dorsal interossei (DI) 1st–4th** | Open3D **grouped** `Interossei_dorsales.r` (CC BY-SA, `by-sa/` isolate) | CC0 / CC BY **per-toe elemental** or clear DI pack | ✅ Zenodo NC-SA has DI; UMLUB Sketchfab license unstated; UM excludes intrinsics; Visible Korean NC-ND — **no usable source** |
| **Per-ray 1st–4th dorsal/plantar metatarsal arteries** | Open3D + BP3D **grouped** only (dorsal MTA = all rays in one mesh; plantar MTA FJ2096 = all rays in one) | CC0 / CC BY **per-ray 1st/2nd/3rd/4th segmentation** | ✅ TotalSegmentator CT/MRI lack named foot vessels; ISA lacks per-ray MTA elementals; BP3D FJ2072/FJ2096 grouped — **no per-ray source** |
| **Lumbricals** | Absent (placeholder in structures.json) | CC0 / CC BY elemental | ✅ Visible Korean NC-ND has lumbricals; UM excludes intrinsics — **no usable source** |
| **Plantar layers (quadratus plantae, adductors 2–5 per-toe detail)** | Absent or grouped teaching-grade | CC0 / CC BY per-toe elemental | ✅ UM excludes intrinsics; Open3D lacks; BP3D lacks — **no usable source** |
| **Gastroc medialis/lateralis + soleus bellies** | Absent (Achilles tendon + plantaris only) | CC0 / CC BY aligned to BP3D Achilles frame | ✅ Andreassen CC BY 4.0 **spatial QA FAIL**; Henson CC0 DICOM masks **alignment sketch FAIL** (Day 4bj); OpenSim = sims not STL — **no aligned source** |

**Soft inventory ceiling**: ~**129/124** structures ontology-integrated; **126/129** on-disk GLB count (3 vessels still placeholder); **0** new DI/per-ray MTA/lumbricals/extrinsic bellies wired after 109+ source sweep.

---

## Teaching stance (教学态度)

### Honest transparency (诚实透明)

1. **Census soft ceiling acknowledged** — this atlas is a **teaching-grade work-in-progress**, NOT a finished anatomical reference or clinical tool.
2. **Grouped annotations are teaching compromises** — `interossei_dorsales` (DI 1–4 combined), `dorsal_metatarsal_arteries` (all rays), `plantar_metatarsal_arteries` (all rays) explicitly labeled in `getTeachingMeshNote()` as grouped, not elemental per-toe/per-ray atlases.
3. **Panel gap notes surface soft ceiling** — bilingual `meshNote` for DI / dorsal MTA / plantar MTA states "census 软天花板 / census soft ceiling" + "teaching-grade grouped annotation, not per-toe/per-ray atlas" when user selects those structures (Day 4ci).
4. **Footer factual** — `ATLAS_SOURCE_FOOTER` lists sources (BP3D / UM / Z-A / Open3D) + license segregation (`by-sa/` isolate), no "complete atlas" language.
5. **README census table** — 129/124 structures openly tabulated with `placeholder: true` / `grouped: true` / `by-sa/` isolation flags visible.

### Rejection discipline (拒绝纪律)

- **NC (Non-Commercial) rejected** — even when DI/lumbricals present (Zenodo ScanTW, Visible Korean), MIT-licensed atlas cannot carry NC-restricted derivatives.
- **License-unclear rejected** — Sketchfab/Cults3D models without explicit CC0/CC BY badge not integrated (UMLUB DI, caestudio DI).
- **Spatial QA gate enforced** — Andreassen CC BY 4.0 gastroc/soleus **not force-wired** despite license compatibility; teaching integrity > mesh count inflation.
- **SA volume not expanded for its own sake** — Open3D BY-SA already in `by-sa/` isolate (~71/124 unique); prefer CC0/BY replacement to shrink SA surface, not add net SA.

### Active monitoring (主动监控)

**Watchlist maintained** (`docs/cc0-soft-tissue-watchlist.md`) with:
- Henson Sheffield **CC0** DICOM labels (gastroc/soleus/EDL/FDL/…) — **monitor** for future mesh-extraction path (non-similarity registration / multi-atlas tooling); Aug_8 MC POC confirms labels readable; BP3D alignment sketch still fail (Day 4bj)
- TotalSegmentator v3 CT/MRI — **monitor** catalog updates for future named foot vessels (currently grouped bones only)
- HuBMAP / HRA / MedShapeNetCore / Figshare/Zenodo open-data feeds — **monitor** for new CC0/BY foot soft segmentations

**Prefer evidence over spam** — teaching polish (master ghost opacity, focus-visible a11y, keyboard help, quiz mode stub, bilingual gap notes) prioritized over forcing dry digs; **0** meshes wired Day 4ay–4ci by design (soft ceiling reached).

### User-facing honesty copy

**Current panel notes** (Day 4ci):
- **`interossei_dorsales`**: "Open3D grouped DI 1st–4th (CC BY-SA), no per-toe elemental split (census soft ceiling: no CC0/BY per-toe DI source meshes); by-sa/ isolate. Teaching-grade grouped annotation, not per-toe muscle atlas."
- **`dorsal_metatarsal_arteries`**: "Open3D grouped dorsal MTA (CC BY-SA), no 1st–4th elemental split (census soft ceiling: no CC0/BY per-ray dorsal metatarsal artery source meshes); by-sa/ isolate. Teaching-grade grouped annotation, not per-ray vessel atlas."
- **`plantar_metatarsal_arteries`**: "BP3D FJ2096 grouped plantar MTA (CC BY), no 1st–4th ray split (census soft ceiling: ISA lacks per-ray plantar/dorsal MTA elementals; no CC0/BY per-ray source meshes). Teaching-grade grouped annotation, not per-ray vessel atlas."

---

## Bottom line (底线)

**Soft ceiling = inventory reality** — after exhaustive 109+ source sweep (#38–#146), **no CC0/BY foot DI / per-ray MTA / lumbricals / extrinsic bellies** exist in aligned, teaching-ready form. Andreassen/Henson **blocked** (spatial alignment). UM **explicitly excludes** intrinsics. NC sources **rejected** (license). License-unclear **rejected** (verification).

**Teaching-grade grouped annotations honest** — DI/MTA meshNote surfaced to user; not hidden; not marketed as complete per-toe atlas.

**Phase 7 teaching polish preferred over dry spam** — master ghost opacity, focus-visible a11y, keyboard help, quiz stub, bilingual gap notes, daily census verification gates (vitest 138 tests / integrity-audit / build) demonstrate **teaching tool development**, not mesh-count inflation race.

**Not a finished product** — teaching atlas in progress; open census gaps documented; **no clinical use claim**; **no TA2-complete claim**.

---

**Memo authored**: Day 4cj (2026-09-22)  
**Companion docs**: `docs/cc0-soft-tissue-watchlist.md`, `docs/week2-dorsal-interossei-search.md`, `docs/belly-registration-alternatives.md`, `docs/daily-log.md` Day 4ay–4ci, `docs/cloud-agent-handback.md`

---

## Day 4ct watch dig status (through #170)

**Date**: 2026-09-22 · Day 4ct  
**Dig range**: #147 (Day 4cl) → #170 (Day 4ct)  
**Total watch digs**: 24 NEW source checks (Day 4cl–4ct; skip re-logging #1–#146)

**Summary**:
- **#147–#170** (24 digs across Zenodo, HuBMAP, TotalSegmentator, LABIM3D GitHub, Foot3D, BoneHub, Scan-the-World, NIH 3DPX, AnatomyTOOL, MorphoSource, 7T MRI, Dryad, Thingiverse, Cults3D, Figshare, PhysioNet/SimTK):
  - **0** new CC0/CC-BY ready-to-use foot soft-tissue meshes integrated
  - **NC (Non-Commercial)**: Zenodo Scan-the-World 20228270/20231308/20231309 (#147, #161b); BoneHub vsd-feet-seg (#163)
  - **SA (ShareAlike)**: AnatomyTOOL Open3DModel (#165); Thingiverse BodyParts3D V3.0 legacy (#168)
  - **License unclear**: Cults3D MeEzra models (#160, #168)
  - **No foot inventory**: LABIM3D GitHub (#158b ear/shoulder/knee/pelvis/spine only)
  - **Bones-only**: NIH 3DPX 15850 (#164); Thingiverse/Foot_Right (#168)
  - **No downloadable mesh**: MorphoSource + 7T MRI studies (#166); Dryad + MRI studies (#167); Figshare + Micromachines 2022 AR (#169)
  - **CT-only (no pre-segmented mesh)**: PhysioNet/SimTK Multidomain (#170; raw CT public domain but requires manual 3D Slicer segmentation + Kabsch QA; labor-intensive path)
  - **External surface scans only**: Foot3D Kaggle/GitHub (#162)

**Result**: Soft-tissue open-data ceiling **reconfirmed through #170** (Day 4ct). License-clear ready-to-use per-toe DI, lumbricals, per-ray MTA meshes **remain unavailable**. 7T MRI + Micromachines 2022 confirm high-resolution intrinsic foot muscle segmentation **technically feasible** (lumbricals, dorsal/plantar interossei successfully segmented) but research datasets **not publicly archived** as downloadable STL/OBJ. PhysioNet/SimTK Multidomain raw CT = public domain but manual segmentation labor-intensive (not immediate gap filler). Open3DModel/AnatomyTOOL confirms 4 DI + 4 lumbricals + 3 PI present but **SA-only** (Open3D lineage already in `by-sa/` isolate; no CC0/CC-BY alternative).

**Teaching stance**: **Grouped structures** (DI 1st–4th combined, dorsal/plantar MTA all rays) are **teaching compromises** (教学妥协), not per-toe/per-ray elemental atlases. Census unchanged (**129/124**; ontology **126/129**). **0** new meshes wired. Teaching atlas **in progress** — **not** clinical; **not** TA2-complete; **not** a finished product.

---

## Post–Week 2 sparse watch update (Day 4dk–4ds)

**Date**: 2026-09-23–25 · Day 4dk through Day 4ds (Week 3–4 sparse watch)  
**Additional digs**: #171–#184 (14 sparse watch digs; all DRY or MONITOR/REJECT)

**Outcomes**:
- **#171–#173** (Day 4dd): Cults3D/CGTrader/Wikimedia generic (DRY; license unclear); IFAA terminology BY-SA (DRY; terminology not meshes); Open3DModel/Complete Anatomy/Pennsieve (DRY; BY-SA / subscription / license unclear)
- **#174–#175** (Day 4dg): AnatomyZone/Kenhub quadratus plantae BY-SA (DRY); BP3D V3.0 SA 2.1 JP already rejected
- **#176** (Day 4dj): Foot plantar intrinsic muscles 2026 (DRY; Open3DModel BY-SA / Visible Korean NC-ND / Zenodo Scan-the-World NC+SA / Cults3D unclear / Proko subscription)
- **#177–#178** (Day 4dk): MRI segmentation papers no public meshes (DRY); Andreassen already rejected Day 4ay/4az; BoneHub NC-SA rejected
- **#179–#180** (Day 4dq): MuscleMap foot CVM still in dev (MONITOR; MIT software no public dataset); TotalSegmentator v2.15.0 foot bones MR only no soft tissue (DRY); Zenodo Scan-the-World 2026 NC+SA already rejected; UM Apr 2026 update no new foot intrinsics (DRY)
- **#181–#182** (Day 4dr): MuscleMap v1.4 (Aug 2026) adds leg extrinsics (EDL/EHL/tibialis posterior/FDL/popliteus/plantaris/gastroc compartments) but **no foot intrinsics** (MONITOR/DRY); Alana Sharp LiMRIC Sketchfab foot muscle model not downloadable + license unclear (REJECT)
- **#183–#184** (Day 4ds): LivingLab Sketchfab “Human Foot Anatomy” (May 2026) API license empty + not downloadable (REJECT); Knaus/Blemker soleus FE geometry has no public CC0/BY STL (DRY). Zenodo API 403 this session — no new Zenodo hit claimed

**Day 4ct summary above remains canonical** (24 digs #147–#170; comprehensive 1-page freeze). Post–Week 2 sparse watch digs #171–#184 extend the DRY outcome; no changes to teaching-compromise stance. Soft-tissue open-data ceiling **reconfirmed through #184** (Day 4ds).


