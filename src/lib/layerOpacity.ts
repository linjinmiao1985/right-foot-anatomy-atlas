/**
 * Per-layer mesh opacity (教学透视 / ghost) — covering soft tissue can fade
 * so osteology stays readable underneath.
 *
 * UX-borrow (ideas only): Air-Sage 透视; Z-Anatomy Atlas (jaydenpcastro)
 * `G` ghost habit. No third-party UI or renderer code copied.
 *
 * Teaching cutaway chrome only — **not** clinical fluoroscopy / X-ray, **not**
 * a finished-product claim.
 */
import type { Layer } from '../types/anatomy';
import { getAllLayers } from './layers';

export const LAYER_OPACITY_MIN = 0.12;
export const LAYER_OPACITY_MAX = 1;
export const LAYER_OPACITY_STEP = 0.05;
export const DEFAULT_LAYER_OPACITY = 1;

/**
 * Ghost / 透视 preset: osteology solid; fade muscle / ligament / vessel so
 * bones remain visible. Nerves stay relatively opaque (thin teaching paths).
 */
export const GHOST_LAYER_OPACITY: Readonly<Record<Layer, number>> = {
  bone: 1,
  muscle: 0.28,
  nerve: 0.85,
  vessel: 0.42,
  ligament: 0.32,
};

export function clampLayerOpacity(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_LAYER_OPACITY;
  return Math.min(LAYER_OPACITY_MAX, Math.max(LAYER_OPACITY_MIN, value));
}

export function defaultLayerOpacities(): Record<Layer, number> {
  const out = {} as Record<Layer, number>;
  for (const layer of getAllLayers()) {
    out[layer] = DEFAULT_LAYER_OPACITY;
  }
  return out;
}

export function ghostLayerOpacities(): Record<Layer, number> {
  return { ...GHOST_LAYER_OPACITY };
}

/** Missing / invalid → solid defaults (compat with earlier teachingPrefs). */
export function parseLayerOpacities(value: unknown): Record<Layer, number> {
  const base = defaultLayerOpacities();
  if (!value || typeof value !== 'object' || Array.isArray(value)) return base;
  const raw = value as Record<string, unknown>;
  for (const layer of getAllLayers()) {
    const n = raw[layer];
    if (typeof n === 'number' && Number.isFinite(n)) {
      base[layer] = clampLayerOpacity(n);
    }
  }
  return base;
}

export function opacitiesNearlyEqual(
  a: Record<Layer, number>,
  b: Record<Layer, number>,
  eps = 0.02,
): boolean {
  for (const layer of getAllLayers()) {
    if (Math.abs((a[layer] ?? 1) - (b[layer] ?? 1)) > eps) return false;
  }
  return true;
}

export function isGhostLayerOpacities(opacities: Record<Layer, number>): boolean {
  return opacitiesNearlyEqual(opacities, GHOST_LAYER_OPACITY);
}

export function isSolidLayerOpacities(opacities: Record<Layer, number>): boolean {
  return opacitiesNearlyEqual(opacities, defaultLayerOpacities());
}

/** G-key toggle: ghost preset ↔ solid (all 1). Custom sliders still round-trip. */
export function toggleGhostLayerOpacities(
  current: Record<Layer, number>,
): Record<Layer, number> {
  return isGhostLayerOpacities(current)
    ? defaultLayerOpacities()
    : ghostLayerOpacities();
}

/** Multiply a mesh's local opacity (hover/select/dim) by the layer slider. */
export function composeLayerOpacity(baseOpacity: number, layerMul: number): number {
  const base = Number.isFinite(baseOpacity) ? Math.min(1, Math.max(0, baseOpacity)) : 1;
  const composed = base * clampLayerOpacity(layerMul);
  return Math.min(1, Math.max(0.02, composed));
}

export function opacityNeedsTransparency(opacity: number): boolean {
  return opacity < 0.999;
}

export function isGhostToggleKey(key: string): boolean {
  return key === 'g' || key === 'G';
}
