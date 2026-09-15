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
  'anterior_talofibular_ligament',
  'calcaneofibular_ligament',
  'plantar_calcaneonavicular_ligament',
  'plantar_aponeurosis',
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
  '网格来源: BodyParts3D CC BY 4.0 · UM CC0 1.0 · Z-Anatomy 神经 / Open3D DI+动脉+踝韧带/足底腱膜 CC BY-SA 4.0（by-sa/ 隔离）';

/** Short panel copy about mesh fidelity — teaching honesty, not finished-product claims. */
export function getTeachingMeshNote(structureId: string, layer: string): string | null {
  if (layer === 'nerve') {
    return '网格：Z-Anatomy 曲线管（CURVE→tube），教学路径示意，非容积解剖分割；CC BY-SA 4.0，仅 by-sa/ 加载。';
  }
  if (structureId === 'dorsal_digital_arteries') {
    return '网格：BP3D FJ2072 组合体——无分趾 elemental，无法拆成独立跖背动脉。教学级组合标注，非逐趾血管图谱。';
  }
  if (structureId === 'plantar_metatarsal_arteries') {
    return '网格：BP3D FJ2096 组合体——跖底跖骨动脉未按 1–4 间隙分拆。ISA 无独立 dorsal metatarsal elemental。';
  }
  if (structureId === 'posterior_tibial_artery' || structureId === 'fibular_artery') {
    return '网格：Open3DModel lower-limb（CC BY-SA），Kabsch 对齐至 BP3D mm；by-sa/ 隔离，非主树 CC BY 主张。';
  }
  if (layer === 'vessel') {
    return '网格：BP3D 足部血管多为命名主干；末梢分支常为组合体。教学示意，非介入导航级。';
  }
  if (
    structureId === 'anterior_talofibular_ligament'
    || structureId === 'calcaneofibular_ligament'
    || structureId === 'plantar_calcaneonavicular_ligament'
    || structureId === 'plantar_aponeurosis'
  ) {
    return '网格：Open3DModel lower-limb（CC BY-SA），Kabsch→BP3D mm；by-sa/ 隔离。韧带/腱层仍不完整（无完整三角韧带/ Lisfranc 等）。';
  }
  if (structureId === 'long_plantar_ligament' || structureId === 'calcaneal_tendon') {
    return 'BP3D CC BY：跖长韧带 + 跟腱；ATFL/CFL/弹簧韧带/足底腱膜见 Open3D BY-SA。仍非完整韧带图谱。';
  }
  return null;
}

