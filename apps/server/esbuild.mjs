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
    js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
  },
});

const srcWeb = path.join('src', 'web');
const destWeb = path.join(outdir, 'web');
if (fs.existsSync(srcWeb)) {
  fs.cpSync(srcWeb, destWeb, { recursive: true });
}
