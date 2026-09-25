/**
 * Persist teaching UI prefs in localStorage (layer visibility, label density,
 * sagittal clip on/off+position, last camera preset, per-structure hidden ids,
 * per-layer ghost/透视 opacity, teaching explode / 抽出 amount,
 * teaching quiz-mode stub).
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
import {
  defaultLayerOpacities,
  parseLayerOpacities,
  DEFAULT_MASTER_GHOST_OPACITY,
  clampMasterGhostOpacity,
} from './layerOpacity';
import {
  DEFAULT_EXPLODE_AMOUNT,
  parseExplodeAmount,
} from './layerExplode';
import { DEFAULT_QUIZ_MODE, parseQuizMode } from './quizMode';

/** Bump when the stored shape changes incompatibly. */
export const TEACHING_PREFS_VERSION = 1 as const;

export const TEACHING_PREFS_STORAGE_KEY = 'right-foot-atlas:teaching-prefs:v1';

export interface TeachingPrefs {
  visibleLayers: Layer[];
  labelDensity: LabelDensity;
  clipEnabled: boolean;
  clipConstant: number;
  cameraPresetId: CameraPresetId;
  /** Structure ids hidden via per-structure dissection hide (X). */
  hiddenStructureIds: string[];
  /** Per-layer mesh opacity (教学透视 / ghost). Missing → solid 1. */
  layerOpacities: Record<Layer, number>;
  /** Teaching explode / 抽出 (0 assembled → 1 max peel). Missing → 0. */
  explodeAmount: number;
  /** Teaching quiz-mode stub (hide names). Missing → false. */
  quizMode: boolean;
  /** Master ghost opacity multiplier (scales all non-bone layers). Missing → 1. */
  masterGhostOpacity: number;
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
    hiddenStructureIds: [],
    layerOpacities: defaultLayerOpacities(),
    explodeAmount: DEFAULT_EXPLODE_AMOUNT,
    quizMode: DEFAULT_QUIZ_MODE,
    masterGhostOpacity: DEFAULT_MASTER_GHOST_OPACITY,
  };
}

function isLayer(value: unknown): value is Layer {
  return typeof value === 'string' && LAYER_SET.has(value);
}

/** Normalize hidden structure id list; missing/invalid → empty (compat with v1 prefs). */
export function parseHiddenStructureIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const out: string[] = [];
  const seen = new Set<string>();
  for (const item of value) {
    if (typeof item !== 'string') continue;
    const id = item.trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
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

  // hiddenStructureIds / layerOpacities / explodeAmount / quizMode / masterGhostOpacity optional for backward compat
  const hiddenStructureIds = parseHiddenStructureIds(raw.hiddenStructureIds);
  const layerOpacities = parseLayerOpacities(raw.layerOpacities);
  const explodeAmount = parseExplodeAmount(raw.explodeAmount);
  const quizMode = parseQuizMode(raw.quizMode);
  const masterGhostOpacity =
    typeof raw.masterGhostOpacity === 'number' && Number.isFinite(raw.masterGhostOpacity)
      ? clampMasterGhostOpacity(raw.masterGhostOpacity)
      : DEFAULT_MASTER_GHOST_OPACITY;

  return {
    visibleLayers,
    labelDensity: raw.labelDensity,
    clipEnabled: raw.clipEnabled,
    clipConstant: clampClipConstant(raw.clipConstant),
    cameraPresetId: raw.cameraPresetId,
    hiddenStructureIds,
    layerOpacities,
    explodeAmount,
    quizMode,
    masterGhostOpacity,
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
