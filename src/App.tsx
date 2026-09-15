import { useState, useEffect } from 'react';
import Viewport from './components/Viewport';
import LayerToggles from './components/LayerToggles';
import StructurePanel from './components/StructurePanel';
import StructureSearch from './components/StructureSearch';
import { getAllLayers } from './lib/layers';
import { getAllLigamentGroupIds, type LigamentGroupId } from './lib/ligamentGroups';
import { getAllNerveGroupIds, type NerveGroupId } from './lib/nerveGroups';
import { getAllVesselGroupIds, type VesselGroupId } from './lib/vesselGroups';
import { getAllMuscleGroupIds, type MuscleGroupId } from './lib/muscleGroups';
import { getStructureByMeshName, getAllStructures } from './lib/structureLookup';
import { ATLAS_SOURCE_FOOTER } from './lib/assetProvenance';
import { getSchematicHonesty } from './lib/schematicHonesty';
import type { Layer } from './types/anatomy';
import type { AnatomyStructure } from './types/anatomy';
import {
  DEFAULT_LABEL_DENSITY,
  type LabelDensity,
} from './lib/labelDensity';
import {
  DEFAULT_CLIP_CONSTANT,
  DEFAULT_CLIP_ENABLED,
  clampClipConstant,
} from './lib/clipPlane';
import {
  DEFAULT_CAMERA_PRESET,
  cameraPresetFromDigitKey,
  type CameraPresetId,
} from './lib/cameraPresets';
import {
  loadTeachingPrefs,
  saveTeachingPrefs,
} from './lib/teachingPrefs';
import KeyboardHelpOverlay from './components/KeyboardHelpOverlay';
import { isHelpToggleKey } from './lib/keyboardHelp';
import {
  toggleHiddenStructureId,
  revealStructureId,
  revealAllHiddenStructures,
} from './lib/structureVisibility';

function emptyLayerCounts(): Record<Layer, number> {
  return { bone: 0, muscle: 0, nerve: 0, vessel: 0, ligament: 0 };
}

function App() {
  // Boot from localStorage once (SSR/tests: loadTeachingPrefs → null → defaults).
  const [visibleLayers, setVisibleLayers] = useState<Set<Layer>>(() => {
    const stored = loadTeachingPrefs();
    return new Set(stored?.visibleLayers ?? getAllLayers());
  });
  const [selectedStructure, setSelectedStructure] = useState<AnatomyStructure | null>(null);
  const [selectedMeshName, setSelectedMeshName] = useState<string | null>(null);
  const [isolateMode, setIsolateMode] = useState(false);
  /** Per-structure hide (dissection) — independent of isolate / layer toggles; persisted in teachingPrefs. */
  const [hiddenStructureIds, setHiddenStructureIds] = useState<Set<string>>(() => {
    const stored = loadTeachingPrefs()?.hiddenStructureIds ?? [];
    return new Set(stored);
  });
  const [searchClearSignal, setSearchClearSignal] = useState(0);
  const [visibleLigamentGroups, setVisibleLigamentGroups] = useState<Set<LigamentGroupId>>(
    () => new Set(getAllLigamentGroupIds()),
  );
  const [visibleNerveGroups, setVisibleNerveGroups] = useState<Set<NerveGroupId>>(
    () => new Set(getAllNerveGroupIds()),
  );
  const [visibleVesselGroups, setVisibleVesselGroups] = useState<Set<VesselGroupId>>(
    () => new Set(getAllVesselGroupIds()),
  );
  const [visibleMuscleGroups, setVisibleMuscleGroups] = useState<Set<MuscleGroupId>>(
    () => new Set(getAllMuscleGroupIds()),
  );
  const [labelDensity, setLabelDensity] = useState<LabelDensity>(() => {
    return loadTeachingPrefs()?.labelDensity ?? DEFAULT_LABEL_DENSITY;
  });
  const [clipEnabled, setClipEnabled] = useState(() => {
    return loadTeachingPrefs()?.clipEnabled ?? DEFAULT_CLIP_ENABLED;
  });
  const [clipConstant, setClipConstant] = useState(() => {
    return loadTeachingPrefs()?.clipConstant ?? DEFAULT_CLIP_CONSTANT;
  });
  const [cameraPresetId, setCameraPresetId] = useState<CameraPresetId>(() => {
    return loadTeachingPrefs()?.cameraPresetId ?? DEFAULT_CAMERA_PRESET;
  });
  const [cameraPresetToken, setCameraPresetToken] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);

  // Persist teaching prefs (layers / label density / clip / camera / hidden structure ids).
  useEffect(() => {
    saveTeachingPrefs({
      visibleLayers: [...visibleLayers],
      labelDensity,
      clipEnabled,
      clipConstant,
      cameraPresetId,
      hiddenStructureIds: [...hiddenStructureIds],
    });
  }, [visibleLayers, labelDensity, clipEnabled, clipConstant, cameraPresetId, hiddenStructureIds]);

  const handleCameraPresetChange = (id: CameraPresetId) => {
    setCameraPresetId(id);
    setCameraPresetToken((n) => n + 1);
  };

  const handleLayerToggle = (layer: Layer) => {
    setVisibleLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layer)) {
        next.delete(layer);
      } else {
        next.add(layer);
      }
      return next;
    });
  };

  const handleShowAll = () => setVisibleLayers(new Set(getAllLayers()));
  const handleHideAll = () => setVisibleLayers(new Set());

  const handleLigamentGroupToggle = (group: LigamentGroupId) => {
    setVisibleLigamentGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  };

  const handleNerveGroupToggle = (group: NerveGroupId) => {
    setVisibleNerveGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  };

  const handleVesselGroupToggle = (group: VesselGroupId) => {
    setVisibleVesselGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  };

  const handleMuscleGroupToggle = (group: MuscleGroupId) => {
    setVisibleMuscleGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  };

  const handleMeshClick = (meshName: string) => {
    setSelectedMeshName(meshName);
    const structure = getStructureByMeshName(meshName);
    if (structure) {
      setSelectedStructure(structure);
    } else {
      setSelectedStructure({
        id: 'unmapped',
        meshNames: [meshName],
        layer: 'bone',
        nameZh: '未标注结构',
        nameLa: 'Unmapped Structure',
        summaryZh: '该网格尚未映射到解剖结构数据库',
        placeholder: false,
      });
    }
  };

  const handleClose = () => {
    setSelectedStructure(null);
    setSelectedMeshName(null);
    setIsolateMode(false);
  };

  const handleSearchSelect = (structure: AnatomyStructure) => {
    setSelectedStructure(structure);
    setSelectedMeshName(structure.meshNames[0] ?? null);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Escape policy: close help first; else clear selection + isolate + search.
      // Does NOT clear per-structure hides (those persist in teachingPrefs / chip bar).
      if (e.key === 'Escape') {
        e.preventDefault();
        if (helpOpen) {
          setHelpOpen(false);
          return;
        }
        handleClose();
        setSearchClearSignal((n) => n + 1);
        const active = document.activeElement as HTMLElement | null;
        if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
          active.blur();
        }
        return;
      }
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement | null)?.isContentEditable) {
        return;
      }
      // Help overlay (? / H) — teaching polish; works even while overlay open
      if (isHelpToggleKey(e.key)) {
        e.preventDefault();
        setHelpOpen((v) => !v);
        return;
      }
      if (helpOpen) {
        return; // absorb other shortcuts while help is up
      }
      // Keyboard isolate — UX-borrow from GraphAnatomy / Grypa / Sushruta (ideas only)
      if ((e.key === 'i' || e.key === 'I') && selectedStructure) {
        e.preventDefault();
        setIsolateMode((v) => !v);
        return;
      }
      // Per-structure hide — UX-borrow from undergravity/human-atlas (beyond isolate)
      if ((e.key === 'x' || e.key === 'X') && selectedStructure && selectedStructure.id !== 'unmapped') {
        e.preventDefault();
        setHiddenStructureIds((prev) => toggleHiddenStructureId(prev, selectedStructure.id));
        return;
      }
      // Camera presets 1–5
      const preset = cameraPresetFromDigitKey(e.key);
      if (preset) {
        e.preventDefault();
        setCameraPresetId(preset);
        setCameraPresetToken((n) => n + 1);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedStructure, helpOpen]);

  const structures = getAllStructures();
  const placeholderCount = structures.reduce((acc, s) => {
    if (s.placeholder) acc[s.layer]++;
    return acc;
  }, emptyLayerCounts());
  const realCount = structures.reduce((acc, s) => {
    if (!s.placeholder) acc[s.layer]++;
    return acc;
  }, emptyLayerCounts());

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 100,
          color: '#e0e0e0',
          background: 'rgba(26, 26, 26, 0.8)',
          padding: '12px 20px',
          borderRadius: '8px',
          border: '1px solid #444',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>右足解剖图谱 · MVP</h1>
          <button
            type="button"
            onClick={() => setHelpOpen(true)}
            aria-label="打开快捷键说明 Open keyboard help"
            title="快捷键 Keyboard help (? / H)"
            style={{
              background: '#333',
              border: '1px solid #555',
              color: '#e0e0e0',
              borderRadius: '6px',
              padding: '3px 9px',
              fontSize: '12px',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            ? 帮助
          </button>
        </div>
        <div
          style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px', fontVariantNumeric: 'tabular-nums' }}
          title="structures.json entries · placeholder:false vs placeholder:true (not a completeness claim)"
        >
          结构 {structures.length} · 实网格 {structures.length - Object.values(placeholderCount).reduce((a, b) => a + b, 0)}
          {Object.values(placeholderCount).reduce((a, b) => a + b, 0) > 0
            ? ` · 占位 ${Object.values(placeholderCount).reduce((a, b) => a + b, 0)}`
            : ''}
          {isolateMode ? ' · 隔离中 (I)' : ''}
          {hiddenStructureIds.size > 0 ? ` · 已隐藏 ${hiddenStructureIds.size}` : ''}
        </div>
      </div>

      <StructureSearch onSelect={handleSearchSelect} clearSignal={searchClearSignal} />

      <LayerToggles
        visibleLayers={visibleLayers}
        onToggle={handleLayerToggle}
        onShowAll={handleShowAll}
        onHideAll={handleHideAll}
        placeholderCount={placeholderCount}
        realCount={realCount}
        visibleLigamentGroups={visibleLigamentGroups}
        onToggleLigamentGroup={handleLigamentGroupToggle}
        visibleNerveGroups={visibleNerveGroups}
        onToggleNerveGroup={handleNerveGroupToggle}
        visibleVesselGroups={visibleVesselGroups}
        onToggleVesselGroup={handleVesselGroupToggle}
        visibleMuscleGroups={visibleMuscleGroups}
        onToggleMuscleGroup={handleMuscleGroupToggle}
        labelDensity={labelDensity}
        onLabelDensityChange={setLabelDensity}
        clipEnabled={clipEnabled}
        onClipEnabledChange={setClipEnabled}
        clipConstant={clipConstant}
        onClipConstantChange={(v) => setClipConstant(clampClipConstant(v))}
        cameraPresetId={cameraPresetId}
        onCameraPresetChange={handleCameraPresetChange}
      />

      <Viewport
        onMeshClick={handleMeshClick}
        visibleLayers={visibleLayers}
        selectedMeshName={selectedMeshName}
        isolateMode={isolateMode}
        visibleLigamentGroups={visibleLigamentGroups}
        visibleNerveGroups={visibleNerveGroups}
        visibleVesselGroups={visibleVesselGroups}
        visibleMuscleGroups={visibleMuscleGroups}
        labelDensity={labelDensity}
        clipEnabled={clipEnabled}
        clipConstant={clipConstant}
        cameraPresetId={cameraPresetId}
        cameraPresetToken={cameraPresetToken}
        hiddenStructureIds={hiddenStructureIds}
      />

      <StructurePanel
        structure={selectedStructure}
        onClose={handleClose}
        isolateMode={isolateMode}
        onToggleIsolate={() => setIsolateMode((v) => !v)}
        structureHidden={
          selectedStructure != null && hiddenStructureIds.has(selectedStructure.id)
        }
        onToggleStructureHidden={
          selectedStructure && selectedStructure.id !== 'unmapped'
            ? () =>
                setHiddenStructureIds((prev) =>
                  toggleHiddenStructureId(prev, selectedStructure.id),
                )
            : undefined
        }
      />

      {hiddenStructureIds.size > 0 && (
        <div
          style={{
            position: 'fixed',
            top: '88px',
            left: '20px',
            zIndex: 100,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            alignItems: 'center',
            maxWidth: 'min(420px, calc(100vw - 40px))',
            background: 'rgba(26, 26, 26, 0.9)',
            border: '1px solid #555',
            borderRadius: '8px',
            padding: '8px 10px',
          }}
          role="region"
          aria-label="Hidden structures 已隐藏结构"
        >
          <span style={{ fontSize: '11px', color: '#9ca3af', marginRight: '4px' }}>
            已隐藏 · Hidden
          </span>
          {[...hiddenStructureIds].map((id) => {
            const struct = structures.find((x) => x.id === id);
            const label = struct?.nameZh ?? id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setHiddenStructureIds((prev) => revealStructureId(prev, id))}
                title={`恢复显示 Restore: ${struct?.nameLa ?? id}`}
                style={{
                  fontSize: '11px',
                  padding: '3px 8px',
                  borderRadius: '999px',
                  border: '1px solid #f87171',
                  background: '#450a0a',
                  color: '#fecaca',
                  cursor: 'pointer',
                }}
              >
                {label} ×
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setHiddenStructureIds(revealAllHiddenStructures())}
            style={{
              fontSize: '11px',
              padding: '3px 8px',
              borderRadius: '6px',
              border: '1px solid #666',
              background: '#333',
              color: '#e0e0e0',
              cursor: 'pointer',
            }}
          >
            全部恢复 · Restore all
          </button>
        </div>
      )}

      <KeyboardHelpOverlay open={helpOpen} onClose={() => setHelpOpen(false)} />

      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          right: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '12px',
          pointerEvents: 'none',
          zIndex: 90,
        }}
      >
        <div style={{ fontSize: '11px', color: '#666' }}>
          提示: ?/H 快捷键 | 搜索 ZH/LA | 视角1–5 | 标签密度 | 矢状切面(lite) | 拖动旋转 | 滚轮缩放 | 右键平移 | 点击对焦 | I 隔离/退出 | X 隐藏此结构 | Esc 取消选择(不恢复已隐藏)
        </div>
        <div
          style={{
            fontSize: '10px',
            color: '#888',
            background: 'rgba(26, 26, 26, 0.85)',
            border: '1px solid #333',
            borderRadius: '6px',
            padding: '6px 10px',
            maxWidth: '520px',
            textAlign: 'right',
            lineHeight: 1.4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '4px',
          }}
          title="Asset attribution — see NOTICE and public/models/right-foot/by-sa/NOTICE.md"
        >
          {selectedStructure &&
            (() => {
              const h = getSchematicHonesty(
                selectedStructure.id,
                selectedStructure.placeholder,
                selectedStructure.layer,
              );
              if (!h.show) return null;
              return (
                <div
                  data-testid="schematic-honesty-footer"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                  title={h.disclaimer}
                >
                  <span style={{ color: '#c4b5fd', fontWeight: 700 }}>示意≠来源</span>
                  {h.badges.map((b) => (
                    <span
                      key={b.kind}
                      style={{
                        padding: '1px 6px',
                        background: '#4c1d95',
                        color: '#f5f3ff',
                        borderRadius: '3px',
                        fontSize: '9px',
                        fontWeight: 700,
                      }}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
              );
            })()}
          {ATLAS_SOURCE_FOOTER}
        </div>
      </div>
    </div>
  );
}

export default App;
