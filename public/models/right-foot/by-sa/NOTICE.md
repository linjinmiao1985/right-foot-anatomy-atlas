# CC BY-SA 4.0 Assets — Isolated ShareAlike Module

⚠️ **ShareAlike License Notice** ⚠️

Meshes in this directory are licensed under **CC BY-SA 4.0** (ShareAlike). Derivatives must use the same license. They are **not** part of the main CC BY / CC0 redistributable asset claim.

---

## Files

### Nerves (Z-Anatomy)

1. `tibial_nerve.glb`
2. `medial_plantar_nerve.glb`
3. `lateral_plantar_nerve.glb`
4. `deep_fibular_nerve.glb`
5. `superficial_fibular_nerve.glb`
6. `sural_nerve.glb`

**Source**: Z-Anatomy — https://github.com/Z-Anatomy/Models-of-human-anatomy  
**License**: CC BY-SA 4.0  
**Attribution**: "Z-Anatomy - The libre 3D atlas of anatomy - CC BY-SA 4.0"

### Foot dorsal interossei + proximal arteries (Open3DModel)

7. `dorsal_interosseous_1st.glb` — from `1st_Dorsal_interossei_muscles_of_foot.r`
8. `dorsal_interosseous_2nd.glb` — from `2nd_Dorsal_interossei_muscles_of_foot.r`
9. `dorsal_interosseous_3rd.glb` — from `3rd_Dorsal_interossei_muscles_of_foot.r`
10. `dorsal_interosseous_4th.glb` — from `4th_Dorsal_interossei_muscles_of_foot.r`
11. `posterior_tibial_artery.glb` — from `Posterior_tibial_artery.r`
12. `fibular_artery.glb` — from `Fibular_artery.r`

**Source**: Open3DModel lower-limb OBJ (textureless) via AnatomyTOOL  
**Create page**: https://anatomytool.org/open3dmodel-create  
**Package**: `/workspace/literature/open3d-assets/lower-limb.obj` (local research copy)  
**License**: CC BY-SA 4.0 — https://creativecommons.org/licenses/by-sa/4.0/  
**Modifications**: Extracted named right-side (`.r`) objects to OBJ, converted to glTF 2.0 Binary (obj2gltf); no topology edits. Vertex positions later **Kabsch-aligned** from Open3D meters into BodyParts3D millimeter frame (landmarks: Calcaneus, Talus, Navicular, Cuboid, medial/intermediate/lateral cuneiform, MT1–5; Day 4m re-fit mean residual ≈2.6 mm vs prior 8-landmark ≈3.0 mm that excluded mis-ID cuboid/cuneiforms) so the atlas `scale={[0.01,0.01,0.01]}` convention applies. Transform JSON: `third_party/open3dmodel/open3d_to_bp3d_transform.json`.

**Inventory note**: Day 4t–4w ligaments/retinacula/fascia wired selectively. Day 4x–4z add Open3D fine plantar / cutaneous / calcaneal / dorsal digital (superficial + deep fibular) nerve meshes. Day 4aa adds Open3D fine vessels (deep plantar a./arch, grouped dorsal MTA, medial plantar branches). Day 4ab adds perforating arcuate↔deep arch, lat/med tarsal, med/lat calcaneal aa. (skipped Open3D med/lat plantar, plantar MTA, dorsal digital, arcuate as BP3D duplicates). Sural→LDC continuity object remains a teaching note on LDC. Same OBJ still has further ligament bands and nerve terminals not wired; **no per-ray 1st–4th MTA**.


### Ankle/foot ligaments, retinacula + plantar fascia (Open3DModel)

**Day 4s**
13. `anterior_talofibular_ligament.glb` — from `Anterior_talofibular_ligament.r`
14. `calcaneofibular_ligament.glb` — from `Calcaneofibular_ligament.r`
15. `plantar_calcaneonavicular_ligament.glb` — from `Plantar_calcaneonavicular_ligament.r` (spring ligament)
16. `plantar_aponeurosis.glb` — from `Plantar_aponeurosis.r`

**Day 4t — deltoid parts**
17. `tibionavicular_ligament.glb` — from `Tibionavicular_ligament.r`
18. `tibiocalcaneal_ligament.glb` — from `Tibiocalcaneal_ligament.r`
19. `posterior_tibiotalar_ligament.glb` — from `Posterior_tibiotalar_ligament.r`
20. `anterior_tibiotalar_ligament.glb` — from `Anterior_tibiotalar_ligament_(Tibiospring_lig.).r`

**Day 4t — short plantar, bifurcate, PTFL**
21. `plantar_calcaneocuboid_ligament.glb` — from `Plantar_calcaneocuboid_ligament.r` (short plantar)
22. `bifurcate_ligament.glb` — from `Bifurcatum_ligament` (no `.r`; centroid QA confirms right-foot cluster)
23. `posterior_talofibular_ligament.glb` — from `Posterior_talofibular_ligament.r`

**Day 4t — Lisfranc-ish bands (grouped)**
24. `cuneometatarsal_interosseous_ligaments.glb` — from `Cuneometatarsal_interosseus_ligaments.r`
25. `dorsal_tarsometatarsal_ligaments.glb` — from `Dorsal_tarsometatarsal_ligaments.r`
26. `plantar_tarsometatarsal_ligaments.glb` — from `Plantar_tarsometatarsal_ligaments.r`

**Day 4t — ankle retinacula**
27. `flexor_retinaculum_of_ankle.glb` — from `Flexor_retinaculum_of_ankle.r`
28. `superior_extensor_retinaculum.glb` — from `Superior_extensor_retinaculum_of_ankle.r`
29. `inferior_extensor_retinaculum.glb` — from `Inferior_extensor_retinaculum.r`
30. `superior_fibular_retinaculum.glb` — from `Superior_fibular_retinaculum.r`
31. `inferior_fibular_retinaculum.glb` — from `Inferior_fibular_retinaculum.r`

**Day 4v — selective (max 6)**
32. `interosseous_talocalcaneal_ligament.glb` — from `Interosseus_talocalcaneal_ligament.r`
33. `cervical_talocalcaneal_ligament.glb` — from `Cervical_ligament_(anterior_talocalcaneal_ligament).r`
34. `talonavicular_ligament.glb` — from `Talonavicular_ligament.r`
35. `deep_transverse_metatarsal_ligament.glb` — from `Deep_transverse_metatarsal_ligament.r`
36. `intercuneiform_interosseous_ligaments.glb` — from `Intercuneiform_interosseus_ligaments.r`
37. `dorsal_cuneonavicular_ligaments.glb` — from `Dorsal_cuneonavicular_ligaments.r`

**Day 4w — previously deferred (volume; QA accept)**
38. `medial_talocalcaneal_ligament.glb` — from `Medial_talocalcaneal_ligament.r`
39. `dorsal_intercuneiform_ligaments.glb` — from `Dorsal_intercuneiform_ligaments.r`

Same source/license/Kabsch pipeline as DI + proximal arteries (Day 4s–4w). Attachment QA: centroid→expected BP3D bone landmarks; Day 4v/4w mins ≈2.8–34.3 mm (medial TC ≈17.4 mm; dorsal intercuneiform ≈9.0 mm). Teaching-grade co-registration only — **not** a finished ligament atlas. Further OBJ bands remain unwired.

---


### Fine plantar / deep LPN nerves (Open3DModel) — Day 4x

40. `common_plantar_digital_nerves.glb` — from `Common_plantar_digital_nerves.r` (grouped commons)
41. `proper_plantar_digital_nerves_medial.glb` — from `Proper_plantar_digital_branches_(Medial_plantar_nerve).r`
42. `proper_plantar_digital_nerves_lateral.glb` — from `Proper_plantar_digital_branches_(Lateral_plantar_nerve).r`
43. `deep_branch_lateral_plantar_nerve.glb` — from `Deep_branch_of_Lateral_plantar_nerve.r`

Same Kabsch pipeline as DI/arteries/ligaments (`open3d_to_bp3d_transform.json`, mean residual ≈2.6 mm). Spatial QA vs RIGHT foot bone AABB + Open3D medial/lateral plantar trunks (same frame): all **accept** — see `third_party/open3dmodel/nerve_spatial_qa.json`. Teaching-grade only; commons/proprii are **grouped** objects, not per-web elementals.

### Cutaneous / calcaneal / superficial LPN / dorsal digitals — Day 4y

44. `medial_dorsal_cutaneous_nerve.glb` — from `Medial_dorsal_cutaneous_nerve.r`
45. `lateral_dorsal_cutaneous_nerve.glb` — from `Lateral_dorsal_cutaneous_nerve.r`
46. `medial_calcaneal_branches.glb` — from `Medial_calcaneal_branches_of_Tibial_nerve.r`
47. `lateral_calcaneal_nerves.glb` — from `Lateral_calcaneal_nerves.r`
48. `superficial_branch_lateral_plantar_nerve.glb` — from `Superficial_branch_of_Lateral_plantar_nerve.r`
49. `dorsal_digital_superficial_fibular / dorsal_digital_deep_fibular.glb` — from `Dorsal_digital_branches_of_superficial_fibular_nerve.r` (grouped)

Day 4y wires six Day 4x volume-deferred QA-pass nerves (teaching priority). Still deferred: `Sural_nerve,_Lateral_dorsal_cutaneous_nerve.r` continuity object; `Dorsal_digital_branches_of_deep_fibular_nerve.r`. Not a finished peripheral-nerve atlas.

## Isolation Strategy

- Main tree (bones / most muscles / most vessels): MIT code + CC BY 4.0 / CC0
- This `by-sa/` module: optional ShareAlike content (Z-Anatomy trunk nerves + Open3D fine/cutaneous nerves, DI, proximal/fine/tarsal/calcaneal/perforator arteries, ankle/foot ligaments, retinacula, plantar fascia)
- Do **not** merge these GLBs into a CC BY-only redistribution claim

### Day 4aa — Fine vessels / plantar-arch detail (Open3DModel)

53. `deep_plantar_artery.glb` — from `Deep_plantar_artery.r`
54. `deep_plantar_arch.glb` — from `Deep_plantar_arch.r` (BY-SA deep-arch detail; complements BP3D `plantar_arch` teaching concept — not a second anatomical arch)
55. `dorsal_metatarsal_arteries.glb` — from `Dorsal_metatarsal_arteries.r` (**grouped** teaching object — no 1st–4th elemental in donor OBJ)
56. `deep_branch_medial_plantar_artery.glb` — from `Deep_branch_of_Medial_plantar_artery.r`
57. `superficial_branch_medial_plantar_artery.glb` — from `Superficial_branch_of_Medial_planter_artery.r` (source spelling *planter*; teaching Latin corrected)

### Day 4ab — Tarsal / calcaneal / perforator vessels (Open3DModel)

58. `perforating_arcuate_deep_plantar.glb` — from `Perforating_br._between_Arcuate_a._and_Deep_plantar_arch.r`
59. `lateral_tarsal_artery.glb` — from `Lateral_tarsal_artery.r`
60. `medial_tarsal_arteries.glb` — from `Medial_tarsal_arteries.r` (**grouped**)
61. `medial_calcaneal_artery.glb` — from `Medial_calcaneal_artery.r`
62. `lateral_calcaneal_artery.glb` — from `Lateral_calcaneal_branch_of_fibular_artery.r`

**Pipeline**: same Day 4m Kabsch + `scripts/extract_open3d_vessels.py` + `obj2gltf`. Spatial QA: all 5 **accept** (`vessel_spatial_qa.json`).

**Skip verify (not wired)**: Open3D `Medial/Lateral_plantar_artery.r`, `Plantar_metatarsal_arteries.r`, `Dorsal_digital_arteries_of_foot.r`, `Arcuate_artery.r` — BP3D main-tree already covers teaching niche; Open3D dorsal digital denser but still grouped and overlaps Day 4aa dorsal MTA; avoid BY-SA weight without meaningful teaching gain. **No per-ray 1st–4th MTA** in donor OBJ.


## Removal

Delete this directory and remove corresponding `REAL_*` entries / set `placeholder: true` if you decline BY-SA terms.


### Day 4ad — muscle gaps (Open3D) + unique ZA soft meshes

**Open3DModel (CC BY-SA 4.0)** — Kabsch Day 4m → BP3D mm; `scripts/extract_open3d_muscles.py`
- `fibularis_brevis.glb` — `Fibularis_brevis_muscle.r`
- `fibularis_tertius.glb` — `Fibularis_tertius_muscle.r`
- `opponens_digiti_minimi.glb` — `Opponens_digiti_minimi_muscle_of_foot.r`

Skipped Open3D FHB heads / FDMB / FL — BP3D CC BY or UM CC0 already cover those niches.

**Z-Anatomy (CC BY-SA 4.0)** — mesh-API OBJ export (avoid bloated glTF selection dumps); `za_to_bp3d_transform.json` (shared foot bones, mean residual ≈1.8 mm)
- `plantaris.glb` — `Plantaris muscle.r`
- `flexor_hallucis_brevis_lateral.glb` — `Lateral head of flexor hallucis brevis.r` (ADDITIONAL part on BP3D medial FHB)
- `proper_plantar_digital_arteries.glb` — `Proper plantar digital arteries.r` (grouped plural)

Attribution: "Z-Anatomy - The libre 3D atlas of anatomy - CC BY-SA 4.0"; Open3D as above.
