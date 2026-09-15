# Expert Review Checklist

**Purpose**: Quality assurance for **teaching-grade** anatomical accuracy, nomenclature, license boundaries, and honest soft-tissue scope — **not** a clinical or journal-publication readiness certificate.  
**Intended Reviewers**: Anatomy instructors, foot/ankle surgeons, medical educators.  
**Date**: 2026-09-15 (Week 2 Day 4bf / Phase 7)  
**Live census** (verify against `src/data/structures.json` + `docs/phase-7-self-review.md`): **129** entry-level rows / **124** unique · **53** main-tree (CC BY/CC0) / **71** BY-SA isolate · ontology **126/129** citable · **0** placeholders · osteology **26/26** · soft tissue **teaching-useful, incomplete**  
**Atlas status**: Teaching atlas **in progress** — **no finished-product claim**; **not** TA2-complete soft tissue; **not** surgical registration.

Companion: `docs/methods.md` (journal-facing limitations + Kabsch residuals), `docs/cc0-soft-tissue-watchlist.md`, `docs/terminology.md`.

---

## A. Anatomical Nomenclature (TA2 / FMA / BP — sparse honesty)

### Latin / ontology panel
- [ ] **Spot-check ≥10 structures** against IFAA TA98 entity pages / TA2 viewer / FMA where the panel shows codes (`src/lib/ontologyIds.ts`):
  - [ ] Calcaneus → TA A02.5.10.001 · FMA24496 · BP9040
  - [ ] N. tibialis (`tibial_nerve`) → TA A14.2.07.058 · FMA19035
  - [ ] A. dorsalis pedis (`dorsalis_pedis_artery`) → TA A12.2.16.048 · FMA43915 · BP6027
  - [ ] M. abductor hallucis (`abductor_hallucis`) → FMA37459 (TA omitted in map this pass — honest sparse)
  - [ ] Add ≥6 more from bone / muscle / vessel / nerve / ligament layers
- [x] **Sparse map honesty** (Day 4be teaching polish): Panel shows codes **only when present**; otherwise **Ontology (honest empty)** note with named reasons for **3** empties (`cervical_talocalcaneal_ligament`; `medial_plantar_veins`; `lateral_plantar_vein`) — do **not** invent IDs
- [x] **Grouped / approx notes** (Day 4bf teaching polish): Where ontology `note` says grouped, `nameZh` includes **（组合）** or **（分组）** — vitest-enforced; do **not** claim elemental per-ray
- [ ] **Do not** treat **126/129** as TA2-complete soft tissue

### Chinese Names (PRC Standards)
- [ ] **踇 (mǔ) for hallux** (toe): Verified in `structures.json` (NOT 拇, thumb)
  - [ ] 踇展肌 / 踇收肌 / 踇短屈肌 and spot-check ≥5 more hallux-related names
- [ ] Align with 《人体解剖学》第9版 clinical usage where applicable
- [ ] **No mixed hand/foot terminology**

### Laterality
- [ ] **Pes dexter (right foot)** consistently specified in docs / UI
- [ ] **No left-foot structures** mixed in (BP3D/UM/Open3D/ZA used `.r` / right designation)
- [ ] Foot-specific scope: bilateral axial skeleton excluded

---

## B. Anatomical Accuracy (scoped claims)

### Osteology (Bones) — **26/26** complete (incl. sesamoids)
- [ ] **7 tarsals**: calcaneus, talus, navicular, cuboid, medial/intermediate/lateral cuneiforms
- [ ] **5 metatarsals**: MT1–MT5
- [ ] **13 phalanges + sesamoids**: hallux proximal+distal; toes 2–4 proximal+middle+distal; toe 5 proximal+distal (**no** middle_phalanx_5 in atlas — matches common anatomy)
- [ ] **Sesamoids**: grouped teaching mesh (`sesamoid_bones`; ontology note OK)
- [ ] Articulations plausible; no obvious left/right flip; UM/BP3D distal phalanx placement reasonable

### Myology (Muscles) — teaching-useful, **incomplete**
- [ ] Intrinsic plantar layers I–IV + dorsal EDB/EHB present as teaching set (see `docs/muscle-gap-census.md`)
- [ ] **Dorsal interossei**: Open3D **BY-SA** under `by-sa/` — **not** main-tree CC BY; prefer future CC0/BY
- [ ] Extrinsics include UM CC0 set + selected Open3D/ZA BY-SA (FB/FT/opponens/plantaris) — **gastroc/soleus bellies absent by design**
- [ ] Origins/insertions plausible on spot-check (≥3 muscles)
- [ ] Muscle sub-group UI is **teaching partition only** — not a finished myology atlas

### Angiology (Vessels) — **29** teaching meshes; **no per-ray MTA**
- [ ] Main-tree BP3D core (dorsalis pedis, arcuate, med/lat plantar, plantar arch, + honest **grouped** dorsal digital / plantar metatarsal)
- [ ] Open3D/ZA BY-SA expansions present under isolate — several **grouped** plurals remain
- [ ] Labels for grouped meshes say （组合）/grouped — **do not** claim elemental 1st–4th MTA
- [ ] Vessel sub-groups = UI only; venous fill teaching-useful, **not** complete

### Neurology (Nerves) — **17** teaching meshes; **not** TA2-complete
- [ ] 6 ZA trunks (tibial, med/lat plantar, deep/superficial fibular, sural) — CURVE→tube pathway schematic
- [ ] 11 Open3D fine/cutaneous/calcaneal/dorsal digitals under `by-sa/`
- [ ] Pathway plausibility on visual inspection; dual-source overlap avoided where documented (e.g. sural→LDC continuity note)
- [ ] Nerve sub-groups = UI only

### Ligament / tendon — **29** teaching meshes; **incomplete**
- [ ] Main-tree: BP3D long plantar + Achilles only
- [ ] Open3D BY-SA ankle/foot bands, retinacula, fascia under `by-sa/` — teaching set, **not** finished ligament atlas
- [ ] Named ATFL/CFL/deltoid/retinacula **absent** from prior ZA `.blend` — Open3D remains source for those bands
- [ ] Ligament sub-groups = UI only

---

## C. Viewer / layer system (teaching UX)

### Visibility / selection
- [ ] Hidden **layers** not selectable / not drawn
- [ ] Per-structure **hide** (`X` / panel chip) works beyond isolate; restore chips; ids persist in teaching prefs
- [ ] Esc closes help first, else clears selection + isolate + search — **does not** clear per-structure hides
- [ ] Isolate (`I`) and search behave as documented in `docs/interaction-qa.md` / keyboard help

### Materials / chrome (spot-check)
- [ ] Bones / muscles / vessels / nerves visually distinct for teaching
- [ ] License badge: **主树 · Main** vs **ShareAlike**
- [ ] Label density 关/中文/中+拉; sagittal clip lite = teaching cutaway **not** clinical MPR
- [ ] Camera presets `1`–`5` (默认/背/跖/内/外); keyboard help `?`/`H`

---

## D. License Boundaries (Critical)

### MIT code + CC BY/CC0 main tree
- [ ] `public/models/right-foot/*.glb` (not `by-sa/`): CC BY 4.0 (BP3D) and/or CC0 (UM) only
- [ ] No BY-SA content outside `by-sa/`

### BY-SA isolate
- [ ] Soft-tissue ShareAlike meshes only under `public/models/right-foot/by-sa/` + `NOTICE.md`
- [ ] Live unique weight ≈ **71/124** under SA — deliberate teaching trade-off; prefer CC0/BY replacements (`docs/cc0-soft-tissue-watchlist.md`)
- [ ] README / methods explain: skip BY-SA layers or delete `by-sa/` → MIT + CC BY/CC0 only

### NC / unclear exclusions
- [ ] No BY-NC / NC-SA in main tree (see watchlist reject table + learning log)
- [ ] Reject unclear “License: Model” / Sketchfab-unstated packs until SPDX-clear

---

## E. Known gaps (disclosed — accept as scope)

### Soft-tissue ceilings (not “missing placeholders”)
- [ ] **Per-ray MTA**: grouped only — soft inventory ceiling
- [ ] **BY-SA weight**: nerves 100% SA; most ligaments/vessels SA; DI + several extrinsics SA
- [ ] **Gastroc/soleus bellies**: absent
- [ ] **Ontology**: 3 honest empties; map sparse by design
- [ ] **Residuals**: Kabsch teaching-grade only — Open3D→BP3D ≈2.61 mm mean; UM→BP3D ≈2.22 mm; ZA→BP3D ≈1.81 mm — **not** surgical registration bounds (`docs/methods.md` transform table)

### By design / out of scope this atlas
- [ ] Skin / full fascia envelope / joint capsules as clinical models
- [ ] Patient-specific / implant / navigation use
- [ ] Claiming journal-publication-ready soft tissue or TA2-complete NV/ligament sets

---

## F. Spatial alignment

- [ ] Viewer scale factor 0.01 (mm→cm) after bake into BP3D mm frame
- [ ] Transform JSONs present and cited:
  - [ ] `third_party/open3dmodel/open3d_to_bp3d_transform.json`
  - [ ] `third_party/um/um_to_bp3d_transform.json`
  - [ ] `third_party/z-anatomy/za_to_bp3d_transform.json`
- [ ] Optional visual: tibial / plantar pathways grounded; no gross floating meshes

---

## G. Clinical / journal disclaimer

### Must remain prominent
- [ ] Educational / teaching-grade only (README + methods)
- [ ] **Not** for diagnosis, treatment planning, surgical navigation, implant sizing, interventional guidance
- [ ] Soft tissue = teaching-useful **incomplete**; osteology complete does **not** imply soft completeness
- [ ] Methods **journal-facing limitations** table current (license mix, residuals, grouped vessels, BY-SA share, no clinical claim, ontology partial)

### Appropriate audiences
- [ ] Medical students, anatomy instructors, foot/ankle residents, PT education

### Inappropriate claims (fail if asserted)
- [ ] TA2-complete soft tissue
- [ ] Surgical registration / gold-standard reference
- [ ] Finished-product / publication-ready soft atlas

---

## H. Reproducibility

- [ ] DOIs / sources cited: BP3D, UM, Z-Anatomy, Open3D (see methods Data Sources)
- [ ] `python3 scripts/integrity-audit.py` · `npx vitest run` · `npm run build` green before handback
- [ ] Ontology vitest: mapped ids exist live; map stays sparse (`n < total`); **126/129** with named empties
- [ ] Screenshot pack optional (`npm run screenshots` → `docs/screenshots/`) — teaching QA, **not** marketing gallery

---

## I. Summary assessment (teaching-grade pass bar)

### Pass (teaching-grade)
- [ ] Nomenclature spot-checks OK; 踇/拇 clean; laterality right-foot
- [ ] No major misidentification; soft claims scoped “teaching-useful, incomplete”
- [ ] BY-SA cleanly isolated; NC excluded from main tree
- [ ] Gaps / ceilings disclosed; clinical disclaimer clear; residuals not oversold

### Fail (requires correction)
- [ ] Hand/foot 拇/踇 mix; left-foot content; BY-NC in tree; BY-SA outside `by-sa/`
- [ ] Invented ontology IDs; per-ray MTA or TA2-complete soft claims; finished-product language

---

## Reviewer notes

**Date Reviewed**: _____________  
**Reviewer Name**: _____________  
**Institution/Role**: _____________

**Overall Assessment**:
- [ ] ✅ PASS (teaching-grade; soft tissue incomplete as disclosed)
- [ ] ⚠️ PASS WITH RESERVATIONS (list issues below)
- [ ] ❌ FAIL (major corrections required)

**Issues Found**:
1. 
2. 
3. 

**Recommendations for next iteration** (prefer CC0/BY over SA volume):
1. 
2. 
3. 

---

**Checklist Version**: 2.0 (2026-09-15 Day 4ax / Phase 7; Day 4be ontology honest-empty; Day 4bf grouped label polish)  
**Supersedes**: 1.0 (2026-09-14 Week Sprint Day 7 — outdated 38/43 / DI-placeholder / ligaments-excluded framing)  
**Atlas pointer**: Week 2 Day 4bf / Phase 7 — teaching atlas in progress; **no finished-product claim**
