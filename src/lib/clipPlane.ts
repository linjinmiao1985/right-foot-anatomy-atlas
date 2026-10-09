/**
 * Single-axis (sagittal / X) clipping plane — lite teaching UX.
 * UX-borrow (ideas only): Open Anatomy Studio real clipping planes;
 * Visible Human Viewer / CT Education Skill cross-section habit.
 * No third-party UI or renderer code copied.
 *
 * Three.js Plane: normal · point + constant = 0.
 * With normal (1,0,0), x = -constant. Foot meshes are BP3D mm × 0.01,
 * so mid-foot X ≈ −1.0 → default constant ≈ 1.05.
 */
import { Plane, Vector3 } from 'three';

export type ClipAxis = 'x';

export interface ClipPlaneState {
  /** When false, no clippingPlanes are applied (default). */
  enabled: boolean;
  /** Fixed to sagittal (X) for this lite pass. */
  axis: ClipAxis;
  /** Plane constant (see module doc). */
  constant: number;
}

export const DEFAULT_CLIP_ENABLED = false;
export const DEFAULT_CLIP_AXIS: ClipAxis = 'x';
/** Mid-foot sagittal cut in scene units (BP3D mm × 0.01). */
export const DEFAULT_CLIP_CONSTANT = 1.05;
/** Teaching slider range covering typical right-foot X extent. */
export const CLIP_CONSTANT_MIN = 0.55;
export const CLIP_CONSTANT_MAX = 1.55;
export const CLIP_CONSTANT_STEP = 0.02;

export const DEFAULT_CLIP_PLANE_STATE: ClipPlaneState = {
  enabled: DEFAULT_CLIP_ENABLED,
  axis: DEFAULT_CLIP_AXIS,
  constant: DEFAULT_CLIP_CONSTANT,
};

const X_NORMAL = new Vector3(1, 0, 0);

export function clampClipConstant(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_CLIP_CONSTANT;
  return Math.min(CLIP_CONSTANT_MAX, Math.max(CLIP_CONSTANT_MIN, value));
}

/** Build / update a Three.js Plane for the lite sagittal clip. */
export function buildSagittalPlane(constant: number, target?: Plane): Plane {
  const c = clampClipConstant(constant);
  if (target) {
    target.normal.copy(X_NORMAL);
    target.constant = c;
    return target;
  }
  return new Plane(X_NORMAL.clone(), c);
}

export function isClipPlaneState(value: unknown): value is ClipPlaneState {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.enabled === 'boolean' &&
    v.axis === 'x' &&
    typeof v.constant === 'number' &&
    Number.isFinite(v.constant)
  );
}
