import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Teaching polish: click-to-focus camera on selected mesh AABB.
 * UX-borrow (ideas only): Open Anatomy Studio / BioLens selection framing.
 * Fits OrbitControls target to box center; pulls camera to a teaching distance.
 */
interface CameraFocusProps {
  selectedMeshName: string | null;
}

const DEFAULT_TARGET = new THREE.Vector3(0, 0.15, 0);
const DEFAULT_POS = new THREE.Vector3(1.2, 0.8, 1.5);

export default function CameraFocus({ selectedMeshName }: CameraFocusProps) {
  const { scene, camera, controls } = useThree();
  const lastFocused = useRef<string | null>(null);

  useEffect(() => {
    const orbit = controls as unknown as {
      target: THREE.Vector3;
      update: () => void;
      minDistance?: number;
      maxDistance?: number;
    } | null;

    if (!selectedMeshName) {
      lastFocused.current = null;
      return;
    }
    if (lastFocused.current === selectedMeshName) return;

    // Prefer exact name, then any object whose name contains the mesh key
    let obj: THREE.Object3D | undefined;
    scene.traverse((node) => {
      if (obj) return;
      if (node.name === selectedMeshName) obj = node;
    });
    if (!obj) {
      scene.traverse((node) => {
        if (obj) return;
        if (node.name && selectedMeshName && node.name.includes(selectedMeshName)) {
          obj = node;
        }
      });
    }
    if (!obj) return;

    const box = new THREE.Box3().setFromObject(obj);
    if (box.isEmpty()) return;

    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    const radius = Math.max(size.x, size.y, size.z, 0.02) * 0.5;
    // Foot meshes are scaled ~0.01 from mm; keep a readable teaching framing
    const distance = Math.max(radius * 4.5, 0.35);

    if (orbit?.target) {
      orbit.target.copy(center);
      const dir = camera.position.clone().sub(orbit.target);
      if (dir.lengthSq() < 1e-6) dir.set(1, 0.6, 1);
      dir.normalize();
      camera.position.copy(center.clone().add(dir.multiplyScalar(distance)));
      orbit.update?.();
    } else {
      camera.position.copy(DEFAULT_POS);
      camera.lookAt(DEFAULT_TARGET);
    }

    lastFocused.current = selectedMeshName;
  }, [selectedMeshName, scene, camera, controls]);

  return null;
}
