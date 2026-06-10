import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '..', 'analytics-reporting.pdf');
const url = process.env.PDF_URL || 'http://localhost:3456/analytics-reporting/';

const edgePaths = [
  process.env.EDGE_PATH,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
].filter(Boolean);

const browser = edgePaths.find((p) => fs.existsSync(p));
if (!browser) {
  console.error('No Edge or Chrome found. Open the page in your browser and use Print > Save as PDF.');
  process.exit(1);
}

const result = spawnSync(
  browser,
  [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${outPath}`,
    url,
  ],
  { stdio: 'inherit' }
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

console.log('PDF saved to:', outPath);
