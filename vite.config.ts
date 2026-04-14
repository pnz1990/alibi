import { defineConfig } from 'vite';

export default defineConfig({
  base: '/alibi/',
  build: {
    outDir: 'dist',
    target: 'es2020',
  },
});
