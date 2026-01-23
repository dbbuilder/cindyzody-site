<template>
  <div v-if="error" class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full text-center">
      <div class="mb-6">
        <div class="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
          <ExclamationTriangleIcon class="w-8 h-8 text-red-600" />
        </div>
      </div>

      <h1 class="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
      <p class="text-gray-600 mb-6">
        We encountered an unexpected error. This has been logged and we'll look into it.
      </p>

      <div class="space-y-3">
        <button
          @click="retry"
          class="w-full bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors font-medium"
        >
          Try Again
        </button>

        <button
          @click="goHome"
          class="w-full border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Go to Home
        </button>
      </div>

      <!-- Error details (collapsed by default, for debugging) -->
      <details v-if="isDev" class="mt-6 text-left">
        <summary class="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
          Technical details
        </summary>
        <div class="mt-2 p-3 bg-gray-100 rounded-lg text-xs font-mono text-gray-700 overflow-auto max-h-48">
          <div class="font-bold text-red-600 mb-2">{{ error.name }}: {{ error.message }}</div>
          <pre class="whitespace-pre-wrap">{{ error.stack }}</pre>
        </div>
      </details>
    </div>
  </div>

  <slot v-else />
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const error = ref(null)
const isDev = import.meta.env.DEV

// Capture errors from child components
onErrorCaptured((err, instance, info) => {
  error.value = err

  // Log error for debugging
  console.error('[ErrorBoundary] Caught error:', err)
  console.error('[ErrorBoundary] Component:', instance)
  console.error('[ErrorBoundary] Info:', info)

  // Return false to prevent error from propagating further
  return false
})

function retry() {
  error.value = null
  // Force re-render by navigating to current route
  router.go(0)
}

function goHome() {
  error.value = null
  router.push('/')
}
</script>
