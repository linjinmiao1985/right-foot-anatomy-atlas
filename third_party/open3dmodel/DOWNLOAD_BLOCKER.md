# Open3DModel Download Blocker

**Date**: 2026-09-14 (Day 3)  
**Status**: ⏸️ **BLOCKED** — Direct download URL not accessible

---

## Attempted Access

### Target File
- **Package**: `lower-limb-obj.zip` (July 2025版本)
- **Source**: https://anatomytool.org/open3dmodel-create
- **License**: CC BY-SA (version not explicitly stated, likely 4.0)
- **Content**: OBJ无纹理/颜色/法线贴图（避免UBC BY-NC-SA纹理陷阱）

### Attempted URLs (All Failed)
1. `https://anatomytool.org/sites/default/files/models/lower-limb-obj.zip` → **404 Not Found**
2. `https://anatomytool.org/sites/default/files/open3dmodel/lower-limb-obj.zip` → **404 Not Found**
3. `https://caskanatomy.info/open3dmodel/lower-limb-obj.zip` → **404 Not Found**

### Root Cause
- Download links on AnatomyTOOL页面appear to be dynamic/session-based or behind authentication
- Table shows "lower-limb-obj.zip July 2025" but clicking URL不可脚本化获取
- 可能需要：
  1. Browser manual download (user login/session)
  2. 联系Open3D project获取direct link
  3. Alternative source (Z-Anatomy GitHub?)

---

## Workaround Options

### Option A: Manual Browser Download (Week Sprint Compatible)
1. Open https://anatomytool.org/open3dmodel-create in browser
2. Scroll to "Lower limb" row in table
3. Click "lower-limb-obj.zip July 2025" (middle column)
4. Manual save to `/workspace/third_party/open3dmodel/`
5. Extract + inventory foot nerves (tibial → plantar branches)

**Pros**: Likely to work if file exists  
**Cons**: Requires manual step (but week sprint allows careful work)

### Option B: Z-Anatomy GitHub Alternative
- **Repo**: https://github.com/Z-Anatomy/Models-of-human-anatomy
- **License**: CC BY-SA 4.0 (confirmed)
- **Content**: Curves for nerves/vessels (not volumetric meshes?)
- **Status**: Need to verify if foot nerve meshes exist

### Option C: Keep Schematic Nerves (Honest Labeling)
- Current nerve layer: 6 cylinder placeholders labeled 占位
- BP3D foot-region nerves: **0** (confirmed from isa_parts_list scan)
- UM nerves: **0** (confirmed, no nerve geometries)
- If Open3DModel inaccessible: **Document gap honestly**, improve schematic quality

---

## License Verification (If Downloaded)

### Required Checks
1. ✅ Verify license file in ZIP states "CC BY-SA 4.0" (not 3.0 or unversioned)
2. ⚠️ Confirm OBJ files are **textureless** (avoid UBC BY-NC-SA texture taint)
3. ✅ Document attribution: "Open3D project, Jan Kooloos (RadboudUMC), Eungyeol Lee (LUMC) et al"
4. ✅ Isolation strategy: Place in `third_party/open3dmodel/` with separate NOTICE (SA-taint boundary)

### NC Texture Trap (AVOID)
From anatomytool.org textures page:
```
texture-Muscle * → Based on 'Thoracic walls' by Claudia Krebs et al, 
Univ. of British Columbia, licensed CC BY-NC-SA Int 4.0
```
**Action**: Use **only** OBJ zip (no textures) to avoid NC contamination

---

## Foot Nerve Inventory (Expected from Open3DModel)

**Priority Nerves for Atlas**:
1. Tibial nerve (→ medial + lateral plantar nerves)
2. Medial plantar nerve
3. Lateral plantar nerve
4. Deep peroneal nerve (→ dorsal digital nerves)
5. Superficial peroneal nerve (→ dorsal cutaneous)
6. Sural nerve

**Expected Format**: OBJ curve/tubular meshes along nerve pathways

---

## Decision (Day 3)

**Proceed with Option C (Honest Schematic) + Document Gap**:
- Open3DModel download blocked by website architecture (not API-accessible)
- Manual download possible but requires human intervention (week sprint allows this)
- **For now**: Keep improved schematic nerves (Day 4b capsule/emissive quality), label 占位
- **Document**: `docs/methods.md` + README section explaining nerve layer gap (BP3D=0, UM=0, Open3DModel=blocked)
- **Revisit**: If manual download becomes available later in week

---

## Alternative: Z-Anatomy Evaluation (Day 3 Backup)

If Open3DModel remains inaccessible, evaluate Z-Anatomy:
- **Repo**: https://github.com/Z-Anatomy/Models-of-human-anatomy
- **License**: CC BY-SA 4.0
- **Content**: Investigate if lower limb nerve meshes exist (not just curves)
- **Status**: Pending investigation

---

**Blocker Impact**: Nerve layer remains schematic (6/6 placeholder)  
**Week Sprint Status**: Not blocking Day 3-4 work (focus on docs + remaining vessels)  
**Honest Disclosure**: Nerve gap documented in methods.md + README

---

## Resolution (2026-09-15)

Literature Scout provided the real package outside this git tree:

- `/workspace/literature/open3d-assets/lower-limb-obj.zip` (~20 MB)
- `/workspace/literature/open3d-assets/lower-limb.obj` (~100 MB)
- `/workspace/literature/open3d-assets/NOTICE.txt` (CC BY-SA 4.0)

**Do not use** this directory’s `lower-limb-obj.zip` stub (~16 KB placeholder).

Extracted teaching meshes (DI 1–4, posterior tibial + fibular arteries) live in
`public/models/right-foot/by-sa/` with updated NOTICE.md. Intermediate OBJs under
`third_party/open3dmodel/extracted/`.
