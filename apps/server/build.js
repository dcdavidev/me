import fs from 'node:fs';
import path from 'node:path';

const rootPkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const distPkg = {
  name: rootPkg.name,
  version: rootPkg.version,
  type: rootPkg.type ?? 'module',
  main: './main.js',
  exports: {
    '.': './main.js',
  },
};

fs.writeFileSync(
  path.join('dist', 'package.json'),
  JSON.stringify(distPkg, null, 2)
);
