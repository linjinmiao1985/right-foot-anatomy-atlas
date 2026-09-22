import { describe, it, expect } from 'vitest';
import {
  DEFAULT_QUIZ_MODE,
  QUIZ_HIDDEN_NAME_LA,
  QUIZ_HIDDEN_NAME_ZH,
  isQuizToggleKey,
  parseQuizMode,
  quizDisplayNames,
  toggleQuizMode,
} from './quizMode';

describe('quizMode (teaching stub)', () => {
  it('defaults off', () => {
    expect(DEFAULT_QUIZ_MODE).toBe(false);
    expect(parseQuizMode(undefined)).toBe(false);
    expect(parseQuizMode(null)).toBe(false);
    expect(parseQuizMode('true')).toBe(false);
    expect(parseQuizMode(1)).toBe(false);
  });

  it('parses only boolean true as on', () => {
    expect(parseQuizMode(true)).toBe(true);
    expect(parseQuizMode(false)).toBe(false);
  });

  it('toggles Q-key and mode', () => {
    expect(isQuizToggleKey('q')).toBe(true);
    expect(isQuizToggleKey('Q')).toBe(true);
    expect(isQuizToggleKey('g')).toBe(false);
    expect(isQuizToggleKey('e')).toBe(false);
    expect(toggleQuizMode(false)).toBe(true);
    expect(toggleQuizMode(true)).toBe(false);
  });

  it('masks bilingual names only when quiz is on', () => {
    const shown = quizDisplayNames(false, '跟骨', 'Calcaneus');
    expect(shown).toEqual({ nameZh: '跟骨', nameLa: 'Calcaneus' });
    const hidden = quizDisplayNames(true, '跟骨', 'Calcaneus');
    expect(hidden.nameZh).toBe(QUIZ_HIDDEN_NAME_ZH);
    expect(hidden.nameLa).toBe(QUIZ_HIDDEN_NAME_LA);
    expect(hidden.nameZh).not.toMatch(/跟骨/);
    expect(hidden.nameLa).not.toMatch(/Calcaneus/i);
  });
});
