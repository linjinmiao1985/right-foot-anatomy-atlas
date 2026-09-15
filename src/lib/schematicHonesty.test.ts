import { describe, it, expect } from 'vitest';
import {
  getSchematicHonesty,
  ADDITIONAL_PART_IDS,
  PATHWAY_SCHEMATIC_NERVE_IDS,
} from './schematicHonesty';

describe('schematicHonesty (OMFAtlas UX-borrow)', () => {
  it('marks BY-SA isolate structures', () => {
    const h = getSchematicHonesty('posterior_tibial_artery', false, 'vessel');
    expect(h.show).toBe(true);
    expect(h.kinds).toContain('by-sa');
    expect(h.disclaimer).toMatch(/ShareAlike|by-sa/i);
    expect(h.badges.some((b) => b.kind === 'by-sa')).toBe(true);
  });

  it('marks grouped teaching meshes from ontology note', () => {
    const h = getSchematicHonesty('dorsal_digital_arteries', false, 'vessel');
    expect(h.kinds).toContain('grouped');
    expect(h.disclaimer).toMatch(/组合|Grouped|elemental/i);
  });

  it('marks ADDITIONAL-part composites', () => {
    expect(ADDITIONAL_PART_IDS.has('flexor_hallucis_brevis')).toBe(true);
    const h = getSchematicHonesty('flexor_hallucis_brevis', false, 'muscle');
    expect(h.kinds).toContain('additional-part');
    // FHB also carries BY-SA lateral head provenance via mixed note path —
    // at least ADDITIONAL badge must show.
    expect(h.badges.some((b) => b.kind === 'additional-part')).toBe(true);
  });

  it('marks DI as BY-SA + ADDITIONAL + grouped', () => {
    expect(ADDITIONAL_PART_IDS.has('interossei_dorsales')).toBe(true);
    const h = getSchematicHonesty('interossei_dorsales', false, 'muscle');
    expect(h.kinds).toEqual(
      expect.arrayContaining(['by-sa', 'additional-part', 'grouped']),
    );
  });

  it('marks literal placeholders', () => {
    const h = getSchematicHonesty('any_future_gap', true, 'nerve');
    expect(h.kinds).toContain('placeholder');
    expect(h.disclaimer).toMatch(/占位|Schematic/i);
  });

  it('marks ZA trunk nerves as pathway-schematic (placeholder-adjacent)', () => {
    for (const id of PATHWAY_SCHEMATIC_NERVE_IDS) {
      const h = getSchematicHonesty(id, false, 'nerve');
      expect(h.kinds).toContain('pathway-schematic');
      expect(h.kinds).toContain('by-sa');
      expect(h.disclaimer).toMatch(/路径示意|CURVE|pathway/i);
    }
  });

  it('stays quiet for clean main-tree osteology', () => {
    const h = getSchematicHonesty('calcaneus', false, 'bone');
    expect(h.show).toBe(false);
    expect(h.kinds).toEqual([]);
    expect(h.disclaimer).toBe('');
  });

  it('stays quiet for UM CC0 muscle without ADDITIONAL/grouped', () => {
    const h = getSchematicHonesty('quadratus_plantae', false, 'muscle');
    expect(h.show).toBe(false);
  });
});
