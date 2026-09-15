import type { CSSProperties } from 'react';
import type { Layer } from '../types/anatomy';
import { LAYER_CONFIG, getAllLayers } from '../lib/layers';
import { LIGAMENT_GROUPS, type LigamentGroupId } from '../lib/ligamentGroups';
import { NERVE_GROUPS, type NerveGroupId } from '../lib/nerveGroups';
import { VESSEL_GROUPS, type VesselGroupId } from '../lib/vesselGroups';
import { MUSCLE_GROUPS, type MuscleGroupId } from '../lib/muscleGroups';

interface LayerTogglesProps {
  visibleLayers: Set<Layer>;
  onToggle: (layer: Layer) => void;
  onShowAll: () => void;
  onHideAll: () => void;
  placeholderCount: Record<Layer, number>;
  realCount: Record<Layer, number>;
  visibleLigamentGroups: Set<LigamentGroupId>;
  onToggleLigamentGroup: (group: LigamentGroupId) => void;
  visibleNerveGroups: Set<NerveGroupId>;
  onToggleNerveGroup: (group: NerveGroupId) => void;
  visibleVesselGroups: Set<VesselGroupId>;
  onToggleVesselGroup: (group: VesselGroupId) => void;
  visibleMuscleGroups: Set<MuscleGroupId>;
  onToggleMuscleGroup: (group: MuscleGroupId) => void;
}

/**
 * Layer panel + legend + ligament teaching sub-group filter.
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
  visibleLigamentGroups,
  onToggleLigamentGroup,
  visibleNerveGroups,
  onToggleNerveGroup,
  visibleVesselGroups,
  onToggleVesselGroup,
  visibleMuscleGroups,
  onToggleMuscleGroup,
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
        minWidth: '240px',
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
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


      {visibleLayers.has('muscle') && (
        <div
          style={{
            marginBottom: '10px',
            padding: '8px',
            background: 'rgba(196, 69, 54, 0.10)',
            border: '1px solid rgba(196, 69, 54, 0.40)',
            borderRadius: '6px',
          }}
          role="group"
          aria-label="肌肉教学亚组筛选"
        >
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#d6d3d1', marginBottom: '6px' }}>
            肌肉亚组 · Sub-groups
            <span style={{ fontWeight: 400, color: '#888', marginLeft: '6px' }}>教学筛选 · 非完整图谱</span>
          </div>
          {MUSCLE_GROUPS.map((g) => {
            const on = visibleMuscleGroups.has(g.id);
            return (
              <label
                key={g.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '5px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  color: '#e0e0e0',
                }}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => onToggleMuscleGroup(g.id)}
                  style={{ marginRight: '6px', cursor: 'pointer' }}
                  aria-label={`${g.labelZh} ${g.labelEn}`}
                />
                <span style={{ flex: 1 }}>
                  {g.labelZh}
                  <span style={{ color: '#888', marginLeft: '4px' }}>{g.labelEn}</span>
                </span>
                <span style={{ color: '#9ca3af', fontVariantNumeric: 'tabular-nums' }}>{g.structureIds.length}</span>
              </label>
            );
          })}
        </div>
      )}

      {visibleLayers.has('ligament') && (
        <div
          style={{
            marginBottom: '10px',
            padding: '8px',
            background: 'rgba(232, 220, 200, 0.08)',
            border: '1px solid rgba(232, 220, 200, 0.35)',
            borderRadius: '6px',
          }}
          role="group"
          aria-label="韧带教学亚组筛选"
        >
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#d6d3d1', marginBottom: '6px' }}>
            韧带亚组 · Sub-groups
            <span style={{ fontWeight: 400, color: '#888', marginLeft: '6px' }}>教学筛选 · 非完整图谱</span>
          </div>
          {LIGAMENT_GROUPS.map((g) => {
            const on = visibleLigamentGroups.has(g.id);
            return (
              <label
                key={g.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '5px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  color: '#e0e0e0',
                }}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => onToggleLigamentGroup(g.id)}
                  style={{ marginRight: '6px', cursor: 'pointer' }}
                  aria-label={`${g.labelZh} ${g.labelEn}`}
                />
                <span style={{ flex: 1 }}>
                  {g.labelZh}
                  <span style={{ color: '#888', marginLeft: '4px' }}>{g.labelEn}</span>
                </span>
                <span style={{ color: '#9ca3af', fontVariantNumeric: 'tabular-nums' }}>{g.structureIds.length}</span>
              </label>
            );
          })}
        </div>
      )}

      {visibleLayers.has('nerve') && (
        <div
          style={{
            marginBottom: '10px',
            padding: '8px',
            background: 'rgba(167, 139, 250, 0.08)',
            border: '1px solid rgba(167, 139, 250, 0.35)',
            borderRadius: '6px',
          }}
          role="group"
          aria-label="神经教学亚组筛选"
        >
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#d6d3d1', marginBottom: '6px' }}>
            神经亚组 · Sub-groups
            <span style={{ fontWeight: 400, color: '#888', marginLeft: '6px' }}>教学筛选 · 非完整图谱</span>
          </div>
          {NERVE_GROUPS.map((g) => {
            const on = visibleNerveGroups.has(g.id);
            return (
              <label
                key={g.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '5px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  color: '#e0e0e0',
                }}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => onToggleNerveGroup(g.id)}
                  style={{ marginRight: '6px', cursor: 'pointer' }}
                  aria-label={`${g.labelZh} ${g.labelEn}`}
                />
                <span style={{ flex: 1 }}>
                  {g.labelZh}
                  <span style={{ color: '#888', marginLeft: '4px' }}>{g.labelEn}</span>
                </span>
                <span style={{ color: '#9ca3af', fontVariantNumeric: 'tabular-nums' }}>{g.structureIds.length}</span>
              </label>
            );
          })}
        </div>
      )}


      {visibleLayers.has('vessel') && (
        <div
          style={{
            marginBottom: '10px',
            padding: '8px',
            background: 'rgba(139, 0, 0, 0.10)',
            border: '1px solid rgba(185, 28, 28, 0.45)',
            borderRadius: '6px',
          }}
          role="group"
          aria-label="血管教学亚组筛选"
        >
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#d6d3d1', marginBottom: '6px' }}>
            血管亚组 · Sub-groups
            <span style={{ fontWeight: 400, color: '#888', marginLeft: '6px' }}>教学筛选 · 非完整图谱</span>
          </div>
          {VESSEL_GROUPS.map((g) => {
            const on = visibleVesselGroups.has(g.id);
            return (
              <label
                key={g.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '5px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  color: '#e0e0e0',
                }}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => onToggleVesselGroup(g.id)}
                  style={{ marginRight: '6px', cursor: 'pointer' }}
                  aria-label={`${g.labelZh} ${g.labelEn}`}
                />
                <span style={{ flex: 1 }}>
                  {g.labelZh}
                  <span style={{ color: '#888', marginLeft: '4px' }}>{g.labelEn}</span>
                </span>
                <span style={{ color: '#9ca3af', fontVariantNumeric: 'tabular-nums' }}>{g.structureIds.length}</span>
              </label>
            );
          })}
        </div>
      )}

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
          <span style={legendChip('#15803d')}>主</span>
          <span>主树 CC BY / CC0</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
          <span style={legendChip('#a78bfa')}>SA</span>
          <span>BY-SA 隔离（神经 / DI / 近端+细支动脉 / 韧带）</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={legendChip('#e8dcc8')}>韧/腱</span>
          <span>韧带/腱层（教学有用但不完整）</span>
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
            ℹ️ 韧带/腱层<strong>教学有用但不完整</strong>：主树 BP3D 跖长韧带 + 跟腱；BY-SA Open3D 19（外侧踝 / 三角 /
            足底腱膜 / Lisfranc 样分组 / 支持带等）。仍缺多数跗骨间细带与趾侧副韧带。可用上方亚组筛选。
          </div>
        )}

        {visibleLayers.has('nerve') && (
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
            title="Nerve soft-tissue layer — teaching incomplete"
          >
            ℹ️ 神经层<strong>教学有用但不完整</strong>：Z-Anatomy 干神经 6 + Open3D 细支/皮支/跟支/背侧趾支。
            腓肠→LDC 以连续性说明（未另接线）；仍非完整周围神经图谱。可用上方亚组筛选。
          </div>
        )}

        
        {visibleLayers.has('muscle') && (
          <div
            role="status"
            style={{
              marginTop: '8px',
              padding: '6px 8px',
              background: 'rgba(196, 69, 54, 0.12)',
              border: '1px solid rgba(196, 69, 54, 0.45)',
              borderRadius: '4px',
              color: '#fca5a5',
              fontSize: '10px',
              lineHeight: 1.45,
            }}
            title="Muscle soft-tissue layer — teaching incomplete"
          >
            ℹ️ 肌肉层<strong>教学有用但不完整</strong>：足底 1–4 层 + 足背固有肌 + 外在前/外/后群亚组筛选。
            仍无腓肠肌/比目鱼肌肌腹（仅跟腱+跖肌）；DI 为 BY-SA 组合。非 TA2 完整肌图谱。
          </div>
        )}

{visibleLayers.has('vessel') && (
          <div
            role="status"
            style={{
              marginTop: '8px',
              padding: '6px 8px',
              background: 'rgba(185, 28, 28, 0.12)',
              border: '1px solid rgba(185, 28, 28, 0.45)',
              borderRadius: '4px',
              color: '#fca5a5',
              fontSize: '10px',
              lineHeight: 1.45,
            }}
            title="Vessel soft-tissue layer — teaching incomplete"
          >
            ℹ️ 血管层<strong>教学有用但不完整</strong>：BP3D 主干 7（含分组足背趾/足底跖）+ Open3D BY-SA 12（近端/深支/跗/跟/穿支；部分分组）。
            仍无逐射线 1–4 跖背/跖底动脉。可用上方亚组筛选。
          </div>
        )}

        {(visibleLayers.has('nerve') ||
          visibleLayers.has('muscle') ||
          visibleLayers.has('vessel') ||
          visibleLayers.has('ligament')) && (
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
            ⚠️ 当前图层可能加载 <strong>BY-SA</strong> 网格（Z-Anatomy 神经 / Open3D DI · 胫后/腓/足底深支与跖背动脉组合 ·
            踝足韧带/支持带/腱膜）。衍生作品需 ShareAlike；可关闭相关层或删除{' '}
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
