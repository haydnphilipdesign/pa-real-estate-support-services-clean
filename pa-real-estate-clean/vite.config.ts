import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          form: ['react-hook-form', '@hookform/resolvers', 'zod'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-label', 'lucide-react'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    strictPort: false,
  },
});