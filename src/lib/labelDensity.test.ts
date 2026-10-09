import { describe, it, expect } from 'vitest';
import {
  DEFAULT_LABEL_DENSITY,
  LABEL_DENSITY_OPTIONS,
  isLabelDensity,
  shouldShowHoverLabel,
  showLatinInLabel,
} from './labelDensity';

describe('labelDensity', () => {
  it('defaults to bilingual teaching density', () => {
    expect(DEFAULT_LABEL_DENSITY).toBe('bilingual');
  });

  it('exposes three density options', () => {
    expect(LABEL_DENSITY_OPTIONS.map((o) => o.id)).toEqual(['off', 'zh', 'bilingual']);
  });

  it('validates density ids', () => {
    expect(isLabelDensity('off')).toBe(true);
    expect(isLabelDensity('zh')).toBe(true);
    expect(isLabelDensity('bilingual')).toBe(true);
    expect(isLabelDensity('dense')).toBe(false);
    expect(isLabelDensity(null)).toBe(false);
  });

  it('hides hover labels when off', () => {
    expect(shouldShowHoverLabel('off')).toBe(false);
    expect(shouldShowHoverLabel('zh')).toBe(true);
    expect(shouldShowHoverLabel('bilingual')).toBe(true);
  });

  it('shows Latin only in bilingual mode', () => {
    expect(showLatinInLabel('off')).toBe(false);
    expect(showLatinInLabel('zh')).toBe(false);
    expect(showLatinInLabel('bilingual')).toBe(true);
  });
});
