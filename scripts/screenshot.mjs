#!/usr/bin/env node
// Capture a screenshot of a research source for use in a page's .panel figures.
// Usage:
//   node scripts/screenshot.mjs <url> <output-path.png> [--selector "css selector"] [--width 1280]
//
// Used by the page-writer agent in Step 4.5 of the research workflow (see CLAUDE.md)
// to capture a specific figure/table/photo that a researcher flagged with VISUAL:.
// Only capture sources tied to a claim that is actually going into the page.

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { dirname } from 'path';

function parseArgs(argv) {
  const [url, outputPath, ...rest] = argv;
  if (!url || !outputPath) {
    console.error('Usage: node scripts/screenshot.mjs <url> <output-path.png> [--selector "css selector"] [--width 1280]');
    process.exit(1);
  }
  let selector = null;
  let width = 1280;
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === '--selector') selector = rest[++i];
    else if (rest[i] === '--width') width = parseInt(rest[++i], 10);
  }
  return { url, outputPath, selector, width };
}

const { url, outputPath, selector, width } = parseArgs(process.argv.slice(2));

const proxyServer = process.env.HTTPS_PROXY || process.env.https_proxy;
const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  proxy: proxyServer ? { server: proxyServer } : undefined,
});
try {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

  mkdirSync(dirname(outputPath), { recursive: true });

  if (selector) {
    const el = page.locator(selector).first();
    await el.waitFor({ state: 'visible', timeout: 10000 });
    await el.screenshot({ path: outputPath });
  } else {
    await page.screenshot({ path: outputPath });
  }
  console.log(`Saved: ${outputPath}`);
} finally {
  await browser.close();
}
