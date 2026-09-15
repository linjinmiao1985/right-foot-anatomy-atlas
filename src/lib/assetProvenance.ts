/**
 * Asset provenance for UI source badges.
 * Mirrors FootModel.tsx REAL_* paths — keep in sync when integrating meshes.
 * UX-borrow: Open Anatomy Studio / BioLens in-product attribution habit.
 */

export type AssetLicense = 'CC-BY-4.0' | 'CC0-1.0' | 'CC-BY-SA-4.0' | 'placeholder';

export interface ProvenanceInfo {
  sourceShort: string;
  sourceFull: string;
  license: AssetLicense;
  isolatedBySa?: boolean;
}

const UM_MUSCLES = new Set([
  'abductor_hallucis',
  'flexor_digitorum_brevis',
  'abductor_digiti_minimi',
  'quadratus_plantae',
  'extensor_digitorum_brevis',
  'tibialis_posterior',
  'flexor_digitorum_longus',
  'flexor_hallucis_longus',
  'tibialis_anterior',
  'fibularis_longus',
  'extensor_digitorum_longus',
  'extensor_hallucis_longus',
]);

/** Formerly UM distal phalanges 2–5; now BP3D ISA elemental (Day 4k). */
const UM_BONES = new Set<string>([
  // empty — distal_phalanx_2–5 remapped to BP3D BP8472/9005/9261/8695
]);

const Z_ANATOMY_NERVES = new Set([
  'tibial_nerve',
  'medial_plantar_nerve',
  'lateral_plantar_nerve',
  'deep_fibular_nerve',
  'superficial_fibular_nerve',
  'sural_nerve',
]);

/** Open3DModel / AnatomyTOOL meshes isolated under by-sa/ (CC BY-SA 4.0) */
const OPEN3D_BY_SA = new Set([
  'interossei_dorsales',
  'posterior_tibial_artery',
  'fibular_artery',
]);

const BP3D: ProvenanceInfo = {
  sourceShort: 'BP3D',
  sourceFull: 'BodyParts3D (DBCLS LSDB Archive)',
  license: 'CC-BY-4.0',
};

const UM: ProvenanceInfo = {
  sourceShort: 'UM',
  sourceFull: 'Universiti Malaya Asian Male LE MSK',
  license: 'CC0-1.0',
};

const Z_ANATOMY: ProvenanceInfo = {
  sourceShort: 'Z-Anatomy',
  sourceFull: 'Z-Anatomy (nerve curves)',
  license: 'CC-BY-SA-4.0',
  isolatedBySa: true,
};

const OPEN3D: ProvenanceInfo = {
  sourceShort: 'Open3D',
  sourceFull: 'Open3DModel / AnatomyTOOL lower-limb (CC BY-SA 4.0)',
  license: 'CC-BY-SA-4.0',
  isolatedBySa: true,
};

const PLACEHOLDER: ProvenanceInfo = {
  sourceShort: '占位',
  sourceFull: 'Schematic placeholder — no open mesh yet',
  license: 'placeholder',
};

export function getStructureProvenance(
  structureId: string,
  placeholder: boolean,
  layer: string,
): ProvenanceInfo {
  if (placeholder) return PLACEHOLDER;
  if (OPEN3D_BY_SA.has(structureId)) return OPEN3D;
  if (Z_ANATOMY_NERVES.has(structureId) || layer === 'nerve') return Z_ANATOMY;
  if (UM_MUSCLES.has(structureId) || UM_BONES.has(structureId)) return UM; // UM_BONES currently empty
  return BP3D;
}

export function licenseLabel(license: AssetLicense): string {
  switch (license) {
    case 'CC-BY-4.0':
      return 'CC BY 4.0';
    case 'CC0-1.0':
      return 'CC0 1.0';
    case 'CC-BY-SA-4.0':
      return 'CC BY-SA 4.0';
    case 'placeholder':
      return '占位';
  }
}

/** Persistent footer copy — keep factual, no “complete atlas” claims. */
export const ATLAS_SOURCE_FOOTER =
  '网格来源: BodyParts3D CC BY 4.0 · UM CC0 1.0 · Z-Anatomy 神经 / Open3D DI+近端动脉 CC BY-SA 4.0（by-sa/ 隔离）';
