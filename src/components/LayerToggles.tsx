import type { CSSProperties } from 'react';
import type { Layer } from '../types/anatomy';
import { LAYER_CONFIG, getAllLayers } from '../lib/layers';

interface LayerTogglesProps {
  visibleLayers: Set<Layer>;
  onToggle: (layer: Layer) => void;
  onShowAll: () => void;
  onHideAll: () => void;
  placeholderCount: Record<Layer, number>;
  realCount: Record<Layer, number>;
}

/**
 * Layer panel + legend.
 * UX-borrow (no code copy): human-atlas / hpfrei type-filter counts;
 * BioLens visibility chrome; Open Anatomy Studio bilingual clarity.
 */
export default function LayerToggles({
  visibleLayers,
  onToggle,
  onShowAll,
  onHideAll,
  placeholderCount,
  realCount,
}: LayerTogglesProps) {
  const layers = getAllLayers();

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        background: 'rgba(26, 26, 26, 0.95)',
        border: '1px solid #444',
        borderRadius: '8px',
        padding: '16px',
        minWidth: '220px',
        zIndex: 100,
      }}
      role="region"
      aria-label="图层与图例"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#e0e0e0' }}>图层 · Layers</h3>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button type="button" onClick={onShowAll} style={quickBtnStyle} title="显示全部图层">
            全显
          </button>
          <button type="button" onClick={onHideAll} style={quickBtnStyle} title="隐藏全部图层">
            全隐
          </button>
        </div>
      </div>

      {layers.map((layer) => {
        const config = LAYER_CONFIG[layer];
        const isVisible = visibleLayers.has(layer);
        const placeholders = placeholderCount[layer] || 0;
        const reals = realCount[layer] || 0;

        return (
          <label
            key={layer}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            <input
              type="checkbox"
              checked={isVisible}
              onChange={() => onToggle(layer)}
              style={{ marginRight: '8px', cursor: 'pointer' }}
              aria-label={`${config.label} ${config.labelEn}`}
            />
            <div
              style={{
                width: '12px',
                height: '12px',
                background: config.color,
                borderRadius: '2px',
                marginRight: '8px',
                border: '1px solid #666',
                flexShrink: 0,
              }}
            />
            <span style={{ color: '#e0e0e0', flex: 1 }}>
              {config.label}
              <span style={{ color: '#888', fontSize: '11px', marginLeft: '4px' }}>{config.labelEn}</span>
            </span>
            <span
              style={{
                fontSize: '10px',
                color: '#9ca3af',
                fontVariantNumeric: 'tabular-nums',
                marginLeft: '6px',
              }}
              title="真实网格 / 占位"
            >
              {reals}
              {placeholders > 0 ? <span style={{ color: '#f59e0b' }}> · {placeholders}占</span> : null}
            </span>
          </label>
        );
      })}

      <div
        style={{
          marginTop: '8px',
          paddingTop: '10px',
          borderTop: '1px solid #333',
          fontSize: '10px',
          color: '#888',
          lineHeight: 1.5,
        }}
      >
        <div style={{ fontWeight: 600, color: '#aaa', marginBottom: '4px' }}>图例 · Legend</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
          <span style={legendChip('#22c55e')}>实</span>
          <span>真实网格（可点击）</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
          <span style={legendChip('#f59e0b')}>占</span>
          <span>占位示意（缺开源网格）</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
          <span style={legendChip('#a78bfa')}>SA</span>
          <span>BY-SA 隔离（神经 / DI / 近端动脉）</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={legendChip('#e8dcc8')}>韧/腱</span>
          <span>韧带/腱层（跖长韧带 + 跟腱；非完整软组织图谱）</span>
        </div>
        {visibleLayers.has('ligament') && (
          <div
            role="status"
            style={{
              marginTop: '8px',
              padding: '6px 8px',
              background: 'rgba(232, 220, 200, 0.12)',
              border: '1px solid rgba(232, 220, 200, 0.45)',
              borderRadius: '4px',
              color: '#d6d3d1',
              fontSize: '10px',
              lineHeight: 1.45,
            }}
            title="Ligament/tendon soft-tissue layer — see docs/week2-ligament-fascia-search.md"
          >
            ℹ️ 韧带/腱层<strong>不完整</strong>：BP3D 跖长韧带（真韧带）+ 跟腱（肌腱，非韧带）。仍缺足底腱膜 /
            ATFL / CFL / 三角韧带 / 弹簧韧带。隔离(I)与搜索可用。
          </div>
        )}

        {(visibleLayers.has('nerve') ||
          visibleLayers.has('muscle') ||
          visibleLayers.has('vessel')) && (
          <div
            role="status"
            style={{
              marginTop: '8px',
              padding: '6px 8px',
              background: 'rgba(167, 139, 250, 0.12)',
              border: '1px solid rgba(167, 139, 250, 0.45)',
              borderRadius: '4px',
              color: '#c4b5fd',
              fontSize: '10px',
              lineHeight: 1.45,
            }}
            title="CC BY-SA 4.0 ShareAlike — see public/models/right-foot/by-sa/NOTICE.md"
          >
            ⚠️ 当前图层可能加载 <strong>BY-SA</strong> 网格（Z-Anatomy 神经 /
            Open3D DI · 胫后/腓动脉）。衍生作品需 ShareAlike；可关闭肌/脉管/神经层或删除{' '}
            <code style={{ fontSize: '9px' }}>by-sa/</code> 以保持仅 CC BY/CC0。
          </div>
        )}
      </div>
    </div>
  );
}

const quickBtnStyle: CSSProperties = {
  background: '#333',
  border: '1px solid #555',
  color: '#ccc',
  borderRadius: '4px',
  fontSize: '10px',
  padding: '2px 6px',
  cursor: 'pointer',
};

function legendChip(bg: string): CSSProperties {
  return {
    display: 'inline-block',
    minWidth: '18px',
    textAlign: 'center',
    padding: '1px 4px',
    background: bg,
    color: '#111',
    borderRadius: '3px',
    fontWeight: 700,
    fontSize: '9px',
  };
}
