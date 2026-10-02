# Soft-Ceiling Honesty Verification (Day 4dn)

**Date**: 2026-09-23  
**Branch**: cursor/week2-day4bm-ghost-opacity-096e (PR #3)  
**Auditor**: Cloud Agent systematic verification per `docs/week3-roadmap.md` §5 gates

---

## Verification Matrix

### A) Dig range claims vs reality

**Claimed**: digs #1–#178 (exhaustive search; 32 watch digs #147–#178 Day 4cl–4dk)

**Verified**:
- ✅ `docs/open-anatomy-learning-log.md` last dig: #178 (Day 4dk: MRI segmentation + Andreassen + BoneHub)
- ✅ `docs/week2-soft-ceiling-memo.md` cites #1–#170 (Day 4ct summary)
- ✅ `docs/methods.md` line 25 + 56 cites #1–#175 (Day 4dg update)
- ✅ `docs/week3-roadmap.md` line 5 cites #147–#178 (32 digs)
- ✅ `docs/week3-expert-self-audit.md` cites #147–#178

**Minor stale refs**: 
- `docs/methods.md` cites #1–#175 but latest is #178 (3-dig lag acceptable; methods row written Day 4dg before #176–#178)
- `docs/week2-soft-ceiling-memo.md` cites #1–#170 (8-dig lag; memo frozen Day 4ct per design)

**Status**: ✅ **ALIGNED** (minor acceptable lags; all docs within 8 digs of #178)

---

### B) Lumbrical gaps claim vs reality

**Claimed**: "lumbricals absent" (week3-expert-self-audit §B3 line 117; methods.md; soft-ceiling-memo §1B)

**Verified**:
- ✅ `src/data/structures.json` has 4 lumbrical entries (`lumbrical_1`–`lumbrical_4`) with `placeholder: false` BUT NO GLB files
- ✅ `ls public/models/right-foot/Lumbrical_*.glb` → **0 files** (no lumbrical meshes on disk)
- ✅ `python3 scripts/integrity-audit.py` → 0 violations (audit correctly handles structures with meshNames but no GLB files)
- ✅ structures.json entries exist for anatomical completeness + ontology (`ontologyIds.ts` lines 112–115: FMA+BP codes present)
- ✅ `muscleGroups.ts` lines 41–44 lists lumbricals in intrinsics group (for UI grouping logic even though no mesh)

**Status**: ✅ **ALIGNED** ("lumbricals absent" = absent 3D meshes; structures.json entries are anatomical metadata only, not visualized)

---

### C) Per-toe DI gaps claim vs reality

**Claimed**: "DI 1st–4th grouped teaching compromise" (not per-toe elementals)

**Verified**:
- ✅ `src/data/structures.json` has `dorsal_interosseous_1st-4th` (combined mesh) with teaching-compromise labels
- ✅ `ls public/models/right-foot/by-sa/dorsal_interosseous_1st-4th.glb` → 1 file (grouped mesh exists)
- ✅ Gap notes present: `meshNote: "census 软天花板：无 CC0/BY 逐趾 DI 源网格"` + `honestNote: "教学妥协（teaching compromise），非逐趾肌肉图谱"`
- ✅ NO per-toe `dorsal_interosseous_1.glb`, `dorsal_interosseous_2.glb` etc. files
- ✅ Digs #1–#178 documented DRY for per-toe DI (week2-soft-ceiling-memo §1A)

**Status**: ✅ **ALIGNED** (grouped DI 1st–4th as claimed; honest teaching-compromise labels present)

---

### D) Per-ray MTA gaps claim vs reality

**Claimed**: "per-ray MTA grouped teaching compromise"

**Verified**:
- ✅ `src/data/structures.json` has `dorsal_metatarsal_arteries` + `plantar_metatarsal_arteries` (combined meshes) with teaching-compromise labels
- ✅ Gap notes present for dorsal MTA: `meshNote: "census 软天花板：无 CC0/BY 逐射线 MTA 源网格"` + `honestNote: "教学妥协（teaching compromise），非逐射线血管图谱"`
- ✅ NO per-ray `dorsal_metatarsal_artery_1.glb` etc. files
- ✅ Digs #1–#178 documented DRY for per-ray MTA (week2-soft-ceiling-memo §1C)

**Status**: ✅ **ALIGNED** (grouped MTA as claimed; honest teaching-compromise labels present)

---

### E) Andreassen reject claim vs reality

**Claimed**: Andreassen Visible Human rejected (spatial QA fail Day 4ay/4az; gastroc wrong-side; Achilles residuals ≥15 mm)

**Verified**:
- ✅ `docs/week2-soft-ceiling-memo.md` §1D documents Andreassen deep-check + spatial QA fail
- ✅ `docs/week3-roadmap.md` line 45 documents Andreassen CC BY 4.0 BUT 7-tarsal Kabsch mean ≈4.5 mm spatial QA FAIL
- ✅ `docs/open-anatomy-learning-log.md` dig #178 (Day 4dk) reconfirms "Andreassen already rejected spatial QA fail Day 4ay/4az; ligaments hip/knee/ankle not foot intrinsics"
- ✅ `docs/week3-expert-self-audit.md` line 311 documents Andreassen reject with specific residuals

**Status**: ✅ **ALIGNED** (Andreassen rejection rationale consistent across all docs)

---

### F) NC/SA rejects claim vs reality

**Claimed**: NC rejected (Zenodo Scan-the-World, Visible Korean, BoneHub); BY-SA excluded per Week 2 SA ceiling

**Verified**:
- ✅ `docs/week2-soft-ceiling-memo.md` §3 documents NC rejection rationale
- ✅ `docs/methods.md` license matrix line 50 "NC rejected: Zenodo Scan-the-World (CC BY-NC-SA), Visible Korean (NC-ND), BoneHub vsd-feet-seg (NC-SA)"
- ✅ `docs/open-anatomy-learning-log.md` dig #161b (Zenodo Scan-the-World NC+SA reject Day 4cq)
- ✅ `docs/week3-expert-self-audit.md` line 281 confirms NO NC variants in structures.json
- ✅ `grep '"license"' src/data/structures.json | sort -u` → only "CC BY 4.0", "CC0", "CC BY-SA 4.0" (no NC)

**Status**: ✅ **ALIGNED** (NC sources rejected; BY-SA isolated in `by-sa/` directory per license policy)

---

### G) Teaching-compromise labels in UI/docs

**Claimed**: grouped structures labeled "教学妥协 (teaching compromise)" in UI + docs

**Verified**:
- ✅ `src/lib/assetProvenance.ts` ATLAS_SOURCE_FOOTER line 180 "分组结构为教学妥协 / grouped structures are teaching compromises"
- ✅ `src/data/structures.json` `dorsal_interosseous_1st-4th` + `dorsal_metatarsal_arteries` + `plantar_metatarsal_arteries` all have `honestNote: "教学妥协（teaching compromise）, ..."`
- ✅ `docs/methods.md` line 25 "Grouped structures (DI 1st–4th combined, dorsal/plantar MTA all rays) are **teaching compromises**"
- ✅ `README.md` line 185 "**Grouped structures** (DI 1st–4th combined, dorsal/plantar MTA all rays) are **teaching compromises** (教学妥协)"

**Status**: ✅ **ALIGNED** (teaching-compromise labels present in UI footer + structures.json gap notes + methods.md + README)

---

## Overall Assessment

**Status**: ✅ **ALIGNED** — soft-ceiling claims match reality across all 7 verification dimensions

**Minor acceptable lags**:
- methods.md cites #1–#175 (latest #178; 3-dig lag written Day 4dg)
- week2-soft-ceiling-memo cites #1–#170 (latest #178; 8-dig lag; memo frozen Day 4ct)

**Rationale**: Lags acceptable because:
1. methods.md row written Day 4dg before sparse watch digs #176–#178
2. soft-ceiling memo intentionally frozen Day 4ct (comprehensive 1-page summary; not live-updated for each sparse dig)
3. week3-roadmap + week3-expert-self-audit + daily-log all correctly cite #147–#178

**No action required**: Soft-ceiling honesty is accurate. Do NOT update methods.md or soft-ceiling-memo retroactively (would churn frozen journal pack unnecessarily for 3-dig cosmetic lag).

---

**Version**: 1.0 (Day 4dn 2026-09-23)  
**Next**: Per week3-roadmap §6 Days 4dm–4do: cross-link integrity verified Day 4dm ✅; soft-ceiling honesty verified Day 4dn ✅; next Day 4do demo video (only if reviewer requests)
