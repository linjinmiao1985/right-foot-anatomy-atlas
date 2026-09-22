# Expert Review Checklist

**Purpose**: Quality assurance for **teaching-grade** anatomical accuracy, nomenclature, license boundaries, and honest soft-tissue scope — **not** a clinical or journal-publication readiness certificate.  
**Intended Reviewers**: Anatomy instructors, foot/ankle surgeons, medical educators.  
**Date**: 2026-09-22 (Week 2 Day 4cw / Phase 8 EXPERT REVIEW PREP)  
**Live census** (verify against `src/data/structures.json` + `docs/phase-8-self-review.md` Week 2 checkpoint): **129** entry-level rows / **124** unique · **53** main-tree (CC BY/CC0) / **71** BY-SA isolate · ontology **126/129** citable · **0** placeholders · osteology **26/26** · soft tissue **teaching-useful, incomplete**  
**Atlas status**: Teaching atlas **in progress** — **no finished-product claim**; **not** TA2-complete soft tissue; **not** surgical registration.

**Key docs**: 
- `docs/methods.md` (journal-facing limitations table + license matrix + Kabsch residuals; Day 4cv polish)
- `docs/week2-soft-ceiling-memo.md` (soft-tissue open-data ceiling: exhaustive search #1–#170 found no CC0/BY per-toe DI, lumbricals, per-ray MTA; NC/SA/unclear rejects documented; teaching compromises stance)
- `docs/cc0-soft-tissue-watchlist.md` (ongoing watch-only monitoring)
- `docs/terminology.md` (nomenclature)
- `docs/phase-8-self-review.md` (Week 2 checkpoint: UX shipped + soft-ceiling #147–#170 DRY + teaching-compromise consistency)

---

## A. Anatomical Nomenclature (TA2 / FMA / BP — sparse honesty)

### Latin / ontology panel
- [x] **Spot-check ≥10 structures** against IFAA TA98 entity pages / TA2 viewer / FMA where the panel shows codes (`src/lib/ontologyIds.ts`):
  - [x] Calcaneus → TA A02.5.10.001 · FMA24496 · BP9040
  - [x] N. tibialis (`tibial_nerve`) → TA A14.2.07.058 · FMA19035
  - [x] A. dorsalis pedis (`dorsalis_pedis_artery`) → TA A12.2.16.048 · FMA43915 · BP6027
  - [x] M. abductor hallucis (`abductor_hallucis`) → FMA37459 (TA omitted in map this pass — honest sparse)
  - [x] Add ≥6 more from bone / muscle / vessel / nerve / ligament layers — vitest `expert-review §A named spot-checks` (Day 4bm)
- [x] **Sparse map honesty** (Day 4be teaching polish): Panel shows codes **only when present**; otherwise **Ontology (honest empty)** note with named reasons for **3** empties (`cervical_talocalcaneal_ligament`; `medial_plantar_veins`; `lateral_plantar_vein`) — do **not** invent IDs
- [x] **Grouped / approx notes** (Day 4bf teaching polish): Where ontology `note` says grouped, `nameZh` includes **（组合）** or **（分组）** — vitest-enforced; do **not** claim elemental per-ray
- [ ] **Do not** treat **126/129** as TA2-complete soft tissue

### Chinese Names (PRC Standards)
- [x] **踇 (mǔ) for hallux** (toe): Verified in `structures.json` (NOT 拇, thumb) — Day **4bi**: **0** `拇`; **9** `踇` rows
  - [x] 踇展肌 / 踇收肌 / 踇短屈肌 + 踇长屈/伸 · 踇短伸 · 踇趾近/远节 · 踇趾籽骨（组合） (≥5 hallux-related)
- [ ] Align with 《人体解剖学》第9版 clinical usage where applicable
- [ ] **No mixed hand/foot terminology**

### Laterality
- [x] **Pes dexter (right foot)** consistently specified in docs / UI (Day 4bi spot-check)
- [x] **No left-foot structures** mixed in — Day **4bi**: **0** ids with left/sinister/左
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
- [ ] **Dorsal interossei**: Open3D **BY-SA** grouped DI 1st–4th under `by-sa/` — **teaching compromise** (教学妥协), **not** per-toe elemental atlas; **not** main-tree CC BY; exhaustive search #1–#170 found no CC0/BY per-toe DI source (soft-ceiling memo)
- [ ] **Lumbricals**: absent (placeholder in structures.json) — exhaustive search found no CC0/BY source (UM excludes intrinsics; Open3D lacks; BP3D lacks; Visible Korean NC-ND; soft-ceiling memo)
- [ ] Extrinsics include UM CC0 set + selected Open3D/ZA BY-SA (FB/FT/opponens/plantaris) — **gastroc/soleus bellies absent by design** (Andreassen CC BY 4.0 spatial QA fail; Henson CC0 DICOM alignment fail; soft-ceiling memo)
- [ ] Origins/insertions plausible on spot-check (≥3 muscles)
- [ ] Muscle sub-group UI is **teaching partition only** — not a finished myology atlas

### Angiology (Vessels) — **29** teaching meshes; **no per-ray MTA**
- [ ] Main-tree BP3D core (dorsalis pedis, arcuate, med/lat plantar, plantar arch, + honest **grouped** dorsal digital / plantar metatarsal)
- [ ] **Dorsal MTA**: Open3D **BY-SA** grouped all rays under `by-sa/` — **teaching compromise** (教学妥协), **not** per-ray 1st–4th elemental atlas; exhaustive search #1–#170 found no CC0/BY per-ray dorsal MTA source (TotalSegmentator lacks named foot vessels; ISA lacks per-ray MTA elementals; soft-ceiling memo)
- [ ] **Plantar MTA**: BP3D FJ2096 grouped all rays — **teaching compromise**, **not** per-ray elemental; no CC0/BY per-ray split source (soft-ceiling memo)
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
- [x] **Lazy layer load progress** (Day 4bg): bilingual overlay when soft layers fetch GLBs (`LayerLoadProgress` + Suspense) — teaching fetch chrome, not clinical workstation
- [x] **Teaching ghost / 透视** (Day 4bm): per-layer opacity + `G` — covering soft tissue can fade so osteology remains readable; **not** clinical X-ray / fluoroscopy
- [x] **Teaching explode / 抽出** (Day 4bn): per-layer +Y peel + `E` — covering layers separate so the sandwich is readable; **not** surgical dissection
- [x] **Teaching quiz stub / 测验** (Day 4bo): hide names/search + `Q` — classroom self-test; **not** Anki / exam

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
- [ ] **Soft-tissue open-data ceiling**: exhaustive search #1–#170 (Day 4cl–4ct Week 2) found **no CC0/BY per-toe DI, lumbricals, per-ray MTA** meshes — **grouped structures are teaching compromises** (教学妥协), **not** elemental atlases (详见 `docs/week2-soft-ceiling-memo.md`)
- [ ] **Per-toe DI**: Open3D grouped DI 1st–4th (BY-SA isolate) — teaching compromise, not per-toe elemental; Zenodo Scan-the-World NC rejected; UMLUB Sketchfab license unclear; no usable source
- [ ] **Lumbricals**: absent (placeholder) — UM excludes intrinsics per readme; Visible Korean NC-ND; AnatomyTOOL Open3DModel SA-only (confirms 4 lumbricals present but SA); no CC0/BY source
- [ ] **Per-ray MTA**: grouped only (dorsal MTA Open3D BY-SA all rays; plantar MTA BP3D FJ2096 all rays) — teaching compromise, not per-ray elemental; TotalSegmentator lacks named foot vessels; ISA lacks per-ray MTA elementals; no CC0/BY source
- [ ] **Gastroc/soleus bellies**: absent — Andreassen CC BY 4.0 spatial QA fail (7-tarsal Kabsch mean ≈4.5 mm residual; bellies wrongly lateralized); Henson CC0 DICOM alignment sketch fail; no aligned source
- [ ] **BY-SA weight**: nerves 100% SA (17/17); ligaments 93% SA (27/29); vessels 76% SA (22/29); muscles 22% SA (5/23 unique) — **71/124 unique total** under BY-SA isolate
- [ ] **Ontology**: 3 honest empties (cervical TC; med/lat plantar veins TNA-only); map sparse by design (126/129 citable) — **not** TA2-complete soft tissue
- [ ] **Residuals**: Kabsch teaching-grade only — Open3D→BP3D mean ≈**2.61 mm** (max ≈**4.41 mm** MT1); UM→BP3D mean ≈**2.22 mm** (max ≈**4.38 mm** talus); ZA→BP3D mean ≈**1.81 mm** (max ≈**3.52 mm** calcaneus) — **not** surgical registration bounds (see `third_party/*/kabsch_*.json` per-landmark residuals; `docs/methods.md` limitations table)

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
- [ ] **Grouped structures are teaching compromises** (DI 1st–4th combined, dorsal/plantar MTA all rays), **not** per-toe/per-ray elemental atlases — soft-ceiling documented (`docs/week2-soft-ceiling-memo.md`)
- [ ] Methods **journal-facing limitations** table current (Day 4cv: soft-tissue open-data ceiling row + per-landmark Kabsch residuals + license mix + grouped vessels/muscles + BY-SA share + NC rejects + no clinical claim + ontology partial)
- [ ] Methods **license matrix** present (Day 4cv: 6-row × 3-col table — main tree 53/124 CC BY/CC0 vs BY-SA isolate 71/124 vs rejected with NC/unclear/spatial-QA-fail rationale)

### Appropriate audiences
- [ ] Medical students, anatomy instructors, foot/ankle residents, PT education

### Inappropriate claims (fail if asserted)
- [ ] TA2-complete soft tissue (only 126/129 ontology citable; lumbricals placeholder; per-toe DI/per-ray MTA teaching compromises)
- [ ] Surgical registration / gold-standard reference (Kabsch residuals teaching-grade only; max 4.41 mm MT1 Open3D→BP3D)
- [ ] Finished-product / publication-ready soft atlas (teaching atlas **in progress**; soft-ceiling documented)
- [ ] Per-toe DI / lumbricals / per-ray MTA as elemental (grouped structures are teaching compromises; soft-ceiling memo documents no CC0/BY source)

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
- [ ] Invented ontology IDs; per-ray MTA or per-toe DI elemental claims (grouped structures must be labeled teaching compromises); TA2-complete soft tissue claims; finished-product language
- [ ] Soft-ceiling / teaching compromises undocumented; NC sources integrated without soft-ceiling memo reject rationale; license matrix missing from methods.md

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

**Checklist Version**: 3.0 (2026-09-22 Day 4cw / Week 2 Phase 8 EXPERT REVIEW PREP)  
**Supersedes**: 2.0 (Day 4ax/4be/4bf ontology honest-empty + grouped label polish); 1.0 (outdated 38/43 framing)  
**Atlas pointer**: Week 2 Day 4cw / Phase 8 — teaching atlas **in progress**; **not** clinical; **not** TA2-complete; **no finished-product claim**  
**Key Week 2 updates**: methods.md limitations table + license matrix (Day 4cv); soft-ceiling memo (digs #1–#170; teaching compromises stance); grouped DI/MTA teaching compromise explicit labels; per-landmark Kabsch residuals max values; NC rejects documented (Zenodo Scan-the-World, Visible Korean, BoneHub)
