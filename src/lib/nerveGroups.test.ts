import { describe, it, expect } from 'vitest';
import {
  NERVE_GROUPS,
  getAllNerveGroupIds,
  structureInVisibleNerveGroups,
} from './nerveGroups';

describe('nerveGroups', () => {
  it('covers eight teaching sub-groups', () => {
    expect(getAllNerveGroupIds()).toEqual([
      'tibial_trunks',
      'plantar_digitals',
      'lpn_branches',
      'fibular_trunks',
      'dorsal_cutaneous',
      'dorsal_digitals',
      'calcaneal',
      'sural',
    ]);
  });

  it('partitions 17 nerve ids without overlap', () => {
    const ids = NERVE_GROUPS.flatMap((g) => [...g.structureIds]);
    expect(ids).toHaveLength(17);
    expect(new Set(ids).size).toBe(17);
  });

  it('filters by visible groups', () => {
    const onlyDorsal = new Set(getAllNerveGroupIds().filter((id) => id === 'dorsal_digitals'));
    expect(structureInVisibleNerveGroups('dorsal_digital_deep_fibular', onlyDorsal)).toBe(true);
    expect(structureInVisibleNerveGroups('dorsal_digital_superficial_fibular', onlyDorsal)).toBe(true);
    expect(structureInVisibleNerveGroups('tibial_nerve', onlyDorsal)).toBe(false);
    expect(structureInVisibleNerveGroups('sural_nerve', onlyDorsal)).toBe(false);
  });
});
