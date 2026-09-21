## Day 4bl status addendum (2026-09-21)

Soft dig **#84–#89** (ScanTW NC foot muscles; CRUS / Air-Sage UX-borrow SA; AnyBody proprietary; SimTK kul license opaque; CC0 outer-foot PLYs). Soft gaps **still dry**. **0** mesh wire. Cloud Agent reply still **usage-exhausted** — enable on-demand usage to relaunch `bc-4d6d86a7-…` or a new agent on `cursor/right-foot-anatomy-atlas-mvp-af85`. Teaching atlas in progress — **no finished-product claim**.

## Day 4bk status addendum (2026-09-18)

Docs-only soft dig **#77–#83** + `docs/belly-registration-alternatives.md` (why single-similarity Kabsch fails; TPS / two-stage / BP3D-native options — research notes only). Soft gaps **still dry**. **0** mesh wire. Andreassen/Henson **not** force-wired. **Cloud Agent still quota-blocked** — local takeover continues. Teaching atlas in progress — **no finished-product claim**.

## Day 4bj status addendum (2026-09-15)

Henson Sheffield **Option A** one-subject MC POC completed (`Aug_8`): surfaces OK; BP3D Achilles continuity sketch **FAIL** — **0** wire. See `docs/henson-sheffield-sandbox-feasibility.md` § Day 4bj + `third_party/henson-sheffield/poc_spatial_qa.json`. Andreassen still skipped. Soft gaps dry. Teaching atlas in progress — **no finished-product claim**.

# Cloud Agent handback — Phase 7 resume brief

**Date**: 2026-09-15 · Day **4bh**  
**Branch**: `cursor/right-foot-anatomy-atlas-mvp-af85`  
**Status**: Teaching-grade atlas **in progress** — **not** a finished-product claim  
**Companion**: `docs/phase-7-self-review.md`, `docs/cc0-soft-tissue-watchlist.md`, `third_party/andreassen/`

---

## Green gates (required before any mesh wire)

```bash
python3 scripts/integrity-audit.py
npx vitest run
npm run build
```

Prefer **CC0 / CC BY** over further ShareAlike volume. Update census in README / methods / phase-7 **only if** something wires. **No** finished-product claims; **no** low-value SA mesh spam.

---

## Live census freeze (unchanged through Day 4bh)

| Metric | Value |
|--------|-------|
| Entries / unique | **129** / **124** |
| Main-tree / BY-SA | **53** / **71** |
| Ontology citable | **126** / **129** (3 honest empties) |
| Discrete GLBs | **134** (~59 main + ~75 `by-sa/`) |

Osteology complete (26/26). Soft tissue **teaching-useful and incomplete**.

---

## Andreassen gastroc/soleus — exhausted this track (do not force-wire)

| Pass | What was tried | Outcome |
|------|----------------|---------|
| Day **4az** | VHM Final STL (CC BY 4.0) download; 7-tarsal Kabsch→BP3D | Foot mean≈**2.3 mm** OK; gastroc **all X>0**; soleus pad frac≈0.09 — **blocked** |
| Day **4ba** Option A | Real BP3D LE OBJs from local `/tmp/bp3d` cache (**FJ3387** tibia, **FJ3366** fibula, **FJ3381** patella, **FJ3365** femur) + VH donor bones (tibia ASCII; fib/fem/pat binary); multi-set Kabsch | Laterality can flip; foot residuals inflate ≈**7–16 mm**; Achilles distal continuity not OK for all three bellies — **still blocked** |

**Artifacts** (git): `third_party/andreassen/vh_to_bp3d_transform.json`, `spatial_qa.json`, `le_kabsch_option_a_trials.json`, `NOTICE.txt`.  
**Not** under `public/models/` — **0** GLB bake / **0** main-tree entries.

**Integrate gate used Day 4ba** (all required):

1. Foot landmark mean ≤**5 mm** and max ≤**10 mm** (teaching-grade ceiling vs UM/Open3D/ZA packs)
2. Right-side laterality (not all verts X>0; centroid X≤0) for gastroc med/lat + soleus
3. Distal-10% Achilles gap **<15 mm** for all three bellies

**Best near-miss**: trial `H_ankle_focus` — right-side OK; soleus Achilles≈0.2 mm; gastroc med≈9.7 mm; **gastroc lat≈21.6 mm FAIL**; foot mean≈**8.8** / max≈**11.9** FAIL.

**Root cause**: VH Male vs BP3D body proportion mismatch under a **single** similarity transform — foot-tight fit leaves calf angular freedom; LE landmarks that pin the calf spoil the foot. Do **not** wire wrong-side or high-residual meshes. Next belly path needs non-similarity registration, separate proximal/distal warps, or a different CC0/BY donor already in BP3D frame — **not** another foot-only Kabsch.

---

## Deferred resume table

| Deferred item | Why deferred | Suggested resume |
|---------------|--------------|------------------|
| **Andreassen gastroc/soleus wire** | Day 4az + **4ba Option A** QA fail | Only with registration that passes the three gates above; re-read `le_kabsch_option_a_trials.json` |
| Browser / Cloudflare-gated packs | Scripted fetch 403 / session | Cloud Agent browser; verify license page before wire |
| Zenodo Z-Anatomy `.blend` heavy re-harvest | Large binary; ankle bands absent prior | Re-inventory ATFL/CFL/deltoid/retinacula **only if** new revision claims them |
| Further multi-view screenshots | 9-shot pack live | Optional angles only — not a marketing gallery |
| CC0/BY DI / per-ray MTA / nerve·ligament main-tree | Watchlist dry through Day **4bk** (#38–#83); Utah Hive **reject** bones; Henson CC0 = masks + **Aug_8 MC POC** (BP3D align FAIL; 0 wire); belly alts documented | Re-check new open CT foot soft segmentations; optional TPS/two-stage sandbox per `belly-registration-alternatives.md` — **no** force-wire; **skip NC** / “License: Model” / GPL viral packs |

---

## Day 4bb done this handoff

- Open mining **#58–#61** (OMFAtlas / Anatria-3D / OPANEX / ICL LE bones) — **0** mesh wire; soft gaps still dry.
- Andreassen Kabsch **not** re-opened.

## Day 4bd done this handoff

- Honesty badge **ARIA** (panel + footer + Main/ShareAlike chip). **0** mesh wire; Andreassen not re-opened.

## Day 4be done this handoff

- Ontology **honest-empty** StructurePanel note + digs **#63–#65** (Utah Hive CC BY 3.0 / Foot3D / Anatomy Insight). **0** mesh wire; Andreassen skipped.

## Day 4bf done this handoff

- Utah Hive (#63) **reject** for main-tree bones (pathology/incomplete/wrong frame; license OK). Grouped `nameZh` （组合） polish + vitest. **0** mesh wire; Andreassen skipped.

## Day 4bg done this handoff

- Lazy **layer load progress** overlay + digs **#66–#68** (Henson CC0 LE masks / Auckland MIT LE visualiser / CEINMS-RT Apache MSK). **0** mesh wire; Andreassen skipped; Utah not integrated.

## Day 4bh done this handoff

- Auckland **view-reset** UX (button + `0`/`Home`) + Henson (#66) DICOM path detail on watchlist + digs **#69–#70** (DeepACSA CC BY US / Dryad CC0 PF windlass). **0** mesh wire; Andreassen skipped; Utah not integrated.


## Day 4bi done this handoff

- Sheffield **sandbox feasibility** note (`docs/henson-sheffield-sandbox-feasibility.md`) + Henson metadata/NOTICE under `third_party/henson-sheffield/` (**0** DICOM).
- Expert-review **踇/laterality** spot-check.
- Digs **#71–#76** (Henson MIT/CC0 companions · VSD NC-SA · UltraBonesHip NC · auto-lowerlimb Apache · STAPLE NC). **0** mesh wire; Andreassen skipped; Utah not integrated.

## Suggested next agent priorities (pick one; quality over volume)

1. **CC0/BY soft dig** against `docs/cc0-soft-tissue-watchlist.md` (DI, per-ray MTA, nerve/ligament main-tree replacements) — integrate **only** with spatial QA pass.
2. **Journal readiness polish** — keep methods / expert-review checklist synced; no hype; no TA2-complete claim.
3. **UX teaching polish** — accessibility / prefs / help sheet only if a concrete gap is named; avoid SA mesh spam.
4. **Alternate belly registration research** (docs-only until QA-ready) — TPS / two-stage proximal–distal / BP3D-native donors — not force Kabsch.

---

## Do not

- Force-wire Andreassen gastroc/soleus on foot-only or failed LE Kabsch
- Claim TA2 completeness or surgical registration
- Re-add Open3D duplicates of BP3D main-tree vessels
- Treat NC or unclear “License: Model” packs as main-tree OK
- Claim a finished product

---

## Verification this handback prep pass

- Option A trials recorded; **0** mesh integrate
- `python3 scripts/integrity-audit.py` · `npx vitest run` · `npm run build` (run on commit pass)
- Commit + push on branch


## Day 4bj done this handoff

- Option A: downloaded **one** Aug_8 label DICOM (~73 MB, gitignored); MC gastroc/soleus → gitignored `poc/meshes/`.
- BP3D align sketch **FAIL** Achilles continuity — summary `third_party/henson-sheffield/poc_spatial_qa.json`; script `scripts/henson_sheffield_poc_mc.py`.
- **0** mesh wire; Andreassen skipped; Utah not integrated; no SA spam.

**Bottom line (Day 4bj retained)**: Henson Aug_8 MC POC — surfaces OK, BP3D Achilles sketch FAIL, 0 wire. Superseded for “current” by Day **4bk** addendum above.


## Day 4bk done this handoff

- Digs **#77–#83** (LEG-3D-US GPL reject · vessel/bone/anatomy atlas UX-borrow · Femora/HRA monitor · TPTBox Apache reject · OpenSim triceps-surae sims reject).
- `docs/belly-registration-alternatives.md` from Andreassen + Henson QA JSONs — TPS / two-stage / BP3D-native research only.
- Soft gaps **still dry**; **0** mesh wire; Andreassen skipped; Utah not integrated; Henson not re-wired.
- **Cloud Agent still quota-blocked.**

**Bottom line**: Handback brief current through Day **4bk** (CC0 soft dig #77+ + belly registration research — 0 wire). Soft gaps dry. Andreassen belly track remains **documented blocked**. Census unchanged. Teaching atlas in progress — **no finished-product claim**. Cloud Agent quota still exhausted.
