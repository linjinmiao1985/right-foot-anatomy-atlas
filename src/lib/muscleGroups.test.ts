import { describe, it, expect } from 'vitest';
import structures from '../data/structures.json';
import {
  MUSCLE_GROUPS,
  getAllMuscleGroupIds,
  structureInVisibleMuscleGroups,
} from './muscleGroups';

describe('muscleGroups', () => {
  it('covers eight teaching sub-groups', () => {
    expect(getAllMuscleGroupIds()).toEqual([
      'plantar_layer_1',
      'plantar_layer_2',
      'plantar_layer_3',
      'plantar_layer_4',
      'dorsal',
      'extrinsic_anterior',
      'extrinsic_lateral',
      'extrinsic_posterior',
    ]);
  });

  it('partitions all 28 muscle ids without overlap', () => {
    const ids = MUSCLE_GROUPS.flatMap((g) => [...g.structureIds]);
    expect(ids).toHaveLength(28);
    expect(new Set(ids).size).toBe(28);
    const muscleIds = structures.filter((s) => s.layer === 'muscle').map((s) => s.id);
    expect(muscleIds).toHaveLength(28);
    expect(new Set(ids)).toEqual(new Set(muscleIds));
  });

  it('filters by visible groups', () => {
    const onlyL1 = new Set(getAllMuscleGroupIds().filter((id) => id === 'plantar_layer_1'));
    expect(structureInVisibleMuscleGroups('abductor_hallucis', onlyL1)).toBe(true);
    expect(structureInVisibleMuscleGroups('flexor_digitorum_brevis', onlyL1)).toBe(true);
    expect(structureInVisibleMuscleGroups('tibialis_anterior', onlyL1)).toBe(false);
    expect(structureInVisibleMuscleGroups('interossei_dorsales', onlyL1)).toBe(false);

    const onlyAnt = new Set(getAllMuscleGroupIds().filter((id) => id === 'extrinsic_anterior'));
    expect(structureInVisibleMuscleGroups('fibularis_tertius', onlyAnt)).toBe(true);
    expect(structureInVisibleMuscleGroups('fibularis_longus', onlyAnt)).toBe(false);
  });
});
