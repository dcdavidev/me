import { defineConfig, globalIgnores } from 'eslint/config';

import repoRecommended from '@repo/eslint-config/recommended';

export default defineConfig([
  globalIgnores([
    '**/node_modules/**',
    '.github/instructions/**',
    '**/*:Zone.Identifier',
    '**/Thumbs.db',
    '**/.react-router/**',
  ]),
  repoRecommended,
]);
