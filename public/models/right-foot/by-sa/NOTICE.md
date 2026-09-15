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

**Inventory note**: Day 4t–4v extracted selected ankle/midfoot/forefoot bands. Same OBJ still has further bands (medial talocalcaneal & dorsal intercuneiform deferred Day 4v; plantar cuneonavicular, cuboideonavicular, toe collaterals, etc.) not wired. Nerves covered by Z-Anatomy; DI partly covered elsewhere.


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

Same source/license/Kabsch pipeline as DI + proximal arteries (Day 4s–4v). Attachment QA: centroid→expected BP3D bone landmarks; Day 4v mins ≈2.8–34.3 mm. Teaching-grade co-registration only — **not** a finished ligament atlas. Deferred (volume): medial talocalcaneal, dorsal intercuneiform. Further OBJ bands remain unwired.

---

## Isolation Strategy

- Main tree (bones / most muscles / most vessels): MIT code + CC BY 4.0 / CC0
- This `by-sa/` module: optional ShareAlike content (nerves, DI, proximal arteries, ankle/foot ligaments, retinacula, plantar fascia)
- Do **not** merge these GLBs into a CC BY-only redistribution claim

## Removal

Delete this directory and remove corresponding `REAL_*` entries / set `placeholder: true` if you decline BY-SA terms.
