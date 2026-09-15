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
 * - FMA (osteology classic): `docs/terminology.md` osteology table when present.
 * - FMA / BP (mesh-linked): `public/models/right-foot/manifest.json` +
 *   BP tags in `FootModel.tsx` REAL_* paths / comments (ISA elemental).
 * - Soft-tissue TA2: `structures.json` summaries where authored (often approx).
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
  // —— Osteology (26): TA2 from structures.json; classic FMA from terminology.md
  //    when listed; mesh BP/FMA from manifest.json + FootModel GLB names ——
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
  // Hallux: terminology.md FMA; BP from FootModel/manifest (Day 4k BP8785)
  proximal_phalanx_1: { ta2: 'A02.5.17.001', fma: '32951', bp: 'BP8785' },
  distal_phalanx_1: { ta2: 'A02.5.17.002', fma: '32952', bp: 'BP9282' },
  // Digits II–V: TA2 from structures.json; BP+FMA from manifest.json
  proximal_phalanx_2: { ta2: 'A02.5.17.002', fma: '32634', bp: 'BP9196' },
  proximal_phalanx_3: { ta2: 'A02.5.18.002', fma: '32636', bp: 'BP8762' },
  proximal_phalanx_4: { ta2: 'A02.5.19.002', fma: '32638', bp: 'BP8281' },
  proximal_phalanx_5: { ta2: 'A02.5.20.002', fma: '32640', bp: 'BP8417' },
  middle_phalanx_2: { ta2: 'A02.5.17.003', fma: '32642', bp: 'BP8488' },
  middle_phalanx_3: { ta2: 'A02.5.18.003', fma: '32644', bp: 'BP9047' },
  middle_phalanx_4: { ta2: 'A02.5.19.003', fma: '32646', bp: 'BP8576' },
  distal_phalanx_2: { ta2: 'A02.5.17.004', fma: '32652', bp: 'BP8472' },
  distal_phalanx_3: { ta2: 'A02.5.18.004', fma: '32654', bp: 'BP9005' },
  distal_phalanx_4: { ta2: 'A02.5.19.004', fma: '32656', bp: 'BP9261' },
  distal_phalanx_5: { ta2: 'A02.5.20.003', fma: '32658', bp: 'BP8695' },
  sesamoid_bones: {
    ta2: 'A02.5.17.001',
    fma: '45097',
    bp: 'BP8756',
    note: 'grouped hallux sesamoids',
  },

  // —— Muscles (TA2 from structures.json where authored; FMA/BP from manifest) ——
  tibialis_anterior: { ta2: 'A04.7.02.037' },
  extensor_hallucis_longus: { ta2: 'A04.7.02.039' },
  extensor_digitorum_longus: { ta2: 'A04.7.02.040' },
  fibularis_longus: { ta2: 'A04.7.02.041' },
  fibularis_brevis: { ta2: 'A04.7.02.042' },
  fibularis_tertius: { ta2: 'A04.7.02.043' },
  abductor_hallucis: { fma: '37459' },
  flexor_digitorum_brevis: { fma: '37461' },
  abductor_digiti_minimi: { fma: '37463' },
  quadratus_plantae: { fma: '37454' },
  extensor_digitorum_brevis: { fma: '51142' },
  extensor_hallucis_brevis: { fma: '51144', bp: 'BP5059' },
  flexor_digiti_minimi_brevis: { fma: '37471', bp: 'BP5050' },
  flexor_hallucis_brevis: {
    fma: '45971',
    bp: 'BP5546',
    note: 'medial head mesh (manifest)',
  },
  adductor_hallucis: {
    fma: '46018',
    bp: 'BP5578',
    note: 'oblique head FMA/BP; transverse FMA46020/BP5580 also wired',
  },
  lumbrical_1: { fma: '37717', bp: 'BP5044' },
  lumbrical_2: { fma: '37719', bp: 'BP5040' },
  lumbrical_3: { fma: '37485', bp: 'BP5038' },
  lumbrical_4: { fma: '37483', bp: 'BP5042' },
  plantar_interosseous_1: {
    ta2: 'A04.7.02.067',
    fma: '37745',
    bp: 'BP5035',
  },
  plantar_interosseous_2: {
    ta2: 'A04.7.02.069',
    fma: '37743',
    bp: 'BP5033',
  },
  plantar_interosseous_3: {
    ta2: 'A04.7.02.071',
    fma: '37741',
    bp: 'BP5031',
  },
  interossei_dorsales: {
    fma: '37451',
    note: 'grouped 1st–4th DI (manifest muscles_by_sa)',
  },

  // —— Vessels (TA2 + BP/FMA from structures.json summaries / FootModel / manifest) ——
  dorsal_digital_arteries: {
    ta2: 'A12.2.16.064',
    fma: '44660',
    bp: 'BP6049',
    note: 'grouped mesh',
  },
  plantar_metatarsal_arteries: {
    ta2: 'A12.2.16.068',
    fma: '43956',
    bp: 'BP6060',
    note: 'grouped mesh',
  },
  // structures.json ids plantar_artery_*; manifest labels medial/lateral_plantar_artery
  plantar_artery_medial: {
    ta2: 'A12.2.16.065',
    fma: '43929',
    bp: 'BP6062',
  },
  plantar_artery_lateral: {
    ta2: 'A12.2.16.069',
    fma: '43931',
    bp: 'BP6065',
  },
  dorsalis_pedis_artery: { fma: '43916', bp: 'BP6027' },
  plantar_arch: { fma: '43943', bp: 'BP6014' },
  arcuate_artery: { fma: '69494', bp: 'BP6054' },
  posterior_tibial_artery: { fma: '43882' },
  fibular_artery: { fma: '43905' },

  // —— Ligament / tendon (TA2 approx from summaries; BP/FMA from GLB / manifest) ——
  long_plantar_ligament: {
    ta2: 'A03.6.10.517',
    fma: '44249',
    bp: 'BP5093',
    note: 'approx TA2',
  },
  calcaneal_tendon: {
    ta2: 'A04.7.02.002',
    fma: '258847',
    bp: 'BP5098',
    note: 'approx TA2',
  },
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
