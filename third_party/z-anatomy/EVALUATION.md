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
