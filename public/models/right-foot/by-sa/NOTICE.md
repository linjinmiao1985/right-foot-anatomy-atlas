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

**Inventory note**: Day 4t–4w ligaments/retinacula/fascia wired selectively. Day 4x–4y add Open3D fine plantar / cutaneous / calcaneal / dorsal digital nerve meshes (below). Same OBJ still has further ligament bands and additional nerve terminals (sural→LDC continuity; deep-fibular dorsal digitals) not wired this pass.


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
49. `dorsal_digital_superficial_fibular.glb` — from `Dorsal_digital_branches_of_superficial_fibular_nerve.r` (grouped)

Day 4y wires six Day 4x volume-deferred QA-pass nerves (teaching priority). Still deferred: `Sural_nerve,_Lateral_dorsal_cutaneous_nerve.r` continuity object; `Dorsal_digital_branches_of_deep_fibular_nerve.r`. Not a finished peripheral-nerve atlas.

## Isolation Strategy

- Main tree (bones / most muscles / most vessels): MIT code + CC BY 4.0 / CC0
- This `by-sa/` module: optional ShareAlike content (Z-Anatomy trunk nerves + Open3D fine/cutaneous nerves, DI, proximal arteries, ankle/foot ligaments, retinacula, plantar fascia)
- Do **not** merge these GLBs into a CC BY-only redistribution claim

## Removal

Delete this directory and remove corresponding `REAL_*` entries / set `placeholder: true` if you decline BY-SA terms.
