import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    sourcemap: true,
    outDir: 'dist',
    rollupOptions: {
      output: {
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