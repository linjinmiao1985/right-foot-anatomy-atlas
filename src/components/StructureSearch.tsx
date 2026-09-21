import { useMemo, useState, useEffect } from 'react';
import type { AnatomyStructure } from '../types/anatomy';
import { searchStructures } from '../lib/structureLookup';
import { LAYER_CONFIG } from '../lib/layers';

interface StructureSearchProps {
  onSelect: (structure: AnatomyStructure) => void;
  /** Increment to clear query + close dropdown (e.g. Escape from App). */
  clearSignal?: number;
}

/**
 * Bilingual structure search (ZH / LA).
 * UX-borrow (ideas only): jixiangying/anatomy global search;
 * BioLens / human-atlas / OMFAtlas search chrome;
 * BodyExplorer / human-atlas — results sorted by teaching layer order after match score.
 */
export default function StructureSearch({ onSelect, clearSignal = 0 }: StructureSearchProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (clearSignal > 0) {
      setQuery('');
      setOpen(false);
    }
  }, [clearSignal]);

  const results = useMemo(() => searchStructures(query, 10), [query]);

  return (
    <div
      style={{
        position: 'fixed',
        top: '72px',
        left: '20px',
        zIndex: 110,
        width: '280px',
      }}
      role="search"
      aria-label="按中文或拉丁名搜索结构"
    >
      <input
        type="search"
        value={query}
        placeholder="搜索 · Search (中文 / Latin)"
        aria-label="结构搜索"
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          // delay so click on result registers
          window.setTimeout(() => setOpen(false), 150);
        }}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          background: 'rgba(26, 26, 26, 0.95)',
          border: '1px solid #555',
          borderRadius: '6px',
          color: '#e0e0e0',
          padding: '8px 10px',
          fontSize: '13px',
          outline: 'none',
        }}
      />
      {open && query.trim() && (
        <ul
          style={{
            listStyle: 'none',
            margin: '4px 0 0',
            padding: 0,
            maxHeight: '280px',
            overflowY: 'auto',
            background: 'rgba(20, 20, 20, 0.98)',
            border: '1px solid #444',
            borderRadius: '6px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.45)',
          }}
        >
          {results.length === 0 ? (
            <li style={{ padding: '10px 12px', fontSize: '12px', color: '#888' }}>无匹配</li>
          ) : (
            results.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onSelect(s);
                    setQuery(s.nameZh);
                    setOpen(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #2a2a2a',
                    color: '#e0e0e0',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 2,
                        background: LAYER_CONFIG[s.layer].color,
                        flexShrink: 0,
                      }}
                    />
                    <strong>{s.nameZh}</strong>
                    {s.placeholder ? (
                      <span style={{ color: '#f59e0b', fontSize: 10 }}>占位</span>
                    ) : null}
                  </div>
                  <div style={{ color: '#999', fontStyle: 'italic', marginTop: 2, marginLeft: 14 }}>
                    {s.nameLa}
                  </div>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
