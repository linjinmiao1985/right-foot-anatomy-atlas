export interface FootAssetManifest {
  version: string;
  source: string;
  license: string;
  models: string[];
  note?: string;
}

export async function loadManifest(): Promise<FootAssetManifest> {
  const response = await fetch('/models/right-foot/manifest.json');
  if (!response.ok) {
    throw new Error('Failed to load manifest');
  }
  return response.json();
}

export function isPlaceholderMode(manifest: FootAssetManifest): boolean {
  return manifest.source.includes('placeholder') || manifest.models.length === 0;
}
