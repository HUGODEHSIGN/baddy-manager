import { tamaguiExtractPlugin, tamaguiPlugin } from '@tamagui/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

const tamaguiConfig = {
  components: ['tamagui'],
  config: 'src/tamagui.config.ts',
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tamaguiPlugin(tamaguiConfig),

    // optional, adds the optimizing compiler:
    process.env.NODE_ENV === 'production'
      ? tamaguiExtractPlugin(tamaguiConfig)
      : null,
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dir, './src'),
      '@server': path.resolve(import.meta.dir, '../server/src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/socket': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
