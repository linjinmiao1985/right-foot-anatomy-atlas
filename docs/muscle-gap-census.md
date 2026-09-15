# Muscle gap census vs TA2 foot (intrinsics / extrinsics)

**Date**: 2026-09-15  
**Status**: Research census + one BP3D fill — **not** a TA2-complete muscle atlas  
**Live entry count after Day 4ac**: 24 muscle rows / **19 unique** (lumbricals×4→1, PI×3→1)

---

## Wired now (teaching set)

### Intrinsics (dorsal + plantar)
| TA2-oriented id | Source | Notes |
|-----------------|--------|-------|
| abductor_hallucis | UM CC0 | |
| flexor_digitorum_brevis | UM CC0 | |
| abductor_digiti_minimi | UM CC0 | |
| quadratus_plantae | UM CC0 | |
| lumbrical_1…4 | BP3D CC BY | 4 entries / 1 unique |
| flexor_hallucis_brevis | BP3D CC BY | medial head mesh |
| adductor_hallucis | BP3D CC BY | oblique + transverse parts |
| flexor_digiti_minimi_brevis | BP3D CC BY | |
| plantar_interosseous_1…3 | BP3D CC BY | 3 entries / 1 unique |
| interossei_dorsales | Open3D BY-SA | DI 1–4 grouped teaching object |
| extensor_digitorum_brevis | UM CC0 | |
| **extensor_hallucis_brevis** | **BP3D CC BY** | **Day 4ac**: GLB already in tree / REAL_MUSCLE_MODELS; wired into `structures.json` |

### Extrinsics (ankle-crossing teaching)
| id | Source |
|----|--------|
| tibialis_anterior | UM CC0 |
| tibialis_posterior | UM CC0 |
| extensor_hallucis_longus | UM CC0 |
| extensor_digitorum_longus | UM CC0 |
| flexor_hallucis_longus | UM CC0 |
| flexor_digitorum_longus | UM CC0 |
| fibularis_longus | UM CC0 (`peroneus_longus.glb`) |

---

## Still open vs common TA2 foot teaching lists

| Gap | License-clean mesh in-tree? | Note |
|-----|-----------------------------|------|
| **M. fibularis brevis** | Not found wired | UM dataset has more LE muscles historically; no local FB GLB in this checkout |
| **M. fibularis tertius** | Not found | Often absent or fused with EDL distal slip — no mesh claimed |
| **M. opponens digiti minimi** | Not found | Inconstant; no mesh claimed |
| DI as **per-ray** 1–4 separate structures | Open3D BY-SA parts exist as ADDITIONAL_MUSCLE_PARTS under one id | Prefer future CC0/BY replacement for DI |
| Gastrocnemius / soleus bellies | Only **calcaneal tendon** (ligament/tendon layer) | Intentional — tendon not full triceps surae |

---

## Open3D / UM dig this pass

- **Open3D** `lower-limb.obj` not re-fetched (local zip stub / DOWNLOAD_BLOCKER); existing extracted DI only for muscles.
- **UM** checkout has Kabsch-baked extrinsics already wired (TA/FL/EDL/EHL + prior 8); no additional foot intrinsic STL present under `third_party/um/` beyond those.
- **Z-Anatomy.blend** (Zenodo zip, Blender 4.2.9 LTS proof): right foot soft inventory includes plantar interossei / plantaris / vessels — **no** named fibularis brevis/tertius muscle objects claimed for wiring this pass.

---

## Honesty

Osteology remains complete. Muscle layer is **teaching-useful and incomplete**. Day 4ac closes the accidental EHB structure-row gap only; it does **not** graduate the atlas to TA2 muscle completeness.
