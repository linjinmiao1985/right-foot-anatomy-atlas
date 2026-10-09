import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { Material, Mesh } from 'three';
import { buildSagittalPlane } from '../lib/clipPlane';

interface ClipPlaneSyncProps {
  enabled: boolean;
  constant: number;
}

/**
 * Enables renderer local clipping and syncs a single sagittal Plane onto
 * scene mesh materials. Scene-traverse approach avoids editing every
 * FootModel material path (least-risk lite pass).
 *
 * UX-borrow (ideas only): Open Anatomy Studio clipping; Visible Human /
 * CT Education Skill cross-section habit — no third-party code copied.
 */
export default function ClipPlaneSync({ enabled, constant }: ClipPlaneSyncProps) {
  const { gl, scene } = useThree();
  const plane = useMemo(() => buildSagittalPlane(constant), [constant]);
  // Keep a stable array identity while pointing at the mutable Plane
  const planes = useMemo(() => [plane], [plane]);
  const wasEnabled = useRef(false);

  useEffect(() => {
    gl.localClippingEnabled = enabled;
    return () => {
      gl.localClippingEnabled = false;
    };
  }, [gl, enabled]);

  useEffect(() => {
    buildSagittalPlane(constant, plane);
  }, [constant, plane]);

  useFrame(() => {
    buildSagittalPlane(constant, plane);
    const activePlanes = enabled ? planes : [];

    scene.traverse((obj) => {
      const mesh = obj as Mesh;
      if (!mesh.isMesh || !mesh.material) return;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const mat of mats) {
        if (!mat) continue;
        const m = mat as Material;
        m.clippingPlanes = activePlanes;
        m.clipShadows = enabled;
        if (enabled || wasEnabled.current) {
          m.needsUpdate = true;
        }
      }
    });

    wasEnabled.current = enabled;
  });

  return null;
}
