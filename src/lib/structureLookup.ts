import type { AnatomyStructure, Layer } from '../types/anatomy';
import structuresData from '../data/structures.json';
const structures = structuresData as AnatomyStructure[];

/** Teaching list order: bone → muscle → ligament → vessel → nerve (BodyExplorer / human-atlas UX-borrow). */
const LAYER_SORT_ORDER: Record<Layer, number> = Object.fromEntries(
  // Prefer osteology → myology → ligament/tendon → vessels → nerves for study lists
  (['bone', 'muscle', 'ligament', 'vessel', 'nerve'] as Layer[]).map((l, i) => [l, i]),
) as Record<Layer, number>;

export function getStructureById(id: string): AnatomyStructure | undefined {
  return structures.find((s) => s.id === id);
}

export function getStructureByMeshName(meshName: string): AnatomyStructure | undefined {
  return structures.find((s) => s.meshNames.includes(meshName));
}

export function getAllStructures(): AnatomyStructure[] {
  return structures;
}

/** Case-insensitive search over Chinese + Latin names (and id). */
export function searchStructures(query: string, limit = 12): AnatomyStructure[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored: { s: AnatomyStructure; score: number }[] = [];
  for (const s of structures) {
    const zh = s.nameZh.toLowerCase();
    const la = s.nameLa.toLowerCase();
    const id = s.id.toLowerCase();
    let score = 0;
    if (zh === q || la === q || id === q) score = 100;
    else if (zh.startsWith(q) || la.startsWith(q) || id.startsWith(q)) score = 80;
    else if (zh.includes(q) || la.includes(q) || id.includes(q)) score = 50;
    else continue;
    scored.push({ s, score });
  }
  scored.sort(
    (a, b) =>
      b.score - a.score ||
      (LAYER_SORT_ORDER[a.s.layer] ?? 99) - (LAYER_SORT_ORDER[b.s.layer] ?? 99) ||
      a.s.nameLa.localeCompare(b.s.nameLa),
  );
  return scored.slice(0, limit).map((x) => x.s);
}
