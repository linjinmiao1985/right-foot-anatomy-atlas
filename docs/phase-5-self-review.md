# Phase 5 Self-Review — Soft-Tissue Expansion (Honest Status)

**Date**: 2026-09-15  
**Branch**: `cursor/right-foot-anatomy-atlas-mvp-af85`  
**Status**: Teaching-grade atlas **in progress** — **not** a finished-product claim  
**Scope of this review**: Week 2 Day 4i–4af Open3D/Z-Anatomy BY-SA fills + Kabsch alignment + license isolation + vessel sub-groups (+ veins) + EHB/muscle-gap wires + Blender ZA harvest

---

## Executive honesty

This atlas is a strong **open teaching** resource for right-foot osteology and a curated soft-tissue schematic set. It is **not** a complete TA2 foot atlas, **not** surgical-navigation grade, and **not** free of ShareAlike weight. Phase 5 work improved coverage and honesty of labeling; it did **not** close all soft-tissue gaps.

---

## Coverage by layer (live census 2026-09-15 Day 4af)

| Layer | Entries | Unique (honest) | Main (CC BY/CC0) | BY-SA isolate | Placeholder | Teaching ceiling notes |
|-------|---------|-----------------|------------------|---------------|-------------|------------------------|
| **Bone** | 26 | 26 | 26 BP3D | 0 | 0 | Complete right-foot osteology (incl. sesamoids) |
| **Muscle** | 28 | 23 | 18 (BP3D+UM, incl. EHB) | 5 (DI+FB+FT+opponens+plantaris; FHB lat ADDITIONAL) | 0 | Teaching-useful; DI ShareAlike; no gastroc/soleus bellies |
| **Vessel** | 29 | 29 | 7 BP3D | 12 Open3D + 10 ZA | 0 | Expanded veins + circumflex fibular; no per-ray MTA; several **grouped** meshes |
| **Nerve** | 17 | 17 | 0 | 6 Z-Anatomy + 11 Open3D | 0 | Trunks + fine/cutaneous/calcaneal/dorsal digitals; not TA2-complete |
| **Ligament/tendon** | 29 | 29 | 2 BP3D (long plantar + Achilles) | 27 Open3D | 0 | Teaching-useful, incomplete toe/band set |
| **Total** | **129** | **124** | **53** | **71** | **0** | Unique ≈ entries − lumbricals×3 − PI×2 |

**Vessel detail (Day 4af)**:
- **BP3D main**: dorsalis pedis, arcuate, dorsal digital (grouped), plantar arch, plantar MTA (grouped), med/lat plantar
- **Open3D BY-SA** (12): PTA, fibular; Day 4aa deep plantar a./arch, grouped dorsal MTA, med. plantar deep/superficial branches; Day 4ab perforating arcuate↔deep arch, lat. tarsal, med. tarsal (**grouped**), med./lat. calcaneal
- **Z-Anatomy BY-SA** (10): Day 4ad PPDA; Day 4ae common plantar digitals + ATA + dorsal/plantar venous arches + plantar digital veins; Day 4af circumflex fibular + med/lat plantar veins + plantar metatarsal veins
- **Skipped**: Open3D arterial duplicates vs BP3D; ZA calcaneal arterial branches (overlap Open3D); dorsal digital/metatarsal/intercapitular veins + ATV/fibular/GSV deferred

---

## License split (user choice)

| Bundle | License | Redistribution |
|--------|---------|----------------|
| Code | MIT | Free |
| Main-tree meshes (bones, most muscles, 7 vessels, long plantar, Achilles) | CC BY 4.0 / CC0 | Attribution (BP3D) / none (UM) |
| `public/models/right-foot/by-sa/` | CC BY-SA 4.0 | ShareAlike if modified |

Deleting `by-sa/` (and corresponding `REAL_*` wiring) yields MIT + CC BY/CC0 only. UI badges distinguish **主树 · Main** vs **ShareAlike**.

**BY-SA weight**: ~71/124 unique structures now live under ShareAlike. That is a deliberate teaching trade-off, not a main-tree claim.

---

## Spatial residuals (registration honesty)

| Transform | Mean residual | Landmarks / method | Grade |
|-----------|---------------|--------------------|-------|
| Open3D → BP3D (Day 4m) | **≈2.6 mm** | 12 foot bone centroids (calcaneus…MT5) Kabsch similarity | Teaching-grade |
| UM muscles → BP3D (Day 4l) | **≈2.2 mm** | 7 tarsal landmarks | Teaching-grade |
| Z-Anatomy nerves | BP3D-derived curves | Same mm frame; CURVE→tube | Pathway schematic |
| Z-Anatomy soft (Day 4ad/4ae) | **≈1.8 mm** | 9 foot bone centroids Kabsch (`za_to_bp3d_transform.json`) | Teaching-grade |

**Day 4ab vessel QA** (`third_party/open3dmodel/vessel_spatial_qa.json`): all 5 new arteries **accept** — `inside_padded_frac=1.0`, `wrong_side=false`, bone AABB overlap. Reject gates: X>0 OR <85% verts in ±40 mm padded foot AABB OR absurd far without overlap.

These residuals support **classroom visualization**, not implant planning or interventional navigation.

---

## Known gaps (explicit)

0. **Vessel teaching sub-group filters** exist (Day 4ac) — UI only; does not add per-ray MTAs.
0b. **Muscle teaching sub-group filters** exist (Day 4ag) — plantar layers 1–4 / dorsal / extrinsic compartments; UI only.
0c. **Day 4ag vessel skip**: GSV terminal / fibular vein / ATV remain deferred (BY-SA weight ~71/124; prefer quality over SA volume).
1. **No per-ray 1st–4th dorsal/plantar metatarsal arteries** in Open3D `lower-limb.obj` or BP3D ISA — only grouped plurals. Soft inventory ceiling.
2. **Blender / Z-Anatomy**: Day 4ac unblocked CLI (4.2.9 tarball) + proof-export long plantar / Achilles; **still no** named ATFL/CFL/deltoid/retinacula in Zenodo `.blend` — Open3D remains source for those bands; no bulk replace.
3. **BY-SA weight** dominates soft tissue (nerves entire layer; most ligaments; most vessels incl. first veins). Prefer future CC0/CC BY replacements.
4. **Grouped teaching meshes** remain: BP3D dorsal digital + plantar MTA; Open3D dorsal MTA + medial tarsal arteries; several nerve commons/proprii/dorsal digitals.
5. **Further Open3D inventory not wired**: e.g. malleolar branches, additional ligament bands, nerve terminals — diminishing teaching return vs ShareAlike cost.
6. **No finished-product / TA2-complete claim** for nerve, vessel, or ligament layers.
7. **Venous layer**: Day 4ae–4af teaching fill (arches + plantar digitals + med/lat plantar veins + plantar metatarsal veins) — **not** complete foot venous atlas; dorsal digital/metatarsal/intercapitular + ATV/fibular/GSV still deferred.

---

## Next research targets (priority order)

1. **CC0 / CC BY replacements** for Open3D DI + proximal/fine arteries (reduce ShareAlike surface).
2. **Per-ray MTA / digital arteries** — only if a license-clean segmented source appears (none found in Open3D/BP3D).
3. **License-verified learning-log digs** continued (Zenodo SSM/CAD already logged; watch for foot vessel trees).
4. **Optional**: malleolar / communicating arterial twigs only if they teach anastomosis patterns not already covered by perforator + deep plantar + arch set.
5. **Do not** re-add Open3D arcuate / med-lat plantar / plantar MTA / dorsal digital without a clear elemental teaching advantage over BP3D.

---

## Verification this pass

- `python3 scripts/integrity-audit.py`
- `npx vitest run` (or `npm test`)
- `npm run build`
- Commit + push on branch

---

## Bottom line

Phase 5 delivered real soft-tissue meshes under an honest license isolate, Kabsch-aligned to BP3D millimeters, with grouped labels where the donor data is grouped. Osteology is complete; soft tissue is **teaching-useful and incomplete**. Treat this document as a status board, not a graduation certificate.
