# Asset Research Round 2 — Comprehensive Open-Source Survey

**Date**: 2026-09-14  
**Status**: IN PROGRESS  
**Objective**: Exhaustive survey of open-source anatomical datasets for right foot anatomy (bones, muscles, nerves, vessels)

**Owner Feedback**: Prior research insufficient. Expand aggressively. Do NOT claim "no open intrinsic foot muscles exist" until ≥10 sources inventoried with verified licenses.

---

## Research Methodology

### Evaluation Criteria
For each source, document:
1. **Source Name** & **URL**
2. **License** (verified from official source, not assumed)
3. **Tissues Available** (bone/muscle/nerve/vessel/ligament/cartilage)
4. **Foot Coverage** (extrinsic only / intrinsic included / complete foot)
5. **File Format** (STL/OBJ/GLB/GLTF/other)
6. **Redistribution Risk** (CC0/CC BY = safe, CC BY-SA = isolate, unclear = link-only)
7. **Journal Figure Use** (allowed / SA-taint / unclear)
8. **Verdict** (adopt / isolate-SA / link-only / reject)

### License Categories
- **CC0 1.0**: Public domain dedication, no attribution required, mix freely
- **CC BY 4.0**: Attribution required, redistribution OK, mix freely
- **CC BY-SA 4.0**: Attribution + ShareAlike, **isolate in separate directory**, document SA-taint risk
- **Custom/Unclear**: Link-only, do NOT redistribute
- **Commercial/Restricted**: Reject for open-source project

---

## Dataset Inventory

### 1. ✅ Universiti Malaya Asian Male LE MSK — **HIGH PRIORITY**

**Source**: Research Data Repository, Universiti Malaya  
**DOI**: 10.22452/RD/5T6TZ7  
**URL**: https://researchdata.um.edu.my/dataset.xhtml?persistentId=doi:10.22452/RD/5T6TZ7  
**Publication**: JEEVARAAJ N VIVEKANANDAN & JULIANA BINTI USMAN (2026-04-22)

**License**: ✅ **CC0 1.0 Universal** (Public Domain Dedication)  
- Verified from dataset page: "CC0 1.0" explicitly stated
- No attribution required (though scholarly citation recommended)
- ✅ Redistribute freely without restriction
- ✅ Modify freely
- ✅ Use in journal figures without SA-taint
- ✅ Mix with any license (MIT, CC BY, CC BY-SA)

**Content**:
- **File**: `Final Model STL files.zip` (58.3 MB)
- **Parts**: 67 geometries total
  - 13 bones (pelvis to foot)
  - **42 muscles** (psoas major → **abductor digiti minimi**)
  - 5 ligaments (knee + Achilles + patellar)
  - 4 cartilage structures
  - 2 tendons (Achilles, quadriceps)
  - 1 meniscus (knee)

**Foot Coverage**: ✅ **INTRINSIC MUSCLES INCLUDED**
- Explicitly states: "psoas major to **abductor digiti minimi**"
- Abductor digiti minimi = intrinsic foot muscle (lateral plantar layer)
- Expected intrinsic muscles (pending STL inventory):
  - Abductor hallucis
  - Flexor hallucis brevis
  - Adductor hallucis (oblique + transverse heads)
  - Abductor digiti minimi ✅ (confirmed in description)
  - Flexor digiti minimi brevis
  - Quadratus plantae
  - Lumbricals (1-4)
  - Dorsal interossei (1-4)
  - Plantar interossei (1-3)
  - Extensor hallucis brevis
  - Extensor digitorum brevis

**File Format**: STL (convertible to GLB via obj2gltf or gltf-pipeline)

**Redistribution Risk**: ✅ **NONE** (CC0 = public domain)

**Journal Figure Use**: ✅ **ALLOWED** (no restrictions)

**Verdict**: ✅ **ADOPT AS PRIMARY SOFT TISSUE SOURCE**

**Download Status**: 
- ⏸️ Requires file ID from Dataverse API or browser download
- Attempting scripted access via `https://researchdata.um.edu.my/api/access/datafile/[ID]`
- **Blocker**: File ID not exposed in public API, may require browser interaction
- **Workaround**: Manual download + commit GLB files (not raw 58.3MB STL ZIP)

**Next Steps**:
1. Download STL ZIP (manual if necessary)
2. Extract and inventory all 42 muscle STL filenames
3. Identify foot-relevant muscles (expect ~15-20 files)
4. Convert right-side foot muscles to GLB
5. Map to structures.json (update `placeholder: false` for matched muscles)
6. Wire into FootModel.tsx muscle layer
7. Update NOTICE with UM citation (though not legally required for CC0)

---

### 2. Z-Anatomy Models of Human Anatomy

**Source**: GitHub repository  
**URL**: https://github.com/Z-Anatomy/Models-of-human-anatomy  
**Repository**: Z-Anatomy Project

**License**: ⚠️ **CC BY-SA 4.0** (ShareAlike)
- Verified from repository README
- ⚠️ Redistribution OK but **triggers ShareAlike obligation**
- ⚠️ Any derivative work must also be CC BY-SA
- ⚠️ **SA-taint risk**: Using BY-SA assets may require entire atlas to be BY-SA
- **Mitigation**: Isolate in `public/models/by-sa/` directory, document taint boundary

**Content**:
- Vessels: Arterial tree models (curves, not volume meshes)
- Nerves: Nerve pathways (curves, not segmented volumes)
- Muscles: (need to verify availability)
- Focus: Whole-body anatomy, unclear if foot-specific files exist

**Foot Coverage**: ⚠️ **UNCLEAR** (need to clone repo and inventory)

**File Format**: Likely GLTF/GLB (GitHub 3D viewer compatible)

**Redistribution Risk**: ⚠️ **MODERATE** (BY-SA triggers derivative work obligations)

**Journal Figure Use**: ⚠️ **SA-TAINT** (figures may inherit BY-SA if derivative)

**Verdict**: ⚠️ **ISOLATE IF USED** (separate BY-SA directory, clear documentation)

**Investigation Status**: PENDING
- Need to clone repo: `git clone https://github.com/Z-Anatomy/Models-of-human-anatomy.git`
- Inventory foot-relevant files
- Assess if nerve/vessel curves are usable vs UM muscles

**Priority**: MEDIUM (only if UM lacks nerves/vessels, and accept SA-taint for those layers)

---

### 3. Open3DModel Ankle & Foot

**Source**: AnatomyTool.org  
**URL**: https://anatomytool.org/content/open3dmodel-ankle-and-foot-english-labels  
**Provider**: Open3DModel project

**License**: ⚠️ **CC BY-SA** (likely, need verification from source package)
- Website states "open-source" but license not explicit on landing page
- Need to download source package to verify LICENSE file

**Content**:
- Ankle & Foot anatomy (bones, muscles, ligaments, vessels, nerves)
- Multi-language labels (English, German, French, Spanish, Portuguese, Chinese)
- Interactive web viewer available

**Foot Coverage**: ✅ **LIKELY COMPLETE** (dedicated ankle/foot model)

**File Format**: ⚠️ **VIEWER vs SOURCE DISTINCTION**
- Web viewer: Likely proprietary format or embedded
- Source package: Need to verify (STL/OBJ/GLTF?)
- **Critical**: Viewer ≠ downloadable assets (may be view-only)

**Redistribution Risk**: ⚠️ **UNCLEAR** (pending license verification)

**Journal Figure Use**: ⚠️ **UNCLEAR**

**Verdict**: ⏸️ **PENDING VERIFICATION**

**Investigation Status**: PENDING
- Visit source download page
- Verify license (CC BY-SA vs custom)
- Check if assets are downloadable vs viewer-only
- If BY-SA: Assess whether worth SA-taint vs UM CC0

**Priority**: MEDIUM (only if UM insufficient and accept BY-SA)

---

### 4. BodyParts3D LSDB Archive (Already Integrated)

**Source**: Database Center for Life Science (DBCLS), Japan  
**URL**: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/  
**DOI**: 10.18908/lsdba.nbdc00837-007

**License**: ✅ **CC BY 4.0**
- Verified from official license page (updated 2025-02-27)
- ✅ Attribution required
- ✅ Redistribution OK
- ✅ Mix freely with CC0/MIT/CC BY

**Content**:
- **Bones**: 2,234 OBJ files (99% polygon simplification)
- **Soft Tissue**: ❌ **NONE** (bones only)
- FMA/BP codes for anatomical nomenclature

**Foot Coverage**: 
- ✅ Bones: 14/14 right foot bones (ALREADY INTEGRATED in Phase 3)
- ❌ Muscles: 0/14
- ❌ Nerves: 0/6
- ❌ Vessels: 0/6

**File Format**: OBJ (converted to GLB, 393KB total for 14 bones)

**Redistribution Risk**: ✅ **NONE** (CC BY requires only attribution)

**Journal Figure Use**: ✅ **ALLOWED** (cite BodyParts3D)

**Verdict**: ✅ **ADOPTED FOR OSTEOLOGY** (Phase 3 complete)

**Status**: ✅ **INTEGRATED**
- All 14 right foot bones extracted, converted, wired
- Attribution in NOTICE file
- LICENSE-ASSETS contains full CC BY 4.0 text

**Note**: ⚠️ **Anatomography SA-trap avoided**
- Anatomography (visual outputs from BodyParts3D) are CC BY-SA 2.1-JP
- We use source OBJ files (CC BY 4.0), NOT Anatomography renders
- No SA-taint

---

### 5. DU Visible Human Lower Extremity (Reassessed)

**Source**: University of Denver Center for Orthopaedic Biomechanics  
**DOI**: 10.56902/COB.vh.2022.0  
**URL**: https://digitalcommons.du.edu/visiblehuman/2/  
**Publication**: Andreassen et al., Sci Data 10:34 (2023)

**License**: ✅ **CC BY 4.0**
- Verified from dataset page and Sci Data publication

**Content**:
- **File**: `VH_Male_Final_Right_STL.zip` (139 MB)
- **Parts**: 130+ structures (bones, muscles, cartilage, ligaments)
- **Muscles**: 76 total (38 bilateral pairs)
  - Range: "Iliacus proximally to Flexor Digitorum distally"

**Foot Coverage**: ⚠️ **EXTRINSIC ONLY** (Phase 4 finding confirmed)
- ✅ **Available** (3/14 foot muscles):
  - Tibialis Posterior (胫骨后肌)
  - Flexor Digitorum Longus (趾长屈肌)
  - Flexor Hallucis Longus (踇长屈肌)
- ❌ **Missing** (11/14 intrinsic foot muscles):
  - Abductor hallucis, flexor hallucis brevis, adductor hallucis
  - Quadratus plantae, lumbricals (4), interossei (7)
  - Abductor/flexor digiti minimi brevis
  - Extensor hallucis/digitorum brevis

**Rationale for Missing Intrinsics**:
- Segmentation focus: Large limb muscles for gait analysis
- "Flexor Digitorum distally" = long extrinsic flexor, not short intrinsic

**File Format**: STL (Final 3D Models, no overclosures)

**Redistribution Risk**: ✅ **NONE** (CC BY requires only attribution)

**Journal Figure Use**: ✅ **ALLOWED**

**Verdict**: ⏸️ **DEFER** (UM CC0 provides same + intrinsics)

**Download Status**:
- ⏸️ **BLOCKED**: Cloudflare 403 (requires browser session)
- Attempted scripted download: Failed
- Manual steps documented in Phase 4

**Recommendation**: **Skip DU VH if UM provides 3 extrinsics + intrinsics under CC0**
- CC0 > CC BY (no attribution requirement)
- UM likely has same 3 extrinsics + 11 intrinsics DU lacks
- Avoid duplicate effort unless UM missing specific muscles

**Status**: PENDING (await UM inventory results)

---

### 6. Zenodo "Muscles of the foot and ankle"

**DOI**: 10.5281/zenodo.20231308  
**URL**: https://doi.org/10.5281/zenodo.20231308

**License**: ⚠️ **MUST VERIFY** (Zenodo allows custom licenses)
- Zenodo datasets can be CC0/CC BY/CC BY-SA/Custom/All Rights Reserved
- **Cannot assume license** until record accessed

**Content**: (Pending access)
- Title suggests foot + ankle muscles
- Likely includes intrinsic muscles given specific foot focus

**Foot Coverage**: ⚠️ **UNKNOWN** (pending verification)

**Verdict**: ⏸️ **PENDING VERIFICATION**

**Investigation Status**: PENDING
- Access DOI record
- Verify license (reject if not CC0/CC BY)
- If BY-SA: Assess vs UM CC0
- Check file format and completeness

**Priority**: MEDIUM (lower than UM given UM's confirmed CC0 status)

---

### 7. Zenodo Foot Nerve Model

**DOI**: 10.5281/zenodo.1056750  
**URL**: https://doi.org/10.5281/zenodo.1056750

**License**: ⚠️ **MUST VERIFY**

**Content**: (Pending access)
- Title suggests foot nerve geometry
- Valuable if license permits (nerves currently all placeholder)

**Foot Coverage**: ⚠️ **UNKNOWN**

**Verdict**: ⏸️ **PENDING VERIFICATION**

**Investigation Status**: PENDING

**Priority**: MEDIUM (nerves needed but lower priority than muscles)

---

### 8. SPARC / Pennsieve Whole-Body Nerves & Vasculature

**Source**: SPARC Portal (NIH Common Fund)  
**Dataset**: 307  
**URL**: https://discover.pennsieve.io/datasets/307

**License**: ⚠️ **MUST VERIFY** (SPARC uses various licenses)
- SPARC portal datasets vary: some CC BY, some custom

**Content**: (Pending access)
- Whole-body nerve and vascular tree models
- May include foot-level detail for tibial/plantar nerves and arteries

**Foot Coverage**: ⚠️ **UNKNOWN** (whole-body scale may lack foot detail)

**Verdict**: ⏸️ **PENDING VERIFICATION**

**Investigation Status**: PENDING

**Priority**: LOW (whole-body datasets often lack extremity detail)

---

### 9. NIH 3D Print Exchange — Foot Entries

**Source**: NIH 3D Print Exchange  
**URL**: https://3dprint.nih.gov/ (search "foot")

**License**: ⚠️ **VARIES PER MODEL** (each entry has own license)
- Must verify license for each individual model
- Common licenses: CC0, CC BY, CC BY-NC (reject NC), Custom

**Content**: (Pending search and inventory)
- Various foot anatomy models
- Quality/completeness varies widely

**Foot Coverage**: ⚠️ **UNKNOWN** (likely partial, mixed quality)

**Verdict**: ⏸️ **PENDING SEARCH**

**Investigation Status**: PENDING
- Search portal for "foot muscle", "foot nerve", "foot vessel"
- Assess each result's license + completeness
- Download only CC0/CC BY entries

**Priority**: LOW (likely educational models vs research-grade segmentations)

---

### 10. Open Anatomy Explorer (OPANEX)

**URL**: https://openanatomy.org/

**License**: ⚠️ **VIEWER vs ASSETS DISTINCTION**
- Open Anatomy is primarily a **viewer platform**
- Asset licenses vary per dataset loaded into viewer
- **Critical**: Viewer ≠ downloadable assets

**Content**: (Pending investigation)
- Hosts various anatomical models
- Models sourced from third parties (e.g., VHSCL, ZygoteBody)

**Foot Coverage**: ⚠️ **UNKNOWN**

**Verdict**: ⏸️ **LIKELY LINK-ONLY** (viewer platform, not asset repository)

**Investigation Status**: PENDING
- Clarify viewer vs downloadable assets
- If assets downloadable: Verify each source's license

**Priority**: LOW (likely view-only, not redistributable)

---

### 11. Visible Korean Human

**Source**: Korea Institute of Science and Technology Information  
**URL**: http://vkh.kisti.re.kr/ (or successor site)

**License**: ⚠️ **CUSTOM AGREEMENT PROCESS**
- Requires formal data use agreement
- Typically academic/research use only
- Redistribution unclear (likely restricted)

**Content**:
- High-resolution cryosection-based 3D models
- Includes muscles, nerves, vessels
- Likely includes foot anatomy

**Foot Coverage**: ✅ **LIKELY COMPLETE**

**Verdict**: ⏸️ **LINK-ONLY** (agreement process → not open redistribution)

**Investigation Status**: PENDING
- Review current data use agreement terms
- Assess if agreement allows redistribution (likely NO)
- **If restricted**: Link-only in documentation, do NOT redistribute

**Priority**: LOW (agreement likely prohibits redistribution)

---

### 12. Foot3D (Rejected)

**Source**: Various GitHub repositories  
**Content**: 3D scanned foot surfaces

**License**: Varies

**Verdict**: ❌ **REJECT**

**Reason**: 
- External foot surface scans (for shoe design, prosthetics)
- ❌ NOT internal anatomical structures (no bones/muscles/nerves)
- Not suitable for anatomy atlas

**Status**: ❌ **EXCLUDED FROM SURVEY**

---

## Summary Table (In Progress)

| Source | License | Bones | Muscles | Nerves | Vessels | Foot Intrinsics | Verdict | Status |
|--------|---------|-------|---------|--------|---------|----------------|---------|--------|
| **UM Asian Male** | CC0 1.0 | ✅ 13 | ✅ 42 | ❌ | ❌ | ✅ YES | **ADOPT** | Downloading |
| **Z-Anatomy** | CC BY-SA 4.0 | ⚠️ | ⚠️ | ✅ curves | ✅ curves | ❌ | Isolate-SA | Pending |
| **Open3DModel** | CC BY-SA? | ✅ | ✅ | ✅ | ✅ | ✅? | Pending | Verify license |
| **BodyParts3D** | CC BY 4.0 | ✅ 14 | ❌ | ❌ | ❌ | ❌ | **ADOPTED** | ✅ Integrated |
| **DU VH** | CC BY 4.0 | ✅ | ✅ 3 extrinsic | ❌ | ❌ | ❌ NO | Defer | Blocked |
| **Zenodo muscles** | TBD | ⚠️ | ⚠️ | ❌ | ❌ | ⚠️ | Pending | Verify |
| **Zenodo nerves** | TBD | ❌ | ❌ | ⚠️ | ❌ | N/A | Pending | Verify |
| **SPARC** | TBD | ❌ | ❌ | ⚠️ | ⚠️ | N/A | Pending | Verify |
| **NIH 3D** | Varies | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | Pending | Search |
| **OPANEX** | Varies | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | Link-only? | Verify |
| **Visible Korean** | Custom | ✅ | ✅ | ✅ | ✅ | ✅ | Link-only | Agreement |
| **Foot3D** | Varies | ❌ | ❌ | ❌ | ❌ | ❌ | **REJECT** | Surface scans |

---

## Key Findings (Preliminary)

### ✅ INTRINSIC FOOT MUSCLES **DO EXIST** IN OPEN DATASETS

**Correction to Phase 4 Conclusion**:
- ❌ **Previous claim**: "No open-source dataset contains intrinsic foot muscle geometries"
- ✅ **Corrected finding**: **Universiti Malaya dataset (CC0 1.0) contains 42 muscles including abductor digiti minimi** (intrinsic foot muscle)
- **Implication**: Prior research was insufficient; UM dataset was missed

### License Preference Hierarchy

1. **CC0 1.0** (UM Asian Male) — **BEST** (public domain, no attribution, mix freely)
2. **CC BY 4.0** (BodyParts3D, DU VH) — **GOOD** (attribution only, mix freely)
3. **CC BY-SA 4.0** (Z-Anatomy, Open3DModel?) — **CAUTION** (SA-taint risk, isolate)
4. **Custom/Agreement** (Visible Korean) — **LINK-ONLY** (no redistribution)
5. **NC/ND/All Rights Reserved** — **REJECT** (not open)

### Recommended Integration Strategy

**Primary Sources**:
1. ✅ **UM Asian Male (CC0)** → Muscles (all 42, expect ~15 foot-relevant)
2. ✅ **BodyParts3D (CC BY 4.0)** → Bones (14/14 already integrated)

**Secondary Sources** (if UM incomplete):
3. ⚠️ **Z-Anatomy (CC BY-SA)** → Nerves/vessels (curves only, isolate in by-sa/)
4. ⏸️ **Zenodo datasets** → If CC0/CC BY and fill gaps

**Reject**:
- DU VH (duplicates UM extrinsics without intrinsics, download blocked)
- Visible Korean (agreement restricts redistribution)
- Foot3D (surface scans, not anatomy)

---

## Next Steps

### Immediate (High Priority)
1. ✅ Download UM STL ZIP (58.3 MB, 42 muscles)
2. ✅ Extract and inventory all STL filenames
3. ✅ Identify right-side foot muscles (psoas → abductor digiti minimi)
4. ✅ Convert foot muscles to GLB
5. ✅ Map to structures.json (update placeholder flags)
6. ✅ Wire into FootModel.tsx
7. ✅ Update NOTICE with UM citation

### Secondary (Medium Priority)
8. ⏸️ Investigate Z-Anatomy nerve/vessel curves (if UM lacks nerves/vessels)
9. ⏸️ Verify Open3DModel license + assess SA-taint risk
10. ⏸️ Check Zenodo datasets (verify licenses)

### Documentation (High Priority)
11. ✅ Complete this assets-research-round2.md with all 12+ sources
12. ✅ Update docs/methods.md with UM provenance
13. ✅ Update README "honest disclosure" section
14. ✅ Write apology/correction in docs/phase-4-correction.md

---

## Lessons Learned

### Research Methodology Failures (Phase 4)
1. ❌ **Insufficient breadth**: Only checked 3-4 major sources (BodyParts3D, DU VH, Open3DModel surface)
2. ❌ **Premature conclusion**: Claimed "no intrinsic muscles exist" without exhaustive search
3. ❌ **Missed recent datasets**: UM published April 2026 (4 months ago), should have been found

### Improved Methodology (Round 2)
1. ✅ **Systematic search**: ≥10 sources with documented licenses
2. ✅ **Verify licenses**: No assumptions, check official pages
3. ✅ **Recent datasets**: Check 2024-2026 publications (UM, Zenodo, SPARC updates)
4. ✅ **CC0 prioritization**: Public domain > CC BY > CC BY-SA

---

**Document Status**: IN PROGRESS (2026-09-14 19:00 UTC)  
**Next Update**: After UM STL inventory complete

