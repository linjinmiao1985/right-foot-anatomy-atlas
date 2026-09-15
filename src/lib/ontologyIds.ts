/**
 * Optional ontology IDs for StructurePanel (TA2 / FMA / BodyParts3D BP).
 *
 * Honesty rules:
 * - Only include codes we can cite from project sources below.
 * - Omit unknown fields — UI shows nothing for that scheme (no invented IDs).
 * - Grouped / approximate codes may set `note` (e.g. "grouped", "approx").
 *
 * Sources (document, do not invent):
 * - TA A-codes: IFAA TA98 entity pages / partonomic lists (project displays as
 *   "TA2" for teaching continuity with structures.json). Primary lookups:
 *   https://ifaa.unifr.ch/Public/EntryPage/ and TAH4339 A2F artery list.
 * - TA2 term numbers / cross-checks: https://ta2viewer.openanatomy.org/
 * - FMA: IFAA entity FMA identifier field, or Wikipedia anatomy infobox
 *   (TA98+TA2+FMA) when IFAA page lacks FMA; prefer FMA for vessels if TA missing.
 * - Osteology classic FMA: `docs/terminology.md` when present.
 * - Mesh BP: `public/models/right-foot/manifest.json` + FootModel REAL_* paths.
 *
 * Day 4as: corrected several prior "approx" vessel/ligament A-codes that did not
 * match IFAA (documented inline). Still a sparse teaching map — not TA2-complete.
 * Day 4at: filled remaining citable gaps (opponens, named veins with TA98 A-codes,
 * retinacula, Lisfranc-ish TMT bands, midfoot ligaments) from IFAA entity pages.
 * Still omit cervical TC (no distinct TA98), medial/lateral plantar veins (TNA-only,
 * no TA98 A-code / clear FMA this pass).
 */

export interface StructureOntologyIds {
  /** Terminologia Anatomica hierarchical A-code (TA98; shown as TA2 in UI) */
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
  // —— Osteology (26): TA from structures.json; classic FMA from terminology.md
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
  // Digits II–V: TA from structures.json; BP+FMA from manifest.json
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

  // —— Muscles ——
  // Extrinsic anterior/lateral: TA from structures.json summaries (aligned IFAA A04.7.02.*)
  tibialis_anterior: { ta2: 'A04.7.02.037' },
  extensor_hallucis_longus: { ta2: 'A04.7.02.039' },
  extensor_digitorum_longus: { ta2: 'A04.7.02.040' },
  fibularis_longus: { ta2: 'A04.7.02.041' },
  fibularis_brevis: { ta2: 'A04.7.02.042' },
  fibularis_tertius: { ta2: 'A04.7.02.043' },
  // Extrinsic posterior + plantaris: IFAA TA98 entity pages (FMA field)
  // https://ifaa.unifr.ch/Public/EntryPage/TA98%20Tree/Entity%20TA98%20EN/04.7.02.051%20Entity%20TA98%20EN.htm
  // …049 plantaris, …052 FDL, …053 FHL; TA2Viewer tib. post. id=2666 ↔ FMA51099
  tibialis_posterior: { ta2: 'A04.7.02.051', fma: '51099' },
  flexor_digitorum_longus: { ta2: 'A04.7.02.052', fma: '51071' },
  flexor_hallucis_longus: { ta2: 'A04.7.02.053', fma: '22593' },
  plantaris: { ta2: 'A04.7.02.049', fma: '22543' },
  // Intrinsics: FMA/BP from manifest (UM/BP3D); PI TA from structures.json
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
  // IFAA A04.7.02.065 Entity Page (m. opponens digiti minimi / foot; inconstant)
  // https://ifaa.unifr.ch/Public/EntryPage/TA98%20Tree/Entity%20TA98%20EN/04.7.02.065%20Entity%20TA98%20EN.htm
  opponens_digiti_minimi: {
    ta2: 'A04.7.02.065',
    fma: '86033',
    note: 'inconstant (IFAA)',
  },

  // —— Nerves (major trunks + named branches) ——
  // TA: IFAA A14.2.07.* hierarchy under n. tibialis / n. fibularis;
  // FMA: Wikipedia anatomy infobox (TA98+TA2+FMA) — NOT unverified manifest nerve FMA
  // (manifest FMA19027/19035 conflicted with Wikipedia tibial=19035 / deep fibular=44771).
  tibial_nerve: { ta2: 'A14.2.07.058', fma: '19035' }, // WP Tibial nerve; TA2Viewer id=6582
  medial_plantar_nerve: { ta2: 'A14.2.07.066', fma: '44716' }, // WP; TA2Viewer id=6590
  lateral_plantar_nerve: { ta2: 'A14.2.07.069', fma: '44724' }, // WP Lateral plantar nerve
  deep_fibular_nerve: { ta2: 'A14.2.07.055', fma: '44771' }, // WP Deep fibular nerve
  superficial_fibular_nerve: { ta2: 'A14.2.07.050', fma: '44699' }, // WP Superficial fibular nerve
  sural_nerve: { ta2: 'A14.2.07.062', fma: '44688' }, // WP Sural nerve
  // Branches: IFAA children of tibial / fibular trunks (TA only unless FMA cited)
  medial_calcaneal_branches: { ta2: 'A14.2.07.065' },
  lateral_calcaneal_nerves: { ta2: 'A14.2.07.064' },
  lateral_dorsal_cutaneous_nerve: { ta2: 'A14.2.07.063' },
  medial_dorsal_cutaneous_nerve: { ta2: 'A14.2.07.052' },
  superficial_branch_lateral_plantar_nerve: { ta2: 'A14.2.07.070' },
  deep_branch_lateral_plantar_nerve: { ta2: 'A14.2.07.073' },
  common_plantar_digital_nerves: {
    ta2: 'A14.2.07.067',
    note: 'grouped; IFAA code = medial commons (lateral commons = A14.2.07.071)',
  },
  proper_plantar_digital_nerves_medial: { ta2: 'A14.2.07.068' },
  proper_plantar_digital_nerves_lateral: { ta2: 'A14.2.07.072' },
  dorsal_digital_superficial_fibular: {
    ta2: 'A14.2.07.054',
    note: 'grouped dorsal digitals of superficial fibular',
  },
  dorsal_digital_deep_fibular: {
    ta2: 'A14.2.07.057',
    note: 'grouped dorsal digitals of deep fibular',
  },

  // —— Vessels ——
  // Corrected Day 4as from IFAA TAH4339 A2F list (prior structures.json "TA2" digits
  // for MPA/LPA/dorsal digital/plantar metatarsal were off — those codes belong
  // to other arteries). Prefer IFAA FMA when it differs from manifest by ±1.
  // https://ifaa.unifr.ch/Public/TNAEntryPage/auto/TA98/EN/TAH4339%20A2F%20EN.htm
  anterior_tibial_artery: { ta2: 'A12.2.16.042', fma: '43894' }, // IFAA entity
  dorsalis_pedis_artery: {
    ta2: 'A12.2.16.048',
    fma: '43915', // IFAA (manifest had FMA43916)
    bp: 'BP6027',
  },
  lateral_tarsal_artery: { ta2: 'A12.2.16.049' },
  medial_tarsal_arteries: { ta2: 'A12.2.16.050', note: 'grouped' },
  arcuate_artery: { ta2: 'A12.2.16.051', fma: '69494', bp: 'BP6054' },
  dorsal_metatarsal_arteries: { ta2: 'A12.2.16.052', note: 'grouped' },
  dorsal_digital_arteries: {
    ta2: 'A12.2.16.053', // corrected (was .064 = LPA)
    fma: '44660',
    bp: 'BP6049',
    note: 'grouped mesh',
  },
  deep_plantar_artery: { ta2: 'A12.2.16.054', fma: '69513' }, // IFAA entity
  posterior_tibial_artery: {
    ta2: 'A12.2.16.055',
    fma: '43895', // IFAA (manifest/prior map FMA43882)
  },
  circumflex_fibular_artery: { ta2: 'A12.2.16.056' },
  medial_calcaneal_artery: {
    ta2: 'A12.2.16.059',
    note: 'rr. calcanei of PTA (medial teaching mesh)',
  },
  plantar_artery_medial: {
    ta2: 'A12.2.16.061', // corrected (was .065 = deep plantar arch)
    fma: '43925', // IFAA (manifest FMA43929)
    bp: 'BP6062',
  },
  deep_branch_medial_plantar_artery: { ta2: 'A12.2.16.062' },
  superficial_branch_medial_plantar_artery: { ta2: 'A12.2.16.063' },
  plantar_artery_lateral: {
    ta2: 'A12.2.16.064', // corrected (was .069 = proper plantar digitals)
    fma: '43931',
    bp: 'BP6065',
  },
  plantar_arch: {
    ta2: 'A12.2.16.065',
    fma: '43943',
    bp: 'BP6014',
    note: 'BP3D arch ≈ arcus plantaris profundus',
  },
  deep_plantar_arch: {
    ta2: 'A12.2.16.065',
    note: 'Open3D detail; same TA as deep plantar arch',
  },
  plantar_metatarsal_arteries: {
    ta2: 'A12.2.16.066', // corrected (was .068 = common plantar digitals)
    fma: '43956',
    bp: 'BP6060',
    note: 'grouped mesh',
  },
  perforating_arcuate_deep_plantar: {
    ta2: 'A12.2.16.067',
    note: 'rr. perforantes (grouped teaching mesh)',
  },
  common_plantar_digital_arteries: { ta2: 'A12.2.16.068', note: 'grouped' },
  proper_plantar_digital_arteries: { ta2: 'A12.2.16.069', note: 'grouped' },
  fibular_artery: { ta2: 'A12.2.16.071', fma: '43905' },
  lateral_calcaneal_artery: {
    ta2: 'A12.2.16.075',
    note: 'rr. calcanei of fibular a. (teaching mesh)',
  },
  // Veins with TA98 A-codes (IFAA A12.3.11.*). Medial/lateral plantar veins are
  // TNA-only (TAH U15825/U15824) without TA98 A-code / clear FMA — omit this pass.
  // https://ifaa.unifr.ch/Public/EntryPage/TA98%20Tree/TA98%20EN/12.3.11%20TA98%20EN.htm
  dorsal_venous_arch: {
    ta2: 'A12.3.11.012',
    fma: '44356', // IFAA arcus venosus dorsalis pedis
  },
  plantar_venous_arch: {
    ta2: 'A12.3.11.016',
    fma: '44489', // IFAA arcus venosus plantaris
  },
  plantar_metatarsal_veins: {
    ta2: 'A12.3.11.017',
    fma: '70918',
    note: 'grouped',
  },
  plantar_digital_veins: {
    ta2: 'A12.3.11.018',
    fma: '70919',
    note: 'grouped',
  },
  // medial_plantar_veins / lateral_plantar_vein: TNA-only — omit (honest empty)

  // —— Ligament / tendon / aponeurosis ——
  // Day 4as: corrected ATFL/CFL/spring A-codes (prior .002/.003/.204 were joint /
  // deltoid / wrong) from IFAA A03.6.10.* entity pages.
  anterior_talofibular_ligament: {
    ta2: 'A03.6.10.009',
    fma: '44083', // IFAA ATFL entity
  },
  posterior_talofibular_ligament: {
    ta2: 'A03.6.10.010',
    fma: '44084', // IFAA PTFL entity
  },
  calcaneofibular_ligament: {
    ta2: 'A03.6.10.011',
    fma: '44089', // IFAA CFL entity
  },
  // Deltoid parts (IFAA under lig. collaterale mediale)
  tibionavicular_ligament: { ta2: 'A03.6.10.004' },
  tibiocalcaneal_ligament: { ta2: 'A03.6.10.005' },
  anterior_tibiotalar_ligament: { ta2: 'A03.6.10.006' },
  posterior_tibiotalar_ligament: { ta2: 'A03.6.10.007' },
  plantar_calcaneonavicular_ligament: {
    ta2: 'A03.6.10.203', // corrected (was .204)
    fma: '44254', // IFAA spring ligament entity
  },
  interosseous_talocalcaneal_ligament: {
    ta2: 'A03.6.10.503',
    fma: '44199',
  },
  bifurcate_ligament: { ta2: 'A03.6.10.511', fma: '44216' },
  long_plantar_ligament: {
    ta2: 'A03.6.10.517',
    fma: '44248', // IFAA (manifest FMA44249)
    bp: 'BP5093',
  },
  plantar_calcaneocuboid_ligament: {
    ta2: 'A03.6.10.518',
    fma: '44251',
  },
  // Tendo calcaneus: IFAA list A04.7.02.048 (prior .002 was wrong/approx)
  calcaneal_tendon: {
    ta2: 'A04.7.02.048',
    fma: '258847',
    bp: 'BP5098',
  },
  // Plantar aponeurosis: keep structures.json-authored A04.7.03.031 (fascia section)
  plantar_aponeurosis: { ta2: 'A04.7.03.031', note: 'from structures.json summary' },

  // Retinacula — IFAA A04.7.03.025–029 (TAH2142 A3 list + entity pages)
  // https://ifaa.unifr.ch/Public/TNAEntryPage/auto/TA98/EN/TAH2142%20A3%20EN.htm
  superior_extensor_retinaculum: {
    ta2: 'A04.7.03.025',
    fma: '49384', // IFAA entity
  },
  flexor_retinaculum_of_ankle: {
    ta2: 'A04.7.03.026',
    fma: '49372', // IFAA entity (flexor retinaculum of ankle)
  },
  inferior_extensor_retinaculum: {
    ta2: 'A04.7.03.027',
    fma: '49385', // IFAA entity
  },
  superior_fibular_retinaculum: {
    ta2: 'A04.7.03.028',
    fma: '51117', // IFAA entity
  },
  inferior_fibular_retinaculum: {
    ta2: 'A04.7.03.029',
    // IFAA entity page lists TA only (no FMA field) — omit FMA
  },

  // Lisfranc-ish TMT bands — IFAA A03.6.10.602–604 (TAH1564 A4)
  // https://ifaa.unifr.ch/Public/TNAEntryPage/auto/TA98/EN/TAH1564%20A4%20EN.htm
  dorsal_tarsometatarsal_ligaments: {
    ta2: 'A03.6.10.602',
    fma: '44270',
    note: 'grouped',
  },
  plantar_tarsometatarsal_ligaments: {
    ta2: 'A03.6.10.603',
    fma: '44271',
    note: 'grouped',
  },
  cuneometatarsal_interosseous_ligaments: {
    ta2: 'A03.6.10.604',
    fma: '44272',
    note: 'grouped; includes Lisfranc band teaching mesh',
  },

  // Midfoot / subtalar / forefoot — IFAA entity pages (TAH1564 A4)
  medial_talocalcaneal_ligament: {
    ta2: 'A03.6.10.103',
    fma: '44285', // IFAA lig. talocalcaneum mediale
  },
  // cervical_talocalcaneal_ligament: no distinct TA98 A-code (clinical synonym
  // often maps to lateral TC A03.6.10.102) — omit (honest empty)
  intercuneiform_interosseous_ligaments: {
    ta2: 'A03.6.10.505',
    fma: '71413',
    note: 'grouped',
  },
  talonavicular_ligament: {
    ta2: 'A03.6.10.507',
    fma: '44213', // IFAA lig. talonaviculare
  },
  dorsal_intercuneiform_ligaments: {
    ta2: 'A03.6.10.508',
    fma: '44214',
    note: 'grouped',
  },
  dorsal_cuneonavicular_ligaments: {
    ta2: 'A03.6.10.514',
    fma: '44239',
    note: 'grouped',
  },
  deep_transverse_metatarsal_ligament: {
    ta2: 'A03.6.10.804',
    fma: '44490', // IFAA lig. metatarsale transversum profundum
  },
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

/** Clipboard text for teaching copy button (schemes only, no note). */
export function formatOntologyCopy(ids: StructureOntologyIds): string {
  const parts: string[] = [];
  if (ids.ta2) parts.push(`TA2 ${ids.ta2}`);
  if (ids.fma) parts.push(formatFma(ids.fma));
  if (ids.bp) parts.push(ids.bp);
  return parts.join(' · ');
}
