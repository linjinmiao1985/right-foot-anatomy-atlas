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

**Still open gaps**: `interossei_dorsales`, `posterior_tibial_artery`, `fibular_artery` remain placeholders. Prefer waiting for clear CC0/CC BY meshes over fake splits.

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

---

## Pipeline lessons (not yet implemented)

- Prefer glTF node names + `extras` for teaching metadata (hpfrei / OpenAnatomy export).  
- Draco or Meshopt for large multi-mesh packs; keep foot atlas as discrete GLBs for license isolation.  
- JSON-LD / sidecar concept maps (Open Anatomy) as future evolution of `structures.json` + `manifest.json`.  
- Never mix Anatomography BY-SA **renders** with LSDB Archive BY 4.0 **meshes** without isolation.

---

## Next dig targets

- NIH 3D entry-by-entry license crawl for foot intrinsic muscles.  
- Cults3D Muskiron license page (if Cloudflare allows).  
- Contact paths for Zenodo 20228270 relicense (BY without NC).  
- Blender anatomy addons that ship **original** CC0 foot soft tissue (not BP3D re-exports).  
- SPARC / Physiome updates beyond dataset 307.

