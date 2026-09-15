#!/usr/bin/env node
/**
 * Teaching screenshot pack (Phase 6) — not a finished-product gallery.
 *
 * Usage:
 *   npm run build && npm run screenshots
 *   # or: node scripts/screenshot-pipeline.mjs [--url http://127.0.0.1:4173] [--out docs/screenshots]
 *
 * Requires: system Chrome/Chromium + puppeteer-core (devDependency).
 * Starts `vite preview` if --url is omitted and nothing is listening.
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
function flag(name, fallback) {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}

const OUT = path.resolve(ROOT, flag('--out', 'docs/screenshots'));
const EXPLICIT_URL = flag('--url', null);
const CHROME =
  process.env.CHROME_PATH ||
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/usr/bin/google-chrome-stable';

const LAYER_LABELS = [
  '骨骼 Bone',
  '肌肉 Muscle',
  '神经 Nerve',
  '血管 Vessel',
  '韧带/腱 Ligament/Tendon',
];

async function setClipLite(page, wantOn) {
  const btn = await page.$('[aria-label="矢状切面 Sagittal clip lite"] button');
  if (!btn) {
    console.warn('[screenshot-pipeline] missing clip lite button');
    return;
  }
  const pressed = await page.evaluate((el) => el.getAttribute('aria-pressed'), btn);
  const isOn = pressed === 'true';
  if (isOn !== wantOn) {
    await btn.click();
    await sleep(400);
  }
}

async function setCameraPreset(page, id) {
  const btn = await page.$(`[data-camera-preset="${id}"]`);
  if (!btn) {
    console.warn(`[screenshot-pipeline] missing camera preset button: ${id}`);
    return;
  }
  await btn.click();
  await sleep(800);
}

const SHOTS = [
  {
    id: '01-default-all-layers',
    note: 'Default view — all teaching layers on',
    setup: async (page) => {
      await setClipLite(page, false);
      await setLayers(page, new Set(LAYER_LABELS));
      await setCameraPreset(page, 'default');
    },
  },
  {
    id: '02-bone-only',
    note: 'Bone layer only (default oblique)',
    setup: async (page) => {
      await setClipLite(page, false);
      await setLayers(page, new Set(['骨骼 Bone']));
      await setCameraPreset(page, 'default');
    },
  },
  {
    id: '03-muscle-only',
    note: 'Muscle layer only (intrinsics + extrinsics teaching set)',
    setup: async (page) => {
      await setClipLite(page, false);
      await setLayers(page, new Set(['肌肉 Muscle']));
      await setCameraPreset(page, 'default');
    },
  },
  {
    id: '04-nerve-bysa',
    note: 'Nerve layer only — BY-SA isolate visible in panel/legend',
    setup: async (page) => {
      await setClipLite(page, false);
      await setLayers(page, new Set(['神经 Nerve']));
      await setCameraPreset(page, 'default');
    },
  },
  {
    id: '05-clip-lite',
    note: 'Sagittal clip lite on (teaching cutaway, not clinical MPR)',
    setup: async (page) => {
      await setLayers(page, new Set(LAYER_LABELS));
      await setCameraPreset(page, 'default');
      await setClipLite(page, true);
      await sleep(400);
    },
  },
  {
    id: '06-bone-dorsal',
    note: 'Bone only — dorsal preset (+Z)',
    setup: async (page) => {
      await setClipLite(page, false);
      await setLayers(page, new Set(['骨骼 Bone']));
      await setCameraPreset(page, 'dorsal');
    },
  },
  {
    id: '07-bone-plantar',
    note: 'Bone only — plantar preset (−Z); sole teaching view',
    setup: async (page) => {
      await setClipLite(page, false);
      await setLayers(page, new Set(['骨骼 Bone']));
      await setCameraPreset(page, 'plantar');
    },
  },
  {
    id: '08-bone-medial',
    note: 'Bone only — medial preset (+X / hallux side)',
    setup: async (page) => {
      await setClipLite(page, false);
      await setLayers(page, new Set(['骨骼 Bone']));
      await setCameraPreset(page, 'medial');
    },
  },
  {
    id: '09-all-lateral',
    note: 'All layers — lateral preset (−X); multi-view expand',
    setup: async (page) => {
      await setClipLite(page, false);
      await setLayers(page, new Set(LAYER_LABELS));
      await setCameraPreset(page, 'lateral');
    },
  },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function portFree(port) {
  return new Promise((resolve) => {
    const s = createServer();
    s.once('error', () => resolve(false));
    s.once('listening', () => s.close(() => resolve(true)));
    s.listen(port, '127.0.0.1');
  });
}

async function waitHttp(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 304) return;
    } catch {
      /* retry */
    }
    await sleep(400);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function startPreview() {
  const port = 4173;
  const free = await portFree(port);
  if (!free) {
    return { url: `http://127.0.0.1:${port}/`, child: null };
  }
  const child = spawn(
    'npx',
    ['vite', 'preview', '--host', '127.0.0.1', '--port', String(port)],
    {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, FORCE_COLOR: '0' },
      detached: true,
    },
  );
  const url = `http://127.0.0.1:${port}/`;
  await waitHttp(url);
  return { url, child };
}

function stopPreview(child) {
  if (!child || !child.pid) return;
  try {
    process.kill(-child.pid, 'SIGTERM');
  } catch {
    try {
      child.kill('SIGTERM');
    } catch {
      /* ignore */
    }
  }
}

async function layerCheckbox(page, label) {
  return page.$(`input[type="checkbox"][aria-label="${label}"]`);
}

async function setLayers(page, wantOn) {
  for (const label of LAYER_LABELS) {
    const cb = await layerCheckbox(page, label);
    if (!cb) {
      console.warn(`[screenshot-pipeline] missing checkbox: ${label}`);
      continue;
    }
    const checked = await page.evaluate((el) => el.checked, cb);
    const want = wantOn.has(label);
    if (checked !== want) {
      await cb.click();
      await sleep(200);
    }
  }
  // Soft-tissue layers need a moment to mount / lazy-preload
  await sleep(1800);
}

async function main() {
  await mkdir(OUT, { recursive: true });

  let child = null;
  let url = EXPLICIT_URL;
  if (!url) {
    const preview = await startPreview();
    url = preview.url;
    child = preview.child;
  } else {
    await waitHttp(url);
  }

  console.log(`[screenshot-pipeline] URL ${url}`);
  console.log(`[screenshot-pipeline] OUT ${OUT}`);
  console.log(`[screenshot-pipeline] Chrome ${CHROME}`);

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: CHROME,
      headless: 'new',
      args: ['--no-sandbox', '--disable-gpu', '--window-size=1440,900'],
      defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('canvas', { timeout: 60000 });
    await page.waitForSelector('input[type="checkbox"][aria-label="骨骼 Bone"]', {
      timeout: 30000,
    });
    await sleep(4000);

    const manifest = {
      generatedAt: new Date().toISOString(),
      url,
      honesty:
        'Teaching-grade screenshot pack for expert review — not a finished-product gallery; soft-tissue incomplete; BY-SA layers opt-in.',
      shots: [],
    };

    for (const shot of SHOTS) {
      await shot.setup(page);
      await sleep(600);
      const file = `${shot.id}.png`;
      const dest = path.join(OUT, file);
      await page.screenshot({ path: dest, type: 'png' });
      manifest.shots.push({ file, note: shot.note });
      console.log(`[screenshot-pipeline] wrote ${file} — ${shot.note}`);
    }

    await writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
    await writeFile(
      path.join(OUT, 'README.md'),
      [
        '# Teaching screenshots',
        '',
        'Generated by `npm run screenshots` (`scripts/screenshot-pipeline.mjs`).',
        '',
        '**Honesty**: teaching-grade QA pack for expert review — **not** a finished-product gallery.',
        'Soft-tissue layers remain incomplete; nerve / many soft meshes are BY-SA isolate.',
        '',
        'See `manifest.json` for shot list and generation timestamp.',
        '',
        'Also linked from root `README.md` (Teaching QA screenshots) for expert review — still **not** a product gallery.',
        '',
      ].join('\n'),
    );
    console.log('[screenshot-pipeline] done');
  } finally {
    if (browser) await browser.close().catch(() => {});
    stopPreview(child);
    await sleep(400);
    try {
      if (child?.pid) process.kill(-child.pid, 'SIGKILL');
    } catch {
      /* already dead */
    }
  }
}

main().catch((err) => {
  console.error('[screenshot-pipeline] FAILED', err);
  process.exit(1);
});
