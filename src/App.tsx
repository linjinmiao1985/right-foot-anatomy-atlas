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
import type { Layer } from './types/anatomy';
import type { AnatomyStructure } from './types/anatomy';

function emptyLayerCounts(): Record<Layer, number> {
  return { bone: 0, muscle: 0, nerve: 0, vessel: 0, ligament: 0 };
}

function App() {
  const [visibleLayers, setVisibleLayers] = useState<Set<Layer>>(new Set(getAllLayers()));
  const [selectedStructure, setSelectedStructure] = useState<AnatomyStructure | null>(null);
  const [selectedMeshName, setSelectedMeshName] = useState<string | null>(null);
  const [isolateMode, setIsolateMode] = useState(false);
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
      // Escape: clear isolate + selection + search (works even when search input focused)
      if (e.key === 'Escape') {
        e.preventDefault();
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
      // Keyboard isolate — UX-borrow from GraphAnatomy / Grypa / Sushruta (ideas only)
      if ((e.key === 'i' || e.key === 'I') && selectedStructure) {
        e.preventDefault();
        setIsolateMode((v) => !v);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedStructure]);

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
        <h1 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>右足解剖图谱 · MVP</h1>
        <div
          style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px', fontVariantNumeric: 'tabular-nums' }}
          title="structures.json entries · placeholder:false vs placeholder:true (not a completeness claim)"
        >
          结构 {structures.length} · 实网格 {structures.length - Object.values(placeholderCount).reduce((a, b) => a + b, 0)}
          {Object.values(placeholderCount).reduce((a, b) => a + b, 0) > 0
            ? ` · 占位 ${Object.values(placeholderCount).reduce((a, b) => a + b, 0)}`
            : ''}
          {isolateMode ? ' · 隔离中 (I)' : ''}
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
      />

      <StructurePanel
        structure={selectedStructure}
        onClose={handleClose}
        isolateMode={isolateMode}
        onToggleIsolate={() => setIsolateMode((v) => !v)}
      />

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
          提示: 搜索 ZH/LA | 拖动旋转 | 滚轮缩放 | 右键平移 | 点击对焦 | I 隔离/退出 | Esc 取消隔离+搜索
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
          }}
          title="Asset attribution — see NOTICE and public/models/right-foot/by-sa/NOTICE.md"
        >
          {ATLAS_SOURCE_FOOTER}
        </div>
      </div>
    </div>
  );
}

export default App;
