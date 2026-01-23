import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    root: '.',
    environment: 'node',
    include: ['**/*.test.js', '**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules', 'dist', '**/*.test.*']
    }
  }
})
