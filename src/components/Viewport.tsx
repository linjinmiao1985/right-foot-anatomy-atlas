import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import FootModel from './FootModel';
import type { Layer } from '../types/anatomy';

interface ViewportProps {
  onMeshClick: (meshName: string) => void;
  visibleLayers: Set<Layer>;
  selectedMeshName: string | null;
}

export default function Viewport({ onMeshClick, visibleLayers, selectedMeshName }: ViewportProps) {
  return (
    <Canvas
      camera={{ position: [1.5, 1, 1.5], fov: 50 }}
      style={{ width: '100%', height: '100%', background: '#1a1a1a' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} />

      <Grid args={[10, 10]} cellSize={0.5} cellThickness={0.5} cellColor="#444" sectionColor="#666" fadeDistance={15} />

      <FootModel visibleLayers={visibleLayers} onMeshClick={onMeshClick} selectedMeshName={selectedMeshName} />

      <OrbitControls enableDamping dampingFactor={0.05} minDistance={0.5} maxDistance={5} />
    </Canvas>
  );
}
