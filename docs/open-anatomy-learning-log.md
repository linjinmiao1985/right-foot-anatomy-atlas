# Open Anatomy Learning Log

Living log of open-source human anatomy projects studied for the right-foot atlas.
**Policy**: dig widely; document lessons; integrate meshes only when license-safe
(CC0 / CC BY into main tree; BY-SA isolated under `public/models/right-foot/by-sa/` + NOTICE;
reject NC / unknown / All Rights Reserved).

**Last updated**: 2026-09-15  
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

## Next dig targets

- Prefer CC0/CC BY replacements for Open3D BY-SA DI + proximal arteries (relicense or alternate segmentations).  
- MorphoSource human foot media pages one-by-one for clear CC BY soft tissue.  
- SimTK ankle-foot downloadable license text before any geom reuse.  
- Cults3D Muskiron license page (if Cloudflare allows).  
- Contact paths for Zenodo 20228270 relicense (BY without NC).  
- NIH 3D entry-by-entry crawl remaining.

