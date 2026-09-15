# Week 2 Day 1: Dorsal Interossei Expanded Search

**Date**: 2026-09-15  
**Objective**: Exhaustive search for legally usable dorsal interossei foot muscle 3D meshes beyond BP3D/UM/Z-Anatomy.

---

## Search Results Summary

**Outcome**: **NEGATIVE** — No legally usable open-licensed dorsal interossei meshes found.

| Source | License | Dorsal Interossei | Verdict |
|--------|---------|-------------------|---------|
| Zenodo 20228270 | BY-NC-SA 4.0 | Contains foot muscles (CT scan) | ❌ REJECT (NC clause) |
| Visible Korean PDF | All Rights Reserved (KISTI) | Contains DI + PI (4+3) | ❌ REJECT (proprietary, requires agreement) |
| Cults3D ankle/foot | Unknown (not stated) | STL file "Dorsal interossei muscles of foot.stl" listed | ⏸️ BLOCKED (Cloudflare, license unknown) |
| SPARC/Pennsieve 307 | CC BY 4.0 | Whole-body scaffold muscles from Anatomography (BP3D) | ❌ NO DI (BP3D source lacks DI) |
| DU Visible Human | CC BY 4.0 | 76 lower extremity muscles, pelvis to ankle | ❌ NO DI (table lists 38 muscle types, no DI mentioned) |

---

## Detailed Search

### 1. Zenodo 20228270 ("Muscles of the foot and ankle")

**URL**: https://zenodo.org/records/20228270  
**License**: CC BY-NC-SA 4.0 ❌  
**Format**: USDZ, GLB (from CT scan, right foot/ankle)  
**Content**: Muscular structure of right foot and ankle  
**Verdict**: **REJECT** — Non-Commercial (NC) clause incompatible with MIT-licensed atlas

**License verified via Zenodo API**:
```bash
curl -s "https://zenodo.org/api/records/20228270" | grep license
# Output: "license": {"id": "cc-by-nc-sa-4.0"}
```

### 2. Visible Korean Project

**URLs**:
- PDF download: http://anatomy.co.kr (KISTI)
- Paper: https://intjmorphol.com/wp-content/uploads/2016/01/art_16_334.pdf

**License**: **All Rights Reserved** (KISTI copyright) ❌  
**Format**: Interactive PDF (48 MB) with 3D surface models  
**Content**: 24 foot muscles including:
- **Fourth layer of sole**: Plantar interosseous (3), **Dorsal interosseous (4)** ✅

**Quote from paper** (Int. J. Morphol. 33(4):1287-1292, 2015):
> "Fourth layer of sole (2): Plantar interosseus, Dorsal interosseus"

**Verdict**: **REJECT** — Not CC0/CC BY licensed. KISTI website states:
> "© 2012 Copyright KISTI. All Rights Reserved."

Full data requires "agreement with the authors" (PMC3410230). Not suitable for MIT-licensed redistribution.

### 3. Cults3D Ankle/Foot Anatomy Model

**URL**: https://cults3d.com/en/3d-model/various/ankle-foot-anatomy-with-detailed-muscles-blood-vessels-nerves  
**Author**: Muskiron  
**Published**: 2024-12-11  
**Format**: 36 files (STL, OBJ, DAE, PLY)  
**Content**: 32 ankle/foot structures including:
- `Dorsal interossei muscles of foot.stl` ✅
- `Plantar interossei muscles.stl` ✅
- Separate STL/OBJ for each muscle

**License**: **Not stated** on product page ⏸️  
**Verdict**: **BLOCKED** — Cloudflare security verification prevented access to full license terms. Cannot confirm CC0/CC BY status. Do not assume redistribution rights without verification.

### 4. SPARC/Pennsieve Dataset 307

**URL**: https://discover.pennsieve.io/datasets/307  
**Title**: "A 3D human whole-body model with integrated organs vasculature musculoskeletal and nervous systems for mapping nerves"  
**License**: CC BY 4.0 (dataset) ✅  
**Format**: JSON scaffolds for WebGL  
**Content**: Whole-body 3D model with:
- Organs (stomach, colon, heart, lung, bladder, brainstem, spinal cord)
- Musculoskeletal system (fitted to data)
- Vasculature (from Anatomography)
- Nerves (registered)

**Muscle source**: **Anatomography (BodyParts3D V4.3i)** ❌  
**Quote from Physiome Model Repository** (models.physiomeproject.org/e/ade):
> "The muscles and bones data are obtained from Anatomography (BodyParts3D V4.3i; DOI: 10.1093/nar/gkn613)"

**Verdict**: **NO DORSAL INTEROSSEI** — Uses BP3D as source, which lacks foot dorsal interossei (only plantar interossei BP5031/BP5033/BP5035 exist).

**BP3D verification**:
```bash
grep -i "inteross" assets-raw/bodyparts3d/isa_parts_list_e.txt | grep "dorsal"
# Output shows only HAND dorsal interossei (BP6629, BP8036, BP8037)
# NO foot dorsal interossei codes exist
```

### 5. DU Visible Human Male/Female

**URL**: https://digitalcommons.du.edu/visiblehuman/  
**DOI**: 10.56902/COB.vh.2022.0  
**License**: CC BY 4.0 ✅  
**Format**: STL (from cryosections)  
**Content**: 260 geometries from pelvis to ankle:
- 28 bones
- **76 muscles** (38 types × 2 sides)
- 16 cartilages, 8 ligaments, 2 fat geometries

**Muscle list** (Table 3 from Sci Data 2022):
- Iliacus, Psoas major, Gluteus muscles, Quadriceps, Hamstrings, Adductors
- **Tibialis anterior**, Extensor digitorum longus, Peroneus longus/brevis
- Gastrocnemius, Soleus, Tibialis posterior, **Flexor digitorum**

**Extent**: "From Iliacus proximally to **Flexor Digitorum distally**"

**Verdict**: **NO DORSAL INTEROSSEI** — Dataset ends at ankle/flexor digitorum level. Intrinsic foot muscles (including dorsal interossei) not segmented. Focus is on extrinsic lower extremity musculature.

---

## BodyParts3D Verification

**Plantar interossei** (跖侧骨间肌): ✅ EXISTS
- BP5031: Third plantar interosseous of right foot → FJ1388.obj
- BP5033: Second plantar interosseous of right foot → FJ1386.obj
- BP5035: First plantar interosseous of right foot → FJ1384.obj

**Dorsal interossei** (背侧骨间肌): ❌ ABSENT
- BP6629: Set of dorsal interossei of **right hand** (手部，非足部)
- BP8036: Set of dorsal interossei of **left hand**
- **NO BP codes for foot dorsal interossei**

---

## Vessel Digital/Metatarsal Branches Search

**BP3D codes found**:
- BP6049: Dorsal digital artery of foot → FJ2072 (right), FJ2141 (left)
- BP6060: Plantar metatarsal artery → FJ2096 (right), FJ2206 (left)

**Issue**: BP3D meshes are **grouped** (all dorsal digital arteries in one mesh, all plantar metatarsal in another), NOT individually segmented by toe (1st/2nd/3rd/4th).

**`structures.json` expectation**:
- `dorsal_metatarsal_arteries`: `["Metatarsal_Dorsal_2_R", "Metatarsal_Dorsal_3_R", "Metatarsal_Dorsal_4_R"]`
- `plantar_metatarsal_arteries`: `["Metatarsal_Plantar_1_R", "Metatarsal_Plantar_2_R", "Metatarsal_Plantar_3_R", "Metatarsal_Plantar_4_R"]`

**BP3D reality**:
- FJ2072 (BP6049): **All** dorsal digital arteries (2988 vertices, 66×130×28mm extent, covers forefoot to toe tips)
- FJ2096 (BP6060): **All** plantar metatarsal arteries (1371 vertices, 34×58×27mm extent)

**Verdict**: **NOT INTEGRATED** — Grouped meshes would cause `meshNames` mismatch (viewer expects individual toe arteries, BP3D provides grouped mesh). Maintain `placeholder: true` to avoid false labeling.

---

## Other Sources Evaluated

### Sketchfab "Dorsal Interossei"
**URL**: https://sketchfab.com/3d-models/dorsal-interossei-a6a983dcf9a84ccf9a870fac48e12eac  
**Author**: shimxandr  
**License**: Not stated  
**Verdict**: License unknown, appears to be **hand** dorsal interossei (description: "bring fingers away from midline")

### OpenGameArt "Human Foot 3D Model"
**URL**: https://opengameart.org/content/human-foot-3d-model  
**License**: CC0 1.0 ✅  
**Format**: OBJ (14.4 KB)  
**Verdict**: Surface skin model only, no internal muscles

---

## Conclusion

After exhaustive search of:
1. Zenodo repositories (foot/ankle datasets)
2. Visible Korean cadaver project
3. SPARC/Pennsieve whole-body scaffolds
4. DU Visible Human lower extremity
5. NIH 3D Print Exchange
6. Open anatomy platforms (Cults3D, Sketchfab, OpenGameArt)
7. BodyParts3D comprehensive verification

**No legally usable CC0/CC BY dorsal interossei foot muscle meshes exist in open repositories.**

**Existing alternatives**:
- **Zenodo 20228270**: Contains DI, but BY-NC-SA 4.0 (non-commercial restriction)
- **Visible Korean**: Contains DI, but proprietary (KISTI All Rights Reserved)
- **Cults3D**: Possibly contains DI, but license unknown (Cloudflare block)

**Recommendation**: Maintain `placeholder: true` for `interossei_dorsales` until:
1. Zenodo 20228270 author agrees to relicense as CC BY 4.0 (contact required)
2. Visible Korean KISTI grants CC BY redistribution rights (agreement process)
3. New CC0/CC BY foot anatomy dataset emerges (monitor SPARC, NIH 3D, Zenodo 2026-2027)

---

**Search completed**: 2026-09-15  
**Next steps**: Document in `daily-log.md`, update `week-plan.md` with monitoring tasks for 2026-Q4.
