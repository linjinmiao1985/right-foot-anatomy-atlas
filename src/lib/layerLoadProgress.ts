/**
 * Helpers for lazy-layer GLB load progress chrome.
 * UX-borrow (ideas only): undergravity/human-atlas two-phase system load habit —
 * show honest progress when soft layers fetch GLBs. No third-party UI code copied.
 */

import type { Layer } from '../types/anatomy';
import { LAYER_CONFIG } from './layers';

/** Infer teaching layer from a loading asset URL / path (best-effort). */
export function inferLayerFromAssetItem(item: string | undefined | null): Layer | null {
  if (!item) return null;
  const path = item.toLowerCase();
  if (path.includes('/muscles/') || path.includes('/muscle/')) return 'muscle';
  if (path.includes('/nerves/') || path.includes('/nerve/')) return 'nerve';
  if (path.includes('/vessels/') || path.includes('/vessel/')) return 'vessel';
  if (path.includes('/ligaments/') || path.includes('/ligament/')) return 'ligament';
  if (path.includes('/bones/') || path.includes('/bone/')) return 'bone';
  // ShareAlike soft packs live under by-sa/ — still a soft teaching layer load
  if (path.includes('/by-sa/')) {
    if (path.includes('nerve')) return 'nerve';
    if (path.includes('artery') || path.includes('vein') || path.includes('arch')) return 'vessel';
    if (path.includes('ligament') || path.includes('retinaculum') || path.includes('fascia') || path.includes('achilles') || path.includes('tendon')) {
      return 'ligament';
    }
    if (
      path.includes('interosse') ||
      path.includes('fibularis') ||
      path.includes('plantaris') ||
      path.includes('opponens') ||
      path.includes('flexor') ||
      path.includes('extensor') ||
      path.includes('abductor') ||
      path.includes('adductor')
    ) {
      return 'muscle';
    }
  }
  return null;
}

export interface LayerLoadProgressView {
  /** 0–100 clamped percent for the bar / aria. */
  percent: number;
  /** Short bilingual headline. */
  headlineZh: string;
  headlineEn: string;
  /** Optional layer chip when URL maps cleanly. */
  layerLabelZh: string | null;
  layerLabelEn: string | null;
  /** Detail line: loaded/total + truncated item. */
  detail: string;
  /** True when DefaultLoadingManager reports active work. */
  shouldShow: boolean;
}

function truncateItem(item: string, max = 48): string {
  if (item.length <= max) return item;
  return `…${item.slice(-(max - 1))}`;
}

/**
 * Build bilingual teaching chrome for lazy layer loads.
 * Shows only while `active` and `total > 0` (avoids idle 100% flash).
 */
export function formatLayerLoadProgress(input: {
  active: boolean;
  progress: number;
  loaded: number;
  total: number;
  item?: string | null;
}): LayerLoadProgressView {
  const total = Math.max(0, input.total | 0);
  const loaded = Math.max(0, Math.min(input.loaded | 0, total || input.loaded | 0));
  const raw = Number.isFinite(input.progress) ? input.progress : 0;
  const percent = Math.max(0, Math.min(100, Math.round(raw)));
  const layer = inferLayerFromAssetItem(input.item);
  const layerCfg = layer ? LAYER_CONFIG[layer] : null;
  const shouldShow = Boolean(input.active && total > 0);

  return {
    percent,
    headlineZh: '图层资源加载中',
    headlineEn: 'Loading layer assets',
    layerLabelZh: layerCfg?.label ?? null,
    layerLabelEn: layerCfg?.labelEn ?? null,
    detail:
      total > 0
        ? `${loaded}/${total}${input.item ? ` · ${truncateItem(input.item)}` : ''}`
        : input.item
          ? truncateItem(input.item)
          : '',
    shouldShow,
  };
}
