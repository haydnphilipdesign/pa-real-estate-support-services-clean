// vite.config.vercel.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import viteCompression from 'vite-plugin-compression';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    react({ tsDecorators: true }),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
  ],
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['stream-browserify', 'util', 'events', 'buffer', 'url', 'https-browserify', 'http-browserify', 'browserify-zlib', 'assert']
  },
  publicDir: 'public',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // NEW — so you can do `import { Home… } from 'pages'`
      "pages": path.resolve(__dirname, "./src/pages"),
      // Node.js polyfills for browser
      "stream": "stream-browserify",
      "util": "util",
      "events": "events",
      "buffer": "buffer",
      "url": "url",
      "https": "https-browserify",
      "http": "http-browserify", 
      "zlib": "browserify-zlib",
      "assert": "assert",
    },
    // remove `extensions` — Vite handles .ts/.tsx by default
    preserveSymlinks: false,
    mainFields: ['module','main'],
  },
  css: {
    postcss: {
      plugins: [ tailwindcss({ config: './tailwind.config.cjs' }), autoprefixer ],
    },
    modules: { localsConvention: 'camelCase' },
    devSourcemap: true,
  },
  esbuild: {
    target: 'es2020',
    ignoreAnnotations: true,
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  build: {
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: { /* …your chunks… */ },
      },
    },
  },
});

