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
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 400,
    assetsInlineLimit: 10240,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) return 'react-dom';
            if (id.includes('react/')) return 'react';
            if (id.includes('framer-motion')) return 'framer';
            if (id.includes('lucide-react')) return 'lucide';
            if (id.includes('lenis') || id.includes('studio-freight')) return 'lenis';
            return 'vendor';
          }
        },
        compact: true
      }
    }
  }
});