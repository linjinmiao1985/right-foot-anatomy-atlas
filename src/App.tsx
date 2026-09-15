import { useState, useEffect } from 'react';
import Viewport from './components/Viewport';
import LayerToggles from './components/LayerToggles';
import StructurePanel from './components/StructurePanel';
import { getAllLayers } from './lib/layers';
import { getStructureByMeshName, getAllStructures } from './lib/structureLookup';
import { ATLAS_SOURCE_FOOTER } from './lib/assetProvenance';
import type { Layer } from './types/anatomy';
import type { AnatomyStructure } from './types/anatomy';

function emptyLayerCounts(): Record<Layer, number> {
  return { bone: 0, muscle: 0, nerve: 0, vessel: 0 };
}

function App() {
  const [visibleLayers, setVisibleLayers] = useState<Set<Layer>>(new Set(getAllLayers()));
  const [selectedStructure, setSelectedStructure] = useState<AnatomyStructure | null>(null);
  const [selectedMeshName, setSelectedMeshName] = useState<string | null>(null);

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
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

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
      </div>

      <LayerToggles
        visibleLayers={visibleLayers}
        onToggle={handleLayerToggle}
        onShowAll={handleShowAll}
        onHideAll={handleHideAll}
        placeholderCount={placeholderCount}
        realCount={realCount}
      />

      <Viewport onMeshClick={handleMeshClick} visibleLayers={visibleLayers} selectedMeshName={selectedMeshName} />

      <StructurePanel structure={selectedStructure} onClose={handleClose} />

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
          提示: 鼠标拖动旋转 | 滚轮缩放 | 右键平移 | Esc 取消选择
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
