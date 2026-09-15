# Week 2 · Ligament / plantar fascia mesh search (Day 4o–4p)

**Date**: 2026-09-15 (Day 4p brute-force confirmation)  
**Goal**: Find **any** CC0 / CC BY teaching mesh for foot ligaments or plantar fascia. Prefer main-tree. Only if none, optionally isolate 1–3 Z-Anatomy BY-SA ligaments with Kabsch + NOTICE **if** spatial QA acceptable.  
**Honesty**: One BP3D ligament ≠ finished ligament atlas.

---

## Decision (this pass)

| Candidate | License | Spatial QA | Decision |
|-----------|---------|------------|----------|
| **BP3D right long plantar ligament** (`BP5093` / elemental `FJ1424.obj`) | **CC BY 4.0** (LSDB lic.html 2025-02-27) | Same BP3D mm frame as bones; AABB overlaps calcaneus proximal + MT bases distal; Z plantar band overlaps calcaneus/cuboid plantar | **Integrated** into main tree as new `ligament` layer (1/N) |
| BP3D plantar fascia / ATFL / CFL / deltoid / spring / short plantar | — | Day 4p exhaustive ISA re-scan: still **no** distinct elementals | **None** |
| UM CC0 “5 ligaments” | CC0 1.0 | Dataset notes: **knee ligaments** + Achilles / patellar / quad tendons; readme explicitly excluded minor foot ligaments | **reject** for foot ligament gap |
| Z-Anatomy / Anatomy Engine ligamentous | CC BY-SA 4.0 | Would need `.blend` extract + Kabsch; deferred because a **CC BY** BP3D mesh was found | **Not integrated** this pass (prefer not expanding BY-SA when BY exists) |
| SimTK OpenSim ankle-foot (46 ligaments + fasciae as DCT paths) | Project page: “License: Model” — **not** a clear CC0/CC BY geom redistribution grant | Simulation ligaments ≠ teaching surface meshes | **monitor** / **reject** until license text clarifies STL/OBJ reuse |
| AnyBody/gm-foot (Glasgow–Maastricht) | GitHub license “Other” / unclear | Has plantar fascia + extensive ligaments in MSK model | **monitor** — no clear libre mesh grant |
| Sketchfab Soma3D “Foot, Ankle and Ligaments” | License **not shown** on public page (2026-09-15 fetch) | Annotated teaching model | **reject** until downloadable CC BY/CC0 confirmed |
| Zenodo CT foot soft tissue (e.g. 20228270 lineage) | BY-NC-SA | NC trap | **reject** |
| MorphoSource human foot soft tissue | Often NC / unclear | Spot-check unfinished | **monitor** entry-by-entry |

---

## BP3D inventory detail

From `/tmp/bp3d/isa_parts_list_e.txt` + `isa_element_parts.txt`:

- `FMA44249` / `BP5093` **right long plantar ligament** → elemental **`FJ1424.obj`** (exists in `isa_BP3D_4.0_obj_99.zip`, 236 KB, 2445 verts).
- Parent concepts (`long plantar ligament`, `plantar tarsal ligament`, `tarsal ligament`) share the same elemental — **not** additional distinct meshes.
- **No** BP3D hits for: plantar aponeurosis / fascia, ATFL, CFL, deltoid (ankle), spring / plantar calcaneonavicular, Lisfranc / cuneometatarsal, deep transverse metatarsal.

### Spatial QA (FJ1424 vs BP3D bones, mm)

| Mesh | X | Y | Z |
|------|---|---|---|
| FJ1424 ligament | [-117.8, -59.4] | [-142.5, -45.6] | [-61.0, -36.4] |
| Calcaneus BP9040 | [-100.8, -44.9] | [-94.1, -24.0] | [-68.5, -19.2] |
| Cuboid BP8873 | [-115.1, -82.4] | [-116.8, -83.7] | [-51.1, -22.1] |
| MT2 BP8627 | [-121.3, -90.7] | [-187.4, -122.4] | [-66.3, -18.3] |

Teaching-grade co-registration: **acceptable** (native BP3D frame; no Kabsch). Distal extent reaches MT base region; proximal overlaps calcaneus. Not surgical registration.

---

## UM readme (doi:10.22452/RD/5T6TZ7) — deepened

Downloaded `readme.txt` (datafile 593). Explicit: geometries excluded include “**minor tendon, minor ligaments and intrinsic foot muscles** which were hard to identify.” The five ligaments are described with **knee ligaments and cartilage** + Achilles / quadriceps / patellar soft tissues — **not** ATFL/CFL/spring/plantar fascia.

---

## Still open after this pass

- Plantar aponeurosis / fascia teaching mesh (CC0/BY)
- Lateral ankle complex (ATFL, CFL), deltoid, spring ligament
- Finer plantar/digital nerves
- Individually split dorsal metatarsal arteries (BP3D grouped remains honest)

**BY-SA Z-Anatomy ligaments**: optional future `by-sa/` extract **only** if CC0/BY search remains empty for those named structures and spatial QA after Kabsch is acceptable.

---

## Day 4p — Brute-force ISA / cache re-scan (no new integrate)

**Goal**: Confirm whether any additional RIGHT foot/ankle ligament or plantar aponeurosis meshes exist in local `/tmp/bp3d` (ISA parts + element map + partof list + `isa_BP3D_4.0_obj_99.zip`).

### Method

1. Keyword scan `isa_parts_list_e.txt` / `partof_parts_list_e.txt` / `isa_element_parts.txt` for: ligament, aponeurosis, fascia, talofibular, calcaneofibular, calcaneonavicular, collateral, cruciate, bifurcate, Lisfranc, retinaculum, spring, short plantar, plantar plate, ankle/foot capsule.
2. Map **every** skeletal / nonskeletal ligament elemental (`FJ1329`, `FJ1380`, `FJ1405`, `FJ1424`, larynx/eye check ligaments, etc.) to all concept names that reference it.
3. Filter concepts with `right` + (`ligament`|`fascia`|`aponeuro`|`retinacul`).
4. Search for ankle/foot joint capsules (none in ISA).

### Result — named RIGHT foot/ankle ligament / fascia elementals

| Concept | BP / FJ | Decision |
|---------|---------|----------|
| Right long plantar ligament | `BP5093` / `FJ1424` | **Already integrated** (Day 4o) |
| Parent aliases (tarsal / plantar tarsal / long plantar / ligament of lower limb) | same `FJ1424` | **Not additional meshes** |
| Left long plantar | `FJ1424M` | Wrong laterality |
| Plantar aponeurosis / fascia | — | **Not in ISA** |
| ATFL / CFL / deltoid (ankle) / spring / short plantar / bifurcate / Lisfranc / deep transverse metatarsal / ankle capsules | — | **Not in ISA** |
| Flexor retinaculum | `FJ1471` | Wrist, not ankle |
| Zone of investing fascia of free lower limb | `FJ1423` | Iliotibial / fascia lata (thigh), not plantar fascia |
| Right calcaneal tendon (Achilles) | `BP5098` / `FJ1405` | **Tendon**, not ligament — noted for future muscle–tendon pass; **not** filed under `ligament` layer |

### Honesty

Ligament layer remains **1/N** (long plantar only). Exhaustive local BP3D scan found **zero** additional CC BY foot ligament / plantar fascia meshes to integrate. Z-Anatomy BY-SA ligaments still deferred (prefer CC0/BY). No finished-product claim.

---

## Day 4q — Achilles tendon integrate (Path A) + Path B check

**Chosen path**: **A** — integrate BP3D right calcaneal tendon (`BP5098` / `FJ1405`) as a **named tendon** under the ligament/tendon layer toggle (CC BY main tree, native frame).

| Item | Detail |
|------|--------|
| Mesh | `calcaneal_tendon_BP5098.glb` from `FJ1405.obj` |
| Layer UI | `ligament` key → labels **韧带/腱** / **Ligament/Tendon**; tooltip says tendon |
| Honesty | Still **not** a ligament atlas; Achilles is tendon, not ATFL/CFL/fascia fill |
| Kabsch | None (native BP3D) |

**Path B check (not integrated)**:
- Open3D local `lower-limb-obj.zip`: keyword scan for liga/fascia/ATFL/CFL/spring/aponeuro → **0** usable meshes
- Z-Anatomy ligamentous system: still `.blend` / BY-SA; deferred (prefer not expanding SA when Path A CC BY tendon is available)

**BP3D ligament ceiling (unchanged)**: only right long plantar among true foot ligament elementals; plantar fascia / ATFL / CFL / deltoid / spring / short plantar absent.



## Day 4r — Z-Anatomy / OpenAnatomy local ligament export attempt

**Goal**: Export 2–4 RIGHT foot ligaments or plantar fascia from local Z-Anatomy / OpenAnatomy Blender assets → `by-sa/` + Kabsch/NOTICE if needed.

### Local asset hunt (box)

| Path | Result |
|------|--------|
| `third_party/z-anatomy/` | **EVALUATION.md only** — no `Startup.blend`, no Z-Anatomy.zip, no ligament OBJ/GLB |
| Box-wide `*.blend` | **None** |
| Existing `public/models/right-foot/by-sa/` | 6 Z-Anatomy **nerve** GLBs + Open3D DI/arteries — **no ligaments** |
| `third_party/open3dmodel/` | lower-limb OBJ zip present; prior keyword scan: **0** ankle ligaments / plantar fascia |
| `/tmp/body_anatomy.glb` (hpfrei) | Prior session: no foot DI / not used for ligaments this pass |
| Blender CLI | **Not installed** (`which blender` empty) |

### Decision

**Path 1 blocked** — cannot script Blender export without the `.blend` (or equivalent mesh) on disk. Did **not** download/install ~800MB Blender + Startup.blend in this pass (same cost tradeoff as Day 4 EVALUATION). No new BY-SA ligament GLBs; no Kabsch; NOTICE unchanged for ligaments.

**Path 2 only** (teaching polish): non-selected nerve/vessel opacity dimming when a structure is selected; StructurePanel mesh-fidelity notes; honesty that BP3D cannot split dorsal metatarsal / dorsal digital into per-ray elementals (FJ2072 / FJ2096 remain grouped).

**Still open**: ATFL / CFL / deltoid / spring / plantar fascia teaching meshes (CC0/BY preferred; Z-Anatomy BY-SA only if `.blend` available + spatial QA).


---

## Day 4s — Open3D lower-limb.obj ligament extract (BY-SA) + Z-Anatomy Zenodo

**Date**: 2026-09-15

### Breakthrough path (no Blender)

Prior keyword scans of the **stub** `third_party/open3dmodel/lower-limb-obj.zip` and of extracted DI-only files missed that the real literature package `/workspace/literature/open3d-assets/lower-limb.obj` is a **monolithic multi-object OBJ** (472 `o ` groups) containing dozens of RIGHT foot/ankle ligaments + `Plantar_aponeurosis.r`.

| Mesh | Open3D object | License | Spatial QA (Kabsch→BP3D) | Decision |
|------|---------------|---------|--------------------------|----------|
| ATFL | `Anterior_talofibular_ligament.r` | CC BY-SA 4.0 | centroid ~20 mm from talus landmark | **Integrated** → `by-sa/` |
| CFL | `Calcaneofibular_ligament.r` | CC BY-SA 4.0 | ~17 mm from calcaneus landmark | **Integrated** → `by-sa/` |
| Spring | `Plantar_calcaneonavicular_ligament.r` | CC BY-SA 4.0 | ~12 mm from calc–nav mid | **Integrated** → `by-sa/` |
| Plantar fascia | `Plantar_aponeurosis.r` | CC BY-SA 4.0 | plantar Z band overlaps calcaneus; large plantar span | **Integrated** → `by-sa/` |

Transform: reuse Day 4m `open3d_to_bp3d_transform.json` (mean residual ≈2.6 mm). Script: `scripts/extract_open3d_ligaments.py`. AABB report: `third_party/open3dmodel/ligament_extract_aabb.json`.

### Parallel CC0/CC BY search (still dry for these four)

| Candidate | Result |
|-----------|--------|
| BP3D ISA | Still only long plantar among true foot ligaments; no ATFL/CFL/spring/fascia |
| UM CC0 | Knee ligaments + Achilles; foot minor ligaments excluded |
| DU Visible Human LE MSK (digitalcommons.du.edu/visiblehuman) | Ligaments listed are **knee** (ACL/PCL/MCL/LCL); ankle cartilage only — **reject** for ATFL/fascia |
| AnyBody gm-foot | Simulation AnyScript, license “Other” — **monitor** |
| SimTK OpenSim ankle-foot | DCT paths, unclear mesh redistribution — **monitor** |

### Z-Anatomy

- Fetched Zenodo `Z-Anatomy.zip` → local `third_party/z-anatomy/` (gitignored). Contains `.blend` only.
- Blender **not** installed (`apt` has no blender candidate here).
- Export recipe documented in `third_party/z-anatomy/EVALUATION.md` — **ligaments not claimed from Z-Anatomy**.

### Honesty

Ligament/tendon layer after Day 4s: BP3D long plantar + Achilles **plus** 4 Open3D BY-SA teaching meshes. Still **not** a finished ligament atlas (deltoid / Lisfranc / retinacula deferred → Day 4t).


---

## Day 4t — Expand Open3D ligament/retinaculum extract + re-QA Day 4s four

**Date**: 2026-09-15

### Goal

Scan same `lower-limb.obj` for more RIGHT foot/ankle ligaments (deltoid parts, short plantar, bifurcate, Lisfranc-ish, retinacula if clearly named). Extract + Kabsch-bake; spatial QA attachment distances; reject absurd.

### Parallel CC0/CC BY check (still dry for these)

| Source | Result |
|--------|--------|
| BP3D ISA | Unchanged: only long plantar among true foot ligament elementals; no deltoid/short plantar/bifurcate/Lisfranc/retinacula |
| UM CC0 | Knee ligaments + Achilles; foot minor ligaments excluded |
| DU Visible Human LE MSK | Knee ligaments only — reject |
| Blender / Z-Anatomy `.blend` | Blender **not** on PATH; `apt-cache` has no `blender` package here — did **not** install |

### Candidates scanned → attachment QA (centroid → expected BP3D bone landmarks)

Reject rule: wrong side (X>0) OR min_expect >55 mm (75 mm for bands/retinacula/plantar fascia) OR outside padded foot AABB.

| Mesh | Open3D object | nearest / min_mm | Decision |
|------|---------------|------------------|----------|
| Tibionavicular (deltoid) | `Tibionavicular_ligament.r` | navicular / 21.2 | **Integrated** |
| Tibiocalcaneal (deltoid) | `Tibiocalcaneal_ligament.r` | talus / 17.9 | **Integrated** |
| Posterior tibiotalar (deltoid) | `Posterior_tibiotalar_ligament.r` | talus / 19.4 | **Integrated** |
| Anterior tibiotalar / tibiospring | `Anterior_tibiotalar_ligament_(Tibiospring_lig.).r` | talus / 23.2 | **Integrated** |
| Short plantar | `Plantar_calcaneocuboid_ligament.r` | calcaneus / 20.9 | **Integrated** |
| Bifurcate | `Bifurcatum_ligament` (no `.r`) | cuboid / 18.3 | **Integrated** (right-cluster X≈−95.5) |
| PTFL | `Posterior_talofibular_ligament.r` | talus / 20.4 | **Integrated** |
| Cuneometatarsal interosseous | `Cuneometatarsal_interosseus_ligaments.r` | cuneiform_int / 12.3 | **Integrated** (grouped) |
| Dorsal TMT | `Dorsal_tarsometatarsal_ligaments.r` | cuneiform_int / 12.0 | **Integrated** (grouped) |
| Plantar TMT | `Plantar_tarsometatarsal_ligaments.r` | cuneiform_lat / 16.4 | **Integrated** (grouped) |
| Flexor retinaculum | `Flexor_retinaculum_of_ankle.r` | talus / 25.4 | **Integrated** |
| Superior extensor retinaculum | `Superior_extensor_retinaculum_of_ankle.r` | navicular / 39.8 | **Integrated** (proximal band expected) |
| Inferior extensor retinaculum | `Inferior_extensor_retinaculum.r` | navicular / 15.5 | **Integrated** |
| Superior fibular retinaculum | `Superior_fibular_retinaculum.r` | calcaneus / 22.6 | **Integrated** |
| Inferior fibular retinaculum | `Inferior_fibular_retinaculum.r` | calcaneus / 19.2 | **Integrated** |

**Rejected this pass**: none of the scanned named targets failed the rule. Not scanned/extracted: dorsal/plantar cuneonavicular, intercuneiform, cuboideonavicular, toe collaterals, long plantar (BP3D already), etc.

### Day 4s four — visual/centroid re-QA

| Mesh | Check | Result |
|------|-------|--------|
| ATFL | lateral vs spring (more neg X); near talus 20.5 mm | **OK** — no side/scale fix |
| CFL | near calcaneus 17.2 mm; lateral ankle Y | **OK** |
| Spring | near navicular 17.6 mm; medial vs ATFL | **OK** |
| Plantar aponeurosis | plantar Z band (−74…−54) below calcaneus Z; large plantar span | **OK** |

### Honesty

Ligament/tendon layer now: BP3D long plantar + Achilles **plus** 19 Open3D BY-SA teaching meshes (4 Day 4s + 15 Day 4t). Still **not** a finished ligament atlas — many OBJ bands remain; Lisfranc/retinacula are grouped teaching meshes; Kabsch mean residual ≈2.6 mm (teaching-grade).
