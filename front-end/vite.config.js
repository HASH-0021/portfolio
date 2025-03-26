import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: '../back-end/build',
    },
    plugins: [react()],
  };
});