import { describe, it, expect } from 'vitest';
import { getStructureById, getStructureByMeshName } from './structureLookup';

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
});
