import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), cloudflare()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  server: {
    port: 3000,
    open: true
  },
  esbuild: {
    // Strip all console.log / debugger calls from the production bundle
    drop: ['console', 'debugger'],
  },
  build: {
    target: 'es2018',
    chunkSizeWarningLimit: 300,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-dom') || id.includes('react/')) return 'vendor';
          if (id.includes('framer-motion')) return 'framer';
          if (id.includes('lucide-react')) return 'lucide';
          if (id.includes('@studio-freight/react-lenis') || id.includes('lenis')) return 'lenis';
        }
      }
    }
  }
});