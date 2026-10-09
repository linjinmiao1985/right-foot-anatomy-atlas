# Week 5 Roadmap — Sparse Soft Watch Continues (stub, 2026-10-01)

**Phase 8 · Day 4dy · Branch**: `cursor/week2-day4bm-ghost-opacity-096e` (PR #3, draft)  
**Soft digs**: through **#195** (Day 4dy). Day 4dy verdicts: #193 DRY, #194 WIRED, #195 DRY.  
**Census**: 131/126 entries/unique; 128/131 ontology citable; 55 main-tree / 71 BY-SA; 137 GLB on disk (62 main + 75 `by-sa/`). Counted 2026-10-08 from `structures.json` (131 rows; unique = rows minus lumbrical_2/3/4 and plantar_interosseous_2/3) and `public/models/right-foot/**/*.glb`.  
**Stance**: teaching-grade MERGE-READY if the remaining disclosed gaps are accepted. **Not** a finished product. **Not** clinical or surgical. **Not** TA2-complete.

This file is a cadence stub so the watch does not look finished after the Week 4 wrap. It is not a claim that Week 5 has started, and it does not schedule a dig for Day 4dw.

---

## 1. Soft-tissue posture: WATCH ONLY

Wire a mesh only when **all** of these hold:

1. License is CC0 1.0 or CC BY (not NC, not ShareAlike, not unclear).
2. The file is a downloadable foot-soft STL, OBJ, or GLB that fills a disclosed gap (per-toe DI, lumbricals, per-ray MTA, elemental nerves or ligaments, gastrocnemius or soleus).
3. Kabsch QA versus BP3D is green: mean residual under 3.5 mm, max residual under 5.0 mm, correct laterality.

A pass moves the census. Day 4dy did that for gastrocnemius and soleus only.

## 2. Cadence

- One sparse batch every **2–3 days**.
- At most **2–3 new digs** in a batch.
- Day 4dy (2026-10-08, Thursday watch; the 2026-10-04/05 slot had not been run) used **#193–#195**. Next batch is about **2026-10-10 or 2026-10-11** and would start at **#196**.
- Docs-only days (like Day 4dw) do not invent a dig to fill the calendar.

## 3. Non-goals

- Do not force-wire Andreassen or Henson.
- Do not pad `by-sa/`.
- Do not use NC or unclear licenses.
- Do not invent meshes.
- Do not mark the atlas finished, clinical, or TA2-complete.
- Do not merge PR #3 from this stub. Leave it draft.

## 4. Honesty work that does not need a new mesh

After each real dig batch, keep the dig-range lines together in `docs/methods.md`, README Limitations, `docs/week2-soft-ceiling-memo.md`, the phase-8 note, the handback header, and the PR #3 body.

Disclosed gaps that are still true: DI and MTA grouped (teaching compromises); nerve, ligament, and vessel sets incomplete; three honest ontology empties. Lumbricals are BP3D meshes already in the tree. Gastrocnemius and soleus were wired on Day 4dy from BodyParts3D. The atlas is still not finished, not clinical, and not TA2-complete.

---

**Version**: stub v0.1 (Day 4dw 2026-10-01); status lines refreshed Day 4dy 2026-10-08  
**Next review**: next sparse batch about 2026-10-10 or 2026-10-11 (still WATCH ONLY except a mesh that passes the three wire rules)
