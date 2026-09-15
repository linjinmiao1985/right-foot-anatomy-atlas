# Phase 6 Self-Review — UX polish + open-data ceilings (Honest Status)

**Date**: 2026-09-15  
**Branch**: `cursor/right-foot-anatomy-atlas-mvp-af85`  
**HEAD baseline**: `a437705` (Day 4aj) before this review commit  
**Status**: Teaching-grade atlas **in progress** — **not** a finished-product claim  
**Scope**: Live census after Day 4af–4aj (veins + muscle sub-groups + search/preload + label density + sagittal clip lite); UX inventory; open-data ceilings; next-week actionable targets

---

## Executive honesty

Phase 6 is a **status board**, not a graduation certificate. Osteology remains complete (26/26). Soft tissue is **teaching-useful and incomplete**. ShareAlike still dominates soft-tissue unique count (~71/124). No per-ray MTA; no TA2-complete nerve/vessel/ligament/muscle claim. Day 4ah–4aj added viewer UX and license digs **without** new SA mesh spam.

---

## Current census (live 2026-09-15 · post–Day 4af)

| Layer | Entries | Unique (honest) | Main (CC BY/CC0) | BY-SA isolate | Placeholder | Teaching ceiling notes |
|-------|---------|-----------------|------------------|---------------|-------------|------------------------|
| **Bone** | 26 | 26 | 26 BP3D | 0 | 0 | Complete right-foot osteology (incl. sesamoids) |
| **Muscle** | 28 | 23 | 18 unique (BP3D+UM, incl. EHB) | 5 (DI grouped + FB + FT + opponens + plantaris) | 0 | Teaching-useful; DI ShareAlike; no gastroc/soleus bellies |
| **Vessel** | 29 | 29 | 7 BP3D | 12 Open3D + 10 ZA | 0 | Expanded veins + circumflex fibular; **no per-ray MTA**; several **grouped** meshes |
| **Nerve** | 17 | 17 | 0 | 6 ZA trunks + 11 Open3D | 0 | Trunks + fine/cutaneous/calcaneal/dorsal digitals; not TA2-complete |
| **Ligament/tendon** | 29 | 29 | 2 BP3D (long plantar + Achilles) | 27 Open3D | 0 | Teaching-useful, incomplete toe/band set |
| **Total** | **129** | **124** | **53** | **71** | **0** | Unique ≈ entries − lumbricals×3 − PI×2 |

**On-disk GLBs**: **134** discrete (~13 MB) — **59** main tree + **75** `by-sa/`.

**Unique framing**: lumbricals×4→1, plantar interossei×3→1. Entry-level = 129 `placeholder:false` rows.

### License split (user choice)

| Bundle | License | Redistribution |
|--------|---------|----------------|
| Code | MIT | Free |
| Main-tree meshes | CC BY 4.0 / CC0 | Attribution (BP3D) / none (UM) |
| `public/models/right-foot/by-sa/` | CC BY-SA 4.0 | ShareAlike if modified |

Deleting `by-sa/` (and corresponding `REAL_*` wiring) yields MIT + CC BY/CC0 only. UI badges: **主树 · Main** vs **ShareAlike**.

**BY-SA weight**: **71/124** unique (~57%) live under ShareAlike — deliberate teaching trade-off, not a main-tree claim. Prefer future CC0/CC BY replacements over further SA volume.

---

## Spatial transforms & residuals

| Transform | Mean residual | Landmarks / method | Grade |
|-----------|---------------|--------------------|-------|
| Open3D → BP3D (Day 4m) | **≈2.61 mm** (max ≈4.41 mm MT1) | 12 foot bone centroids Kabsch similarity (`open3d_to_bp3d_transform.json`) | Teaching-grade |
| UM muscles → BP3D (Day 4l) | **≈2.22 mm** (max ≈4.38 mm talus) | 7 tarsal landmarks (`um_to_bp3d_transform.json`) | Teaching-grade |
| Z-Anatomy nerves | BP3D-derived CURVE→tube | Same mm frame | Pathway schematic |
| Z-Anatomy soft (Day 4ad+) | **≈1.81 mm** (max ≈3.52 mm calcaneus) | 9 foot bone centroids Kabsch (`za_to_bp3d_transform.json`) | Teaching-grade |

**QA gates** (vessels/nerves/ligaments/muscles): padded foot AABB, laterality (reject X>0), attachment/centroid distance rules — see `*_spatial_qa.json` / `ligament_attachment_qa.json`.

These residuals support **classroom visualization**, not implant planning or interventional navigation.

---

## UX inventory (Day 4n–4aj)

| Feature | Status | Notes |
|---------|--------|-------|
| **Search** | Live | Bilingual ZH/LA; Escape clears query; results sorted by teaching layer after match score (Day 4ah) |
| **Isolate** | Live | `I` toggles; Escape clears isolate + selection + search |
| **Clip** | Live (lite) | Single-axis **sagittal (X)** toggle + slider (`ClipPlaneSync`); teaching cutaway — **not** clinical MPR |
| **Label density** | Live | 关 / 中文 / 中+拉 hover chips (Day 4ai) |
| **Sub-groups** | Live | Ligament · nerve · vessel · muscle teaching partitions (UI only; not finished atlases) |
| **Badges** | Live | StructurePanel **主树 · Main** vs **ShareAlike**; layer legend 主/SA chips |
| **Click-to-focus** | Live | Camera frames selected mesh AABB |
| **Lazy GLB preload** | Live | Bones eager; soft-tissue layers preload when visible |
| **Screenshot pipeline** | Live pack + README embed (Day 4am) + multi-view expand (Day 4an) | `scripts/screenshot-pipeline.mjs` → `docs/screenshots/` (9 shots: 5 layer/clip + 4 camera presets); embedded in README carefully — **not** a product gallery claim |
| **Camera presets** | Live (Day 4an) | 默认 / 背侧 / 跖侧 / 内侧 / 外侧 · keys `1`–`5`; full polar orbit for plantar sole teaching |
| **Keyboard help** | Live (Day 4ao) | `?` / `H` + title button; bilingual shortcut sheet; Esc closes help first; dialog a11y |
| **Teaching prefs persist** | Live (Day 4ap) | localStorage: layers · label density · clip · last camera preset; SSR/test-safe restore |

---

## Open-data ceilings (honest)

| Ceiling | Why it remains | Implication |
|---------|----------------|-------------|
| **Per-ray MTA** | Open3D `lower-limb.obj` and BP3D ISA expose **grouped** dorsal/plantar metatarsal (and digital) arteries only — no named 1st–4th elementals | Soft inventory ceiling until a license-clean segmented source appears |
| **BY-SA weight** | Nerves 100% SA; most ligaments/vessels SA; DI + several extrinsics SA | Prefer **CC0/CC BY finds** over wiring more ZA/Open3D volume (Day 4ag skipped GSV/ATV/fibular vein for this reason) |
| **Z-Anatomy blend limits** | Zenodo `.blend` harvestable via Blender 4.2.9 for unique vessels/veins/muscles; **no** named ATFL/CFL/deltoid/retinacula in that blend | Ankle bands stay Open3D BY-SA; proof long plantar/Achilles not wired (BP3D already covers) |
| **Grouped teaching meshes** | BP3D dorsal digital + plantar MTA; Open3D dorsal MTA + medial tarsal; several nerve commons/proprii/dorsal digitals; ZA vein plurals | Labels must stay honest （组合）/grouped |
| **Gastroc/soleus bellies** | Not in wired open packs; Achilles + plantaris only | Muscle layer incomplete by design |

Recent digs (Day 4ah–4aj) logged UX-borrow / reject sources (LABIM3D, UltraBones100k, Open Twin XR, 3Dentes NC, VH Viewer, Atlas RU, etc.) — **no** new CC0/BY foot DI/per-ray MTA integrate.

---

## Actionable next-week targets (priority)

1. **Prefer CC0/CC BY finds** for DI, proximal/fine arteries, and any nerve/ligament replacements that shrink ShareAlike surface — dig + verify license before wire; skip SA volume for its own sake.
2. **Journal / methods polish** — keep `docs/methods.md` version + reproducibility table aligned with live census; strengthen teaching-vs-clinical disclaimer; cite transform JSON residuals.
3. **Screenshot pipeline** — run `npm run screenshots` after build; refresh a small `docs/screenshots/` pack (default / bone / muscle / nerve+badge / clip-lite) for expert review; do **not** market as finished product gallery.
4. **Cloud Agent handback when quota returns** — resume deferred browser/Zenodo/heavy Blender harvest and multi-view capture if local box quota or Cloud Agent hours unlock; hand back with integrity-audit + vitest + build green.

**Do not**: claim TA2 completeness; re-add Open3D duplicates of BP3D main-tree vessels; treat residuals as surgical registration.

---

## Progress note (Day 4al)

- **Target #1 dig**: TotalSegmentator v3 (CC BY — bones only), HRA CCF 3D library (CC BY — whole-body), Schuster foot PLYs (CC0 — surface), NIH 3D foot (CC-BY-NC-SA). **0** CC0/BY meshes integrated; Embodi3D foot muscles NC reconfirm.
- **Target #2**: `docs/methods.md` v1.3 — census 129/124, residual-cited disclaimer, license matrix / Future Work ceilings synced.

## Progress note (Day 4am)

- **Target #3**: Embedded existing `docs/screenshots/` pack into README (5-shot table + images) with explicit **not** a finished-product gallery / soft-tissue incomplete / BY-SA isolate caveats. No hype; no new mesh spam. Pack already on disk from Day 4ak pipeline (`manifest.json` 2026-09-15T05:11Z).
- **Target #4 (docs)**: Added Cloud Agent handback note below — deferred browser/Zenodo/heavy Blender / multi-view capture resume checklist when quota returns.



## Progress note (Day 4an)

- **UX**: Teaching **camera presets** (默认 / 背侧 / 跖侧 / 内侧 / 外侧) + keys `1`–`5`; OrbitControls `maxPolarAngle = π` so plantar sole view works. Midfoot target from BP3D bone centroids (scene = mm × 0.01).
- **Multi-view screenshots**: Pipeline expanded to **9** shots (`06`–`09` dorsal/plantar/medial bone + lateral all-layers); README table + embeds updated with not-finished-product caveats.
- **Target #1 dig (continued)**: MedShapeNetCore (CC BY — no foot DI/NV files); FootNet (CC BY — 2D smartphone segmentation only); SimTK OpenSim ankle-foot (license unclear “Model”). **0** meshes integrated; no SA spam.
- **Methods**: version Day 4an; camera-preset + multi-view protocol; census unchanged 129/124.

## Progress note (Day 4ao)

- **UX**: Keyboard help overlay (`?`/`H` · title **? 帮助**) — bilingual camera / isolate / Esc / pointer sheet; Esc closes help before clearing selection; `role=dialog` + focus close. Prefer teaching polish; **0** new meshes.
- Census unchanged 129/124. Methods version Day 4ao.
- Remaining phase-6 / week polish candidates: accessibility pass, CC0/BY dig (no SA spam). *(persist UI prefs → Day 4ap; TA2 panel IDs + journal limitations → Day 4aq)*

## Progress note (Day 4ap)

- **UX**: localStorage teaching prefs (`src/lib/teachingPrefs.ts`) — restore layers / label density / clip / last camera preset on load; vitest covers corrupt JSON + storage throw.
- **Dig**: #45 Female Atlas; #46 slorksmo/Human-Atlas (EN/AR). **0** meshes; no SA spam. Census unchanged 129/124.
- Methods version Day 4ap.

## Progress note (Day 4aq)

- **Ontology IDs**: Sparse lookup `src/lib/ontologyIds.ts` (TA2 / FMA / BP when citable); StructurePanel shows present codes only — honest empty when unknown. Sources in module header + `docs/terminology.md`.
- **Journal limitations table**: Added to `docs/methods.md` (license mix, spatial residual, grouped vessels, BY-SA share, no clinical claim, partial ontology).
- **0** new meshes; no SA spam. Census unchanged 129/124. Methods version Day 4aq.

## Cloud Agent handback (when quota returns)


Resume only with green local gates (`python3 scripts/integrity-audit.py`, `npx vitest run`, `npm run build`). Prefer CC0/CC BY finds over SA volume.

| Deferred item | Why deferred | Suggested resume |
|---------------|--------------|------------------|
| Browser-session downloads (e.g. Cloudflare-gated packs) | Scripted fetch 403 / session required | Cloud Agent browser; verify license page before any wire |
| Zenodo Z-Anatomy `.blend` heavy re-harvest | Large binary; Blender 4.2.9 local; ankle bands absent in prior blend | Re-inventory named ATFL/CFL/deltoid/retinacula only if new blend revision claims them; do **not** re-wire BP3D-covered long plantar/Achilles |
| Multi-view / additional screenshot angles | Day 4an added dorsal/plantar/medial/lateral (9-shot pack) | Further angles optional; still not a marketing gallery |
| Further CC0/BY DI / per-ray MTA dig | Day 4al dry (0 integrate) | Re-check TotalSegmentator / HRA / new open CT foot segmentations; skip NC |

**Handback rule**: integrity-audit + vitest + build green; update census in README/methods/phase-6 if anything wires; **no** finished-product claims; **no** low-value SA mesh spam.

## Verification this pass

- `python3 scripts/integrity-audit.py`
- `npx vitest run`
- `npm run build`
- Commit + push on branch

---

## Bottom line

Phase 6 freezes an honest census (**129** entries / **124** unique; **53** main / **71** BY-SA), documents teaching-grade Kabsch residuals, inventories UX (search · isolate · clip · label density · sub-groups · badges), and names the open-data ceilings that block further soft-tissue “completion.” Treat this as a **status board** for next-week work — **no finished-product claim**.
