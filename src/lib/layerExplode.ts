/**
 * Per-layer teaching explode / 抽出 — peel covering layers along +Y so
 * students can see the sandwich (osteology stays the spatial anchor).
 *
 * UX-borrow (ideas only): Air-Sage 抽出; ashemag Human Atlas exploded
 * inventory; jaskirat1616 Eye Atlas staged explode slider. No third-party
 * UI or renderer code copied.
 *
 * Teaching chrome only — **not** surgical dissection / clinical exposure,
 * **not** a finished-product claim.
 */
import type { Layer } from '../types/anatomy';

export const EXPLODE_AMOUNT_MIN = 0;
export const EXPLODE_AMOUNT_MAX = 1;
export const EXPLODE_AMOUNT_STEP = 0.05;
export const DEFAULT_EXPLODE_AMOUNT = 0;

/** Teaching preset (E-key / 抽出 button). Not a full inventory scatter. */
export const EXPLODE_PRESET_AMOUNT = 0.7;

/** Max world-Y offset (scene units) at amount=1 for the top layer (nerve). */
export const EXPLODE_DISTANCE = 0.8;

/**
 * Relative peel order (0 = stay with osteology). Ligament hugs bone;
 * muscle then vessel then nerve peel further so NV stay readable.
 */
export const LAYER_EXPLODE_FACTOR: Readonly<Record<Layer, number>> = {
  bone: 0,
  ligament: 0.22,
  muscle: 0.48,
  vessel: 0.72,
  nerve: 1,
};

export function clampExplodeAmount(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_EXPLODE_AMOUNT;
  return Math.min(EXPLODE_AMOUNT_MAX, Math.max(EXPLODE_AMOUNT_MIN, value));
}

/** Missing / invalid → assembled 0 (compat with earlier teachingPrefs). */
export function parseExplodeAmount(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return DEFAULT_EXPLODE_AMOUNT;
  return clampExplodeAmount(value);
}

export function isAssembledExplode(amount: number, eps = 0.04): boolean {
  return clampExplodeAmount(amount) <= eps;
}

export function isExplodePreset(amount: number, eps = 0.04): boolean {
  return Math.abs(clampExplodeAmount(amount) - EXPLODE_PRESET_AMOUNT) <= eps;
}

/** E-key toggle: teaching preset ↔ assembled (0). Custom sliders still round-trip. */
export function toggleExplodeAmount(current: number): number {
  return isAssembledExplode(current) ? EXPLODE_PRESET_AMOUNT : DEFAULT_EXPLODE_AMOUNT;
}

export function layerExplodeOffset(amount: number, layer: Layer): [number, number, number] {
  const t = clampExplodeAmount(amount);
  const y = LAYER_EXPLODE_FACTOR[layer] * t * EXPLODE_DISTANCE;
  return [0, y, 0];
}

export function isExplodeToggleKey(key: string): boolean {
  return key === 'e' || key === 'E';
}
