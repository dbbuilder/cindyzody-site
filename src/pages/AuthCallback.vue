<template>
  <div class="min-h-screen flex items-center justify-center bg-sage-50">
    <div class="text-center p-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
      <p class="text-slate-600">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Capacitor } from '@capacitor/core'
import { getClerk } from '../lib/clerk'

const router = useRouter()
const message = ref('Completing sign in...')

onMounted(async () => {
  const isNative = Capacitor.isNativePlatform()
  const urlParams = window.location.search
  const hash = window.location.hash

  // If we're in a native app context (opened from Safari after OAuth)
  // Redirect to the app's custom URL scheme
  if (isNative) {
    // We're inside the app's webview, handle normally
    await handleClerkCallback()
  } else {
    // Check if this is a redirect that should go to the native app
    // by looking for a special parameter or detecting mobile Safari
    const shouldRedirectToApp = detectNativeAppRedirect()

    if (shouldRedirectToApp) {
      message.value = 'Opening app...'
      // Redirect to the native app with the auth params
      const appUrl = `feelingsneeds://auth/callback${urlParams}${hash}`
      window.location.href = appUrl

      // Fallback if app doesn't open after 2 seconds
      setTimeout(() => {
        message.value = 'If the app did not open, please return to it manually.'
      }, 2000)
    } else {
      // Web browser - handle Clerk callback directly
      await handleClerkCallback()
    }
  }
})

function detectNativeAppRedirect() {
  // Check for mobile device user agent (iOS Safari after OAuth redirect)
  const isMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent)

  // Check if we have Clerk callback params
  const hasCallbackParams = window.location.search.includes('__clerk') ||
                           window.location.hash.includes('__clerk') ||
                           window.location.search.includes('code=')

  // On mobile with callback params, redirect to app
  return isMobile && hasCallbackParams
}

async function handleClerkCallback() {
  try {
    const clerk = getClerk()
    if (clerk) {
      // Let Clerk handle the redirect callback
      await clerk.handleRedirectCallback()
    }
    // Redirect to home page
    router.push('/')
  } catch (error) {
    console.error('[AuthCallback] Error handling callback:', error)
    message.value = 'Sign in completed. Redirecting...'
    router.push('/')
  }
}
</script>
