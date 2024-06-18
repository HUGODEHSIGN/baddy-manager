import { config } from '@tamagui/config/v3';
import { tamaguiExtractPlugin, tamaguiPlugin } from '@tamagui/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { createTamagui } from 'tamagui';
import { defineConfig } from 'vite';

const tamaguiConfig = createTamagui(config);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tamaguiPlugin(tamaguiConfig.themeConfig),

    // optional, adds the optimizing compiler:
    process.env.NODE_ENV === 'production'
      ? tamaguiExtractPlugin(tamaguiConfig.themeConfig)
      : null,
  ],
});
