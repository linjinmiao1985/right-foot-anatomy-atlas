import type { Intersection, Object3D } from 'three';

export function getMeshNameFromIntersection(intersection: Intersection): string | null {
  let obj: Object3D | null = intersection.object;
  
  while (obj) {
    if (obj.name && obj.name !== 'Scene' && obj.name !== '') {
      return obj.name;
    }
    obj = obj.parent;
  }
  
  return null;
}
