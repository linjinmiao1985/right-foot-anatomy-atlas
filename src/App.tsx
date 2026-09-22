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
import { getSchematicHonesty, honestyRegionAriaLabel } from './lib/schematicHonesty';
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
  isViewResetKey,
  type CameraPresetId,
} from './lib/cameraPresets';
import {
  loadTeachingPrefs,
  saveTeachingPrefs,
} from './lib/teachingPrefs';
import KeyboardHelpOverlay from './components/KeyboardHelpOverlay';
import LayerLoadProgress from './components/LayerLoadProgress';
import { isHelpToggleKey } from './lib/keyboardHelp';
import {
  toggleHiddenStructureId,
  revealStructureId,
  revealAllHiddenStructures,
} from './lib/structureVisibility';
import {
  defaultLayerOpacities,
  ghostLayerOpacities,
  isGhostLayerOpacities,
  isGhostToggleKey,
  toggleGhostLayerOpacities,
} from './lib/layerOpacity';
import {
  DEFAULT_EXPLODE_AMOUNT,
  EXPLODE_PRESET_AMOUNT,
  isAssembledExplode,
  isExplodeToggleKey,
  toggleExplodeAmount,
  prefersReducedMotion,
} from './lib/layerExplode';
import {
  DEFAULT_QUIZ_MODE,
  isQuizToggleKey,
  quizDisplayNames,
  toggleQuizMode,
} from './lib/quizMode';

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
  const [layerOpacities, setLayerOpacities] = useState<Record<Layer, number>>(() => {
    return loadTeachingPrefs()?.layerOpacities ?? defaultLayerOpacities();
  });
  const [explodeAmount, setExplodeAmount] = useState(() => {
    return loadTeachingPrefs()?.explodeAmount ?? DEFAULT_EXPLODE_AMOUNT;
  });
  const [quizMode, setQuizMode] = useState(() => {
    return loadTeachingPrefs()?.quizMode ?? DEFAULT_QUIZ_MODE;
  });

  // Track prefers-reduced-motion media query (WCAG accessibility — ideas only).
  const [reducedMotion, setReducedMotion] = useState(() => prefersReducedMotion());

  // Listen for prefers-reduced-motion changes.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    // Modern browsers use addEventListener; legacy uses addListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
    return undefined;
  }, []);

  // Persist teaching prefs (layers / label density / clip / camera / hidden / ghost / explode / quiz).
  useEffect(() => {
    saveTeachingPrefs({
      visibleLayers: [...visibleLayers],
      labelDensity,
      clipEnabled,
      clipConstant,
      cameraPresetId,
      hiddenStructureIds: [...hiddenStructureIds],
      layerOpacities,
      explodeAmount,
      quizMode,
    });
  }, [visibleLayers, labelDensity, clipEnabled, clipConstant, cameraPresetId, hiddenStructureIds, layerOpacities, explodeAmount, quizMode]);

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

  // Detect when all soft layers are off (only bone or nothing visible) — teaching empty-state.
  const softLayers: Layer[] = ['muscle', 'nerve', 'vessel', 'ligament'];
  const anySoftLayerVisible = softLayers.some((layer) => visibleLayers.has(layer));

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
        return;
      }
      // View reset — re-apply active teaching preset (Auckland LL visualiser habit)
      if (isViewResetKey(e.key)) {
        e.preventDefault();
        setCameraPresetToken((n) => n + 1);
        return;
      }
      // Ghost / 透视 — Air-Sage 透视 + Z-Anatomy Atlas G-ghost habit (ideas only)
      if (isGhostToggleKey(e.key)) {
        e.preventDefault();
        setLayerOpacities((prev) => toggleGhostLayerOpacities(prev));
        return;
      }
      // Explode / 抽出 — Air-Sage 抽出 + Human Atlas explode habit (ideas only)
      if (isExplodeToggleKey(e.key)) {
        e.preventDefault();
        setExplodeAmount((prev) => toggleExplodeAmount(prev));
        return;
      }
      // Quiz stub — Grypa-JJ quiz + MedicalPlab tutor→viewport habit (ideas only)
      if (isQuizToggleKey(e.key)) {
        e.preventDefault();
        setQuizMode((prev) => toggleQuizMode(prev));
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
          {isGhostLayerOpacities(layerOpacities) ? ' · 透视 (G)' : ''}
          {!isAssembledExplode(explodeAmount) ? ' · 抽出 (E)' : ''}
          {quizMode ? ' · 测验 (Q)' : ''}
        </div>
      </div>

      {!quizMode && <StructureSearch onSelect={handleSearchSelect} clearSignal={searchClearSignal} />}

      {quizMode && (
        <div
          role="status"
          style={{
            position: 'fixed',
            top: '80px',
            left: '20px',
            maxWidth: '360px',
            padding: '10px 14px',
            background: 'rgba(251, 146, 60, 0.12)',
            border: '1px solid rgba(251, 146, 60, 0.45)',
            borderRadius: '6px',
            color: '#fdba74',
            fontSize: '11px',
            lineHeight: 1.5,
            zIndex: 105,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
          title="Teaching quiz-mode stub — not Anki / exam"
        >
          <strong>ℹ️ 测验模式 · Quiz Stub</strong>
          <div style={{ marginTop: '4px' }}>
            教学自测：隐藏名称/搜索/本体编码,仅通过网格+图层识别结构。<strong>非</strong> Anki /
            正式考试 / 完整产品。按 <code style={{ background: 'rgba(251,146,60,0.2)', padding: '1px 4px', borderRadius: '3px' }}>Q</code> 恢复对照。
          </div>
        </div>
      )}

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
        layerOpacities={layerOpacities}
        onLayerOpacityChange={(layer, opacity) => {
          setLayerOpacities((prev) => ({ ...prev, [layer]: opacity }));
        }}
        onGhostPreset={() => setLayerOpacities(ghostLayerOpacities())}
        onSolidPreset={() => setLayerOpacities(defaultLayerOpacities())}
        explodeAmount={explodeAmount}
        onExplodeAmountChange={setExplodeAmount}
        onExplodePreset={() => setExplodeAmount(EXPLODE_PRESET_AMOUNT)}
        onAssemblePreset={() => setExplodeAmount(DEFAULT_EXPLODE_AMOUNT)}
        quizMode={quizMode}
        onQuizModeChange={setQuizMode}
      />

      {!anySoftLayerVisible && visibleLayers.size > 0 && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 95,
            background: 'rgba(26, 26, 26, 0.95)',
            border: '2px solid #f59e0b',
            borderRadius: '12px',
            padding: '20px 28px',
            maxWidth: '480px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            pointerEvents: 'none',
          }}
          role="status"
          aria-label="软组织图层空状态提示"
          data-testid="soft-layers-empty-state"
        >
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#fbbf24', marginBottom: '12px', textAlign: 'center' }}>
            💡 软组织图层已关闭
          </div>
          <div style={{ fontSize: '13px', color: '#e0e0e0', lineHeight: 1.6, marginBottom: '10px' }}>
            当前仅显示<strong>骨骼图层</strong>。若需查看肌肉、神经、血管或韧带，请在右侧图层面板中打开相应图层。
          </div>
          <div style={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.5, fontStyle: 'italic', borderTop: '1px solid #444', paddingTop: '10px' }}>
            <strong>Soft tissue layers disabled</strong><br />
            Only <strong>bone layer</strong> is visible. To view muscles, nerves, vessels, or ligaments, enable the corresponding layers in the right panel.
          </div>
        </div>
      )}

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
        layerOpacities={layerOpacities}
        explodeAmount={explodeAmount}
        reducedMotion={reducedMotion}
        quizMode={quizMode}
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
        quizMode={quizMode}
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
            const label = quizMode
              ? quizDisplayNames(true, struct?.nameZh ?? id, struct?.nameLa ?? id).nameZh
              : (struct?.nameZh ?? id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => setHiddenStructureIds((prev) => revealStructureId(prev, id))}
                title={
                  quizMode
                    ? '恢复显示 Restore hidden structure (quiz stub — name hidden)'
                    : `恢复显示 Restore: ${struct?.nameLa ?? id}`
                }
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

      <LayerLoadProgress />

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
          提示: ?/H 快捷键 | 搜索 ZH/LA | 视角1–5 | 标签密度 | 矢状切面(lite) | G 透视/实心 | E 抽出/合拢 | Q 测验/对照 | 拖动旋转 | 滚轮缩放 | 右键平移 | 点击对焦 | I 隔离/退出 | X 隐藏此结构 | Esc 取消选择(不恢复已隐藏)
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
                  role="note"
                  aria-label={honestyRegionAriaLabel(h)}
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
                      title={b.title}
                      aria-label={b.ariaLabel}
                      data-honesty-kind={b.kind}
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
