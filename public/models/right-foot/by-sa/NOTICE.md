# CC BY-SA 4.0 Assets — Z-Anatomy Nerves

⚠️ **ShareAlike License Notice** ⚠️

The nerve models in this directory are licensed under **CC BY-SA 4.0** (ShareAlike), which requires derivatives to use the same license.

---

## Files in This Directory (6 nerves, ~2.5MB)

1. `tibial_nerve.glb` — Tibial nerve (胫神经)
2. `medial_plantar_nerve.glb` — Medial plantar nerve (足底内侧神经)
3. `lateral_plantar_nerve.glb` — Lateral plantar nerve (足底外侧神经)
4. `deep_fibular_nerve.glb` — Deep fibular nerve (腓深神经)
5. `superficial_fibular_nerve.glb` — Superficial fibular nerve (腓浅神经)
6. `sural_nerve.glb` — Sural nerve (腓肠神经)

---

## Source & Attribution

### Upstream Project
- **Z-Anatomy** — The libre 3D atlas of anatomy
- Repository: https://github.com/Z-Anatomy/Models-of-human-anatomy
- License: CC BY-SA 4.0
- Authors: Gauthier Kervyn (design, 3D, anatomy), Marcin Zielinski (Blender addon)

### Base Model
- **BodyParts3D** by Database Center for Life Science (DBCLS), Japan
- License: CC BY-SA 2.1 Japan
- URL: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/

### Attribution String (Required)
```
"Z-Anatomy - The libre 3D atlas of anatomy - CC BY-SA 4.0"
"BodyParts3D" by Database Center for Life Science licensed under CC BY-SA 2.1 Japan
```

---

## License Terms (CC BY-SA 4.0)

Full license: https://creativecommons.org/licenses/by-sa/4.0/

### You must:
- ✅ **Attribute** the original authors (see above)
- ✅ **Indicate changes** if you modify these files
- ✅ **Use the same license** (CC BY-SA 4.0) if you distribute derivatives

### You may:
- ✅ Share and redistribute (any medium, any purpose, including commercial)
- ✅ Adapt, remix, and transform

---

## Isolation Strategy

To avoid "ShareAlike taint" spreading to the entire codebase:

- **Main redistributable layers** (bones, muscles, vessels): MIT code + CC BY / CC0 assets
- **Optional BY-SA module** (nerves): Isolated in `by-sa/` subdirectory
- **User choice**: Load nerve layer → accept BY-SA terms; skip nerve layer → MIT+BY/CC0 only

This project's code (MIT) and non-BY-SA assets (CC BY 4.0 / CC0 1.0) remain freely mixable.

---

## Technical Details

- **Format**: glTF 2.0 Binary (.glb)
- **Geometry**: CURVE objects (Blender) converted to GLB
- **Modifications**: Extracted right foot nerves only (.r suffix); no topology changes
- **Export tool**: Blender 4.0.2
- **Export date**: 2026-09-14

---

## Removal Instructions

If you do NOT wish to accept CC BY-SA 4.0 terms:

1. Delete this `by-sa/` directory
2. Comment out nerve layer loading in `FootModel.tsx`
3. Set `placeholder: true` for all nerve structures in `structures.json`
4. Remove Z-Anatomy attribution from README

The atlas will continue working with bones, muscles, and vessels (MIT + CC BY / CC0).

---

**Questions?** See `/third_party/z-anatomy/NOTICE` or contact Z-Anatomy upstream:  
https://github.com/Z-Anatomy/Models-of-human-anatomy/issues
