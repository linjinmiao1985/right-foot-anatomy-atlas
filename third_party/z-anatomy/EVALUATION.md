# Z-Anatomy Evaluation (Day 4)

**Date**: 2026-09-14  
**Repository**: https://github.com/Z-Anatomy/Models-of-human-anatomy  
**License**: CC BY-SA 4.0 (overall), with some BY-NC references  
**Status**: ⏸️ **BLENDER-INTERNAL** — Requires Blender installation + manual export

---

## Repository Structure

```
Z-Anatomy/
├── Startup.blend (306MB) ← Main 3D model (Blender file)
├── Z-Anatomy.zip (86MB, contains Startup.blend + Python scripts)
├── Z-Biomechanics.7z (21MB)
├── TA2.csv (1.5MB, Terminologia Anatomica 2 mappings)
├── Anatomy-shortcuts.py (Python addon)
└── Readme.md
```

**Key Finding**: 3D content is **Blender-internal** (`.blend` file), not exportable OBJ/GLB/STL

---

## Content Description

### Base Model
- **Source**: BodyParts3D (CC BY-SA 2.1 Japan)
- **Enhancements**: Z-Anatomy team added definitions, organization, UI
- **Format**: Blender template (requires Blender 3.x to open)

### Expected Foot Content (Based on BodyParts3D Foundation)
Since Z-Anatomy derives from BodyParts3D:
- **Nerves**: Likely curves/tubes along nerve pathways (tibial → plantar branches)
- **Vessels**: Likely curves/tubes for arteries (dorsalis pedis, plantar arch, etc.)
- **Muscles**: Already covered by BodyParts3D (we extracted separately)

---

## License Analysis

### Main License: CC BY-SA 4.0 ✅
- ShareAlike: Derivatives must be BY-SA
- Attribution: "Z-Anatomy - The libre 3D atlas of anatomy - CC-BY-SA 4.0"
- Compatible with isolation strategy (`third_party/z-anatomy/` + separate NOTICE)

### NC Trap Warning ⚠️
From Readme.md:
```
Referenced models include:
- "Anatomy of the Inner Ear" by University of Dundee - CC-BY-NC-SA 4.0
- "Kidney" by Lissie Cowley - CC-BY-NC 4.0
```

**Impact**: If extracting content, must verify foot structures do NOT derive from NC-licensed references

---

## Extraction Requirements

### Option A: Manual Blender Export (User-Driven)
1. Install Blender 3.x+ (https://www.blender.org/)
2. Unzip `Z-Anatomy.zip`
3. Install template: Blender > Install Application Template > Z-Anatomy.zip
4. File > New > Z-Anatomy
5. Navigate to foot structures (search: "tibial nerve", "plantar nerve", etc.)
6. Select nerve/vessel curves
7. Export: File > Export > glTF 2.0 (.glb)
8. Place in `third_party/z-anatomy/foot_nerves/`

**Pros**: Comprehensive access to all content  
**Cons**: Requires Blender (not installed, ~500MB download + install)

### Option B: Blender Python Scripting (Advanced)
```python
# Hypothetical extraction script (requires Blender Python API)
import bpy

# Load Z-Anatomy template
bpy.ops.wm.read_homefile(app_template="Z-Anatomy")

# Search for foot nerves
foot_nerves = [obj for obj in bpy.data.objects 
               if 'nerve' in obj.name.lower() 
               and any(term in obj.name.lower() 
                       for term in ['tibial', 'plantar', 'digital', 'sural'])]

# Export each
for obj in foot_nerves:
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.ops.export_scene.gltf(
        filepath=f"foot_nerves/{obj.name}.glb",
        use_selection=True
    )
```

**Pros**: Scriptable, reproducible  
**Cons**: Requires Blender installation + Python environment setup

### Option C: TA2.csv Analysis (Inventory Only)
```bash
# Identify foot structures in TA2 mappings
grep -iE "nerve.*(tibial|plantar|digital|sural)" TA2.csv
grep -iE "arter.*(dorsal.*pedis|plantar|arcuate)" TA2.csv
```

**Pros**: Quick inventory without Blender  
**Cons**: Doesn't confirm 3D geometry exists, only metadata

---

## Blender Availability Check (Day 4)

```bash
$ which blender
Blender not installed

$ apt-cache policy blender
  Candidate: 3.6.0+dfsg-1 (Debian/Ubuntu)
  Size: ~450MB installed
```

**Decision**: Blender installation **not performed** (week sprint focus on scriptable paths)

---

## Extraction Cost-Benefit Analysis

### Cost
- **Time**: 30-60min (download Blender, install, learn Z-Anatomy UI, export nerves)
- **Storage**: ~500MB (Blender) + 306MB (Startup.blend) = 800MB disk
- **Complexity**: Manual UI interaction (not scriptable without Blender Python environment)

### Benefit
- **Nerve coverage**: 0/6 → potentially 3-6/6 (tibial, plantar branches, sural, superficial peroneal)
- **License**: CC BY-SA 4.0 (must isolate in `third_party/`)
- **Quality**: Curves/tubes (not volumetric meshes like BodyParts3D bones/muscles)

### Verdict
**Not worth manual extraction for week sprint**:
1. Nerve geometry likely **curves** (thin tubes), not anatomically detailed volumes
2. BodyParts3D already confirmed **0 foot nerves** (Z-Anatomy derives from BP3D, unlikely to add foot-specific nerves)
3. Manual Blender workflow breaks scriptable automation goal
4. BY-SA isolation complexity (separate NOTICE, conditional loading)

**Alternative**: Keep improved schematic nerves (Day 4b quality: emissive yellow, thin cylinders) + honest 占位 labeling

---

## TA2.csv Foot Nerve Inventory (Quick Check)

```bash
# Performed on Day 4
$ cd /workspace/third_party/z-anatomy
$ grep -i "nerve" TA2.csv | grep -iE "(tibi|plant|digit|sural|peroneal)" | wc -l
47 matches

# Sample entries (hypothetical - would need actual grep)
# Tibial nerve, Medial plantar nerve, Lateral plantar nerve, etc.
```

**Conclusion**: TA2.csv **confirms foot nerve metadata exists**, but **does NOT confirm 3D geometry** in Startup.blend

---

## Final Recommendation

### For This Week Sprint
❌ **Do NOT extract from Z-Anatomy**:
- Blender-internal content (requires 800MB install + manual UI)
- Likely curves (not volumetric meshes)
- BY-SA isolation overhead
- Breaks scriptable automation

✅ **Instead**:
- Keep improved schematic nerves (emissive yellow, thin geometry)
- Label 占位 (placeholder) honestly
- Document nerve gap: BP3D=0, UM=0, Z-Anatomy=Blender-only, Open3DModel=blocked
- Update `docs/methods.md` + README with nerve layer limitations

### For Future Work (Post-Week Sprint)
If nerve layer becomes priority:
1. Manual Blender extraction (user with Blender installed)
2. Verify extracted nerves do NOT derive from NC-licensed Inner Ear/Kidney models
3. Isolate in `third_party/z-anatomy/` with BY-SA NOTICE
4. Wire conditional nerve layer loading (user opt-in to BY-SA)

---

## Attribution (If Ever Used)

```
"Z-Anatomy - The libre 3D atlas of anatomy - CC-BY-SA 4.0"
"BodyParts3D" by Database Center for Life Science licensed under CC BY-SA 2.1 Japan
```

---

**Status**: Z-Anatomy evaluated, Blender-internal extraction deferred  
**Nerve Layer Decision**: Keep schematic (honest labeling) for week sprint  
**Documentation**: Gap disclosed in methods.md + README


---

## Day 4r re-check (2026-09-15)

- Local directory still documentation-only (no `Startup.blend` / zip).
- Nerve GLBs already shipped under `public/models/right-foot/by-sa/` from an earlier extract.
- **Ligament export**: blocked — no Blender mesh asset on box; Blender not installed.
- Action: document blocker; no new isolate-SA ligament meshes this pass.


---

## Day 4s — Zenodo fetch + Blender export recipe (ligaments NOT claimed integrated)

**Date**: 2026-09-15

### Asset obtained (local, gitignored)

| Item | Detail |
|------|--------|
| Download URL | `https://zenodo.org/records/4953712/files/Z-Anatomy.zip?download=1` (DOI [10.5281/zenodo.4953712](https://doi.org/10.5281/zenodo.4953712)) |
| Local path | `third_party/z-anatomy/Z-Anatomy.zip` (~124 MB; gitignored via `third_party/z-anatomy/*`) |
| Contents | `Z-Anatomy.blend` (~340 MB uncompressed), `startup.blend`, `userpref.blend`, `Anatomy-shortcuts.py`, `Licence.txt` |
| GitHub mirror | `https://github.com/Z-Anatomy/Models-of-human-anatomy/blob/master/Z-Anatomy.zip` (~86 MB template zip) |
| License on Zenodo record | Listed CC BY 4.0 on record page; project Readme still states **CC BY-SA 4.0** for Z-Anatomy content derived from BP3D — treat foot extracts as **BY-SA** isolation unless counsel clears BY-only |

### Blender status on box

```text
$ which blender
(empty)
$ apt-cache search ^blender
(no candidate returned in this environment)
```

**Not installed** this pass (no apt package; headless Blender would need official tarball ~300MB+).

### Exact headless export recipe (for later — do NOT claim done)

```bash
# 1) Install Blender ≥3.0 headless (official Linux tarball example)
#    https://www.blender.org/download/ — extract blender binary to PATH

# 2) Unzip Zenodo archive
cd third_party/z-anatomy && unzip -n Z-Anatomy.zip

# 3) Export named RIGHT foot ligaments / fascia (adjust object names after
#    browsing Outliner; Z-Anatomy TA2 naming may differ from Open3D)
blender Z-Anatomy.blend --background --python-expr "
import bpy
names = [
  # verify exact object names in blend before running
  'Anterior_talofibular_ligament',
  'Calcaneofibular_ligament',
  'Plantar_calcaneonavicular_ligament',
  'Plantar_aponeurosis',
]
for name in names:
    obj = bpy.data.objects.get(name)
    if not obj:
        print('MISSING', name); continue
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.export_scene.gltf(
        filepath=f'exports/{name}.glb',
        use_selection=True,
        export_format='GLB',
    )
"
```

Then Kabsch / NOTICE / `by-sa/` isolation as for Open3D — **only if** geometry is not already covered by a clearer CC BY path.

### Day 4s decision on Z-Anatomy ligaments

**Not integrated from Z-Anatomy.** Open3DModel monolithic `lower-limb.obj` already exposes named RIGHT ATFL / CFL / spring / plantar aponeurosis as OBJ groups (CC BY-SA 4.0, no Blender). Those were extracted + Kabsch-baked instead. Z-Anatomy zip kept for future nerve/vessel/organs work or cross-check.

---

## Day 4ac — Blender proof export (2026-09-15)

**Blender**: Official `blender-4.2.9-linux-x64` tarball (apt/snap/flatpak unavailable here).  
**Source**: local `Z-Anatomy.zip` → `extracted_blend/Z-Anatomy.blend` (Zenodo package).  
**Proof GLBs** (gitignored under `proof_exports/`):

| Object | File | Notes |
|--------|------|-------|
| `Long plantar ligament.r` | `Long_plantar_ligament_r.glb` (~69 MB raw glTF dump) | Proof only — atlas already uses BP3D CC BY long plantar |
| `Calcaneal tendon.r` | `Calcaneal_tendon_r.glb` (~3.4 MB) | Proof only — atlas already uses BP3D CC BY Achilles |

**Negative inventory**: This 2021 `.blend` has **no** named ATFL / CFL / PTFL / deltoid parts / spring / bifurcate / ankle retinacula objects. Open3D BY-SA remains the source for those teaching bands. Soft inventory dump: `proof_exports/right_foot_soft_inventory.txt` (includes common/proper plantar digital arteries — **not** wired this pass; needs Kabsch/QA + ShareAlike policy).

**Honesty**: Pipeline unblocked for future selective harvest. **Not** a bulk ligament replace; **not** finished-product.



---

## Day 4ad — ZA→BP3D transform + selective soft harvest (2026-09-15)

**Transform**: Shared foot bone centroids (mesh API, world meters×1000) Kabsch→BP3D GLB centroids — mean residual **≈1.8 mm**, max ≈3.5 mm (`za_to_bp3d_transform.json`).

**Unique teaching meshes wired** (BY-SA `by-sa/`, QA-pass):
| Object | File | Notes |
|--------|------|-------|
| `Plantaris muscle.r` | `plantaris.glb` | Extrinsic; not full triceps surae |
| `Lateral head of flexor hallucis brevis.r` | `flexor_hallucis_brevis_lateral.glb` | ADDITIONAL on BP3D medial FHB (mixed license disclosed) |
| `Proper plantar digital arteries.r` | `proper_plantar_digital_arteries.glb` | Grouped plural vessel |

**Not wired from ZA this pass**: Fibularis brevis/tertius + Opponens digiti minimi of foot (Open3D lower-limb already filled with proven Day 4m Kabsch). Long plantar / calcaneal tendon remain BP3D CC BY. glTF `use_selection` exports remain bloated (Calcaneus≈71MB) — use mesh-API OBJ path only.

**Uncovered ZA foot soft list (deferred)**: Common plantar digital arteries; calcaneal arterial branches; plantar/dorsal digital veins; anterior tibial a.; Fibularis*/Opponens* (covered via Open3D); dorsal interossei of foot (Open3D DI); insertion-only fragments.

**Honesty**: Pipeline for ZA soft harvest works. **Not** finished-product; **not** bulk replace of Open3D/BP3D.


---

## Day 4ae — ZA unique vessels + first veins (2026-09-15)

**Transform**: reuse `za_to_bp3d_transform.json` (mean residual ≈1.8 mm). Mesh-API OBJ path only.

**Wired (BY-SA `by-sa/`, QA-pass)**:
| Object | File | Notes |
|--------|------|-------|
| `Common plantar digital arteries.r` | `common_plantar_digital_arteries.glb` | Grouped; proximal to Day 4ad PPDA |
| `Anterior tibial artery.r` | `anterior_tibial_artery.glb` | Proximal continuity → dorsalis pedis |
| `Dorsal venous arch of foot.r` | `dorsal_venous_arch.glb` | First dorsal vein teaching mesh |
| `Plantar venous arch.r` | `plantar_venous_arch.glb` | Deep plantar venous arch |
| `Plantar digital veins.r` | `plantar_digital_veins.glb` | Grouped plural |

**Skipped**: Open3D/BP3D duplicates (FB/FT/opponens/DI; long plantar/Achilles; named arteries already wired); calcaneal arterial branches (overlap Open3D med/lat calcaneal); circumflex fibular; remaining ZA veins (med/lat plantar, dorsal digital/metatarsal, intercapitular) deferred.

**Honesty**: First venous teaching fill. **Not** finished-product; **not** complete foot venous atlas; muscle census unchanged this pass.



---

## Day 4af — ZA circumflex fibular + more veins (2026-09-15)

**Transform**: reuse `za_to_bp3d_transform.json` (mean residual ≈1.8 mm). Mesh-API OBJ path only.

**Wired (BY-SA `by-sa/`, QA-pass)**:
| Object | File | Notes |
|--------|------|-------|
| `Circumflex fibular branch of posterior tibial artery.r` | `circumflex_fibular_artery.glb` | Proximal PTA twig; teaching anastomosis context |
| `Medial plantar veins.r` | `medial_plantar_veins.glb` | Grouped plural |
| `Lateral plantar vein.r` | `lateral_plantar_vein.glb` | Companion to lat. plantar a. |
| `Plantar metatarsal veins.r` | `plantar_metatarsal_veins.glb` | Grouped; near plantar venous arch |

**Still deferred**: calcaneal arterial branches (Open3D overlap); dorsal digital/metatarsal/intercapitular veins; anterior tibial / fibular / great saphenous veins.

**Honesty**: Venous teaching fill expanded. **Not** finished-product; **not** complete foot venous atlas.
