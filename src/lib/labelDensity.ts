/**
 * Bilingual hover-label density — UX-borrow (ideas only) from
 * Open Anatomy Studio bilingual chrome + BioLens / LABIM3D label clarity.
 * No third-party UI code copied.
 */
export type LabelDensity = 'off' | 'zh' | 'bilingual';

export const LABEL_DENSITY_OPTIONS: ReadonlyArray<{
  id: LabelDensity;
  labelZh: string;
  labelEn: string;
  title: string;
}> = [
  { id: 'off', labelZh: '关', labelEn: 'Off', title: 'Hide hover labels' },
  { id: 'zh', labelZh: '中文', labelEn: 'ZH', title: 'Chinese name only' },
  {
    id: 'bilingual',
    labelZh: '中+拉',
    labelEn: 'ZH+LA',
    title: 'Chinese + Latin (default teaching density)',
  },
];

export const DEFAULT_LABEL_DENSITY: LabelDensity = 'bilingual';

export function isLabelDensity(value: unknown): value is LabelDensity {
  return value === 'off' || value === 'zh' || value === 'bilingual';
}

/** Whether viewport hover Html chips should mount. */
export function shouldShowHoverLabel(density: LabelDensity): boolean {
  return density !== 'off';
}

/** Whether the Latin / scientific line appears under the Chinese name. */
export function showLatinInLabel(density: LabelDensity): boolean {
  return density === 'bilingual';
}
