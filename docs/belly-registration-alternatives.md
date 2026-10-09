# Belly registration alternatives (docs-only research)

**Date**: 2026-09-18 · Day **4bk**  
**Status**: Research notes only — **0** mesh wire · **0** force Kabsch retry  
**Policy**: Soft gaps (DI / per-ray MTA / nerve·ligament CC0/BY) remain **dry**; gastroc/soleus remain **blocked** until a registration path passes the integrate gates below. Teaching atlas in progress — **no finished-product claim**.

**Artifacts cited** (do not delete):

| Path | Role |
|------|------|
| `third_party/andreassen/spatial_qa.json` | Day **4az** VH→BP3D 7-tarsal Kabsch + belly QA |
| `third_party/andreassen/le_kabsch_option_a_trials.json` | Day **4ba** Option A multi-set LE Kabsch (9 trials) |
| `third_party/andreassen/vh_to_bp3d_transform.json` | Last similarity transform (foot-tight) |
| `third_party/henson-sheffield/poc_spatial_qa.json` | Day **4bj** Aug_8 MC + BP3D align sketch |

Companion: `docs/cc0-soft-tissue-watchlist.md`, `docs/cloud-agent-handback.md`, `docs/henson-sheffield-sandbox-feasibility.md`.

---

## Integrate gates (unchanged)

All required before any `public/models/` GLB or `structures.json` wire:

1. **Foot landmarks**: mean residual ≤ **5 mm** and max ≤ **10 mm** (teaching-grade vs UM / Open3D / ZA packs).
2. **Right-side laterality**: not all verts X>0; centroid X≤0 for gastroc med/lat + soleus.
3. **Achilles distal continuity**: distal-10% min gap to Achilles **< 15 mm** for **all three** bellies.

---

## Why single-similarity Kabsch fails

### Andreassen VH Male Final STL → BP3D (Day 4az + 4ba)

**Donor**: Digital Commons VHM Final STL (CC BY 4.0) — gastroc med/lat + soleus.  
**Target frame**: BP3D foot + LE OBJs from local cache (`FJ3387` tibia · `FJ3366` fibula · `FJ3381` patella · `FJ3365` femur).

| Pass | What was tried | Outcome |
|------|----------------|---------|
| **4az** 7-tarsal Kabsch | scale≈0.796; foot mean≈**2.30** / max≈**4.27** mm | Foot OK; gastroc **all verts X>0**; soleus pad frac≈0.09; Achilles gaps ≫15 mm — **BLOCKED** (`spatial_qa.json`) |
| **4ba** Option A | 9 landmark sets (`A_tarsals7` … `K_tib_fib_pat_cent`) mixing tarsals + LE centroids/distals | **0/9** pass all three gates (`le_kabsch_option_a_trials.json`) |

**Trade-off observed** (verbatim from trial blocker): LE-augmented Kabsch can **flip laterality** but **inflates foot residuals**; tarsal-only stays **laterality FAIL**. Root cause is VH Male vs BP3D **body-proportion mismatch** under one similarity (scale+R+t): a foot-tight fit leaves calf angular freedom; pinning the calf spoils the foot.

**Best near-miss**: trial `H_ankle_focus` — right-side OK; soleus Achilles≈0.2 mm; gastroc med distal10≈9.7 mm; **gastroc lat distal10≈21.6 mm FAIL**; foot mean≈**8.8** / max≈**11.9** FAIL teaching-grade.

### Henson Sheffield Aug_8 MC POC (Day 4bj)

**Donor**: Figshare CC0 label DICOM (`Aug_8`) → MC surfaces for classes 10/11/31 (gastroc lat/med + soleus).  
**Align**: crude Kabsch / translate-scale sketches vs BP3D Achilles (`poc_spatial_qa.json`).

| Check | Result |
|-------|--------|
| MC surfaces | **OK** (gitignored `poc/meshes/`) |
| Right-side + Achilles all three | **FAIL** (0/8 sketches) |
| Wire | **NO** — `integrate_gate` forced false even on near-miss |

Best sketch (`translate_scale_soleusDistal_to_achillesLow_flipX=False_scale=1.15`): laterality OK; soleus + gastroc lat Achilles OK; **gastroc med distal10≈20.7 mm FAIL**. Same single-rigid failure mode as Andreassen — one similarity cannot hold foot pad + three belly distal tips.

**Do not** treat Henson masks as an Andreassen Kabsch substitute without a non-similarity plan.

---

## Alternative registration paths (research only — no force-wire)

### A. Thin-plate spline (TPS) / landmark warp

- **Idea**: After a coarse similarity, warp donor soft verts with TPS (or B-spline) using paired landmarks: calcaneus/talus/Achilles tip + tibia/fibula distal ± proximal calf.
- **Why it might help**: Separates rigid pose from non-rigid proportion correction between VH/Henson subject and BP3D.
- **Risks**: Over-warp tears belly topology; needs dense, anatomically valid control points; still must pass laterality + Achilles gates; compute cost for QA loops.
- **Next research step**: Docs + offline sandbox on **one** Henson subject or Andreassen STL — record warp residual JSON; **no** GLB until gates pass.

### B. Two-stage proximal–distal

- **Idea**: (1) Align **foot/ankle** (tarsals + Achilles) with similarity or rigid; (2) separately align **proximal calf** (femur/patella/tibia proximal) with a second similarity or rotation about ankle hinge; blend in mid-belly with a soft weight.
- **Why it might help**: Matches the observed trade-off — foot-tight vs calf-tight sets never co-satisfy under one transform.
- **Risks**: Mid-belly crease / stretch artifact; teaching silhouette may look “broken”; still not a DI/MTA source.
- **Next research step**: Formalize blend zone in a sandbox script; compare to Day 4ba `H_ankle_focus` residuals — docs-only until gates pass.

### C. BP3D-native donor (preferred long-term)

- **Idea**: Extract gastroc/soleus (or triceps surae) **already authored in BodyParts3D / Anatomography frame** under a license compatible with main-tree **CC BY 4.0** claim — then no cross-donor Kabsch.
- **Why it might help**: Zero VH↔BP3D proportion war; spatial QA collapses to “is the part present and named?”.
- **Blockers today**: Prior BP3D harvest for this atlas scoped to **right foot**; calf bellies were **absent** from the teaching fill (Achilles + plantaris only). Anatomography / Moerman mirrors often carry **BY-SA 2.1 JP** — isolate under `by-sa/` only; do **not** mix into main-tree LSDB claim without license review (`#47`/`#48` / Day 4bk deepen of `#21`).
- **Next research step**: Inventory whether BP3D FMA parts for gastroc med/lat/soleus exist as discrete OBJs with clear CC BY (not SA-only mirror); if yes, spatial QA vs existing Achilles — still **0** wire until gates + NOTICE.

### D. What remains out of scope this pass

- Force-wiring Andreassen or Henson on failed Kabsch / sketch.
- Multi-GB DICOM cohort pulls for “maybe better subject”.
- Treating OpenSim `.osim` force-sharing packs (e.g. Zenodo **21879846**, dig **#83**) or MRI **model weights** as surface teaching meshes.
- Claiming DI / per-ray MTA solved via calf registration.

---

## Soft-gap honesty (Day 4bk)

| Gap | Status after dig **#77–#83** |
|-----|------------------------------|
| DI / per-ray MTA / nerve·ligament CC0/BY | **Still dry** |
| Gastroc/soleus ready GLB | **Still blocked** (alignment + no BP3D-native BY donor confirmed) |
| Census | Unchanged **129/124** (53 main / 71 BY-SA) |

---

## Resume checklist

1. Re-read this note + the three QA JSON artifacts before any belly sandbox.
2. Prefer **C (BP3D-native)** if a license-clean discrete part appears; else sandbox **A/B** on one subject with gate JSON — never wire on near-miss.
3. Continue CC0/BY soft dig for DI/MTA in parallel — registration research does **not** unblock those gaps.
4. Gates: `python3 scripts/integrity-audit.py` · `npx vitest run` · `npm run build` before any mesh commit.
5. **No finished-product claim.**
