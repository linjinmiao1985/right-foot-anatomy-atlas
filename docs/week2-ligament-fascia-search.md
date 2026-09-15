# Week 2 · Ligament / plantar fascia mesh search (Day 4o)

**Date**: 2026-09-15  
**Goal**: Find **any** CC0 / CC BY teaching mesh for foot ligaments or plantar fascia. Prefer main-tree. Only if none, optionally isolate 1–3 Z-Anatomy BY-SA ligaments with Kabsch + NOTICE **if** spatial QA acceptable.  
**Honesty**: One BP3D ligament ≠ finished ligament atlas.

---

## Decision (this pass)

| Candidate | License | Spatial QA | Decision |
|-----------|---------|------------|----------|
| **BP3D right long plantar ligament** (`BP5093` / elemental `FJ1424.obj`) | **CC BY 4.0** (LSDB lic.html 2025-02-27) | Same BP3D mm frame as bones; AABB overlaps calcaneus proximal + MT bases distal; Z plantar band overlaps calcaneus/cuboid plantar | **Integrated** into main tree as new `ligament` layer (1/N) |
| BP3D plantar fascia / ATFL / CFL / deltoid / spring | — | No elemental foot meshes in `isa_parts_list_e.txt` beyond long plantar lineage | **None** |
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
