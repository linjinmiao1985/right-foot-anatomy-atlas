import { describe, it, expect } from 'vitest';
import {
  VESSEL_GROUPS,
  getAllVesselGroupIds,
  structureInVisibleVesselGroups,
} from './vesselGroups';

describe('vesselGroups', () => {
  it('covers ten teaching sub-groups', () => {
    expect(getAllVesselGroupIds()).toEqual([
      'dorsal_main',
      'dorsal_distal',
      'tarsal',
      'proximal_leg',
      'plantar_main',
      'plantar_deep',
      'plantar_distal',
      'perforators',
      'calcaneal',
      'veins',
    ]);
  });

  it('partitions 25 vessel ids without overlap', () => {
    const ids = VESSEL_GROUPS.flatMap((g) => [...g.structureIds]);
    expect(ids).toHaveLength(25);
    expect(new Set(ids).size).toBe(25);
  });

  it('filters by visible groups', () => {
    const onlyCalc = new Set(getAllVesselGroupIds().filter((id) => id === 'calcaneal'));
    expect(structureInVisibleVesselGroups('medial_calcaneal_artery', onlyCalc)).toBe(true);
    expect(structureInVisibleVesselGroups('lateral_calcaneal_artery', onlyCalc)).toBe(true);
    expect(structureInVisibleVesselGroups('dorsalis_pedis_artery', onlyCalc)).toBe(false);
    expect(structureInVisibleVesselGroups('plantar_arch', onlyCalc)).toBe(false);
  });
});
