import { defineConfig, globalIgnores } from 'eslint/config';

import repoRecommended from '@repo/eslint-config/recommended';

export default defineConfig([
  globalIgnores([
    '.github/instructions/**',
    '**/node_modules/**',
    '**/*:Zone.Identifier',
    '**/Thumbs.db',
    '**/.react-router/**',
    'packages/server-models/src/prisma/**',
  ]),
  repoRecommended,
]);
