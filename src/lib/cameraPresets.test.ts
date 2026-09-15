import { describe, it, expect } from 'vitest';
import {
  CAMERA_PRESETS,
  DEFAULT_CAMERA_PRESET,
  FOOT_TEACHING_TARGET,
  cameraPresetFromDigitKey,
  getCameraPreset,
  isCameraPresetId,
  isViewResetKey,
} from './cameraPresets';

describe('cameraPresets', () => {
  it('defaults to legacy overview', () => {
    expect(DEFAULT_CAMERA_PRESET).toBe('default');
  });

  it('exposes five teaching presets', () => {
    expect(CAMERA_PRESETS.map((p) => p.id)).toEqual([
      'default',
      'dorsal',
      'plantar',
      'medial',
      'lateral',
    ]);
  });

  it('validates preset ids', () => {
    expect(isCameraPresetId('plantar')).toBe(true);
    expect(isCameraPresetId('oblique')).toBe(false);
    expect(isCameraPresetId(null)).toBe(false);
  });

  it('returns preset with finite position/target', () => {
    for (const p of CAMERA_PRESETS) {
      expect(p.position).toHaveLength(3);
      expect(p.target).toHaveLength(3);
      expect(p.position.every(Number.isFinite)).toBe(true);
      expect(p.target.every(Number.isFinite)).toBe(true);
    }
  });

  it('uses midfoot teaching target for anatomical views', () => {
    expect(getCameraPreset('dorsal').target).toEqual([...FOOT_TEACHING_TARGET]);
    expect(getCameraPreset('plantar').target).toEqual([...FOOT_TEACHING_TARGET]);
    expect(getCameraPreset('medial').target).toEqual([...FOOT_TEACHING_TARGET]);
    expect(getCameraPreset('lateral').target).toEqual([...FOOT_TEACHING_TARGET]);
  });

  it('places dorsal above and plantar below midfoot Z', () => {
    const z = FOOT_TEACHING_TARGET[2];
    expect(getCameraPreset('dorsal').position[2]).toBeGreaterThan(z);
    expect(getCameraPreset('plantar').position[2]).toBeLessThan(z);
  });

  it('places medial at higher X than lateral', () => {
    expect(getCameraPreset('medial').position[0]).toBeGreaterThan(
      getCameraPreset('lateral').position[0],
    );
  });

  it('maps digit keys 1–5 to presets', () => {
    expect(cameraPresetFromDigitKey('1')).toBe('default');
    expect(cameraPresetFromDigitKey('2')).toBe('dorsal');
    expect(cameraPresetFromDigitKey('3')).toBe('plantar');
    expect(cameraPresetFromDigitKey('4')).toBe('medial');
    expect(cameraPresetFromDigitKey('5')).toBe('lateral');
    expect(cameraPresetFromDigitKey('6')).toBeNull();
    expect(cameraPresetFromDigitKey('a')).toBeNull();
  });
});

  it('recognizes view-reset keys (Auckland reset habit)', () => {
    expect(isViewResetKey('0')).toBe(true);
    expect(isViewResetKey('Home')).toBe(true);
    expect(isViewResetKey('1')).toBe(false);
    expect(isViewResetKey('r')).toBe(false);
    expect(isViewResetKey('Escape')).toBe(false);
  });

