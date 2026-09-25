import type { CSSProperties, ReactNode } from 'react';
import { shouldShowHoverLabel, showLatinInLabel, type LabelDensity } from '../lib/labelDensity';
import { quizDisplayNames } from '../lib/quizMode';

interface StructureHoverLabelProps {
  nameZh: string;
  nameLa: string;
  density: LabelDensity;
  borderColor: string;
  /** Optional provenance / teaching note line under names */
  footnote?: ReactNode;
  style?: CSSProperties;
  /** Teaching quiz stub — hide names (Grypa-JJ habit, ideas only). */
  quizMode?: boolean;
}

/**
 * Compact bilingual hover chip — density controlled by LabelDensity.
 * UX-borrow (ideas only): Open Anatomy Studio bilingual labels + BioLens density.
 */
export default function StructureHoverLabel({
  nameZh,
  nameLa,
  density,
  borderColor,
  footnote,
  style,
  quizMode = false,
}: StructureHoverLabelProps) {
  if (!shouldShowHoverLabel(density)) return null;
  const shown = quizDisplayNames(quizMode, nameZh, nameLa);

  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.85)',
        color: 'white',
        padding: '0.5rem 0.75rem',
        borderRadius: '4px',
        fontSize: '0.9rem',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        border: `2px solid ${borderColor}`,
        fontFamily: 'sans-serif',
        ...style,
      }}
    >
      <strong>{shown.nameZh}</strong>
      {showLatinInLabel(density) && (
        <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>{shown.nameLa}</div>
      )}
      {footnote}
    </div>
  );
}
