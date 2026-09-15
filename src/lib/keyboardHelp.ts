/**
 * Keyboard shortcut catalog for the teaching viewer help overlay.
 * UX-borrow (ideas only): Open Anatomy Studio / BioLens shortcut sheets;
 * GraphAnatomy isolate key habit; undergravity/human-atlas per-structure hide. No third-party UI code copied.
 */

export interface KeyboardShortcut {
  /** Display key chord(s), e.g. "I" or "1–5". */
  keys: string;
  labelZh: string;
  labelEn: string;
  /** Optional detail for teaching context. */
  note?: string;
}

/** Ordered groups shown in the help overlay. */
export interface KeyboardShortcutGroup {
  id: string;
  titleZh: string;
  titleEn: string;
  shortcuts: ReadonlyArray<KeyboardShortcut>;
}

export const KEYBOARD_HELP_GROUPS: ReadonlyArray<KeyboardShortcutGroup> = [
  {
    id: 'navigation',
    titleZh: '视角 · Camera',
    titleEn: 'Camera',
    shortcuts: [
      {
        keys: '1',
        labelZh: '默认斜视',
        labelEn: 'Default oblique',
      },
      {
        keys: '2',
        labelZh: '背侧',
        labelEn: 'Dorsal',
      },
      {
        keys: '3',
        labelZh: '跖侧（足底）',
        labelEn: 'Plantar (sole)',
      },
      {
        keys: '4',
        labelZh: '内侧',
        labelEn: 'Medial',
      },
      {
        keys: '5',
        labelZh: '外侧',
        labelEn: 'Lateral',
      },
      {
        keys: '0 / Home',
        labelZh: '复位当前教学视角',
        labelEn: 'Reset current teaching view',
        note: 'Re-applies the active preset after free orbit (Auckland LL visualiser reset habit — ideas only)',
      },
    ],
  },
  {
    id: 'selection',
    titleZh: '选择 · Selection',
    titleEn: 'Selection',
    shortcuts: [
      {
        keys: 'I',
        labelZh: '隔离 / 退出隔离',
        labelEn: 'Toggle isolate',
        note: 'Requires a selected structure',
      },
      {
        keys: 'X',
        labelZh: '隐藏 / 恢复当前结构',
        labelEn: 'Hide / reveal this structure',
        note: 'Per-structure dissection hide (beyond isolate)',
      },
      {
        keys: 'Esc',
        labelZh: '取消选择 · 退出隔离 · 清空搜索',
        labelEn: 'Clear selection, isolate, search',
        note:
          'Closes help first if open. Does NOT clear per-structure hides (X) — those persist in localStorage; use chip bar / Restore all',
      },
    ],
  },
  {
    id: 'help',
    titleZh: '帮助 · Help',
    titleEn: 'Help',
    shortcuts: [
      {
        keys: '? / H',
        labelZh: '打开 / 关闭本快捷键说明',
        labelEn: 'Toggle this keyboard help overlay',
      },
    ],
  },
  {
    id: 'mouse',
    titleZh: '鼠标 · Pointer',
    titleEn: 'Pointer',
    shortcuts: [
      {
        keys: '拖动',
        labelZh: '旋转',
        labelEn: 'Orbit rotate',
      },
      {
        keys: '滚轮',
        labelZh: '缩放',
        labelEn: 'Zoom',
      },
      {
        keys: '右键拖动',
        labelZh: '平移',
        labelEn: 'Pan',
      },
      {
        keys: '点击',
        labelZh: '选中并对焦',
        labelEn: 'Select + camera focus',
      },
    ],
  },
];

/** Keys that open/close the help overlay (when not typing in an input). */
export function isHelpToggleKey(key: string): boolean {
  return key === '?' || key === 'h' || key === 'H';
}

/** Flat shortcut count for tests / UI badge. */
export function countKeyboardShortcuts(): number {
  return KEYBOARD_HELP_GROUPS.reduce((n, g) => n + g.shortcuts.length, 0);
}
