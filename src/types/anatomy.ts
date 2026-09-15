export type Layer = 'bone' | 'muscle' | 'nerve' | 'vessel' | 'ligament';

export interface AnatomyStructure {
  id: string;
  meshNames: string[];
  layer: Layer;
  nameZh: string;
  nameLa: string;
  summaryZh: string;
  placeholder: boolean;
}
