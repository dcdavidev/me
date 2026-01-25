/// <reference types="vite/client" />

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagePath = fileURLToPath(new URL('package.json', import.meta.url));
const packageJson: { dependencies: Record<string, string> } = JSON.parse(
  readFileSync(packagePath, 'utf8')
);

/**
 * Vite configuration for the React component library.
 * @returns {import('vite').UserConfig} The Vite configuration object.
 */
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.lottie'],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'SharedUiComponents',
      formats: ['es', 'cjs'],
      fileName: (format: string): string =>
        `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        'react/jsx-runtime',
        ...Object.keys(packageJson.dependencies || {}),
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    sourcemap: true,
    minify: false,
  },
});
