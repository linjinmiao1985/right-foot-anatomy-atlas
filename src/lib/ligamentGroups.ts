/**
 * Teaching sub-groups for the incomplete ligament/tendon layer.
 * Filter IDs only — does not claim complete anatomical coverage.
 */

export type LigamentGroupId =
  | 'lateral_ankle'
  | 'deltoid'
  | 'plantar_arch'
  | 'lisfranc'
  | 'retinacula'
  | 'tendon';

export interface LigamentGroup {
  id: LigamentGroupId;
  labelZh: string;
  labelEn: string;
  structureIds: readonly string[];
}

export const LIGAMENT_GROUPS: readonly LigamentGroup[] = [
  {
    id: 'lateral_ankle',
    labelZh: '外侧踝',
    labelEn: 'Lateral ankle',
    structureIds: [
      'anterior_talofibular_ligament',
      'calcaneofibular_ligament',
      'posterior_talofibular_ligament',
    ],
  },
  {
    id: 'deltoid',
    labelZh: '三角韧带',
    labelEn: 'Deltoid',
    structureIds: [
      'tibionavicular_ligament',
      'tibiocalcaneal_ligament',
      'posterior_tibiotalar_ligament',
      'anterior_tibiotalar_ligament',
    ],
  },
  {
    id: 'plantar_arch',
    labelZh: '足底/足弓',
    labelEn: 'Plantar / arch',
    structureIds: [
      'long_plantar_ligament',
      'plantar_calcaneocuboid_ligament',
      'plantar_calcaneonavicular_ligament',
      'plantar_aponeurosis',
      'bifurcate_ligament',
    ],
  },
  {
    id: 'lisfranc',
    labelZh: 'Lisfranc/TMT',
    labelEn: 'Lisfranc / TMT',
    structureIds: [
      'cuneometatarsal_interosseous_ligaments',
      'dorsal_tarsometatarsal_ligaments',
      'plantar_tarsometatarsal_ligaments',
    ],
  },
  {
    id: 'retinacula',
    labelZh: '支持带',
    labelEn: 'Retinacula',
    structureIds: [
      'flexor_retinaculum_of_ankle',
      'superior_extensor_retinaculum',
      'inferior_extensor_retinaculum',
      'superior_fibular_retinaculum',
      'inferior_fibular_retinaculum',
    ],
  },
  {
    id: 'tendon',
    labelZh: '肌腱',
    labelEn: 'Tendon',
    structureIds: ['calcaneal_tendon'],
  },
] as const;

export function getAllLigamentGroupIds(): LigamentGroupId[] {
  return LIGAMENT_GROUPS.map((g) => g.id);
}

export function structureInVisibleLigamentGroups(
  structureId: string,
  visibleGroups: Set<LigamentGroupId>,
): boolean {
  for (const g of LIGAMENT_GROUPS) {
    if (g.structureIds.includes(structureId)) {
      return visibleGroups.has(g.id);
    }
  }
  // Unknown ligament id → show if any group visible (forward-compatible)
  return visibleGroups.size > 0;
}
