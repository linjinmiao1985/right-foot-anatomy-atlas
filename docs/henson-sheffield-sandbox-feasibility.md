# Henson Sheffield CC0 — marching-cubes sandbox feasibility

**Date**: 2026-09-15 (Week 2 Day **4bi**)  
**Related**: learning-log **#66** (labels/MR) · digs **#71–#72** (multi-atlas MIT + registration inputs CC0) · `docs/cc0-soft-tissue-watchlist.md` § Henson path · `third_party/henson-sheffield/`  
**Scope**: Docs + tiny metadata only. **No** full **5.65 GB** download. **0** GLB wire. Andreassen **skipped**. Teaching atlas in progress — **no finished-product claim**.

---

## Question

Is a **local marching-cubes sandbox** (gastroc med/lat + soleus → surface → laterality / Achilles AABB sketch vs BP3D) feasible **without** pulling the entire ORDA label + MR packs (~11 GB combined)?

---

## Sample availability (Figshare API, 2026-09-15)

| Pack | DOI | License | Files | Smallest usable unit |
|------|-----|---------|-------|----------------------|
| Augmented segmentations | **10.15131/shef.data.20440203** | **CC0** | 69 × `Aug_N_segmentations.dcm` + `read_me.txt` | **No** demo subset. Smallest DICOM ≈ **76.4 MB** (`Aug_8` / `Aug_52` / `Aug_58`). Only tiny non-volume file: `read_me.txt` (**1.5 KB**) |
| Companion MR | **10.15131/shef.data.20440164** | **CC0** | 69 × `Aug_N.dcm` + `read_me.txt` | Same pattern; smallest MR ≈ **76.4 MB**; `read_me.txt` **480 B** |
| Registration inputs | **10.15131/shef.data.21739733** | **CC0** | 20 × RGB dual-channel DICOM (~160 MB each) + xlsx + readme | Smallest volume ≈ **160 MB** — larger than one Aug label |
| Multi-atlas code | **10.15131/shef.data.21763982** | **MIT** | `multi_atlas_segmentation.m` (**5.6 KB**) + example dual/seg DICOMs (~53–160 MB) | Script alone is enough for **recipe** review |

**Verdict on “small sample”**: There is **no** published toy/sample DICOM. The only kilobyte-scale artifacts are readmes (+ MIT `.m`). A sandbox that actually runs marching cubes **must** download **≥1** label volume (~**76–88 MB**). Matching MR is optional for intensity QA (~same size). Full **5.65 GB** labels (or ~11 GB labels+MR) is **not** required for a one-subject POC.

---

## What we fetched this pass (git)

Under `third_party/henson-sheffield/` (see `NOTICE.txt`):

- `read_me.txt` — **37** muscle class IDs (alphabetically ordered; **10** gastroc lateralis · **11** gastroc medialis · **31** soleus; also EDL/EHL/FDL/FHL · peronei · tib ant/post)
- `mr_read_me.txt`, `registration_inputs_read_me.txt`, `multi_atlas_read_me.txt`
- `multi_atlas_segmentation.m` (MIT) — multi-atlas fusion recipe (not required for single-subject MC)

**Not fetched**: any `.dcm`. `.gitignore` blocks future `*.dcm` / `downloads/` / `sandbox/` under this folder.

---

## Proposed one-subject sandbox (when someone opts in)

1. **Pick** one labels file with Figshare file id (e.g. `Aug_8_segmentations.dcm`, id `36572283`, ≈76.4 MB) via  
   `https://api.figshare.com/v2/file/download/<id>`  
   Optional: matching `Aug_8.dcm` from MR pack.
2. **Load** with `pydicom` / SimpleITK (`dicomread` / `dcmread` as in pack readmes). Values are greyscale **class IDs** 0–37 (not HU).
3. **Extract** binary masks for classes **10 / 11 / 31** (and optionally long flex/ext / peronei).
4. **Surface**: `skimage.measure.marching_cubes` or VTK discrete marching cubes → export OBJ/STL.
5. **Sanity (docs gates before any main-tree thought)**:
   - Right-side laterality vs BP3D frame (do **not** repeat Andreassen X>0 fail blindly — MRI cohort laterality must be verified).
   - Distal extent vs live Achilles GLB AABB (attachment sketch only).
   - Scale: DICOM spacing → mm; compare calf length leverage vs foot-only Kabsch lessons.
6. **Stop**: write a short `spatial_qa` JSON under `third_party/henson-sheffield/sandbox/` (gitignored). **No** `public/models/` bake until laterality + attachment gates are sketched **and** a follow-up agent explicitly chooses integrate.

Estimated download for that POC: **~80 MB** (labels only) or **~160 MB** (labels + MR). Wall time: minutes on a normal link — not a multi-hour 5.65 GB sync.

---

## Feasibility scorecard

| Criterion | Result |
|-----------|--------|
| License clear for research sandbox | **Yes** — CC0 labels/MR; MIT fusion script |
| Small published sample DICOM | **No** — min volume ~76 MB |
| Full 5.65 GB required for POC | **No** — one subject suffices |
| Ready teaching GLB / main-tree wire | **No** — masks ≠ elemental foot DI/NV; cohort LE/calf-heavy; BP3D registration unproven |
| Prefer vs Andreassen similarity Kabsch | **Yes** (as research path) — Andreassen remains **skipped** / blocked track |
| Soft-gap fill (DI / per-ray MTA / nerve·ligament CC0) | **Still dry** — Henson does not address those |

**Overall**: Sandbox is **feasible at ~80–160 MB** with clear CC0 terms and a documented class-ID map. It is **not** a same-day integrate candidate. Do **not** download the full pack unless a multi-subject study is explicitly scoped.

---

## Explicit non-goals this pass

- No Andreassen re-wire or Kabsch retry  
- No Utah Hive reopen  
- No SA mesh spam  
- No finished-product / TA2-complete soft claim  

---

## Next agent (optional)

If continuing the belly research track: download **one** `Aug_*_segmentations.dcm` into gitignored `third_party/henson-sheffield/downloads/`, run the pipeline above offline, attach QA JSON — still **0** wire unless gates pass. Prefer CC0/BY DI/NV digs in parallel (`docs/cc0-soft-tissue-watchlist.md`).

---

## Day 4bj — one-subject MC POC executed (Aug_8)

**Downloaded** (gitignored): `third_party/henson-sheffield/downloads/Aug_8_segmentations.dcm` (~72.9 MB; Figshare file id **36572283**; CC0).

**Encoding discovery**: pixel values are **not** raw class IDs 0–37. Observed 37 non-zero greys map as `round(class_id * 255 / 37)` (class **10→69**, **11→76**, **31→214**). Spacing assumed **1×1×1 mm** (Henson et al. PLoS ONE 2023 homogenization).

**Marching cubes** (`scripts/henson_sheffield_poc_mc.py` · skimage):

| Class | Name | Voxels | Verts (approx) | Native extents mm (X/Y/Z) |
|------:|------|-------:|---------------:|---------------------------|
| 10 | gastrocnemius lateralis | 32 273 | 15 468 | 44 / 29 / 181 |
| 11 | gastrocnemius medialis | 110 076 | 33 020 | 56 / 50 / 220 |
| 31 | soleus | 227 679 | 58 534 | 94 / 49 / 295 |

Surfaces written under gitignored `third_party/henson-sheffield/poc/meshes/` (OBJ+GLB; ~12 MB total). Med/lat centroids separate ~**46 mm** on native X — masks are distinct.

### BP3D align sketch vs live Achilles (`calcaneal_tendon_BP5098.glb`)

Trials: Kabsch on med/lat centroids + distal-Z tips (with/without X flip); translate+scale soleus distal → Achilles low-Z band (scales 0.85/1.0/1.15 × flip). Gates mirrored from Andreassen track: **not** all-X>0; distal10% → Achilles **&lt;15 mm** for all three bellies.

| Result | Value |
|--------|-------|
| Trials with right-side OK | 8 / 8 |
| Trials with Achilles continuity OK (all 3) | **0 / 8** |
| Best by distal10 sum | translate_scale… flipX=False scale=1.15 — soleus/gastroc_lat distal10≈0.5–0.8 mm but **gastroc_med distal10≈20.7 mm FAIL** |
| **Wire into atlas** | **NO** |

Committed summary: `third_party/henson-sheffield/poc_spatial_qa.json`. Full raw copy also under gitignored `poc/`.

**Verdict**: Option A **MC success**; BP3D **laterality+Achilles continuity does not clearly pass**. Keep **monitor** — do **not** bake into `public/models/` or `structures.json`. Andreassen remains **skipped**. Soft DI/NV gaps still **dry**.
