import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    react({
      tsDecorators: true,
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
    }),
  ],
  define: {
    global: 'globalThis',
  },
  // Make sure Vite correctly handles assets
  publicDir: 'public',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss({ config: './tailwind.config.cjs' }),
        autoprefixer,
      ],
    },
    modules: {
      localsConvention: 'camelCase',
    },
    devSourcemap: true,
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    target: 'es2020',
    ignoreAnnotations: true
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-error-boundary'],
          framer: ['framer-motion'],
          router: ['react-router-dom'],
          form: ['react-hook-form', '@hookform/resolvers', 'zod'],
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-toast',
            '@radix-ui/react-label',
            '@radix-ui/react-select',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
            'lucide-react',
            'sonner',
          ],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0', // Bind to all network interfaces
    strictPort: false,
  },
});
