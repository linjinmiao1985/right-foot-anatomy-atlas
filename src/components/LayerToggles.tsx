import type { Layer } from '../types/anatomy';
import { LAYER_CONFIG, getAllLayers } from '../lib/layers';

interface LayerTogglesProps {
  visibleLayers: Set<Layer>;
  onToggle: (layer: Layer) => void;
  placeholderCount: Record<Layer, number>;
}

export default function LayerToggles({ visibleLayers, onToggle, placeholderCount }: LayerTogglesProps) {
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
        minWidth: '180px',
        zIndex: 100,
      }}
    >
      <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#e0e0e0' }}>图层</h3>
      {layers.map((layer) => {
        const config = LAYER_CONFIG[layer];
        const isVisible = visibleLayers.has(layer);
        const placeholders = placeholderCount[layer] || 0;

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
            />
            <div
              style={{
                width: '12px',
                height: '12px',
                background: config.color,
                borderRadius: '2px',
                marginRight: '8px',
                border: '1px solid #666',
              }}
            />
            <span style={{ color: '#e0e0e0' }}>{config.label}</span>
            {placeholders > 0 && (
              <span
                style={{
                  marginLeft: '8px',
                  padding: '2px 6px',
                  background: '#f59e0b',
                  color: '#000',
                  borderRadius: '3px',
                  fontSize: '10px',
                  fontWeight: 600,
                }}
              >
                占位
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
}
