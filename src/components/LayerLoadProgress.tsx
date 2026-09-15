import { useProgress } from '@react-three/drei';
import { formatLayerLoadProgress } from '../lib/layerLoadProgress';

/**
 * Teaching overlay for visibility-gated / lazy GLB layer loads.
 * Reads drei DefaultLoadingManager progress (works outside Canvas).
 * Honesty: asset fetch chrome only — not a clinical workstation claim.
 */
export default function LayerLoadProgress() {
  const { active, progress, loaded, total, item } = useProgress();
  const view = formatLayerLoadProgress({ active, progress, loaded, total, item });

  if (!view.shouldShow) return null;

  return (
    <div
      data-testid="layer-load-progress"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={`${view.headlineEn}${view.layerLabelEn ? ` — ${view.layerLabelEn}` : ''}: ${view.percent}%`}
      style={{
        position: 'fixed',
        top: '72px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 120,
        minWidth: '240px',
        maxWidth: 'min(420px, 92vw)',
        padding: '10px 14px',
        background: 'rgba(17, 24, 39, 0.92)',
        border: '1px solid #4b5563',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        color: '#e5e7eb',
        fontFamily: 'system-ui, sans-serif',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: '12px',
          marginBottom: '6px',
          fontSize: '12px',
          fontWeight: 600,
        }}
      >
        <span>
          {view.headlineZh}
          <span style={{ color: '#9ca3af', fontWeight: 500 }}> · {view.headlineEn}</span>
          {view.layerLabelZh ? (
            <span
              data-testid="layer-load-progress-layer"
              style={{
                marginLeft: '8px',
                padding: '1px 6px',
                background: '#312e81',
                color: '#e0e7ff',
                borderRadius: '3px',
                fontSize: '10px',
                fontWeight: 700,
              }}
            >
              {view.layerLabelZh}
              {view.layerLabelEn ? ` · ${view.layerLabelEn}` : ''}
            </span>
          ) : null}
        </span>
        <span style={{ fontVariantNumeric: 'tabular-nums', color: '#a5b4fc' }}>{view.percent}%</span>
      </div>
      <div
        style={{
          height: '6px',
          background: '#1f2937',
          borderRadius: '999px',
          overflow: 'hidden',
          marginBottom: '6px',
        }}
      >
        <div
          data-testid="layer-load-progress-bar"
          style={{
            width: `${view.percent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
            transition: 'width 120ms linear',
          }}
        />
      </div>
      {view.detail ? (
        <div
          style={{
            fontSize: '10px',
            color: '#9ca3af',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          title={view.detail}
        >
          {view.detail}
        </div>
      ) : null}
    </div>
  );
}
