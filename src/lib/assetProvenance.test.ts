import { describe, it, expect } from 'vitest';
import { getStructureProvenance, licenseLabel, getTeachingMeshNote } from './assetProvenance';

describe('assetProvenance', () => {
  it('marks placeholders', () => {
    const p = getStructureProvenance('any_id', true, 'muscle');
    expect(p.license).toBe('placeholder');
    expect(licenseLabel(p.license)).toBe('占位');
  });

  it('attributes Open3D DI as isolated BY-SA', () => {
    const p = getStructureProvenance('interossei_dorsales', false, 'muscle');
    expect(p.sourceShort).toBe('Open3D');
    expect(p.license).toBe('CC-BY-SA-4.0');
    expect(p.isolatedBySa).toBe(true);
  });

  it('attributes UM muscles as CC0', () => {
    const p = getStructureProvenance('quadratus_plantae', false, 'muscle');
    expect(p.sourceShort).toBe('UM');
    expect(p.license).toBe('CC0-1.0');
  });

  it('attributes newly wired UM teaching extrinsics as CC0', () => {
    for (const id of ['tibialis_anterior', 'fibularis_longus', 'extensor_digitorum_longus', 'extensor_hallucis_longus']) {
      const p = getStructureProvenance(id, false, 'muscle');
      expect(p.sourceShort).toBe('UM');
      expect(p.license).toBe('CC0-1.0');
    }
  });

  it('attributes nerves as isolated BY-SA', () => {
    const p = getStructureProvenance('tibial_nerve', false, 'nerve');
    expect(p.license).toBe('CC-BY-SA-4.0');
    expect(p.isolatedBySa).toBe(true);
  });

  it('defaults bones to BP3D CC BY', () => {
    const p = getStructureProvenance('calcaneus', false, 'bone');
    expect(p.sourceShort).toBe('BP3D');
    expect(p.license).toBe('CC-BY-4.0');
  });

  it('attributes long plantar ligament as BP3D CC BY', () => {
    const p = getStructureProvenance('long_plantar_ligament', false, 'ligament');
    expect(p.sourceShort).toBe('BP3D');
    expect(p.license).toBe('CC-BY-4.0');
    expect(p.isolatedBySa).toBeFalsy();
  });

  it('attributes calcaneal tendon as BP3D CC BY (main tree)', () => {
    const p = getStructureProvenance('calcaneal_tendon', false, 'ligament');
    expect(p.sourceShort).toBe('BP3D');
    expect(p.license).toBe('CC-BY-4.0');
    expect(p.isolatedBySa).toBeFalsy();
  });

  it('provides teaching mesh notes for nerves and grouped vessels', () => {
    expect(getTeachingMeshNote('tibial_nerve', 'nerve')).toMatch(/CURVE|曲线/);
    expect(getTeachingMeshNote('dorsal_digital_arteries', 'vessel')).toMatch(/FJ2072|组合/);
    expect(getTeachingMeshNote('plantar_metatarsal_arteries', 'vessel')).toMatch(/FJ2096|组合/);
    expect(getTeachingMeshNote('calcaneus', 'bone')).toBeNull();
  });
});
