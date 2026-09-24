# Week 4 Roadmap — Post–Week-3 Merge Readiness + Continuous Open-Data Watch (2026-09-24)

**Phase 8 · Day 4dq · Branch**: `cursor/week2-day4bm-ghost-opacity-096e` (PR #3)  
**Census**: 129/124 entries/unique; 126/129 ontology citable; 53 main-tree / 71 BY-SA; 134 GLB on-disk  
**Soft digs**: #147–#180 (34 watch digs Day 4cl–4dq); **0** new CC0/BY soft meshes integrated  
**Week 3 end**: teaching-grade MERGE-READY with disclosed gaps (58 PASS / 12 PARTIAL / 0 FAIL; soft-ceiling ALIGNED; 0 broken journal links)

---

## Theme: Teaching Atlas In Progress — Continuous Watch, Quality-First, No Rush

Week 4 focus: maintain **merge-ready teaching-grade** status post–Week-3 verification; continue sparse soft-tissue open-data watch until clear CC0/BY hit + spatial QA; quality work that does NOT depend on new meshes; **no finished-product claim**; **no SA padding**; **no clinical claim**.

---

## 1. Soft-Tissue Posture (WATCH ONLY Until Clear CC0/BY Hit + Spatial QA)

### Current Status (through dig #180 Day 4dq)

**Soft gaps remain DRY** (0 new CC0/BY meshes #147–#180):
- Per-toe DI (dorsal interossei 1st–4th elementals)
- Lumbricals (4 foot lumbricals; structures.json anatomical metadata only; no 3D meshes)
- Per-ray MTA (metatarsal arteries dorsal/plantar per-ray elementals)
- Elemental foot nerves/ligaments main-tree (CC0/BY)
- Gastroc/soleus bellies (Andreassen CC BY 4.0 spatial QA FAIL Day 4ay/4az; no alternatives)

**Teaching compromises stance** (accepted; documented):
- DI 1st–4th grouped (Open3D BY-SA isolate; teaching compromise 教学妥协)
- Dorsal/plantar MTA grouped (teaching compromise; not per-ray elementals)
- Nerves 17/17 BY-SA (100% SA share; Z-Anatomy trunk + Open3D fine/cutaneous)
- Ligaments 27/29 BY-SA (93% SA share; Open3D isolate)

**SA ceiling stance** (Week 2 freeze):
- Do NOT pad with more BY-SA meshes (57% BY-SA share already high; 71/124 unique)
- BY-SA isolate is teaching trade-off accepted over incomplete coverage
- Prefer CC0/BY main-tree replacements if/when they emerge

### Week 4 Soft Posture: WATCH ONLY

**Action**: Sparse watch digs (at most 2–3 NEW digs per week; expect DRY)  
**Targets**:
- MuscleMap consortium foot CVM public release (monitor; MIT software; unclear data license)
- TotalSegmentator foot soft updates (monitor; v2.15.0 Day 4dq has bones only; no intrinsics)
- New 2026 Zenodo/Figshare CC0/BY foot soft deposits (watch; prior #147–#180 all DRY or NC/SA reject)
- Utah foot nerve license clarifications (monitor; NIH 3DPX unclear)
- Academic segmentation dataset releases (e.g. 7T MRI foot intrinsic papers with public mesh archives)

**Explicit non-actions**:
- **NO** force-wire Andreassen (spatial QA FAIL; 7-tarsal Kabsch mean ≈4.5 mm; gastroc wrong-side)
- **NO** force-wire Henson/Sheffield one-subject (spatial fit uncertain; no Kabsch QA run)
- **NO** more BY-SA padding (SA ceiling stance; prefer DRY over SA spam)
- **NO** NC sources (incompatible with MIT atlas; Zenodo Scan-the-World / Visible Korean / BoneHub rejected)
- **NO** unclear licenses (Cults3D / Proko subscription / UMLUB Sketchfab without explicit CC0/BY badge)

**Wire criteria** (must ALL pass before wire):
1. License: CC0 1.0 Universal **OR** CC BY 4.0 (NOT NC; NOT SA; NOT unclear)
2. Content: foot soft tissue (per-toe DI, lumbricals, per-ray MTA, elemental nerves/ligaments, gastroc/soleus)
3. Format: downloadable STL/OBJ/GLB (not raw DICOM / not subscription-only)
4. Spatial QA: Kabsch co-registration vs BP3D green (mean residual <3.5 mm; max residual <5.0 mm; visual check gastroc/Achilles/foot orientation correct)

---

## 2. Optional Research Tracks (Docs/Sandbox ONLY Until QA Gates)

### A) Belly TPS / Two-Stage Kabsch for Andreassen (Research Only)

**Status**: Andreassen Visible Human CC BY 4.0 rejected Day 4ay/4az (7-tarsal Kabsch mean ≈4.5 mm spatial QA FAIL; gastroc medial/lateral verts all X>0 wrong side; Achilles distal10 residuals ≥15 mm)

**Hypothesis**: Gastroc/soleus belly TPS (thin-plate spline) **OR** two-stage Kabsch (calcaneus/talus first stage for foot; then gastroc/soleus second stage for calf leverage) might reduce spatial QA residuals

**Action Week 4**: **DOCS/SANDBOX ONLY** (do NOT wire Andreassen; do NOT run belly TPS production until spatial QA gates green)
- Optional: document TPS/two-stage Kabsch research notes in `docs/research-notes/` (if time permits; not Week 4 gate)
- If belly TPS reduces residuals to <3.5 mm mean + gastroc X<0 correct side + Achilles <10 mm: reassess Andreassen wire candidacy
- Until then: Andreassen remains **REJECT** (spatial QA fail)

**Priority**: **LOW** (prefer sparse soft watch over research sandbox)

### B) Utah Foot Nerve License Clarification (Monitor Only)

**Status**: Utah / NIH 3DPX license unclear (dig #164 Day 4cr: NIH 3DPX bones-only; license unclear)

**Action Week 4**: **MONITOR ONLY** (watch for license clarifications; no wire until CC0/BY confirmed)

**Priority**: **LOW** (expect DRY or license remains unclear)

### C) MuscleMap / Deep Learning Auto-Segmentation Watch

**Status**: MuscleMap foot CVM in development (dig #179 Day 4dq: MIT software license; foot region not released; <30s preliminary segmentation time)

**Action Week 4**: **MONITOR ONLY** (watch MuscleMap GitHub releases; track whether future foot dataset has CC0/BY data license)

**Priority**: **LOW** (future possibility; no immediate wire candidate)

---

## 3. Quality Work (Does NOT Depend on New Meshes)

### A) Dig-Range Honesty Sync (HIGH Priority Day 4dq)

**Status**: Day 4dn soft-ceiling verify noted acceptable lags; Day 4dq synced:
- ✅ `docs/methods.md` #1–#175 → **#1–#178** (3-dig lag closed)
- ✅ `README.md` Limitations #1–#170 → **#1–#178** (8-dig lag closed)
- ✅ `docs/week2-soft-ceiling-memo.md` added post–Week 2 sparse watch update (#171–#180)

**Action**: Keep dig ranges synced as sparse watch continues (update methods.md / README / soft-ceiling-memo after each sparse dig batch)

**Priority**: **HIGH** (honesty maintenance)

### B) PR #3 Body Refresh (HIGH Priority Day 4dq)

**Status**: PR #3 body needs Week 3 wrap + Day 4dq start update

**Action Day 4dq**: Refresh PR #3 description:
- Week 3 wrap status: MERGE-READY teaching-grade with disclosed gaps
- Teaching-grade pass bar: 58 PASS / 12 PARTIAL / 0 FAIL
- Soft-ceiling ALIGNED (7 dimensions verified Day 4dn)
- Journal cross-links: 0 broken links
- Soft digs: watch-only through #180 (0 new meshes)
- Census: 129/124 unchanged
- Link: week3-expert-self-audit.md, week3-soft-ceiling-verify.md, week3-roadmap.md, week4-roadmap.md
- Honesty banners: teaching in progress; NOT finished/clinical/TA2-complete

**Priority**: **HIGH** (PR communication)

### C) Optional Demo Video (ONLY If Reviewer Requests)

**Status**: 12 static teaching screenshots already document UX (ghost/explode/quiz/layers/BY-SA-isolate/gap-notes)

**Action Week 4**: **SKIP** unless PR reviewer explicitly requests demo video
- Optional: 2–3 min screen recording (bones → layers → ghost → explode → quiz) if requested
- Priority: **LOW** (12 screenshots sufficient for Week 3 journal pack; video = nice-to-have not gate)

### D) Optional Reviewer-Facing Merge Note (Do NOT Merge Self)

**Action**: Do **NOT** merge PR #3 yourself; do **NOT** mark PR ready-for-review unless already draft policy says so — leave draft as-is

**Status**: PR #3 remains **draft** (teaching-grade MERGE-READY if reviewers accept disclosed gaps)

**Merge decision**: External reviewer decides whether to:
- Merge to base if disclosed gaps accepted (lumbricals absent; DI/MTA grouped; nerves/ligaments/vessels teaching sets incomplete)
- Request additional polish (demo video; more screenshots; belly TPS Andreassen retry)
- Identify defects for correction (Week 3 verification found 0 defects)

**Bottom line**: PR #3 is **merge-ready for teaching-grade** — wait for external review; do NOT merge yourself

---

## 4. Explicit Non-Goals (Week 4 and Beyond)

### A) No Finished-Product Claim

- Teaching atlas **in progress** (not finished; not journal-published; not peer-reviewed soft atlas)
- Grouped structures (DI/MTA) are **teaching compromises** (教学妥协), not per-toe/per-ray elemental atlases
- Soft gaps (lumbricals absent; gastroc/soleus absent) are **disclosed** (not silently ignored; not claimed complete)

### B) No TA2-Complete Claim

- Ontology: 126/129 citable (3 honest empties: cervical TC, medial/lateral plantar veins — TNA-only)
- Myology: teaching-useful incomplete (lumbricals absent; DI grouped; nerves/vessels teaching sets)
- **NOT** a complete TA2 soft tissue atlas

### C) No Clinical / Surgical Claim

- Teaching anatomy education (named structures, layers, classroom cutaways, ghost/explode/quiz teaching modes)
- **NOT** for diagnosis, treatment planning, interventional guidance, or patient-specific modeling
- Kabsch residuals = teaching visualization grade (NOT surgical registration error bounds)

### D) No SA Ceiling Backtrack

- Do **NOT** pad with more BY-SA meshes (57% BY-SA share already high; 71/124 unique)
- Week 2 SA ceiling stance: prefer CC0/BY replacements; accept DRY over SA spam
- BY-SA isolate is teaching trade-off (ShareAlike applies to derivatives; MIT+BY/CC0 preferred)

### E) No Force-Wire Andreassen / Henson / NC Packs

- Andreassen: spatial QA FAIL (7-tarsal Kabsch mean ≈4.5 mm; gastroc wrong-side) — **REJECT** until TPS/two-stage reduces residuals
- Henson/Sheffield: spatial fit uncertain (no Kabsch QA run; one-subject MC POC) — **MONITOR** (not wire without QA)
- NC sources: incompatible with MIT atlas (Zenodo Scan-the-World NC+SA; Visible Korean NC-ND; BoneHub NC-SA) — **REJECT**

---

## 5. Week 4 Success Criteria (Honest, Measurable)

### Teaching-Grade MERGE-READY Status Maintained

- Expert-review checklist v3.0 self-audit: 58 PASS / 12 PARTIAL / 0 FAIL (stable)
- Journal pack cross-links: 0 broken links (maintained)
- Soft-ceiling honesty: ALIGNED (digs through current; no invented assets)
- License boundaries: correct (NC rejected; BY-SA isolated; main-tree MIT+BY/CC0)
- Clinical disclaimers: present (teaching atlas in progress; NOT clinical/surgical/TA2-complete)

### Sparse Soft Watch (Expect DRY; No Force-Wire)

- At most 4–6 NEW digs Week 4 (2–3 digs every 2–3 days; watch MuscleMap/TotalSegmentator/Zenodo/academic releases)
- Expect DRY (per-toe DI / lumbricals / per-ray MTA / elemental nerves/ligaments CC0/BY remain unavailable)
- Wire ONLY if: (1) CC0/BY license; (2) foot soft content; (3) downloadable mesh; (4) Kabsch QA green

### Dig-Range Honesty Current

- Keep `docs/methods.md`, `README.md`, `docs/week2-soft-ceiling-memo.md` dig ranges synced after each sparse dig batch
- No invented mesh finds; no stale #170/#175 refs after Day 4dq sync

### Census Stable (129/124)

- Census unchanged unless **real** CC0/BY mesh wires (unlikely Week 4)
- No placeholder spam; no SA padding; no NC force-wire

### Gates Green Throughout

- `python3 scripts/integrity-audit.py`: 0 violations
- `npx vitest run`: 138/138 passed
- `npm run build`: success (1.2 MB chunk size warning expected)

### PR #3 Body Current

- Week 3 wrap + Day 4dq start reflected in PR description
- MERGE-READY teaching-grade status communicated
- Honesty banners present (teaching in progress; NOT finished/clinical/TA2-complete)

---

## 6. Week 4 Daily Rhythm (Depth Over Volume)

### Day 4dq (today): Week 4 START — dig-range sync + sparse watch #179–#180 + week4-roadmap v1.0 + PR body refresh

### Days 4dr–4dt: Sparse soft watch (at most 2 NEW digs every 2–3 days; expect DRY)

### Day 4du: Week 4 wrap / update phase-8-self-review.md Week 4 section / PR #3 final draft-ready status check

**Soft-tissue posture**: **WATCH ONLY** through Week 4 (at most 4–6 digs total; expect DRY; no force-wire until clear CC0/BY hit + spatial QA passes)

---

## 7. Bottom Line

Week 4 = **post–Week-3 merge readiness + continuous open-data watch**. Prefer sparse watch + dig-range honesty + PR communication over census padding or SA spam. Teaching atlas **in progress** — **not** finished; **not** clinical; **not** TA2-complete. MERGE-READY for teaching-grade if reviewers accept disclosed gaps (lumbricals absent; DI/MTA grouped; nerves/ligaments/vessels teaching sets incomplete; gastroc/soleus absent; 3 honest ontology empties). Depth over volume.

---

**Version**: v1.0 (Day 4dq 2026-09-24)  
**Next review**: Day 4du (Week 4 wrap)
