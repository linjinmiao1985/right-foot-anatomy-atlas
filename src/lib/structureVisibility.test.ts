import { describe, it, expect } from 'vitest';
import {
  toggleHiddenStructureId,
  revealStructureId,
  revealAllHiddenStructures,
  isStructureHidden,
} from './structureVisibility';

describe('structureVisibility', () => {
  it('toggles hide on and off', () => {
    const a = toggleHiddenStructureId(new Set(), 'talus');
    expect(a.has('talus')).toBe(true);
    const b = toggleHiddenStructureId(a, 'talus');
    expect(b.has('talus')).toBe(false);
  });

  it('reveal removes one id without mutating input', () => {
    const input = new Set(['talus', 'calcaneus']);
    const next = revealStructureId(input, 'talus');
    expect(next.has('talus')).toBe(false);
    expect(next.has('calcaneus')).toBe(true);
    expect(input.has('talus')).toBe(true);
  });

  it('revealAll returns empty set', () => {
    expect(revealAllHiddenStructures().size).toBe(0);
  });

  it('isStructureHidden respects undefined', () => {
    expect(isStructureHidden(undefined, 'talus')).toBe(false);
    expect(isStructureHidden(new Set(['talus']), 'talus')).toBe(true);
  });
});
