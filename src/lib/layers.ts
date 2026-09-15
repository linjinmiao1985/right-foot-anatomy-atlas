import type { Layer } from '../types/anatomy';

export interface LayerConfig {
  label: string;
  labelEn: string;
  color: string;
  defaultVisible: boolean;
}

export const LAYER_CONFIG: Record<Layer, LayerConfig> = {
  bone: {
    label: '骨骼',
    labelEn: 'Bone',
    color: '#f5e6d3',
    defaultVisible: true,
  },
  muscle: {
    label: '肌肉',
    labelEn: 'Muscle',
    color: '#c44536',
    defaultVisible: true,
  },
  nerve: {
    label: '神经',
    labelEn: 'Nerve',
    color: '#f4d03f',
    defaultVisible: true,
  },
  vessel: {
    label: '血管',
    labelEn: 'Vessel',
    color: '#8b0000',
    defaultVisible: true,
  },
  ligament: {
    label: '韧带',
    labelEn: 'Ligament',
    color: '#e8dcc8',
    defaultVisible: true,
  },
};

export function getAllLayers(): Layer[] {
  return Object.keys(LAYER_CONFIG) as Layer[];
}
