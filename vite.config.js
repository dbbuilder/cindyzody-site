import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    sourcemap: true,
    outDir: 'dist'
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