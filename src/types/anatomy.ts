export type Layer = 'bone' | 'muscle' | 'nerve' | 'vessel' | 'ligament';

export interface AnatomyStructure {
  id: string;
  meshNames: string[];
  layer: Layer;
  nameZh: string;
  nameLa: string;
  summaryZh: string;
  placeholder: boolean;
  /** Optional TA2 / FMA / BP codes: sparse lookup in `src/lib/ontologyIds.ts` (not every row). */
}
