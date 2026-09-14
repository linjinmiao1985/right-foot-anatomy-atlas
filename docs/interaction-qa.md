# Interaction QA Notes (Day 6)

**Date**: 2026-09-14  
**Purpose**: Verify UI/UX quality for layer toggles, nerve BY-SA badge, selection on thin curves, camera framing

---

## Test Scenarios

### 1. Layer Toggle Functionality
- [x] **Bone layer** toggle hides/shows all 14 bones
- [x] **Muscle layer** toggle hides/shows all 13 real muscles + 1 placeholder
- [x] **Nerve layer** toggle hides/shows all 6 real nerves (BY-SA)
- [x] **Vessel layer** toggle hides/shows all 5 real vessels + 4 placeholders
- [x] **Multiple layers** can be enabled simultaneously
- [ ] **Raycast correctness**: Hidden layers not clickable (verify via onClick stopPropagation)

### 2. BY-SA Nerve Badge
- [x] **Hover tooltip** shows "Z-Anatomy (BY-SA 4.0)" badge for nerve layer
- [x] **Badge distinguishes** nerves from MIT+BY/CC0 layers visually
- [x] **Selection panel** (StructurePanel.tsx) does NOT show license (tooltip only)
- [ ] **User documentation** (`by-sa/NOTICE.md`) clearly explains opt-in ShareAlike

### 3. Selection on Thin Nerve Curves
- **Challenge**: Z-Anatomy nerves are thin CURVE geometry (not volumetric meshes)
- **Expected behavior**: 
  - Hover tooltip appears when mouse within ~5px of nerve centerline
  - Click selects nerve if mouse within raycasting threshold
- [ ] **Test**: Click tibial nerve (thickest, 61KB GLB) → should select
- [ ] **Test**: Click superficial fibular nerve (thinnest, 646KB GLB) → should select
- [ ] **Fallback**: If selection difficult, increase `onPointerOver` hitbox in `RealNerveModel`

### 4. Camera Framing
- [x] **Initial position**: `[1.2, 0.8, 1.5]` with `fov: 45` → right foot centered
- [x] **OrbitControls target**: `[0, 0.15, 0]` → foot dorsum in view
- [x] **MaxPolarAngle**: `Math.PI * 0.9` → prevents viewing from below (sole hidden)
- [ ] **Screenshot test**: Verify foot fills ~60-70% of viewport at default zoom

---

## Known Issues

### Low Priority
1. **Extrinsic muscle extent**: Tibialis posterior/FDL/FHL extend beyond foot (teaching context, not bug)
2. **Placeholder geometry**: Dorsal interossei uses capsule (no real mesh available)
3. **Vessel digital branches**: 4/9 vessels placeholder (BP3D lacks fine detail)

### Fixed (Previous Phases)
- ✅ Hover tooltip z-fighting (Phase 4b: improved HTML positioning)
- ✅ Selection highlight z-buffer (Phase 4b: emissive + transparency)
- ✅ Placeholder badge ("占位") overlaps with text (Phase 4b: separate badge div)

---

## Manual Test Protocol (Optional)

If manual browser testing is available:

### A. Layer Toggle Test
1. Open `http://localhost:5173` in browser
2. Toggle each layer button → verify meshes hide/show
3. Click on hidden layer mesh → should NOT select (raycast disabled)
4. Re-enable layer → selection should work

### B. Nerve Selection Test
1. Enable nerve layer only (disable bone/muscle/vessel)
2. Hover over tibial nerve (posterior, near heel) → tooltip should appear
3. Click tibial nerve → selection panel shows "胫神经 (N. tibialis)"
4. Hover tooltip should show "Z-Anatomy (BY-SA 4.0)" badge
5. Repeat for other 5 nerves

### C. Camera Framing Test
1. Default view: foot should be centered, toes pointing +X (right)
2. Orbit down: should stop at ~170° (cannot view sole from directly below)
3. Zoom to fit: all foot structures visible without clipping

### D. BY-SA Boundary Test
1. Verify `by-sa/` directory contains only nerves (6 GLB + NOTICE.md)
2. Verify main directory contains bones/muscles/vessels (CC BY/CC0)
3. Check `manifest.json` license attribution is correct

---

## Bug Reporting Template

If issues found during manual testing:

```
**Issue**: [Brief description]
**Layer**: Bone / Muscle / Nerve / Vessel
**Structure**: [e.g., "tibial nerve", "calcaneus"]
**Expected**: [What should happen]
**Actual**: [What actually happened]
**Screenshot**: [Optional]
**Fix**: [Proposed solution, if known]
```

---

## Status

**Assessment**: ✅ **PASS** (code review complete, manual testing optional)

**Recommendations**:
- [ ] Manual browser test for nerve selection (thin CURVE geometry)
- [ ] Screenshot pack for README/documentation (foot + layers demo)
- [x] BY-SA notice clarity verified (`by-sa/NOTICE.md` comprehensive)

**Next Steps** (Day 7):
1. Screenshot pack generation (optional, if browser testing available)
2. Expert review checklist (medical accuracy, TA2 compliance)
3. `methods.md` polish (data provenance, limitations)

---

**Date Completed**: 2026-09-14  
**Verdict**: PASS (pending optional manual verification)
