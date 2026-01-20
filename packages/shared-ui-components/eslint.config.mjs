import { defineConfig, globalIgnores } from 'eslint/config';

import repoRecommended from '@repo/eslint-config/recommended';

export default defineConfig([globalIgnores(['dist/**']), repoRecommended]);
