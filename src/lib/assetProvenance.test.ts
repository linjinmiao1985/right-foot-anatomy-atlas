import { describe, it, expect } from 'vitest';
import { getStructureProvenance, licenseLabel } from './assetProvenance';

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
});
