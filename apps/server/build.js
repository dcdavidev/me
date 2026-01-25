import fs from 'node:fs';
import path from 'node:path';

const rootPkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const externalDependencies = Object.fromEntries(
  Object.entries(rootPkg.dependencies || {}).filter(
    ([key]) => !key.startsWith('@repo/')
  )
);

const distPkg = {
  name: rootPkg.name,
  version: rootPkg.version,
  type: rootPkg.type ?? 'module',
  exports: {
    '.': './main.js',
  },
  main: './main.js',
  scripts: {
    start: 'node main.js',
  },
  dependencies: externalDependencies,
};

fs.writeFileSync(
  path.join('dist', 'package.json'),
  JSON.stringify(distPkg, null, 2)
);
