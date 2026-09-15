import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import FootModel from './FootModel';
import CameraFocus from './CameraFocus';
import CameraPresetApply from './CameraPresetApply';
import ClipPlaneSync from './ClipPlaneSync';
import type { Layer } from '../types/anatomy';
import type { LigamentGroupId } from '../lib/ligamentGroups';
import type { NerveGroupId } from '../lib/nerveGroups';
import type { VesselGroupId } from '../lib/vesselGroups';
import type { MuscleGroupId } from '../lib/muscleGroups';
import type { LabelDensity } from '../lib/labelDensity';
import { DEFAULT_LABEL_DENSITY } from '../lib/labelDensity';
import {
  DEFAULT_CLIP_CONSTANT,
  DEFAULT_CLIP_ENABLED,
} from '../lib/clipPlane';
import {
  DEFAULT_CAMERA_PRESET,
  LEGACY_DEFAULT_POSITION,
  LEGACY_DEFAULT_TARGET,
  type CameraPresetId,
} from '../lib/cameraPresets';

interface ViewportProps {
  onMeshClick: (meshName: string) => void;
  visibleLayers: Set<Layer>;
  selectedMeshName: string | null;
  isolateMode?: boolean;
  visibleLigamentGroups?: Set<LigamentGroupId>;
  visibleNerveGroups?: Set<NerveGroupId>;
  visibleVesselGroups?: Set<VesselGroupId>;
  visibleMuscleGroups?: Set<MuscleGroupId>;
  labelDensity?: LabelDensity;
  clipEnabled?: boolean;
  clipConstant?: number;
  cameraPresetId?: CameraPresetId;
  cameraPresetToken?: number;
  /** Per-structure hide set (beyond isolate). */
  hiddenStructureIds?: Set<string>;
}

export default function Viewport({
  onMeshClick,
  visibleLayers,
  selectedMeshName,
  isolateMode = false,
  visibleLigamentGroups,
  visibleNerveGroups,
  visibleVesselGroups,
  visibleMuscleGroups,
  labelDensity = DEFAULT_LABEL_DENSITY,
  clipEnabled = DEFAULT_CLIP_ENABLED,
  clipConstant = DEFAULT_CLIP_CONSTANT,
  cameraPresetId = DEFAULT_CAMERA_PRESET,
  cameraPresetToken = 0,
  hiddenStructureIds,
}: ViewportProps) {
  return (
    <Canvas
      camera={{
        position: [...LEGACY_DEFAULT_POSITION] as [number, number, number],
        fov: 45,
      }}
      style={{ width: '100%', height: '100%', background: '#1a1a1a' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} castShadow />
      <directionalLight position={[-3, 2, -3]} intensity={0.4} />
      <pointLight position={[0, 3, 0]} intensity={0.3} color="#ffffff" />

      <Grid
        args={[10, 10]}
        cellSize={0.5}
        cellThickness={0.6}
        cellColor="#444"
        sectionColor="#777"
        fadeDistance={15}
        fadeStrength={0.8}
      />

      <Suspense fallback={null}>
        <FootModel
          visibleLayers={visibleLayers}
          onMeshClick={onMeshClick}
          selectedMeshName={selectedMeshName}
          isolateMode={isolateMode}
          visibleLigamentGroups={visibleLigamentGroups}
          visibleNerveGroups={visibleNerveGroups}
          visibleVesselGroups={visibleVesselGroups}
          visibleMuscleGroups={visibleMuscleGroups}
          labelDensity={labelDensity}
          hiddenStructureIds={hiddenStructureIds}
        />
      </Suspense>

      <CameraFocus selectedMeshName={selectedMeshName} />
      <CameraPresetApply presetId={cameraPresetId} applyToken={cameraPresetToken} />

      <ClipPlaneSync enabled={clipEnabled} constant={clipConstant} />

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={0.5}
        maxDistance={6}
        target={[...LEGACY_DEFAULT_TARGET] as [number, number, number]}
        // Allow full polar range so plantar teaching view is reachable
        maxPolarAngle={Math.PI}
      />
    </Canvas>
  );
}
