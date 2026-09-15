/**
 * Teaching sub-groups for the incomplete muscle layer.
 * Classic plantar layers 1–4 + dorsal intrinsics + extrinsic compartments.
 * Filter IDs only — does not claim TA2-complete muscle coverage.
 */

export type MuscleGroupId =
  | 'plantar_layer_1'
  | 'plantar_layer_2'
  | 'plantar_layer_3'
  | 'plantar_layer_4'
  | 'dorsal'
  | 'extrinsic_anterior'
  | 'extrinsic_lateral'
  | 'extrinsic_posterior';

export interface MuscleGroup {
  id: MuscleGroupId;
  labelZh: string;
  labelEn: string;
  structureIds: readonly string[];
}

export const MUSCLE_GROUPS: readonly MuscleGroup[] = [
  {
    id: 'plantar_layer_1',
    labelZh: '足底第1层',
    labelEn: 'Plantar layer 1',
    structureIds: [
      'abductor_hallucis',
      'flexor_digitorum_brevis',
      'abductor_digiti_minimi',
    ],
  },
  {
    id: 'plantar_layer_2',
    labelZh: '足底第2层',
    labelEn: 'Plantar layer 2',
    structureIds: [
      'quadratus_plantae',
      'lumbrical_1',
      'lumbrical_2',
      'lumbrical_3',
      'lumbrical_4',
    ],
  },
  {
    id: 'plantar_layer_3',
    labelZh: '足底第3层',
    labelEn: 'Plantar layer 3',
    structureIds: [
      'flexor_hallucis_brevis',
      'adductor_hallucis',
      'flexor_digiti_minimi_brevis',
      'opponens_digiti_minimi',
    ],
  },
  {
    id: 'plantar_layer_4',
    labelZh: '足底第4层',
    labelEn: 'Plantar layer 4',
    structureIds: [
      'plantar_interosseous_1',
      'plantar_interosseous_2',
      'plantar_interosseous_3',
    ],
  },
  {
    id: 'dorsal',
    labelZh: '足背固有肌',
    labelEn: 'Dorsal intrinsic',
    structureIds: [
      'extensor_digitorum_brevis',
      'extensor_hallucis_brevis',
      'interossei_dorsales',
    ],
  },
  {
    id: 'extrinsic_anterior',
    labelZh: '外在肌·前群',
    labelEn: 'Extrinsic anterior',
    structureIds: [
      'tibialis_anterior',
      'extensor_hallucis_longus',
      'extensor_digitorum_longus',
      'fibularis_tertius',
    ],
  },
  {
    id: 'extrinsic_lateral',
    labelZh: '外在肌·外侧群',
    labelEn: 'Extrinsic lateral',
    structureIds: ['fibularis_longus', 'fibularis_brevis'],
  },
  {
    id: 'extrinsic_posterior',
    labelZh: '外在肌·后群',
    labelEn: 'Extrinsic posterior',
    structureIds: [
      'tibialis_posterior',
      'flexor_digitorum_longus',
      'flexor_hallucis_longus',
      'plantaris',
    ],
  },
] as const;

export function getAllMuscleGroupIds(): MuscleGroupId[] {
  return MUSCLE_GROUPS.map((g) => g.id);
}

export function structureInVisibleMuscleGroups(
  structureId: string,
  visibleGroups: Set<MuscleGroupId>,
): boolean {
  for (const g of MUSCLE_GROUPS) {
    if (g.structureIds.includes(structureId)) {
      return visibleGroups.has(g.id);
    }
  }
  // Unknown muscle id → show if any group visible (forward-compatible)
  return visibleGroups.size > 0;
}
