# Open Anatomy Learning Log

Living log of open-source human anatomy projects studied for the right-foot atlas.
**Policy**: dig widely; document lessons; integrate meshes only when license-safe
(CC0 / CC BY into main tree; BY-SA isolated under `public/models/right-foot/by-sa/` + NOTICE;
reject NC / unknown / All Rights Reserved).

**Last updated**: 2026-09-15 (Day 4be: ontology honest-empty UX + digs #63–#65; Andreassen skipped)  
**Status**: ongoing research — not a finished catalog.

---

## How to read action tags

| Action | Meaning |
|--------|---------|
| **adopt** | Safe to ship meshes/code patterns into main redistributable tree |
| **isolate-SA** | Usable only under ShareAlike isolation + NOTICE |
| **UX-borrow** | Copy interaction/layout ideas only (no assets) |
| **reject** | License or content unfit for this project |
| **monitor** | Re-check later; no clear mesh win yet |

---

## Already in use (baseline)

| Project | URL | License | Learn | Foot atlas fit | Action |
|---------|-----|---------|-------|----------------|--------|
| BodyParts3D (LSDB Archive) | https://dbarchive.biosciencedbc.jp/en/bodyparts3d/ | **CC BY 4.0** (lic.html 2025-02-27) | Assets, FMA IDs, laterality | Primary bones/muscles/vessels | **adopt** |
| Universiti Malaya Asian Male LE MSK | Dataverse (Final Model STL) | **CC0 1.0** | Higher-res intrinsics/extrinsics | Gap-fill + quality replace | **adopt** |
| Z-Anatomy nerves (extracted) | https://github.com/Z-Anatomy/Models-of-human-anatomy | **CC BY-SA 4.0** | Nerve curves, TA2 | 6 foot nerves in `by-sa/` | **isolate-SA** |
| DU Visible Human LE | https://digitalcommons.du.edu/visiblehuman/ | CC BY 4.0 | Cryosection STL pipeline | No intrinsic foot DI; deferred | **monitor** |
| Open3DModel / AnatomyTOOL | anatomytool.org | CC BY-SA 4.0 (varies) | Teaching GLB packaging | Download blocked / SA | **isolate-SA** / blocked |

---

## Session additions (2026-09-15)

### 1. HuBMAP CCF 3D Reference Object Library

| Field | Value |
|-------|-------|
| **Name** | hubmapconsortium/ccf-3d-reference-object-library |
| **URL** | https://github.com/hubmapconsortium/ccf-3d-reference-object-library |
| **Official license** | **CC BY 4.0** (repo LICENSE + badge; SPDX CC-BY-4.0) |
| **What to learn** | Attribution strings; versioned organ GLBs (VH Male/Female v1.2); Babylon/sandbox-friendly packaging; Meshopt/glTF transform habit via downstream consumers |
| **Foot atlas applicability** | Organs (brain, heart, …) — **no foot meshes**. Patterns for NOTICE + in-app attribution + stable GLB routes transfer well. |
| **Action** | **UX-borrow** (attribution + glTF packaging). **reject** as foot mesh source. |

### 2. hpfrei/body-anatomy-3d-viewer

| Field | Value |
|-------|-------|
| **Name** | Body Anatomy 3D Viewer |
| **URL** | https://github.com/hpfrei/body-anatomy-3d-viewer |
| **Official license** | **CC BY-SA 4.0** (Z-Anatomy model data + project LICENSE) |
| **What to learn** | Blender → simplify → **Draco GLB**; per-mesh `extras` metadata (`type`, `name`, `nameDetail`, `wikiLink`); click-to-shelve layer navigation; type filters |
| **Foot atlas applicability** | Inspected `public/body.glb` (8.2 MB, 2026-09-15): has **hand** dorsal interossei only; **no foot dorsal interossei**; foot bones/some muscles present but redundant with BP3D/UM. Foot subset extraction would be BY-SA only. |
| **Action** | **UX-borrow** (compression/metadata ideas). **isolate-SA** if ever extracting foot subset. **reject** for DI gap fill. |

### 3. HongChao6/open-anatomy-studio

| Field | Value |
|-------|-------|
| **Name** | Open Anatomy Studio / 开放解剖工作室 |
| **URL** | https://github.com/HongChao6/open-anatomy-studio |
| **Official license** | **MIT** code; HRA organ GLBs **CC BY 4.0** (`THIRD_PARTY_ASSETS.md`) |
| **What to learn** | Bilingual labels; **source-aware** in-product attribution; real clipping planes; system filters; reduced-motion; clean-room content contract |
| **Foot atlas applicability** | Assets are HRA organs (not foot). UX: persistent source badge, bilingual layer chrome, honesty about model scope. |
| **Action** | **UX-borrow** (implemented this session: source badge + layer legend clarity). No mesh copy. |

### 4. BioLens (wania-Bakhat/BioLens)

| Field | Value |
|-------|-------|
| **Name** | BioLens |
| **URL** | https://github.com/wania-Bakhat/BioLens |
| **Official license** | Repo license unset; README: Sketchfab GLBs claimed **CC BY 4.0** per model — **verify each Sketchfab page before any mesh copy** |
| **What to learn** | Collision-aware / **Spread labels**; explode; calm dark study chrome; structure search + visibility |
| **Foot atlas applicability** | No curated right-foot intrinsic set identified. Label/legend clarity patterns useful. |
| **Action** | **UX-borrow** (legend / density clarity). Mesh copy deferred until per-asset license pages verified. |

### 5. GraphAnatomy (siddarth123456/GraphAnatomy)

| Field | Value |
|-------|-------|
| **Name** | GraphAnatomy / Medical Anatomy Platform |
| **URL** | https://github.com/siddarth123456/GraphAnatomy |
| **Official license** | Not clearly SPDX on API (verify before reuse) |
| **What to learn** | Isolation mode, exploded views, fly-to, Draco pipeline, FMA/SNOMED graph ideas |
| **Foot atlas applicability** | Hand MVP + BP3D pipeline; UX isolation/explode later; no DI mesh gain claimed |
| **Action** | **UX-borrow** (isolation/explode — future). Assets: verify license before any copy. |

### 6. Open Anatomy Project + SlicerOpenAnatomy

| Field | Value |
|-------|-------|
| **Name** | Open Anatomy / PerkLab SlicerOpenAnatomy |
| **URLs** | https://www.openanatomy.org/ · https://github.com/PerkLab/SlicerOpenAnatomy · discourse/ProjectWeek notes |
| **Official license** | Atlases under **3D Slicer Contribution and Software License** (not CC0/BY); software BSD-ish Slicer terms |
| **What to learn** | JSON-LD atlas container linking geometry + concepts; glTF export preserving hierarchy/names/colors/opacity; LPS→glTF meter convention; alphaMode BLEND fixes |
| **Foot atlas applicability** | Published atlases are brain/abdomen/knee/etc. — **no foot atlas**. Exchange conventions inform future `manifest.json` / structure metadata evolution. |
| **Action** | **UX-borrow** / data-model lessons. **reject** as foot mesh source (wrong region + non-CC license). |

---

## Additional digs (same session)

| Project | URL | License | Learn | Foot fit | Action |
|---------|-----|---------|-------|----------|--------|
| ashemag/human-atlas | https://github.com/ashemag/human-atlas | BP3D **CC BY 4.0** meshes | System layers, search, exploded layouts, real vs concept honesty | Full-body BP3D explorer; UX reference | **UX-borrow** |
| biocat-ugent/Open-Anatomy-Explorer (OPANEX) | https://github.com/biocat-ugent/Open-Anatomy-Explorer | Apache-2.0 (viewer) | Web atlas viewer architecture | Viewer ≠ assets; assets TBD | **UX-borrow** / monitor assets |
| Nurkan1/Anatria-3D | https://github.com/Nurkan1/Anatria-3D | Apache-2.0 (claimed) | Offline local-first atlas UX | Verify mesh provenance | **monitor** |
| DrMuratAltun/anatomi-simulatoru | GitHub | BP3D/Z-Anatomy BY-SA stack | Full-body Turkish UI | SA taint | **isolate-SA** / reject mix |
| SPARC / Pennsieve 307 | https://discover.pennsieve.io/datasets/307 | Dataset CC BY 4.0 | Whole-body scaffolds | Muscles from Anatomography/BP3D — **no foot DI** | **reject** (DI) / monitor |
| Visible Korean | anatomy.co.kr / KISTI | All Rights Reserved | Has DI in literature | Proprietary | **reject** |
| Zenodo 20228270 foot/ankle muscles | zenodo.org/records/20228270 | **CC BY-NC-SA 4.0** | CT foot muscles | NC incompatible | **reject** |
| OpenGameArt human foot | opengameart.org | CC0 | Skin surface only | No intrinsics | **reject** (DI) |
| Cults3D ankle/foot (Muskiron) | cults3d.com | **Unknown** | Lists DI STL | Cloudflare / license unclear | **reject** until license page clear |
| NIH 3D | https://3d.nih.gov | **Varies per entry** | Print/web GLB | No confirmed DI CC0/BY hit this session | **monitor** |
| SimTK ankle-foot OpenSim | https://simtk.org/projects/ankle-foot | Check project | Ligament/muscle MSK model | Simulation, not teaching meshes | **monitor** |
| HRA / humanatlas.io | https://humanatlas.io/3d-reference-library | CC BY 4.0 | Same as CCF library | Organs only | **UX-borrow** attribution |

---

## Mesh integration decisions (this session)

| Candidate | License | DI / vessels? | Decision |
|-----------|---------|---------------|----------|
| hpfrei `body.glb` foot subset | BY-SA 4.0 | **No foot DI** (hand DI only) | Do **not** isolate for DI; keep as pipeline reference only |
| HuBMAP HRA organs | CC BY 4.0 | Not foot | No integrate |
| New Zenodo/NIH hits | mixed | No clear DI CC0/BY | None integrated |

**Gap update (later same day)**: Open3DModel lower-limb OBJ supplied CC BY-SA 4.0 meshes for `interossei_dorsales` (1st–4th), `posterior_tibial_artery`, and `fibular_artery` — integrated under `by-sa/` isolation only (not main CC BY claim). Prefer CC0/CC BY replacements if they appear later.

---

## UX borrows applied (2026-09-15)

Documented implementations (ideas only — no third-party UI code copied):

1. **Source-aware badge / footer** (from Open Anatomy Studio + BioLens attribution habit)  
   - Persistent bottom attribution strip: BP3D CC BY · UM CC0 · Z-Anatomy nerves BY-SA isolated.  
   - Structure panel shows provenance chip when a structure is selected.

2. **Layer legend clarity** (from human-atlas / hpfrei type filters / BioLens visibility chrome)  
   - Per-layer color swatch + bilingual label (zh + en).  
   - Counts: real vs 占位.  
   - Show all / hide all quick actions.  
   - Compact legend key distinguishing real mesh vs placeholder.

3. **Structure search ZH/LA + isolate** (from jixiangying/anatomy, BioLens, GraphAnatomy, Grypa-JJ, OMFAtlas)  
   - Top-left search box matches `nameZh` / `nameLa` / id; selecting opens StructurePanel.  
   - Panel button **仅此 · Isolate** hides other meshes while selection is active (Esc clears).  
   - Ideas only — no third-party UI code copied.

4. **Bilingual label density** (from Open Anatomy Studio + BioLens / LABIM3D; Day 4ai)  
   - Layer panel: 关 / 中文 / 中+拉 for hover Html chips; Latin only when bilingual.

5. **Sagittal clip plane lite** (from Open Anatomy Studio + VH Viewer / CT Education Skill; Day 4aj)  
   - Single X-axis toggle + position slider; `localClippingEnabled` scene sync. Teaching only — not clinical MPR.

6. **Per-structure hide chip** (from undergravity/human-atlas dissection habit; Day 4au)  
   - StructurePanel **隐藏此结构 · Hide this (X)** chip beyond isolate; chip bar of hidden names + restore / restore-all.  
   - Ideas only — no third-party UI code copied.

---


---

## Session additions (2026-09-15 · continued)

### 7. Grypa-JJ/anatomy-atlas-3d

| Field | Value |
|-------|-------|
| **Name** | Anatomy Atlas 3D |
| **URL** | https://github.com/Grypa-JJ/anatomy-atlas-3d |
| **Official license** | Repo SPDX **NOASSERTION** / Other; README: geometry from BodyParts3D (**CC BY-SA 2.1 JP**) + Z-Anatomy (**CC BY-SA 4.0**); see ATTRIBUTION.md |
| **What to learn** | Polish+Latin nomenclature switch; isolate structure + landmarks; explode; exam pin-points; Draco multi-GLB pack |
| **Foot atlas applicability** | Full-body BY-SA stack — foot DI may exist in Z-Anatomy lineage but SA-only. Isolate UX borrowed this session. |
| **Action** | **UX-borrow** (isolate). Mesh: **isolate-SA** / verify before any extract. |

### 8. jixiangying/anatomy

| Field | Value |
|-------|-------|
| **Name** | Human Anatomy Explorer (BodyParts3D bilingual) |
| **URL** | https://github.com/jixiangying/anatomy |
| **Official license** | README badge **MIT** (code) + data **CC BY-SA 2.1 JP** (BodyParts3D); no separate LICENSE file via API |
| **What to learn** | Global ZH/EN search that opens layers; highlight + fade others; list↔mesh sync |
| **Foot atlas applicability** | Full-body BP3D explorer; search pattern applied this session. |
| **Action** | **UX-borrow** (search). Assets already covered by LSDB Archive CC BY path elsewhere. |

### 9. choxos/OMFAtlas

| Field | Value |
|-------|-------|
| **Name** | OMF Atlas (oral & maxillofacial) |
| **URL** | https://github.com/choxos/OMFAtlas |
| **Official license** | **MIT** (code, LICENSE); BodyParts3D meshes + mixed dental sets (CC BY 4.0 / BY-NC-SA / BY-SA per ASSET files — README documents file-boundary licenses) |
| **What to learn** | Schematic honesty labels; search + isolation; separation inventory; per-asset license boundaries |
| **Foot atlas applicability** | Head/neck only — **no foot meshes**. License-boundary discipline transferable. |
| **Action** | **UX-borrow** / process lesson. **reject** as foot mesh source. |

### 10. desmond9986/open-anatomy-atlas

| Field | Value |
|-------|-------|
| **Name** | Open Anatomy Atlas |
| **URL** | https://github.com/desmond9986/open-anatomy-atlas |
| **Official license** | **MIT** code (LICENSE verified); assets Z-Anatomy / Open3DModel — see ASSET_LICENSES.md (**CC BY-SA**) |
| **What to learn** | Z-Anatomy primary + Open3DModel fallback loader; hide/restore selected; system toggles |
| **Foot atlas applicability** | Confirms Open3DModel as usable BY-SA teaching pack; points at same lineage as DI extract. |
| **Action** | **UX-borrow** / **isolate-SA** for any Open3D extracts. |

### 11. Kevin-Mattheus-Moerman/BodyParts3D

| Field | Value |
|-------|-------|
| **Name** | BodyParts3D STL mirror + Julia helpers |
| **URL** | https://github.com/Kevin-Mattheus-Moerman/BodyParts3D |
| **Official license** | Repo **MIT** for code/mirror tooling; README states 3D files **CC BY-SA 2.1 Japan** (Anatomography-era archive note) — **do not confuse with LSDB Archive CC BY 4.0** used by this atlas for BP3D meshes |
| **What to learn** | FMA-named STL hosting pitfalls; license fork awareness (BY-SA 2.1 JP vs Archive BY 4.0) |
| **Foot atlas applicability** | Convenient STL mirror only if SA isolation acceptable; our main tree stays on LSDB Archive BY 4.0. |
| **Action** | **monitor** / document license fork. Prefer LSDB Archive for main tree. |

### 12. morphomuseum/MorphoDig (+ MorphoSource dig)

| Field | Value |
|-------|-------|
| **Name** | MorphoDig surface editor; MorphoSource media repo |
| **URLs** | https://github.com/morphomuseum/MorphoDig · https://www.morphosource.org/ |
| **Official license** | MorphoDig software: **GPL-2.0-or-later** (LICENSE); MorphoSource: **per-media** (CC / copyright / public domain — must read each media page) |
| **What to learn** | Landmark/digitization workflow; never assume human foot soft-tissue CC-BY |
| **Foot atlas applicability** | Sample MorphoSource foot mesh DOIs (e.g. 10.17602/m2/m532409) lack clear DI/artery soft-tissue + open license in this pass; primate calcaneus example often **BY-NC**. **No integrable CC0/BY human foot DI/artery hit.** |
| **Action** | **monitor** MorphoSource entry-by-entry. **reject** NC examples. |

### 13. OpenSim / SimTK ankle-foot geometry

| Field | Value |
|-------|-------|
| **Name** | opensim-org/opensim-models; SimTK ankle-foot / footankle_model |
| **URLs** | https://github.com/opensim-org/opensim-models · https://simtk.org/projects/ankle-foot · https://simtk.org/projects/footankle_model/ |
| **Official license** | opensim-models: no clear SPDX on API; SimTK packages labeled “Model” without a verified CC0/CC BY page in this dig — **verify before any mesh copy** |
| **What to learn** | Multi-segment foot kinematics; ligament/tendon MSK counts — simulation geometry ≠ teaching muscle bellies |
| **Foot atlas applicability** | Visualization bones/ligaments possible later; **not** a confirmed DI teaching mesh source this session. |
| **Action** | **monitor** until downloadable license text is clear. |

### 14. atultiwari/sushruta-anatomy

| Field | Value |
|-------|-------|
| **Name** | Sushruta |
| **URL** | https://github.com/atultiwari/sushruta-anatomy |
| **Official license** | Code **All Rights Reserved** (LICENSE); `assets/` **CC BY-SA 4.0** (assets/LICENSE) |
| **What to learn** | Isolate / explode / ghost / depth probe; local-first study assistant driving the viewport |
| **Foot atlas applicability** | Assets SA; code not open for reuse. UX isolate ideas only. |
| **Action** | **UX-borrow**. **reject** code copy; **isolate-SA** if ever considering assets. |

---

## Mesh integration decisions (continued)

| Candidate | License | DI / vessels? | Decision |
|-----------|---------|---------------|----------|
| Open3DModel `lower-limb.obj` DI 1st–4th `.r` | **CC BY-SA 4.0** (AnatomyTOOL create page + local NOTICE.txt) | **Yes — foot DI** | **Integrated** under `public/models/right-foot/by-sa/dorsal_interosseous_*.glb` + structure `interossei_dorsales` |
| Open3D `Posterior_tibial_artery.r` / `Fibular_artery.r` | CC BY-SA 4.0 | Proximal arteries (prior placeholders) | **Integrated** under `by-sa/` — SA badge; not claimed as CC BY main tree |
| Open3D `Medial_plantar_nerve.r` | CC BY-SA 4.0 | Nerve | **Skip** — already have Z-Anatomy nerve GLBs |
| Open3D `Dorsal_metatarsal_arteries.r` | CC BY-SA 4.0 | Vessels | **Skip** — BP3D grouped dorsal digital / plantar metatarsal already in main tree |
| MorphoSource human foot mesh DOIs | unclear / often NC | No confirmed DI | **Not integrated** |
| SimTK OpenSim ankle-foot geom | unclear SPDX | Simulation | **Not integrated** |

**Honesty**: BY-SA DI/arteries close soft-tissue gaps for teaching but **ShareAlike-isolate** only; a future CC0/CC BY mesh would be preferred for the main redistributable claim.


## Pipeline lessons (not yet implemented)

- Prefer glTF node names + `extras` for teaching metadata (hpfrei / OpenAnatomy export).  
- Draco or Meshopt for large multi-mesh packs; keep foot atlas as discrete GLBs for license isolation.  
- JSON-LD / sidecar concept maps (Open Anatomy) as future evolution of `structures.json` + `manifest.json`.  
- Never mix Anatomography BY-SA **renders** with LSDB Archive BY 4.0 **meshes** without isolation.

---

---

## Session finds — 2026-09-15 (alignment + coverage honesty)

### NEW: Open3D vs BP3D unit/frame mismatch (actioned)

| Field | Value |
|-------|-------|
| **Find** | Open3D lower-limb OBJ stores foot soft tissue in **meters**; BP3D foot GLBs are **mm**. Applying the atlas `0.01` scale to raw Open3D DI/PTA/fibular GLBs left them ~100× too small and near the wrong origin. |
| **Method** | Kabsch similarity on 8 coherent bone centroids (Calcaneus, Talus, Navicular, MT1–5). Excluded BP3D cuboid / medial & intermediate cuneiform (pre-existing off-cluster centers). |
| **Result** | scale ≈924.45; mean landmark residual ≈3.0 mm (max ≈4.8 mm). DI centers land ~14 mm from nearest MT; PTA distal ~17 mm from calcaneus centroid. Baked into `by-sa/*.glb`; transform JSON under `third_party/open3dmodel/`. |
| **Action** | **integrated** (alignment bake) + keep **isolate-SA**. Prefer future CC0/CC BY replacements. |

### NEW: Coverage accounting (docs only)

| Field | Value |
|-------|-------|
| **Find** | README/manifest still listed DI + PTA + fibular as *gaps* after Day 4i mesh integration. |
| **Honest split** | Unique 55/55 real meshes: **main 46** (CC BY/CC0) + **BY-SA 9** (DI + 2 arteries + 6 nerves). Entry-level `structures.json` 60/60 `placeholder:false`. |
| **Action** | **doc-only** — no finished-product claim; BY-SA fills ≠ main-tree relicensing. |

### NEW: UX — BY-SA layer toggle warning

| Field | Value |
|-------|-------|
| **Find** | Muscle/vessel layers now also pull BY-SA (DI, PTA, fibular), not only nerve. |
| **Action** | **UX-borrow**: Layer panel shows ShareAlike status when muscle/vessel/nerve is visible. |

No new CC0/CC BY DI or proximal-artery candidates found this session.

---



---

## Session additions (2026-09-15 · Day 4j — tarsal ID fix + dig)

### 15. Handfish/R3F_AnnotationTool

| Field | Value |
|-------|-------|
| **Name** | BodyParts3D / Anatomography Annotation Tool (R3F) |
| **URL** | https://github.com/Handfish/R3F_AnnotationTool |
| **Official license** | **MIT** (LICENSE verified: Kenneth Udovic et al.) |
| **What to learn** | CRA→modern R3F annotation / pick workflow; candidate Vite port notes |
| **Foot atlas applicability** | Tooling pattern only; no curated right-foot soft-tissue pack. |
| **Action** | **UX-borrow** (annotation/pick ideas). **reject** as mesh source. |

### 16. JohanBellander/BodyExplorer

| Field | Value |
|-------|-------|
| **Name** | Body Explorer (écorché + skeleton) |
| **URL** | https://github.com/JohanBellander/BodyExplorer |
| **Official license** | Code: **MIT** (README License section); meshes: BodyParts3D **CC BY-SA 2.1 JP** + Z-Anatomy **CC BY-SA 4.0** (Attribution section) |
| **What to learn** | Muscle-group filters (incl. foot); hide/restore deeper layers; dual opacity (muscle vs skeleton); preset camera views |
| **Foot atlas applicability** | Foot muscle group UX reference. Mesh stack is SA — not for main-tree DI/artery fill. |
| **Action** | **UX-borrow** (group filter / hide-restore). Meshes: **isolate-SA** only if ever extracted. |

### 17. toby-bridges/brain-architecture-studio

| Field | Value |
|-------|-------|
| **Name** | Brain Architecture Studio |
| **URL** | https://github.com/toby-bridges/brain-architecture-studio |
| **Official license** | Code **MIT** (LICENSE verified); BodyParts3D brain GLBs attributed **CC BY-SA 2.1 JP** in README badge/text |
| **What to learn** | Real clipping-plane cross-section; imaging-mode material metaphors; dual-view compare; Playwright inventory walker |
| **Foot atlas applicability** | Brain-only meshes — **no foot**. Cross-section / dual-view UX transferable later. |
| **Action** | **UX-borrow**. **reject** as foot mesh source. |

### 18. dkaloger/medstudy-anatomy

| Field | Value |
|-------|-------|
| **Name** | MedStudy anatomy models (USDZ packs) |
| **URL** | https://github.com/dkaloger/medstudy-anatomy |
| **Official license** | README: **CC BY-SA 4.0** (Z-Anatomy / BodyParts3D lineage); no separate SPDX LICENSE file via API |
| **What to learn** | On-demand release-asset distribution of region packs |
| **Foot atlas applicability** | SA packs — possible foot content in Z-Anatomy lineage but ShareAlike only. |
| **Action** | **monitor** / **isolate-SA**. Prefer LSDB Archive CC BY for main tree. |

### NEW pipeline lesson (actioned this session)

| Field | Value |
|-------|-------|
| **Find** | BP3D “spatial drift” for cuboid + cuneiforms was **ISA ID confusion** (left calcaneus / left medial cuneiform / pharyngeal constrictor / distal phalanx II), not Kabsch failure. |
| **Verify** | Always cross-check `isa_parts_list_e.txt` + OBJ `# Representation ID` / `# Concept ID` headers before trusting filename BP tags. |
| **Action** | **integrated** correct FJ3364/3377/3370/3373 → BP8873/8830/9110/8730 GLBs. |

No new CC0/CC BY foot DI or proximal-artery candidates in this dig.

## Next dig targets

- Prefer CC0/CC BY replacements for Open3D BY-SA DI + proximal arteries (relicense or alternate segmentations).  
- MorphoSource human foot media pages one-by-one for clear CC BY soft tissue.  
- SimTK ankle-foot downloadable license text before any geom reuse.  
- Cults3D Muskiron license page (if Cloudflare allows).  
- Contact paths for Zenodo 20228270 relicense (BY without NC).  
- NIH 3D entry-by-entry crawl remaining.

## Session finds — 2026-09-15 (Day 4k phalanx ID / frame)

### NEW: BP3D already has right-foot distal phalanges 2–5 (actioned)

| Field | Detail |
|-------|--------|
| **Find** | UM distal 2–5 sat on Y≈−850 CT frame; ISA 4.0 elemental OBJs **FJ3189/3190/3191/3195** (BP8472/9005/9261/8695) are already in BP3D foot mm. Prefer replace over Kabsch-rebake of UM. |
| **Related** | Hallux proximal was BP8488 (= middle II); correct **BP8785 / FMA43253 / FJ3310**. |
| **Method** | `isa_parts_list_e.txt` + `isa_element_parts.txt` + OBJ headers; `obj2gltf`. |
| **Action** | **integrated** (main tree CC BY). UM Phalanges.stl remains historical source only. |
| **License** | BP3D LSDB Archive CC BY 4.0 (same as other bones). |

## Session finds — 2026-09-15 (Day 4l UM→BP3D soft-tissue frame)

### ACTIONED: UM muscle Kabsch into BP3D mm

| Field | Detail |
|-------|--------|
| **Find** | UM muscles shared CT frame with former UM distal phalanges (Y≈+20s / Z≈−760). UM bone STLs provide Calcaneus/Talus/Navicular/Cuboid/cuneiforms for registration; **no MT STLs**. |
| **Method** | Kabsch similarity on 7 tarsal centroids vs BP3D GLBs (post Day 4j correct IDs). Scale≈0.842, mean residual≈2.2 mm. |
| **Action** | **baked** into 8 muscle GLBs; transform JSON under `third_party/um/`. |
| **Lesson** | Shared bone landmarks in the *same* subject/dataset beat guessing translations; Day 5 “overlap confirmed” was premature without landmark residuals. |


---

## Session additions (2026-09-15 · Day 4m — Open3D re-fit + dig)

### 19. altucher/atlas-foundry

| Field | Value |
|-------|-------|
| **Name** | Atlas Foundry / Explode Anything (+ Corpus `/human`) |
| **URL** | https://github.com/altucher/atlas-foundry |
| **Official license** | Code **MIT** (LICENSE verified 2026-09-15); BodyParts3D human edition **CC BY 4.0** (`public/ATTRIBUTION.md`) |
| **What to learn** | Fidelity labels (verified 3D vs conceptual 2.5D); continuous explode control; sourced component cards; keep generated imagery from claiming hidden geometry |
| **Foot atlas applicability** | Full-body BP3D explorer at `/human` — **no new foot DI**. Honesty pattern: label ShareAlike fills vs main-tree CC BY/CC0 clearly. |
| **Action** | **UX-borrow** (fidelity / explode honesty). **reject** as new foot mesh source (same BP3D pool). |

### 20. ood-labs/anatomy-slices

| Field | Value |
|-------|-------|
| **Name** | Anatomy Slices (Sentinel sectioning) |
| **URL** | https://github.com/ood-labs/anatomy-slices |
| **Official license** | Code **MIT** (LICENSE verified); anatomy volumes derived from BodyParts3D via pinned `ashemag/human-atlas` — **CC BY 4.0** (ATTRIBUTION.md) |
| **What to learn** | Mesh→SDF / structure-ID volume pipeline; axial/sagittal/coronal/oblique cutaways; provenance.json with SHA pins; explicit “model sections ≠ MRI intensity” disclaimer |
| **Foot atlas applicability** | Whole-body voxel sectioning — useful for future cutaway UX, **not** a foot soft-tissue mesh gain. |
| **Action** | **UX-borrow** / process (provenance pins + section honesty). **reject** as DI mesh source. |

### 21. olivercase/body_parts_3d_api

| Field | Value |
|-------|-------|
| **Name** | BodyParts3D 4.3 mesh set + downloader / subset selector |
| **URL** | https://github.com/olivercase/body_parts_3d_api |
| **Official license** | Code **MIT** (LICENSE verified); mesh data labeled **CC BY-SA 2.1 Japan** (Anatomography / full-res 4.3 path — **not** LSDB Archive CC BY 4.0) |
| **What to learn** | License **fork awareness**: Anatomography full-res 4.3 ≠ dbarchive R4.0 99% OBJ under CC BY 4.0; FJ→BP lookup pitfalls; subset tooling |
| **Foot atlas applicability** | Convenient full-res mirror **only if** ShareAlike isolation is acceptable. This atlas main tree stays on **LSDB Archive CC BY 4.0**. |
| **Action** | **monitor** / document fork. Prefer LSDB Archive for main tree; **isolate-SA** if ever using 4.3 Anatomography meshes. |

### ACTIONED: Open3D Kabsch re-fit (cuboid + cuneiforms)

| Field | Detail |
|-------|--------|
| **Find** | After Day 4j tarsal ID fix, Day 4i+ Open3D bake still used 8 landmarks (mean residual ≈2.96 mm). |
| **Method** | Kabsch similarity on 12 landmarks (Calcaneus/Talus/Navicular/Cuboid/3 cuneiforms/MT1–5) from Open3D meters → BP3D mm; bake from raw extracted OBJs. |
| **Result** | scale≈926.0; mean residual≈**2.61 mm** (Δ≈−0.35 mm vs prior). DI1–4 + PTA + fibular re-baked under `by-sa/`. |
| **Action** | **integrated** (alignment re-bake) + keep **isolate-SA**. |

No new CC0/CC BY foot DI or proximal-artery candidates in this dig (atlas-foundry / anatomy-slices reuse BP3D; body_parts_3d_api is BY-SA 2.1 JP fork).

## Next dig targets (updated)

- Prefer CC0/CC BY replacements for Open3D BY-SA DI + proximal arteries.  
- MorphoSource human foot media pages one-by-one for clear CC BY soft tissue.  
- SimTK ankle-foot downloadable license text before any geom reuse.  
- Contact paths for Zenodo 20228270 relicense (BY without NC).  
- NIH 3D entry-by-entry crawl remaining.  
- Avoid Anatomography BY-SA 2.1 JP full-res mirrors for main-tree claims.

---

## Session additions (2026-09-15 · Day 4n — TA2 gap pass + UM orphans)

### Gap analysis (entry-level `placeholder:false` ≠ TA2-complete)

| Status | Detail |
|--------|--------|
| **placeholders in structures.json** | **0** (64/64 `placeholder:false` after wiring 4 UM teaching extrinsics) |
| **Addressed this pass** | Orphan UM CC0 GLBs for *M. tibialis anterior*, *M. fibularis longus* (file `peroneus_longus.glb`), *M. extensor digitorum longus*, *M. extensor hallucis longus* — Kabsch-rebaked with Day 4l transform, wired to main tree |
| **Still missing vs TA2 teaching foot** | **Ligament / fascia layer** (ATFL, CFL, deltoid, spring / plantar calcaneonavicular, plantar aponeurosis, …) — no CC0/CC BY meshes found |
| | **Finer plantar / digital nerves** (nn. digitales plantares communes/proprii, etc.) — only trunk nerves in `by-sa/` |
| | **Dorsal metatarsal arteries detail** — BP3D still ships **grouped** dorsal digital + plantar metatarsal; individual Aa. metatarsales dorsales not split |
| | Plantar interossei **already present** (BP3D 1st–3rd) — not a gap |
| **Search (no new CC0/CC BY integrate)** | AnatomyTOOL/Open3D lower-limb zip local stub unusable; Open3D `Dorsal_metatarsal_arteries` previously skipped (grouped BP3D exists); Z-Anatomy/Anatomy Engine **ligamentous** system is **CC BY-SA only** → would require `by-sa/` extract (heavy .blend; deferred); Zenodo 20228270 still **BY-NC-SA**; SimTK ankle-foot license still unclear for geom reuse; MorphoSource NC/unclear soft tissue |
| **Honesty** | Zero placeholders ≠ finished atlas. Prefer future CC0/CC BY for ligaments & fine vessels/nerves before expanding BY-SA isolate set. |

### 22. AJFUTURES/anatomy-engine

| Field | Value |
|-------|-------|
| **Name** | Anatomy Engine (MCP + inline 3D viewer) |
| **URL** | https://github.com/AJFUTURES/anatomy-engine |
| **Official license** | **Code & authored data: MIT** (LICENSE verified 2026-09-15); **3D meshes: CC BY-SA 4.0** Z-Anatomy / BodyParts3D (NOTICE verified) |
| **What to learn** | MCP tool surface over anatomy graph; **ligamentous** system among 7 Z-Anatomy systems; isolate + articulate postures; dual-license NOTICE discipline; clinician-approval honesty banners |
| **Foot atlas applicability** | Ligament meshes exist in Z-Anatomy lineage but **ShareAlike only** — candidate future `by-sa/` extract, not main-tree. MCP/graph ideas are UX/data-model only. |
| **Action** | **UX-borrow** (isolate keyboard habit applied this session). Meshes: **isolate-SA** / monitor for CC0/BY replacements. **reject** mixing SA ligaments into main CC BY claim. |

### 23. itayinbarr/brainproject

| Field | Value |
|-------|-------|
| **Name** | Brain Atlas / brainproject |
| **URL** | https://github.com/itayinbarr/brainproject |
| **Official license** | Viewer code **Apache-2.0**; 3D assets **CC BY-SA 4.0** (Z-Anatomy/BP3D) — LICENSE dual notice verified 2026-09-15 |
| **What to learn** | Explicit dual-license LICENSE appendix; atlas-registration honesty (~7 mm educational); imaging-derived nuclei remain SA; screenshot/export pipeline |
| **Foot atlas applicability** | Brain-only meshes — **no foot ligaments/DI**. Process lesson: keep NOTICE + “approximate / educational” language when filling gaps. |
| **Action** | **UX-borrow** / process (dual-license clarity). **reject** as foot mesh source. |

### 24. biocat-ugent/Open-Anatomy-Explorer (deepened)

| Field | Value |
|-------|-------|
| **Name** | OPANEX — Open Anatomy Explorer |
| **URL** | https://github.com/biocat-ugent/Open-Anatomy-Explorer |
| **Official license** | Viewer **Apache-2.0** (repo license SPDX); anatomical **assets are institute uploads** — not a redistributable CC0/BY foot pack |
| **What to learn (actionable borrow)** | Student vs instructor UI split; quiz/label workflows; **import/export of labeled models** between institutes — motivates keeping `structures.json` + `manifest.json` exportable without bundling SA into the default share |
| **Foot atlas applicability** | No integrable right-foot ligament/digital-nerve CC0/BY pack identified. Architecture only. |
| **Action** | **UX-borrow** (label/quiz later). **monitor** asset library licenses entry-by-entry. **reject** assuming OPANEX models are free to vendor. |

### UX applied this session

1. **Keyboard isolate `I`** (GraphAnatomy / Grypa / Anatomy Engine / Sushruta ideas) — toggles isolate when a structure is selected; Esc clears; hint + panel button updated.  
2. **Structure count badge** under title — entry counts + isolate status; title attribute states this is **not** a completeness claim.

### Mesh decisions

| Candidate | License | Decision |
|-----------|---------|----------|
| UM orphan TA / FL / EDL / EHL GLBs | **CC0 1.0** | **Integrated** (Kabsch bake + structures + FootModel) |
| Z-Anatomy / Anatomy Engine ligaments | BY-SA 4.0 | **Not integrated** this pass (blend extract cost; prefer CC0/BY) |
| New CC0/BY ligaments / digital nn. / split dorsal MTA | — | **None found** |

---

## Session additions (2026-09-15 · Day 4o — ligament/fascia search + click-to-focus)

### Gap status (honest)

| Status | Detail |
|--------|--------|
| **Ligament layer** | **Started** — 1 BP3D CC BY mesh (`long_plantar_ligament` / FJ1424) in new `ligament` layer. **Not** TA2-complete. |
| **Plantar fascia** | Still **no** CC0/CC BY mesh found |
| **ATFL / CFL / deltoid / spring** | Still missing; Z-Anatomy BY-SA not extracted this pass (BY mesh preferred when available) |
| **Fine digital nerves / split dorsal MTA** | Unchanged gaps |

### 25. BodyParts3D foot ligament elemental (deepened)

| Field | Value |
|-------|-------|
| **Name** | BP3D ISA elemental `FJ1424` = right long plantar ligament (`BP5093` / FMA44249) |
| **URL** | https://dbarchive.biosciencedbc.jp/en/bodyparts3d/ + `isa_BP3D_4.0_obj_99.zip` |
| **Official license** | **CC BY 4.0** (lic.html 2025-02-27) |
| **What to learn** | Compound ligament concepts in parts list often collapse to one elemental OBJ; inventory `isa_element_parts.txt` before claiming “no ligaments” |
| **Foot atlas applicability** | Usable teaching mesh for *Lig. plantare longum*; **only** foot ligament elemental with geometry found. No plantar fascia / lateral complex. |
| **Action** | **adopt** (main tree, `ligament` layer). Document incompleteness. |

### 26. Universiti Malaya ligaments (deepened via readme.txt)

| Field | Value |
|-------|-------|
| **Name** | UM Asian Male LE MSK — Final Model STL (doi:10.22452/RD/5T6TZ7) |
| **Official license** | **CC0 1.0** |
| **What to learn** | Dataset notes + readme: 5 ligaments are **knee**-region; Achilles / patellar / quad tendons present; **minor foot ligaments excluded** (hard to segment on MRI) |
| **Foot atlas applicability** | **No** plantar fascia / ATFL / spring for this atlas |
| **Action** | **reject** as foot ligament source (keep using for muscles already adopted) |

### 27. AnyBody/gm-foot (NEW)

| Field | Value |
|-------|-------|
| **Name** | Glasgow–Maastricht Foot Model (`AnyBody/gm-foot`) |
| **URL** | https://github.com/AnyBody/gm-foot |
| **Official license** | GitHub: **Other** / unclear redistribution for teaching GLB export (2026-09-15) |
| **What to learn** | Multi-bone foot + plantar fascia + dense ligament set in AnyBody MSK context |
| **Foot atlas applicability** | Potentially rich fascia/ligament content — **blocked** until clear CC0/CC BY (or compatible) grant for mesh reuse |
| **Action** | **monitor** |

### 28. SimTK OpenSim ankle-foot DCT model (deepened)

| Field | Value |
|-------|-------|
| **Name** | OpenSim ankle-foot musculoskeletal model (Sikidar / Kalyanasundaram) |
| **URL** | https://simtk.org/projects/ankle-foot |
| **Official license** | Page shows “License: Model” only — **not** verified CC0/CC BY for geometry files |
| **What to learn** | 46 ligaments + 19 fasciae as OpenSim DCT / path geometry — simulation, not atlas surface meshes |
| **Foot atlas applicability** | Do not vendor `.osim` geom as teaching GLB without explicit libre license |
| **Action** | **monitor** / **reject** pending license clarification |

### UX applied this session

1. **Click-to-focus** — `CameraFocus` frames OrbitControls on selected mesh AABB (teaching polish).  
2. **Ligament layer** chrome in layer panel + legend chip (honest “起步 / not complete”).

### Mesh decisions

| Candidate | License | Decision |
|-----------|---------|----------|
| BP3D FJ1424 long plantar | **CC BY 4.0** | **Integrated** (main tree) |
| Z-Anatomy ligaments | BY-SA 4.0 | **Deferred** (BY mesh found for one key structure; avoid expanding SA set this pass) |
| UM 5 ligaments | CC0 | **reject** (knee, not foot fascia/ankle complex) |
| gm-foot / SimTK / Soma3D | unclear / NC / unknown | **monitor** or **reject** |


## Session additions (2026-09-15 · Day 4p — BP3D ISA brute-force ligament re-scan)

| Item | Detail |
|------|--------|
| **Method** | Mapped all skeletal-ligament elementals → concept names; filtered `right`+(ligament\|fascia\|aponeuro\|retinacul); searched ankle/foot capsules |
| **New foot ligament/fascia meshes** | **None** beyond `FJ1424`/`BP5093` (already integrated) |
| **Side find** | Right calcaneal tendon `FJ1405`/`BP5098` — tendon, not ligament; defer |
| **Action** | Docs + README honesty; no new main-tree mesh; no finished-product claim |

## Session additions (2026-09-15 · Day 4q — Achilles Path A + BP3D ligament ceiling)

### BP3D ligament / soft-tissue ceiling (brief)

| Fact | Implication for this atlas |
|------|----------------------------|
| Exhaustive ISA scan (Day 4p) found **one** right-foot ligament elemental with geometry: long plantar `FJ1424`/`BP5093` | Ligament layer cannot be completed from BP3D alone |
| Plantar fascia / ATFL / CFL / deltoid / spring / short plantar / Lisfranc / ankle capsules | **Absent** from BP3D ISA elementals |
| Right calcaneal tendon `FJ1405`/`BP5098` | Present as **tendon** (also parented under some ligament-organ concepts) — usable CC BY teaching mesh, must be labeled tendon not ligament |
| Lesson | Prefer CC BY native-frame soft tissue when it exists (Achilles); do not invent ligament coverage from BP3D; BY-SA Z-Anatomy ligaments remain optional isolate-only if spatial QA passes |

### Path A integrate

| Field | Value |
|-------|-------|
| **Mesh** | `calcaneal_tendon_BP5098.glb` (FJ1405) |
| **License** | CC BY 4.0 main tree |
| **UI** | Under `ligament` toggle with labels 韧带/腱; structure named 跟腱 / Tendo calcaneus |
| **Action** | **adopt** (tendon teaching entry) |

### Path B (not this pass)

| Candidate | Result |
|-----------|--------|
| Open3D lower-limb zip | No ATFL/CFL/spring/plantar-fascia named meshes in local extract |
| Z-Anatomy ligaments | Still Blender-internal BY-SA — deferred |

### Honesty

Soft-tissue under ligament toggle = **1 ligament + 1 tendon**. Still missing plantar fascia and ankle ligament complex. No finished-product claim.


## Session additions (2026-09-15 · Day 4r — Z-Anatomy ligament export blocked + teaching polish)

### Path 1 — local Z-Anatomy / OpenAnatomy ligament export

| Item | Result |
|------|--------|
| Local `.blend` / Z-Anatomy zip | **Missing** (`third_party/z-anatomy/` = EVALUATION only) |
| Blender on box | **Not installed** |
| Open3D lower-limb zip | Still **0** usable ankle ligament / plantar fascia meshes |
| Prior Z-Anatomy nerve frame | Nerves already in `by-sa/`; same-donor ligament extract **not** possible without blend |
| Action | **Document blocker**; path 2 only — no new BY-SA ligament GLBs, no Kabsch, no finished-product claim |

### Path 2 — teaching polish (viewer)

| Change | Detail |
|--------|--------|
| Non-selected opacity | When a structure is selected (and isolate off), peer **nerve** / **vessel** real meshes dim (~0.2 opacity) so the selection reads clearly |
| Structure panel | `getTeachingMeshNote()` — short mesh-fidelity lines for nerves (CURVE tubes / BY-SA), grouped vessels, Open3D arteries, ligament/tendon incompleteness |
| Grouped vessels | `dorsal_digital_arteries` / `plantar_metatarsal_arteries` summaries + notes: BP3D **no** per-ray / dorsal-metatarsal elementals to split (FJ2072 / FJ2096) |

### Mesh decisions

| Candidate | Decision |
|-----------|----------|
| Z-Anatomy ligaments / plantar fascia | **Blocked** — assets missing on box |
| Split dorsal metatarsal arteries | **Impossible** from BP3D ISA elementals — keep honest grouped labels |



## Day 4s — Open3D multi-object OBJ as ligament source (2026-09-15)

**Lesson**: A “zip has no ligaments” finding can be an artifact of scanning the wrong artifact (stub zip / pre-split extracts). The AnatomyTOOL lower-limb package’s textureless OBJ is often a **single file with many `o` object groups**; `rg '^(o |g )'` on the monolithic OBJ is the inventory step that unlocks BY-SA ligaments without Blender.

**License**: Same Open3D CC BY-SA 4.0 isolation as DI — do not fold into CC BY-only redistribution claims.

**Z-Anatomy**: Zenodo DOI 10.5281/zenodo.4953712 is a legal, scriptable fetch for the `.blend`; without Blender CLI it remains documentation + future recipe, not an integrated mesh path.

**Teaching win**: ATFL / CFL / spring / plantar aponeurosis now selectable under 韧带/腱 with BY-SA badge — still incomplete soft-tissue coverage.


## Day 4t — Expand Open3D ligament inventory (2026-09-15)

**Lesson**: Once the monolithic OBJ inventory exists, expanding coverage is a **named-object + attachment-QA** loop — not a new registration. Same Day 4m Kabsch transform applies; reject only if centroid laterality/scale/attachment distance is absurd.

**Integrated (BY-SA isolate)**: 4 deltoid parts, short plantar, bifurcate, PTFL, 3 Lisfranc-ish grouped TMT bands, 5 ankle retinacula (15 new + reconfirmed Day 4s four).

**QA residuals (centroid → nearest expected bone landmark, mm)**: cuneometatarsal 12.3 · dorsal TMT 12.0 · plantar TMT 16.4 · bifurcate 18.3 · CFL 17.2 · short plantar 20.9 · ATFL 20.5 · PTFL 20.4 · deltoid parts 17.9–23.2 · retinacula 15.5–39.8 (superior extensor highest — proximal band expected) · plantar fascia 32.7. Kabsch landmark mean residual unchanged ≈2.6 mm.

**Still honest gaps** (pre–Day 4v): many OBJ bands unextracted (cuneonavicular, intercuneiform, toe collaterals…); Lisfranc/retinacula are **grouped** teaching meshes; no finished ligament atlas claim. Blender still absent from apt — Z-Anatomy `.blend` path remains recipe-only.

**Deepen (Day 4v)**: Passing attachment QA is not the same as “should integrate.” After Day 4t volume, the scarce resource is **teaching clarity** (sub-groups, census honesty, unfinished claims), not more GLBs. A hard **max-N** with a written priority list (subtalar IO/cervical → dorsal TN → deep transverse MT → intercuneiform IO → dorsal cuneonavicular) forces deferrals even when residuals are excellent (medial TC 17.4 mm, dorsal intercuneiform 9.0 mm deferred). Document deferrals as volume policy — do not invent a spatial reject.


## Day 4v — Selective ligaments + methods reproducibility (2026-09-15)

**Project A — Selective Open3D wire**: Integrated 6 BY-SA bands (interosseous + cervical talocalcaneal, talonavicular, deep transverse metatarsal, intercuneiform IO, dorsal cuneonavicular). Deferred medial talocalcaneal + dorsal intercuneiform (max-6). Sub-groups: subtalar / midfoot / forefoot.

**Project B — Methods journal polish**: Strengthened `docs/methods.md` reproducibility (transform JSON table, script list, license matrix) + soft teaching-vs-clinical disclaimer. No finished-product claim.

## Session additions (2026-09-15 · Day 4w — deferred ligaments + NV ceiling)

| Item | Note |
|------|------|
| Medial TC + dorsal intercuneiform | Integrated (Day 4v volume deferrals; QA accept reused) |
| Dorsal MTA split | **Ceiling**: no CC0/BY per-ray; Open3D object grouped |
| Plantar digital nerves | **Day 4x wired**: Common + Proper (med/lat) + deep LPN branch (Open3D BY-SA, Kabsch+QA); further terminals deferred |
| Esc UX | Clears isolate + search |

**Lesson**: Volume deferrals with passing QA should stay as first-class backlog items — integrating them later is cheaper than re-scanning when the census priority flips.


## Session additions (2026-09-15 · Day 4x — Open3D fine nerves)

| Item | Note |
|------|------|
| Common + Proper plantar digitals | Integrated (grouped teaching objects; Kabsch residual ≈2.6 mm reused) |
| Deep branch LPN | 4th entry — motor deep branch teaching value |
| Rejected / deferred | 0 spatial rejects; ~8 further named nerve parts QA-pass but volume-deferred |
| Dorsal MTA | Still grouped-only ceiling |
| Lesson | Compare Open3D nerves to **Open3D** plantar trunks (same frame), not Z-Anatomy CURVE GLBs |


## Session additions (2026-09-15 · Day 4y — deferred nerves + license dig)

### Nerve wire (same Open3D donor)

| Item | Note |
|------|------|
| Medial + lateral dorsal cutaneous | Integrated (BY-SA Kabsch; teaching cutaneous map) |
| Medial + lateral calcaneal nn. | Integrated (heel sensory teaching) |
| Superficial branch LPN | Complements Day 4x deep LPN |
| Dorsal digitals (sup. fibular) | One grouped dorsal digital set |
| Still deferred | Sural→LDC continuity; deep-fibular dorsal digitals |
| Lesson | Prefer complementary sensory territories over redundant continuity meshes when capping volume |

### NEW license-verified projects

| Project | URL | License verified | Foot relevance | Decision |
|---------|-----|------------------|----------------|----------|
| **Blender Studio Human Base Meshes — foot** (Dan Ulrich et al.; Wikimedia STL mirror) | https://commons.wikimedia.org/wiki/File:Blender_Foot_realistic_by_Dan_Ulrich_(CC0).stl · source bundle https://www.blender.org/download/demo/asset-bundles/human-base-meshes/ | **CC0 1.0** (Commons + Blender demo asset bundle) | High-res **skin/surface** foot mesh only — no named intrinsics, nerves, or vessels | **reject** (anatomy teaching DI/NV) / **monitor** for surface silhouette UX only |
| **ASTARC (University of Antwerp) — Right lower extremity bone scans** on AnatomyTOOL | https://anatomytool.org/content/antwerpen-afd-astarc-3d-model-right-lower-extremity-no-labels | **CC BY-NC-SA** (item page credit text; Artec Micro/Spider scans by Marjan Maldoy & Ian Garcia) | Real osteology LE scan set — high fidelity bones | **reject** for main-tree / commercial-redistribution path (**NC**); **monitor** for non-commercial teaching fork only |

### Deepen (same Open3D family)

| Project | URL | License | Note | Action |
|---------|-----|---------|------|--------|
| **Open3DModel — Ankle and Foot** (Nov 2025 submodel of July 2025 lower limb) | https://anatomytool.org/content/open3dmodel-ankle-and-foot-english-labels | **CC BY-SA** (same Open3D project credit) | Teaching sub-package / viewer slice — same donor mesh family already used via monolithic lower-limb OBJ | **deepen / isolate-SA** — prefer continuing named-object extracts from lower-limb OBJ rather than re-downloading submodel unless topology differs |

**Honesty**: No new CC0/CC BY fine-nerve or per-ray dorsal MTA candidates. Day 4y expands ShareAlike nerve teaching set only — not a finished peripheral-nerve atlas.

## Session additions (2026-09-15 · Day 4aa — Open3D fine vessels + license dig)

### Vessel wire (same Open3D donor)

| Item | Note |
|------|------|
| Deep plantar artery | Integrated — dorsalis pedis → plantar arch anastomosis teaching |
| Deep plantar arch | Integrated as BY-SA **detail** complementary to BP3D `plantar_arch` (same deep-arch concept; not dual anatomical arches) |
| Dorsal metatarsal arteries | Integrated **grouped** — soft ceiling remains (no 1st–4th elemental in donor OBJ) |
| Deep + superficial branches of medial plantar a. | Integrated (source spelling *planter* on superficial) |
| Documented only | Perforating arcuate↔deep arch; med/lat tarsal; calcaneal aa.; Open3D trunks already on BP3D |
| Lesson | Prefer additive anastomosis/branch detail over dual-wiring of the same named trunk |

### NEW license-verified projects

| Project | URL | License verified | Foot relevance | Decision |
|---------|-----|------------------|----------------|----------|
| **Parametric 3D CAD model of human foot** (Franciosa; Warwick) | https://doi.org/10.5281/zenodo.5192129 (Zenodo API `license.id` = `cc-by-4.0`) | **CC BY 4.0** | 19-bone CT→CAD foot (phalanges fused); no named muscles/nerves/vessels | **reject** (NV/DI teaching) / **monitor** for FE/plantar-pressure bone CAD only |
| **Foot primary functional bone segments SSM** (Grant et al.; Griffith) | https://doi.org/10.5281/zenodo.3464747 (Zenodo API `cc-by-4.0`) | **CC BY 4.0** | MRI-segmented talus/calcaneus/midfoot/1st MT point clouds — shape variation, not soft tissue | **reject** (NV) / **monitor** for osteology SSM / registration research |
| **Open 3D Man Project** (Eungyeol Lee / LUMC consortium) + **open3dviewer** | https://www.eungyeol-lee.com/open3dman · https://github.com/djansma/open3dviewer | Models: **CC BY-SA** (illustrator page); viewer: **GPL-3.0** (GitHub SPDX) | Remodel/sculpt lineage over BodyParts/Z-Anatomy; LUMC multi-university atlas (ongoing). Viewer is software only | **deepen / isolate-SA** for any future mesh extracts; **UX-borrow** viewer patterns; **do not** confuse GPL viewer with MIT atlas code |

**Honesty**: No new CC0/CC BY per-ray dorsal MTA or digital artery candidates. Day 4aa expands ShareAlike vessel teaching set only — **not** a finished vascular atlas.


---

## Session additions (2026-09-15 · Day 4ah — license dig + lazy preload + layer-sorted search)

### NEW license-verified projects (≥4)

| # | Project | URL | License verified | Foot relevance | Decision |
|---|---------|-----|------------------|----------------|----------|
| **29** | **LABIM3D** (FernandandreaTM/labim3d) — TecMedHub, Universidad Austral de Chile | https://github.com/FernandandreaTM/labim3d · https://tmeduca.org/ferlopezmoncada/labim3d | **CC BY 4.0** (README header + design principles; GitHub API SPDX unset — trust README text 2026-09-15) | Curated print/web STL catalog + Three.js viewer; per-model JSON attribution. No named right-foot intrinsic soft-tissue pack identified this pass | **UX-borrow** (catalog attribution discipline). **monitor** local models entry-by-entry before any mesh copy |
| **30** | **Human Organs** (code4fukui/human_organs) | https://github.com/code4fukui/human_organs | **MIT** (GitHub SPDX verified) for viewer code; assets from **NIH 3D Print Exchange** — **per-entry** NIH licenses (must verify each model page) | Organ GLB/STL explorer — **no** curated foot DI/NV set | **UX-borrow** (NIH per-asset verify habit). **reject** assuming NIH packs are uniformly CC BY |
| **31** | **Segmented Internal Organs (SIO)** — Visible Human Male (VOXEL-MAN / UKE Hamburg-Eppendorf; NCI IDC Zenodo) | https://www.virtual-body.org/segmented-internal-organs/ · Zenodo DOI **10.5281/zenodo.15882019** | **CC BY 4.0** (Zenodo API `license.id` = `cc-by-4.0` verified 2026-09-15) | High-res **torso** voxel atlas (>200 labeled objects) — **not foot** | **UX-borrow** / process (CC BY cryosection→label honesty). **reject** as foot mesh source |
| **32** | **UltraBones100k** (luohwu/UltraBones100k) | https://github.com/luohwu/UltraBones100k · HF `luohwu/UltraBones100k` | **CC BY 4.0** (GitHub SPDX + Hugging Face dataset card) | Lower-limb US + CT bone surfaces (`foot.stl` / tibia / fibula per specimen) — osteology surface for US research, **not** named intrinsic soft tissue | **monitor** for bone-surface QA only. **reject** (DI/NV teaching) |
| **33** | **OpenLimbTT** (abel-research/OpenLimbTT) — University of Southampton et al. | https://github.com/abel-research/OpenLimbTT | Code **MIT** (`CODE-LICENSE`); data **CC BY-SA 4.0** (`DATA-LICENSE` / README badges verified) | Transtibial **residual limb** SSM (not intact foot teaching atlas) | **monitor** / **isolate-SA** if ever using residual-limb STLs. **reject** for intact foot DI |

### Actionable borrow applied this session

1. **Search results sorted by teaching layer** (BodyExplorer muscle-group / human-atlas system-list habit) — after match score, order bone → muscle → ligament → vessel → nerve in `searchStructures`.
2. **Lazy GLB preload by visible layer** — bones remain eager; muscle/vessel/nerve/ligament `useGLTF.preload` runs when that layer is toggled visible (visibility-gated mount was already partial; module-level preload-all removed).

### Performance / honesty note

| Item | Value |
|------|-------|
| On-disk teaching GLBs | **134** (~13 MB): **59** main tree + **75** `by-sa/` |
| Strategy | Discrete per-structure GLBs (license isolation); React mount only for visible layers; lazy preload soft-tissue layers on toggle |
| Not claimed | Draco pack / single-file atlas; finished soft-tissue completeness |

No new CC0/CC BY foot DI / per-ray MTA / ligament candidates integrated this pass — dig only + UX/perf. **No finished-product claim.**


---

## Session additions (2026-09-15 · Day 4ai — bilingual label density + dig)

### UX applied

| Change | Detail |
|--------|--------|
| **Bilingual label density** | Layer panel control: **关 / 中文 / 中+拉** (`off` · `zh` · `bilingual`). Hover Html chips honor density; Latin line only in bilingual. Default remains bilingual. |
| Source | **UX-borrow** (ideas only) from Open Anatomy Studio bilingual chrome + BioLens / LABIM3D label clarity — no third-party UI code copied. |
| Files | `src/lib/labelDensity.ts` (+ vitest), `StructureHoverLabel.tsx`, wired App / LayerToggles / Viewport / FootModel |

### NEW license-verified projects (≥2)

| # | Project | URL | License verified | Foot relevance | Decision |
|---|---------|-----|------------------|----------------|----------|
| **34** | **Open Twin XR** (Opening-Science/open-twin-xr) | https://github.com/Opening-Science/open-twin-xr | Code **MIT** (README Licensing); anatomy assets per-atlas (BP3D CC BY 4.0, Z-Anatomy BY-SA + **NC components**, HRA CC BY 4.0, TCIA CT CC BY 4.0, OpenEar CC BY 4.0, biv-me Apache-2.0) — README warns bundled Z-Anatomy path is **non-commercial** | Multi-atlas WebXR body viewer; honest absence / in-app provenance / X-ray Fresnel / explode — **no** curated right-foot DI pack identified | **UX-borrow** (honesty + provenance). **reject** mixing NC-tainted Z-Anatomy components into main tree |
| **35** | **3Dentes** (NateSaindon/3Dentes) | https://github.com/NateSaindon/3Dentes · https://natesaindon.github.io/3Dentes/ | Code **MIT**; anatomy **CC BY-NC 4.0** (own CBCT derivatives — README Licensing) | Oral CBCT atlas (teeth/pulp/PDL/IAN) — **no foot**. Fidelity tiers (measured / derived / schematic) per structure | **UX-borrow** (fidelity-tier honesty). **reject** for foot mesh / main-tree (**NC**) |

No new CC0/CC BY foot DI / per-ray MTA / ligament candidates integrated this pass — dig + UX only. **No finished-product claim.**

---

## Session additions (2026-09-15 · Day 4aj — sagittal clip lite + dig)

### UX applied

| Change | Detail |
|--------|--------|
| **Sagittal clip plane (lite)** | Layer panel toggle + position slider; single **X** axis via Three.js `localClippingEnabled` + scene material sync (`ClipPlaneSync`). Default mid-foot constant `1.05` (scene units = BP3D mm × 0.01). |
| Source | **UX-borrow** (ideas only) from Open Anatomy Studio clipping planes + Visible Human Viewer / CT Education Skill cross-section habit — no third-party renderer/UI code copied. |
| Why not layer-color legend | Legend + per-layer swatches already present (Day 4h); clip was the remaining lower-risk mining-note item that still needed wiring. |
| Honesty | Teaching cutaway only — **not** clinical MPR / capped CSG. Uncapped clip holes are expected. |
| Files | `src/lib/clipPlane.ts` (+ vitest), `ClipPlaneSync.tsx`, wired App / LayerToggles / Viewport |

### NEW license-verified projects (≥2)

| # | Project | URL | License verified | Foot relevance | Decision |
|---|---------|-----|------------------|----------------|----------|
| **36** | **Visible Human Viewer** (tabutyn/visible-human-viewer) | https://github.com/tabutyn/visible-human-viewer | Code **MIT** (LICENSE + NOTICE.md verified 2026-09-15); underlying NLM Visible Human described as **public-domain** subject to [NLM Terms](https://www.nlm.nih.gov/databases/download/terms_and_conditions.html) — repo ships code/metadata only (no cryosection pixels) | WebGPU registered CT+RGB cross-sections; adjustable cuts / LOD — **no** curated right-foot DI/NV mesh pack | **UX-borrow** (cross-section / consent honesty). **reject** as foot soft-tissue mesh source |
| **37** | **Anatomy Atlas RU** (zigmyndovi4-ship-it/anatomy-atlas-ru) | https://github.com/zigmyndovi4-ship-it/anatomy-atlas-ru · demo https://zigmyndovi4-ship-it.github.io/anatomy-atlas-ru/ | Code **MIT** (LICENSE); anatomy **CC BY 4.0** BodyParts3D 4.0 (`public/ATTRIBUTION.md` verified 2026-09-15; LSDB lic.html supersedes legacy BY-SA 2.1 JP OBJ comments) | ashemag/human-atlas lineage + full RU localization (3432 concepts) + screenshots of search/isolate/explode — same BP3D pool already in main tree | **UX-borrow** (RU/EN bilingual search + screenshot QA habit). **reject** as new foot mesh source (same BP3D) |

### Related dig (not counted as new foot mesh)

| Project | License | Note |
|---------|---------|------|
| **CT Education Skill** (grapeot/ct-education-skill) | Code **MIT** (LICENSE verified) | Local-first chest CT education + RAS x/y/z clipping; uncapped cut honesty — reinforced clip-lite decision. No foot DI pack. |

No new CC0/CC BY foot DI / per-ray MTA / ligament candidates integrated this pass — dig + UX only. **No finished-product claim.**


---

## Session additions (2026-09-15 · Day 4al — CC0/CC BY asset hunt + methods polish)

### Target (phase-6 #1)

Prefer **CC0/CC BY** finds for DI / proximal·fine arteries / nerve·ligament replacements that shrink ShareAlike surface. Dig + license verify before wire; **no** BY-SA volume add this pass.

### NEW license-verified projects (≥4)

| # | Project | URL | License verified | Foot relevance | Decision |
|---|---------|-----|------------------|----------------|----------|
| **38** | **TotalSegmentator v3 dataset** (Wasserthal et al.) | Zenodo DOI **10.5281/zenodo.22688904** · code https://github.com/wasserth/TotalSegmentator | Dataset **CC BY 4.0** (Zenodo API `license.id` = `cc-by-4.0` verified 2026-09-15); code **Apache-2.0** (GitHub SPDX) | `appendicular_bones` labels: grouped `tarsal` / `metatarsal` / `phalanges_feet` (+ tibia/fibula). **No** named foot DI, nerves, ligaments, or per-ray MTA/digital arteries | **monitor** for osteology surface QA only. **reject** (DI / NV / per-ray MTA teaching) |
| **39** | **HRA / CCF 3D Reference Object Library** (HuBMAP) | https://github.com/hubmapconsortium/ccf-3d-reference-object-library · https://humanatlas.io/3d-reference-library | **CC BY 4.0** (README badge + GitHub SPDX `CC-BY-4.0` verified 2026-09-15) | Whole-body VH Male/Female united GLB reference objects — organ/CCF scale; **no** curated right-foot DI or named per-ray foot vessel pack identified | **UX-borrow** / process (CC BY whole-body honesty). **reject** as foot soft-tissue mesh source |
| **40** | **Foot shape-function model data** (Schuster) | Zenodo DOI **10.5281/zenodo.10360304** | **CC0** (Zenodo API `license.id` = `cc-zero` verified 2026-09-15) | External foot-surface PLY cohort (shape–function study) — **not** named intrinsic muscles / NV / ligaments | **monitor** for plantar-surface / shape research only. **reject** (named soft-tissue teaching) |
| **41** | **NIH 3D — Anatomic Human Foot** (3DPX-015850) | https://3d.nih.gov/entries/15850/1 | **CC-BY-NC-SA** (NIH 3D API `metadata.license` verified 2026-09-15) | Designed foot **bones** (26/28 incl. sesamoids) — osteology only; **NC** clause blocks main tree | **reject** (NC + no DI/NV). Do not confuse with CC BY BP3D osteology already in tree |

### Related dig (not counted as new main-tree candidates)

| Project | License | Note |
|---------|---------|------|
| **Scan-the-World / Embodi3D — Muscles of the foot and ankle** (Zenodo 20228270 / 20231308 / 20231309 / 21527865) | **CC BY-NC-SA 4.0** (Zenodo API re-verified 2026-09-15) | Right foot/ankle muscle GLB from CT — **NC** reconfirm; still unsuitable for main tree (prior Week 2 Day 1 reject stands) |
| **UMLUB Sketchfab — Dorsal Interossei I–IV** | License **not** openly stated on oembed/model page (checked 2026-09-15); download/reuse terms unclear; may be hand DI | **reject** until a clear CC0/CC BY download path exists |
| **Forearm interosseous membrane CT models** (Carrillo; Zenodo 3725911) | **CC BY 4.0** | Wrong region (forearm IOM) — anatomy mismatch for foot DI |

### Outcome

- **0** new CC0/CC BY meshes integrated (DI still Open3D BY-SA; per-ray MTA still absent; no nerve/ligament main-tree replacement).
- Ceiling unchanged: prefer waiting for license-clean segmented sources over more SA volume.
- Methods polish this same pass (census + disclaimer + residual citations + license matrix) — see `docs/methods.md` / daily-log Day 4al.

**No finished-product claim.**

---

## Session additions (2026-09-15 · Day 4an — camera presets + dig)

### UX applied

| Change | Detail |
|--------|--------|
| **Camera view presets** | Layer panel: **默认 / 背侧 / 跖侧 / 内侧 / 外侧** (keys `1`–`5`). Midfoot target from BP3D bone centroids; full `maxPolarAngle` so plantar sole teaching works. |
| Source | **UX-borrow** (ideas only) from week-plan multi-view item + Open Anatomy Studio / Anatomy Atlas RU preset habit + FootNet multi-view naming — no third-party camera code copied. |
| Files | `src/lib/cameraPresets.ts` (+ vitest), `CameraPresetApply.tsx`, wired App / LayerToggles / Viewport |
| Screenshots | Pipeline multi-view expand → 9 shots (`06`–`09`) |

### NEW license-verified projects (≥3)

| # | Project | URL | License verified | Foot relevance | Decision |
|---|---------|-----|------------------|----------------|----------|
| **42** | **MedShapeNetCore** | Zenodo DOI **10.5281/zenodo.10609965** | Dataset **CC BY 4.0** (Zenodo API `license.id` = `cc-by-4.0` verified 2026-09-15) | NPZ packs: ToothFairy / thoracic aorta / teeth / pulmonary / FLARE / KiTS / FaceVR / coronary — **no** foot DI, nerve, ligament, or per-ray MTA pack in listed files | **monitor** for future organ search API only. **reject** (foot soft-tissue teaching) |
| **43** | **FootNet** (multi-view smartphone foot segmentation) | Zenodo DOI **10.5281/zenodo.20457252** · medRxiv 2026.07.15.26358117 | Dataset **CC BY 4.0** (Zenodo API verified 2026-09-15) | 191 image–mask pairs (dorsal/medial/plantar × L/R) — **2D** clinical smartphone segmentation, not named 3D meshes | **UX-borrow** (multi-view naming). **reject** as mesh source |
| **44** | **OpenSim ankle-foot musculoskeletal model** (Sikidar / Kalyanasundaram) | https://simtk.org/projects/ankle-foot | SimTK page lists **“License: Model”** — **not** a clear CC0/CC BY SPDX as of 2026-09-15 | Rich ligament/muscle DOF biomechanics model (CT/MRI-derived) — promising anatomy coverage **if** license clarifies | **reject until** explicit CC0/CC BY (or compatible) download terms; do not wire |

### Outcome

- **0** new CC0/CC BY meshes integrated (DI still Open3D BY-SA; per-ray MTA still absent).
- Camera presets + multi-view QA pack shipped; census unchanged **129/124**.
- **No finished-product claim.**

---

## Session additions (2026-09-15 · Day 4ap — teaching prefs persist + dig)

### UX applied

| Change | Detail |
|--------|--------|
| **localStorage teaching prefs** | Persist layer visibility, label density, sagittal clip on/off+position, last camera preset. Restore on load; corrupt/missing → defaults. SSR/test-safe (no `window` / storage throw → null). |
| Source | **UX-borrow** (ideas only) from Open Anatomy Studio local progress / favorites habit — no third-party code copied. |
| Files | `src/lib/teachingPrefs.ts` (+ vitest), wired `App.tsx` |
| Honesty | Prefs are teaching chrome only — **not** a clinical workstation profile / multi-user sync. |

### NEW license-verified projects (≥2)

| # | Project | URL | License verified | Foot relevance | Decision |
|---|---------|-----|------------------|----------------|----------|
| **45** | **Female Atlas** (HiMahendraBeniwal/female-atlas) | https://github.com/HiMahendraBeniwal/female-atlas | Code **MIT** (LICENSE + GitHub SPDX verified 2026-09-15); anatomy **CC BY 4.0** (README: HRA Female v1.5 + BodyParts3D) | Full-depth female explorer (incl. foot bones/muscles in MSK tables) — lineage overlaps BP3D/HRA already in tree; explode / system presets / zoom-to-cursor | **UX-borrow** (system presets + explode packing). **reject** as new foot soft-tissue source (same pool / no DI gap claim) |
| **46** | **Human Atlas** (slorksmo/Human-Atlas) · demo https://atlas.taim.best | https://github.com/slorksmo/Human-Atlas | Code **MIT** (LICENSE + GitHub SPDX verified 2026-09-15); anatomy **CC BY 4.0** (README: BP3D male + HRA female + Andreassen 2023 VHF lower-limb muscles DOI 10.1038/s41597-022-01905-2; Wikidata Arabic CC0) | EN/AR bilingual + RTL; honest gap-fill (borrowed male foot bones; VHF leg muscles fitted) — **no** curated right-foot DI/NV pack beyond BP3D/HRA | **UX-borrow** (bilingual/RTL + gap-fill honesty). **monitor** Andreassen VHF muscle STL set for future CC BY lower-limb QA. **reject** copying borrowed male foot bones as “female” teaching |

### Outcome

- **0** new meshes integrated; prefs persist shipped; census unchanged **129/124**.
- **No finished-product claim.**


---

## Session additions (2026-09-15 · Day 4aq — ontology expand + dig)

### Ontology map expand (code)

| Field | Detail |
|-------|--------|
| **File** | `src/lib/ontologyIds.ts` |
| **Sources** | `docs/terminology.md` (classic osteology FMA); `structures.json` TA2 in summaries; `public/models/right-foot/manifest.json` + `FootModel.tsx` BP/FMA for mesh-linked bones/muscles/vessels/ligaments |
| **Bones** | All **26** osteology entries now carry TA2 + BP; FMA filled from terminology (tarsals/MT/hallux) or manifest (digits II–V + sesamoid) — no invented codes |
| **Soft tissue** | Added citable FMA/BP for major wired muscles (UM/BP3D intrinsics, PI, DI grouped, lumbricals, EHB/FDMB/heads) and main vessels (incl. arch/arcuate/PTA/fibular FMA); long plantar FMA44249 |
| **Honesty** | Still sparse vs full `structures.json` (nerves/fine vessels/most BY-SA ligaments omit unknown schemes). Not TA2-complete soft tissue. |

### NEW license-verified projects (≥2)

| # | Project | URL | License verified | Foot relevance | Decision |
|---|---------|-----|------------------|----------------|----------|
| **47** | **Anatomy Viewer** (paulvanmetre/anatomy-viewer) | https://github.com/paulvanmetre/anatomy-viewer · demo https://paulvanmetre.github.io/anatomy-viewer/ | App **CC BY-SA 4.0** (README Licensing); BodyParts3D meshes **CC BY-SA 2.1 Japan** (Moerman mirror path — **not** LSDB Archive CC BY 4.0) | Upper-limb v0 (bones/muscles real BP3D; **schematic** vessels flagged in-app because BP3D lacks arm vessels) — **no** right-foot DI/NV pack | **UX-borrow** (schematic-vs-scanned honesty; layerable systems). **isolate-SA** / **reject** mixing Anatomography BY-SA 2.1 JP path into main-tree CC BY claim |
| **48** | **ANATOMED MCP** (pitfa19/anatomed-mcp) | https://github.com/pitfa19/anatomed-mcp · connector https://anatomed-mcp.vercel.app/mcp | Whole work **CC BY-SA 4.0** (LICENSE + README); models Z-Anatomy **CC BY-SA 4.0** ← BP3D **CC BY-SA 2.1 Japan** (NOTICE provenance) | Region-isolated R3F widget + MCP `show_anatomy_region`; hand/spine/nerve demos — **no** curated right-foot intrinsic soft-tissue pack claimed | **UX-borrow** (region cap / explicit decline of unavailable substructures). Meshes: **isolate-SA** only. **reject** for main-tree DI |

### Related dig (not counted as new main-tree candidates)

| Project | License | Note |
|---------|---------|------|
| AbUndMax/BodyParts3D_Anatomy_Explorer | **No SPDX / LICENSE file** (JavaFX course explorer; BP3D concept graph) | **monitor** until redistribution terms clear |
| Dare-MSA/body-anatomy-3d-viewer | CC BY-SA 4.0 | Fork of hpfrei (already #2) — not a new lineage |

### Outcome

- Ontology coverage expanded from cited in-repo sources only; **0** new meshes.
- **No finished-product claim.** Prefer LSDB Archive CC BY for main-tree BP3D; treat Anatomography BY-SA 2.1 JP mirrors as isolate-only.

---

## Session additions (2026-09-15 · Day 4at — ontology gaps + dig)

### Ontology map expand (code)

| Field | Detail |
|-------|--------|
| **File** | `src/lib/ontologyIds.ts` |
| **Coverage** | **126/129 (97.7%)** — was 107/129 (82.9%) |
| **Sources** | IFAA TA98 entity pages + section lists (TAH2142 A3 retinacula; TAH1564 A4 foot joints/ligaments; A12.3.11 veins; A04.7.02.065 opponens). Documented inline URL comments. |
| **Filled** | opponens; 4 named veins with TA98 A-codes; 5 retinacula; 3 Lisfranc-ish TMT groups; medial TC; talonavicular; intercuneiform IO/dorsal; dorsal cuneonavicular; deep transverse metatarsal |
| **Still empty** | `cervical_talocalcaneal_ligament` (no distinct TA98); `medial_plantar_veins` / `lateral_plantar_vein` (TNA U15825/U15824 only) |
| **Honesty** | Cited map only — **not** a finished ontology product. |

### NEW license-verified projects (≥2)

| # | Project | URL | License verified | Foot relevance | Decision |
|---|---------|-----|------------------|----------------|----------|
| **49** | **Human Atlas (undergravity fork)** | https://github.com/undergravity/human-atlas · demo https://human-atlas-2s7.pages.dev | Code **MIT** (LICENSE verified 2026-09-15; fork of ashemag); anatomy **CC BY 4.0** BodyParts3D 4.0 (README + ATTRIBUTION) | Same BP3D male pool already in tree — **no** new right-foot soft-tissue meshes. **Actionable UX borrow**: EN/ZH bilingual dict; **per-structure** hide/show (dissection habit); two-phase async load (skeleton+muscle first); PWA offline; dark mode + mobile gestures | **UX-borrow** (per-structure toggle + phased system load). **reject** as new foot mesh source |
| **50** | **Femora Atlas** (zer01dollars/female-body-atlas) | https://github.com/zer01dollars/female-body-atlas · demo https://zer01dollars.github.io/female-body-atlas/ | Code **MIT** (LICENSE verified 2026-09-15); geometry **CC BY 4.0** HuBMAP Female v1.5 united GLB (ATTRIBUTION.md + DOI 10.48539/HBM352.BTSQ.586); FMA naming enrichment from BP3D parts list (CC BY) — **does not** ship BP3D male meshes | Female whole-body explorer (888 meshes); FMA-enriched search — **no** curated right-foot DI/NV/ligament pack beyond HRA/BP3D naming | **UX-borrow** (FMA-enriched search; Meshopt+simplify pipeline notes). **monitor** HuBMAP female foot coverage vs our BP3D male foot. **reject** copying united female GLB as right-foot teaching substitute |

### Outcome

- Ontology coverage **126/129**; **0** new meshes; **3** honest empties remain.
- **No finished-product claim.** Prefer IFAA entity FMA/TA over inventing codes for TNA-only veins / cervical synonym.

---

## Session additions (2026-09-15 · Day 4au — per-structure hide UX + dig)

### UX borrow (code)

| Field | Detail |
|-------|--------|
| **Source idea** | undergravity/human-atlas per-structure hide/show (dissection habit) — already logged as #49 |
| **Implementation** | `src/lib/structureVisibility.ts`; StructurePanel hide chip; App chip bar; FootModel skip; keyboard **X** |
| **Honesty** | Teaching dissection aid — **not** a finished visibility product. Independent of isolate / layer toggles. |

### NEW license-verified projects (≥2)

| # | Project | URL | License verified | Foot relevance | Decision |
|---|---------|-----|------------------|----------------|----------|
| **51** | **Human Atlas XR** (sourabhsoni0104/human-atlas-xr) | https://github.com/sourabhsoni0104/human-atlas-xr · demo https://human-atlas-zeta.vercel.app | Code **MIT** (LICENSE file verified 2026-09-15; copyright ashemag); anatomy **CC BY 4.0** BodyParts3D 4.0 (README) | Quest / WebXR passthrough lab on same BP3D male pool — **no** new right-foot soft-tissue meshes | **UX-borrow** (shared anatomy state across desktop+XR; spatial select). **reject** as new foot mesh source |
| **52** | **Orthopaedic Trauma Atlas** (TUANZIDING/orthopaedic-trauma-atlas) | https://github.com/TUANZIDING/orthopaedic-trauma-atlas · demo https://tuanziding.github.io/orthopaedic-trauma-atlas/ | Code **MIT** (LICENSE verified 2026-09-15); anatomy subset **CC BY 4.0** BodyParts3D 4.0 (ATTRIBUTION.md — pelvis/hip extract) | Modules include **calcaneal traction** teaching (neurovascular risk overlays) — procedure atlas, **not** a right-foot intrinsic soft-tissue pack | **UX-borrow** (NV risk colour + hide-bone-occlusion habit). **reject** as DI/NV teaching mesh source (wrong scope; same BP3D pool) |

### Related dig (not counted as new main-tree candidates)

| Project | License | Note |
|---------|---------|------|
| Mohit-Nanda-Krishna/AnatomyAtlas | Geometry **CC BY-SA 4.0** (public/ATTRIBUTION.txt; BP3D BY-SA 2.1 JP + Z-Anatomy); code license unset via API | Full-body workstation with hide/isolate/clip — **isolate-SA** / monitor code SPDX |
| calvinyu94-debug/mvmt-anatomy | Z-Anatomy inventory + licence EXCLUSIONS (no app SPDX yet) | Rigorous SA exclusion discipline — **monitor** |
| husam05/husam-body-atlas | License unset; identifiable patient CT/report content | **reject** (privacy + unclear redistribution) |
| maruakshay/eye-anatomy | No LICENSE file; procedural geometry | **monitor** until SPDX clear |

### Outcome

- UX: per-structure hide beyond isolate. Dig: **2** new license-verified projects (#51–52). **0** new meshes.
- **No finished-product claim.** No SA mesh spam.


---

## Session additions (2026-09-15 · Day 4av — hide persist + Esc policy + dig)

### UX applied

| Change | Detail |
|--------|--------|
| **Persist hidden structure ids** | `teachingPrefs.hiddenStructureIds` in same localStorage envelope as layers / label density / clip / camera; restore on App boot; corrupt/missing → `[]`. |
| **Esc clear policy** | Esc closes help first; else clears selection + isolate + search. **Does not** clear per-structure hides (persist across reload). Clear via chip bar / Restore all / `X`. Documented in `keyboardHelp.ts`, interaction-qa, footer tip. |
| Source | Continues Day 4ap prefs + Day 4au hide — Open Anatomy Studio local-progress habit + undergravity dissection hide (ideas only). |
| Files | `src/lib/teachingPrefs.ts` (+ vitest), `App.tsx`, `keyboardHelp.ts` |
| Honesty | Teaching chrome only — **not** a clinical workstation profile / multi-user sync. |

### NEW license-verified projects (≥2)

| # | Project | URL | License verified | Foot relevance | Decision |
|---|---------|-----|------------------|----------------|----------|
| **53** | **MnemoAtlas** (Mnemosyne-OS/MnemoAtlas) | https://github.com/Mnemosyne-OS/MnemoAtlas | Code **MIT** (LICENSE verified 2026-09-15; ashemag viewer + Mnemosyne cartridge port); anatomy **CC BY 4.0** BodyParts3D + HRA Female v1.5 (NOTICE.md) | Offline Mnemosyne OS cartridge: FMA-indexed memory panel + Leitner revision runs against loaded atlas — same BP3D/HRA pools; **no** new right-foot DI/NV pack | **UX-borrow** (FMA-as-memory-key + spaced revision against live mesh). **reject** as new foot mesh source |
| **54** | **Human Atlas AR** (maghrebme/human-atlas-ar) · جسم الإنسان | https://github.com/maghrebme/human-atlas-ar | Code **MIT** (LICENSE verified 2026-09-15; ashemag derivative); anatomy **CC BY 4.0** BodyParts3D 4.0 (`public/ATTRIBUTION.md` verified 2026-09-15) | Arabic-first RTL UI + bilingual search + intro lessons/quizzes on same BP3D male pool — **no** curated right-foot soft-tissue pack | **UX-borrow** (RTL + diacritic-tolerant search + lesson/quiz shell). **reject** as new foot mesh source |

### Outcome

- Hidden ids persist with teaching prefs; Esc policy documented. Dig: **2** new projects (#53–54). **0** new meshes.
- **No finished-product claim.** No SA mesh spam.

---

## Session additions (2026-09-15 · Day 4ay — CC0 soft-tissue watchlist dig)

### Target (phase-7 #3)

Active dig against `docs/cc0-soft-tissue-watchlist.md`: re-verify monitor/reject licenses; hunt new CC0/BY packs for DI / per-ray MTA / gastroc·soleus / nerve·ligament main-tree replacements. **0 integrate** unless clear CC0/BY hit **and** spatial-QA ready. Prefer quality over SA spam / rushed wire.

### License re-verification (prior watchlist rows)

| Source | API / page check (Day 4ay) | Status |
|--------|----------------------------|--------|
| #38 TotalSegmentator CT Zenodo 22688904 | `license.id` = `cc-by-4.0` | unchanged **monitor** bones / **reject** soft NV |
| #40 Schuster Zenodo 10360304 | `license.id` = `cc-zero` | unchanged **monitor** surface / **reject** named soft |
| #42 MedShapeNetCore Zenodo 10609965 | `license.id` = `cc-by-4.0` | unchanged **monitor** / **reject** foot soft |
| #43 FootNet Zenodo 20457252 | `license.id` = `cc-by-4.0` | still 2D masks only |
| Scan-the-World / Embodi3D Zenodo 20228270 · 20231308 · 21354714 · 21527865 | `cc-by-nc-sa-4.0` | **reject** NC reconfirm |
| **#46 Andreassen VHF/VHM STLs** Digital Commons `visiblehuman/2` | Page **CC BY 4.0** + package README (Day 4az download) | Day **4az**+**4ba** Kabsch — **blocked** (`le_kabsch_option_a_trials.json`); **0 wire**; still **reject** DI/NV |

### NEW license-verified projects (≥3)

| # | Project | URL | License verified | Foot relevance | Decision |
|---|---------|-----|------------------|----------------|----------|
| **55** | **Grant et al. foot bone SSMs** | Zenodo DOI **10.5281/zenodo.3464747** | **CC BY 4.0** (Zenodo API `cc-by-4.0` Day 4ay) | 125 STLs: talus / calcaneus / midfoot / 1st MT cohorts — **0** soft files | **monitor** osteology SSM QA. **reject** soft DI/NV/MTA |
| **56** | **FOAMRIS** Foot OA MRI Score atlas | Leeds DOI **10.5518/1568** | **CC BY 4.0** (repository license block Day 4ay) | 37 MB **PDF** imaging scoring atlas — not elemental 3D soft meshes | **reject** mesh integrate (teaching MRI reference only if ever cited) |
| **57** | **TotalSegmentator MRI dataset** | Zenodo DOI **10.5281/zenodo.22688334** | **CC BY 4.0** (Zenodo API Day 4ay) | 50 MRI regions; `appendicular_bones` still grouped tarsal/metatarsal/phalanges_feet; `thigh_shoulder_muscles` lacks gastroc/soleus/foot DI | **monitor** catalog. **reject** DI/NV/per-ray MTA / belly source |

### Related dig (not new main-tree candidates)

| Project | License | Note |
|---------|---------|------|
| Sheffield ORDA / Figshare older-women LE muscles (9934055) | **CC BY-NC 4.0** (Figshare API Day 4ay) | NC — **reject** |
| OpenGameArt Foot Base Model (Vinrax) | CC0 / CC-BY 3.0 | Game **skin** foot — **reject** named soft teaching |

### Outcome

- Watchlist refreshed (`docs/cc0-soft-tissue-watchlist.md`); Andreassen belly path documented as clear CC BY **candidate** only.
- **0** meshes integrated; DI / per-ray MTA / nerve·ligament main-tree replacements still **dry**.
- Cloud Agent handback note updated for Andreassen Kabsch resume (phase-7).
- **No finished-product claim.** No SA mesh spam.


## Day 4az — Andreassen belly Kabsch blocker (2026-09-15)

Downloaded VHM Final STLs (CC BY 4.0). Foot-tarsal Kabsch mean residual ≈2.3 mm but gastroc/soleus fail BP3D laterality / padded-AABB QA. Transform + QA JSON under `third_party/andreassen/`. **0** meshes integrated. **No finished-product claim.**

## Day 4ba — Option A LE Kabsch blocker + handback doc (2026-09-15)

- Real BP3D tibia/fibula/patella/femur from local cache + VH bones; **0** integrate.
- Handback brief: `docs/cloud-agent-handback.md`.


## Session additions (2026-09-15 · Day 4bb — open mining ≥3 NEW; Andreassen skipped)

### Target (phase-7 / handback priority #1 alternate)

Active open mining for **new** license-verified projects beyond #57. **Skip** Andreassen gastroc/soleus Kabsch this pass (Day 4az+4ba exhausted). Prefer CC0/BY soft finds for DI / per-ray MTA / nerve·ligament main-tree; otherwise log UX-borrow / monitor / reject honestly. **0 integrate** unless clear CC0/BY **and** spatial-QA ready.

### NEW license-verified projects (≥3)

| # | Project | URL | License verified | Foot relevance | Decision |
|---|---------|-----|------------------|----------------|----------|
| **58** | **OMFAtlas** (choxos/OMFAtlas) · demo https://omfatlas.xera.ac | https://github.com/choxos/OMFAtlas | Code **MIT** (`LICENSE` verified 2026-09-15); BodyParts3D 4.0 **CC BY 4.0**; adapted BP3D 3.0 facial meshes retain **CC BY-SA 2.1 JP**; dental packs mixed CC BY / **CC BY-NC-SA** / **CC BY-SA** (README + `public/models/dental/ATTRIBUTION.md`) | Head/neck + oral/maxillofacial explorer — **no** right-foot DI/NV pack. Strong **schematic anatomy** honesty: 77 drawn NV/gland/sinus structures labeled schematic, one switch turns the set off, tests pin bone-anchoring rules | **UX-borrow** (schematic-vs-source toggle + anchoring tests + NC/SA dental boundary discipline). **reject** as foot mesh source; **reject** NC dental packs for main tree |
| **59** | **Anatria-3D** (Nurkan1/Anatria-3D) | https://github.com/Nurkan1/Anatria-3D | Code **Apache-2.0** (`LICENSE` verified 2026-09-15); male atlas **CC BY-SA 4.0** (Z-Anatomy ← BP3D BY-SA 2.1 JP); female atlas **CC BY 4.0** (HRA united-female v1.5) — `NOTICE` + `THIRD-PARTY-NOTICES.txt` keep SA and BY **unmerged** | Local-first Tauri atlas + AI tutor that drives the viewport; male = ZA/BP3D pool already known; female = HRA organs (no skeletal muscle / peripheral nerve). **No** curated right-foot DI/per-ray MTA pack | **UX-borrow** (tutor→viewport pin; dual-license file separation; About/footer honesty). Male meshes: **isolate-SA** only. **reject** copying united HRA/ZA as right-foot soft substitute |
| **60** | **Open Anatomy Explorer (OPANEX)** (biocat-ugent/Open-Anatomy-Explorer) | https://github.com/biocat-ugent/Open-Anatomy-Explorer · https://opanex.discover.ilabt.imec.be · JVCM 2024 DOI 10.1080/17453054.2024.2446764 | Platform code **Apache-2.0** (`LICENSE` verified 2026-09-15); published models are **per-upload** institute content (not a bundled CC0/BY foot soft pack) | Student + instructor UIs; upload/label/quiz/share 3D models across institutes — teaching workflow platform, **not** an elemental right-foot soft-tissue library | **UX-borrow** (instructor/student split; quiz-on-labeled-mesh; import/export library habit). **monitor** if any future OPANEX-shared foot soft pack states clear CC0/BY. **reject** assuming platform = mesh source |
| **61** | **Imperial College London femur + tibia surface mesh set** | Zenodo DOI **10.5281/zenodo.167808** | **CC BY 4.0** (Zenodo API `license.id` = `cc-by-4.0` verified 2026-09-15) | MRI-segmented L/R femur + tibia/fibula surface meshes (35 volunteers) — **LE osteology only**; **0** soft/muscle/NV files | **monitor** for LE bone registration / proportion research (docs-only). **reject** soft DI/NV/MTA / belly teaching. **Not** a Kabsch retry this pass |

### Related dig (not counted as new main-tree soft candidates)

| Project | License | Note |
|---------|---------|------|
| DrMuratAltun/anatomi-simulatoru | Code **MIT**; `systems/*.glb` **CC BY-SA 4.0** (Z-Anatomy ← BP3D) | Turkish full-body browser simulator — UX-borrow TR UI; meshes **isolate-SA** / same ZA pool |
| atultiwari/sushruta-anatomy | App source **All rights reserved** (Vedant); `assets/` **CC BY-SA 4.0** (ZA/BP3D/Anatomed/Anatria lineage) | Local-first study assistant — **reject** app code reuse; assets **isolate-SA** only if ever considered |
| JohanBellander/BodyExplorer · menoc61/x-anatomy · jixiangying/anatomy | No clear root SPDX / unset | BP3D explorers — **monitor** until LICENSE file present |
| skaiy/Wild-human-atlas | **MIT** (ashemag fork rename) | Same BP3D pool — not a new lineage beyond prior Human Atlas forks |

### Soft-gap check (DI / per-ray MTA / nerve·ligament main-tree / bellies)

| Gap | Day 4bb result |
|-----|----------------|
| Dorsal interossei CC0/BY | **Still dry** — no new elemental DI pack |
| Per-ray MTA / digitals | **Still dry** — pressure / kinematics / hallux datasets only |
| Nerve / ligament main-tree CC0/BY | **Still dry** — Day 4bc shipped OMFAtlas schematic-vs-source honesty UX (panel+footer); mesh gap unchanged |
| Gastroc/soleus | Andreassen still **blocked (alignment)** — **no** Kabsch this pass |

### Outcome

- Learning log **#58–#61** added; census unchanged (**129/124**; ontology **126/129**).
- **0** meshes integrated; **0** SA spam; Andreassen track not re-opened.
- **No finished-product claim.**

## Day 4bc (2026-09-15) — OMFAtlas schematic-vs-source honesty UX + dig #62

### UX borrow shipped (from #58 OMFAtlas)

OMFAtlas labels drawn NV/gland/sinus structures as **schematic** wherever named and keeps source meshes distinct. Foot atlas adaptation (small, tested):

| Piece | Location |
|-------|----------|
| Classifier | `src/lib/schematicHonesty.ts` — kinds: `by-sa` · `grouped` · `additional-part` · `placeholder` · `pathway-schematic` (ZA CURVE trunks = placeholder-adjacent) |
| Tests | `src/lib/schematicHonesty.test.ts` (8 cases) |
| StructurePanel | Badge row + short teaching disclaimer when selected structure matches any kind |
| Footer | Compact `示意≠来源` chips when selection has honesty kinds |

**Honesty**: Teaching chrome only — **not** a finished atlas / clinical product. **0** new meshes; **0** SA spam; Andreassen not re-opened.

### NEW dig #62

| # | Project | URL | License verified | Foot relevance | Decision |
|---|---------|-----|------------------|----------------|----------|
| **62** | **HRA UI** (hubmapconsortium/hra-ui) · apps https://apps.humanatlas.io/ | https://github.com/hubmapconsortium/hra-ui | Code **MIT** (`LICENSE` + `package.json` `"license": "MIT"` verified 2026-09-15); anatomy/reference objects remain **CC BY 4.0** HRA/CCF (same lineage as learning-log #39) | Monorepo of HRA apps (EUI · RUI · ASCT+B · FTU · organ info · medical illustration). Organ/ASCT+B scale — **no** curated right-foot DI / per-ray MTA soft pack | **UX-borrow** (registration UI / FTU explorer / organ-info chrome patterns). **reject** as foot soft-tissue mesh source (same HRA organ pool) |

### Soft-gap check

| Gap | Day 4bc |
|-----|---------|
| DI / per-ray MTA / nerve·ligament CC0/BY | **Still dry** |
| Gastroc/soleus | Andreassen **blocked** — skipped |

### Outcome

- Schematic-vs-source honesty UX live; learning log **#62** added; census unchanged (**129/124**; ontology **126/129**).
- **0** meshes; **no finished-product claim.**


---

## Session additions (2026-09-15 · Day 4be — ontology honest-empty UX + dig ≥3)

### Teaching polish (expert-review checklist A · sparse ontology honesty)

| Change | Detail |
|--------|--------|
| **Honest ontology empty note** | StructurePanel shows a dashed **Ontology (honest empty)** block when the selected structure has no citable TA2/FMA/BP — with named reasons for the three known empties |
| Source | Expert-review checklist §A (“do not invent IDs”); ideas only — no third-party UI code |
| Files | `src/lib/ontologyIds.ts` (`HONEST_ONTOLOGY_EMPTIES` + `getHonestOntologyEmptyReason`) · `StructurePanel.tsx` · vitest |
| Honesty | Teaching chrome only — **not** TA2-complete soft tissue / finished ontology product |

### NEW license-verified projects (≥3)

| # | Project | URL | License verified | Foot relevance | Decision |
|---|---------|-----|------------------|----------------|----------|
| **63** | **Utah Hive — Dual Fluoroscopy / Ankle Arthrodesis Compensation** (Anderson / Lenz / Nichols / Roach / Lisonbee) | https://hive.utah.edu/concern/datasets/bv73c051k · record https://hive.utah.edu/records/fmfxm-02c03 · DOI **10.7278/S5d-1nqg-0fqd** | **CC BY 3.0** (Hive API `rights.id` = `cc-by-3.0` + README “CC BY”; re-verified Day **4bf**) | Foot/ankle **CT** (.nii) + surface STLs: tibia–talus **fused** construct, distal tibia, talus, calcaneus + rigid-body transforms — **osteology / kinematics only**, **0** named soft DI/NV/ligament | **reject** main-tree bone replace **and** soft teaching (Day **4bf** deep assess). Optional docs-only kinematics cite |
| **64** | **Foot3D** (OllieBoyne/Foot3D · Cambridge) | https://github.com/OllieBoyne/Foot3D · FIND project https://ollieboyne.github.io/FIND/ | Software/repo **MIT** (`LICENSE` verified 2026-09-15); mesh/multiview packs are **form-gated** and README License section is a warranty disclaimer — **not** a clear CC0/CC BY mesh grant | 118 high-res scanned **skin/surface** feet + multiview pairs — reconstruction research, **no** named intrinsic muscles / nerves / vessels | **UX-borrow** / process (citation habit). **monitor** until mesh redistribution SPDX is explicit. **reject** named soft-tissue teaching |
| **65** | **Anatomy Insight** (shaikhmohammadtalha/android-anatomy-insight) | https://github.com/shaikhmohammadtalha/android-anatomy-insight | Code **Apache-2.0** (`LICENSE` + badge verified 2026-09-15); 3D models **CC BY-SA 4.0** (Z-Anatomy — README Attributions); educational text cites **OpenStax Anatomy & Physiology CC BY 4.0** | Android Filament viewer (6 region packs / ~2300 subparts) — same ZA/BP3D soft lineage; **no** new CC0/BY right-foot DI pack | **UX-borrow** (mobile Filament / Room catalog). Meshes: **isolate-SA** only. **reject** as main-tree soft source |

### Soft-gap check

| Gap | Day 4be |
|-----|---------|
| DI / per-ray MTA / nerve·ligament CC0/BY | **Still dry** |
| Gastroc/soleus | Andreassen **blocked** — **skipped** |
| New osteology CC BY | Utah Hive tibia/talus/calcaneus — **reject** main-tree (Day 4bf assess) |

### Outcome

- Learning log **#63–#65**; ontology honest-empty panel live; census unchanged (**129/124**; ontology **126/129**).
- **0** meshes integrated; **0** SA spam; Andreassen not re-opened.
- **No finished-product claim.**


---

## Session additions (2026-09-15 · Day 4bf — Utah Hive bone assess + grouped label polish)

### Utah Hive (#63) deep assess vs BP3D main-tree bones

| Criterion | Finding |
|-----------|---------|
| **License** | **CC BY 3.0** clear (Hive `rights.id` + README) — **not** the blocker |
| **Contents** (readme `ANDERSON_readme20260127.txt`) | Per-subject CT + STLs: **Fusion** (tibia–talus arthrodesis construct), distal **tibia**, **talus**, **calcaneus** only; landmarks + fluoroscopy transforms. **0** midfoot / MT / phalanx; **0** soft DI/NV/ligament |
| **vs BP3D osteology** | Atlas already **26/26** complete (BP3D CC BY 4.0 single-donor frame). Hive does **not** fill a bone gap |
| **Teaching value** | Treated limbs = **pathologic/surgical fusion** — wrong for normal-anatomy teaching. Distal tibia outside foot-scoped atlas. Multi-subject L/R clinical CT native frames ≠ BP3D teaching frame (would need Kabsch with no soft benefit) |
| **Practical** | Zip ≈ **8.7 GB** — disproportionate for zero main-tree gain |
| **Decision** | **reject** integrate (main-tree bones + soft). Do **not** download zip this pass. Keep log cite for kinematics research only |

### Teaching polish (expert-review checklist §A · grouped / approx labels)

| Change | Detail |
|--------|--------|
| **nameZh （组合）** | 9 ontology-`grouped` structures that lacked 组合/分组 in the Chinese label now include **（组合）** (sesamoids, DI, common plantar digitals, dorsal digitals n., plantar digital aa./vv., perforating rr.) |
| Ligaments | Already used **（分组）** — left as-is (matches grouped honesty) |
| Vitest | `ontologyIds.test.ts` asserts every ontology note with `/group/i` has 组合 or 分组 in `nameZh` |
| Honesty | Label chrome only — **not** elemental per-ray / TA2-complete soft claim |

### Soft-gap check

| Gap | Day 4bf |
|-----|---------|
| DI / per-ray MTA / nerve·ligament CC0/BY | **Still dry** |
| Gastroc/soleus | Andreassen **blocked** — **skipped** |
| Utah Hive bones | **reject** (see above) |

### Outcome

- Learning log **#63** deepened to **reject** main-tree; watchlist reject row added.
- Grouped label polish live; census mesh/ontology counts **unchanged** (**129/124**; ontology **126/129**).
- **0** meshes integrated; **0** SA spam; Andreassen not re-opened.
- **No finished-product claim.**

---

## Session additions (2026-09-15 · Day 4bg — lazy layer load progress + dig ≥3)

### Teaching polish (loading progress for lazy layers)

| Change | Detail |
|--------|--------|
| **Layer load progress** | When visibility-gated soft layers fetch GLBs, a bilingual overlay shows percent + optional layer chip (muscle/nerve/vessel/ligament/bone) via drei `useProgress` |
| Suspense | `Viewport` wraps `FootModel` in `<Suspense fallback={null}>` so DefaultLoadingManager drives the chrome |
| Source | undergravity/human-atlas two-phase system-load habit (ideas only) — no third-party UI code |
| Files | `src/lib/layerLoadProgress.ts` (+ vitest) · `src/components/LayerLoadProgress.tsx` · `Viewport.tsx` · `App.tsx` |
| Honesty | Asset-fetch chrome only — **not** a clinical workstation / finished product claim |

### NEW license-verified projects (≥3)

| # | Project | URL | License verified | Foot relevance | Decision |
|---|---------|-----|------------------|----------------|----------|
| **66** | **Henson et al. — Augmented lower-limb MR muscle segmentations** (Sheffield ORDA/Figshare) | DOI **10.15131/shef.data.20440203** · companion MR volumes **10.15131/shef.data.20440164** | Figshare API `license.name` = **CC0** verified 2026-09-15 (both records) | 69 DICOM label volumes · **37** LE muscle class IDs incl. gastroc med/lat, soleus, FDL/FHL/EDL/EHL, peronei, tib ant/post — **MRI masks**, not elemental foot DI/NV surface GLBs; **0** intrinsic DI / plantar nerve packs | **monitor** for extrinsic-belly / LE soft research (docs-only). **reject** as ready main-tree teaching mesh substitute. Distinct from NC STL pack **9934055** (already rejected) |
| **67** | **Lower Limb Visualiser** (lauracarman/llbone_measurement_visualiser · Univ. Auckland eResearch) | https://github.com/lauracarman/llbone_measurement_visualiser | Code **MIT** (`LICENSE` copyright University of Auckland, Center for eResearch — verified 2026-09-15) | PyVista paediatric **pelvis / femur / tibia–fibula** landmark + measurement visualiser — **LE osteology tooling**, **0** named foot soft DI/NV | **UX-borrow** (measurement / landmark teaching chrome). **reject** as right-foot soft-tissue mesh source |
| **68** | **CEINMS-RT LowerLimbModel** | https://github.com/CEINMS-RT/LowerLimbModel · locomotion data DOI **10.5281/zenodo.6457662** | Code **Apache-2.0** (GitHub SPDX + LICENSE verified 2026-09-15); Zenodo locomotion pack `access_right=open` but **no** `license.id` on record API this pass | OpenSim-style **MSK path** model (tib_ant, soleus, med/lat gastroc, quads, hamstrings) + EMG/kinetic trials — **simulation lines**, not atlas surface meshes | **UX-borrow** / process (MSK path honesty). **reject** soft surface teaching; do **not** treat as Andreassen belly substitute. Zenodo data: **monitor** until SPDX clear |

### Soft-gap check

| Gap | Day 4bg |
|-----|---------|
| DI / per-ray MTA / nerve·ligament CC0/BY | **Still dry** |
| Gastroc/soleus | Henson **CC0 masks** are a **monitor** research lead (not GLB-ready); Andreassen **blocked** — **skipped** |
| Utah Hive bones | Still **reject** (Day 4bf) — not re-opened |

### Outcome

- Learning log **#66–#68**; lazy layer load progress live; census unchanged (**129/124**; ontology **126/129**).
- **0** meshes integrated; **0** SA spam; Andreassen not re-opened; Utah not integrated.
- **No finished-product claim.**

---

## Session additions (2026-09-15 · Day 4bh — Auckland view-reset UX + Henson path + dig ≥2)

### Teaching polish (ONE UX borrow from #67 Auckland LL Visualiser)

| Change | Detail |
|--------|--------|
| **View reset affordance** | Bilingual **复位视角 · Reset view** button under camera presets; keys **0** / **Home** re-apply the *active* teaching preset after free orbit/pan |
| Source | Auckland Lower Limb Visualiser measurement / home-camera habit (**ideas only**) — MIT code not copied |
| Files | `src/lib/cameraPresets.ts` (`isViewResetKey`) · `LayerToggles.tsx` · `App.tsx` · `keyboardHelp.ts` (+ vitest) |
| Honesty | Teaching chrome only — **not** clinical navigation / finished product |

### Henson Sheffield path (#66 deepen — docs only)

See `docs/cc0-soft-tissue-watchlist.md` § Henson Sheffield CC0 DICOM path. ORDA URLs + CC0 + class IDs 10/11/31 + why monitor + next marching-cubes research step. **0** GLB wire.

### NEW license-verified projects (≥2)

| # | Project | URL | License verified | Foot relevance | Decision |
|---|---------|-----|------------------|----------------|----------|
| **69** | **DeepACSA training images** (RF / VL / GM·GL ultrasound + binary masks) | https://doi.org/10.5281/zenodo.5799204 | Zenodo API `license.id` = **cc-by-4.0** verified 2026-09-15 | 2D US CSA images/masks for rectus femoris, vastus lateralis, gastroc med/lat — **not** 3D foot soft surface meshes | **reject** teaching GLB; optional US research only |
| **70** | **Welte et al. — Plantar fascia extensibility / windlass running** (Dryad) | https://doi.org/10.5061/dryad.v9s4mw6sz | DataCite SPDX **cc0-1.0** verified 2026-09-15 | MATLAB scripts + biomechanics timeseries for PF windlass — **0** STL/OBJ/GLB fascia mesh | **reject** soft teaching mesh; biomechanics reference only |

### Soft-gap check

| Gap | Day 4bh |
|-----|---------|
| DI / per-ray MTA / nerve·ligament CC0/BY | **Still dry** |
| Gastroc/soleus | Henson path **documented** (monitor); Andreassen **skipped** |
| Utah Hive | Still **reject** — not re-opened |

### Outcome

- View-reset UX live; Henson watchlist path expanded; learning log **#69–#70**.
- Census unchanged (**129/124**; ontology **126/129**).
- **0** meshes integrated; **0** SA spam; Andreassen not re-opened; Utah not integrated.
- **No finished-product claim.**


## Session additions (2026-09-15 · Day 4bi — Sheffield sandbox feasibility + dig ≥3)

### Sheffield sandbox feasibility (#66 deepen — docs + metadata)

See `docs/henson-sheffield-sandbox-feasibility.md`. Figshare API: **no** small DICOM sample; min label volume ≈**76.4 MB**; full labels **5.65 GB** unnecessary for one-subject MC POC. Fetched only readmes + MIT `multi_atlas_segmentation.m` into `third_party/henson-sheffield/` (**0** `.dcm`). **0** GLB wire.

### Expert-review remaining (Chinese hallux)

Spot-check `structures.json`: **0** `拇` (thumb) tokens; **9** `踇` hallux names (bones + FHL/EHL/AH/FHB/AdH/EHB). No left-foot / `左` / sinister ids. Checklist §A Chinese Names checkbox updated.

### NEW license-verified projects (≥3)

| # | Project | URL | License verified | Foot relevance | Decision |
|---|---------|-----|------------------|----------------|----------|
| **71** | **Henson multi-atlas registration code** (Sheffield ORDA) | DOI **10.15131/shef.data.21763982** | Figshare API `license.name` = **MIT** verified 2026-09-15 | MATLAB multi-atlas fusion for LE muscle labels — tooling for #66 sandbox, **not** surface GLBs | **UX-borrow** / process (sandbox recipe). **reject** teaching mesh |
| **72** | **Henson registration inputs** (dual RGB DICOM + blue-channel segs) | DOI **10.15131/shef.data.21739733** | Figshare API = **CC0** verified 2026-09-15 | 20 × ~160 MB registration volumes; class map 1–34 (incl. gastroc/soleus) — still masks, not foot DI/NV meshes | **monitor** with #66 sandbox. **reject** ready GLB; do **not** pull full pack this pass |
| **73** | **VSDFullBodyBoneModels** (MCM-Fischer) | https://github.com/MCM-Fischer/VSDFullBodyBoneModels · Zenodo **10.5281/zenodo.8316730** | README: MAT/XLSX **CC BY-NC-SA 4.0**; code **EUPL v1.2** | 30-subject LE **bone** MAT/PLY surfaces (pelvis→foot) — osteology only; **NC** on meshes | **reject** (NC) for main tree. **reject** soft DI/NV |
| **74** | **UltraBonesHip** (luohwu) | https://huggingface.co/datasets/luohwu/UltraBonesHip | HF card `license` = **cc-by-nc-4.0** verified 2026-09-15 | Hip CT–US femur/pelvis — **not** foot soft; **NC** | **reject** (NC) |
| **75** | **auto-lowerlimb-models-paper** (modenaxe) | https://github.com/modenaxe/auto-lowerlimb-models-paper | Repo **Apache-2.0** (`LICENSE.txt` verified 2026-09-15); companion STAPLE toolbox is **CC BY-NC 4.0** (separate) | OpenSim LE bone geometries + STAPLE workflows (talus/calcaneus/foot bones) — **0** named intrinsic soft meshes | **monitor** osteology/OpenSim process. **reject** soft teaching GLB; do **not** pull STAPLE NC code into main tree |
| **76** | **msk-STAPLE** (modenaxe) | https://github.com/modenaxe/msk-STAPLE · Zenodo 10.5281/zenodo.4428103 | README badge + LICENSE = **CC BY-NC 4.0** verified 2026-09-15 | Automatic personalised LE skeletal modelling from bone surfaces | **reject** (NC) |

### Soft-gap check

| Gap | Day 4bi |
|-----|---------|
| DI / per-ray MTA / nerve·ligament CC0/BY | **Still dry** |
| Gastroc/soleus | Henson sandbox **feasible ~80–160 MB** (docs); Andreassen **skipped** |
| Utah Hive | Still **reject** — not re-opened |

### Outcome

- Feasibility note + Henson metadata in tree; learning log **#71–#76**; expert-review 踇 spot-check.
- Census unchanged (**129/124**; ontology **126/129**).
- **0** meshes integrated; **0** SA spam; Andreassen not re-opened; Utah not integrated.
- **No finished-product claim.**


## Session additions (2026-09-15 · Day 4bj — Henson Aug_8 MC POC)

### Option A executed (#66 deepen)

| Step | Result |
|------|--------|
| Download | `Aug_8_segmentations.dcm` ~73 MB (CC0) — gitignored |
| MC | gastroc lat/med + soleus OK → gitignored `poc/meshes/` |
| BP3D align sketch | **FAIL** Achilles continuity (see `poc_spatial_qa.json`) |
| Wire | **0** — monitor only |

No new dig IDs this pass (Option A focus). Soft gaps still **dry**. Andreassen **skipped**. **No finished-product claim.**


## Session additions (2026-09-18 · Day 4bk — CC0 soft dig #77+ + belly registration research)

### Context

Cloud Agent quota still exhausted; local docs-only takeover. Soft-gap dig for DI / per-ray MTA / nerve·ligament CC0/BY + belly registration notes. **0** mesh wire. **No finished-product claim.**

### NEW license-verified projects (≥3; #77–#83)

| # | Project | URL / DOI | License verified | Foot relevance | Decision |
|---|---------|-----------|------------------|----------------|----------|
| **77** | **LEG-3D-US** (TUM CAMPAR) | https://www.cs.cit.tum.de/en/camp/publications/leg-3d-us-dataset/ · code https://github.com/Al3xand1a/segmentation-border-analysis | Dataset page **GNU GPL** verified 2026-09-18 | 44 US MHA volumes · labels SOL / GM / GL — calf US, **not** foot DI/NV meshes; GPL viral vs MIT teaching-pack preference | **reject** teaching GLB. **reject** DI/per-ray MTA. Not a Kabsch substitute |
| **78** | **vessel-atlas** (liuweid95-hash) | https://github.com/liuweid95-hash/vessel-atlas | README: BP3D credited **CC BY 4.0**; first-party code **rights reserved** (not MIT) verified 2026-09-18 | Vascular teaching atlas UX; **0** foot DI / per-ray MTA pack | **UX-borrow** ideas only. **reject** code/mesh copy |
| **79** | **bone-atlas** (hasantayyar) | https://github.com/hasantayyar/bone-atlas | README credits: Z-Anatomy **CC BY-SA 4.0** · BP3D **CC BY-SA 2.1 JP** verified 2026-09-18 | Lightweight Three.js osteology viewer (offline dist) | **UX-borrow** (offline). Meshes **isolate-SA** only; osteology already **26/26** — **reject** integrate |
| **80** | **anatomy-atlas-3d** (Grypa-JJ) | https://github.com/Grypa-JJ/anatomy-atlas-3d | Code **MIT**; geometry **CC BY-SA** (BP3D/ZA) verified 2026-09-18 | Whole-body ~2500 structures — SA surface, not CC0/BY right-foot soft | **UX-borrow**. **isolate-SA**. **reject** as soft main-tree replacement |
| **81** | **female-body-atlas** / Femora (zer01dollars) | https://github.com/zer01dollars/female-body-atlas | MIT code + HuBMAP female v1.5 **CC BY 4.0** (ATTRIBUTION) verified 2026-09-18 | Deepen of HRA / **#50** — united female GLB | **monitor** / **UX-borrow** explode. **reject** united female GLB as right-foot soft substitute |
| **82** | **TPTBox** (Extensive Torso Processing Toolbox) | Zenodo DOI **10.5281/zenodo.22643916** | Zenodo API `license.id` = **apache2.0** verified 2026-09-18 | Torso CT/MR toolbox — **0** foot soft meshes | **reject** DI/MTA/belly source |
| **83** | **Triceps surae force-sharing OpenSim pack** | Zenodo DOI **10.5281/zenodo.21879846** | Zenodo API `license.id` = **cc-by-4.0** verified 2026-09-18 | `.osim` / `.sto` / MATLAB sims (footwear × walking) — **not** surface STL bellies | **reject** mesh wire. Optional MSK-process monitor only |

**Note**: Zenodo **22727173** BodyParts3D 4.3 pack = deepen of existing log **#21** (MIT tooling / BY-SA 2.1 JP meshes) — **not** re-numbered.

### Soft-gap check

| Gap | Day 4bk |
|-----|---------|
| DI / per-ray MTA / nerve·ligament CC0/BY | **Still dry** |
| Gastroc/soleus | Andreassen + Henson still **blocked** (alignment); new digs **#77/#83** not GLB-ready; wrote `docs/belly-registration-alternatives.md` (TPS / two-stage / BP3D-native — research only) |
| Utah Hive | Still **reject** — not re-opened |

### Outcome

- Learning log **#77–#83**; belly registration alternatives doc; watchlist + handback Day 4bk.
- Census unchanged (**129/124**; ontology **126/129**).
- **0** meshes integrated; **0** SA spam; Andreassen/Henson **not** force-wired.
- Cloud Agent still **quota-blocked**.
- **No finished-product claim.**


## Session additions (2026-09-21 · Day 4bl — soft dig #84+; Cloud Agent still quota-blocked)

### Context

Weekday automation. Cloud Agent `bc-4d6d86a7-…` still **error / usage exhausted** (reply refused). Local docs-only soft dig for DI / per-ray MTA / nerve·ligament **CC0/BY**. **0** mesh wire. **No finished-product claim.**

### NEW license-verified projects (≥4; #84–#89)

| # | Project | URL / DOI | License verified | Foot relevance | Decision |
|---|---------|-----------|------------------|----------------|----------|
| **84** | **Scan-the-World — Muscles of the foot and ankle** | Zenodo DOI **10.5281/zenodo.21527865** (also **21354714**) | Zenodo API `license.id` = **cc-by-nc-sa-4.0** verified 2026-09-21 | Right foot/ankle **united** CT-derived muscle GLB (tempting soft pack) — **NC** blocks main-tree teaching reuse | **reject** (NC). Do **not** wire; do **not** treat as DI/per-ray MTA fill |
| **85** | **CRUS — lower leg & foot atlas** (HolsteredSoul/crus-atlas) | https://github.com/HolsteredSoul/crus-atlas | `LICENSE.md`: app/scripts **MIT**; anatomy **CC BY-SA 4.0** (Z-Anatomy / BP3D upstream) verified 2026-09-21 | Vite+Three.js right leg/foot teaching UX (explode, disputed labels, clinical cards, provenance `extras`); only **~6** foot intrinsics — **not** complete DI/NV | **UX-borrow** (disputed/honesty labels, explode ideas). Meshes **isolate-SA** only — already covered by our `by-sa/` ZA/Open3D pack. **reject** re-integrate |
| **86** | **Air-Sage / foot-anatomy** | https://github.com/Air-Sage/foot-anatomy | README: AnatomyTOOL **Open3DModel CC BY-SA 4.0** + Lucide ISC verified 2026-09-21 | Chinese Three.js 足踝 atlas UX (抽出/透视/标准视角); GLB = Open3D (already mined) | **UX-borrow** (ZH chrome). **isolate-SA**. **reject** duplicate Open3D wire |
| **87** | **Glasgow–Maastricht Foot Model** (AnyBody/gm-foot) | https://github.com/AnyBody/gm-foot | `LICENCE.txt`: **AnyBody Technology SLA / AMMR** terms (not CC0/BY) verified 2026-09-21 | 26-segment MSK foot with muscles/ligaments — simulation scripts + `FootGMSkin.stl`, **not** libre elemental teaching GLBs | **reject** (proprietary SLA). **reject** DI/MTA source |
| **88** | **KU Leuven CT extended dynamic foot** (SimTK kul_footmodel) | https://simtk.org/projects/kul_footmodel/ · group **1020** | Project page (fetched 2026-09-21): claims intrinsic muscles/ligaments; **no** SPDX / CC statement; **0** recorded downloads | CT-based biomechanical foot — license **opaque**; cannot integrate without clear CC0/BY | **reject** until license clarified. **monitor** only if owner publishes CC0/BY surfaces |
| **89** | **Foot shape-function model data** (outer foot PLYs) | Zenodo DOI **10.5281/zenodo.10360304** | Zenodo API `license.id` = **cc-zero** verified 2026-09-21 | Population outer-foot **skin** PLYs (arch morphology) — **0** named DI / artery / nerve / ligament elementals | **reject** soft teaching mesh. Optional morphology reference only |

**Also checked (not re-numbered)**: Zenodo **ImageCAS-X** (`21887809`, **cc-by-4.0**) = coronary CTA vessels — **reject** foot. Pottery “Foot” GLBs (**20166470** / **21243693**, **cc-by-nc-sa-4.0**) = archaeological artifact — **reject**. Statistical foot **bone** SSMs (**3464747**, **cc-by-4.0**) = osteology already **26/26**.

### Soft-gap check

| Gap | Day 4bl |
|-----|---------|
| DI / per-ray MTA / nerve·ligament CC0/BY | **Still dry** — #84 NC; #85/#86 SA already covered; #87 proprietary; #88 opaque; #89 skin-only |
| Gastroc/soleus | Andreassen + Henson still **blocked**; no new CC0/BY belly surface pack this pass |
| Utah Hive | Still **reject** — not re-opened |

### Outcome

- Learning log **#84–#89**; watchlist / handback / daily-log / week-plan Day 4bl.
- Census unchanged (**129/124**; ontology **126/129**).
- **0** meshes integrated; **0** SA spam; Andreassen/Henson/Utah **not** force-wired.
- Cloud Agent still **quota-blocked** (usage exhausted — enable on-demand to relaunch).
- **No finished-product claim.**
