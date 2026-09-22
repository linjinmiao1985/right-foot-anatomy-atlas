# Phase 8 Self-Review — Quality Week Checkpoint (Honest Status)

**Date**: 2026-09-22  
**Branch**: `cursor/week2-day4bm-ghost-opacity-096e`  
**HEAD baseline**: `fd06b7d` (Day 4bs) before this review commit  
**Status**: Teaching-grade atlas **in progress** — **not** a finished-product claim  
**Day 4bs note**: LESS-obvious pool dig #127–#135; soft gaps **still dry** across usual + alternate pools; census **unchanged**; **0** mesh wire.

**Scope**: Phase 8 = quality-week honest checkpoint after Day 4bo–4bs UX polish (ghost/explode/quiz + honesty banners) + comprehensive soft-tissue open-data exhaustion (digs #115–#135). License ceilings largely reached for CC0/BY soft alternatives to current ShareAlike. Next targets: journal methods refresh, Cloud Agent handback, watch-only soft monitoring.

---

## Executive honesty

Phase 8 is a **quality-week status checkpoint**, not a graduation certificate and **not** journal-publication-ready soft tissue. Osteology remains complete (26/26). Soft tissue is **teaching-useful and incomplete**. ShareAlike still dominates soft-tissue unique count (~71/124). Ontology map is **126/129** citable — three honest empties remain. No per-ray MTA; no TA2-complete nerve/vessel/ligament/muscle claim. Day 4bo–4bs focused on UX polish (teaching ghost/explode/quiz modes) and exhaustive CC0/BY soft-tissue search — **0** new mesh integrates; soft-tissue open-data ceiling largely reached.

---

## Current census (live 2026-09-22 · unchanged since Day 4af through Day 4bs)

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

### Ontology coverage (Day 4aq–4at; stable through 4bs)

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

## Spatial transforms & residuals (unchanged)

| Transform | Mean residual | Landmarks / method | Grade |
|-----------|---------------|--------------------|-------|
| Open3D → BP3D (Day 4m) | **≈2.61 mm** (max ≈4.41 mm MT1) | 12 foot bone centroids Kabsch similarity | Teaching-grade |
| UM muscles → BP3D (Day 4l) | **≈2.22 mm** (max ≈4.38 mm talus) | 7 tarsal landmarks | Teaching-grade |
| Z-Anatomy nerves | BP3D-derived CURVE→tube | Same mm frame | Pathway schematic |
| Z-Anatomy soft (Day 4ad+) | **≈1.81 mm** (max ≈3.52 mm calcaneus) | 9 foot bone centroids Kabsch | Teaching-grade |

These residuals support **classroom visualization**, not implant planning or interventional navigation.

---

## UX inventory (Day 4n–4bs)

| Feature | Status | Notes |
|---------|--------|-------|
| **Teaching prefs persist** | Live (4ap + 4av + 4bm + 4bn + 4bo) | localStorage: layers · label density · clip · last camera preset · **hiddenStructureIds** · **layerOpacities** · **layerExplode** · **quizMode**; SSR/test-safe |
| **Per-structure hide** | Live (4au/4av) | `X` / panel chip beyond isolate; restore chips; ids persist; Esc does **not** clear hides |
| **Keyboard help** | Live (4ao) | `?` / `H` + title button; bilingual sheet; Esc closes help first; dialog a11y |
| **Clip** | Live (lite, 4aj) | Single-axis **sagittal (X)** toggle + slider — teaching cutaway, **not** clinical MPR |
| **Camera presets** | Live (4an) | 默认 / 背侧 / 跖侧 / 内侧 / 外侧 · keys `1`–`5`; full polar for plantar sole |
| **Ghost / 透视** | Live (4bm) | Per-layer opacity + `G`; covering soft tissue fades; **not** clinical X-ray |
| **Explode / 抽出** | Live (4bn) | Per-layer +Y peel + `E`; sandwich teaching view; **not** surgical dissection |
| **Quiz stub / 测验** | Live (4bo) | Hide names/search + `Q`; honesty banner (4br); **not** Anki / exam |
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
| **NC / unclear packs** | NIH foot NC-SA; Embodi3D NC; SimTK "License: Model"; UMLUB Sketchfab unclear; Scan-the-World CC BY-NC-SA family | **reject** for main tree until clear CC0/BY |

---

## Open mining count highlights

Living log: `docs/open-anatomy-learning-log.md` — **135** numbered license-verified projects (#1–#135) as of Day 4bs (LESS-obvious pool dig #127–#135 **dry**).

| Window | Highlights | Mesh integrate |
|--------|------------|----------------|
| Day 4bo | #100–107 Scan-the-World NC / HRA organs / BP3D archive older SA / Dryad work EMG | **0** |
| Day 4br | #122–126 OpenGameArt skin / Scan-the-World NC / Grant SSM bones / VH bellies blocked | **0** |
| Day 4bs | #127–135 FootNet 2D / Scan-the-World NC / VK NC-ND / NIH bones NC-SA / Figshare tables / Wikimedia skin CC0 | **0** |

**Pattern**: Digs #115–#135 exhausted usual + alternate CC0/BY soft-tissue pools (university Zenodo segmentations; MorphoSource; NIH 3D Print; Open Anatomy Project / Slicer scenes; Figshare foot muscles; Wikimedia skin surfaces). Result: DI / per-ray MTA / nerve·ligament CC0/BY replacements remain **dry**; Andreassen gastroc/soleus is a clear CC BY **candidate** deferred to handback Kabsch (Day 4az+4ba **blocked**). **Soft-tissue open-data ceiling largely reached for current scope.**

---

## Actionable next targets (priority)

### 1. Journal readiness (docs / methods — no hype)

- Keep `docs/methods.md` version + reproducibility + journal-limitations table synced to live **129/124** census and **126/129** ontology.
- Cite Kabsch residuals + transform JSON paths; strengthen teaching-vs-clinical disclaimer (already present — refresh on any census change).
- Expert-review checklist (`docs/expert-review-checklist.md`) — **v2.0 refreshed Day 4ax**; reviewers pass when soft-tissue claims stay scoped to "teaching-useful, incomplete."
- **Do not** claim TA2 completeness or surgical registration.

### 2. Cloud Agent handback (when quota returns)

Resume only with green local gates (`python3 scripts/integrity-audit.py`, `npx vitest run`, `npm run build`). Prefer CC0/CC BY over SA volume. Prep refreshed Day **4ba** after Option A LE Kabsch blocker — see `docs/cloud-agent-handback.md`. Soft-ceiling context: `docs/week2-soft-ceiling-memo.md`.

| Deferred item | Why deferred | Suggested resume |
|---------------|--------------|------------------|
| Browser-session / Cloudflare-gated packs | Scripted fetch 403 / session required | Cloud Agent browser; verify license page before any wire |
| Zenodo Z-Anatomy `.blend` heavy re-harvest | Large binary; ankle bands absent in prior blend | Re-inventory named ATFL/CFL/deltoid/retinacula only if new revision claims them |
| Further multi-view screenshots | 9-shot pack already live | Optional angles only; still not a marketing gallery |
| Further CC0/BY DI / per-ray MTA dig | Day 4bo–4bs digs #100–#135 **dry** (0 integrate; soft-tissue open-data ceiling largely reached) | Re-check new open CT foot soft segmentations; skip NC; see `docs/cc0-soft-tissue-watchlist.md` |
| **Andreassen gastroc/soleus (CC BY)** | Day **4az** laterality FAIL; Day **4ba** Option A with real BP3D LE (FJ3387/3366/3381/3365) + VH bones still FAIL (foot residual inflate / Achilles gap) | See `docs/cloud-agent-handback.md` + `le_kabsch_option_a_trials.json` — **do not** force-wire; need non-similarity / alternate donor |

**Handback rule**: integrity-audit + vitest + build green; update census in README/methods/phase-8 if anything wires; **no** finished-product claims; **no** low-value SA mesh spam.

### 3. CC0 soft-tissue watchlist (watch-only mode)

Maintain a short **monitor/reject** list (see `docs/cc0-soft-tissue-watchlist.md`) for DI, per-ray MTA, gastroc/soleus, nerve/ligament main-tree replacements. **Day 4az + 4ba**: Andreassen belly Kabsch **blocked** (laterality then LE-residual/Achilles); trials JSON recorded; **0** wire. **Day 4bo–4bs**: digs #100–#135 across usual + alternate pools all **dry**. DI/per-ray MTA still dry. Never treat NC or "License: Model" as main-tree OK. Soft-ceiling memo: `docs/week2-soft-ceiling-memo.md`.

**Do not**: claim TA2 completeness; re-add Open3D duplicates of BP3D main-tree vessels; treat residuals as surgical registration.

**Status**: **Watch-only** — soft-tissue open-data ceiling largely reached for current scope; active mesh-digging should pause in favor of journal docs / methods refresh / expert-review sync unless a **new obvious CC0/BY soft hit** appears.

---

## Progress note (Day 4bo — quiz stub)

- **Teaching polish**: quiz stub / 测验 (`quizMode` + `Q`); prefs persist; **not** Anki / exam.
- **Open mining**: **#100–#107**; soft gaps still **dry**; **0** mesh wire.
- Census unchanged **129/124**; ontology **126/129**. Teaching atlas in progress — **not** clinical; **not** TA2-complete; **no finished-product claim**.

## Progress note (Day 4br — quiz honesty banner)

- **Teaching polish (ONE UX honesty)**: quiz mode honesty banner (fixed banner below title when `quizMode` active; explains teaching self-test / not Anki/exam / press **Q** to restore; parallels ligament/nerve incomplete banners).
- **Open mining**: **#122–#126**; soft gaps still **dry**; **0** mesh wire.
- Census unchanged **129/124**; ontology **126/129**. **No finished-product claim**.

## Progress note (Day 4bs — LESS-obvious pool dig)

- **SHIFT angle**: LESS-obvious pools (university Zenodo foot soft segmentations CC0/BY with mesh or convertible labels; MorphoSource human foot soft CC BY; NIH 3D print exchange foot soft CC; Open Anatomy Project / Slicer scenes; Figshare CC0 foot muscles).
- **Open mining**: **#127–#135**; soft gaps **still dry** across usual + alternate pools; **0** mesh wire.
- Teaching UX polish options (G/E/Q/0/Home keyboard help ✓; panel gap notes ✓; screenshots ✓) **all done prior** — no new polish this pass.
- Census unchanged **129/124**; ontology **126/129**. **No finished-product claim**.

## Verification this pass

- `python3 scripts/integrity-audit.py`
- `npx vitest run`
- `npm run build`
- Commit + push on branch

---

## Week 2 Quality Checkpoint (Day 4ck–4cu · 2026-09-22)

**Date**: 2026-09-22 · Day 4ck through Day 4cu  
**Branch**: `cursor/week2-day4bm-ghost-opacity-096e` (PR #3)  
**HEAD tip**: `c0f8b2d` (Day 4ct)

### Census (unchanged)

- **129/124** entries/unique
- **126/129** ontology citable (3 honest empties)
- **53** main-tree CC BY/CC0; **71** BY-SA isolate
- **134** GLB on-disk (~13 MB)
- **0** placeholders (entry-level)

### Teaching UX shipped this week

1. **Master ghost opacity** (Day 4bm): global per-layer opacity control (0.0–1.0); `G` preset; prefs persist
2. **Explode amount** (Day 4bn): spatial separation slider (0–50 mm); `E` preset; prefs persist  
3. **Gap notes enhancement** (Day 4ci): denser bilingual meshNote for grouped DI/MTA (census soft-ceiling pointers)
4. **Soft-ceiling memo** (Day 4cj): `docs/week2-soft-ceiling-memo.md` comprehensive 1-page summary (109+ searches, NC/SA/UM/Andreassen rejects, teaching stance)
5. **Reduced-motion** (Day 4cm): `@media (prefers-reduced-motion: reduce)` CSS (a11y)
6. **Focus-visible** (Day 4cl, 4co): keyboard navigation rings for search/text inputs (a11y)
7. **Quiz panel soft-ceiling note** (Day 4cq): bilingual teaching stub mentions per-toe DI/lumbricals/per-ray MTA open-data gaps
8. **Teaching-compromise wording** (Day 4cr–4ct): consistent terminology across README Limitations, StructurePanel gap notes, footer (grouped structures are "teaching compromises" not elemental atlases)

### Soft-tissue watch digs (24 NEW sources #147–#170)

**Day 4cl–4ct**: Zenodo, HuBMAP, TotalSegmentator, LABIM3D GitHub, Foot3D, BoneHub, Scan-the-World, NIH 3DPX, AnatomyTOOL, MorphoSource, 7T MRI, Dryad, Thingiverse, Cults3D, Figshare, PhysioNet/SimTK

**Result**: **0 new CC0/BY ready-to-use soft meshes** integrated
- **NC rejected**: Zenodo Scan-the-World 20228270/20231308/20231309 (#147, #161b); BoneHub vsd-feet-seg (#163)
- **SA rejected**: AnatomyTOOL Open3DModel (#165; confirms 4 DI + 4 lumbricals + 3 PI present but SA-only)
- **License unclear rejected**: Cults3D models (#160, #168)
- **No foot inventory**: LABIM3D (#158b ear/shoulder/knee/pelvis/vertebrae only)
- **Bones-only**: NIH 3DPX 15850 (#164); Thingiverse BP3D V3.0 (#168)
- **No downloadable mesh**: 7T MRI + Micromachines 2022 (#166, #169; segmentation technically feasible but not archived)
- **CT-only (labor-intensive)**: PhysioNet/SimTK Multidomain (#170; raw CT public domain but no pre-segmented mesh)

**Key finding**: 7T MRI + Micromachines 2022 AR study confirm intrinsic foot muscle segmentation **technically feasible** (lumbricals 1.5 cm³, DI/PI 19.8 cm³) but research datasets **not publicly archived** as STL/OBJ. Open3DModel confirms 4 DI + 4 lumbricals + 3 PI **present but SA-only** (Open3D lineage already in by-sa/ isolate).

**Soft-ceiling stance reconfirmed through #170**: License-clear ready-to-use per-toe DI, lumbricals, per-ray MTA meshes **remain unavailable**. Grouped structures (DI 1st–4th combined, dorsal/plantar MTA all rays) are **teaching compromises** (教学妥协), not per-toe/per-ray elemental atlases.

### Honest limitations maintained

- README Limitations section: updated dig range #1–#135 → #1–#170; added "teaching compromises" clarity
- StructurePanel gap notes: changed "teaching-grade grouped annotation" → "teaching compromise" (consistency)
- Footer: added "grouped structures are teaching compromises"; fixed typo 腰肌 → 蚓状肌
- Soft-ceiling memo: comprehensive reject documentation (NC/SA/UM/Andreassen/LABIM3D/NIH 3DPX/Zenodo Scan-the-World) + Day 4ct summary (24 digs #147–#170)

### Next week targets (watch-only + journal polish — NOT finished-product claim)

1. **Watch-only soft monitoring**: pause active mesh-digging unless **new obvious CC0/BY soft hit** appears; monitor Henson Sheffield CC0 DICOM labels (future mesh-extraction path), TotalSegmentator updates, HuBMAP/HRA/Zenodo feeds
2. **Journal methods refresh**: limitations table polish, license matrix clarity, Kabsch residuals interpretation (teaching visualization grade only — not surgical registration)
3. **Expert-review sync**: prepare teaching-useful/incomplete stance; no TA2-complete claim; no clinical claim
4. **No finished-product marketing**: teaching atlas **in progress**; grouped structures = teaching compromises; soft-tissue census soft-ceiling documented

### Week 2 verification gates (all green)

- `python3 scripts/integrity-audit.py`: 0 violations (129 structures / 134 GLBs)
- `npm test -- --run`: 138/138 passed (19 test files)
- `npm run build`: ✓ (dist built; 1.2 MB chunk size warning expected)
- Git: all Day 4ck–4cu commits pushed to PR #3

**Bottom line Week 2**: Teaching UX shipped (ghost/explode/gap notes/reduced-motion/focus-visible/teaching-compromise wording); soft-ceiling reconfirmed through 24 watch digs (#147–#170; 0 new CC0/BY soft meshes); honest limitations maintained (README/gap notes/footer consistency). Census unchanged (129/124; ontology 126/129). Teaching atlas **in progress** — **not** clinical; **not** TA2-complete; **not** a finished product.

---

## Bottom line

Phase 8 freezes a quality-week honest checkpoint: census **129** / **124**; ontology **126** / **129**; UX (prefs · hide · help · clip · cameras · ghost · explode · quiz + honesty banners) live; BY-SA **71/124**; open mining through **#135** with **0** late soft integrates. Soft-tissue open-data ceiling largely reached for DI / per-ray MTA / nerve·ligament CC0/BY / gastroc-soleus. Treat this as a **checkpoint for journal prep / handback / watch-only soft monitoring** — **no finished-product claim**.
