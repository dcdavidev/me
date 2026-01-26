import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { reactRouter } from '@react-router/dev/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  assetsInclude: ['**/*.lottie'],

  plugins: [vanillaExtractPlugin(), reactRouter(), tsconfigPaths()],

  define: {
    'import.meta.env.PORT': JSON.stringify(process.env.PORT),
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'production'
    ),
  },

  resolve: {
    dedupe: ['react', 'react-dom', 'react-router'],
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
    noExternal: [
      '@lottiefiles/dotlottie-react',
      '@radix-ui/themes',
      '@repo/shared-ui-components',
      '@repo/web-configs',
      '@tabler/icons-react',
      'isBot',
      'motion',
      'radix-ui',
    ],
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
