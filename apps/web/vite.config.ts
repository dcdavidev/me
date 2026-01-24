import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => ({
  assetsInclude: ['**/*.lottie'],
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  define: {
    'import.meta.env.PORT': JSON.stringify(process.env.PORT),
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT}`,
        changeOrigin: true,
      },
    },
  },
  esbuild: {
    jsxDev: mode !== 'production',
  },
  build: {
    minify: mode === 'production',
    rollupOptions: {
      external: [],
    },
  },
  ssr: {
    noExternal: true,
  },
}));
