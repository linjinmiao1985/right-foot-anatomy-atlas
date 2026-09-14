import { useEffect, useState } from 'react';
import { Html, useGLTF } from '@react-three/drei';
import { getAllStructures } from '../lib/structureLookup';
import { LAYER_CONFIG } from '../lib/layers';
import type { Layer } from '../types/anatomy';
import type { AnatomyStructure } from '../types/anatomy';

interface FootModelProps {
  visibleLayers: Set<Layer>;
  onMeshClick: (meshName: string) => void;
  selectedMeshName: string | null;
}

interface PlaceholderMesh {
  structure: AnatomyStructure;
  meshName: string;
  position: [number, number, number];
  size: [number, number, number];
}

// Real bone GLB models - ALL 14 right foot bones from BodyParts3D (CC BY 4.0)
const REAL_BONE_MODELS: Record<string, string> = {
  'calcaneus': '/models/right-foot/calcaneus_BP9040.glb',
  'talus': '/models/right-foot/talus_BP8033.glb',
  'navicular': '/models/right-foot/navicular_BP9133.glb',
  'cuboid': '/models/right-foot/cuboid_BP8533.glb',
  'cuneiform_medial': '/models/right-foot/cuneiform_medial_BP8774.glb',
  'cuneiform_intermediate': '/models/right-foot/cuneiform_intermediate_BP9205.glb',
  'cuneiform_lateral': '/models/right-foot/cuneiform_lateral_BP8472.glb',
  'metatarsal_1': '/models/right-foot/metatarsal_1_BP8230.glb',
  'metatarsal_2': '/models/right-foot/metatarsal_2_BP8627.glb',
  'metatarsal_3': '/models/right-foot/metatarsal_3_BP8802.glb',
  'metatarsal_4': '/models/right-foot/metatarsal_4_BP9130.glb',
  'metatarsal_5': '/models/right-foot/metatarsal_5_BP7912.glb',
  'proximal_phalanx_1': '/models/right-foot/phalanx_prox_1_BP8488.glb',
  'distal_phalanx_1': '/models/right-foot/distal_phalanx_1_BP9282.glb',
};

// Real muscle GLB models - 17 right foot muscles (BP3D 12 + UM CC0 5)
const REAL_MUSCLE_MODELS: Record<string, string> = {
  // UM CC0 (5): Higher resolution or BP3D gaps
  'abductor_hallucis': '/models/right-foot/abductor_hallucis.glb', // UM (8.7x BP3D)
  'flexor_digitorum_brevis': '/models/right-foot/flexor_digitorum_brevis.glb', // UM (2.4x BP3D)
  'abductor_digiti_minimi': '/models/right-foot/abductor_digiti_minimi.glb', // UM (4.5x BP3D)
  'quadratus_plantae': '/models/right-foot/quadratus_plantae.glb', // UM (BP3D gap)
  'extensor_digitorum_brevis': '/models/right-foot/extensor_digitorum_brevis.glb', // UM (BP3D gap)
  
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
};

// Additional muscle heads as separate meshes
const ADDITIONAL_MUSCLE_PARTS: Record<string, string[]> = {
  'adductor_hallucis': [
    '/models/right-foot/adductor_hallucis_transverse.glb',
  ],
};

// Real vessel GLB models - 5 right foot arteries from BodyParts3D (CC BY 4.0)
const REAL_VESSEL_MODELS: Record<string, string> = {
  'dorsalis_pedis_artery': '/models/right-foot/dorsalis_pedis_artery.glb',
  'plantar_artery_medial': '/models/right-foot/medial_plantar_artery.glb',
  'plantar_artery_lateral': '/models/right-foot/lateral_plantar_artery.glb',
  'plantar_arch': '/models/right-foot/plantar_arch.glb',
  'arcuate_artery': '/models/right-foot/arcuate_artery.glb',
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

export default function FootModel({ visibleLayers, onMeshClick, selectedMeshName }: FootModelProps) {
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

        const color = LAYER_CONFIG[structure.layer].color;
        const isSelected = meshName === selectedMeshName;
        const isHovered = meshName === hoveredMesh;
        
        // Check if this structure has a real GLB model
        const hasRealBone = structure.layer === 'bone' && REAL_BONE_MODELS[structure.id];
        const hasRealMuscle = structure.layer === 'muscle' && REAL_MUSCLE_MODELS[structure.id];
        const hasRealVessel = structure.layer === 'vessel' && REAL_VESSEL_MODELS[structure.id];
        const hasRealNerve = structure.layer === 'nerve' && REAL_NERVE_MODELS[structure.id];

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
            <div style={{ fontSize: '0.7rem', color: '#ff8800', marginTop: '0.25rem' }}>
              BodyParts3D
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
  onMeshClick,
  onHoverChange,
}: RealVesselModelProps) {
  const { scene } = useGLTF(modelPath);
  
  const clonedScene = scene.clone();
  
  // Apply vessel-specific materials (slightly translucent red)
  useEffect(() => {
    clonedScene.traverse((node) => {
      if ((node as any).isMesh) {
        const mesh = node as any;
        mesh.material = mesh.material.clone();
        mesh.material.color.set(color);
        mesh.material.emissive.set(isSelected ? '#ff0000' : (isHovered ? '#ff6666' : '#330000'));
        mesh.material.emissiveIntensity = isSelected ? 0.3 : (isHovered ? 0.2 : 0.1);
        mesh.material.transparent = true;
        mesh.material.opacity = 0.8;
        mesh.material.metalness = 0.2;
        mesh.material.needsUpdate = true;
      }
    });
  }, [clonedScene, color, isSelected, isHovered]);
  
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
            <div style={{ fontSize: '0.7rem', color: '#ff3333', marginTop: '0.25rem' }}>
              BodyParts3D
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
  onMeshClick,
  onHoverChange,
}: RealNerveModelProps) {
  const { scene } = useGLTF(modelPath);
  
  const clonedScene = scene.clone();
  
  // Apply nerve-specific materials (yellow, slightly emissive)
  useEffect(() => {
    clonedScene.traverse((node) => {
      if ((node as any).isMesh) {
        const mesh = node as any;
        mesh.material = mesh.material.clone();
        mesh.material.color.set(color);
        mesh.material.emissive.set(isSelected ? '#ffff00' : (isHovered ? '#ffff66' : '#666600'));
        mesh.material.emissiveIntensity = isSelected ? 0.5 : (isHovered ? 0.3 : 0.2);
        mesh.material.transparent = false;
        mesh.material.metalness = 0.1;
        mesh.material.roughness = 0.8;
        mesh.material.needsUpdate = true;
      }
    });
  }, [clonedScene, color, isSelected, isHovered]);
  
  return (
    <group
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
