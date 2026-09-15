# Phase 7 Self-Review — Week-quality checkpoint (Honest Status)

**Date**: 2026-09-15  
**Branch**: `cursor/right-foot-anatomy-atlas-mvp-af85`  
**HEAD baseline**: `d09d53d` (Day 4av) before this review commit  
**Status**: Teaching-grade atlas **in progress** — **not** a finished-product claim  
**Scope**: Week-quality census freeze after Day 4af–4av (soft fill + UX polish + ontology expand); UX inventory; license ceilings; open-mining highlights; next targets for journal readiness / Cloud Agent handback / CC0 soft-tissue watchlist

---

## Executive honesty

Phase 7 is a **week-quality status board**, not a graduation certificate and **not** journal-publication-ready soft tissue. Osteology remains complete (26/26). Soft tissue is **teaching-useful and incomplete**. ShareAlike still dominates soft-tissue unique count (~71/124). Ontology map is **126/129** citable — three honest empties remain. No per-ray MTA; no TA2-complete nerve/vessel/ligament/muscle claim. Day 4ah–4av added viewer UX and ontology digs **without** new SA mesh spam.

---

## Current census (live 2026-09-15 · post–Day 4af; unchanged through 4av)

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

### Ontology coverage (Day 4aq–4at)

| Metric | Count | Notes |
|--------|-------|-------|
| Structures with ≥1 citable ID in `ontologyIds.ts` | **126 / 129** (~97.7%) | TA2 A-code and/or FMA and/or BP when IFAA-/WP-/manifest-citable |
| Honest empty (omit) | **3** | `cervical_talocalcaneal_ligament` (no distinct TA98); `medial_plantar_veins` / `lateral_plantar_vein` (TNA-only this pass) |
| Panel behavior | Sparse | Shows codes only when present; Copy button; **not** a TA2-complete soft-tissue claim |

Sources: `src/lib/ontologyIds.ts` header + `docs/terminology.md`. Vitest asserts every mapped id exists live and map stays sparse (`n < total`).

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
| Open3D → BP3D (Day 4m) | **≈2.61 mm** (max ≈4.41 mm MT1) | 12 foot bone centroids Kabsch similarity | Teaching-grade |
| UM muscles → BP3D (Day 4l) | **≈2.22 mm** (max ≈4.38 mm talus) | 7 tarsal landmarks | Teaching-grade |
| Z-Anatomy nerves | BP3D-derived CURVE→tube | Same mm frame | Pathway schematic |
| Z-Anatomy soft (Day 4ad+) | **≈1.81 mm** (max ≈3.52 mm calcaneus) | 9 foot bone centroids Kabsch | Teaching-grade |

These residuals support **classroom visualization**, not implant planning or interventional navigation.

---

## UX inventory (Day 4n–4av)

| Feature | Status | Notes |
|---------|--------|-------|
| **Teaching prefs persist** | Live (4ap + 4av) | localStorage: layers · label density · clip · last camera preset · **hiddenStructureIds**; SSR/test-safe |
| **Per-structure hide** | Live (4au/4av) | `X` / panel chip beyond isolate; restore chips; ids persist; Esc does **not** clear hides |
| **Keyboard help** | Live (4ao) | `?` / `H` + title button; bilingual sheet; Esc closes help first; dialog a11y |
| **Clip** | Live (lite, 4aj) | Single-axis **sagittal (X)** toggle + slider — teaching cutaway, **not** clinical MPR |
| **Camera presets** | Live (4an) | 默认 / 背侧 / 跖侧 / 内侧 / 外侧 · keys `1`–`5`; full polar for plantar sole |
| **Sub-groups** | Live | Ligament · nerve · vessel · muscle teaching partitions (UI only; not finished atlases) |
| **Screenshots** | Live pack (4ak–4an) | `npm run screenshots` → `docs/screenshots/` (**9** shots); README embeds with not-product caveats |
| Search / isolate / label density / badges / click-to-focus / lazy preload | Live | Bilingual ZH/LA; `I` isolate; 关/中文/中+拉; 主树 vs ShareAlike |

---

## License ceilings (honest)

| Ceiling | Why it remains | Implication |
|---------|----------------|-------------|
| **Per-ray MTA** | Open3D / BP3D expose **grouped** dorsal/plantar metatarsal (and digital) arteries only | Soft inventory ceiling until license-clean segmented source |
| **BY-SA weight** | Nerves 100% SA; most ligaments/vessels SA; DI + several extrinsics SA | Prefer **CC0/CC BY finds** over wiring more ZA/Open3D volume |
| **Z-Anatomy blend limits** | Named ATFL/CFL/deltoid/retinacula absent from harvested `.blend` | Ankle bands stay Open3D BY-SA |
| **Grouped teaching meshes** | BP3D dorsal digital + plantar MTA; Open3D dorsal MTA + medial tarsal; several nerve commons; ZA vein plurals | Labels must stay honest （组合）/grouped |
| **Gastroc/soleus bellies** | Not in wired open packs; Achilles + plantaris only | Muscle layer incomplete by design |
| **NC / unclear packs** | NIH foot NC-SA; Embodi3D NC; SimTK “License: Model”; UMLUB Sketchfab unclear | **reject** for main tree until clear CC0/BY |

---

## Open mining count highlights

Living log: `docs/open-anatomy-learning-log.md` — **57** numbered license-verified projects (#1–#57) as of Day 4ay.

| Window | Highlights | Mesh integrate |
|--------|------------|----------------|
| Day 4al | #38–41 TotalSegmentator / HRA / Schuster CC0 surface / NIH NC foot | **0** |
| Day 4an | #42–44 MedShapeNetCore / FootNet 2D / OpenSim unclear | **0** |
| Day 4ap | #45–46 Female Atlas / slorksmo Human-Atlas (Andreassen VHF **monitor**) | **0** |
| Day 4aq–4at | Ontology digs + #47–50 Anatomy Viewer SA / ANATOMED / undergravity / Femora | **0** meshes; ontology → 126/129 |
| Day 4au–4av | #51–54 XR / trauma / MnemoAtlas / AR — UX-borrow hide + prefs | **0** |
| Day 4ay | Watchlist re-verify + #55–57 Grant SSM / FOAMRIS / TotalSeg MRI; Andreassen CC BY upgrade | **0** |

**Pattern**: Recent mining is **UX-borrow + license reject/monitor**, not SA mesh spam. CC0/BY soft-tissue replacements for DI / per-ray MTA / nerves remain **dry**; Andreassen gastroc/soleus is a clear CC BY **candidate** deferred to handback Kabsch.

---

## Actionable next targets (priority)

### 1. Journal readiness (docs / methods — no hype)

- Keep `docs/methods.md` version + reproducibility + journal-limitations table synced to live **129/124** census and **126/129** ontology.
- Cite Kabsch residuals + transform JSON paths; strengthen teaching-vs-clinical disclaimer (already present — refresh on any census change).
- Expert-review checklist (`docs/expert-review-checklist.md`) — **v2.0 refreshed Day 4ax**; reviewers pass when soft-tissue claims stay scoped to “teaching-useful, incomplete.”
- **Do not** claim TA2 completeness or surgical registration.

### 2. Cloud Agent handback (when quota returns)

Resume only with green local gates (`python3 scripts/integrity-audit.py`, `npx vitest run`, `npm run build`). Prefer CC0/CC BY over SA volume. Prep refreshed Day **4ba** after Option A LE Kabsch blocker — see `docs/cloud-agent-handback.md`.

| Deferred item | Why deferred | Suggested resume |
|---------------|--------------|------------------|
| Browser-session / Cloudflare-gated packs | Scripted fetch 403 / session required | Cloud Agent browser; verify license page before any wire |
| Zenodo Z-Anatomy `.blend` heavy re-harvest | Large binary; ankle bands absent in prior blend | Re-inventory named ATFL/CFL/deltoid/retinacula only if new revision claims them |
| Further multi-view screenshots | 9-shot pack already live | Optional angles only; still not a marketing gallery |
| Further CC0/BY DI / per-ray MTA dig | Day 4al–4ay dry (0 integrate; TotalSeg CT/MRI still grouped bones) | Re-check new open CT foot soft segmentations; skip NC; see `docs/cc0-soft-tissue-watchlist.md` |
| **Andreassen gastroc/soleus (CC BY)** | Day **4az** laterality FAIL; Day **4ba** Option A with real BP3D LE (FJ3387/3366/3381/3365) + VH bones still FAIL (foot residual inflate / Achilles gap) | See `docs/cloud-agent-handback.md` + `le_kabsch_option_a_trials.json` — **do not** force-wire; need non-similarity / alternate donor |

**Handback rule**: integrity-audit + vitest + build green; update census in README/methods/phase-7 if anything wires; **no** finished-product claims; **no** low-value SA mesh spam.

### 3. CC0 soft-tissue watchlist

Maintain a short **monitor/reject** list (see `docs/cc0-soft-tissue-watchlist.md`) for DI, per-ray MTA, gastroc/soleus, nerve/ligament main-tree replacements. **Day 4az + 4ba**: Andreassen belly Kabsch **blocked** (laterality then LE-residual/Achilles); trials JSON recorded; **0** wire. DI/per-ray MTA still dry. Never treat NC or “License: Model” as main-tree OK.

**Do not**: claim TA2 completeness; re-add Open3D duplicates of BP3D main-tree vessels; treat residuals as surgical registration.

---

## Progress note (Day 4aw)

- Wrote this phase-7 week-quality checkpoint (census 129/124; ontology 126/129; UX inventory through hide-persist; ceilings; mining #54).
- Implemented next-target **#3** starter: `docs/cc0-soft-tissue-watchlist.md`.
- Methods journal-limitations ontology row + version pointer synced; ontology vitest asserts **126/129** with named empties.
- **0** new meshes; no SA spam; **no** finished-product claim.

---



## Progress note (Day 4ax)

- **Journal readiness (target #1)**: Refreshed `docs/expert-review-checklist.md` to **v2.0** for Phase 7 live board (129/124; ontology 126/129; soft claims scoped teaching-useful/incomplete; license/UX/residual gates).
- Methods Document Version **1.5** + Day 4ax version pointer; overview + vessel limitation honesty synced; **0** meshes; no SA spam; **no** finished-product claim.



## Progress note (Day 4ay)

- **CC0 soft-tissue watchlist dig (target #3)** + light **Cloud Agent handback prep** refresh (target #2): re-verified #38/#40/#42 + ScanTW NC; Digital Commons Andreassen STLs confirmed **CC BY 4.0**; logged #55 Grant SSM, #56 FOAMRIS PDF, #57 TotalSeg MRI; Sheffield NC + OGA skin rejected.
- Gastroc/soleus = clear CC BY **candidate** deferred to handback Kabsch — **0** meshes wired this pass (quality over rushed integrate).
- DI / per-ray MTA / nerve·ligament main-tree replacements still **dry**. **No** SA spam; **no** finished-product claim.

## Progress note (Day 4az)

- **Andreassen gastroc/soleus**: legally downloaded VHM Final STLs (CC BY 4.0); Kabsch→BP3D documented under `third_party/andreassen/`; **spatial QA blocked** (laterality/leverage) — **0** GLB wire / no main-tree entries.
- Watchlist status → **blocked (alignment)** for bellies. **No** SA spam; **no** finished-product claim.

## Verification this pass

- `python3 scripts/integrity-audit.py`
- `npx vitest run`
- `npm run build`
- Commit + push on branch

---

## Bottom line

Phase 7 freezes a week-quality honest board: census **129** / **124**; ontology **126** / **129**; UX (prefs · hide · help · clip · cameras · sub-groups · screenshots) live; BY-SA **71/124**; open mining through **#57** with **0** late soft integrates. Treat this as a **checkpoint for journal prep / handback / CC0 watch** — **no finished-product claim**.

## Progress note (Day 4ba)

- **Option A**: Real BP3D LE landmarks + VH donor bones Kabsch retry — **blocked** (`le_kabsch_option_a_trials.json`); **0** wire.
- **Option B / target #2**: New `docs/cloud-agent-handback.md` resume brief (gates, census freeze, Andreassen exhausted track, deferred table).
- **No** SA spam; **no** finished-product claim.

