import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  TEACHING_PREFS_STORAGE_KEY,
  TEACHING_PREFS_VERSION,
  clearTeachingPrefs,
  defaultTeachingPrefs,
  isTeachingPrefs,
  loadTeachingPrefs,
  parseTeachingPrefs,
  saveTeachingPrefs,
} from './teachingPrefs';
import { getAllLayers } from './layers';
import { DEFAULT_LABEL_DENSITY } from './labelDensity';
import { DEFAULT_CLIP_CONSTANT, DEFAULT_CLIP_ENABLED, CLIP_CONSTANT_MIN } from './clipPlane';
import { DEFAULT_CAMERA_PRESET } from './cameraPresets';

describe('teachingPrefs', () => {
  beforeEach(() => {
    clearTeachingPrefs();
  });

  afterEach(() => {
    clearTeachingPrefs();
    vi.restoreAllMocks();
  });

  it('defaults match teaching UI boot state', () => {
    const d = defaultTeachingPrefs();
    expect(d.visibleLayers).toEqual(getAllLayers());
    expect(d.labelDensity).toBe(DEFAULT_LABEL_DENSITY);
    expect(d.clipEnabled).toBe(DEFAULT_CLIP_ENABLED);
    expect(d.clipConstant).toBe(DEFAULT_CLIP_CONSTANT);
    expect(d.cameraPresetId).toBe(DEFAULT_CAMERA_PRESET);
  });

  it('parses valid prefs and clamps clip constant', () => {
    const parsed = parseTeachingPrefs({
      visibleLayers: ['bone', 'muscle'],
      labelDensity: 'zh',
      clipEnabled: true,
      clipConstant: 0.1, // below min → clamp
      cameraPresetId: 'plantar',
    });
    expect(parsed).not.toBeNull();
    expect(parsed!.visibleLayers).toEqual(['bone', 'muscle']);
    expect(parsed!.labelDensity).toBe('zh');
    expect(parsed!.clipEnabled).toBe(true);
    expect(parsed!.clipConstant).toBe(CLIP_CONSTANT_MIN);
    expect(parsed!.cameraPresetId).toBe('plantar');
  });

  it('rejects invalid shapes', () => {
    expect(parseTeachingPrefs(null)).toBeNull();
    expect(parseTeachingPrefs({})).toBeNull();
    expect(
      parseTeachingPrefs({
        visibleLayers: ['bone'],
        labelDensity: 'nope',
        clipEnabled: false,
        clipConstant: 1,
        cameraPresetId: 'default',
      }),
    ).toBeNull();
    expect(
      parseTeachingPrefs({
        visibleLayers: 'bone',
        labelDensity: 'zh',
        clipEnabled: false,
        clipConstant: 1,
        cameraPresetId: 'default',
      }),
    ).toBeNull();
    expect(isTeachingPrefs(defaultTeachingPrefs())).toBe(true);
  });

  it('filters unknown layer ids but keeps empty visibility', () => {
    const parsed = parseTeachingPrefs({
      visibleLayers: ['bone', 'not-a-layer', 'nerve'],
      labelDensity: 'off',
      clipEnabled: false,
      clipConstant: 1.05,
      cameraPresetId: 'default',
    });
    expect(parsed!.visibleLayers).toEqual(['bone', 'nerve']);

    const empty = parseTeachingPrefs({
      visibleLayers: [],
      labelDensity: 'bilingual',
      clipEnabled: false,
      clipConstant: 1.05,
      cameraPresetId: 'medial',
    });
    expect(empty!.visibleLayers).toEqual([]);
  });

  it('round-trips through localStorage envelope', () => {
    const prefs = {
      visibleLayers: ['bone', 'ligament'] as const,
      labelDensity: 'zh' as const,
      clipEnabled: true,
      clipConstant: 1.2,
      cameraPresetId: 'lateral' as const,
    };
    expect(saveTeachingPrefs({ ...prefs, visibleLayers: [...prefs.visibleLayers] })).toBe(
      true,
    );
    const loaded = loadTeachingPrefs();
    expect(loaded).toEqual({
      visibleLayers: ['bone', 'ligament'],
      labelDensity: 'zh',
      clipEnabled: true,
      clipConstant: 1.2,
      cameraPresetId: 'lateral',
    });
    const raw = window.localStorage.getItem(TEACHING_PREFS_STORAGE_KEY);
    expect(raw).toBeTruthy();
    const env = JSON.parse(raw!);
    expect(env.v).toBe(TEACHING_PREFS_VERSION);
    expect(env.prefs.cameraPresetId).toBe('lateral');
  });

  it('returns null for corrupt JSON and wrong version payload without prefs', () => {
    window.localStorage.setItem(TEACHING_PREFS_STORAGE_KEY, '{not-json');
    expect(loadTeachingPrefs()).toBeNull();

    window.localStorage.setItem(
      TEACHING_PREFS_STORAGE_KEY,
      JSON.stringify({ v: 999, prefs: defaultTeachingPrefs() }),
    );
    // Unknown version: try bare parse of whole object → fails (has v/prefs, not prefs fields)
    expect(loadTeachingPrefs()).toBeNull();
  });

  it('accepts bare prefs object without envelope (compat)', () => {
    window.localStorage.setItem(
      TEACHING_PREFS_STORAGE_KEY,
      JSON.stringify({
        visibleLayers: ['vessel'],
        labelDensity: 'off',
        clipEnabled: false,
        clipConstant: 1.05,
        cameraPresetId: 'dorsal',
      }),
    );
    expect(loadTeachingPrefs()?.cameraPresetId).toBe('dorsal');
    expect(loadTeachingPrefs()?.visibleLayers).toEqual(['vessel']);
  });

  it('saveTeachingPrefs returns false when localStorage throws', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota');
    });
    expect(saveTeachingPrefs(defaultTeachingPrefs())).toBe(false);
    spy.mockRestore();
  });

  it('loadTeachingPrefs returns null when getItem throws', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied');
    });
    expect(loadTeachingPrefs()).toBeNull();
    spy.mockRestore();
  });
});
