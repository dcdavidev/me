import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  assetsInclude: ['**/*.lottie'],

  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],

  define: {
    'import.meta.env.PORT': JSON.stringify(process.env.PORT),
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'production'
    ),
  },

  resolve: {
    dedupe: ['react', 'react-dom', 'react-router'],
    alias: {
      'react/jsx-dev-runtime': 'react/jsx-runtime',
    },
  },

  esbuild: {
    jsx: 'automatic',
    jsxDev: false,
  },

  build: {
    minify: true,
    rollupOptions: {
      external: [],
    },
  },

  ssr: {
    noExternal: true,
  },

  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT}`,
        changeOrigin: true,
      },
    },
  },
});
