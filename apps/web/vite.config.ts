import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { reactRouter } from '@react-router/dev/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    assetsInclude: ['**/*.lottie'],

    plugins: [vanillaExtractPlugin(), reactRouter(), tsconfigPaths()],

    define: {
      'import.meta.env.PORT': JSON.stringify(env.PORT),
      'import.meta.env.HOST': JSON.stringify(env.HOST),
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
      port: 4000,
      proxy: {
        '/api': {
          target: `http://localhost:${env.PORT}`,
          changeOrigin: true,
        },
      },
    },
  };
});
