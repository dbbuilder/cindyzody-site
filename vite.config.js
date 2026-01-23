import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Build timestamp for cache busting
const buildTimestamp = Date.now()

export default defineConfig({
  plugins: [vue()],
  define: {
    // Inject build timestamp for debugging/cache verification
    __BUILD_TIMESTAMP__: JSON.stringify(buildTimestamp),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString())
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
    // Ensure content hashes in filenames for cache busting
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Content hash in all chunk filenames ensures cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: {
          // Core Vue framework
          'vue-vendor': ['vue', 'vue-router'],
          // UI components
          'ui-vendor': ['@headlessui/vue', '@heroicons/vue'],
          // Clerk authentication
          'clerk-vendor': ['@clerk/clerk-js', '@clerk/vue'],
          // Capacitor (mobile)
          'capacitor-vendor': [
            '@capacitor/core',
            '@capacitor/app',
            '@capacitor/browser',
            '@capacitor/keyboard',
            '@capacitor/splash-screen'
          ],
          // PDF generation (loaded on-demand but chunk separately)
          'pdf-vendor': ['html2pdf.js']
        }
      }
    }
  },
  server: {
    port: 21001,
    proxy: {
      '/api': {
        target: 'http://localhost:21000',
        changeOrigin: true
      }
    }
  }
})