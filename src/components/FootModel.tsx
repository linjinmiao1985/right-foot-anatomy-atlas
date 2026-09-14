import { useEffect, useState } from 'react';
import { Html } from '@react-three/drei';
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
        position = [0.3 + muscleIndex * 0.15, 0.15, 0];
        size = [0.08, 0.2, 0.08];
        muscleIndex++;
      } else if (structure.layer === 'nerve') {
        position = [-0.3 + nerveIndex * 0.15, 0.05, -0.4];
        size = [0.02, 0.3, 0.02];
        nerveIndex++;
      } else {
        position = [0.3 + vesselIndex * 0.15, 0.05, -0.4];
        size = [0.025, 0.3, 0.025];
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

        return (
          <group key={meshName}>
            <mesh
              name={meshName}
              position={position}
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
            {structure.layer === 'nerve' || structure.layer === 'vessel' ? (
              <cylinderGeometry args={[size[0], size[1], size[2], 8]} />
            ) : (
              <boxGeometry args={size} />
            )}
              <meshStandardMaterial
                color={color}
                emissive={isSelected ? '#00ffff' : (isHovered ? '#ffffff' : '#000000')}
                emissiveIntensity={isSelected ? 0.6 : (isHovered ? 0.3 : 0)}
                opacity={isHovered && !isSelected ? 0.9 : 1}
                transparent={isHovered && !isSelected}
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
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}
