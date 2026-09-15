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

**Inventory note (not integrated this session)**: same OBJ also contains `Medial_plantar_nerve.r`, `Dorsal_metatarsal_arteries.r`, `Plantar_interossei_muscles.r` — nerves already covered by Z-Anatomy extracts; plantar interossei / dorsal metatarsals already covered by BP3D CC BY main-tree meshes.

---

## Isolation Strategy

- Main tree (bones / most muscles / most vessels): MIT code + CC BY 4.0 / CC0
- This `by-sa/` module: optional ShareAlike content (nerves, DI, proximal arteries)
- Do **not** merge these GLBs into a CC BY-only redistribution claim

## Removal

Delete this directory and remove corresponding `REAL_*` entries / set `placeholder: true` if you decline BY-SA terms.
