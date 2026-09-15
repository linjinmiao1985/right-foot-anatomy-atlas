/**
 * Teaching camera view presets — dorsal / plantar / medial / lateral / default.
 * UX-borrow (ideas only): week-plan multi-view framing; Open Anatomy Studio /
 * Anatomy Atlas RU preset habit; FootNet multi-view naming (dorsal/medial/plantar).
 * No third-party camera code copied.
 *
 * BP3D right-foot axes (from bone centroids, scene = mm × 0.01):
 *   medial ≈ +X (hallux less negative X than little toe)
 *   distal / toes ≈ −Y
 *   dorsal ≈ +Z (talus higher Z than plantar surface)
 */
export type CameraPresetId =
  | 'default'
  | 'dorsal'
  | 'plantar'
  | 'medial'
  | 'lateral';

export interface CameraPreset {
  id: CameraPresetId;
  labelZh: string;
  labelEn: string;
  title: string;
  /** World-space camera position (scene units). */
  position: readonly [number, number, number];
  /** OrbitControls target (scene units). */
  target: readonly [number, number, number];
}

/** Midfoot teaching target from BP3D bone cluster (scene units). */
export const FOOT_TEACHING_TARGET = [-1.05, -1.3, -0.4] as const;

/** Legacy overview used since Phase 4 — kept as explicit “默认” preset. */
export const LEGACY_DEFAULT_POSITION = [1.2, 0.8, 1.5] as const;
export const LEGACY_DEFAULT_TARGET = [0, 0.15, 0] as const;

const T = FOOT_TEACHING_TARGET;
/** Comfortable teaching distance from midfoot (~2.85 scene units). */
const D = 2.85;

export const CAMERA_PRESETS: ReadonlyArray<CameraPreset> = [
  {
    id: 'default',
    labelZh: '默认',
    labelEn: 'Default',
    title: 'Legacy oblique overview (Phase 4 framing)',
    position: LEGACY_DEFAULT_POSITION,
    target: LEGACY_DEFAULT_TARGET,
  },
  {
    id: 'dorsal',
    labelZh: '背侧',
    labelEn: 'Dorsal',
    title: 'Look down onto dorsum (+Z)',
    position: [T[0], T[1] + 0.15, T[2] + D],
    target: T,
  },
  {
    id: 'plantar',
    labelZh: '跖侧',
    labelEn: 'Plantar',
    title: 'Look up at sole (−Z) — teaching sole view',
    position: [T[0], T[1] + 0.1, T[2] - D],
    target: T,
  },
  {
    id: 'medial',
    labelZh: '内侧',
    labelEn: 'Medial',
    title: 'Medial aspect (+X / hallux side)',
    position: [T[0] + D, T[1], T[2] + 0.35],
    target: T,
  },
  {
    id: 'lateral',
    labelZh: '外侧',
    labelEn: 'Lateral',
    title: 'Lateral aspect (−X / little-toe side)',
    position: [T[0] - D, T[1], T[2] + 0.35],
    target: T,
  },
];

export const DEFAULT_CAMERA_PRESET: CameraPresetId = 'default';

export function isCameraPresetId(value: unknown): value is CameraPresetId {
  return (
    value === 'default' ||
    value === 'dorsal' ||
    value === 'plantar' ||
    value === 'medial' ||
    value === 'lateral'
  );
}

export function getCameraPreset(id: CameraPresetId): CameraPreset {
  const found = CAMERA_PRESETS.find((p) => p.id === id);
  return found ?? CAMERA_PRESETS[0];
}

/** Digit keys 1–5 map to presets in CAMERA_PRESETS order (teaching shortcut). */
export function cameraPresetFromDigitKey(key: string): CameraPresetId | null {
  if (key.length !== 1 || key < '1' || key > '5') return null;
  const idx = Number(key) - 1;
  return CAMERA_PRESETS[idx]?.id ?? null;
}
