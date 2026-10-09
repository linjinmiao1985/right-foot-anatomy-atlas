# Merge-readiness pack — 2026-10-09 milestone (written 2026-10-08)

**Headline**: Merge when you approve it, in the order **PR #2 → MVP branch, PR #3 → MVP branch, PR #1 → main**, then tag `v1.0-teaching`. The atlas on PR #3 is teaching-grade with disclosed gaps. It is not a finished product, not clinical-grade, and not TA2-complete.

This file is a decision pack. It does not merge anything, does not mark PR #3 ready for review, does not create a tag or a GitHub release, and does not enable GitHub Pages.

**Branch this pack was written on**: `cursor/week2-day4bm-ghost-opacity-096e` (PR #3). Starting tip before the Day 4dy commit: `37e92e31c56db31d8cd11b3fe8e2819a546edc89`.

---

## 1. Proposed order

Do these only after an explicit approval. Each step uses the GitHub merge button or an equivalent merge commit. Do not rebase or force-push `main`.

1. **PR #2 → `cursor/right-foot-anatomy-atlas-mvp-af85`**. Cloud Agent environment file only (`.cursor/environment.json`). Head `20267a9`.
2. **PR #3 → the same MVP branch**, after step 1. Teaching atlas, including Day 4dy. Leave it draft until you decide to merge it; merging a draft still needs your approval.
3. **PR #1 → `main`**. PR #1’s head *is* the MVP branch. After steps 1 and 2, that branch contains the environment file and the teaching atlas. Update PR #1’s title and body first (draft in §5). The current title still says Day 3/7.
4. **Tag `v1.0-teaching`** on the merge commit that lands on `main`. Annotated tag. Release notes draft in §6. Do not also tag a “finished” or “clinical” name.

Why this order: PR #2 and PR #3 both target the MVP branch, and PR #1 carries that branch to `main`. Putting #2 in first keeps the one-file environment change under the teaching history instead of the other way around. `git merge-tree` of each pair was clean on 2026-10-08 (see §2). PR #2’s only path is `.cursor/environment.json`, which is absent on PR #3 (`ls .cursor/environment.json` found nothing on 2026-10-08), so the two pulls do not edit the same file.

---

## 2. Each pull request, live on 2026-10-08

`gh pr view` and `gh pr checks` were run from this checkout on 2026-10-08. There is no `.github/workflows` directory, and `gh pr checks` printed `no checks reported` for PRs #1, #2, and #3. The gates that exist are local (§3).

`git fetch origin main cursor/right-foot-anatomy-atlas-mvp-af85 cursor/setup-dev-environment-05fe` on 2026-10-08, then `git merge-tree --write-tree --name-only <base> <head>`. Exit 0 and a tree oid mean Git reported no conflict.

| PR | Head | Base | GitHub `mergeable` / `mergeStateStatus` | `merge-tree` | CI |
|----|------|------|------------------------------------------|--------------|----|
| [#2](https://github.com/linjinmiao1985/right-foot-anatomy-atlas/pull/2) | `20267a9b4ec2fd898f9d2efb00db33a1be88cf22` on `cursor/setup-dev-environment-05fe` (1 commit ahead of the MVP branch: “Add Cloud Agent environment config for Vite dev setup”) | `cursor/right-foot-anatomy-atlas-mvp-af85` @ `06284b98b8d2a09d4deaac363e3fccea02ed45b5` | `MERGEABLE` / `CLEAN`. Not a draft. | exit 0, tree `2e219b00b016c97267ef45bd84bc0e5e3abda516` | none |
| [#3](https://github.com/linjinmiao1985/right-foot-anatomy-atlas/pull/3) | `37e92e31c56db31d8cd11b3fe8e2819a546edc89` before this Day 4dy commit; branch `cursor/week2-day4bm-ghost-opacity-096e` (85 commits ahead of the MVP branch at that tip) | same MVP branch @ `06284b9` | `MERGEABLE` / `CLEAN` at `37e92e3`. Still a **draft**. | exit 0 against `37e92e3`, tree `3db5f339a861eee945f1436fa93da17c3540d64d` | none |
| [#1](https://github.com/linjinmiao1985/right-foot-anatomy-atlas/pull/1) | `06284b98b8d2a09d4deaac363e3fccea02ed45b5` on `cursor/right-foot-anatomy-atlas-mvp-af85` (“Week 2 Day 4bl: soft dig #84–#89”). Title still: “Week Sprint Day 3/7 — Vessel Expansion + BY-SA Investigation” | `main` @ `b66287ffabd07075aaf6f20c4c139af31658bb2d` (“Add project title to README.md”). MVP is 128 commits ahead of `main`. | `MERGEABLE` / `CLEAN`. Not a draft. | exit 0, tree `9f3a3d2114ad4f269f438d4056007d0545af44ba` | none |

PR #1’s head does **not** yet contain PR #3. Merging PR #1 before PR #3 would publish the Day 4bl MVP tip and leave the teaching work off `main`.

Day 4dy adds files on PR #3 only. It does not edit `.cursor/environment.json`. GitHub’s `MERGEABLE` flag above is the pre-Day-4dy snapshot (`37e92e3`).

The staged Day 4dy tree was checked before this commit’s message was the only remaining difference: `git write-tree` → `fffe9c9882a8b3d40e539c9f8a57354383503aac`, `git commit-tree` parent `37e92e3` → `c1b8d47934c34ad598bb1efc7ca103c1b1cde0ae`, then `git merge-tree --write-tree --name-only origin/cursor/right-foot-anatomy-atlas-mvp-af85 c1b8d479` exited 0 and returned that same tree (fast-forward onto the MVP branch, no conflicted paths). This paragraph is the only hunk added after that check. Re-run merge-tree on the pushed tip before you press merge.

---

## 3. Gates on the Day 4dy tree

Run on 2026-10-08 in this checkout, after the gastrocnemius/soleus wire and before the commit that records them.

| Gate | Command | Result |
|------|---------|--------|
| Integrity | `python3 scripts/integrity-audit.py` | **AUDIT PASSED**. Violations **0**. Total structures **131** (real 131, placeholder 0). Total GLB **137** (referenced 137, orphaned 0). |
| Tests | `npx vitest run` | **138/138** passed. 19 files. Vitest v2.1.9. |
| Build | `npm run build` (`tsc && vite build`) | **Succeeded**. Vite 5.4.21. Output `dist/assets/index-DggYBzMt.js` 1,219.22 kB. The usual chunk-size warning was printed. |
| Census | `structures.json` length and `public/models/right-foot/**/*.glb` | **131** entries / **126** unique. Unique = 131 minus `lumbrical_2`, `lumbrical_3`, `lumbrical_4`, `plantar_interosseous_2`, `plantar_interosseous_3` (5 collapsed extras). Layers: bone 26, muscle 30, vessel 29, nerve 17, ligament 29. GLB **137** = **62** main + **75** `by-sa/`. Ontology map **128** ids (`src/lib/ontologyIds.test.ts` expects 128/131). BY-SA unique stays **71**; main-tree unique is **55** (126 − 71). |

There is no hosted CI to quote. These local commands are the gates.

---

## 4. What is not covered

Say these in the release. Do not soften them.

The atlas is for teaching spatial relationships. It is **not** validated for diagnosis, treatment planning, surgical navigation, implant sizing, or patient-specific modeling (`docs/methods.md` soft disclaimer).

Still true after Day 4dy:

- **Per-toe dorsal interossei** are one grouped Open3D CC BY-SA mesh (`interossei_dorsales`), not four elemental main-tree meshes. Dig #195 did not find a CC0/CC BY replacement.
- **Dorsal and plantar metatarsal arteries** are grouped. There is no per-ray 1st–4th elemental set.
- **Nerves** are a teaching set: Z-Anatomy curve tubes plus Open3D branches. Commons and proprii are grouped. Not a complete peripheral-nerve atlas.
- **Ligaments, retinacula, and fascia** are incomplete versus a named ATFL-set in some texts. Cervical talocalcaneal has no distinct TA98 code in `src/lib/ontologyIds.ts`.
- **Three honest ontology empties** remain: `cervical_talocalcaneal_ligament`, `medial_plantar_veins`, `lateral_plantar_vein`.
- **ShareAlike volume** is 71 of 126 unique structures under `by-sa/`. Deleting that directory is the CC BY/CC0-only surface.
- **Andreassen** gastrocnemius/soleus and **Henson** Aug_8 stay unwired. Their spatial QA failed earlier (`docs/cloud-agent-handback.md`, `third_party/andreassen/`). Day 4dy did not reopen them. The wired bellies are BodyParts3D, a different donor.
- **OrthoSense** `.feb` geometry was not converted (dig #193). The README does not grant a CC0 or CC BY licence for that geometry.
- `public/models/right-foot/manifest.json` `stats` still describes an older 97-entry snapshot. The live count is `structures.json` plus the integrity audit, not that `stats` object.
- No GitHub Actions. A green local run is not a protected check.

Corrected, because the old slogan is false:

- **Lumbricals are meshes.** `lumbrical_1st.glb` through `lumbrical_4th.glb` are on disk. Vertex counts measured 2026-10-08: 838, 266, 508, 410. Week 4’s “lumbricals absent” line (`docs/phase-8-self-review.md` §D item 1) does not match the tree.
- **Gastrocnemius and soleus are meshes as of dig #194.** BodyParts3D CC BY 4.0, right side only. They are calf bellies shown in the same millimetre frame as the foot, for teaching the Achilles continuation. They are not a whole-leg atlas and not a clinical registration.

Kabsch for the new bellies, from `third_party/somakine/spatial_qa.json`: 12 bone centroids, scale 1, mean residual 0.00 mm (computed 6.985594793171769×10⁻¹⁵), max 1.5888218580782548×10⁻¹⁴ mm. Gate was mean < 3.5 mm and max < 5.0 mm. Laterality: every wired vertex has X<0. Distal 10% to `calcaneal_tendon_BP5098.glb`: medial head 0.399 mm, lateral head 0.144 mm, soleus 0.291 mm.

---

## 5. Proposed replacement for PR #1 (do not apply until PR #2 and PR #3 are on the MVP branch)

The live title and the opening of the live body still say Day 3/7 and “43/49 structures” (`gh pr view 1` on 2026-10-08). That described an older week. Paste the text below onto PR #1 **after** steps 1 and 2, so the body matches the commit that will reach `main`. Pasting it earlier would describe work that is not on PR #1’s head yet (`06284b9` is Day 4bl).

**Proposed title**

Teaching-grade right-foot atlas — candidate for v1.0-teaching

**Proposed body**

```
## What this pull request carries

`cursor/right-foot-anatomy-atlas-mvp-af85` into `main`, after PR #2 (Cloud Agent environment) and PR #3 (teaching atlas, including Day 4dy) have merged into that branch.

This is a teaching-grade interactive right-foot atlas. It is not a finished product, not clinical-grade, and not TA2-complete.

## Census (Day 4dy, PR #3)

Counted from `src/data/structures.json` and `public/models/right-foot/**/*.glb`, and from `python3 scripts/integrity-audit.py`:

- 131 entries / 126 unique (lumbricals and plantar interossei stay as separate entries; unique count collapses the extra lumbrical and plantar-interosseous rows)
- 55 main-tree / 71 BY-SA unique
- Ontology 128/131, with three named honest empties
- 137 GLB files (62 main + 75 by-sa)
- Osteology 26/26
- Muscles 30 entries, including BodyParts3D gastrocnemius (medial FJ1397 + lateral FJ1394) and soleus (FJ1437)

## Gates

No GitHub Actions on this repository (`gh pr checks` reported none on 2026-10-08). Local gates on the Day 4dy tree: integrity audit 0 violations; vitest 138/138; `npm run build` succeeded (chunk-size warning).

## Gaps that stay disclosed

Per-toe dorsal interossei and per-ray metatarsal arteries are grouped teaching compromises. Nerve, ligament, and vessel sets are incomplete. Three ontology ids are honest empties. ShareAlike isolate is 71/126 unique structures. See `docs/merge-readiness-2026-10.md` and `docs/week2-soft-ceiling-memo.md`.

## Not in this merge

No GitHub Pages. No clinical claim. Tag `v1.0-teaching` only after this pull request is on `main` and you want the tag.
```

---

## 6. Draft release notes for `v1.0-teaching`

Do not publish this until the tag exists, and do not create the tag from this pack.

**Title**: v1.0-teaching

**Body**

```
Teaching-grade right-foot anatomy atlas.

Use it to learn named bones, muscles, vessels, nerves, and ligaments, and to turn layers on and off. Do not use it for diagnosis, surgery, implant sizing, or patient-specific planning.

Included:
- 26/26 right-foot bones (BodyParts3D, CC BY 4.0)
- Muscle layer including four lumbricals, plantar interossei, and (Day 4dy) gastrocnemius medial and lateral heads plus soleus from BodyParts3D
- Grouped dorsal interossei and grouped metatarsal arteries, labeled as grouped
- Vessel, nerve, and ligament/tendon teaching sets, with a ShareAlike isolate under by-sa/
- Ghost, explode, and quiz teaching controls

Not included:
- A per-toe dorsal-interosseous atlas
- A per-ray metatarsal-artery atlas
- A complete nerve, ligament, or vein atlas (three ontology entries are intentionally empty)
- Clinical or TA2 completeness

Licence: code MIT; meshes CC BY 4.0, CC0 1.0, and CC BY-SA 4.0 (ShareAlike files stay in by-sa/). Attribute BodyParts3D as “BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International”.

Numbers and the merge order are in docs/merge-readiness-2026-10.md.
```

---

## 7. Rollback, and the watch after the tag

**Rollback**

- Before the tag: if Day 4dy’s bellies are the problem, revert that commit on PR #3 and push the branch. Do not merge the bad commit.
- If PR #1 has already merged to `main` and must be undone: `git revert -m 1 <merge-commit>` on `main` and push that revert. Do not force-push `main`.
- If the tag `v1.0-teaching` was created and must be withdrawn: delete the release and the tag only as a separate, explicit decision. Do not rewrite the merge commit to pretend the tag never existed.
- GitHub Pages stays off unless you enable it yourself.

**After the tag: low-frequency maintenance, November–December 2026**

- One soft-tissue watch a week (the Week 5 cadence is every 2–3 days and at most 2–3 digs; weekly is the slower reading of that rule). Next number is **#196**. Next slot after Day 4dy is about 2026-10-10 or 2026-10-11 (`docs/week5-roadmap.md`).
- Wire a mesh only when the licence is CC0 or CC BY (no NC, SA, ND, or unclear text), the STL/OBJ/GLB downloads without a login or paywall, and Kabsch mean stays under 3.5 mm, max under 5.0 mm, with the correct side.
- Record REJECT / DRY / MONITOR with the URL, the DOI or accession, and the licence string that was actually on the page.
- Re-run `python3 scripts/integrity-audit.py`, `npx vitest run`, and `npm run build` when a wire lands. A week with no new deposit does not need a fake dig.
- Do not reopen Andreassen or Henson unless a new registration passes the gates already written in `docs/cloud-agent-handback.md`.
- Do not describe the atlas as finished, clinical, or TA2-complete in those weekly notes.

---

**Sources for the numbers in this pack**: `gh pr view` / `gh pr checks` (2026-10-08); `git rev-parse` and `git merge-tree` (2026-10-08); `python3 scripts/integrity-audit.py`; `npx vitest run`; `npm run build`; `src/data/structures.json`; `public/models/right-foot/**/*.glb`; `third_party/somakine/spatial_qa.json`; `docs/open-anatomy-learning-log.md` digs #193–#195.
