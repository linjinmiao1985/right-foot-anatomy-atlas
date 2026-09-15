# Muscle gap census vs TA2 foot (intrinsics / extrinsics)

**Date**: 2026-09-15  
**Status**: Research census + Open3D BY-SA gap fills (FB/FT/opponens) + ZA plantaris/FHB lateral — **not** a TA2-complete muscle atlas  
**Live entry count after Day 4ad**: 28 muscle rows / **23 unique** (lumbricals×4→1, PI×3→1; +FB +FT +opponens +plantaris)

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
| flexor_hallucis_brevis | BP3D CC BY + ZA BY-SA lateral | medial BP3D; lateral head ADDITIONAL by-sa/ |
| adductor_hallucis | BP3D CC BY | oblique + transverse parts |
| flexor_digiti_minimi_brevis | BP3D CC BY | |
| **opponens_digiti_minimi** | **Open3D BY-SA** | **Day 4ad** — inconstant; by-sa/ |
| plantar_interosseous_1…3 | BP3D CC BY | 3 entries / 1 unique |
| interossei_dorsales | Open3D BY-SA | DI 1–4 grouped teaching object |
| extensor_digitorum_brevis | UM CC0 | |
| extensor_hallucis_brevis | BP3D CC BY | Day 4ac wired |

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
| **fibularis_brevis** | **Open3D BY-SA** | **Day 4ad** |
| **fibularis_tertius** | **Open3D BY-SA** | **Day 4ad** — often inconstant |
| **plantaris** | **Z-Anatomy BY-SA** | **Day 4ad** — not triceps surae complete |

---

## Still open vs common TA2 foot teaching lists

| Gap | License-clean mesh in-tree? | Note |
|-----|-----------------------------|------|
| DI as **per-ray** 1–4 separate structures | Open3D BY-SA parts exist as ADDITIONAL_MUSCLE_PARTS under one id | Prefer future CC0/BY replacement for DI |
| Gastrocnemius / soleus bellies | Only **calcaneal tendon** + plantaris | Intentional — tendon + plantaris, not full triceps surae |
| FHB medial+lateral as single CC BY tree | Lateral is ZA BY-SA additional | Mixed-license structure disclosed |

---

## Dig this pass (Day 4ad)

- **Open3D** `lower-limb.obj` (`/workspace/literature/open3d-assets/`): **has** `Fibularis_brevis_muscle.r`, `Fibularis_tertius_muscle.r`, `Opponens_digiti_minimi_muscle_of_foot.r` (+ FHB heads / FDMB skipped — BP3D already). Extracted + Kabsch (Day 4m) + QA pass → wired by-sa/.
- **UM** zip: Peroneus Longus only among fibulares; **no** FB/FT/opponens/FHB/FDMB STLs.
- **BP3D**: FHB medial + FDMB already wired; no FB/FT/opponens elemental claimed this pass.
- **Z-Anatomy.blend**: names FB/FT/opponens (deferred — Open3D path preferred). Unique wired: plantaris + FHB lateral (+ vessel PPDA). Transform `za_to_bp3d_transform.json` mean residual ≈1.8 mm.

---

## Honesty

Osteology remains complete. Muscle layer is **teaching-useful and incomplete**. Day 4ad closes FB/FT/opponens census gaps via Open3D BY-SA and adds ZA plantaris/FHB lateral; it does **not** graduate the atlas to TA2 muscle completeness.
