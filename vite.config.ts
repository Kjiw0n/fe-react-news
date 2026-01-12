import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // 또는 '0.0.0.0'
    port: 5173,
  },
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        icon: true,
      },
      include: '**/*.svg',
    })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
