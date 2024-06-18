import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'http://127.0.0.1:5500/client/dist/index.html',
  server: {
    port: 3001,
    open: true,
  },
});
