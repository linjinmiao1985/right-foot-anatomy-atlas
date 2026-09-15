import { useEffect, useState } from 'react';
import { Html, useGLTF } from '@react-three/drei';
import { getAllStructures, getStructureByMeshName } from '../lib/structureLookup';
import { LAYER_CONFIG } from '../lib/layers';
import type { Layer } from '../types/anatomy';
import type { AnatomyStructure } from '../types/anatomy';

interface FootModelProps {
  visibleLayers: Set<Layer>;
  onMeshClick: (meshName: string) => void;
  selectedMeshName: string | null;
  /** When true and a mesh is selected, hide all other structures (GraphAnatomy / Grypa isolate UX-borrow). */
  isolateMode?: boolean;
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

// Real muscle GLB models - BP3D intrinsics + UM CC0 (8 prior + 4 teaching extrinsics)
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
  'extensor_digitorum_longus': '/models/right-foot/extensor_digitorum_longus.glb', // UM extrinsic
  'extensor_hallucis_longus': '/models/right-foot/extensor_hallucis_longus.glb', // UM extrinsic
  
  // BP3D CC BY 4.0 (12): Remaining intrinsics
  'extensor_hallucis_brevis': '/models/right-foot/extensor_hallucis_brevis.glb',
  'flexor_digiti_minimi_brevis': '/models/right-foot/flexor_digiti_minimi_brevis.glb',
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
  'interossei_dorsales': [
    '/models/right-foot/by-sa/dorsal_interosseous_2nd.glb',
    '/models/right-foot/by-sa/dorsal_interosseous_3rd.glb',
    '/models/right-foot/by-sa/dorsal_interosseous_4th.glb',
  ],
};

// Real vessel GLB models - 7 right foot arteries from BodyParts3D (CC BY 4.0)
// Includes 2 honest grouped meshes (dorsal digital + plantar metatarsal, not individually split)
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
};

// Real nerve GLB models - 6 right foot nerves from Z-Anatomy (CC BY-SA 4.0)
// Isolated in by-sa/ subdirectory due to ShareAlike license requirement
const REAL_NERVE_MODELS: Record<string, string> = {
  'tibial_nerve': '/models/right-foot/by-sa/tibial_nerve.glb',
  'medial_plantar_nerve': '/models/right-foot/by-sa/medial_plantar_nerve.glb',
  'lateral_plantar_nerve': '/models/right-foot/by-sa/lateral_plantar_nerve.glb',
  'deep_fibular_nerve': '/models/right-foot/by-sa/deep_fibular_nerve.glb',
  'superficial_fibular_nerve': '/models/right-foot/by-sa/superficial_fibular_nerve.glb',
  'sural_nerve': '/models/right-foot/by-sa/sural_nerve.glb',
};

// Soft-tissue under ligament toggle — incomplete set (not a finished ligament atlas).
// BP3D CC BY (native mm): long plantar + Achilles tendon.
// Open3D BY-SA (Kabsch→BP3D, by-sa/): ATFL, CFL, spring ligament, plantar aponeurosis.
const REAL_LIGAMENT_MODELS: Record<string, string> = {
  'long_plantar_ligament': '/models/right-foot/long_plantar_ligament_BP5093.glb',
  // Tendon (not ligament): clear naming in structures.json + tooltip
  'calcaneal_tendon': '/models/right-foot/calcaneal_tendon_BP5098.glb',
  // Open3DModel / AnatomyTOOL CC BY-SA 4.0 — isolated under by-sa/
  'anterior_talofibular_ligament': '/models/right-foot/by-sa/anterior_talofibular_ligament.glb',
  'calcaneofibular_ligament': '/models/right-foot/by-sa/calcaneofibular_ligament.glb',
  'plantar_calcaneonavicular_ligament': '/models/right-foot/by-sa/plantar_calcaneonavicular_ligament.glb',
  'plantar_aponeurosis': '/models/right-foot/by-sa/plantar_aponeurosis.glb',
};

export default function FootModel({ visibleLayers, onMeshClick, selectedMeshName, isolateMode = false }: FootModelProps) {
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
                opacity={
                  isHovered && !isSelected ? 0.9 
                  : structure.layer === 'muscle' ? 0.85
                  : structure.layer === 'vessel' ? 0.8
                  : 1
                }
                transparent={true}
                roughness={structure.layer === 'muscle' ? 0.7 : 0.4}
                metalness={structure.layer === 'vessel' ? 0.2 : 0}
              />
            </mesh>
            {isHovered && !isSelected && (
              <Html position={[position[0], position[1] + 0.2, position[2]]} center>
                <div style={{ 
                  background: 'rgba(0,0,0,0.85)', 
                  color: 'white',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  border: `2px solid ${color}`,
                  fontFamily: 'sans-serif'
                }}>
                  <strong>{structure.nameZh}</strong>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>
                    {structure.nameLa}
                  </div>
                  {structure.placeholder && (
                    <div style={{ fontSize: '0.7rem', color: '#ffa500', marginTop: '0.25rem' }}>
                      占位
                    </div>
                  )}
                </div>
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
        mesh.material.transparent = isHovered && !isSelected;
        mesh.material.opacity = isHovered && !isSelected ? 0.9 : 1;
        mesh.material.needsUpdate = true;
      }
    });
  }, [clonedScene, color, isSelected, isHovered]);
  
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
      {isHovered && !isSelected && (
        <Html position={[0, 200, 0]} center>
          <div style={{ 
            background: 'rgba(0,0,0,0.85)', 
            color: 'white',
            padding: '0.5rem 0.75rem',
            borderRadius: '4px',
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            border: `2px solid ${color}`,
            fontFamily: 'sans-serif'
          }}>
            <strong>{structure.nameZh}</strong>
            <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>
              {structure.nameLa}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#00ff00', marginTop: '0.25rem' }}>
              BodyParts3D
            </div>
          </div>
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
          mesh.material.opacity = isHovered && !isSelected ? 0.85 : 0.75;
          mesh.material.roughness = 0.7;
          mesh.material.needsUpdate = true;
        }
      });
    });
  }, [clonedScene, clonedAdditional, color, isSelected, isHovered]);
  
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
      {isHovered && !isSelected && (
        <Html position={[0, 200, 0]} center>
          <div style={{ 
            background: 'rgba(0,0,0,0.85)', 
            color: 'white',
            padding: '0.5rem 0.75rem',
            borderRadius: '4px',
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            border: `2px solid ${color}`,
            fontFamily: 'sans-serif'
          }}>
            <strong>{structure.nameZh}</strong>
            <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>
              {structure.nameLa}
            </div>
            <div style={{ fontSize: '0.7rem', color: modelPath.includes('/by-sa/') ? '#a78bfa' : '#ff8800', marginTop: '0.25rem' }}>
              {modelPath.includes('/by-sa/') ? 'Open3D BY-SA' : 'BodyParts3D'}
            </div>
          </div>
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
        mesh.material.opacity = isSelected ? 0.92 : isHovered ? 0.85 : isDimmed ? 0.22 : 0.78;
        mesh.material.metalness = 0.2;
        mesh.material.needsUpdate = true;
      }
    });
  }, [clonedScene, color, isSelected, isHovered, isDimmed]);
  
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
      {isHovered && !isSelected && (
        <Html position={[0, 200, 0]} center>
          <div style={{ 
            background: 'rgba(0,0,0,0.85)', 
            color: 'white',
            padding: '0.5rem 0.75rem',
            borderRadius: '4px',
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            border: `2px solid ${color}`,
            fontFamily: 'sans-serif'
          }}>
            <strong>{structure.nameZh}</strong>
            <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>
              {structure.nameLa}
            </div>
            <div style={{ fontSize: '0.7rem', color: modelPath.includes('/by-sa/') ? '#a78bfa' : '#ff3333', marginTop: '0.25rem' }}>
              {modelPath.includes('/by-sa/') ? 'Open3D BY-SA' : 'BodyParts3D'}
            </div>
          </div>
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
        mesh.material.opacity = isSelected ? 1 : isHovered ? 0.95 : isDimmed ? 0.2 : 0.9;
        mesh.material.metalness = 0.1;
        mesh.material.roughness = 0.8;
        mesh.material.needsUpdate = true;
      }
    });
  }, [clonedScene, color, isSelected, isHovered, isDimmed]);
  
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
      {(isHovered || isSelected) && (
        <Html position={[0, 20, 0]} center distanceFactor={150}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.85)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '13px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            border: '1px solid rgba(255, 255, 0, 0.5)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}>
            <div style={{ fontWeight: 'bold' }}>{structure.nameZh}</div>
            <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '2px' }}>{structure.nameLa}</div>
            <div style={{ 
              fontSize: '10px', 
              marginTop: '4px', 
              padding: '2px 6px', 
              background: 'rgba(255, 255, 0, 0.2)',
              borderRadius: '3px',
              border: '1px solid rgba(255, 255, 0, 0.4)',
            }}>
              Z-Anatomy (BY-SA 4.0)
            </div>
          </div>
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
        mesh.material.opacity = isHovered && !isSelected ? 0.9 : 0.82;
        mesh.material.roughness = 0.55;
        mesh.material.metalness = 0.05;
        mesh.material.needsUpdate = true;
      }
    });
  }, [clonedScene, color, isSelected, isHovered]);

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
      {isHovered && !isSelected && (
        <Html position={[0, 200, 0]} center>
          <div style={{
            background: 'rgba(0,0,0,0.85)',
            color: 'white',
            padding: '0.5rem 0.75rem',
            borderRadius: '4px',
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            border: `2px solid ${color}`,
            fontFamily: 'sans-serif'
          }}>
            <strong>{structure.nameZh}</strong>
            <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>
              {structure.nameLa}
            </div>
            <div style={{ fontSize: '0.7rem', color: modelPath.includes('/by-sa/') ? '#a78bfa' : '#e8dcc8', marginTop: '0.25rem' }}>
              {modelPath.includes('/by-sa/')
                ? 'Open3D BY-SA · ligament/fascia'
                : `BodyParts3D · ${structure.id === 'calcaneal_tendon' ? 'tendon (跟腱)' : 'ligament'}`}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// Preload all GLB models
Object.values(REAL_BONE_MODELS).forEach(path => {
  useGLTF.preload(path);
});
Object.values(REAL_MUSCLE_MODELS).forEach(path => {
  useGLTF.preload(path);
});
Object.values(ADDITIONAL_MUSCLE_PARTS).flat().forEach(path => {
  useGLTF.preload(path);
});
Object.values(REAL_VESSEL_MODELS).forEach(path => {
  useGLTF.preload(path);
});
Object.values(REAL_NERVE_MODELS).forEach(path => {
  useGLTF.preload(path);
});
Object.values(REAL_LIGAMENT_MODELS).forEach(path => {
  useGLTF.preload(path);
});
