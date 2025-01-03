import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [
    laravel({
      input: ['frontend/src/styles/app.scss', 'frontend/app.js'],
      refresh: true
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@frontend': path.resolve(__dirname, 'frontend'),
      
      '@': path.resolve(__dirname, 'frontend/src'),
      '@styles': path.resolve(__dirname, 'frontend/src/styles'),
      '@components': path.resolve(__dirname, 'frontend/src/components'),
      '@images': path.resolve(__dirname, 'frontend/src/images'),
      '@pages': path.resolve(__dirname, 'frontend/src/pages'),
      '@router': path.resolve(__dirname, 'frontend/src/router'),

      '@store': path.resolve(__dirname, 'frontend/store'),
      '@utils': path.resolve(__dirname, 'frontend/utils'),
    }
  }
});
