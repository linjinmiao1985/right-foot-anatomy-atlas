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
    expect(p.sourceShort).toBe('Z-Anatomy');
    expect(p.license).toBe('CC-BY-SA-4.0');
    expect(p.isolatedBySa).toBe(true);
  });

  it('attributes Open3D fine/cutaneous nerves as isolated BY-SA Open3D', () => {
    for (const id of [
      'common_plantar_digital_nerves',
      'proper_plantar_digital_nerves_medial',
      'proper_plantar_digital_nerves_lateral',
      'deep_branch_lateral_plantar_nerve',
      'medial_dorsal_cutaneous_nerve',
      'lateral_dorsal_cutaneous_nerve',
      'medial_calcaneal_branches',
      'lateral_calcaneal_nerves',
      'superficial_branch_lateral_plantar_nerve',
      'dorsal_digital_superficial_fibular',
      'dorsal_digital_deep_fibular',
    ]) {
      const p = getStructureProvenance(id, false, 'nerve');
      expect(p.sourceShort).toBe('Open3D');
      expect(p.license).toBe('CC-BY-SA-4.0');
      expect(p.isolatedBySa).toBe(true);
    }
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


  it('attributes Open3D ankle ligaments / plantar fascia as isolated BY-SA', () => {
    for (const id of [
      'anterior_talofibular_ligament',
      'calcaneofibular_ligament',
      'posterior_talofibular_ligament',
      'plantar_calcaneonavicular_ligament',
      'plantar_aponeurosis',
      'tibionavicular_ligament',
      'tibiocalcaneal_ligament',
      'posterior_tibiotalar_ligament',
      'anterior_tibiotalar_ligament',
      'plantar_calcaneocuboid_ligament',
      'bifurcate_ligament',
      'cuneometatarsal_interosseous_ligaments',
      'dorsal_tarsometatarsal_ligaments',
      'plantar_tarsometatarsal_ligaments',
      'flexor_retinaculum_of_ankle',
      'superior_extensor_retinaculum',
      'inferior_extensor_retinaculum',
      'superior_fibular_retinaculum',
      'inferior_fibular_retinaculum',
      'interosseous_talocalcaneal_ligament',
      'cervical_talocalcaneal_ligament',
      'talonavicular_ligament',
      'deep_transverse_metatarsal_ligament',
      'intercuneiform_interosseous_ligaments',
      'dorsal_cuneonavicular_ligaments',
      'medial_talocalcaneal_ligament',
      'dorsal_intercuneiform_ligaments',
    ]) {
      const p = getStructureProvenance(id, false, 'ligament');
      expect(p.sourceShort).toBe('Open3D');
      expect(p.license).toBe('CC-BY-SA-4.0');
      expect(p.isolatedBySa).toBe(true);
    }
  });

  it('provides teaching mesh notes for nerves and grouped vessels', () => {
    expect(getTeachingMeshNote('tibial_nerve', 'nerve')).toMatch(/CURVE|曲线/);
    expect(getTeachingMeshNote('common_plantar_digital_nerves', 'nerve')).toMatch(/Open3D|Kabsch/);
    expect(getTeachingMeshNote('dorsal_digital_arteries', 'vessel')).toMatch(/FJ2072|组合/);
    expect(getTeachingMeshNote('plantar_metatarsal_arteries', 'vessel')).toMatch(/FJ2096|组合/);
    expect(getTeachingMeshNote('dorsal_metatarsal_arteries', 'vessel')).toMatch(/组合|Open3D/);
    expect(getTeachingMeshNote('deep_plantar_arch', 'vessel')).toMatch(/Deep_plantar_arch|深弓/);
    expect(getTeachingMeshNote('calcaneus', 'bone')).toBeNull();
  });

  it('marks Day 4aa Open3D vessels as BY-SA isolate', () => {
    for (const id of [
      'deep_plantar_artery',
      'deep_plantar_arch',
      'dorsal_metatarsal_arteries',
      'deep_branch_medial_plantar_artery',
      'superficial_branch_medial_plantar_artery',
    ]) {
      const p = getStructureProvenance(id, false, 'vessel');
      expect(p.sourceShort).toBe('Open3D');
      expect(p.license).toBe('CC-BY-SA-4.0');
      expect(p.isolatedBySa).toBe(true);
    }
  });

  it('marks Day 4ab Open3D tarsal/calcaneal/perforator vessels as BY-SA isolate', () => {
    for (const id of [
      'perforating_arcuate_deep_plantar',
      'lateral_tarsal_artery',
      'medial_tarsal_arteries',
      'medial_calcaneal_artery',
      'lateral_calcaneal_artery',
    ]) {
      const p = getStructureProvenance(id, false, 'vessel');
      expect(p.sourceShort).toBe('Open3D');
      expect(p.license).toBe('CC-BY-SA-4.0');
      expect(p.isolatedBySa).toBe(true);
    }
    expect(getTeachingMeshNote('medial_tarsal_arteries', 'vessel')).toMatch(/组合|Open3D/);
    expect(getTeachingMeshNote('perforating_arcuate_deep_plantar', 'vessel')).toMatch(/Open3D|Kabsch/);
  });
});
