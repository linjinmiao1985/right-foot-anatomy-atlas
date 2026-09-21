import { describe, it, expect } from 'vitest';
import { Vector3 } from 'three';
import {
  DEFAULT_CLIP_CONSTANT,
  DEFAULT_CLIP_ENABLED,
  DEFAULT_CLIP_PLANE_STATE,
  CLIP_CONSTANT_MIN,
  CLIP_CONSTANT_MAX,
  buildSagittalPlane,
  clampClipConstant,
  isClipPlaneState,
} from './clipPlane';

describe('clipPlane', () => {
  it('defaults to disabled sagittal mid-foot cut', () => {
    expect(DEFAULT_CLIP_ENABLED).toBe(false);
    expect(DEFAULT_CLIP_PLANE_STATE.enabled).toBe(false);
    expect(DEFAULT_CLIP_PLANE_STATE.axis).toBe('x');
    expect(DEFAULT_CLIP_CONSTANT).toBe(1.05);
  });

  it('clamps constant to teaching slider range', () => {
    expect(clampClipConstant(0)).toBe(CLIP_CONSTANT_MIN);
    expect(clampClipConstant(9)).toBe(CLIP_CONSTANT_MAX);
    expect(clampClipConstant(1.05)).toBe(1.05);
    expect(clampClipConstant(Number.NaN)).toBe(DEFAULT_CLIP_CONSTANT);
  });

  it('builds sagittal plane with x = -constant', () => {
    const plane = buildSagittalPlane(1.05);
    expect(plane.normal.x).toBe(1);
    expect(plane.normal.y).toBe(0);
    expect(plane.normal.z).toBe(0);
    expect(plane.constant).toBe(1.05);
    // Point on cut: (-1.05, 0, 0) → normal·p + c = 0
    expect(plane.distanceToPoint(new Vector3(-1.05, 0, 0))).toBeCloseTo(0, 5);
  });

  it('validates clip plane state shape', () => {
    expect(isClipPlaneState(DEFAULT_CLIP_PLANE_STATE)).toBe(true);
    expect(isClipPlaneState({ enabled: true, axis: 'x', constant: 1 })).toBe(true);
    expect(isClipPlaneState({ enabled: true, axis: 'y', constant: 1 })).toBe(false);
    expect(isClipPlaneState(null)).toBe(false);
  });
});
