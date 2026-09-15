/**
 * Optional ontology IDs for StructurePanel (TA2 / FMA / BodyParts3D BP).
 *
 * Honesty rules:
 * - Only include codes we can cite from project sources below.
 * - Omit unknown fields — UI shows nothing for that scheme (no invented IDs).
 * - Grouped / approximate codes may set `note` (e.g. "grouped", "approx").
 *
 * Sources (document, do not invent):
 * - TA2: Latin IDs embedded in `structures.json` summaryZh where authored;
 *   cross-check habit vs Terminologia Anatomica 2 / TA2Viewer
 *   (https://ta2viewer.openanatomy.org/, https://fipat.library.dal.ca/TA2/).
 * - FMA: `docs/terminology.md` osteology table (Foundational Model of Anatomy).
 * - BP: BodyParts3D ISA concept IDs from wired GLB filenames / comments in
 *   `FootModel.tsx` and mesh summaries (e.g. BP9040, BP6049 grouped).
 *
 * This is a teaching aid map — not a claim of TA2-complete soft-tissue coverage.
 */

export interface StructureOntologyIds {
  /** Terminologia Anatomica 2 code, e.g. A02.5.10.001 */
  ta2?: string;
  /** Foundational Model of Anatomy ID digits, e.g. 24496 (display as FMA24496) */
  fma?: string;
  /** BodyParts3D concept ID, e.g. BP9040 */
  bp?: string;
  /** Short honesty note when code is grouped / approximate / partial */
  note?: string;
}

/**
 * Sparse lookup: structure id → known codes only.
 * Structures absent from this map → panel shows no ontology block (honest empty).
 */
export const ONTOLOGY_BY_ID: Readonly<Record<string, StructureOntologyIds>> = {
  // —— Osteology (TA2 from structures.json; FMA from docs/terminology.md; BP from FootModel GLB names) ——
  calcaneus: { ta2: 'A02.5.10.001', fma: '24496', bp: 'BP9040' },
  talus: { ta2: 'A02.5.10.002', fma: '9708', bp: 'BP8033' },
  navicular: { ta2: 'A02.5.11.001', fma: '24500', bp: 'BP9133' },
  cuboid: { ta2: 'A02.5.12.001', fma: '24497', bp: 'BP8873' },
  cuneiform_medial: { ta2: 'A02.5.13.001', fma: '24501', bp: 'BP8830' },
  cuneiform_intermediate: { ta2: 'A02.5.13.002', fma: '24502', bp: 'BP9110' },
  cuneiform_lateral: { ta2: 'A02.5.13.003', fma: '24503', bp: 'BP8730' },
  metatarsal_1: { ta2: 'A02.5.16.001', fma: '24492', bp: 'BP8230' },
  metatarsal_2: { ta2: 'A02.5.16.002', fma: '24493', bp: 'BP8627' },
  metatarsal_3: { ta2: 'A02.5.16.003', fma: '24494', bp: 'BP8802' },
  metatarsal_4: { ta2: 'A02.5.16.004', fma: '24495', bp: 'BP9130' },
  metatarsal_5: { ta2: 'A02.5.16.005', fma: '24491', bp: 'BP7912' },
  proximal_phalanx_1: { ta2: 'A02.5.17.001', fma: '32951', bp: 'BP8785' },
  distal_phalanx_1: { ta2: 'A02.5.17.002', fma: '32952', bp: 'BP9282' },
  proximal_phalanx_2: { ta2: 'A02.5.17.002' },
  proximal_phalanx_3: { ta2: 'A02.5.18.002' },
  proximal_phalanx_4: { ta2: 'A02.5.19.002' },
  proximal_phalanx_5: { ta2: 'A02.5.20.002' },
  middle_phalanx_2: { ta2: 'A02.5.17.003' },
  middle_phalanx_3: { ta2: 'A02.5.18.003' },
  middle_phalanx_4: { ta2: 'A02.5.19.003' },
  distal_phalanx_2: { ta2: 'A02.5.17.004', bp: 'BP8472' },
  distal_phalanx_3: { ta2: 'A02.5.18.004', bp: 'BP9005' },
  distal_phalanx_4: { ta2: 'A02.5.19.004', bp: 'BP9261' },
  distal_phalanx_5: { ta2: 'A02.5.20.003', bp: 'BP8695' },
  sesamoid_bones: { ta2: 'A02.5.17.001', bp: 'BP8756', note: 'grouped hallux sesamoids' },

  // —— Muscles (TA2 from structures.json summaries where authored) ——
  tibialis_anterior: { ta2: 'A04.7.02.037' },
  extensor_hallucis_longus: { ta2: 'A04.7.02.039' },
  extensor_digitorum_longus: { ta2: 'A04.7.02.040' },
  fibularis_longus: { ta2: 'A04.7.02.041' },
  fibularis_brevis: { ta2: 'A04.7.02.042' },
  fibularis_tertius: { ta2: 'A04.7.02.043' },
  plantar_interosseous_1: { ta2: 'A04.7.02.067' },
  plantar_interosseous_2: { ta2: 'A04.7.02.069' },
  plantar_interosseous_3: { ta2: 'A04.7.02.071' },

  // —— Vessels (TA2 + BP where authored in summaries / FootModel) ——
  dorsal_digital_arteries: {
    ta2: 'A12.2.16.064',
    bp: 'BP6049',
    note: 'grouped mesh',
  },
  plantar_metatarsal_arteries: {
    ta2: 'A12.2.16.068',
    bp: 'BP6060',
    note: 'grouped mesh',
  },
  plantar_artery_medial: { ta2: 'A12.2.16.065' },
  plantar_artery_lateral: { ta2: 'A12.2.16.069' },
  // dorsalis pedis BP cited in methods extraction example
  dorsalis_pedis_artery: { bp: 'BP6027' },

  // —— Ligament / tendon (TA2 approx from summaries; BP from GLB names) ——
  long_plantar_ligament: { ta2: 'A03.6.10.517', bp: 'BP5093', note: 'approx TA2' },
  calcaneal_tendon: { ta2: 'A04.7.02.002', fma: '258847', bp: 'BP5098', note: 'approx TA2' },
  anterior_talofibular_ligament: { ta2: 'A03.6.10.002', note: 'approx TA2' },
  calcaneofibular_ligament: { ta2: 'A03.6.10.003', note: 'approx TA2' },
  plantar_calcaneonavicular_ligament: { ta2: 'A03.6.10.204', note: 'approx TA2' },
  plantar_aponeurosis: { ta2: 'A04.7.03.031', note: 'approx TA2' },
};

export function getOntologyIds(structureId: string): StructureOntologyIds | undefined {
  return ONTOLOGY_BY_ID[structureId];
}

/** True when at least one scheme ID is present. */
export function hasOntologyIds(ids: StructureOntologyIds | undefined): boolean {
  if (!ids) return false;
  return Boolean(ids.ta2 || ids.fma || ids.bp);
}

/** Display helpers (stable formatting for panel + tests). */
export function formatFma(fma: string): string {
  return fma.startsWith('FMA') ? fma : `FMA${fma}`;
}

export function formatOntologyLine(ids: StructureOntologyIds): string {
  const parts: string[] = [];
  if (ids.ta2) parts.push(`TA2 ${ids.ta2}`);
  if (ids.fma) parts.push(formatFma(ids.fma));
  if (ids.bp) parts.push(ids.bp);
  if (ids.note) parts.push(`(${ids.note})`);
  return parts.join(' · ');
}
