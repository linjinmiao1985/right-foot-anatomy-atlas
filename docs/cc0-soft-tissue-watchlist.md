# CC0 / CC BY soft-tissue watchlist (monitor · not integrated)

**Date**: 2026-09-15 · Day 4ay / Phase 7  
**Policy**: Prefer **CC0 / CC BY** main-tree replacements that shrink ShareAlike surface. Dig + verify license page / SPDX / Zenodo `license.id` **before** any wire. **Reject** NC, unclear “License: Model”, and All Rights Reserved. BY-SA only under `by-sa/` + NOTICE — do not spam SA volume for its own sake.  
**Status**: Living watchlist — **0** new soft-tissue meshes integrated from this list as of Day **4ay**. Teaching atlas in progress — **not** a finished-product claim.

Companion: `docs/open-anatomy-learning-log.md` (#38–#57 and earlier), `docs/phase-7-self-review.md`.

---

## Priority gaps (why we watch)

| Gap | Current teaching fill | Wanted license | Blocker |
|-----|----------------------|----------------|---------|
| **Dorsal interossei (DI)** | Open3D BY-SA grouped under `by-sa/` | CC0 / CC BY elemental or clear DI pack | No license-clean DI pack found (UMLUB Sketchfab unclear; Embodi3D NC-SA) |
| **Per-ray 1st–4th MTA / digital aa.** | BP3D + Open3D **grouped** only | CC0 / CC BY per-ray segmentation | Soft inventory ceiling — TotalSegmentator CT/MRI lack named foot vessels |
| **Gastroc / soleus bellies** | Absent (Achilles + plantaris only) | CC0 / CC BY bellies | **Clear CC BY candidate**: Andreassen VHF/VHM STLs (Digital Commons) — **not wired** pending VH→BP3D Kabsch + laterality QA |
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
| **#46 / Andreassen 2023 VHF+VHM LE muscles** (Digital Commons @ DU · DOI 10.56902/COB.vh.2022.0 · Sci Data 10.1038/s41597-022-01905-2) | **CC BY 4.0** on Digital Commons STL pages (**verified Day 4ay** curl: `creativecommons.org/licenses/by/4.0/` + liability disclaimer) | 76 muscles/side incl. **gastroc med/lat + soleus**; bones pelvis→feet; **no** named foot DI / intrinsic set / NV | Possible **extrinsic belly** main-tree fill — needs dedicated VH→BP3D Kabsch, laterality X≤0, attachment QA; not a curated right-foot pack | **monitor** → handback resume for belly integrate only; **reject** as DI/NV/per-ray MTA source |
| **#50** HuBMAP Female v1.5 / Femora | **CC BY 4.0** | Female whole-body united GLB | Foot coverage vs our BP3D male foot — naming only unless elemental soft appears | **monitor**; **reject** united GLB as right-foot substitute |
| **#55** Grant et al. foot bone SSMs (Zenodo 10.5281/zenodo.3464747) | **CC BY 4.0** (Zenodo API Day 4ay) | MRI-derived STLs: talus / calcaneus / midfoot / 1st MT (L/R cohorts) | Osteology SSM QA only — **0** soft files in record | **monitor** bones; **reject** soft teaching |
| Blender Studio Human Base Meshes — foot (Commons CC0 STL) | **CC0 1.0** | High-res **skin/surface** foot | Silhouette UX only — no named DI/NV | **monitor** surface; **reject** anatomy teaching DI/NV |
| Future Zenodo / open CT foot soft segmentations | TBD | Named DI, vessels, ligaments | Only if SPDX CC0/BY and elemental teaching value | **monitor** dig queue |

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

## Resume checklist (Cloud Agent or local)

1. Re-open this file + learning-log row; confirm license still CC0/BY (Zenodo API / LICENSE / lic.html / Digital Commons license block).
2. Confirm content is **named** soft tissue (not grouped surface / 2D masks / game skin only).
3. Run spatial QA gates (padded AABB, laterality X≤0, attachment rules) before `structures.json` wire.
4. Prefer **replacing** an existing `by-sa/` teaching mesh over adding net SA count.
5. **Andreassen belly path** (when quota): download Final STL set → extract right gastroc med/lat + soleus → Kabsch to BP3D landmarks → integrity-audit gates → wire main-tree CC BY with NOTICE — **do not** ship without residuals documented.
6. Gates: `python3 scripts/integrity-audit.py` · `npx vitest run` · `npm run build`.
7. Update census in README / methods / phase-7 if anything wires — **no** finished-product claim.

---

## Bottom line

Watchlist tracks **where a CC0/BY soft find would matter** (DI, per-ray MTA, bellies, SA shrink). Day **4ay** re-verified prior rows, upgraded Andreassen to **clear CC BY**, added Grant / FOAMRIS / TotalSeg MRI / Sheffield / OGA notes — still **nothing integrated**. DI / per-ray MTA / nerve·ligament main-tree replacements remain **dry**. Revisit Andreassen bellies under Cloud Agent handback with spatial QA — **no finished-product claim**.
