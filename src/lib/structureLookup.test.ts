import { describe, it, expect } from 'vitest';
import { getStructureById, getStructureByMeshName, searchStructures } from './structureLookup';

describe('structureLookup', () => {
  it('should find structure by id', () => {
    const structure = getStructureById('calcaneus');
    expect(structure).toBeDefined();
    expect(structure?.nameZh).toBe('跟骨');
    expect(structure?.nameLa).toBe('Calcaneus');
  });

  it('should return undefined for invalid id', () => {
    const structure = getStructureById('invalid_id_xyz');
    expect(structure).toBeUndefined();
  });

  it('should find structure by mesh name', () => {
    const structure = getStructureByMeshName('Calcaneus_R');
    expect(structure).toBeDefined();
    expect(structure?.id).toBe('calcaneus');
  });

  it('should return undefined for unmapped mesh', () => {
    const structure = getStructureByMeshName('UnmappedMesh_123');
    expect(structure).toBeUndefined();
  });

  it('searches by Chinese name', () => {
    const hits = searchStructures('跟骨');
    expect(hits.some((s) => s.id === 'calcaneus')).toBe(true);
  });

  it('searches by Latin name fragment', () => {
    const hits = searchStructures('interossei dorsales');
    expect(hits.some((s) => s.id === 'interossei_dorsales')).toBe(true);
  });

  it('returns empty for blank query', () => {
    expect(searchStructures('   ')).toEqual([]);
  });

  it('searches ligament layer by Chinese and Latin', () => {
    const zh = searchStructures('跖长');
    expect(zh.some((s) => s.id === 'long_plantar_ligament' && s.layer === 'ligament')).toBe(true);
    const la = searchStructures('plantare longum');
    expect(la.some((s) => s.id === 'long_plantar_ligament')).toBe(true);
  });

  it('searches calcaneal tendon under ligament toggle (TA2 nameLa)', () => {
    const zh = searchStructures('跟腱');
    expect(zh.some((s) => s.id === 'calcaneal_tendon' && s.layer === 'ligament')).toBe(true);
    const la = searchStructures('tendo calcaneus');
    expect(la.some((s) => s.id === 'calcaneal_tendon')).toBe(true);
    const idHit = searchStructures('calcaneal_tendon');
    expect(idHit.some((s) => s.id === 'calcaneal_tendon')).toBe(true);
  });

  it('sorts equal-score hits by teaching layer order (muscle/ligament before nerve)', () => {
    const hits = searchStructures('plantar', 24);
    expect(hits.length).toBeGreaterThan(1);
    const firstNerve = hits.findIndex((s) => s.layer === 'nerve');
    const firstMuscle = hits.findIndex((s) => s.layer === 'muscle');
    const firstLig = hits.findIndex((s) => s.layer === 'ligament');
    if (firstNerve >= 0 && firstMuscle >= 0) {
      expect(firstMuscle).toBeLessThan(firstNerve);
    }
    if (firstNerve >= 0 && firstLig >= 0) {
      expect(firstLig).toBeLessThan(firstNerve);
    }
  });
});

