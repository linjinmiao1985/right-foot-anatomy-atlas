import { describe, it, expect } from 'vitest';
import {
  KEYBOARD_HELP_GROUPS,
  countKeyboardShortcuts,
  isHelpToggleKey,
} from './keyboardHelp';

describe('keyboardHelp', () => {
  it('exposes four teaching groups', () => {
    expect(KEYBOARD_HELP_GROUPS.map((g) => g.id)).toEqual([
      'navigation',
      'selection',
      'help',
      'mouse',
    ]);
  });

  it('lists camera presets 1–5', () => {
    const nav = KEYBOARD_HELP_GROUPS.find((g) => g.id === 'navigation');
    expect(nav?.shortcuts.map((s) => s.keys)).toEqual(['1', '2', '3', '4', '5']);
  });

  it('documents isolate and escape', () => {
    const sel = KEYBOARD_HELP_GROUPS.find((g) => g.id === 'selection');
    const keys = sel?.shortcuts.map((s) => s.keys) ?? [];
    expect(keys).toContain('I');
    expect(keys).toContain('Esc');
  });

  it('counts shortcuts', () => {
    expect(countKeyboardShortcuts()).toBeGreaterThanOrEqual(12);
  });

  it('recognizes help toggle keys', () => {
    expect(isHelpToggleKey('?')).toBe(true);
    expect(isHelpToggleKey('h')).toBe(true);
    expect(isHelpToggleKey('H')).toBe(true);
    expect(isHelpToggleKey('i')).toBe(false);
    expect(isHelpToggleKey('Escape')).toBe(false);
  });

  it('every shortcut has bilingual labels', () => {
    for (const g of KEYBOARD_HELP_GROUPS) {
      expect(g.titleZh.length).toBeGreaterThan(0);
      expect(g.titleEn.length).toBeGreaterThan(0);
      for (const s of g.shortcuts) {
        expect(s.keys.length).toBeGreaterThan(0);
        expect(s.labelZh.length).toBeGreaterThan(0);
        expect(s.labelEn.length).toBeGreaterThan(0);
      }
    }
  });
});
