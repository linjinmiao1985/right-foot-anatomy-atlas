import { useEffect, useRef } from 'react';
import { KEYBOARD_HELP_GROUPS } from '../lib/keyboardHelp';

interface KeyboardHelpOverlayProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Teaching keyboard / pointer help overlay.
 * Accessibility: role=dialog, aria-modal, Escape closes via parent, focus close button on open.
 * All interactive controls support keyboard navigation via focus-visible outlines (see index.css).
 */
export default function KeyboardHelpOverlay({ open, onClose }: KeyboardHelpOverlayProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0, 0, 0, 0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="keyboard-help-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'rgba(26, 26, 26, 0.98)',
          border: '1px solid #555',
          borderRadius: '10px',
          padding: '20px 22px',
          maxWidth: '520px',
          width: '100%',
          maxHeight: 'min(80vh, 640px)',
          overflowY: 'auto',
          boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '12px',
            marginBottom: '14px',
          }}
        >
          <div>
            <h2
              id="keyboard-help-title"
              style={{ margin: 0, fontSize: '17px', fontWeight: 600, color: '#e5e7eb' }}
            >
              快捷键 · Keyboard help
            </h2>
            <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#9ca3af', lineHeight: 1.4 }}>
              Teaching viewer controls — not a clinical workstation claim. Panel toggles
              (layers / labels / clip) remain mouse-first.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="关闭快捷键说明 Close help"
            style={{
              background: '#333',
              border: '1px solid #555',
              color: '#e0e0e0',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '13px',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            Esc / ×
          </button>
        </div>

        {KEYBOARD_HELP_GROUPS.map((group) => (
          <section key={group.id} style={{ marginBottom: '14px' }} aria-label={group.titleEn}>
            <h3
              style={{
                margin: '0 0 8px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#a78bfa',
                letterSpacing: '0.02em',
              }}
            >
              {group.titleZh}
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {group.shortcuts.map((s) => (
                <li
                  key={`${group.id}-${s.keys}`}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '12px',
                    padding: '5px 0',
                    borderBottom: '1px solid #2a2a2a',
                    fontSize: '12px',
                  }}
                >
                  <kbd
                    style={{
                      display: 'inline-block',
                      minWidth: '72px',
                      padding: '2px 7px',
                      background: '#1f2937',
                      border: '1px solid #4b5563',
                      borderRadius: '4px',
                      color: '#f3f4f6',
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      fontSize: '11px',
                      textAlign: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {s.keys}
                  </kbd>
                  <span style={{ color: '#d1d5db', lineHeight: 1.4 }}>
                    {s.labelZh}
                    <span style={{ color: '#9ca3af' }}> · {s.labelEn}</span>
                    {s.note ? (
                      <span style={{ display: 'block', color: '#6b7280', fontSize: '11px' }}>
                        {s.note}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p style={{ margin: '4px 0 0', fontSize: '10px', color: '#6b7280', lineHeight: 1.4 }}>
          Tip: press <kbd style={{ color: '#d1d5db' }}>?</kbd> or{' '}
          <kbd style={{ color: '#d1d5db' }}>H</kbd> anytime (except while typing in search).
          Panel controls (master ghost opacity, per-layer sliders, clip position) are mouse/Tab accessible.
        </p>
      </div>
    </div>
  );
}
