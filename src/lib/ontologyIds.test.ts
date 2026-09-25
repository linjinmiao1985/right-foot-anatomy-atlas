import { describe, it, expect } from 'vitest';
import {
  getOntologyIds,
  hasOntologyIds,
  getHonestOntologyEmptyReason,
  HONEST_ONTOLOGY_EMPTIES,
  formatFma,
  formatOntologyLine,
  formatOntologyCopy,
  ONTOLOGY_BY_ID,
} from './ontologyIds';
import { getAllStructures } from './structureLookup';

describe('ontologyIds', () => {
  it('returns known bone codes for calcaneus (TA2 + FMA + BP)', () => {
    const ids = getOntologyIds('calcaneus');
    expect(ids).toBeDefined();
    expect(ids?.ta2).toBe('A02.5.10.001');
    expect(ids?.fma).toBe('24496');
    expect(ids?.bp).toBe('BP9040');
    expect(hasOntologyIds(ids)).toBe(true);
  });

  it('maps opponens digiti minimi from IFAA A04.7.02.065 + FMA86033', () => {
    const ids = getOntologyIds('opponens_digiti_minimi');
    expect(ids?.ta2).toBe('A04.7.02.065');
    expect(ids?.fma).toBe('86033');
  });

  it('returns undefined for structures without reliable cite (honest empty)', () => {
    // cervical TC: no distinct TA98; medial/lateral plantar veins: TNA-only
    expect(getOntologyIds('cervical_talocalcaneal_ligament')).toBeUndefined();
    expect(getOntologyIds('medial_plantar_veins')).toBeUndefined();
    expect(getOntologyIds('lateral_plantar_vein')).toBeUndefined();
    expect(hasOntologyIds(undefined)).toBe(false);
  });

  it('maps retinacula and Lisfranc-ish TMT bands from IFAA', () => {
    expect(getOntologyIds('flexor_retinaculum_of_ankle')?.ta2).toBe('A04.7.03.026');
    expect(getOntologyIds('cuneometatarsal_interosseous_ligaments')?.ta2).toBe(
      'A03.6.10.604',
    );
    expect(getOntologyIds('dorsal_venous_arch')?.fma).toBe('44356');
  });

  it('maps major nerve trunks with Wikipedia FMA + IFAA TA', () => {
    const tib = getOntologyIds('tibial_nerve');
    expect(tib?.ta2).toBe('A14.2.07.058');
    expect(tib?.fma).toBe('19035');
    expect(getOntologyIds('deep_fibular_nerve')?.fma).toBe('44771');
  });

  it('uses IFAA-corrected vessel codes (not prior mis-tagged digits)', () => {
    expect(getOntologyIds('plantar_artery_medial')?.ta2).toBe('A12.2.16.061');
    expect(getOntologyIds('plantar_artery_lateral')?.ta2).toBe('A12.2.16.064');
    expect(getOntologyIds('dorsal_digital_arteries')?.ta2).toBe('A12.2.16.053');
    expect(getOntologyIds('anterior_tibial_artery')?.fma).toBe('43894');
  });

  it('formats FMA, ontology line, and copy text', () => {
    expect(formatFma('24496')).toBe('FMA24496');
    expect(formatFma('FMA9708')).toBe('FMA9708');
    expect(formatOntologyLine({ ta2: 'A02.5.10.002', fma: '9708', bp: 'BP8033' })).toBe(
      'TA2 A02.5.10.002 · FMA9708 · BP8033',
    );
    expect(formatOntologyCopy({ ta2: 'A14.2.07.058', fma: '19035', note: 'x' })).toBe(
      'TA2 A14.2.07.058 · FMA19035',
    );
  });

  it('marks grouped vessel codes honestly', () => {
    const ids = getOntologyIds('dorsal_digital_arteries');
    expect(ids?.bp).toBe('BP6049');
    expect(ids?.note).toMatch(/grouped/i);
  });

  it('every mapped id exists in structures.json', () => {
    const live = new Set(getAllStructures().map((s) => s.id));
    for (const id of Object.keys(ONTOLOGY_BY_ID)) {
      expect(live.has(id), `orphan ontology id: ${id}`).toBe(true);
    }
  });

  it('map is sparse — not a fake complete atlas claim', () => {
    const n = Object.keys(ONTOLOGY_BY_ID).length;
    const total = getAllStructures().length;
    expect(n).toBeGreaterThan(20);
    expect(n).toBeLessThan(total);
  });

  it('covers 126/129 live structures with three named honest empties (Day 4at)', () => {
    const n = Object.keys(ONTOLOGY_BY_ID).length;
    const total = getAllStructures().length;
    expect(total).toBe(129);
    expect(n).toBe(126);
    const empty = [
      'cervical_talocalcaneal_ligament',
      'medial_plantar_veins',
      'lateral_plantar_vein',
    ];
    for (const id of empty) {
      expect(getOntologyIds(id), id).toBeUndefined();
    }
    expect(n + empty.length).toBe(total);
  });

  it('exposes reasons for the three named honest empties (Day 4be)', () => {
    expect(Object.keys(HONEST_ONTOLOGY_EMPTIES).sort()).toEqual(
      [
        'cervical_talocalcaneal_ligament',
        'lateral_plantar_vein',
        'medial_plantar_veins',
      ].sort(),
    );
    const cervical = getHonestOntologyEmptyReason('cervical_talocalcaneal_ligament');
    expect(cervical?.reasonEn).toMatch(/not invented/i);
    expect(getHonestOntologyEmptyReason('calcaneus')).toBeUndefined();
  });

  it('expert-review §A named spot-checks (≥10; checklist v2.0)', () => {
    // Bones
    expect(getOntologyIds('calcaneus')).toMatchObject({
      ta2: 'A02.5.10.001',
      fma: '24496',
      bp: 'BP9040',
    });
    expect(getOntologyIds('talus')?.ta2).toBe('A02.5.10.002');
    expect(getOntologyIds('metatarsal_1')?.bp).toBe('BP8230');
    // Muscle — AH is FMA-only this pass (honest sparse; TA omitted)
    expect(getOntologyIds('abductor_hallucis')?.fma).toBe('37459');
    expect(getOntologyIds('abductor_hallucis')?.ta2).toBeUndefined();
    expect(getOntologyIds('flexor_digitorum_longus')?.ta2).toBe('A04.7.02.052');
    // Vessel
    expect(getOntologyIds('dorsalis_pedis_artery')).toMatchObject({
      ta2: 'A12.2.16.048',
      fma: '43915',
      bp: 'BP6027',
    });
    expect(getOntologyIds('plantar_artery_medial')?.ta2).toBe('A12.2.16.061');
    // Nerve
    expect(getOntologyIds('tibial_nerve')).toMatchObject({
      ta2: 'A14.2.07.058',
      fma: '19035',
    });
    expect(getOntologyIds('deep_fibular_nerve')?.fma).toBe('44771');
    // Ligament / tendon
    expect(getOntologyIds('anterior_talofibular_ligament')?.ta2).toBe('A03.6.10.009');
    expect(getOntologyIds('calcaneal_tendon')?.bp).toBe('BP5098');
  });

  it('grouped ontology notes have （组合）/（分组） in nameZh (Day 4bf)', () => {
    const byId = new Map(getAllStructures().map((s) => [s.id, s]));
    for (const [id, ont] of Object.entries(ONTOLOGY_BY_ID)) {
      if (!ont.note || !/group/i.test(ont.note)) continue;
      const s = byId.get(id);
      expect(s, id).toBeDefined();
      expect(
        /组合|分组/.test(s!.nameZh),
        `${id} nameZh should include 组合/分组 for grouped note (got: ${s!.nameZh})`,
      ).toBe(true);
    }
  });
});
