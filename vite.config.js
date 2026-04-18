import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.docx', '**/*.pdf'],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
  },
  optimizeDeps: {
    exclude: ['@mediapipe/tasks-vision'],
  },
});
