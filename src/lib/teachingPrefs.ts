/**
 * Persist teaching UI prefs in localStorage (layer visibility, label density,
 * sagittal clip on/off+position, last camera preset).
 * UX-borrow (ideas only): Open Anatomy Studio local progress / favorites habit.
 * No third-party code copied.
 *
 * SSR / test safety: never touch storage unless `window.localStorage` exists;
 * corrupt or partial payloads fall back to defaults (never throw into React).
 */
import type { Layer } from '../types/anatomy';
import { getAllLayers } from './layers';
import {
  DEFAULT_LABEL_DENSITY,
  isLabelDensity,
  type LabelDensity,
} from './labelDensity';
import {
  DEFAULT_CLIP_CONSTANT,
  DEFAULT_CLIP_ENABLED,
  clampClipConstant,
} from './clipPlane';
import {
  DEFAULT_CAMERA_PRESET,
  isCameraPresetId,
  type CameraPresetId,
} from './cameraPresets';

/** Bump when the stored shape changes incompatibly. */
export const TEACHING_PREFS_VERSION = 1 as const;

export const TEACHING_PREFS_STORAGE_KEY = 'right-foot-atlas:teaching-prefs:v1';

export interface TeachingPrefs {
  visibleLayers: Layer[];
  labelDensity: LabelDensity;
  clipEnabled: boolean;
  clipConstant: number;
  cameraPresetId: CameraPresetId;
}

interface TeachingPrefsEnvelope {
  v: typeof TEACHING_PREFS_VERSION;
  prefs: TeachingPrefs;
}

const LAYER_SET = new Set<string>(getAllLayers());

export function defaultTeachingPrefs(): TeachingPrefs {
  return {
    visibleLayers: [...getAllLayers()],
    labelDensity: DEFAULT_LABEL_DENSITY,
    clipEnabled: DEFAULT_CLIP_ENABLED,
    clipConstant: DEFAULT_CLIP_CONSTANT,
    cameraPresetId: DEFAULT_CAMERA_PRESET,
  };
}

function isLayer(value: unknown): value is Layer {
  return typeof value === 'string' && LAYER_SET.has(value);
}

/** Validate + normalize a prefs object; returns null if unusable. */
export function parseTeachingPrefs(value: unknown): TeachingPrefs | null {
  if (!value || typeof value !== 'object') return null;
  const raw = value as Record<string, unknown>;

  let visibleLayers: Layer[];
  if (Array.isArray(raw.visibleLayers)) {
    visibleLayers = raw.visibleLayers.filter(isLayer);
    // Deduplicate while preserving order
    visibleLayers = [...new Set(visibleLayers)];
  } else {
    return null;
  }

  if (!isLabelDensity(raw.labelDensity)) return null;
  if (typeof raw.clipEnabled !== 'boolean') return null;
  if (typeof raw.clipConstant !== 'number' || !Number.isFinite(raw.clipConstant)) {
    return null;
  }
  if (!isCameraPresetId(raw.cameraPresetId)) return null;

  return {
    visibleLayers,
    labelDensity: raw.labelDensity,
    clipEnabled: raw.clipEnabled,
    clipConstant: clampClipConstant(raw.clipConstant),
    cameraPresetId: raw.cameraPresetId,
  };
}

export function isTeachingPrefs(value: unknown): value is TeachingPrefs {
  return parseTeachingPrefs(value) !== null;
}

function getLocalStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    // Access denied / opaque origin
    return null;
  }
}

/**
 * Load prefs from localStorage. Returns null when unavailable, empty, or invalid
 * (caller should use `defaultTeachingPrefs()`).
 */
export function loadTeachingPrefs(): TeachingPrefs | null {
  const store = getLocalStorage();
  if (!store) return null;
  let raw: string | null;
  try {
    raw = store.getItem(TEACHING_PREFS_STORAGE_KEY);
  } catch {
    return null;
  }
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    const env = parsed as Record<string, unknown>;
    // Accept envelope `{ v, prefs }` or a bare prefs object (forward-compat).
    if (env.v === TEACHING_PREFS_VERSION && env.prefs !== undefined) {
      return parseTeachingPrefs(env.prefs);
    }
    return parseTeachingPrefs(parsed);
  } catch {
    return null;
  }
}

/** Persist prefs. Returns false if storage is unavailable or write fails. */
export function saveTeachingPrefs(prefs: TeachingPrefs): boolean {
  const normalized = parseTeachingPrefs(prefs);
  if (!normalized) return false;
  const store = getLocalStorage();
  if (!store) return false;
  const envelope: TeachingPrefsEnvelope = {
    v: TEACHING_PREFS_VERSION,
    prefs: normalized,
  };
  try {
    store.setItem(TEACHING_PREFS_STORAGE_KEY, JSON.stringify(envelope));
    return true;
  } catch {
    return false;
  }
}

/** Remove stored prefs (tests / reset). Safe no-op when storage missing. */
export function clearTeachingPrefs(): void {
  const store = getLocalStorage();
  if (!store) return;
  try {
    store.removeItem(TEACHING_PREFS_STORAGE_KEY);
  } catch {
    // ignore
  }
}
