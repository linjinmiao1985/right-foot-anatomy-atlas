import { describe, it, expect } from 'vitest';
import {
  DEFAULT_EXPLODE_AMOUNT,
  EXPLODE_AMOUNT_MAX,
  EXPLODE_AMOUNT_MIN,
  EXPLODE_DISTANCE,
  EXPLODE_PRESET_AMOUNT,
  LAYER_EXPLODE_FACTOR,
  REDUCED_MOTION_SCALE,
  clampExplodeAmount,
  isAssembledExplode,
  isExplodePreset,
  isExplodeToggleKey,
  layerExplodeOffset,
  parseExplodeAmount,
  prefersReducedMotion,
  toggleExplodeAmount,
} from './layerExplode';

describe('layerExplode', () => {
  it('keeps osteology as the spatial anchor', () => {
    expect(LAYER_EXPLODE_FACTOR.bone).toBe(0);
    expect(layerExplodeOffset(1, 'bone')).toEqual([0, 0, 0]);
    expect(layerExplodeOffset(EXPLODE_PRESET_AMOUNT, 'bone')).toEqual([0, 0, 0]);
  });

  it('peels covering layers along +Y in ligament < muscle < vessel < nerve order', () => {
    expect(LAYER_EXPLODE_FACTOR.ligament).toBeLessThan(LAYER_EXPLODE_FACTOR.muscle);
    expect(LAYER_EXPLODE_FACTOR.muscle).toBeLessThan(LAYER_EXPLODE_FACTOR.vessel);
    expect(LAYER_EXPLODE_FACTOR.vessel).toBeLessThan(LAYER_EXPLODE_FACTOR.nerve);
    const muscle = layerExplodeOffset(1, 'muscle')[1];
    const nerve = layerExplodeOffset(1, 'nerve')[1];
    expect(muscle).toBeGreaterThan(0);
    expect(nerve).toBe(EXPLODE_DISTANCE);
    expect(nerve).toBeGreaterThan(muscle);
    expect(layerExplodeOffset(0.5, 'nerve')[1]).toBeCloseTo(EXPLODE_DISTANCE * 0.5, 5);
  });

  it('clamps slider values to the teaching range', () => {
    expect(clampExplodeAmount(-1)).toBe(EXPLODE_AMOUNT_MIN);
    expect(clampExplodeAmount(9)).toBe(EXPLODE_AMOUNT_MAX);
    expect(clampExplodeAmount(0.4)).toBe(0.4);
    expect(clampExplodeAmount(Number.NaN)).toBe(DEFAULT_EXPLODE_AMOUNT);
  });

  it('parses missing / invalid payloads as assembled 0', () => {
    expect(parseExplodeAmount(undefined)).toBe(0);
    expect(parseExplodeAmount(null)).toBe(0);
    expect(parseExplodeAmount('0.7')).toBe(0);
    expect(parseExplodeAmount(1.4)).toBe(1);
  });

  it('toggles assembled ↔ teaching preset', () => {
    expect(isAssembledExplode(0)).toBe(true);
    expect(isExplodePreset(toggleExplodeAmount(0))).toBe(true);
    expect(isAssembledExplode(toggleExplodeAmount(EXPLODE_PRESET_AMOUNT))).toBe(true);
    expect(isAssembledExplode(toggleExplodeAmount(0.4))).toBe(true);
  });

  it('recognizes E as the explode toggle key', () => {
    expect(isExplodeToggleKey('e')).toBe(true);
    expect(isExplodeToggleKey('E')).toBe(true);
    expect(isExplodeToggleKey('g')).toBe(false);
    expect(isExplodeToggleKey('Escape')).toBe(false);
  });

  it('returns false for prefersReducedMotion in test environment', () => {
    expect(prefersReducedMotion()).toBe(false);
  });

  it('respects reducedMotion flag to scale explode distance', () => {
    const fullNerve = layerExplodeOffset(1, 'nerve', false);
    const reducedNerve = layerExplodeOffset(1, 'nerve', true);
    expect(fullNerve[1]).toBe(EXPLODE_DISTANCE);
    expect(reducedNerve[1]).toBeCloseTo(EXPLODE_DISTANCE * REDUCED_MOTION_SCALE, 5);
    expect(reducedNerve[1]).toBeLessThan(fullNerve[1]);
  });

  it('scales all layer offsets when reducedMotion is true', () => {
    const layers: Array<'bone' | 'ligament' | 'muscle' | 'vessel' | 'nerve'> = [
      'bone',
      'ligament',
      'muscle',
      'vessel',
      'nerve',
    ];
    layers.forEach((layer) => {
      const full = layerExplodeOffset(0.5, layer, false);
      const reduced = layerExplodeOffset(0.5, layer, true);
      if (LAYER_EXPLODE_FACTOR[layer] === 0) {
        expect(full[1]).toBe(0);
        expect(reduced[1]).toBe(0);
      } else {
        expect(reduced[1]).toBeCloseTo(full[1] * REDUCED_MOTION_SCALE, 5);
        expect(reduced[1]).toBeLessThan(full[1]);
      }
    });
  });
});
