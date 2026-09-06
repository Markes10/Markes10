import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'out');
const nextBin = resolve(root, 'node_modules/next/dist/bin/next');

execFileSync(process.execPath, [nextBin, 'build'], {
  cwd: root,
  env: { ...process.env, GITHUB_PAGES: 'true' },
  stdio: 'inherit',
});

mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, '.nojekyll'), '');

console.log(`GitHub Pages output ready at ${outDir}`);
