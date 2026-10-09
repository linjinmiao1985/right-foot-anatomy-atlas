import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import type { CameraPresetId } from '../lib/cameraPresets';
import { getCameraPreset } from '../lib/cameraPresets';

/**
 * Applies a teaching camera preset to the default OrbitControls.
 * `applyToken` increments on each user click so re-selecting the same
 * preset re-frames after free orbit.
 */
interface CameraPresetApplyProps {
  presetId: CameraPresetId;
  applyToken: number;
}

export default function CameraPresetApply({ presetId, applyToken }: CameraPresetApplyProps) {
  const { camera, controls } = useThree();

  useEffect(() => {
    const preset = getCameraPreset(presetId);
    const orbit = controls as unknown as {
      target: { set: (x: number, y: number, z: number) => void };
      update?: () => void;
    } | null;

    camera.position.set(preset.position[0], preset.position[1], preset.position[2]);
    if (orbit?.target) {
      orbit.target.set(preset.target[0], preset.target[1], preset.target[2]);
      orbit.update?.();
    } else {
      camera.lookAt(preset.target[0], preset.target[1], preset.target[2]);
    }
  }, [presetId, applyToken, camera, controls]);

  return null;
}
