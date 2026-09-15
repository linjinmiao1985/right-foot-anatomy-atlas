import { describe, it, expect } from 'vitest';
import {
  getOntologyIds,
  hasOntologyIds,
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

  it('returns undefined for unmapped structure (honest empty)', () => {
    expect(getOntologyIds('opponens_digiti_minimi')).toBeUndefined();
    expect(hasOntologyIds(undefined)).toBe(false);
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
});
