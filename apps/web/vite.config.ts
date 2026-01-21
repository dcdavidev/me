import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  assetsInclude: ['**/*.lottie'],
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  define: {
    'import.meta.env.PORT': JSON.stringify(process.env.PORT),
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
