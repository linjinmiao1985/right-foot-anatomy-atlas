import { describe, it, expect } from 'vitest';
import {
  LIGAMENT_GROUPS,
  getAllLigamentGroupIds,
  structureInVisibleLigamentGroups,
} from './ligamentGroups';

describe('ligamentGroups', () => {
  it('covers all six teaching sub-groups', () => {
    expect(getAllLigamentGroupIds()).toEqual([
      'lateral_ankle',
      'deltoid',
      'plantar_arch',
      'lisfranc',
      'retinacula',
      'tendon',
    ]);
  });

  it('partitions 21 ligament/tendon ids without overlap', () => {
    const ids = LIGAMENT_GROUPS.flatMap((g) => [...g.structureIds]);
    expect(ids).toHaveLength(21);
    expect(new Set(ids).size).toBe(21);
  });

  it('filters by visible groups', () => {
    const onlyLateral = new Set(getAllLigamentGroupIds().filter((id) => id === 'lateral_ankle'));
    expect(structureInVisibleLigamentGroups('anterior_talofibular_ligament', onlyLateral)).toBe(true);
    expect(structureInVisibleLigamentGroups('calcaneal_tendon', onlyLateral)).toBe(false);
  });
});
