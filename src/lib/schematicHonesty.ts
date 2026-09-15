/**
 * Schematic-vs-source honesty (OMFAtlas UX-borrow, learning-log #58).
 *
 * When a selected structure is ShareAlike-isolated, grouped teaching mesh,
 * multi-part ADDITIONAL composite, literal placeholder, or pathway-schematic
 * (placeholder-adjacent CURVE tubes), surface a compact badge + short teaching
 * disclaimer. Not a finished-product claim.
 */

import { getStructureProvenance } from './assetProvenance';
import { getOntologyIds } from './ontologyIds';

export type HonestyKind =
  | 'by-sa'
  | 'grouped'
  | 'additional-part'
  | 'placeholder'
  | 'pathway-schematic';

export interface HonestyBadge {
  kind: HonestyKind;
  /** Compact chip text (ZH · EN short) */
  label: string;
  /** Native title / tooltip */
  title: string;
}

export interface SchematicHonesty {
  kinds: HonestyKind[];
  badges: HonestyBadge[];
  /** Short bilingual teaching disclaimer (single paragraph). */
  disclaimer: string;
  show: boolean;
}

/** Structures that load ≥1 ADDITIONAL mesh part (see FootModel ADDITIONAL_MUSCLE_PARTS). */
export const ADDITIONAL_PART_IDS = new Set([
  'adductor_hallucis',
  'flexor_hallucis_brevis',
  'interossei_dorsales',
]);

/** ZA trunk nerves: CURVE→tube pathway schematic (placeholder-adjacent teaching geometry). */
export const PATHWAY_SCHEMATIC_NERVE_IDS = new Set([
  'tibial_nerve',
  'medial_plantar_nerve',
  'lateral_plantar_nerve',
  'deep_fibular_nerve',
  'superficial_fibular_nerve',
  'sural_nerve',
]);

const BADGE_META: Record<HonestyKind, Omit<HonestyBadge, 'kind'>> = {
  'by-sa': {
    label: 'BY-SA · 隔离',
    title: 'CC BY-SA ShareAlike isolate (by-sa/) — not main-tree CC BY/CC0',
  },
  grouped: {
    label: '组合 · Grouped',
    title: 'Grouped teaching mesh — not per-ray / per-toe elemental split',
  },
  'additional-part': {
    label: '附加件 · ADDITIONAL',
    title: 'Multi-part structure: primary mesh + ADDITIONAL part(s) (may mix licenses)',
  },
  placeholder: {
    label: '占位 · Schematic',
    title: 'Schematic placeholder — no open segmented mesh yet',
  },
  'pathway-schematic': {
    label: '路径示意 · Pathway',
    title: 'Pathway schematic (CURVE→tube) — teaching course, not volumetric segmentation',
  },
};

function isGrouped(structureId: string): boolean {
  const ont = getOntologyIds(structureId);
  if (ont?.note && /grouped/i.test(ont.note)) return true;
  return false;
}

/**
 * Classify schematic-vs-source honesty for the selected structure.
 * Small, pure, UI-agnostic — StructurePanel / footer consume the result.
 */
export function getSchematicHonesty(
  structureId: string,
  placeholder: boolean,
  layer: string,
): SchematicHonesty {
  const kinds: HonestyKind[] = [];
  const provenance = getStructureProvenance(structureId, placeholder, layer);

  if (placeholder) kinds.push('placeholder');
  if (provenance.isolatedBySa) kinds.push('by-sa');
  if (isGrouped(structureId)) kinds.push('grouped');
  if (ADDITIONAL_PART_IDS.has(structureId)) kinds.push('additional-part');
  // Pathway schematic only when not already a literal placeholder
  if (!placeholder && PATHWAY_SCHEMATIC_NERVE_IDS.has(structureId)) {
    kinds.push('pathway-schematic');
  }

  const badges = kinds.map((kind) => ({ kind, ...BADGE_META[kind] }));

  let disclaimer = '';
  if (kinds.length > 0) {
    const bits: string[] = [];
    if (kinds.includes('placeholder')) {
      bits.push('占位示意几何，非开源分割网格');
    }
    if (kinds.includes('pathway-schematic')) {
      bits.push('路径示意（CURVE→tube），非容积解剖分割');
    }
    if (kinds.includes('by-sa')) {
      bits.push('ShareAlike 隔离（by-sa/），非主树 CC BY/CC0 主张');
    }
    if (kinds.includes('grouped')) {
      bits.push('组合教学网格，非逐支/逐趾 elemental');
    }
    if (kinds.includes('additional-part')) {
      bits.push('含 ADDITIONAL 附加件（可能混合许可）');
    }
    disclaimer =
      `示意≠来源 · Schematic ≠ source: ${bits.join('；')}。教学用，非临床导航 / 非完整图谱。`;
  }

  return {
    kinds,
    badges,
    disclaimer,
    show: kinds.length > 0,
  };
}
