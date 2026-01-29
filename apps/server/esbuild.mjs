import fs from 'node:fs';
import { builtinModules } from 'node:module';
import path from 'node:path';

import * as esbuild from 'esbuild';

const outdir = 'dist';
if (fs.existsSync(outdir)) fs.rmSync(outdir, { recursive: true });

await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node24',
  outdir,
  splitting: true,
  chunkNames: 'vendor/[name]-[hash]',
  external: builtinModules,

  banner: {
    js: `
import { createRequire } from 'module';
import { fileURLToPath as _fileURLToPath } from 'url';
import { dirname } from 'path';

const require = createRequire(import.meta.url);
const __filename = _fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
`.trim(),
  },
});

const clientDirs = ['web'];

for (const dirName of clientDirs) {
  const srcPath = path.join('src', dirName);
  const destPath = path.join(outdir, dirName);

  if (fs.existsSync(srcPath)) {
    fs.cpSync(srcPath, destPath, {
      recursive: true,
      filter: (src) => !src.includes('node_modules'),
    });
    console.log(`✔ Copied ${dirName} to ${outdir}`);
  } else {
    console.warn(`⚠ Warning: Source directory ${srcPath} not found.`);
  }
}
