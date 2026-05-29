import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [tailwindcss(), react(), ViteImageOptimizer()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: true, // Allow external connections
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-motion': ['motion'],
          'vendor-icons': ['lucide-react'],
          'vendor-sanity': ['@sanity/client', '@sanity/image-url'],
        }
      }
    }
  },
  define: {
    // Define global constants
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'motion', 'lucide-react']
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    // Drop console.log and debugger in production
    ...(mode === 'production' ? {
      drop: ['console', 'debugger'],
    } : {}),
  }
}));
