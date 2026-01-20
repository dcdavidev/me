import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import nodeDependencies from 'eslint-plugin-node-dependencies';
import packageJson from 'eslint-plugin-package-json';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';
import vuoto from 'eslint-plugin-vuoto';
import globals from 'globals';
import jsoncParser from 'jsonc-eslint-parser';
import tseslint from 'typescript-eslint';
import cspell from '@cspell/eslint-plugin/configs';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';

export default defineConfig([
  globalIgnores([
    '**/node_modules/**',
    '.github/instructions/**',
    '**/*:Zone.Identifier',
    '**/Thumbs.db',
    '**/desktop.ini',
    '**/$RECYCLE.BIN/**',
    '**/System Volume Information/**',
    '**/pagefile.sys',
    '**/swapfile.sys',
    '**/hiberfil.sys',
    '**/build/**',
    '**/dist/**',
  ]),

  {
    plugins: {
      vuoto,
    },
  },

  // --- Js/Ts base ---
  {
    files: ['**/*.{js,ts,cjs,cts,mjs,mts}'],
    plugins: {
      jsdoc,
      import: importPlugin,
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      nodeDependencies.configs['flat/recommended'],
      unicorn.configs.recommended,
      jsdoc.configs['flat/contents-typescript-flavor'],
      jsdoc.configs['flat/logical-typescript-flavor'],
      jsdoc.configs['flat/requirements-typescript-flavor'],
      jsdoc.configs['flat/stylistic-typescript-flavor'],
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      // TS: allow unused prefixed with "_"
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Quote/semi conflict resolution (Prettier handles)
      quotes: 'off',
      '@typescript-eslint/quotes': 'off',
      semi: 'off',
      '@typescript-eslint/semi': 'off',

      // Unicorn
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
      'unicorn/prefer-module': 'error',
      'unicorn/no-new-buffer': 'error',
      'unicorn/no-instanceof-array': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-string-replace-all': 'error',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prefer-type-error': 'error',
      'unicorn/throw-new-error': 'error',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/explicit-length-check': 'warn',

      // jsdoc
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
          },
        },
      ],
      'jsdoc/require-description': 'warn',
      'jsdoc/require-param': 'error',
      'jsdoc/require-returns': 'error',
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-property-names': 'error',
      'jsdoc/check-tag-names': 'error',
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-indentation': 'warn',
      'jsdoc/require-description-complete-sentence': 'warn',
      'jsdoc/no-undefined-types': 'error',
      'jsdoc/empty-tags': 'error',
      'jsdoc/no-multi-asterisks': 'warn',
      'jsdoc/no-types': 'off',
      'jsdoc/require-param-type': 'off',
      'jsdoc/require-property-type': 'off',
      'jsdoc/require-throws-type': 'off',
      'jsdoc/require-yields-type': 'off',
      'jsdoc/require-returns-type': 'off',
      'jsdoc/tag-lines': [
        'warn',
        'any',
        {
          startLines: 0,
          endLines: 0,
          applyToEndTag: true,
          count: 1,
          tags: {},
          maxBlockLines: null,
        },
      ],

      // Disable the built-in sort-imports rule in favor of plugin
      'sort-imports': 'off',

      // Enforce structured and grouped imports using simple-import-sort
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // dotenv & dotenvx packages
            ['^@dotenvx/dotenvx', '^dotenv'],

            // Side-effect imports (e.g. polyfills)
            [String.raw`^\u0000`],

            // Env imports for React Native, Expo, etc.
            ['^@env'],

            // Node.js built-in modules
            [
              '^assert',
              '^buffer',
              '^child_process',
              '^cluster',
              '^console',
              '^constants',
              '^crypto',
              '^dgram',
              '^dns',
              '^domain',
              '^events',
              '^fs',
              '^http',
              '^https',
              '^inspector',
              '^module',
              '^net',
              '^os',
              '^path',
              '^perf_hooks',
              '^process',
              '^punycode',
              '^querystring',
              '^readline',
              '^repl',
              '^stream',
              '^string_decoder',
              '^timers',
              '^tls',
              '^tty',
              '^url',
              '^util',
              '^v8',
              '^vm',
              '^zlib',
            ],

            // Node.js built-in modules #2
            ['^node:'],

            // Node.js backend frameworks
            [
              '^@fastify',
              '^@hapi/hapi',
              '^@koa/koa',
              '^@nestjs',
              '^express',
              '^fastify',
              '^hapi',
              '^koa',
              '^loopback',
              '^nest',
              '^sails',
            ],

            // Node.js backend middlewares & utilities
            [
              '^body-parser',
              '^connect-redis',
              '^cookie-parser',
              '^cors',
              '^express-rate-limit',
              '^express-session',
              '^helmet',
              '^morgan',
              '^passport',
              String.raw`^pino-`,
              '^redis',
              '^winston',
            ],

            // UI Frameworks (React, Vue, Svelte, etc.)
            ['^@angular', '^react', '^solid-js', '^svelte', '^vue'],

            // React specific packages
            [
              '^@tanstack/router',
              '^react-dom',
              '^react-helmet',
              '^react-intl',
              '^react-router',
              '^react-router-dom',
            ],

            // Full-stack/SSR frameworks (Next.js, Remix, etc.)
            ['^@nuxt/kit', '^@remix-run', '^@sveltejs/kit', '^gatsby', '^next'],

            // React Native & Expo
            [
              '^@expo',
              String.raw`^@expo\/`,
              '^@react-native',
              '^expo',
              String.raw`^expo-`,
              '^react-native',
              '^react-navigation',
            ],

            // State management libraries
            [
              '^@reduxjs/toolkit',
              '^jotai',
              '^mobx',
              '^recoil',
              '^redux',
              '^valtio',
              '^zustand',
            ],

            // Data-fetching libraries
            [
              '^@apollo/client',
              '^@tanstack/react-query',
              '^axios',
              '^graphql',
              '^swr',
            ],

            // UI libraries & design systems
            [
              '^@chakra-ui',
              '^@headlessui/react',
              '^@lottiefiles',
              '^@material-ui',
              '^@mui',
              '^@nextui-org/react',
              '^@radix-ui',
              '^antd',
              '^framer-motion',
              '^native-base',
              '^react-native-paper',
              '^shadcn-ui',
              '^tailwindcss',
            ],

            // CSS-in-JS & utility libraries
            [
              '^@emotion',
              '^class-variance-authority',
              '^clsx',
              '^lucide-react',
              '^styled-components',
              '^tailwind-merge',
              '^twin.macro',
              '^tw-animate-css',
            ],

            // Common icon packages
            [
              String.raw`^@expo\/vector-icons`,
              '^@fortawesome',
              '^@tabler/icons-react',
              '^lucide',
              '^react-feather',
              '^react-icons',
              '^react-native-feather',
              '^react-native-vector-icons',
            ],

            // Testing libraries and utilities
            [
              '^@testing-library',
              '^cypress',
              '^jest',
              '^playwright',
              '^vitest',
            ],

            // Generic third-party packages (npm scope and plain)
            ['^[a-z]', String.raw`^@\w`],

            // Monorepo/workspace scoped packages
            ['@org/', '^@my-org/', '^@workspace/', '^@repo/'],

            // Asset imports (images, fonts, etc.)
            [
              String.raw`^.+\.(avi|mkv|mov|mp4|webm)$`,
              String.raw`^.+\.(mp3|ogg|wav|weba)$`,
              String.raw`^.+\.(gif|jpe?g|png|svg|webp)$`,
              String.raw`^.+\.lottie$`,
              String.raw`^.+\.(eot|otf|ttf|woff|woff2)$`,
            ],

            // JSON files
            [String.raw`^.+\.json$`],

            // Stylesheets (css, scss, less, etc.)
            [String.raw`^.+\.less$`, String.raw`^.+\.s?css$`],

            // Relative imports (parent, sibling, current)
            [String.raw`^\.?\.\/`],
          ],
        },
      ],

      // Enforce sorted exports
      'simple-import-sort/exports': 'error',

      // Prettier
      'prettier/prettier': 'error',
    },
  },

  // --- CommonJS specifics ---
  {
    files: ['**/*.{cjs,cts}', '**/webpack.config.{js,cjs}'],
    languageOptions: {
      globals: { ...globals.commonjs },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'unicorn/prefer-module': 'off',
    },
  },

  // --- Module specifics ---
  {
    files: ['**/*.{js,ts,mjs,mts}'],
    languageOptions: {
      sourceType: 'module',
      globals: { ...globals.es2022 },
    },
  },

  // --- Test files ---
  {
    files: ['**/*.test.{js,ts}', '**/*.spec.{js,ts}'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'unicorn/no-null': 'warn',
    },
  },

  // --- json ---
  {
    files: ['**/*.json'],
    plugins: { json: json },
    language: 'json/json',
    extends: ['json/recommended'],
    languageOptions: { parser: jsoncParser },
    rules: {
      'prettier/prettier': 'off',
    },
  },
  {
    files: ['**/*.json5'],
    plugins: { json: json },
    language: 'json/json5',
    extends: ['json/recommended'],
    languageOptions: { parser: jsoncParser },
  },
  {
    files: ['**/*.jsonc', '**/tsconfig*.json', '**/.vscode/**/*.json'],
    plugins: { json: json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
    languageOptions: { parser: jsoncParser },
  },
  {
    files: ['**/package.json'],
    plugins: { json: json, 'package-json': packageJson },
    language: 'json/json',
    extends: [packageJson.configs.recommended],
    languageOptions: { parser: jsoncParser },
    rules: {
      'package-json/order-properties': 'error',
      'package-json/sort-collections': 'error',
      'package-json/require-description': 'error',
      'package-json/require-bugs': 'error',
      'package-json/require-keywords': 'error',
      'package-json/require-name': 'error',
      'package-json/require-version': 'error',
      'package-json/valid-description': 'error',
      'package-json/valid-license': 'error',
      'package-json/valid-name': 'error',
      'package-json/valid-package-definition': 'error',
      'package-json/valid-version': 'error',
      'prettier/prettier': 'off',
    },
  },

  // --- markdown ---
  {
    files: ['**/*.md'],
    plugins: { markdown: markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended'],
  },

  // --- spellcheck ---
  cspell.recommended,

  // --- whitespace ---
  vuoto.configs.all,

  // eslint-plugin-prettier/recommended config goes last.
  eslintPluginPrettierRecommended,
]);
