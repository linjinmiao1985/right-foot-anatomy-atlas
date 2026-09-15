/**
 * Teaching sub-groups for the incomplete vessel layer.
 * Filter IDs only — does not claim complete arterial coverage or per-ray MTAs.
 */

export type VesselGroupId =
  | 'dorsal_main'
  | 'dorsal_distal'
  | 'tarsal'
  | 'proximal_leg'
  | 'plantar_main'
  | 'plantar_deep'
  | 'plantar_distal'
  | 'perforators'
  | 'calcaneal'
  | 'veins';

export interface VesselGroup {
  id: VesselGroupId;
  labelZh: string;
  labelEn: string;
  structureIds: readonly string[];
}

export const VESSEL_GROUPS: readonly VesselGroup[] = [
  {
    id: 'dorsal_main',
    labelZh: '足背主干',
    labelEn: 'Dorsal main',
    structureIds: ['dorsalis_pedis_artery', 'arcuate_artery'],
  },
  {
    id: 'dorsal_distal',
    labelZh: '足背远端（分组）',
    labelEn: 'Dorsal distal (grouped)',
    structureIds: ['dorsal_digital_arteries', 'dorsal_metatarsal_arteries'],
  },
  {
    id: 'tarsal',
    labelZh: '跗动脉',
    labelEn: 'Tarsal',
    structureIds: ['lateral_tarsal_artery', 'medial_tarsal_arteries'],
  },
  {
    id: 'proximal_leg',
    labelZh: '小腿近端',
    labelEn: 'Proximal leg',
    structureIds: ['posterior_tibial_artery', 'anterior_tibial_artery', 'fibular_artery'],
  },
  {
    id: 'plantar_main',
    labelZh: '足底主干',
    labelEn: 'Plantar main',
    structureIds: ['plantar_artery_medial', 'plantar_artery_lateral', 'plantar_arch'],
  },
  {
    id: 'plantar_deep',
    labelZh: '足底深支/深弓',
    labelEn: 'Plantar deep',
    structureIds: [
      'deep_plantar_artery',
      'deep_plantar_arch',
      'deep_branch_medial_plantar_artery',
      'superficial_branch_medial_plantar_artery',
    ],
  },
  {
    id: 'plantar_distal',
    labelZh: '足底远端（分组）',
    labelEn: 'Plantar distal (grouped)',
    structureIds: ['plantar_metatarsal_arteries', 'common_plantar_digital_arteries', 'proper_plantar_digital_arteries'],
  },
  {
    id: 'perforators',
    labelZh: '穿支吻合',
    labelEn: 'Perforators',
    structureIds: ['perforating_arcuate_deep_plantar'],
  },
  {
    id: 'calcaneal',
    labelZh: '跟支动脉',
    labelEn: 'Calcaneal',
    structureIds: ['medial_calcaneal_artery', 'lateral_calcaneal_artery'],
  },
  {
    id: 'veins',
    labelZh: '足静脉（示意）',
    labelEn: 'Veins (schematic)',
    structureIds: ['dorsal_venous_arch', 'plantar_venous_arch', 'plantar_digital_veins'],
  },
] as const;

export function getAllVesselGroupIds(): VesselGroupId[] {
  return VESSEL_GROUPS.map((g) => g.id);
}

export function structureInVisibleVesselGroups(
  structureId: string,
  visibleGroups: Set<VesselGroupId>,
): boolean {
  for (const g of VESSEL_GROUPS) {
    if (g.structureIds.includes(structureId)) {
      return visibleGroups.has(g.id);
    }
  }
  // Unknown vessel id → show if any group visible (forward-compatible)
  return visibleGroups.size > 0;
}
