/**
 * Teaching sub-groups for the incomplete nerve layer.
 * Filter IDs only — does not claim complete peripheral-nerve coverage.
 */

export type NerveGroupId =
  | 'tibial_trunks'
  | 'plantar_digitals'
  | 'lpn_branches'
  | 'fibular_trunks'
  | 'dorsal_cutaneous'
  | 'dorsal_digitals'
  | 'calcaneal'
  | 'sural';

export interface NerveGroup {
  id: NerveGroupId;
  labelZh: string;
  labelEn: string;
  structureIds: readonly string[];
}

export const NERVE_GROUPS: readonly NerveGroup[] = [
  {
    id: 'tibial_trunks',
    labelZh: '胫神经干',
    labelEn: 'Tibial trunks',
    structureIds: ['tibial_nerve', 'medial_plantar_nerve', 'lateral_plantar_nerve'],
  },
  {
    id: 'plantar_digitals',
    labelZh: '足底趾神经',
    labelEn: 'Plantar digitals',
    structureIds: [
      'common_plantar_digital_nerves',
      'proper_plantar_digital_nerves_medial',
      'proper_plantar_digital_nerves_lateral',
    ],
  },
  {
    id: 'lpn_branches',
    labelZh: '足底外侧分支',
    labelEn: 'LPN branches',
    structureIds: [
      'deep_branch_lateral_plantar_nerve',
      'superficial_branch_lateral_plantar_nerve',
    ],
  },
  {
    id: 'fibular_trunks',
    labelZh: '腓神经干',
    labelEn: 'Fibular trunks',
    structureIds: ['deep_fibular_nerve', 'superficial_fibular_nerve'],
  },
  {
    id: 'dorsal_cutaneous',
    labelZh: '足背皮神经',
    labelEn: 'Dorsal cutaneous',
    structureIds: ['medial_dorsal_cutaneous_nerve', 'lateral_dorsal_cutaneous_nerve'],
  },
  {
    id: 'dorsal_digitals',
    labelZh: '足背趾神经',
    labelEn: 'Dorsal digitals',
    structureIds: ['dorsal_digital_superficial_fibular', 'dorsal_digital_deep_fibular'],
  },
  {
    id: 'calcaneal',
    labelZh: '跟支',
    labelEn: 'Calcaneal',
    structureIds: ['medial_calcaneal_branches', 'lateral_calcaneal_nerves'],
  },
  {
    id: 'sural',
    labelZh: '腓肠神经',
    labelEn: 'Sural',
    structureIds: ['sural_nerve'],
  },
] as const;

export function getAllNerveGroupIds(): NerveGroupId[] {
  return NERVE_GROUPS.map((g) => g.id);
}

export function structureInVisibleNerveGroups(
  structureId: string,
  visibleGroups: Set<NerveGroupId>,
): boolean {
  for (const g of NERVE_GROUPS) {
    if (g.structureIds.includes(structureId)) {
      return visibleGroups.has(g.id);
    }
  }
  // Unknown nerve id → show if any group visible (forward-compatible)
  return visibleGroups.size > 0;
}
