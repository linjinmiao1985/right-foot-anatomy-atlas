import { useEffect, useState } from 'react';
import { Html, useGLTF } from '@react-three/drei';
import StructureHoverLabel from './StructureHoverLabel';
import type { LabelDensity } from '../lib/labelDensity';
import { DEFAULT_LABEL_DENSITY, shouldShowHoverLabel } from '../lib/labelDensity';
import { getAllStructures, getStructureByMeshName } from '../lib/structureLookup';
import { LAYER_CONFIG } from '../lib/layers';
import type { Layer } from '../types/anatomy';
import type { AnatomyStructure } from '../types/anatomy';
import {
  getAllLigamentGroupIds,
  structureInVisibleLigamentGroups,
  type LigamentGroupId,
} from '../lib/ligamentGroups';
import {
  getAllNerveGroupIds,
  structureInVisibleNerveGroups,
  type NerveGroupId,
} from '../lib/nerveGroups';
import {
  getAllVesselGroupIds,
  structureInVisibleVesselGroups,
  type VesselGroupId,
} from '../lib/vesselGroups';
import {
  getAllMuscleGroupIds,
  structureInVisibleMuscleGroups,
  type MuscleGroupId,
} from '../lib/muscleGroups';
import { isStructureHidden } from '../lib/structureVisibility';
import {
  composeLayerOpacity,
  DEFAULT_LAYER_OPACITY,
  opacityNeedsTransparency,
} from '../lib/layerOpacity';

interface FootModelProps {
  visibleLayers: Set<Layer>;
  onMeshClick: (meshName: string) => void;
  selectedMeshName: string | null;
  /** When true and a mesh is selected, hide all other structures (GraphAnatomy / Grypa isolate UX-borrow). */
  isolateMode?: boolean;
  /** Teaching sub-group filter for ligament/tendon layer (defaults: all groups on). */
  visibleLigamentGroups?: Set<LigamentGroupId>;
  /** Teaching sub-group filter for nerve layer (defaults: all groups on). */
  visibleNerveGroups?: Set<NerveGroupId>;
  /** Teaching sub-group filter for vessel layer (defaults: all groups on). */
  visibleVesselGroups?: Set<VesselGroupId>;
  /** Teaching sub-group filter for muscle layer (defaults: all groups on). */
  visibleMuscleGroups?: Set<MuscleGroupId>;
  /** Hover label density: off / ZH / ZH+LA (Open Anatomy Studio bilingual UX-borrow). */
  labelDensity?: LabelDensity;
  /** Per-structure hide set (undergravity/human-atlas dissection UX-borrow; beyond isolate). */
  hiddenStructureIds?: Set<string>;
  /** Per-layer opacity multiplier (教学透视 / ghost). Missing → 1. */
  layerOpacities?: Record<Layer, number>;
}

interface PlaceholderMesh {
  structure: AnatomyStructure;
  meshName: string;
  position: [number, number, number];
  size: [number, number, number];
}

// Real bone GLB models - 26 right foot bones (BP3D CC BY 4.0)
// 14 tarsals/metatarsals + 11 phalanges + 1 sesamoid group (all BP3D ISA right-foot)
const REAL_BONE_MODELS: Record<string, string> = {
  'calcaneus': '/models/right-foot/calcaneus_BP9040.glb',
  'talus': '/models/right-foot/talus_BP8033.glb',
  'navicular': '/models/right-foot/navicular_BP9133.glb',
  'cuboid': '/models/right-foot/cuboid_BP8873.glb',
  'cuneiform_medial': '/models/right-foot/cuneiform_medial_BP8830.glb',
  'cuneiform_intermediate': '/models/right-foot/cuneiform_intermediate_BP9110.glb',
  'cuneiform_lateral': '/models/right-foot/cuneiform_lateral_BP8730.glb',
  'metatarsal_1': '/models/right-foot/metatarsal_1_BP8230.glb',
  'metatarsal_2': '/models/right-foot/metatarsal_2_BP8627.glb',
  'metatarsal_3': '/models/right-foot/metatarsal_3_BP8802.glb',
  'metatarsal_4': '/models/right-foot/metatarsal_4_BP9130.glb',
  'metatarsal_5': '/models/right-foot/metatarsal_5_BP7912.glb',
  'proximal_phalanx_1': '/models/right-foot/proximal_phalanx_1_BP8785.glb',
  'distal_phalanx_1': '/models/right-foot/distal_phalanx_1_BP9282.glb',
  'sesamoid_bones': '/models/right-foot/sesamoid_bones.glb', // BP3D BP8756 (2 hallux sesamoids grouped)
  // Phalanges 2-5: all BP3D ISA right-foot elemental (proximal/middle/distal)
  'proximal_phalanx_2': '/models/right-foot/proximal_phalanx_2.glb', // BP3D
  'proximal_phalanx_3': '/models/right-foot/proximal_phalanx_3.glb', // BP3D
  'proximal_phalanx_4': '/models/right-foot/proximal_phalanx_4.glb', // BP3D
  'proximal_phalanx_5': '/models/right-foot/proximal_phalanx_5.glb', // BP3D
  'middle_phalanx_2': '/models/right-foot/middle_phalanx_2.glb', // BP3D
  'middle_phalanx_3': '/models/right-foot/middle_phalanx_3.glb', // BP3D
  'middle_phalanx_4': '/models/right-foot/middle_phalanx_4.glb', // BP3D
  'distal_phalanx_2': '/models/right-foot/distal_phalanx_2_BP8472.glb', // BP3D (replaces UM Y≈−850 frame)
  'distal_phalanx_3': '/models/right-foot/distal_phalanx_3_BP9005.glb', // BP3D
  'distal_phalanx_4': '/models/right-foot/distal_phalanx_4_BP9261.glb', // BP3D
  'distal_phalanx_5': '/models/right-foot/distal_phalanx_5_BP8695.glb', // BP3D
};

// Real muscle GLB models - BP3D/UM + Open3D BY-SA gap fills (FB/FT/opponens Day 4ad)
const REAL_MUSCLE_MODELS: Record<string, string> = {
  // UM CC0: Intrinsics (5) + Extrinsics (3 P0 + 4 teaching)
  'abductor_hallucis': '/models/right-foot/abductor_hallucis.glb', // UM (8.7x BP3D)
  'flexor_digitorum_brevis': '/models/right-foot/flexor_digitorum_brevis.glb', // UM (2.4x BP3D)
  'abductor_digiti_minimi': '/models/right-foot/abductor_digiti_minimi.glb', // UM (4.5x BP3D)
  'quadratus_plantae': '/models/right-foot/quadratus_plantae.glb', // UM (BP3D gap)
  'extensor_digitorum_brevis': '/models/right-foot/extensor_digitorum_brevis.glb', // UM (BP3D gap)
  'tibialis_posterior': '/models/right-foot/tibialis_posterior.glb', // UM extrinsic
  'flexor_digitorum_longus': '/models/right-foot/flexor_digitorum_longus.glb', // UM extrinsic
  'flexor_hallucis_longus': '/models/right-foot/flexor_hallucis_longus.glb', // UM extrinsic
  'tibialis_anterior': '/models/right-foot/tibialis_anterior.glb', // UM extrinsic (Day 4n Kabsch)
  'fibularis_longus': '/models/right-foot/peroneus_longus.glb', // UM; TA2 fibularis, file keeps peroneus
  'fibularis_brevis': '/models/right-foot/by-sa/fibularis_brevis.glb', // Open3D BY-SA Day 4ad
  'fibularis_tertius': '/models/right-foot/by-sa/fibularis_tertius.glb', // Open3D BY-SA Day 4ad
  'plantaris': '/models/right-foot/by-sa/plantaris.glb', // Z-Anatomy BY-SA Day 4ad
  'extensor_digitorum_longus': '/models/right-foot/extensor_digitorum_longus.glb', // UM extrinsic
  'extensor_hallucis_longus': '/models/right-foot/extensor_hallucis_longus.glb', // UM extrinsic
  
  // BP3D CC BY 4.0 (12): Remaining intrinsics
  'extensor_hallucis_brevis': '/models/right-foot/extensor_hallucis_brevis.glb',
  'flexor_digiti_minimi_brevis': '/models/right-foot/flexor_digiti_minimi_brevis.glb',
  'opponens_digiti_minimi': '/models/right-foot/by-sa/opponens_digiti_minimi.glb', // Open3D BY-SA Day 4ad
  'adductor_hallucis': '/models/right-foot/adductor_hallucis_oblique.glb', // oblique head
  'flexor_hallucis_brevis': '/models/right-foot/flexor_hallucis_brevis_medial.glb',
  'lumbrical_1': '/models/right-foot/lumbrical_1st.glb',
  'lumbrical_2': '/models/right-foot/lumbrical_2nd.glb',
  'lumbrical_3': '/models/right-foot/lumbrical_3rd.glb',
  'lumbrical_4': '/models/right-foot/lumbrical_4th.glb',
  'plantar_interosseous_1': '/models/right-foot/plantar_interosseous_1st.glb',
  'plantar_interosseous_2': '/models/right-foot/plantar_interosseous_2nd.glb',
  'plantar_interosseous_3': '/models/right-foot/plantar_interosseous_3rd.glb',
  // Open3DModel / AnatomyTOOL CC BY-SA 4.0 — isolated under by-sa/
  // GLB vertices baked Open3D meters → BP3D mm (Kabsch); keep scale 0.01 like BP3D
  'interossei_dorsales': '/models/right-foot/by-sa/dorsal_interosseous_1st.glb',
};

// Additional muscle heads as separate meshes
const ADDITIONAL_MUSCLE_PARTS: Record<string, string[]> = {
  'adductor_hallucis': [
    '/models/right-foot/adductor_hallucis_transverse.glb',
  ],
  'flexor_hallucis_brevis': [
    '/models/right-foot/by-sa/flexor_hallucis_brevis_lateral.glb', // ZA BY-SA lateral head
  ],
  'interossei_dorsales': [
    '/models/right-foot/by-sa/dorsal_interosseous_2nd.glb',
    '/models/right-foot/by-sa/dorsal_interosseous_3rd.glb',
    '/models/right-foot/by-sa/dorsal_interosseous_4th.glb',
  ],
};

// Real vessel GLB models — BP3D main-tree arteries + Open3D BY-SA fine/proximal (Day 4aa)
// Includes honest grouped meshes (BP3D dorsal digital + plantar metatarsal; Open3D dorsal metatarsal)
const REAL_VESSEL_MODELS: Record<string, string> = {
  'dorsalis_pedis_artery': '/models/right-foot/dorsalis_pedis_artery.glb',
  'plantar_artery_medial': '/models/right-foot/medial_plantar_artery.glb',
  'plantar_artery_lateral': '/models/right-foot/lateral_plantar_artery.glb',
  'plantar_arch': '/models/right-foot/plantar_arch.glb',
  'arcuate_artery': '/models/right-foot/arcuate_artery.glb',
  'dorsal_digital_arteries': '/models/right-foot/dorsal_digital_arteries.glb', // BP3D BP6049/FJ2072 (grouped)
  'plantar_metatarsal_arteries': '/models/right-foot/plantar_metatarsal_arteries_grouped.glb', // BP3D BP6060/FJ2096 (grouped)
  // Open3DModel / AnatomyTOOL CC BY-SA 4.0 — isolated under by-sa/ (not main CC BY claim)
  'posterior_tibial_artery': '/models/right-foot/by-sa/posterior_tibial_artery.glb',
  'fibular_artery': '/models/right-foot/by-sa/fibular_artery.glb',
  // Day 4aa — deep plantar / arch detail + grouped dorsal MTA + medial plantar branches
  'deep_plantar_artery': '/models/right-foot/by-sa/deep_plantar_artery.glb',
  'deep_plantar_arch': '/models/right-foot/by-sa/deep_plantar_arch.glb',
  'dorsal_metatarsal_arteries': '/models/right-foot/by-sa/dorsal_metatarsal_arteries.glb', // GROUPED
  'deep_branch_medial_plantar_artery': '/models/right-foot/by-sa/deep_branch_medial_plantar_artery.glb',
  'superficial_branch_medial_plantar_artery': '/models/right-foot/by-sa/superficial_branch_medial_plantar_artery.glb',
  // Day 4ab — tarsal aa. + calcaneal aa. + perforating arcuate↔deep arch
  'perforating_arcuate_deep_plantar': '/models/right-foot/by-sa/perforating_arcuate_deep_plantar.glb',
  'lateral_tarsal_artery': '/models/right-foot/by-sa/lateral_tarsal_artery.glb',
  'medial_tarsal_arteries': '/models/right-foot/by-sa/medial_tarsal_arteries.glb', // GROUPED
  'medial_calcaneal_artery': '/models/right-foot/by-sa/medial_calcaneal_artery.glb',
  'lateral_calcaneal_artery': '/models/right-foot/by-sa/lateral_calcaneal_artery.glb',
  'proper_plantar_digital_arteries': '/models/right-foot/by-sa/proper_plantar_digital_arteries.glb', // ZA BY-SA Day 4ad
  'common_plantar_digital_arteries': '/models/right-foot/by-sa/common_plantar_digital_arteries.glb', // ZA BY-SA Day 4ae
  'anterior_tibial_artery': '/models/right-foot/by-sa/anterior_tibial_artery.glb', // ZA BY-SA Day 4ae
  'dorsal_venous_arch': '/models/right-foot/by-sa/dorsal_venous_arch.glb', // ZA BY-SA Day 4ae
  'plantar_venous_arch': '/models/right-foot/by-sa/plantar_venous_arch.glb', // ZA BY-SA Day 4ae
  'plantar_digital_veins': '/models/right-foot/by-sa/plantar_digital_veins.glb', // ZA BY-SA Day 4ae
  // Day 4af — ZA circumflex fibular + medial/lateral plantar veins + plantar metatarsal veins
  'circumflex_fibular_artery': '/models/right-foot/by-sa/circumflex_fibular_artery.glb', // ZA BY-SA Day 4af
  'medial_plantar_veins': '/models/right-foot/by-sa/medial_plantar_veins.glb', // ZA BY-SA Day 4af
  'lateral_plantar_vein': '/models/right-foot/by-sa/lateral_plantar_vein.glb', // ZA BY-SA Day 4af
  'plantar_metatarsal_veins': '/models/right-foot/by-sa/plantar_metatarsal_veins.glb', // ZA BY-SA Day 4af
};

// Real nerve GLBs — Z-Anatomy trunks (CURVE→tube) + Open3D fine/branch (volumetric, Kabsch→BP3D).
// All isolated under by-sa/ (CC BY-SA 4.0). Not a finished peripheral-nerve atlas.
const REAL_NERVE_MODELS: Record<string, string> = {
  'tibial_nerve': '/models/right-foot/by-sa/tibial_nerve.glb',
  'medial_plantar_nerve': '/models/right-foot/by-sa/medial_plantar_nerve.glb',
  'lateral_plantar_nerve': '/models/right-foot/by-sa/lateral_plantar_nerve.glb',
  'deep_fibular_nerve': '/models/right-foot/by-sa/deep_fibular_nerve.glb',
  'superficial_fibular_nerve': '/models/right-foot/by-sa/superficial_fibular_nerve.glb',
  'sural_nerve': '/models/right-foot/by-sa/sural_nerve.glb',
  // Open3DModel / AnatomyTOOL — Day 4x + 4y (Kabsch→BP3D mm)
  'common_plantar_digital_nerves': '/models/right-foot/by-sa/common_plantar_digital_nerves.glb',
  'proper_plantar_digital_nerves_medial': '/models/right-foot/by-sa/proper_plantar_digital_nerves_medial.glb',
  'proper_plantar_digital_nerves_lateral': '/models/right-foot/by-sa/proper_plantar_digital_nerves_lateral.glb',
  'deep_branch_lateral_plantar_nerve': '/models/right-foot/by-sa/deep_branch_lateral_plantar_nerve.glb',
  // Day 4y — deferred cutaneous / calcaneal / superficial LPN / dorsal digitals
  'medial_dorsal_cutaneous_nerve': '/models/right-foot/by-sa/medial_dorsal_cutaneous_nerve.glb',
  'lateral_dorsal_cutaneous_nerve': '/models/right-foot/by-sa/lateral_dorsal_cutaneous_nerve.glb',
  'medial_calcaneal_branches': '/models/right-foot/by-sa/medial_calcaneal_branches.glb',
  'lateral_calcaneal_nerves': '/models/right-foot/by-sa/lateral_calcaneal_nerves.glb',
  'superficial_branch_lateral_plantar_nerve': '/models/right-foot/by-sa/superficial_branch_lateral_plantar_nerve.glb',
  'dorsal_digital_superficial_fibular': '/models/right-foot/by-sa/dorsal_digital_superficial_fibular.glb',
  // Day 4z — deep-fibular dorsal digitals
  'dorsal_digital_deep_fibular': '/models/right-foot/by-sa/dorsal_digital_deep_fibular.glb',
};

// Soft-tissue under ligament toggle — incomplete set (not a finished ligament atlas).
// BP3D CC BY (native mm): long plantar + Achilles tendon.
// Open3D BY-SA (Kabsch→BP3D, by-sa/): ankle, subtalar, midfoot, Lisfranc-ish, forefoot
// transverse, retinacula, plantar aponeurosis (Day 4s–4w; selective + deferred).
const REAL_LIGAMENT_MODELS: Record<string, string> = {
  'long_plantar_ligament': '/models/right-foot/long_plantar_ligament_BP5093.glb',
  // Tendon (not ligament): clear naming in structures.json + tooltip
  'calcaneal_tendon': '/models/right-foot/calcaneal_tendon_BP5098.glb',
  // Open3DModel / AnatomyTOOL CC BY-SA 4.0 — isolated under by-sa/
  'anterior_talofibular_ligament': '/models/right-foot/by-sa/anterior_talofibular_ligament.glb',
  'calcaneofibular_ligament': '/models/right-foot/by-sa/calcaneofibular_ligament.glb',
  'posterior_talofibular_ligament': '/models/right-foot/by-sa/posterior_talofibular_ligament.glb',
  'plantar_calcaneonavicular_ligament': '/models/right-foot/by-sa/plantar_calcaneonavicular_ligament.glb',
  'plantar_aponeurosis': '/models/right-foot/by-sa/plantar_aponeurosis.glb',
  'tibionavicular_ligament': '/models/right-foot/by-sa/tibionavicular_ligament.glb',
  'tibiocalcaneal_ligament': '/models/right-foot/by-sa/tibiocalcaneal_ligament.glb',
  'posterior_tibiotalar_ligament': '/models/right-foot/by-sa/posterior_tibiotalar_ligament.glb',
  'anterior_tibiotalar_ligament': '/models/right-foot/by-sa/anterior_tibiotalar_ligament.glb',
  'plantar_calcaneocuboid_ligament': '/models/right-foot/by-sa/plantar_calcaneocuboid_ligament.glb',
  'bifurcate_ligament': '/models/right-foot/by-sa/bifurcate_ligament.glb',
  'cuneometatarsal_interosseous_ligaments': '/models/right-foot/by-sa/cuneometatarsal_interosseous_ligaments.glb',
  'dorsal_tarsometatarsal_ligaments': '/models/right-foot/by-sa/dorsal_tarsometatarsal_ligaments.glb',
  'plantar_tarsometatarsal_ligaments': '/models/right-foot/by-sa/plantar_tarsometatarsal_ligaments.glb',
  'flexor_retinaculum_of_ankle': '/models/right-foot/by-sa/flexor_retinaculum_of_ankle.glb',
  'superior_extensor_retinaculum': '/models/right-foot/by-sa/superior_extensor_retinaculum.glb',
  'inferior_extensor_retinaculum': '/models/right-foot/by-sa/inferior_extensor_retinaculum.glb',
  'superior_fibular_retinaculum': '/models/right-foot/by-sa/superior_fibular_retinaculum.glb',
  'inferior_fibular_retinaculum': '/models/right-foot/by-sa/inferior_fibular_retinaculum.glb',
  'interosseous_talocalcaneal_ligament': '/models/right-foot/by-sa/interosseous_talocalcaneal_ligament.glb',
  'cervical_talocalcaneal_ligament': '/models/right-foot/by-sa/cervical_talocalcaneal_ligament.glb',
  'talonavicular_ligament': '/models/right-foot/by-sa/talonavicular_ligament.glb',
  'deep_transverse_metatarsal_ligament': '/models/right-foot/by-sa/deep_transverse_metatarsal_ligament.glb',
  'intercuneiform_interosseous_ligaments': '/models/right-foot/by-sa/intercuneiform_interosseous_ligaments.glb',
  'dorsal_cuneonavicular_ligaments': '/models/right-foot/by-sa/dorsal_cuneonavicular_ligaments.glb',
  'medial_talocalcaneal_ligament': '/models/right-foot/by-sa/medial_talocalcaneal_ligament.glb',
  'dorsal_intercuneiform_ligaments': '/models/right-foot/by-sa/dorsal_intercuneiform_ligaments.glb',
};

export default function FootModel({ visibleLayers, onMeshClick, selectedMeshName, isolateMode = false, visibleLigamentGroups, visibleNerveGroups, visibleVesselGroups, visibleMuscleGroups, labelDensity = DEFAULT_LABEL_DENSITY, hiddenStructureIds, layerOpacities }: FootModelProps) {
  const ligGroups = visibleLigamentGroups ?? new Set(getAllLigamentGroupIds());
  const nerveGroups = visibleNerveGroups ?? new Set(getAllNerveGroupIds());
  const vesselGroups = visibleVesselGroups ?? new Set(getAllVesselGroupIds());
  const muscleGroups = visibleMuscleGroups ?? new Set(getAllMuscleGroupIds());

  // Lazy-preload soft-tissue / vessel / nerve GLBs when those layers become visible
  useEffect(() => {
    visibleLayers.forEach((layer) => {
      if (layer !== 'bone') preloadLayerAssets(layer);
    });
  }, [visibleLayers]);

  const [placeholderMeshes, setPlaceholderMeshes] = useState<PlaceholderMesh[]>([]);
  const [hoveredMesh, setHoveredMesh] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const structures = getAllStructures();
    const meshes: PlaceholderMesh[] = [];
    let boneIndex = 0;
    let muscleIndex = 0;
    let nerveIndex = 0;
    let vesselIndex = 0;

    structures.forEach((structure) => {
      const meshName = structure.meshNames[0];
      let position: [number, number, number];
      let size: [number, number, number];

      if (structure.layer === 'bone') {
        position = [-0.3 + boneIndex * 0.15, 0.1, 0];
        size = [0.12, 0.12, 0.12];
        boneIndex++;
      } else if (structure.layer === 'muscle') {
        // Improved muscle placeholder: oriented ellipsoids following foot anatomy
        // Intrinsic muscles arranged along plantar surface
        const row = Math.floor(muscleIndex / 4);
        const col = muscleIndex % 4;
        position = [-0.3 + col * 0.2, 0.02 + row * 0.08, -0.1 + row * 0.1];
        // Vary sizes to suggest muscle belly shapes
        size = [0.06 + Math.random() * 0.03, 0.12 + Math.random() * 0.06, 0.04];
        muscleIndex++;
      } else if (structure.layer === 'nerve') {
        // Improved nerve placeholder: thinner cylinders following nerve pathways
        position = [-0.3 + nerveIndex * 0.12, 0.08, -0.15 + nerveIndex * 0.05];
        size = [0.008, 0.25, 0.008]; // Thinner for nerve-like appearance
        nerveIndex++;
      } else {
        // Improved vessel placeholder: arterial tubes with slight taper
        position = [0.2 + vesselIndex * 0.12, 0.08, -0.15 + vesselIndex * 0.05];
        size = [0.012, 0.25, 0.012]; // Slightly thicker than nerves
        vesselIndex++;
      }

      meshes.push({ structure, meshName, position, size });
    });

    setPlaceholderMeshes(meshes);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Html center>
        <div style={{ 
          color: 'white', 
          background: 'rgba(0,0,0,0.7)', 
          padding: '1rem', 
          borderRadius: '4px',
          fontFamily: 'sans-serif'
        }}>
          加载中...
        </div>
      </Html>
    );
  }

  return (
    <group>
      {placeholderMeshes.map(({ structure, meshName, position, size }) => {
        const isVisible = visibleLayers.has(structure.layer);
        if (!isVisible) return null;

        // Per-structure hide (dissection habit) — independent of isolate
        if (isStructureHidden(hiddenStructureIds, structure.id)) {
          return null;
        }

        if (
          structure.layer === 'ligament' &&
          !structureInVisibleLigamentGroups(structure.id, ligGroups)
        ) {
          return null;
        }

        if (
          structure.layer === 'nerve' &&
          !structureInVisibleNerveGroups(structure.id, nerveGroups)
        ) {
          return null;
        }

        if (
          structure.layer === 'vessel' &&
          !structureInVisibleVesselGroups(structure.id, vesselGroups)
        ) {
          return null;
        }

        if (
          structure.layer === 'muscle' &&
          !structureInVisibleMuscleGroups(structure.id, muscleGroups)
        ) {
          return null;
        }

        // Isolate: keep selected structure (any of its meshNames) only
        if (isolateMode && selectedMeshName) {
          const selectedStruct = getStructureByMeshName(selectedMeshName);
          const keep =
            structure.meshNames.includes(selectedMeshName) ||
            (selectedStruct != null && selectedStruct.id === structure.id);
          if (!keep) return null;
        }

        const color = LAYER_CONFIG[structure.layer].color;
        const isSelected = meshName === selectedMeshName;
        const isHovered = meshName === hoveredMesh;
        const layerOpacity = layerOpacities?.[structure.layer] ?? DEFAULT_LAYER_OPACITY;
        // Teaching polish: when something is selected (and not isolating), dim peers
        const selectedStruct = selectedMeshName ? getStructureByMeshName(selectedMeshName) : null;
        const isPeerOfSelection =
          Boolean(selectedMeshName) &&
          !isolateMode &&
          !(
            structure.meshNames.includes(selectedMeshName!) ||
            (selectedStruct != null && selectedStruct.id === structure.id)
          );
        
        // Check if this structure has a real GLB model
        const hasRealBone = structure.layer === 'bone' && REAL_BONE_MODELS[structure.id];
        const hasRealMuscle = structure.layer === 'muscle' && REAL_MUSCLE_MODELS[structure.id];
        const hasRealVessel = structure.layer === 'vessel' && REAL_VESSEL_MODELS[structure.id];
        const hasRealNerve = structure.layer === 'nerve' && REAL_NERVE_MODELS[structure.id];
        const hasRealLigament = structure.layer === 'ligament' && REAL_LIGAMENT_MODELS[structure.id];

        // Render real GLB model for bones with available meshes
        if (hasRealBone) {
          return (
            <RealBoneModel
              key={meshName}
              structure={structure}
              meshName={meshName}
              modelPath={REAL_BONE_MODELS[structure.id]}
              color={color}
              isSelected={isSelected}
              isHovered={isHovered}
              onMeshClick={onMeshClick}
              onHoverChange={setHoveredMesh}
              labelDensity={labelDensity}
              layerOpacity={layerOpacity}
            />
          );
        }

        // Render real GLB model for muscles with available meshes
        if (hasRealMuscle) {
          return (
            <RealMuscleModel
              key={meshName}
              structure={structure}
              meshName={meshName}
              modelPath={REAL_MUSCLE_MODELS[structure.id]}
              additionalParts={ADDITIONAL_MUSCLE_PARTS[structure.id]}
              color={color}
              isSelected={isSelected}
              isHovered={isHovered}
              onMeshClick={onMeshClick}
              onHoverChange={setHoveredMesh}
              labelDensity={labelDensity}
              layerOpacity={layerOpacity}
            />
          );
        }

        // Render real GLB model for vessels with available meshes
        if (hasRealVessel) {
          return (
            <RealVesselModel
              key={meshName}
              structure={structure}
              meshName={meshName}
              modelPath={REAL_VESSEL_MODELS[structure.id]}
              color={color}
              isSelected={isSelected}
              isHovered={isHovered}
              isDimmed={isPeerOfSelection}
              onMeshClick={onMeshClick}
              onHoverChange={setHoveredMesh}
              labelDensity={labelDensity}
              layerOpacity={layerOpacity}
            />
          );
        }

        // Render real GLB model for nerves with available meshes (CC BY-SA 4.0)
        if (hasRealNerve) {
          return (
            <RealNerveModel
              key={meshName}
              structure={structure}
              meshName={meshName}
              modelPath={REAL_NERVE_MODELS[structure.id]}
              color={color}
              isSelected={isSelected}
              isHovered={isHovered}
              isDimmed={isPeerOfSelection}
              onMeshClick={onMeshClick}
              onHoverChange={setHoveredMesh}
              labelDensity={labelDensity}
              layerOpacity={layerOpacity}
            />
          );
        }

        // Render real GLB ligament (BP3D CC BY 4.0)
        if (hasRealLigament) {
          return (
            <RealLigamentModel
              key={meshName}
              structure={structure}
              meshName={meshName}
              modelPath={REAL_LIGAMENT_MODELS[structure.id]}
              color={color}
              isSelected={isSelected}
              isHovered={isHovered}
              onMeshClick={onMeshClick}
              onHoverChange={setHoveredMesh}
              labelDensity={labelDensity}
              layerOpacity={layerOpacity}
            />
          );
        }

        // Fallback: placeholder geometry
        return (
          <group key={meshName}>
            <mesh
              name={meshName}
              position={position}
              rotation={structure.layer === 'muscle' ? [0, 0, Math.PI / 12] : [0, 0, 0]}
              onClick={(e) => {
                e.stopPropagation();
                onMeshClick(meshName);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
                setHoveredMesh(meshName);
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'default';
                setHoveredMesh(null);
              }}
            >
              {structure.layer === 'nerve' ? (
                <cylinderGeometry args={[size[0], size[0], size[1], 12]} />
              ) : structure.layer === 'vessel' ? (
                <cylinderGeometry args={[size[0], size[0] * 0.8, size[1], 12]} />
              ) : structure.layer === 'muscle' ? (
                <capsuleGeometry args={[size[0], size[1], 16, 16]} />
              ) : (
                <boxGeometry args={size} />
              )}
              <meshStandardMaterial
                color={color}
                emissive={
                  isSelected ? '#00ffff' 
                  : isHovered ? '#ffffff' 
                  : structure.layer === 'nerve' ? '#333300'
                  : '#000000'
                }
                emissiveIntensity={
                  isSelected ? 0.6 
                  : isHovered ? 0.3 
                  : structure.layer === 'nerve' ? 0.15
                  : structure.layer === 'vessel' ? 0.1
                  : 0
                }
                opacity={composeLayerOpacity(
                  isHovered && !isSelected
                    ? 0.9
                    : structure.layer === 'muscle'
                      ? 0.85
                      : structure.layer === 'vessel'
                        ? 0.8
                        : 1,
                  layerOpacity,
                )}
                transparent={true}
                roughness={structure.layer === 'muscle' ? 0.7 : 0.4}
                metalness={structure.layer === 'vessel' ? 0.2 : 0}
              />
            </mesh>
            {isHovered && !isSelected && shouldShowHoverLabel(labelDensity) && (
              <Html position={[position[0], position[1] + 0.2, position[2]]} center>
                <StructureHoverLabel
                  nameZh={structure.nameZh}
                  nameLa={structure.nameLa}
                  density={labelDensity}
                  borderColor={color}
                  footnote={
                    structure.placeholder ? (
                      <div style={{ fontSize: '0.7rem', color: '#ffa500', marginTop: '0.25rem' }}>占位</div>
                    ) : null
                  }
                />
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

// Component for rendering real GLB bone models
interface RealBoneModelProps {
  structure: AnatomyStructure;
  meshName: string;
  modelPath: string;
  color: string;
  isSelected: boolean;
  isHovered: boolean;
  onMeshClick: (meshName: string) => void;
  onHoverChange: (meshName: string | null) => void;
  labelDensity?: LabelDensity;
  layerOpacity?: number;
}

function RealBoneModel({
  structure,
  meshName,
  modelPath,
  color,
  isSelected,
  isHovered,
  onMeshClick,
  onHoverChange,
  labelDensity = DEFAULT_LABEL_DENSITY,
  layerOpacity = DEFAULT_LAYER_OPACITY,
}: RealBoneModelProps) {
  const { scene } = useGLTF(modelPath);
  
  // Clone scene to avoid sharing materials
  const clonedScene = scene.clone();
  
  // Apply materials to all meshes in the scene
  useEffect(() => {
    clonedScene.traverse((node) => {
      if ((node as any).isMesh) {
        const mesh = node as any;
        mesh.material = mesh.material.clone();
        mesh.material.color.set(color);
        mesh.material.emissive.set(isSelected ? '#00ffff' : (isHovered ? '#ffffff' : '#000000'));
        mesh.material.emissiveIntensity = isSelected ? 0.6 : (isHovered ? 0.3 : 0);
        const opacity = composeLayerOpacity(isHovered && !isSelected ? 0.9 : 1, layerOpacity);
        mesh.material.transparent = opacityNeedsTransparency(opacity);
        mesh.material.opacity = opacity;
        mesh.material.needsUpdate = true;
      }
    });
  }, [clonedScene, color, isSelected, isHovered, layerOpacity]);
  
  return (
    <group
      name={meshName}
      scale={[0.01, 0.01, 0.01]} // BodyParts3D models are in mm, scale to cm
      onClick={(e) => {
        e.stopPropagation();
        onMeshClick(meshName);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHoverChange(meshName);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHoverChange(null);
      }}
    >
      <primitive object={clonedScene} />
      {isHovered && !isSelected && shouldShowHoverLabel(labelDensity) && (
        <Html position={[0, 200, 0]} center>
          <StructureHoverLabel
            nameZh={structure.nameZh}
            nameLa={structure.nameLa}
            density={labelDensity}
            borderColor={color}
            footnote={<div style={{ fontSize: '0.7rem', color: '#00ff00', marginTop: '0.25rem' }}>BodyParts3D</div>}
          />
        </Html>
      )}
    </group>
  );
}

// Component for rendering real GLB muscle models
interface RealMuscleModelProps {
  structure: AnatomyStructure;
  meshName: string;
  modelPath: string;
  additionalParts?: string[];
  color: string;
  isSelected: boolean;
  isHovered: boolean;
  onMeshClick: (meshName: string) => void;
  onHoverChange: (meshName: string | null) => void;
  labelDensity?: LabelDensity;
  layerOpacity?: number;
}

function RealMuscleModel({
  structure,
  meshName,
  modelPath,
  additionalParts,
  color,
  isSelected,
  isHovered,
  onMeshClick,
  onHoverChange,
  labelDensity = DEFAULT_LABEL_DENSITY,
  layerOpacity = DEFAULT_LAYER_OPACITY,
}: RealMuscleModelProps) {
  const { scene } = useGLTF(modelPath);
  const additionalScenes = (additionalParts || []).map(path => useGLTF(path).scene);
  
  // Clone scenes to avoid sharing materials
  const clonedScene = scene.clone();
  const clonedAdditional = additionalScenes.map(s => s.clone());
  
  // Apply materials to all meshes
  useEffect(() => {
    [clonedScene, ...clonedAdditional].forEach(scn => {
      scn.traverse((node) => {
        if ((node as any).isMesh) {
          const mesh = node as any;
          mesh.material = mesh.material.clone();
          mesh.material.color.set(color);
          mesh.material.emissive.set(isSelected ? '#ff6600' : (isHovered ? '#ffffff' : '#000000'));
          mesh.material.emissiveIntensity = isSelected ? 0.4 : (isHovered ? 0.2 : 0);
          mesh.material.transparent = true;
          mesh.material.opacity = composeLayerOpacity(
            isHovered && !isSelected ? 0.85 : 0.75,
            layerOpacity,
          );
          mesh.material.roughness = 0.7;
          mesh.material.needsUpdate = true;
        }
      });
    });
  }, [clonedScene, clonedAdditional, color, isSelected, isHovered, layerOpacity]);
  
  return (
    <group
      name={meshName}
      scale={[0.01, 0.01, 0.01]} // BodyParts3D models are in mm
      onClick={(e) => {
        e.stopPropagation();
        onMeshClick(meshName);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHoverChange(meshName);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHoverChange(null);
      }}
    >
      <primitive object={clonedScene} />
      {clonedAdditional.map((s, i) => (
        <primitive key={i} object={s} />
      ))}
      {isHovered && !isSelected && shouldShowHoverLabel(labelDensity) && (
        <Html position={[0, 200, 0]} center>
          <StructureHoverLabel
            nameZh={structure.nameZh}
            nameLa={structure.nameLa}
            density={labelDensity}
            borderColor={color}
            footnote={
              <div style={{ fontSize: '0.7rem', color: modelPath.includes('/by-sa/') ? '#a78bfa' : '#ff8800', marginTop: '0.25rem' }}>
                {modelPath.includes('/by-sa/') ? 'BY-SA (isolate)' : 'UM / BP3D'}
              </div>
            }
          />
        </Html>
      )}
    </group>
  );
}

// Component for rendering real GLB vessel models
interface RealVesselModelProps {
  structure: AnatomyStructure;
  meshName: string;
  modelPath: string;
  color: string;
  isSelected: boolean;
  isHovered: boolean;
  isDimmed?: boolean;
  onMeshClick: (meshName: string) => void;
  onHoverChange: (meshName: string | null) => void;
  labelDensity?: LabelDensity;
  layerOpacity?: number;
}

function RealVesselModel({
  structure,
  meshName,
  modelPath,
  color,
  isSelected,
  isHovered,
  isDimmed = false,
  onMeshClick,
  onHoverChange,
  labelDensity = DEFAULT_LABEL_DENSITY,
  layerOpacity = DEFAULT_LAYER_OPACITY,
}: RealVesselModelProps) {
  const { scene } = useGLTF(modelPath);
  
  const clonedScene = scene.clone();
  
  // Apply vessel-specific materials (slightly translucent red); dim peers when a vessel/structure is selected
  useEffect(() => {
    clonedScene.traverse((node) => {
      if ((node as any).isMesh) {
        const mesh = node as any;
        mesh.material = mesh.material.clone();
        mesh.material.color.set(color);
        mesh.material.emissive.set(
          isSelected ? '#ff0000' : isHovered ? '#ff6666' : isDimmed ? '#1a0000' : '#330000',
        );
        mesh.material.emissiveIntensity = isSelected ? 0.35 : isHovered ? 0.22 : isDimmed ? 0.04 : 0.1;
        mesh.material.transparent = true;
        mesh.material.opacity = composeLayerOpacity(
          isSelected ? 0.92 : isHovered ? 0.85 : isDimmed ? 0.22 : 0.78,
          layerOpacity,
        );
        mesh.material.metalness = 0.2;
        mesh.material.needsUpdate = true;
      }
    });
  }, [clonedScene, color, isSelected, isHovered, isDimmed, layerOpacity]);
  
  return (
    <group
      name={meshName}
      scale={[0.01, 0.01, 0.01]} // BodyParts3D models are in mm
      onClick={(e) => {
        e.stopPropagation();
        onMeshClick(meshName);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHoverChange(meshName);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHoverChange(null);
      }}
    >
      <primitive object={clonedScene} />
      {isHovered && !isSelected && shouldShowHoverLabel(labelDensity) && (
        <Html position={[0, 200, 0]} center>
          <StructureHoverLabel
            nameZh={structure.nameZh}
            nameLa={structure.nameLa}
            density={labelDensity}
            borderColor={color}
            footnote={
              <div style={{ fontSize: '0.7rem', color: modelPath.includes('/by-sa/') ? '#a78bfa' : '#ff3333', marginTop: '0.25rem' }}>
                {modelPath.includes('/by-sa/') ? 'BY-SA (isolate)' : 'BodyParts3D'}
              </div>
            }
          />
        </Html>
      )}
    </group>
  );
}

// Component for rendering real GLB nerve models (CC BY-SA 4.0)
interface RealNerveModelProps {
  structure: AnatomyStructure;
  meshName: string;
  modelPath: string;
  color: string;
  isSelected: boolean;
  isHovered: boolean;
  isDimmed?: boolean;
  onMeshClick: (meshName: string) => void;
  onHoverChange: (meshName: string | null) => void;
  labelDensity?: LabelDensity;
  layerOpacity?: number;
}

function RealNerveModel({
  structure,
  meshName,
  modelPath,
  color,
  isSelected,
  isHovered,
  isDimmed = false,
  onMeshClick,
  onHoverChange,
  labelDensity = DEFAULT_LABEL_DENSITY,
  layerOpacity = DEFAULT_LAYER_OPACITY,
}: RealNerveModelProps) {
  const { scene } = useGLTF(modelPath);
  
  const clonedScene = scene.clone();
  
  // Apply nerve-specific materials (yellow, slightly emissive); dim peers when a nerve is selected
  useEffect(() => {
    clonedScene.traverse((node) => {
      if ((node as any).isMesh) {
        const mesh = node as any;
        mesh.material = mesh.material.clone();
        mesh.material.color.set(color);
        mesh.material.emissive.set(
          isSelected ? '#ffff00' : isHovered ? '#ffff66' : isDimmed ? '#333300' : '#666600',
        );
        mesh.material.emissiveIntensity = isSelected ? 0.55 : isHovered ? 0.32 : isDimmed ? 0.06 : 0.2;
        mesh.material.transparent = true;
        mesh.material.opacity = composeLayerOpacity(
          isSelected ? 1 : isHovered ? 0.95 : isDimmed ? 0.2 : 0.9,
          layerOpacity,
        );
        mesh.material.metalness = 0.1;
        mesh.material.roughness = 0.8;
        mesh.material.needsUpdate = true;
      }
    });
  }, [clonedScene, color, isSelected, isHovered, isDimmed, layerOpacity]);
  
  return (
    <group
      name={meshName}
      scale={[0.01, 0.01, 0.01]}
      onClick={(e) => {
        e.stopPropagation();
        onMeshClick(meshName);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHoverChange(meshName);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHoverChange(null);
      }}
    >
      <primitive object={clonedScene} />
      {(isHovered || isSelected) && shouldShowHoverLabel(labelDensity) && (
        <Html position={[0, 20, 0]} center distanceFactor={150}>
          <StructureHoverLabel
            nameZh={structure.nameZh}
            nameLa={structure.nameLa}
            density={labelDensity}
            borderColor="rgba(255, 255, 0, 0.5)"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.3)', fontSize: '13px' }}
            footnote={
              <div style={{
                fontSize: '10px',
                marginTop: '4px',
                padding: '2px 6px',
                background: 'rgba(255, 255, 0, 0.2)',
                borderRadius: '3px',
                border: '1px solid rgba(255, 255, 0, 0.4)',
              }}>
                {/common_plantar|proper_plantar|deep_branch_lateral|dorsal_cutaneous|calcaneal|superficial_branch_lateral|dorsal_digital_/.test(modelPath)
                  ? 'Open3D (BY-SA 4.0)'
                  : 'Z-Anatomy (BY-SA 4.0)'}
              </div>
            }
          />
        </Html>
      )}
    </group>
  );
}


// Component for rendering real GLB ligament/tendon/fascia models (BP3D CC BY + Open3D BY-SA)
interface RealLigamentModelProps {
  structure: AnatomyStructure;
  meshName: string;
  modelPath: string;
  color: string;
  isSelected: boolean;
  isHovered: boolean;
  onMeshClick: (meshName: string) => void;
  onHoverChange: (meshName: string | null) => void;
  labelDensity?: LabelDensity;
  layerOpacity?: number;
}

function RealLigamentModel({
  structure,
  meshName,
  modelPath,
  color,
  isSelected,
  isHovered,
  onMeshClick,
  onHoverChange,
  labelDensity = DEFAULT_LABEL_DENSITY,
  layerOpacity = DEFAULT_LAYER_OPACITY,
}: RealLigamentModelProps) {
  const { scene } = useGLTF(modelPath);
  const clonedScene = scene.clone();

  useEffect(() => {
    clonedScene.traverse((node) => {
      if ((node as any).isMesh) {
        const mesh = node as any;
        mesh.material = mesh.material.clone();
        mesh.material.color.set(color);
        mesh.material.emissive.set(isSelected ? '#d4a574' : (isHovered ? '#ffffff' : '#3a3020'));
        mesh.material.emissiveIntensity = isSelected ? 0.45 : (isHovered ? 0.25 : 0.08);
        mesh.material.transparent = true;
        mesh.material.opacity = composeLayerOpacity(
          isHovered && !isSelected ? 0.9 : 0.82,
          layerOpacity,
        );
        mesh.material.roughness = 0.55;
        mesh.material.metalness = 0.05;
        mesh.material.needsUpdate = true;
      }
    });
  }, [clonedScene, color, isSelected, isHovered, layerOpacity]);

  return (
    <group
      name={meshName}
      scale={[0.01, 0.01, 0.01]}
      onClick={(e) => {
        e.stopPropagation();
        onMeshClick(meshName);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHoverChange(meshName);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHoverChange(null);
      }}
    >
      <primitive object={clonedScene} />
      {isHovered && !isSelected && shouldShowHoverLabel(labelDensity) && (
        <Html position={[0, 200, 0]} center>
          <StructureHoverLabel
            nameZh={structure.nameZh}
            nameLa={structure.nameLa}
            density={labelDensity}
            borderColor={color}
            footnote={
              <div style={{ fontSize: '0.7rem', color: modelPath.includes('/by-sa/') ? '#a78bfa' : '#e8dcc8', marginTop: '0.25rem' }}>
                {modelPath.includes('/by-sa/')
                  ? 'BY-SA (isolate) · ligament/fascia'
                  : `BodyParts3D · ${structure.id === 'calcaneal_tendon' ? 'tendon (跟腱)' : 'ligament'}`}
              </div>
            }
          />
        </Html>
      )}
    </group>
  );
}

/**
 * Load strategy (honesty): ~134 discrete teaching GLBs (~13 MB; 59 main + 75 by-sa).
 * Visibility-gated mount already skips useGLTF for hidden layers.
 * Preload: bones eager (always-on osteology); other layers on demand when toggled visible
 * (BodyExplorer / OPANEX “deeper layer” habit — no code copy).
 */
function preloadPaths(paths: string[]) {
  paths.forEach((path) => useGLTF.preload(path));
}

Object.values(REAL_BONE_MODELS).forEach((path) => {
  useGLTF.preload(path);
});

export function preloadLayerAssets(layer: Layer) {
  if (layer === 'bone') {
    preloadPaths(Object.values(REAL_BONE_MODELS));
  } else if (layer === 'muscle') {
    preloadPaths(Object.values(REAL_MUSCLE_MODELS));
    preloadPaths(Object.values(ADDITIONAL_MUSCLE_PARTS).flat());
  } else if (layer === 'vessel') {
    preloadPaths(Object.values(REAL_VESSEL_MODELS));
  } else if (layer === 'nerve') {
    preloadPaths(Object.values(REAL_NERVE_MODELS));
  } else if (layer === 'ligament') {
    preloadPaths(Object.values(REAL_LIGAMENT_MODELS));
  }
}
