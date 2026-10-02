/**
 * Teaching quiz-mode stub — hide names so students identify from mesh + layer.
 *
 * UX-borrow (ideas only): Grypa-JJ anatomy-atlas-3d quiz / pin-point habit;
 * MedicalPlab tutor→viewport. No third-party UI or quiz-bank code copied.
 *
 * Teaching self-test chrome only — **not** Anki / exam / finished product.
 */

export const DEFAULT_QUIZ_MODE = false;

export const QUIZ_HIDDEN_NAME_ZH = '？ · 测验';
export const QUIZ_HIDDEN_NAME_LA = 'Quiz stub — name hidden';

/** Missing / invalid → quiz off (compat with earlier teachingPrefs). */
export function parseQuizMode(value: unknown): boolean {
  return value === true;
}

export function isQuizToggleKey(key: string): boolean {
  return key === 'q' || key === 'Q';
}

export function toggleQuizMode(current: boolean): boolean {
  return !current;
}

export function quizDisplayNames(
  quizMode: boolean,
  nameZh: string,
  nameLa: string,
): { nameZh: string; nameLa: string } {
  if (!quizMode) return { nameZh, nameLa };
  return { nameZh: QUIZ_HIDDEN_NAME_ZH, nameLa: QUIZ_HIDDEN_NAME_LA };
}
