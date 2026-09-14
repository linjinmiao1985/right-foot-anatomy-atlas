import type { AnatomyStructure } from '../types/anatomy';
import structuresData from '../data/structures.json';

const structures = structuresData as AnatomyStructure[];

export function getStructureById(id: string): AnatomyStructure | undefined {
  return structures.find((s) => s.id === id);
}

export function getStructureByMeshName(meshName: string): AnatomyStructure | undefined {
  return structures.find((s) => s.meshNames.includes(meshName));
}

export function getAllStructures(): AnatomyStructure[] {
  return structures;
}
