import { describe, it, expect } from 'vitest';
import {
  LAYER_OPACITY_MIN,
  LAYER_OPACITY_MAX,
  DEFAULT_LAYER_OPACITY,
  GHOST_LAYER_OPACITY,
  clampLayerOpacity,
  defaultLayerOpacities,
  ghostLayerOpacities,
  parseLayerOpacities,
  opacitiesNearlyEqual,
  isGhostLayerOpacities,
  isSolidLayerOpacities,
  toggleGhostLayerOpacities,
  composeLayerOpacity,
  opacityNeedsTransparency,
  isGhostToggleKey,
  MASTER_GHOST_OPACITY_MIN,
  MASTER_GHOST_OPACITY_MAX,
  DEFAULT_MASTER_GHOST_OPACITY,
  clampMasterGhostOpacity,
  applyMasterGhostOpacity,
  inferMasterGhostOpacity,
} from './layerOpacity';
import { getAllLayers } from './layers';

describe('layerOpacity', () => {
  it('defaults every layer to fully solid', () => {
    const d = defaultLayerOpacities();
    expect(Object.keys(d)).toEqual(getAllLayers());
    for (const layer of getAllLayers()) {
      expect(d[layer]).toBe(DEFAULT_LAYER_OPACITY);
    }
    expect(isSolidLayerOpacities(d)).toBe(true);
    expect(isGhostLayerOpacities(d)).toBe(false);
  });

  it('clamps slider values to the teaching range', () => {
    expect(clampLayerOpacity(0)).toBe(LAYER_OPACITY_MIN);
    expect(clampLayerOpacity(9)).toBe(LAYER_OPACITY_MAX);
    expect(clampLayerOpacity(0.5)).toBe(0.5);
    expect(clampLayerOpacity(Number.NaN)).toBe(DEFAULT_LAYER_OPACITY);
  });

  it('ghost preset keeps bones solid and fades covering soft tissue', () => {
    expect(GHOST_LAYER_OPACITY.bone).toBe(1);
    expect(GHOST_LAYER_OPACITY.muscle).toBeLessThan(0.4);
    expect(GHOST_LAYER_OPACITY.ligament).toBeLessThan(0.4);
    expect(GHOST_LAYER_OPACITY.vessel).toBeLessThan(0.5);
    expect(GHOST_LAYER_OPACITY.nerve).toBeGreaterThan(0.7);
    expect(isGhostLayerOpacities(ghostLayerOpacities())).toBe(true);
  });

  it('parses partial / invalid payloads with solid defaults', () => {
    expect(parseLayerOpacities(undefined)).toEqual(defaultLayerOpacities());
    expect(parseLayerOpacities(null)).toEqual(defaultLayerOpacities());
    expect(parseLayerOpacities(['bone'])).toEqual(defaultLayerOpacities());
    const parsed = parseLayerOpacities({
      muscle: 0.01, // below min → clamp
      nerve: 0.9,
      notALayer: 0.2,
    });
    expect(parsed.bone).toBe(1);
    expect(parsed.muscle).toBe(LAYER_OPACITY_MIN);
    expect(parsed.nerve).toBe(0.9);
  });

  it('toggles ghost ↔ solid', () => {
    const ghost = toggleGhostLayerOpacities(defaultLayerOpacities());
    expect(isGhostLayerOpacities(ghost)).toBe(true);
    expect(isSolidLayerOpacities(toggleGhostLayerOpacities(ghost))).toBe(true);
  });

  it('treats near-equal slider values as the same preset', () => {
    const almost = ghostLayerOpacities();
    almost.muscle = 0.29;
    expect(opacitiesNearlyEqual(almost, GHOST_LAYER_OPACITY)).toBe(true);
    almost.muscle = 0.5;
    expect(opacitiesNearlyEqual(almost, GHOST_LAYER_OPACITY)).toBe(false);
  });

  it('composes hover/select base opacity with the layer multiplier', () => {
    expect(composeLayerOpacity(1, 1)).toBe(1);
    expect(composeLayerOpacity(0.75, 0.28)).toBeCloseTo(0.21, 5);
    expect(composeLayerOpacity(1, 0)).toBe(LAYER_OPACITY_MIN);
    expect(opacityNeedsTransparency(1)).toBe(false);
    expect(opacityNeedsTransparency(0.21)).toBe(true);
  });

  it('recognizes G as the ghost toggle key', () => {
    expect(isGhostToggleKey('g')).toBe(true);
    expect(isGhostToggleKey('G')).toBe(true);
    expect(isGhostToggleKey('h')).toBe(false);
    expect(isGhostToggleKey('Escape')).toBe(false);
  });

  describe('master ghost opacity', () => {
    it('clamps master opacity below min', () => {
      expect(clampMasterGhostOpacity(0.1)).toBe(MASTER_GHOST_OPACITY_MIN);
    });

    it('clamps master opacity above max', () => {
      expect(clampMasterGhostOpacity(1.5)).toBe(MASTER_GHOST_OPACITY_MAX);
    });

    it('preserves valid master opacity values', () => {
      expect(clampMasterGhostOpacity(0.5)).toBe(0.5);
      expect(clampMasterGhostOpacity(0.8)).toBe(0.8);
    });

    it('handles invalid master opacity values', () => {
      expect(clampMasterGhostOpacity(NaN)).toBe(DEFAULT_MASTER_GHOST_OPACITY);
      expect(clampMasterGhostOpacity(Infinity)).toBe(DEFAULT_MASTER_GHOST_OPACITY);
    });

    it('scales all non-bone layers by master opacity', () => {
      const base = ghostLayerOpacities();
      const scaled = applyMasterGhostOpacity(base, 0.5);
      
      expect(scaled.bone).toBe(base.bone);
      expect(scaled.muscle).toBeCloseTo(base.muscle * 0.5, 2);
      expect(scaled.nerve).toBeCloseTo(base.nerve * 0.5, 2);
      expect(scaled.vessel).toBeCloseTo(base.vessel * 0.5, 2);
      expect(scaled.ligament).toBeCloseTo(base.ligament * 0.5, 2);
    });

    it('preserves bone opacity regardless of master scale', () => {
      const base = ghostLayerOpacities();
      const scaled = applyMasterGhostOpacity(base, 0.2);
      expect(scaled.bone).toBe(1.0);
    });

    it('clamps scaled values to valid layer opacity range', () => {
      const base = ghostLayerOpacities();
      const scaled = applyMasterGhostOpacity(base, 0.1);
      
      expect(scaled.muscle).toBeGreaterThanOrEqual(LAYER_OPACITY_MIN);
      expect(scaled.nerve).toBeGreaterThanOrEqual(LAYER_OPACITY_MIN);
      expect(scaled.vessel).toBeGreaterThanOrEqual(LAYER_OPACITY_MIN);
      expect(scaled.ligament).toBeGreaterThanOrEqual(LAYER_OPACITY_MIN);
    });

    it('infers master opacity as 1.0 for solid preset', () => {
      const solid = defaultLayerOpacities();
      expect(inferMasterGhostOpacity(solid)).toBe(1.0);
    });

    it('infers master opacity as 1.0 for standard ghost preset', () => {
      const ghost = ghostLayerOpacities();
      expect(inferMasterGhostOpacity(ghost)).toBe(1.0);
    });

    it('infers correct scale from scaled ghost opacities', () => {
      const base = ghostLayerOpacities();
      const scaled = applyMasterGhostOpacity(base, 0.6);
      const inferred = inferMasterGhostOpacity(scaled);
      expect(inferred).toBeCloseTo(0.6, 1);
    });

    it('handles custom per-layer opacity tweaks', () => {
      const custom = {
        bone: 1.0,
        muscle: 0.4,
        nerve: 0.7,
        vessel: 0.3,
        ligament: 0.5,
      };
      const inferred = inferMasterGhostOpacity(custom);
      expect(inferred).toBeGreaterThan(0);
      expect(inferred).toBeLessThanOrEqual(1);
    });
  });
});
