/**
 * Per-structure hide set — UX-borrow (ideas only) from undergravity/human-atlas
 * dissection-style per-structure visibility, beyond isolate-only.
 * No third-party UI code copied.
 */

/** Toggle whether a structure id is in the hidden set. Returns a new Set. */
export function toggleHiddenStructureId(
  hidden: ReadonlySet<string>,
  structureId: string,
): Set<string> {
  const next = new Set(hidden);
  if (next.has(structureId)) next.delete(structureId);
  else next.add(structureId);
  return next;
}

/** Remove one id (no-op if absent). */
export function revealStructureId(
  hidden: ReadonlySet<string>,
  structureId: string,
): Set<string> {
  if (!hidden.has(structureId)) return new Set(hidden);
  const next = new Set(hidden);
  next.delete(structureId);
  return next;
}

/** Clear all per-structure hides. */
export function revealAllHiddenStructures(): Set<string> {
  return new Set();
}

/** True when this structure should not render due to per-structure hide. */
export function isStructureHidden(
  hidden: ReadonlySet<string> | undefined,
  structureId: string,
): boolean {
  return Boolean(hidden?.has(structureId));
}
