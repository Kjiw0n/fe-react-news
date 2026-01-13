import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // 또는 '0.0.0.0'
    port: 5173,
    proxy: {
      '/api/press-data': {
        bypass(_req, res) {
          if (res) {
            const pressData = JSON.parse(
              fs.readFileSync(
                path.resolve(__dirname, './src/data/pressData.json'),
                'utf-8',
              ),
            );
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(pressData));
          }
          return '/api/press-data';
        },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        icon: true,
      },
      include: '**/*.svg',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
