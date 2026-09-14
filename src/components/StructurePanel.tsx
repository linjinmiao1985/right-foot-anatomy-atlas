import type { AnatomyStructure } from '../types/anatomy';
import { LAYER_CONFIG } from '../lib/layers';

interface StructurePanelProps {
  structure: AnatomyStructure | null;
  onClose: () => void;
}

export default function StructurePanel({ structure, onClose }: StructurePanelProps) {
  if (!structure) {
    return null;
  }

  const layerConfig = LAYER_CONFIG[structure.layer];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(26, 26, 26, 0.95)',
        border: '1px solid #444',
        borderRadius: '8px',
        padding: '20px',
        minWidth: '320px',
        maxWidth: '400px',
        zIndex: 100,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#e0e0e0', margin: 0 }}>{structure.nameZh}</h3>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#999',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '0 4px',
          }}
          aria-label="关闭"
        >
          ×
        </button>
      </div>

      <p style={{ fontSize: '13px', color: '#aaa', fontStyle: 'italic', marginBottom: '12px' }}>{structure.nameLa}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <div
          style={{
            width: '14px',
            height: '14px',
            background: layerConfig.color,
            borderRadius: '2px',
            border: '1px solid #666',
          }}
        />
        <span style={{ fontSize: '12px', color: '#bbb' }}>{layerConfig.label}</span>
        {structure.placeholder && (
          <span
            style={{
              padding: '2px 8px',
              background: '#f59e0b',
              color: '#000',
              borderRadius: '3px',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            占位
          </span>
        )}
      </div>

      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#ccc', margin: 0 }}>{structure.summaryZh}</p>
    </div>
  );
}
