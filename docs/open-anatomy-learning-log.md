# Open Anatomy Learning Log

Living log of open-source human anatomy projects studied for the right-foot atlas.
**Policy**: dig widely; document lessons; integrate meshes only when license-safe
(CC0 / CC BY into main tree; BY-SA isolated under `public/models/right-foot/by-sa/` + NOTICE;
reject NC / unknown / All Rights Reserved).

**Last updated**: 2026-09-15 (Day 4ah)  
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

