// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@components': path.resolve(__dirname, './client//src/components'),
      '@page': path.resolve(__dirname, './client//src/pages'),
      '@api': path.resolve(__dirname, './client//src/api'),
      '@interfaces': path.resolve(__dirname, './client//src/interfaces')
    }
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  }
});
