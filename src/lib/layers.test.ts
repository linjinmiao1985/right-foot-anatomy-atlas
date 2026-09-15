import { describe, it, expect } from 'vitest';
import { LAYER_CONFIG, getAllLayers } from './layers';

describe('layers', () => {
  it('should have config for all five layers', () => {
    expect(LAYER_CONFIG.bone).toBeDefined();
    expect(LAYER_CONFIG.muscle).toBeDefined();
    expect(LAYER_CONFIG.nerve).toBeDefined();
    expect(LAYER_CONFIG.vessel).toBeDefined();
    expect(LAYER_CONFIG.ligament).toBeDefined();
  });

  it('should return all layer keys', () => {
    const layers = getAllLayers();
    expect(layers).toEqual(['bone', 'muscle', 'nerve', 'vessel', 'ligament']);
  });

  it('should have Chinese and English labels', () => {
    expect(LAYER_CONFIG.bone.label).toBe('骨骼');
    expect(LAYER_CONFIG.muscle.label).toBe('肌肉');
    expect(LAYER_CONFIG.nerve.label).toBe('神经');
    expect(LAYER_CONFIG.vessel.label).toBe('血管');
    expect(LAYER_CONFIG.ligament.label).toBe('韧带');
    expect(LAYER_CONFIG.bone.labelEn).toBe('Bone');
    expect(LAYER_CONFIG.muscle.labelEn).toBe('Muscle');
    expect(LAYER_CONFIG.nerve.labelEn).toBe('Nerve');
    expect(LAYER_CONFIG.vessel.labelEn).toBe('Vessel');
    expect(LAYER_CONFIG.ligament.labelEn).toBe('Ligament');
  });
});
