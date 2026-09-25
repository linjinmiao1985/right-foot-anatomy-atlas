# Week Sprint Plan — Right Foot Anatomy Atlas Quality Project

**Start**: 2026-09-14 (Day 1)  
**Duration**: 7 days  
**Goal**: Deep work on asset integration, license verification, real content maximization

**Owner Directive**: This is a **week-long quality project**, not same-day delivery. Prefer deep work over shallow docs. No premature "delivered/finished" claims.

---

## Current Status (Day 2, Complete)

### Day 1 Completed
- ✅ Asset Research Round 2 (docs/assets-research-round2.md, ≥12 sources)
- ✅ BP3D soft tissue breakthrough (15 muscles + 3 vessels extracted, NOT bones-only!)
- ✅ **Key finding**: Universiti Malaya CC0 dataset (42 muscles, intrinsics confirmed)
- ✅ Phase 4 error corrected (BP3D DOES have soft tissue, UM for gaps)

### Day 2 Completed (UM Hybrid Integration)
- ✅ **Dataverse API success**: Downloaded UM STL ZIP (58.3MB, file ID 596, 6.5s)
- ✅ **42-muscle inventory**: Listed all foot muscles (5 intrinsics: QP, EDB, AH, ADM, FDB)
- ✅ **Quality comparison**: UM 2.4-8.7x resolution vs BP3D (data-driven decision)
- ✅ **Hybrid strategy**: 17 real muscles (BP3D 12 + UM 5, quality-optimized)
- ✅ **Vessel expansion**: Added plantar arch (4/6 vessels, 67% coverage)
- ✅ **Integration**: FootModel + manifest v2.1.0, tests green (build PASS, vitest 7/7)

### Atlas Status Now (Day 2)
- **Bones**: 14/14 (100%, BP3D CC BY 4.0)
- **Muscles**: 17/~20 (85%, BP3D 12 + UM 5, hybrid)
- **Vessels**: 4/6 (67%, BP3D)
- **Nerves**: 0/6 (0%, Open3DModel BY-SA Day 4-5)

### Key Decisions
1. **Hybrid over Uniform**: UM quality advantage (2.4-8.7x) justifies dual-source strategy
2. **Completeness**: BP3D 12 unique muscles + UM 5 (3 quality upgrades, 2 gaps) = 17 total
3. **Week Pacing**: Deep integration (API + analysis + hybrid) > shallow browser workaround

---

## Week Plan (Days 2-7)

### Day 2 (Tue): UM Download + Inventory
**Focus**: Complete UM muscle acquisition + catalog

**Tasks**:
1. ✅ Download UM `Final Model STL files.zip` (scripted or manual browser download)
2. ✅ Extract ZIP → list all 42 muscle STL filenames
3. ✅ Identify foot-relevant muscles:
   - Extrinsics: tibialis ant/post, flex/ext digitorum/hallucis longus, peroneus, gastrocnemius, soleus, plantaris
   - **Intrinsics**: abductor hallucis, flexor hallucis brevis, adductor hallucis, abductor/flexor digiti minimi, quadratus plantae, lumbricals (4), interossei (7), ext hallucis/digitorum brevis
4. ✅ Document inventory in `assets-raw/um-asian-male/UM_MUSCLE_INVENTORY.md`
5. ✅ Assess laterality (right vs left) and file naming conventions

**Deliverable**: Complete muscle inventory + mapping table (UM filename → structures.json ID)

**Blocker Contingency**: If UM download blocked, move to Z-Anatomy cloning + inventory

---

### Day 3 (Wed): UM Conversion + Integration (Batch 1)
**Focus**: Convert + wire first 5 intrinsic muscles

**Tasks**:
1. ✅ Convert 5 intrinsic muscle STL → GLB (optimize for web, target <2MB each)
   - Prioritize: abductor hallucis, flexor hallucis brevis, adductor hallucis, quadratus plantae, lumbricals group
2. ✅ Place GLB in `public/models/right-foot/muscles/`
3. ✅ Update `structures.json`: Set `placeholder: false` for converted muscles
4. ✅ Update `public/models/right-foot/manifest.json` with UM CC0 attribution
5. ✅ Wire into `FootModel.tsx`:
   - Extend `REAL_MUSCLE_MODELS` constant
   - Create `RealMuscleModel` component (similar to `RealBoneModel`)
   - Handle scale/position (UM likely in different unit/orientation than BodyParts3D)

**Deliverable**: 5 real intrinsic muscles rendering in viewer + tests green

**Success Metric**: Layer toggle → muscle layer shows 5 real meshes + 9 schematic

---

### Day 4 (Thu): ✅ COMPLETED — Z-Anatomy Evaluation + Data Integrity
**Focus**: Evaluate Z-Anatomy for nerves/vessels; fix structures.json placeholder inconsistencies

**Actual Tasks**:
1. ✅ Cloned Z-Anatomy repo (CC BY-SA 4.0) → documented Blender-internal blocker
2. ✅ Evaluated nerve/vessel extraction cost (requires Blender 3.x, ~800MB + manual UI)
3. ✅ Fixed `structures.json` placeholder flags:
   - Extrinsic muscles (tibialis_posterior, FDL, FHL): `false → true` (no real meshes)
   - Dorsal interossei: `false → true` (BP3D/UM both lack)
4. ✅ Updated `assets-research-round2.md`:
   - Summary Table aligned with reality (17 muscles, 5 vessels, 0 nerves)
   - Added "Current Integration Status" section (29/35 structures, 83% real)
5. ✅ Updated `.gitignore` to exclude Z-Anatomy source files (206MB)
6. ✅ All tests + build green; pushed to PR #1

**Deliverable**: Z-Anatomy evaluated + documented; data integrity restored

**Success Metric**: ✅ structures.json placeholder flags = FootModel.tsx reality (10/11 intrinsic muscles real)

---

### Day 5 (Fri): Polish + Documentation
**Focus**: Product quality improvements, documentation completeness

**Tasks**:
1. ⏳ Optional: Attempt remaining BP3D vessel extraction (deep plantar arch digital branches if BP codes exist)
2. ⏳ Update `docs/methods.md` with nerve layer limitation disclosure
3. ⏳ Final quality pass on schematic nerve rendering (emissive yellow, thin cylinders)
4. ⏳ Camera/lighting refinements (if needed)
5. ⏳ README screenshots update (if product visuals improved)
6. ⏳ Verify all tests green; push to PR #1

**Deliverable**: Teaching product ready for end-of-week review

**Nerve/Vessel Strategy Locked**: Keep improved schematic nerves (honest 占位); BP3D vessels (5/6, 83%); Open3D/Z-Anatomy deferred due to blockers

---

### Day 6 (Sat): ✅ COMPLETED — README Factual Rewrite + Interaction QA
**Focus**: Remove hype, factual coverage table, interaction quality checks

**Actual Tasks**:
1. ✅ Fixed `structures.json` vessel placeholder flags (5/9 real, 4 placeholder)
2. ✅ Searched BP3D for digital vessel branches (not found, lacking BP codes)
3. ✅ Rewrote README: removed "world's first" / "98% complete" hype
   - Added factual coverage table (88% real: 38/43 structures)
   - Added license map (MIT / CC BY / CC0 / BY-SA isolated)
   - Removed celebration language, focused on limitations
4. ✅ Updated `manifest.json` stats (factual: 13/14 muscles, 5/9 vessels)
5. ✅ Created `docs/interaction-qa.md` (layer toggles, BY-SA badge, thin nerve selection)
6. ✅ All tests + build green

**Deliverable**: Honest README + interaction quality documented

**Success Metric**: ✅ Factual tone, no marketing, gaps disclosed

---

### Day 7 (Sun): Polish + Expert Review Prep
**Focus**: Final documentation, expert review checklist, methods.md for teaching/journal track

**Tasks**:
1. ⏳ Expert review checklist:
   - TA2 nomenclature correctness (spot-check 10 random structures)
   - Chinese terminology alignment with PRC standards
   - Anatomical accuracy (bone articulations, muscle origins/insertions)
   - Summary quality (clinical relevance, no copy-paste filler)
2. ⏳ `docs/methods.md` polish:
   - Data provenance (BP3D R4, UM doi, Z-Anatomy commit SHA)
   - Extraction methodology (Blender Python API, trimesh STL→GLB)
   - Limitations (teaching-grade vs patient-specific, BY-SA boundary)
   - Reproducibility (scripts in `assets-raw/`, git history)
3. ⏳ Optional screenshot pack (if browser testing available):
   - Default view (all layers)
   - Bone layer only
   - Muscle layer only (highlight intrinsics)
   - Nerve layer only (BY-SA badge visible)
   - Selection panel demo (structure info)
4. ⏳ Update `docs/daily-log.md` Day 6-7
5. ⏳ Push PR; tests green

**Deliverable**: Teaching-grade atlas ready for peer review

**Success Metric**: Expert can verify TA2 + anatomy quality without code inspection

**NOT "shipped finished"**: Still teaching-grade, not journal-published
**Focus**: Either integrate nerves/vessels OR improve viewer experience

**Option A** (if Z-Anatomy BY-SA acceptable):
1. ✅ Extract Z-Anatomy nerve curves (foot-relevant: tibial → plantar branches)
2. ✅ Convert curves → tube meshes (TubeGeometry in three.js)
3. ✅ Place in `public/models/by-sa/` (isolated directory)
4. ✅ Update structures.json + manifest (mark BY-SA taint)
5. ✅ Wire into FootModel (conditional BY-SA vs schematic)
6. ✅ Document SA-taint risk in README + NOTICE

**Option B** (if BY-SA rejected):
1. ✅ Enhance schematic nerve rendering (anatomically informed Bezier paths)
2. ✅ Enhance schematic vessel rendering (arterial branching patterns)
3. ✅ Improve camera framing (multiple preset views: dorsal, plantar, medial, lateral)
4. ✅ Add structure search/filter UI
5. ✅ Performance optimization (LOD, frustum culling)

**Deliverable**: Either 6/6 real nerves + 6/6 real vessels OR polished schematic + UX

---

### Day 7 (Sun): Documentation + Self-Review
**Focus**: Comprehensive documentation, honest assessment, week summary

**Tasks**:
1. ✅ Update `docs/methods.md`:
   - UM CC0 provenance (citation, DOI, file list)
   - STL → GLB conversion pipeline
   - Scale/orientation handling
   - BY-SA isolation strategy (if applicable)
2. ✅ Update `README.md`:
   - Remove "teaching-grade product delivered" language
   - Replace with "Week 1 progress: 14 real bones + X real muscles integrated"
   - Honest status: "In-progress quality project, targeting journal-grade muscle layer"
3. ✅ Write `docs/week-1-review.md`:
   - What was integrated (bones, muscles, nerves?, vessels?)
   - What remains schematic
   - Gaps identified (e.g., sesamoids, ligaments, joint markers)
   - Quality assessment (anatomical accuracy, nomenclature, citations)
   - Next week priorities
4. ✅ Update PR #1 description (progress update, not "complete")
5. ✅ Push all changes

**Deliverable**: Honest week-1 summary + clear week-2 roadmap

**No**: "Delivered", "Complete", "Ready for use", "Teaching-grade product"

**Yes**: "Week 1 progress", "In development", "Targeting journal-grade", "Gaps remain"

---

## Hard Problems to Solve (This Week)

### P0: UM Muscle Integration
- **Challenge**: 42 muscles in single STL ZIP, unclear naming, laterality, scale/orientation
- **Approach**: Systematic inventory → batch conversion → incremental wiring → test each batch
- **Success**: 14/14 foot muscles real (11 intrinsics + 3 extrinsics)

### P1: License Verification
- **Challenge**: Zenodo/SPARC custom licenses, Z-Anatomy BY-SA taint, Visible Korean agreements
- **Approach**: Manual verification from official sources, document exact license terms
- **Success**: ≥10 sources with verified licenses, clear adopt/isolate/reject verdicts

### P2: BY-SA Taint Decision
- **Challenge**: Z-Anatomy nerves/vessels attractive but trigger ShareAlike
- **Approach**: Isolate in by-sa/ directory, document taint boundary, assess risk vs benefit
- **Success**: Clear policy documented, either integrated (isolated) or rejected (keep schematic)

### P3: Scale/Orientation Handling
- **Challenge**: UM meshes likely different scale/orientation than BodyParts3D bones
- **Approach**: Load sample muscle, measure bounding box, compare to known anatomy, apply correction
- **Success**: Muscles + bones aligned correctly in viewer

---

## Metrics (Week 1 Target)

### Real Content
- Bones: 14/14 (100%) ✅ (already integrated)
- **Muscles: 0/14 → 14/14 (100%)** 🎯 PRIMARY GOAL
- Nerves: 0/6 → 0-6/6 (0-100%) ⚠️ (depends on BY-SA decision)
- Vessels: 0/6 → 0-6/6 (0-100%) ⚠️ (depends on BY-SA decision)

**Week 1 Goal**: **28-34/40 structures real (70-85%)**

### Documentation
- Asset research: 3-4 sources (Phase 4) → **≥10 sources verified** (Round 2)
- Methods: BodyParts3D only → **BodyParts3D + UM CC0 + (Z-Anatomy BY-SA?)** provenance
- Honest assessment: "Teaching-grade" premature → **"Week 1 in-progress, targeting journal-grade"**

### Build Quality
- Tests: 7/7 pass → maintain 100%
- Build: <1.1MB → maintain (optimize GLB sizes)
- Performance: Smooth 60fps → verify with 28-34 real meshes

---

## Blocker Contingencies

### If UM Download Blocked (Day 2)
- **Plan B**: Focus on Z-Anatomy (clone repo, inventory, assess BY-SA taint)
- **Plan C**: Deep-dive Zenodo datasets (verify licenses, download if CC0/CC BY)
- **Plan D**: Enhance schematic rendering to "teaching-grade-plus" (anatomically informed)

### If Z-Anatomy BY-SA Rejected (Day 6)
- **Plan B**: Keep improved schematic for nerves/vessels
- **Plan C**: Continue asset search (SPARC, NIH 3D, institutional repos)
- **Plan D**: Commission artist for nerves/vessels (document cost/timeline)

### If Tests Fail (Any Day)
- **Priority**: Fix tests before continuing integration
- **Approach**: Isolate failing component, add unit tests, verify fix
- **No**: Commit broken tests with "TODO: fix later"

---

## Daily Check-In Questions

At end of each day, answer:
1. What **one hard problem** made durable progress today?
2. What is blocked? (Be specific: file missing, license unclear, download failed)
3. What is the **concrete next action** for tomorrow morning?
4. Is the PR up to date with today's work?
5. Are tests green?

---

## Week-End Success Criteria

**Minimum (Week 1)**:
- ✅ 14/14 muscles real (100%)
- ✅ ≥10 sources verified in asset-research
- ✅ Tests green
- ✅ Honest documentation (no premature "complete" claims)

**Stretch (Week 1)**:
- ✅ 6/6 nerves real (Z-Anatomy curves → tubes, BY-SA isolated)
- ✅ 6/6 vessels real (Z-Anatomy curves → tubes, BY-SA isolated)
- ✅ Sesamoid bones added (hallux medial/lateral, if BodyParts3D contains)

**Not This Week**:
- ❌ "Delivered"
- ❌ "Teaching-grade product ready"
- ❌ "Journal-ready"
- ❌ Mark PR as "Complete"

**This Week**:
- ✅ "Week 1 progress"
- ✅ "In development"
- ✅ "Targeting journal-grade muscle layer"
- ✅ "Gaps remain (document specifics)"

---

## Pause Points

When ending a run, update:
1. This `docs/week-plan.md` → mark completed tasks, update blockers
2. `docs/daily-log.md` → brief entry (what was done, what's next)
3. PR description → progress update
4. Tests → must be green before pausing

**No**: Write "DELIVERED" or "FINAL" files  
**Yes**: Write progress notes + concrete next steps

---

**Current Status**: Week 2 Day 4g complete on branch (osteology 26/26 + honest grouped vessels)  
**Week 2 Outcome So Far**: **57/60 real (95%)** in `structures.json`; unique-structure framing ≈52/55 (95%). Placeholders: dorsal interossei + posterior tibial + fibular.  
**Week 2 Remaining Focus**:
1. TA2 + Chinese 踇/拇 consistency spot-check (P1 QA)
2. Substantive Week 2 self-review (no delivery claims)
3. Optional: schematic dorsal interossei teaching-quality improvement (still no legal real mesh)
4. Monitor new datasets: Zenodo 2026-Q4, SPARC updates, Visible Korean license changes

**Dorsal Interossei Status**: ❌ **BLOCKED** — All legal sources exhausted (NC / proprietary / absent). Placeholder remains.

**Vessel Digital/Metatarsal Branches Status**: ✅ **HONEST GROUPED** — BP3D FJ2072/BP6049 → `dorsal_digital_arteries.glb`; FJ2096/BP6060 → `plantar_metatarsal_arteries_grouped.glb`. Labeled （组合）/combined; not claimed as per-toe splits. Remaining vessel gaps: posterior tibial + fibular (proximal).

**NOT claiming**: "Finished product", "Journal-ready", "100% coverage possible"  
**Accurate status**: "Week 1-2 quality sprint: ~95% real coverage; DI blocked by licensing; 2 proximal vessels out of foot-proper scope"



---

## Day 4bl note (2026-09-21)

Cloud Agent still usage-blocked; local soft dig **#84–#89** — soft gaps (DI / per-ray MTA / nerve·ligament CC0/BY) **still dry**; **0** mesh wire. Census freeze unchanged (**129/124**). Next: keep mining CC0/BY; resume Cloud Agent when on-demand usage enabled; do **not** force-wire Andreassen/Henson/ScanTW-NC. **No finished-product claim.**

## Day 4bm note (2026-09-21)

Cloud Agent **resumed**. Teaching ghost / 透视 UX (`G`) + digs **#90–#94**. Soft gaps **still dry**; **0** mesh wire. Census freeze unchanged (**129/124**). Next: keep mining CC0/BY; do **not** force-wire Andreassen/Henson/ScanTW-NC. **No finished-product claim.**

## Day 4bn note (2026-09-21)

Teaching explode / 抽出 UX (`E`) + digs **#95–#99**. Soft gaps **still dry**; **0** mesh wire. Census freeze unchanged (**129/124**). Next: keep mining CC0/BY; do **not** force-wire Andreassen/Henson/ScanTW-NC. **No finished-product claim.**

## Day 4bo note (2026-09-22)

Teaching quiz stub / 测验 UX (`Q`) + digs **#100–#107**. Soft gaps **still dry**; **0** mesh wire. Census freeze unchanged (**129/124**). Next: keep mining CC0/BY; do **not** force-wire Andreassen/Henson/ScanTW-NC. Teaching atlas in progress — **not** clinical; **not** TA2-complete; **no finished-product claim.**
