# CC0 / CC BY soft-tissue watchlist (monitor · not integrated)

**Date**: 2026-09-15 · Day 4bg / Phase 7  
**Policy**: Prefer **CC0 / CC BY** main-tree replacements that shrink ShareAlike surface. Dig + verify license page / SPDX / Zenodo `license.id` **before** any wire. **Reject** NC, unclear “License: Model”, and All Rights Reserved. BY-SA only under `by-sa/` + NOTICE — do not spam SA volume for its own sake.  
**Status**: Living watchlist — **0** new soft-tissue meshes integrated from this list as of Day **4bg**. Andreassen gastroc/soleus still **blocked** (Day 4az+4ba); Day 4bf Utah Hive **reject** bones; Day 4bg Henson **CC0** LE muscle DICOM labels = **monitor** (not GLB-ready); soft gaps still dry. Teaching atlas in progress — **not** a finished-product claim.

Companion: `docs/open-anatomy-learning-log.md` (#38–#68 and earlier), `docs/phase-7-self-review.md`.

---

## Priority gaps (why we watch)

| Gap | Current teaching fill | Wanted license | Blocker |
|-----|----------------------|----------------|---------|
| **Dorsal interossei (DI)** | Open3D BY-SA grouped under `by-sa/` | CC0 / CC BY elemental or clear DI pack | No license-clean DI pack found (UMLUB Sketchfab unclear; Embodi3D NC-SA) |
| **Per-ray 1st–4th MTA / digital aa.** | BP3D + Open3D **grouped** only | CC0 / CC BY per-ray segmentation | Soft inventory ceiling — TotalSegmentator CT/MRI lack named foot vessels |
| **Gastroc / soleus bellies** | Absent (Achilles + plantaris only) | CC0 / CC BY bellies | **BLOCKED Day 4az + 4ba**: 7-tarsal laterality FAIL; Option A real BP3D LE (FJ3387/3366/3381/3365) + VH bones still FAIL (foot residual / Achilles). Artifacts: `vh_to_bp3d_transform.json`, `spatial_qa.json`, `le_kabsch_option_a_trials.json`. **Not wired** |
| **Nerve / ligament SA surface** | 17 nerves + 27 lig·retinacula Open3D/ZA BY-SA | CC0 / CC BY replacements | Prefer shrink SA (~71/124 unique) over more isolate volume |
| **Named ankle bands in ZA.blend** | Open3D BY-SA ATFL/CFL/deltoid set | Same or better under BY/CC0 | Prior Zenodo `.blend` lacked named ATFL/CFL/deltoid/retinacula |

---

## Monitor (re-check later)

| # / source | License (verified window) | What it is | Why monitor | Action |
|------------|---------------------------|------------|-------------|--------|
| **#40** Schuster foot shape-function PLYs (Zenodo 10.5281/zenodo.10360304) | **CC0** (Zenodo API `cc-zero` **re-verified Day 4ay**) | External foot-surface cohort | Plantar-surface / shape research only — **not** named intrinsics/NV | **monitor** surface UX; **reject** named soft teaching |
| **#38** TotalSegmentator v3 CT (Zenodo 10.5281/zenodo.22688904) | Dataset **CC BY 4.0** (`cc-by-4.0` **re-verified Day 4ay**) | Grouped `tarsal` / `metatarsal` / `phalanges_feet` | Future osteology surface QA — no DI/NV/per-ray MTA | **monitor** bones; **reject** soft NV |
| **#57** TotalSegmentator MRI (Zenodo 10.5281/zenodo.22688334) | Dataset **CC BY 4.0** (Zenodo API Day 4ay) | 50 MRI regions; appendicular still grouped foot bones; thigh packs lack gastroc/soleus/foot DI | Same soft ceiling as CT pack | **monitor** catalog; **reject** DI/NV/per-ray MTA / extrinsic belly source |
| **#39** HRA / CCF 3D Reference Object Library | **CC BY 4.0** | Whole-body VH united GLBs | Organ/CCF scale; watch if foot soft parts ever appear as named packs | **monitor**; **reject** as current DI/MTA source |
| **#42** MedShapeNetCore (Zenodo 10.5281/zenodo.10609965) | **CC BY 4.0** (`cc-by-4.0` **re-verified Day 4ay**) | Multi-organ NPZ packs | Future search API — no foot DI/NV in listed files | **monitor** catalog; **reject** foot soft now |
| **#46 / Andreassen 2023 VHF+VHM LE muscles** (Digital Commons @ DU · DOI 10.56902/COB.vh.2022.2 Male Final STL · Sci Data 10.1038/s41597-022-01905-2) | **CC BY 4.0** (Digital Commons + package README; re-verified Day 4az download) | VHM Right Final STL: gastroc med/lat + soleus + tarsals extracted | Day **4az** + **4ba** Option A (real BP3D LE + VH bones) Kabsch attempted; **spatial QA FAIL**. Trials JSON recorded; **0 GLB wire** | **blocked (alignment)** — LE landmarks available but single similarity cannot hold foot+calf; need alternate registration/donor; still **reject** as DI/NV/per-ray MTA source |
| **#50** HuBMAP Female v1.5 / Femora | **CC BY 4.0** | Female whole-body united GLB | Foot coverage vs our BP3D male foot — naming only unless elemental soft appears | **monitor**; **reject** united GLB as right-foot substitute |
| **#55** Grant et al. foot bone SSMs (Zenodo 10.5281/zenodo.3464747) | **CC BY 4.0** (Zenodo API Day 4ay) | MRI-derived STLs: talus / calcaneus / midfoot / 1st MT (L/R cohorts) | Osteology SSM QA only — **0** soft files in record | **monitor** bones; **reject** soft teaching |
| Blender Studio Human Base Meshes — foot (Commons CC0 STL) | **CC0 1.0** | High-res **skin/surface** foot | Silhouette UX only — no named DI/NV | **monitor** surface; **reject** anatomy teaching DI/NV |
| **#61** Imperial College London femur+tibia surfaces (Zenodo 10.5281/zenodo.167808) | **CC BY 4.0** (Zenodo API Day 4bb) | MRI LE femur/tibia/fibula surfaces (35 volunteers) | LE osteology / proportion research only — **0** soft | **monitor** LE bones; **reject** soft teaching |
| Future Zenodo / open CT foot soft segmentations | TBD | Named DI, vessels, ligaments | Only if SPDX CC0/BY and elemental teaching value | **monitor** dig queue |
| **#66** Henson Sheffield augmented LE muscle segmentations (Figshare **10.15131/shef.data.20440203** + MR **20440164**) | **CC0** (Figshare API Day 4bg) | 69 DICOM label volumes · 37 LE muscle classes incl. gastroc/soleus / long flex-ext / peronei | Masks ≠ elemental foot DI/NV GLBs; possible future extrinsic-belly research | **monitor** masks; **reject** ready teaching mesh wire; **not** Andreassen Kabsch retry |
| **#68** CEINMS-RT LowerLimbModel | Code **Apache-2.0**; Zenodo 6457662 open / SPDX unset | OpenSim MSK paths (soleus + gastroc + tib_ant …) | Simulation lines, not surface atlas meshes | **monitor** process; **reject** soft GLB substitute |

---

## Reject / blocked (do not wire to main tree)

| Source | Why blocked |
|--------|-------------|
| **#41** NIH 3D Anatomic Human Foot | **CC-BY-NC-SA** — NC blocks main tree; bones only |
| Embodi3D / Scan-the-World foot muscles (Zenodo **20228270** / **20231308** / **21354714** / **21527865**) | **CC BY-NC-SA 4.0** Zenodo API **re-verified Day 4ay** |
| UMLUB Sketchfab Dorsal Interossei I–IV | License **not** openly stated |
| **#44** SimTK OpenSim ankle-foot | Page “License: Model” — not clear CC0/CC BY SPDX |
| Zenodo packs still **BY-NC-SA** (e.g. prior 20228270 lineage) | NC |
| Anatomography / Moerman BP3D **BY-SA 2.1 JP** mirrors | Do not mix into main-tree **CC BY 4.0** LSDB claim (`#47`/`#48` isolate-SA only) |
| **#56** FOAMRIS MRI OA atlas (Leeds DOI **10.5518/1568**) | **CC BY 4.0** but **PDF imaging scoring atlas** — not elemental 3D soft meshes |
| Sheffield ORDA / Figshare lower-limb older-women muscles (9934055) | **CC BY-NC 4.0** (Figshare API `license.name` Day 4ay) — NC |
| OpenGameArt “Foot Base Model” (Vinrax) | CC0/CC-BY **game skin** base — not named DI/NV teaching anatomy |
| **#58** OMFAtlas dental NC/SA packs (Open-Full-Jaw / ToothFairy3) | **CC BY-NC-SA** / **CC BY-SA** dental — not foot soft; NC blocks main tree |
| **#59** Anatria male ZA GLBs | **CC BY-SA 4.0** Z-Anatomy pool — isolate-SA only; not a new DI/NV source |
| Day 4bb pressure/kinematics Zenodo hits (CAD WALK, PAPPI, plantar images) | CC BY/CC0 **biomechanics / pressure** — not elemental 3D soft meshes |
| **#63** Utah Hive Dual Fluoroscopy / Ankle Arthrodesis (DOI 10.7278/S5d-1nqg-0fqd) | **CC BY 3.0** OK — **reject integrate**: arthrodesis **fused** tibia–talus + distal tibia/talus/calcaneus only; no midfoot/MT/phalanx; multi-subject clinical CT ≠ BP3D frame; osteology already **26/26**; 8.7 GB zip; **0** soft DI/NV |

---

## Day 4ay dig summary

| Check | Result |
|-------|--------|
| Re-verify watchlist Zenodo licenses (#38/#40/#42 + ScanTW NC mirrors) | Unchanged — still CC0 / CC BY / NC-SA as recorded |
| Andreassen STL reuse terms | **Upgraded**: Digital Commons pages state **CC BY 4.0** (was “re-verify before wire”) |
| New CC0/BY soft packs for DI / per-ray MTA / nerves / ligaments | **None** found (Zenodo + Leeds + Figshare dig) |
| Clear CC BY extrinsic-belly candidate | Andreassen gastroc/soleus — **documented only**; **0 integrate** this pass (quality gate: spatial QA + handback) |
| Meshes integrated | **0** |

---

## Day 4ba Option A LE retry

| Item | Result |
|------|--------|
| BP3D cache parts | FJ3387 tibia · FJ3366 fibula · FJ3381 patella · FJ3365 femur (local `/tmp/bp3d` zip) |
| VH donor bones | Tibia (ASCII STL) · fibula/femur/patella (binary) from Final STL zip |
| Trials | 9 landmark sets in `le_kabsch_option_a_trials.json` — **0** pass integrate gate |
| Best near-miss | `H_ankle_focus`: right-side OK; gastroc lat Achilles≈21.6 mm FAIL; foot mean≈8.8 mm FAIL |
| Wire | **0** |

## Day 4az Andreassen belly attempt

| Check | Result |
|-------|--------|
| Download | VHM **Final 3D STL Models** zip (Digital Commons viewcontent filename=10, article=1000) — CC BY 4.0 README in package |
| Extract | Right: Calcaneus/Talus/Navicular/Cuboid/3 cuneiforms + Gastroc med/lat + Soleus |
| Kabsch (7 tarsals) | scale≈0.796; mean residual≈**2.30 mm**; max≈**4.27 mm** (talus) — teaching-grade on foot bones |
| Spatial QA | **FAIL**: gastroc med/lat **all verts X>0**; soleus frac_inside_padded≈**0.09**, centroid X>0; Achilles min gap gastroc≈109 mm / soleus≈32 mm |
| Proximal-landmark trial | Synthetic BP3D tibia/fibula distal improved laterality but foot residuals mean≈8.3 / max≈17.8 mm — rejected |
| Wire | **0** — no `public/models/` GLB, no `structures.json` / FootModel / ontology / muscle-group entries |
| Artifacts | `third_party/andreassen/vh_to_bp3d_transform.json`, `spatial_qa.json`, `NOTICE.txt` |

---

## Resume checklist (Cloud Agent or local)

1. Re-open this file + learning-log row; confirm license still CC0/BY (Zenodo API / LICENSE / lic.html / Digital Commons license block).
2. Confirm content is **named** soft tissue (not grouped surface / 2D masks / game skin only).
3. Run spatial QA gates (padded AABB, laterality X≤0, attachment rules) before `structures.json` wire.
4. Prefer **replacing** an existing `by-sa/` teaching mesh over adding net SA count.
5. **Andreassen belly path (blocked after Option A)**: real BP3D LE landmarks **tried** Day 4ba — still fail; need non-similarity / alternate donor. Do **not** force-wire. Re-read `le_kabsch_option_a_trials.json` + `docs/cloud-agent-handback.md`.
6. Gates: `python3 scripts/integrity-audit.py` · `npx vitest run` · `npm run build`.
7. Update census in README / methods / phase-7 if anything wires — **no** finished-product claim.

---

## Day 4bb open mining (Andreassen skipped)

| Check | Result |
|-------|--------|
| New CC0/BY soft packs for DI / per-ray MTA / nerves / ligaments / bellies | **None** (#58–#60 UX/platform; #61 LE bones only) |
| Andreassen Kabsch | **Not re-opened** this pass |
| Meshes integrated | **0** |

## Day 4bf Utah Hive bone assess

| Check | Result |
|-------|--------|
| License | **CC BY 3.0** (Hive API + README) — compatible, not blocker |
| Improve main-tree bones vs BP3D? | **No** — atlas osteology already 26/26; Hive lacks midfoot/MT/phalanges; treated side = fusion pathology |
| Soft teaching? | **No** — 0 named DI/NV/ligament meshes |
| Wire | **0** (zip not downloaded) |

## Bottom line

Watchlist tracks **where a CC0/BY soft find would matter** (DI, per-ray MTA, bellies, SA shrink). Day **4az**+**4ba** Andreassen alignment blocker unchanged; Day **4bf** Utah Hive **reject**; Day **4bg** Henson CC0 LE masks **monitor** (not wire). Soft gaps remain **dry**. Handback: `docs/cloud-agent-handback.md`. **No finished-product claim**.

## Day 4bg dig summary

| Check | Result |
|-------|--------|
| New CC0/BY soft packs for DI / per-ray MTA / nerves / ligaments | **None** (#66 masks / #67 LE bones UX / #68 MSK paths) |
| Gastroc/soleus lead | Henson **CC0** DICOM labels — **monitor** only; Andreassen **skipped** |
| Utah Hive | Not re-opened (still reject) |
| Meshes integrated | **0** |
