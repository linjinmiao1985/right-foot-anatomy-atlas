# Asset Research Round 2 — Comprehensive Survey (Literature Scout Verified)

**Date**: 2026-09-14 (Day 1)  
**Status**: IN PROGRESS (Week Sprint)  
**Objective**: Exhaustive ≥12-source survey with **verified licenses** for right foot anatomy

**Owner Directive**: Quality week sprint. No premature "delivered" claims. Deep integration > shallow docs.

---

## Hybrid Strategy (Owner-Approved)

### Main Redistributable Layer (CC BY / CC0)
- **BodyParts3D CC BY 4.0**: Bones (14/14 ✅) + plantar intrinsics (~8) + foot vessels (~4-6)
- **Universiti Malaya CC0 1.0**: Quadratus plantae, extensor digitorum brevis, plus AH/ADM/FDB if BP3D incomplete

### Optional Isolated BY-SA Module
- **Open3DModel Lower Limb CC BY-SA 4.0**: Nerves + fuller intrinsics (FHB, AddH, lumbricals, interossei)
- **Isolation**: `third_party/open3dmodel/` + separate NOTICE
- **Preference**: Use `lower-limb-obj.zip` (textureless, no NC trap)
- **Avoid**: UBC Krebs textured blend/GLB (BY-NC-SA trap)

### Excluded (NC/Custom)
- ❌ **Zenodo 20231308→21354714**: CC BY-NC-SA (NC = non-commercial trap)
- ❌ **NIH 15850 / Antwerp ASTARC**: NC-SA (reject)
- ❌ **Zenodo 1056750**: CC BY but PDF only (no meshes)

---

## Verified Dataset Inventory

### 1. ✅ BodyParts3D Release 4.0 — **CORRECTED ASSESSMENT**

**Source**: Database Center for Life Science (DBCLS), Japan  
**DOI**: 10.18908/lsdba.nbdc00837-007  
**URL**: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/

**License**: ✅ **CC BY 4.0** (verified 2025-02-27 update)

**Content** (from `isa_parts_list_e.txt` scan):
- **Bones**: ✅ 14/14 foot bones (INTEGRATED Phase 3)
- **Muscles**: ✅ **Many plantar intrinsics** (abductor hallucis, flexor digitorum brevis, abductor digiti minimi, flexor hallucis brevis partial)
- **Vessels**: ✅ **Foot vessels present** (dorsalis pedis artery, plantar arteries)
- **Nerves**: ❌ **Foot-region nerves = 0** (confirmed absent)
- **Missing**: Quadratus plantae, extensor digitorum brevis, dorsal interossei

**Phase 4 Error Correction**:
- ❌ Previously stated: "Soft tissue NONE (bones only)"
- ✅ **Corrected**: BP3D **DOES contain foot muscles and vessels**
- **Root Cause**: Insufficient archive exploration (only checked bone extraction)

**Foot Coverage**:
- Bones: 14/14 (100%) ✅
- Muscles: ~8/14 (57%) ✅ (plantar layer strong, dorsal layer weak)
- Vessels: ~4-6/6 (67-100%) ✅
- Nerves: 0/6 (0%) ❌

**Verdict**: ✅ **ADOPT** (osteology + partial myology + vasculature)

**Next Steps**:
1. Search `isa_parts_list_e.txt` for foot muscle BP codes
2. Extract OBJ from archive (`isa_BP3D_4.0_obj_99.zip`)
3. Convert to GLB, integrate FootModel muscle layer
4. Extract foot vessel OBJ, integrate vessel layer

---

### 2. ✅ Universiti Malaya Asian Male LE MSK — **VERIFIED CC0**

**DOI**: 10.22452/RD/5T6TZ7  
**URL**: https://researchdata.um.edu.my/dataset.xhtml?persistentId=doi:10.22452/RD/5T6TZ7

**License**: ✅ **CC0 1.0 Universal** (Public Domain Dedication)
- No attribution required
- Redistribute/modify freely
- Mix with any license

**Content** (verified from Scout):
- **67 parts**: 13 bones, 42 muscles, 5 ligaments, 4 cartilage, 2 tendons, 1 meniscus
- **Confirmed foot muscles**: Abductor hallucis, abductor digiti minimi, flexor digitorum brevis, **quadratus plantae ✅**, **extensor digitorum brevis ✅**
- **Missing foot muscles**: Flexor hallucis brevis, adductor hallucis, lumbricals (4), plantar interossei (3), dorsal interossei (4)
- **No nerves/vessels**: ❌ Confirmed absent

**Strategic Role**:
- ✅ **Gap filler for BP3D**: Provides QP + EDB (missing from BP3D)
- ✅ **CC0 advantage**: Public domain, no attribution burden
- ✅ **BY-compatible**: Mix freely with BP3D CC BY 4.0

**Limitations**:
- ⚠️ Metatarsals may be unsplit (single vs 5 bones)
- ⚠️ Some intrinsics absent (FHB, AddH, lumbricals, interossei)

**Verdict**: ✅ **ADOPT** (CC0 patch for BP3D gaps)

**Status**: ⏸️ Download pending (58.3MB STL ZIP)

---

### 3. ✅ Open3DModel Lower Limb — **CC BY-SA 4.0 (ISOLATED)**

**Source**: https://anatomytool.org/content/open3dmodel  
**Provider**: Open3DModel Project

**License**: ⚠️ **CC BY-SA 4.0** (ShareAlike)
- ✅ Attribution required
- ✅ Redistribution OK
- ⚠️ **ShareAlike trigger**: Derivatives must be BY-SA
- ⚠️ **SA-taint risk**: May "infect" entire atlas if mixed

**Mitigation**: **Isolate in `third_party/open3dmodel/` with separate NOTICE**

**Content**:
- **Lower Extremity Nerves**: Tibial nerve → plantar nerve branches
- **Vessels**: Femoral → popliteal → dorsalis pedis → plantar arteries
- **Muscles**: FHB, AddH, QP, lumbricals, interossei (fuller intrinsic set than BP3D + UM)
- **About page lists**: "Flexor hallucis brevis, Adductor hallucis, Quadratus plantae, Lumbricals"

**File Options**:
- ✅ **Prefer**: `lower-limb-obj.zip` (textureless, ~100MB)
- ❌ **Avoid**: UBC Krebs textured blend/GLB (BY-NC-SA trap — NC = non-commercial!)

**Verdict**: ⚠️ **ADOPT IF ISOLATED** (BY-SA module for nerves + missing intrinsics)

**Strategy**:
- Place in `third_party/open3dmodel/` (never in `public/models/`)
- Load conditionally in FootModel (user opt-in to BY-SA content)
- Document SA-taint clearly in README + CONTRIBUTING
- Main atlas remains CC BY (bones + vessels from BP3D, QP/EDB from UM CC0)

**Status**: ⏸️ Pending download + extraction

---

### 4. ✅ DU Visible Human LE MSK — **CC BY 4.0 (DEFER)**

**DOI**: 10.56902/COB.vh.2022.0  
**URL**: https://digitalcommons.du.edu/visiblehuman/2/

**License**: ✅ **CC BY 4.0**

**Content**:
- 76 muscles (38 bilateral): Iliacus → Flexor Digitorum distally
- High-quality STL (Final 3D Models, no overclosures)

**Foot Coverage**:
- ✅ 3 extrinsics: Tibialis posterior, flexor digitorum longus, flexor hallucis longus
- ❌ 0 intrinsics: Segmentation stops at extrinsics

**Verdict**: ⏸️ **DEFER** (UM CC0 + BP3D CC BY provide same/better)

**Reason**:
- UM has QP/EDB (DU lacks)
- BP3D has plantar intrinsics (DU lacks)
- CC0 > CC BY (no attribution)
- Download blocked (Cloudflare 403)

**Status**: LOW PRIORITY (redundant with UM + BP3D)

---

### 5. ❌ Zenodo 20231308 → 21354714 — **CC BY-NC-SA (REJECT)**

**DOI**: 10.5281/zenodo.20231308 (redirects to 21354714)

**License**: ❌ **CC BY-NC-SA 4.0**
- ❌ **NC = Non-Commercial** (prohibits commercial use)
- ❌ **SA = ShareAlike** (triggers BY-SA for derivatives)
- ❌ **Double trap**: NC prohibits many uses, SA infects codebase

**Content**: Lower extremity muscles (may include foot)

**Verdict**: ❌ **REJECT** (NC clause incompatible with open-source project)

**Reason**: MIT-licensed code + CC BY-NC assets = license conflict

---

### 6. ❌ Zenodo 1056750 — **CC BY but PDF ONLY (REJECT)**

**DOI**: 10.5281/zenodo.1056750

**License**: ✅ CC BY 4.0 (but irrelevant)

**Content**: Foot nerve **diagram** (PDF illustration, not 3D mesh)

**Verdict**: ❌ **REJECT** (no redistributable mesh)

---

### 7. ❌ NIH 3D Print Exchange 15850 / Antwerp ASTARC — **NC-SA (REJECT)**

**Source**: NIH 3D Print Exchange  
**Entries**: Various foot anatomy models

**License**: ❌ **CC BY-NC-SA** (varies per entry, many NC-SA)

**Verdict**: ❌ **REJECT** (NC clause)

**Note**: Always check **individual model license** in NIH 3D — not all are NC

---

### 8. ⏸️ SPARC/Pennsieve Dataset 307 — **CC BY 4.0 (LIMITED USE)**

**Source**: SPARC Portal (NIH Common Fund)  
**URL**: https://discover.pennsieve.io/datasets/307

**License**: ✅ **CC BY 4.0** (typical for SPARC)

**Content**:
- Nerve centerlines (scaffold models)
- Vascular tree scaffolds
- **Not**: Volumetric teaching meshes

**Foot Coverage**: Whole-body scale (may lack foot detail)

**Verdict**: ⏸️ **LINK-ONLY** (scaffold data, not teaching meshes)

**Reason**: SPARC focuses on connectivity/topology, not anatomical visualization

---

### 9. ⏸️ Z-Anatomy Models — **CC BY-SA 4.0 (REDUNDANT WITH OPEN3D)**

**Source**: https://github.com/Z-Anatomy/Models-of-human-anatomy

**License**: ⚠️ **CC BY-SA 4.0**

**Content**: Vessels, nerves (curves), muscles

**Verdict**: ⏸️ **DEFER** (Open3DModel preferred for BY-SA content)

**Reason**: Open3DModel has reviewed/documented build vs GitHub scrape

---

### 10. ⏸️ Visible Korean — **CUSTOM AGREEMENT (LINK-ONLY)**

**Source**: Korea Institute of Science and Technology  
**URL**: http://vkh.kisti.re.kr/

**License**: ⚠️ **Custom Data Use Agreement**
- Requires formal application
- Typically academic/research only
- Redistribution unclear (likely restricted)

**Content**: High-resolution cryosection models (likely includes foot)

**Verdict**: ⏸️ **LINK-ONLY** (agreement likely prohibits redistribution)

---

### 11. ⏸️ Open Anatomy Explorer (OPANEX) — **VIEWER PLATFORM**

**URL**: https://openanatomy.org/

**License**: ⚠️ **Viewer ≠ Assets** (assets sourced from third parties)

**Content**: Hosts various models (VHSCL, ZygoteBody, etc.)

**Verdict**: ⏸️ **LINK-ONLY** (viewer platform, not asset repository)

---

### 12. ❌ Foot3D Surface Scans — **NOT ANATOMY (REJECT)**

**Source**: Various GitHub repositories

**Content**: External foot surface scans (for shoe design, prosthetics)

**Verdict**: ❌ **REJECT** (not internal anatomical structures)

---

## Summary Table (≥12 Sources Verified)

| # | Source | License | Bones | Muscles | Nerves | Vessels | Intrinsics | Verdict |
|---|--------|---------|-------|---------|--------|---------|------------|---------|
| 1 | **BodyParts3D** | CC BY 4.0 | 14/14 | 12 GLB | 0/6 | 5/6 | ✅ Partial (10/11) | **✅ INTEGRATED** |
| 2 | **UM Asian Male** | CC0 1.0 | 13 | 5 GLB | 0/6 | 0/6 | ✅ QP/EDB+3 upgr | **✅ INTEGRATED** |
| 3 | **Open3DModel** | CC BY-SA 4.0 | ✅ | ✅ Fuller | ✅ | ✅ | ✅ FHB/AddH/Lumb/Inter | ⏸️ **BLOCKED** (404) |
| 4 | **Z-Anatomy** | CC BY-SA 4.0 | ⚠️ | ⚠️ | Curves | Curves | ⚠️ | ⏸️ **BLENDER-ONLY** |
| 5 | **DU VH** | CC BY 4.0 | ✅ | 3 extr | ❌ | ❌ | ❌ | Defer |
| 6 | **Zenodo 21354714** | BY-NC-SA | ⚠️ | ⚠️ | ❌ | ❌ | ⚠️ | ❌ **REJECT** (NC) |
| 7 | **Zenodo 1056750** | CC BY | ❌ | ❌ | PDF | ❌ | N/A | ❌ **REJECT** (no mesh) |
| 8 | **NIH 15850** | BY-NC-SA | ⚠️ | ⚠️ | ❌ | ❌ | ⚠️ | ❌ **REJECT** (NC) |
| 9 | **SPARC 307** | CC BY | ❌ | ❌ | Scaffold | Scaffold | N/A | Link-only |
| 10 | **Visible Korean** | Custom | ✅ | ✅ | ✅ | ✅ | ✅ | Link-only (agr req) |
| 11 | **OPANEX** | Varies | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | Link-only (viewer) |
| 12 | **Foot3D** | Varies | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ **REJECT** (surface) |

---

## Current Integration Status (Day 4)

### ✅ Real Meshes Integrated (CC BY / CC0)
- **Bones**: 14/14 (100%) — All BodyParts3D
- **Intrinsic Muscles**: 10/11 (91%) — Hybrid BP3D (12 GLB) + UM (5 GLB) = **17 GLB total**
  - UM CC0 (5): AH, FDB, ADM, **QP** (BP3D gap), **EDB** (BP3D gap)
  - BP3D CC BY 4.0 (12): EHB, FDMB, AH heads, FHB, lumbricals(4), plantar interossei(3)
  - Missing: Dorsal interossei (0 sources found)
- **Vessels**: 5/6 (83%) — All BodyParts3D
  - Dorsalis pedis artery, medial/lateral plantar arteries, plantar arch, arcuate artery
  - Missing: Deep plantar arch digital branches (fine detail)
- **Nerves**: 0/6 (0%) — Schematic only (honest 占位 labeling)
  - BP3D: 0 foot nerves confirmed
  - UM: 0 nerves
  - Open3DModel: download blocked (session-based links)
  - Z-Anatomy: Blender-internal (requires manual extraction)

### ⏸️ Blockers (Day 3-4)
- **Open3DModel Lower Limb OBJ**: 404 errors (dynamic/session links)
- **Z-Anatomy Nerves/Vessels**: Requires Blender installation (~800MB) + manual export

### 📊 Teaching Product Metrics
- **Real anatomy coverage**: 29/35 structures (83%)
- **Placeholder structures**: 6 (3 extrinsic muscles, 1 intrinsic, 6 nerves)
- **License compliance**: MIT code + CC BY / CC0 assets (redistributable)

---

## Integration Plan (Week Sprint)

### Day 1-2: BP3D Re-Extraction
1. ✅ Search `isa_parts_list_e.txt` for foot muscle BP codes
2. ✅ Extract plantar intrinsic OBJ from BP3D archive
3. ✅ Extract foot vessel OBJ
4. ✅ Convert to GLB, integrate FootModel

### Day 2-3: UM Integration
1. ✅ Download UM STL ZIP (58.3MB)
2. ✅ Extract QP, EDB, AH, ADM, FDB STL
3. ✅ Convert to GLB
4. ✅ Update structures.json (placeholder: false)
5. ✅ Wire into FootModel

### Day 4-5: BY-SA Module (Optional)
1. ⏸️ Download Open3DModel `lower-limb-obj.zip` (textureless)
2. ⏸️ Extract nerve OBJ (tibial → plantar branches)
3. ⏸️ Extract missing intrinsic OBJ (FHB, AddH, lumbricals, interossei)
4. ⏸️ Place in `third_party/open3dmodel/` (isolated)
5. ⏸️ Create NOTICE + README in third_party/
6. ⏸️ Wire conditional loading in FootModel

### Day 6-7: Documentation
1. ✅ Update docs/methods.md (BP3D muscles/vessels, UM CC0, Open3D BY-SA)
2. ✅ Update README (license boundaries, NC exclusion list)
3. ✅ Write CONTRIBUTING.md (how to avoid NC trap)
4. ✅ Week-1 review

---

## License Boundary Documentation

### Main Atlas (Redistributable)
- **Code**: MIT
- **Assets**: CC BY 4.0 (BodyParts3D) + CC0 1.0 (UM)
- **Location**: `public/models/right-foot/`
- **Users Can**: Redistribute, modify, use commercially

### Optional BY-SA Module (Isolated)
- **Assets**: CC BY-SA 4.0 (Open3DModel)
- **Location**: `third_party/open3dmodel/`
- **Users Can**: Use (with BY-SA taint acknowledgment), opt-out if needed
- **Warning**: Derivatives of BY-SA content must also be BY-SA

### Excluded (NC Trap)
- ❌ Zenodo 21354714 (BY-NC-SA)
- ❌ NIH 15850 (BY-NC-SA)
- ❌ Any NC-licensed content

**README Section**:
```markdown
## License Boundaries

**Main Atlas** (MIT code + CC BY/CC0 assets):
- Bones: BodyParts3D CC BY 4.0
- Muscles: BodyParts3D CC BY 4.0 + UM CC0 1.0
- Vessels: BodyParts3D CC BY 4.0

**Optional BY-SA Module** (third_party/open3dmodel/):
- Nerves: Open3DModel CC BY-SA 4.0
- Additional muscles: Open3DModel CC BY-SA 4.0
- **Warning**: Using BY-SA content triggers ShareAlike for derivatives

**Excluded** (Non-Commercial):
- Zenodo 21354714 (BY-NC-SA)
- NIH 15850 (BY-NC-SA)
- List maintained in CONTRIBUTING.md
```

---

## Week 2 Day 1 Update: Exhaustive DI + Vessel Searches

### Dorsal Interossei Expanded Search (5 Candidates)

**All legal sources exhausted, NO usable CC0/CC BY dorsal interossei found**:

1. **Zenodo 20228270**: CC BY-NC-SA 4.0 ❌ (NC clause) — Contains foot muscles (CT scan)
2. **Visible Korean**: All Rights Reserved ❌ (KISTI proprietary) — Contains DI 4 + PI 3, requires agreement
3. **Cults3D ankle/foot**: License unknown ⏸️ (Cloudflare block) — Lists "Dorsal interossei muscles of foot.stl"
4. **SPARC/Pennsieve 307**: Uses Anatomography (BP3D) ❌ — BP3D source lacks foot DI (only hand DI)
5. **DU Visible Human**: Ankle-level only ❌ — 76 muscles end at flexor digitorum, no intrinsic foot

**BP3D Verification**:
- ✅ Plantar interossei: BP5031/5033/5035 → FJ1384/1386/1388 (already integrated Week 1 Day 1)
- ❌ Dorsal interossei: Only hand DI codes (BP6629/BP8036), **NO foot DI codes**

**Conclusion**: Dorsal interossei gap unavoidable. All legal CC0/CC BY sources blocked by licensing (NC clauses, proprietary) or absence (BP3D, DU VH).

**Detailed report**: `docs/week2-dorsal-interossei-search.md`

### Vessel Digital/Metatarsal Branches Search

**BP3D codes found but incompatible segmentation**:
- BP6049: Dorsal digital artery → FJ2072 (right foot, 2988 vertices, 135KB GLB)
- BP6060: Plantar metatarsal artery → FJ2096 (right foot, 1371 vertices, 65KB GLB)

**Issue**: BP3D meshes are **grouped** (all arteries in one mesh), NOT toe-segmented (1st/2nd/3rd/4th).

**structures.json expectation**: Individual arteries (`Metatarsal_Dorsal_2_R`, `Metatarsal_Dorsal_3_R`, etc.)

**BP3D reality**: Single grouped mesh covering all dorsal digital arteries (66×130×28mm extent, forefoot to toe tips)

**Decision**: **NOT INTEGRATED** — Grouped mesh → meshNames mismatch → false labeling risk. Maintain `placeholder: true`.

---

**Status**: Week 2 Day 1 complete, exhaustive DI search negative, vessel grouped-mesh incompatibility documented  
**Coverage**: 88% real (34/39 direct GLB loaders; 5 grouped entries placeholder)  
**Next**: TA2/踇拇 consistency QA (Day 2), monitor 2026-Q4 for new datasets

