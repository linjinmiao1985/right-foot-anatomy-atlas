import { describe, it, expect } from 'vitest';
import {
  LIGAMENT_GROUPS,
  getAllLigamentGroupIds,
  structureInVisibleLigamentGroups,
} from './ligamentGroups';

describe('ligamentGroups', () => {
  it('covers nine teaching sub-groups', () => {
    expect(getAllLigamentGroupIds()).toEqual([
      'lateral_ankle',
      'deltoid',
      'subtalar',
      'plantar_arch',
      'midfoot',
      'lisfranc',
      'forefoot',
      'retinacula',
      'tendon',
    ]);
  });

  it('partitions 27 ligament/tendon ids without overlap', () => {
    const ids = LIGAMENT_GROUPS.flatMap((g) => [...g.structureIds]);
    expect(ids).toHaveLength(27);
    expect(new Set(ids).size).toBe(27);
  });

  it('filters by visible groups', () => {
    const onlyLateral = new Set(getAllLigamentGroupIds().filter((id) => id === 'lateral_ankle'));
    expect(structureInVisibleLigamentGroups('anterior_talofibular_ligament', onlyLateral)).toBe(true);
    expect(structureInVisibleLigamentGroups('calcaneal_tendon', onlyLateral)).toBe(false);
    expect(structureInVisibleLigamentGroups('interosseous_talocalcaneal_ligament', onlyLateral)).toBe(false);
  });
});
