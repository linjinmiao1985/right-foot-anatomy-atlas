import type { Layer } from '../types/anatomy';

export interface LayerConfig {
  label: string;
  color: string;
  defaultVisible: boolean;
}

export const LAYER_CONFIG: Record<Layer, LayerConfig> = {
  bone: {
    label: '骨骼',
    color: '#f5e6d3',
    defaultVisible: true,
  },
  muscle: {
    label: '肌肉',
    color: '#c44536',
    defaultVisible: true,
  },
  nerve: {
    label: '神经',
    color: '#f4d03f',
    defaultVisible: true,
  },
  vessel: {
    label: '血管',
    color: '#8b0000',
    defaultVisible: true,
  },
};

export function getAllLayers(): Layer[] {
  return Object.keys(LAYER_CONFIG) as Layer[];
}
