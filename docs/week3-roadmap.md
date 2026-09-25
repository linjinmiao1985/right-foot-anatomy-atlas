# Week 3 Roadmap — Quality & Soft-Ceiling Honesty (2026-09-23)

**Phase 8 · Day 4dk · Branch**: `cursor/week2-day4bm-ghost-opacity-096e` (PR #3)  
**Census**: 129/124 entries/unique; 126/129 ontology citable; 53 main-tree / 71 BY-SA; 134 GLB on-disk  
**Soft digs**: #147–#178 (32 digs Day 4cl–4dk); **0** new CC0/BY soft meshes integrated  
**Week 2 journal pack**: **READY** (methods Table 1 + checklist v3.0 + captions Figs 1–7 + 12 screenshots)

---

## 1. Soft-Ceiling Honesty: What Remains Blocked and Why

### A) Per-toe dorsal interossei (DI 1st–4th)
**Status**: **grouped** as teaching compromise (Open3D BY-SA isolate; all 4 toes combined mesh)  
**Blocking**: Exhaustive CC0/BY search (digs #1–#178) found **no per-toe DI elementals**  
- Open3DModel/AnatomyTOOL: BY-SA grouped (excluded per Week 2 SA ceiling stance)
- Zenodo Scan-the-World: NC+SA (rejected dig #161b Day 4cq)
- UMLUB Sketchfab: license unclear (dig #126)
- MRI segmentation research (dig #177 Day 4dk): papers confirm per-toe DI segmentation challenging even with 7-Tesla MRI; often segmented as groups

**Why blocking**: No CC0/BY source meshes for per-toe DI found after 32 digs (2+ weeks watch); grouped mesh is honest teaching compromise

### B) Lumbricals (absent placeholder)
**Status**: **absent** (UM excludes intrinsics per readme; no CC0/BY alternative found)  
**Blocking**: Exhaustive CC0/BY search (digs #1–#178) found **no lumbrical meshes**  
- UM Asian Male LE: excludes intrinsics per dataset readme
- Visible Korean: NC-ND (rejected)
- AnatomyTOOL/Open3DModel: BY-SA (excluded per Week 2 SA ceiling)
- MRI research (dig #177): lumbricals often grouped with interossei due to segmentation challenge

**Why blocking**: No CC0/BY lumbrical mesh source found; current project excludes NC/SA to maintain MIT+BY/CC0 main-tree compatibility

### C) Per-ray metatarsal arteries (dorsal/plantar MTA)
**Status**: **grouped** as teaching compromises (dorsal MTA all rays Open3D BY-SA isolate; plantar MTA all rays BP3D FJ2096 CC BY)  
**Blocking**: Exhaustive CC0/BY search (digs #1–#178) found **no per-ray MTA elementals**  
- Open3DModel: BY-SA grouped dorsal MTA (excluded per Week 2 SA ceiling)
- TotalSegmentator: lacks foot vascular segmentation (dig #149)
- ISA/3D Slicer atlas: lacks per-ray MTA (dig #152)
- BP3D FJ2096: plantar MTA all rays grouped (best available CC BY option)

**Why blocking**: No CC0/BY per-ray MTA source meshes found; grouped meshes are teaching compromises acknowledging open-data ceiling

### D) Gastroc/soleus bellies (calf muscles)
**Status**: **absent** (no aligned source found)  
**Blocking**: Spatial QA failures  
- Andreassen Visible Human (dig #178 Day 4dk / Day 4ay/4az deep-check): **CC BY 4.0** BUT 7-tarsal Kabsch mean ≈4.5 mm spatial QA FAIL; gastroc medial/lateral verts all X>0 (wrong side); Achilles distal10 residuals ≥15 mm; foot alignment compromised by calf leverage; **rejected** per spatial QA fail
- Henson Sheffield "Aug_8" LE single-subject: similar alignment issues (dig #130 Day 4bp)
- UM Asian Male: excludes gastroc/soleus (only foot + ankle muscles)

**Why blocking**: Only CC BY source (Andreassen) fails spatial QA; no alternative CC0/BY gastroc/soleus in BP3D-compatible foot frame found

### E) Elemental foot nerves (per-ray digital nerves)
**Status**: **grouped** (ZA 6 trunks + Open3D 11 fine/cutaneous; all BY-SA isolate)  
**Blocking**: Exhaustive CC0/BY search found **no nerve meshes**  
- Z-Anatomy: BY-SA (excluded per Week 2 SA ceiling)
- Open3DModel: BY-SA (excluded)
- No CC0/BY nerve mesh sources found (digs #1–#178)
- Andreassen Visible Human (dig #178): **no nerves** in 260-geometry inventory (muscles/bones/cartilage/ligaments only)

**Why blocking**: 100% nerve census is BY-SA isolate (17/17 unique); no CC0/BY nerve alternatives found

### F) Elemental foot intrinsic ligaments (Lisfranc intermetatarsal, plantar plate, collaterals)
**Status**: **partial** (Open3D BY-SA isolate has ankle retinacula + ATFL/CFL/spring/plantar; missing toe-level elementals)  
**Blocking**: Limited open-data inventory  
- Open3DModel: BY-SA ankle bands (excluded per Week 2 SA ceiling)
- BP3D: long plantar + Achilles tendon (CC BY; main-tree)
- Andreassen Visible Human (dig #178): ligament inventory is **hip/knee/ankle** (ACL/PCL/MCL/LCL, talofibular, tibiofibular, calcaneofibular) — **NOT foot intrinsic ligaments** (no Lisfranc, no plantar plate, no toe collaterals)

**Why blocking**: Ankle-level ligaments available (BY-SA isolate); toe-level elementals (Lisfranc, plantar plate) not found in any CC0/BY source

---

## 2. Quality Targets (Do NOT Depend on New Soft Meshes)

### A) Teaching UX polish leftovers
**Status**: Ghost/explode/quiz/gap-notes/reduced-motion/focus-visible shipped Week 2  
**Remaining**:
- Optional: keyboard help overlay sync with teaching-compromise wording (already correct; skip redundant polish)
- Optional: quiz mode badge/footer wording final review (already aligned Day 4ct "teaching compromise"; skip unless new clarity needed)
- Optional: empty-state bilingual tips for soft-layer gaps (StructurePanel already has honest meshNote + gap notes; skip unless user requests)

**Priority**: **SKIP** unless specific clarity gap identified — avoid busywork polish

### B) Terminology/ontology empties polish
**Status**: **126/129** citable; **3 honest empties** (cervical TC / medial+lateral plantar veins) with bilingual UI reasons  
**Remaining**:
- Cross-check FMA/TA2 cites against latest OpenAnatomy TA2 Viewer (openanatomy.org) for any post-Day-4cz updates — **SKIP** unless reviewer flags specific ID errors
- Optional: TerminologyHub API cross-reference for 3 honest empties — **RESEARCH ONLY** (not a blocker; current TNA-only / no-distinct-TA98-A-code reasons are defensible)

**Priority**: **LOW** — 3 honest empties already documented with clear reasons; TA2 Viewer cross-check OK if time permits but not Week 3 gate

### C) Journal figure honesty completeness
**Status**: Week 2 journal pack **READY** (methods Table 1 + checklist v3.0 + captions Figs 1–7 + 12 screenshots)  
**Remaining**:
- Verify all cross-links intact (Table 1 ↔ Fig7 caption; methods.md ↔ README; checklist v3.0 ↔ phase-8-self-review) — **ONE-PASS CHECK** Day 4dk gates
- Optional: demo video (2–3 min teaching modes: ghost/explode/quiz/layers) if missing — **SKIP** unless PR reviewer requests; 12 static screenshots already document teaching modes

**Priority**: **VERIFY** cross-links intact; **SKIP** demo video unless requested

### D) Expert-review pass readiness
**Status**: `docs/expert-review-checklist.md` v3.0 (Day 4cw) complete  
**Remaining**:
- Dry-run checklist self-audit: do §A–§G items pass/fail? (bones coverage ✓; Kabsch residuals ✓; BY-SA isolation ✓; teaching compromises ✓; ontology gaps ✓; soft-ceiling ✓; clinical/journal disclaimer ✓) — **SELF-AUDIT** Day 4dk or early Week 3
- Address any FAIL items before PR merge

**Priority**: **HIGH** — self-audit checklist §A–§G; fix any FAIL before merge

---

## 3. Optional Research Tracks (Docs/Sandbox Only Until QA Gates)

### A) Belly TPS / two-stage alignment (gastroc/soleus Andreassen rescue)
**Hypothesis**: Andreassen gastroc/soleus spatial QA fail (7-tarsal Kabsch) could be mitigated by:
1. **Two-stage Kabsch**: (a) align foot-only landmarks (7 tarsals); (b) separately align calf landmarks (tibia/fibula distal + gastroc origins) with calf-specific centroid
2. **TPS (Thin Plate Spline)** non-rigid warp: after Kabsch similarity, apply TPS to Achilles insertion → calcaneus to reduce distal residuals

**Why research-only**:
- Andreassen Day 4az trial (foot-only 7-tarsal Kabsch) still produced gastroc wrong-side (all verts X>0); TPS may not fix laterality flip
- Adds complexity (two-stage or TPS warp) vs current single-stage Kabsch similarity for all other sources
- **No integration until QA gates green** (integrity-audit + vitest + build + visual spot-check)

**Action**: Document in `docs/research-tracks/belly-tps-andreassen.md` (create if missing); do **NOT** wire until QA passes

### B) Utah CT-based foot nerves (if license clarifies to CC0/BY)
**Hypothesis**: Utah Open Anatomy Project may have foot CT with nerve segmentation; license currently unclear (dig #164 Day 4cs NIH 3DPX noted unclear license)  
**Why research-only**:
- No confirmed CC0/BY license for Utah foot nerve meshes as of dig #178
- 100% current nerve census is BY-SA isolate (17/17 unique); Utah would need to be CC0/BY to reduce SA share

**Action**: MONITOR Utah Open Anatomy / NIH 3DPX license updates; do **NOT** integrate unless confirmed CC0/BY

### C) Deep learning auto-segmentation watch (MuscleMap consortium / TotalSegmentator v3)
**Hypothesis**: MuscleMap consortium (dig #177 synthesis mention) developing deep learning for intrinsic foot muscle auto-segmentation; TotalSegmentator v3 may add foot soft tissues  
**Why research-only**:
- MuscleMap not yet public as of dig #177 (2026-09-23)
- TotalSegmentator v2 lacks foot vascular/intrinsic segmentation (dig #149 Day 4cl)

**Action**: MONITOR MuscleMap / TotalSegmentator v3 releases; append to learning-log when public + license confirmed

---

## 4. Explicit Non-Goals (Week 3 and Beyond)

### A) No finished-product claim
**Rationale**: Teaching atlas **in progress**; grouped structures are teaching compromises; soft-tissue census has open-data ceiling (digs #1–#178 DRY); 3 honest ontology empties; BY-SA isolate 71/124 unique (57%)  
**Action**: All docs/UI maintain "teaching in progress" stance; **no** "complete" / "finished" / "production-ready" language

### B) No TA2-complete claim
**Rationale**: 126/129 ontology citable (3 honest empties); grouped DI/MTA/nerves lack per-toe/per-ray TA2 granularity  
**Action**: Docs explicitly state "not TA2-complete soft tissue"; UI shows honest-empty reasons

### C) No clinical/surgical claim
**Rationale**: Kabsch residuals are **teaching visualization grade** (2.61 mm mean Open3D→BP3D; 2.22 mm UM→BP3D; 1.81 mm ZA→BP3D) — **not** surgical registration error bounds / implant sizing tolerances / navigation accuracy specs  
**Action**: All docs/UI/journal captions emphasize "teaching only; not clinical diagnosis / treatment planning / surgical navigation"

### D) No SA ceiling backtrack (do NOT pad with BY-SA meshes for census bloat)
**Rationale**: Week 2 SA ceiling stance: prioritize main-tree CC BY/CC0 (53/124 unique 43%) over BY-SA isolate spam; BY-SA already 71/124 unique (57%); adding more BY-SA structures would worsen ShareAlike derivative burden without teaching value  
**Action**: **SKIP** any BY-SA mesh integration unless it fills a clear teaching gap with no CC0/BY alternative AND reviewer explicitly requests it

### E) No force-wire Andreassen/Henson/NC packs
**Rationale**: Andreassen spatial QA fail (gastroc wrong-side); Henson similar alignment issues; NC (Visible Korean, Scan-the-World, BoneHub) incompatible with MIT main-tree  
**Action**: **NEVER** wire Andreassen gastroc/soleus or Henson LE or NC packs; document rejects in learning-log; keep soft-ceiling honesty

---

## 5. Week 3 Gate Criteria (Before PR #3 Merge)

### A) Green gates (required)
1. `python3 scripts/integrity-audit.py`: 0 violations (129 structures / 134 GLBs)
2. `npx vitest run`: 138/138 passed (19 test files)
3. `npm run build`: dist built (1.2 MB chunk size warning OK)

### B) Expert-review checklist self-audit (required)
- Dry-run `docs/expert-review-checklist.md` v3.0 §A–§G: all items PASS or explicitly documented as teaching compromise / open-data ceiling limitation
- Address any FAIL items before merge

### C) Soft-ceiling honesty verification (required)
- `docs/open-anatomy-learning-log.md` up-to-date through dig #178 (Day 4dk)
- `docs/week2-soft-ceiling-memo.md` reflects digs #1–#178 DRY outcomes
- StructurePanel gap notes / meshNote align with learning-log DRY/reject reasons

### D) Journal pack cross-link integrity (required)
- `docs/methods.md` Table 1 ↔ `docs/journal-figure-captions.md` Fig7 caption links intact
- README Documentation § Methods links Table 1
- `docs/expert-review-checklist.md` v3.0 links methods.md + soft-ceiling memo + phase-8-self-review

### E) No regressions (required)
- Census unchanged (129/124 entries/unique; 126/129 ontology; 53 main / 71 BY-SA; 134 GLB)
- No new NC/unclear-license meshes wired
- No Andreassen/Henson force-wires bypassing spatial QA

---

## 6. Week 3 Daily Rhythm (Depth Over Volume)

### Day 4dk (today): Sparse soft watch (#177–#178) + Week 3 roadmap (this doc)
### Days 4dl–4dm: Expert-review checklist §A–§G self-audit + address any FAIL items
### Days 4dn–4do: Journal pack cross-link integrity verification + optional demo video (only if reviewer requests)
### Day 4dp: Week 3 wrap / pre-merge self-review; update phase-8-self-review.md Week 3 section; PR #3 final status

**Soft-tissue posture**: **WATCH ONLY** (at most 1–2 digs per day if time permits; expect DRY; no force-wire until clear CC0/BY hit + spatial QA passes)

---

## 7. Success Criteria (Week 3 End)

1. ✅ Green gates (integrity-audit + vitest + build)
2. ✅ Expert-review checklist v3.0 self-audit complete (all §A–§G items PASS or documented as teaching compromise)
3. ✅ Journal pack cross-links intact (Table 1 / Fig7 / methods / checklist / phase-8 / README)
4. ✅ Soft-ceiling honesty up-to-date (learning-log through dig #178+; week2-memo reflects DRY; StructurePanel gap notes aligned)
5. ✅ No regressions (census 129/124; no NC/unclear wires; no Andreassen/Henson force-wires)
6. ✅ Teaching atlas **in progress** stance maintained (no finished/TA2-complete/clinical claims)

**Bottom line**: Week 3 = **quality + honesty verification** before PR #3 merge. Prefer expert-review readiness over census padding. Depth over volume.

---

**Version**: v1.0 (Day 4dk 2026-09-23)  
**Next review**: Day 4dp (Week 3 wrap)
