import { describe, it, expect } from 'vitest';
import {
  formatLayerLoadProgress,
  inferLayerFromAssetItem,
} from './layerLoadProgress';

describe('layerLoadProgress', () => {
  it('infers layers from main-tree and by-sa paths', () => {
    expect(inferLayerFromAssetItem('/models/right-foot/muscles/abductor_hallucis.glb')).toBe(
      'muscle',
    );
    expect(inferLayerFromAssetItem('/models/right-foot/nerves/tibial_nerve.glb')).toBe('nerve');
    expect(inferLayerFromAssetItem('/models/right-foot/vessels/dorsalis_pedis_artery.glb')).toBe(
      'vessel',
    );
    expect(inferLayerFromAssetItem('/models/right-foot/ligaments/long_plantar_ligament.glb')).toBe(
      'ligament',
    );
    expect(inferLayerFromAssetItem('/models/right-foot/bones/calcaneus.glb')).toBe('bone');
    expect(inferLayerFromAssetItem('/models/right-foot/by-sa/tibial_nerve.glb')).toBe('nerve');
    expect(inferLayerFromAssetItem('/models/right-foot/by-sa/dorsal_interosseous_1st.glb')).toBe(
      'muscle',
    );
    expect(inferLayerFromAssetItem('/models/right-foot/by-sa/posterior_tibial_artery.glb')).toBe(
      'vessel',
    );
    expect(inferLayerFromAssetItem('/models/right-foot/by-sa/achilles_tendon.glb')).toBe(
      'ligament',
    );
    expect(inferLayerFromAssetItem(null)).toBeNull();
    expect(inferLayerFromAssetItem('/unknown/thing.bin')).toBeNull();
  });

  it('formats bilingual progress and hides when idle', () => {
    const idle = formatLayerLoadProgress({
      active: false,
      progress: 100,
      loaded: 10,
      total: 10,
      item: '/models/right-foot/muscles/x.glb',
    });
    expect(idle.shouldShow).toBe(false);

    const active = formatLayerLoadProgress({
      active: true,
      progress: 42.6,
      loaded: 3,
      total: 7,
      item: '/models/right-foot/by-sa/tibial_nerve.glb',
    });
    expect(active.shouldShow).toBe(true);
    expect(active.percent).toBe(43);
    expect(active.headlineZh).toMatch(/图层/);
    expect(active.headlineEn).toMatch(/Loading layer/i);
    expect(active.layerLabelEn).toBe('Nerve');
    expect(active.layerLabelZh).toBe('神经');
    expect(active.detail).toMatch(/^3\/7/);
  });

  it('clamps percent and handles empty total', () => {
    const over = formatLayerLoadProgress({
      active: true,
      progress: 140,
      loaded: 0,
      total: 0,
      item: 'x',
    });
    expect(over.percent).toBe(100);
    expect(over.shouldShow).toBe(false);
  });
});
