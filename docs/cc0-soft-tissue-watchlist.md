# CC0 / CC BY soft-tissue watchlist (monitor · not integrated)

**Date**: 2026-09-15 · Day 4aw / Phase 7  
**Policy**: Prefer **CC0 / CC BY** main-tree replacements that shrink ShareAlike surface. Dig + verify license page / SPDX / Zenodo `license.id` **before** any wire. **Reject** NC, unclear “License: Model”, and All Rights Reserved. BY-SA only under `by-sa/` + NOTICE — do not spam SA volume for its own sake.  
**Status**: Living watchlist — **0** new soft-tissue meshes integrated from this list as of Day 4aw. Teaching atlas in progress — **not** a finished-product claim.

Companion: `docs/open-anatomy-learning-log.md` (#38–#54 and earlier), `docs/phase-7-self-review.md`.

---

## Priority gaps (why we watch)

| Gap | Current teaching fill | Wanted license | Blocker |
|-----|----------------------|----------------|---------|
| **Dorsal interossei (DI)** | Open3D BY-SA grouped under `by-sa/` | CC0 / CC BY elemental or clear DI pack | No license-clean DI pack found (UMLUB Sketchfab unclear; Embodi3D NC-SA) |
| **Per-ray 1st–4th MTA / digital aa.** | BP3D + Open3D **grouped** only | CC0 / CC BY per-ray segmentation | Soft inventory ceiling — TotalSegmentator / HRA lack named foot vessels |
| **Gastroc / soleus bellies** | Absent (Achilles + plantaris only) | CC0 / CC BY bellies | Not in wired BP3D/UM/Open3D/ZA foot packs |
| **Nerve / ligament SA surface** | 17 nerves + 27 lig·retinacula Open3D/ZA BY-SA | CC0 / CC BY replacements | Prefer shrink SA (~71/124 unique) over more isolate volume |
| **Named ankle bands in ZA.blend** | Open3D BY-SA ATFL/CFL/deltoid set | Same or better under BY/CC0 | Prior Zenodo `.blend` lacked named ATFL/CFL/deltoid/retinacula |

---

## Monitor (re-check later)

| # / source | License (verified window) | What it is | Why monitor | Action |
|------------|---------------------------|------------|-------------|--------|
| **#40** Schuster foot shape-function PLYs (Zenodo 10.5281/zenodo.10360304) | **CC0** (2026-09-15) | External foot-surface cohort | Plantar-surface / shape research only — **not** named intrinsics/NV | **monitor** surface UX; **reject** named soft teaching |
| **#38** TotalSegmentator v3 (Zenodo 10.5281/zenodo.22688904) | Dataset **CC BY 4.0** | Grouped `tarsal` / `metatarsal` / `phalanges_feet` | Future osteology surface QA — no DI/NV/per-ray MTA | **monitor** bones; **reject** soft NV |
| **#39** HRA / CCF 3D Reference Object Library | **CC BY 4.0** | Whole-body VH united GLBs | Organ/CCF scale; watch if foot soft parts ever appear as named packs | **monitor**; **reject** as current DI/MTA source |
| **#42** MedShapeNetCore (Zenodo 10.5281/zenodo.10609965) | **CC BY 4.0** | Multi-organ NPZ packs | Future search API — no foot DI/NV in listed files | **monitor** catalog; **reject** foot soft now |
| **#46** Andreassen 2023 VHF lower-limb muscles (via slorksmo Human-Atlas cite; DOI 10.1038/s41597-022-01905-2) | Paper/data **CC BY** lineage (re-verify STL terms before wire) | VHF leg muscle STLs fitted in third-party atlas | Possible extrinsic QA — **not** curated right-foot DI/NV | **monitor** license + laterality; do not copy borrowed male foot bones as female |
| **#50** HuBMAP Female v1.5 / Femora | **CC BY 4.0** | Female whole-body united GLB | Foot coverage vs our BP3D male foot — naming only unless elemental soft appears | **monitor**; **reject** united GLB as right-foot substitute |
| Blender Studio Human Base Meshes — foot (Commons CC0 STL) | **CC0 1.0** | High-res **skin/surface** foot | Silhouette UX only — no named DI/NV | **monitor** surface; **reject** anatomy teaching DI/NV |
| Future Zenodo / open CT foot soft segmentations | TBD | Named DI, vessels, ligaments | Only if SPDX CC0/BY and elemental teaching value | **monitor** dig queue |

---

## Reject / blocked (do not wire to main tree)

| Source | Why blocked |
|--------|-------------|
| **#41** NIH 3D Anatomic Human Foot | **CC-BY-NC-SA** — NC blocks main tree; bones only |
| Embodi3D / Scan-the-World foot muscles | **BY-NC-SA** reconfirmed |
| UMLUB Sketchfab Dorsal Interossei I–IV | License **not** openly stated |
| **#44** SimTK OpenSim ankle-foot | Page “License: Model” — not clear CC0/CC BY SPDX |
| Zenodo packs still **BY-NC-SA** (e.g. prior 20228270 lineage) | NC |
| Anatomography / Moerman BP3D **BY-SA 2.1 JP** mirrors | Do not mix into main-tree **CC BY 4.0** LSDB claim (`#47`/`#48` isolate-SA only) |

---

## Resume checklist (Cloud Agent or local)

1. Re-open this file + learning-log row; confirm license still CC0/BY (Zenodo API / LICENSE / lic.html).
2. Confirm content is **named** soft tissue (not grouped surface / 2D masks only).
3. Run spatial QA gates (padded AABB, laterality X≤0, attachment rules) before `structures.json` wire.
4. Prefer **replacing** an existing `by-sa/` teaching mesh over adding net SA count.
5. Gates: `python3 scripts/integrity-audit.py` · `npx vitest run` · `npm run build`.
6. Update census in README / methods / phase-7 if anything wires — **no** finished-product claim.

---

## Bottom line

Watchlist tracks **where a CC0/BY soft find would matter** (DI, per-ray MTA, bellies, SA shrink). As of Day 4aw every row is **monitor** or **reject** — **nothing to integrate**. Revisit when quota or a new open CT foot pack appears.
