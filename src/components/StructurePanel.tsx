import { useState } from 'react';
import type { AnatomyStructure } from '../types/anatomy';
import { LAYER_CONFIG } from '../lib/layers';
import { getStructureProvenance, licenseLabel, getTeachingMeshNote } from '../lib/assetProvenance';
import { getSchematicHonesty, honestyRegionAriaLabel } from '../lib/schematicHonesty';
import {
  getOntologyIds,
  hasOntologyIds,
  getHonestOntologyEmptyReason,
  formatFma,
  formatOntologyCopy,
} from '../lib/ontologyIds';

interface StructurePanelProps {
  structure: AnatomyStructure | null;
  onClose: () => void;
  isolateMode?: boolean;
  onToggleIsolate?: () => void;
  /** True when this structure is in the per-structure hide set. */
  structureHidden?: boolean;
  /** Toggle hide for the selected structure (undergravity dissection UX-borrow). */
  onToggleStructureHidden?: () => void;
}

export default function StructurePanel({
  structure,
  onClose,
  isolateMode = false,
  onToggleIsolate,
  structureHidden = false,
  onToggleStructureHidden,
}: StructurePanelProps) {
  const [copyFlash, setCopyFlash] = useState(false);

  if (!structure) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '48px',
          right: '20px',
          background: 'rgba(26, 26, 26, 0.88)',
          border: '1px dashed #444',
          borderRadius: '8px',
          padding: '14px 16px',
          minWidth: '280px',
          maxWidth: '360px',
          zIndex: 100,
        }}
        role="status"
        aria-live="polite"
      >
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginBottom: '6px' }}>
          结构信息 · Structure
        </div>
        <p style={{ fontSize: '12px', color: '#888', margin: 0, lineHeight: 1.55 }}>
          点击网格或用搜索选择结构，查看中文/拉丁名、来源许可与可选本体论 ID（TA2 / FMA / BP）。
          <br />
          <span style={{ color: '#666' }}>
            Click a mesh or use search — panel shows names, license, and sparse ontology IDs when
            cited.
          </span>
        </p>
      </div>
    );
  }

  const layerConfig = LAYER_CONFIG[structure.layer];
  const provenance = getStructureProvenance(structure.id, structure.placeholder, structure.layer);
  const meshNote = getTeachingMeshNote(structure.id, structure.layer);
  const ontology = getOntologyIds(structure.id);
  const showOntology = hasOntologyIds(ontology);
  const ontologyEmpty = getHonestOntologyEmptyReason(structure.id);
  const honesty = getSchematicHonesty(structure.id, structure.placeholder, structure.layer);
  const sourceChipBg =
    provenance.license === 'placeholder'
      ? '#f59e0b'
      : provenance.license === 'CC-BY-SA-4.0'
        ? '#a78bfa'
        : provenance.license === 'CC0-1.0'
          ? '#38bdf8'
          : '#22c55e';

  const handleCopyOntology = async () => {
    if (!ontology) return;
    const text = formatOntologyCopy(ontology);
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopyFlash(true);
      window.setTimeout(() => setCopyFlash(false), 1200);
    } catch {
      // Clipboard may be denied; silent fail keeps panel usable
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '48px',
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

      {showOntology && ontology ? (
        <div
          style={{
            marginBottom: '12px',
            padding: '8px 10px',
            background: 'rgba(0,0,0,0.28)',
            borderRadius: '6px',
            border: '1px solid #333',
            fontSize: '11px',
            color: '#c4c4c4',
            lineHeight: 1.55,
          }}
          title="Partial teaching map — sources: IFAA TA98/FMA, Wikipedia FMA, structures.json, docs/terminology.md, BodyParts3D BP. Unknown schemes omitted."
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '4px',
              gap: '8px',
            }}
          >
            <div style={{ fontSize: '10px', color: '#888', fontWeight: 600 }}>
              本体论 ID · Ontology (partial)
            </div>
            <button
              type="button"
              onClick={handleCopyOntology}
              style={{
                fontSize: '10px',
                padding: '2px 7px',
                background: copyFlash ? '#166534' : '#333',
                border: '1px solid #555',
                borderRadius: '4px',
                color: '#e5e5e5',
                cursor: 'pointer',
                flexShrink: 0,
              }}
              title="Copy TA2 / FMA / BP line"
            >
              {copyFlash ? '已复制' : '复制 · Copy'}
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 12px' }}>
            {ontology.ta2 && (
              <span>
                <span style={{ color: '#888' }}>TA2</span> {ontology.ta2}
              </span>
            )}
            {ontology.fma && (
              <span>
                <span style={{ color: '#888' }}>FMA</span> {formatFma(ontology.fma)}
              </span>
            )}
            {ontology.bp && (
              <span>
                <span style={{ color: '#888' }}>BP</span> {ontology.bp}
              </span>
            )}
          </div>
          {ontology.note && (
            <div style={{ marginTop: '4px', color: '#9ca3af', fontSize: '10px' }}>{ontology.note}</div>
          )}
        </div>
      ) : (
        <div
          data-testid="ontology-honest-empty"
          role="note"
          aria-label={
            ontologyEmpty
              ? `Ontology honest empty: ${ontologyEmpty.reasonEn}`
              : 'No citable ontology IDs in teaching map'
          }
          style={{
            marginBottom: '12px',
            padding: '8px 10px',
            background: 'rgba(0,0,0,0.18)',
            borderRadius: '6px',
            border: '1px dashed #444',
            fontSize: '11px',
            color: '#9ca3af',
            lineHeight: 1.55,
          }}
        >
          <div style={{ fontSize: '10px', color: '#888', fontWeight: 600, marginBottom: '4px' }}>
            本体论 · Ontology (honest empty)
          </div>
          <p style={{ margin: 0 }}>
            {ontologyEmpty ? (
              <>
                {ontologyEmpty.reasonZh}
                <br />
                <span style={{ color: '#6b7280' }}>{ontologyEmpty.reasonEn}</span>
              </>
            ) : (
              <>
                本教学图暂无可用 TA2 / FMA / BP 引用编号 — 不编造。
                <br />
                <span style={{ color: '#6b7280' }}>
                  No citable TA2 / FMA / BP in this teaching map — IDs not invented.
                </span>
              </>
            )}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
        <div
          style={{
            width: '14px',
            height: '14px',
            background: layerConfig.color,
            borderRadius: '2px',
            border: '1px solid #666',
          }}
        />
        <span style={{ fontSize: '12px', color: '#bbb' }}>
          {layerConfig.label} · {layerConfig.labelEn}
        </span>
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

      {/* Source badge — UX-borrow from Open Anatomy Studio source-aware chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px',
          padding: '8px 10px',
          background: 'rgba(0,0,0,0.35)',
          borderRadius: '6px',
          border: '1px solid #333',
        }}
        title={provenance.sourceFull}
      >
        <span
          style={{
            padding: '2px 7px',
            background: sourceChipBg,
            color: '#111',
            borderRadius: '3px',
            fontSize: '10px',
            fontWeight: 700,
          }}
        >
          {provenance.sourceShort}
        </span>
        <span
          style={{
            padding: '2px 7px',
            background: provenance.isolatedBySa ? '#7c3aed' : '#15803d',
            color: '#f8fafc',
            borderRadius: '3px',
            fontSize: '10px',
            fontWeight: 700,
          }}
          title={
            provenance.isolatedBySa
              ? 'CC BY-SA ShareAlike isolate (by-sa/) — not main-tree CC BY/CC0'
              : 'Main tree (CC BY 4.0 / CC0) — redistributable with attribution where required'
          }
          aria-label={
            provenance.isolatedBySa
              ? 'License tree: ShareAlike isolate under by-sa/, not main-tree CC BY or CC0'
              : 'License tree: Main tree CC BY 4.0 or CC0'
          }
        >
          {provenance.isolatedBySa ? 'ShareAlike' : '主树 · Main'}
        </span>
        <span style={{ fontSize: '11px', color: '#bbb', lineHeight: 1.4 }}>
          {licenseLabel(provenance.license)}
          {provenance.isolatedBySa ? ' · by-sa/ 隔离' : ''}
        </span>
      </div>

      {/* Schematic-vs-source honesty — OMFAtlas UX-borrow (learning-log #58) */}
      {honesty.show && (
        <div
          style={{
            marginBottom: '12px',
            padding: '8px 10px',
            background: 'rgba(88, 28, 135, 0.18)',
            borderRadius: '6px',
            border: '1px solid #6b21a8',
          }}
          data-testid="schematic-honesty"
          role="note"
          aria-label={honestyRegionAriaLabel(honesty)}
          aria-describedby="schematic-honesty-disclaimer"
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '6px',
              alignItems: 'center',
            }}
            role="list"
            aria-label="Honesty badges"
          >
            <span style={{ fontSize: '10px', color: '#c4b5fd', fontWeight: 700 }}>
              示意≠来源 · Schematic ≠ source
            </span>
            {honesty.badges.map((b) => (
              <span
                key={b.kind}
                role="listitem"
                title={b.title}
                aria-label={b.ariaLabel}
                data-honesty-kind={b.kind}
                style={{
                  padding: '2px 7px',
                  background:
                    b.kind === 'by-sa'
                      ? '#7c3aed'
                      : b.kind === 'placeholder' || b.kind === 'pathway-schematic'
                        ? '#b45309'
                        : b.kind === 'grouped'
                          ? '#0369a1'
                          : '#334155',
                  color: '#f8fafc',
                  borderRadius: '3px',
                  fontSize: '10px',
                  fontWeight: 700,
                }}
              >
                {b.label}
              </span>
            ))}
          </div>
          <p
            id="schematic-honesty-disclaimer"
            style={{
              margin: 0,
              fontSize: '11px',
              lineHeight: 1.5,
              color: '#d8b4fe',
            }}
          >
            {honesty.disclaimer}
          </p>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          marginBottom: '12px',
        }}
      >
        {onToggleIsolate && (
          <button
            type="button"
            onClick={onToggleIsolate}
            style={{
              width: '100%',
              padding: '6px 10px',
              background: isolateMode ? '#4c1d95' : '#333',
              border: isolateMode ? '1px solid #a78bfa' : '1px solid #555',
              borderRadius: '6px',
              color: '#e0e0e0',
              fontSize: '12px',
              cursor: 'pointer',
            }}
            title="隐藏其他结构，仅显示当前选择"
          >
            {isolateMode ? '退出隔离 · Exit isolate (I)' : '仅此 · Isolate (I / hide others)'}
          </button>
        )}
        {onToggleStructureHidden && (
          <button
            type="button"
            onClick={onToggleStructureHidden}
            aria-pressed={structureHidden}
            style={{
              width: '100%',
              padding: '6px 10px',
              background: structureHidden ? '#7f1d1d' : '#2a2a2a',
              border: structureHidden ? '1px solid #f87171' : '1px solid #555',
              borderRadius: '6px',
              color: '#e0e0e0',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
            }}
            title="隐藏当前结构（解剖剥离习惯；不同于隔离） Hide this structure only — beyond isolate"
          >
            <span>
              {structureHidden
                ? '已隐藏 · Hidden (X) — 点此恢复'
                : '隐藏此结构 · Hide this (X)'}
            </span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: '999px',
                background: structureHidden ? '#fecaca' : '#444',
                color: structureHidden ? '#7f1d1d' : '#ccc',
                flexShrink: 0,
              }}
            >
              {structureHidden ? '隐藏中' : '可见'}
            </span>
          </button>
        )}
      </div>

      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#ccc', margin: 0 }}>{structure.summaryZh}</p>

      {meshNote && (
        <p
          style={{
            fontSize: '12px',
            lineHeight: '1.5',
            color: '#9ca3af',
            margin: '12px 0 0',
            padding: '8px 10px',
            background: 'rgba(55, 65, 81, 0.45)',
            borderRadius: '6px',
            borderLeft: '3px solid #6b7280',
          }}
        >
          {meshNote}
        </p>
      )}
    </div>
  );
}
