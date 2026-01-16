/**
 * Clerk Client Configuration
 * Handles authentication for both web and Capacitor iOS app
 */

import { Clerk } from '@clerk/clerk-js'
import { Capacitor } from '@capacitor/core'
import { Browser } from '@capacitor/browser'
import { App } from '@capacitor/app'

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// Detect if running in native Capacitor app
const isNative = Capacitor.isNativePlatform()

// App URL scheme for deep linking
const APP_SCHEME = 'feelingsneeds'
const WEB_URL = import.meta.env.VITE_SITE_URL || 'https://www.cindyzody.com'

let clerkInstance = null

/**
 * Get the appropriate redirect URL based on platform
 * For native apps, we use the web callback URL which will then redirect to the app scheme
 */
function getRedirectUrl() {
  if (isNative) {
    // Use web URL as intermediary - it will redirect to the app scheme
    return `${WEB_URL}/auth/callback`
  }
  // Web: redirect to current page
  return window.location.href
}

/**
 * Initialize Clerk authentication
 */
export async function initClerk() {
  if (!clerkPublishableKey) {
    console.warn('Clerk publishable key not configured. Auth features will be disabled.')
    return null
  }

  if (clerkInstance) {
    return clerkInstance
  }

  try {
    clerkInstance = new Clerk(clerkPublishableKey)

    // Load Clerk with appropriate settings
    await clerkInstance.load({
      // Appearance customization
      appearance: {
        variables: {
          colorPrimary: '#4a7c59', // brand-600
          borderRadius: '0.5rem'
        }
      },
      // Allow redirects for both web and native app
      allowedRedirectOrigins: [
        'http://localhost:5173',
        'https://www.cindyzody.com',
        'https://cindyzody-site.onrender.com'
      ]
    })

    // Set up deep link handler for native app
    if (isNative) {
      setupDeepLinkHandler()
    }

    console.log(`[Clerk] Initialized (${isNative ? 'native' : 'web'} mode)`, clerkInstance)
    console.log('[Clerk] User:', clerkInstance.user)
    return clerkInstance
  } catch (error) {
    console.error('[Clerk] Initialization error:', error)
    return null
  }
}

/**
 * Handle deep links for OAuth callbacks in native app
 */
function setupDeepLinkHandler() {
  App.addListener('appUrlOpen', async ({ url }) => {
    console.log('[Clerk] Deep link received:', url)

    // Check if this is an auth callback
    if (url.includes('auth/callback') || url.includes('sso-callback')) {
      try {
        // Close the browser if it's open
        await Browser.close()

        // Handle the OAuth callback
        if (clerkInstance) {
          await clerkInstance.handleRedirectCallback()
        }
      } catch (error) {
        console.error('[Clerk] OAuth callback error:', error)
      }
    }
  })
}

/**
 * Get the Clerk instance
 */
export function getClerk() {
  return clerkInstance
}

/**
 * Check if running in native app
 */
export function isNativeApp() {
  return isNative
}

/**
 * Open sign-in flow (handles both web and native)
 */
export async function openSignIn(options = {}) {
  const clerk = getClerk()
  if (!clerk) {
    console.error('[Clerk] Not initialized')
    return
  }

  console.log('[Clerk] openSignIn called, isNative:', isNative)

  if (isNative) {
    // Native: Open sign-in in external browser
    // Build the sign-in URL using Clerk's accounts.dev domain
    const redirectUrl = getRedirectUrl()
    const instance = extractClerkInstance(clerkPublishableKey)

    if (!instance) {
      console.error('[Clerk] Cannot determine Clerk instance')
      return
    }

    // Clerk hosted sign-in URL: https://{instance}.accounts.dev/sign-in
    const signInUrl = `https://${instance}.accounts.dev/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`
    console.log('[Clerk] Opening native browser:', signInUrl)

    await Browser.open({
      url: signInUrl,
      presentationStyle: 'popover'
    })
  } else {
    // Web: Use Clerk's modal directly
    console.log('[Clerk] Opening web modal')
    try {
      // Use new redirect props (fallbackRedirectUrl replaces deprecated afterSignInUrl)
      await clerk.openSignIn({
        fallbackRedirectUrl: window.location.href,
        ...options
      })
    } catch (err) {
      console.error('[Clerk] openSignIn error:', err)
    }
  }
}

/**
 * Extract the Clerk instance identifier from publishable key
 * The key encodes the instance name which maps to accounts.dev domain
 */
function extractClerkInstance(key) {
  if (!key) return null
  try {
    // pk_test_xxx or pk_live_xxx - the xxx is base64 encoded
    const encoded = key.split('_')[2]
    if (!encoded) return null
    const decoded = atob(encoded.replace(/-/g, '+').replace(/_/g, '/'))
    // Remove trailing $ and .clerk.accounts.dev if present
    let instance = decoded.endsWith('$') ? decoded.slice(0, -1) : decoded
    // The decoded value is like "precious-lamprey-79.clerk.accounts.dev"
    // We need just "precious-lamprey-79"
    if (instance.includes('.clerk.accounts.dev')) {
      instance = instance.replace('.clerk.accounts.dev', '')
    }
    return instance
  } catch (e) {
    console.error('[Clerk] Failed to extract instance:', e)
    return null
  }
}

/**
 * Open sign-up flow (handles both web and native)
 */
export async function openSignUp(options = {}) {
  const clerk = getClerk()
  if (!clerk) {
    console.error('[Clerk] Not initialized')
    return
  }

  console.log('[Clerk] openSignUp called, isNative:', isNative)

  if (isNative) {
    // Native: Open sign-up in external browser
    const redirectUrl = getRedirectUrl()
    const instance = extractClerkInstance(clerkPublishableKey)

    if (!instance) {
      console.error('[Clerk] Cannot determine Clerk instance')
      return
    }

    // Clerk hosted sign-up URL: https://{instance}.accounts.dev/sign-up
    const signUpUrl = `https://${instance}.accounts.dev/sign-up?redirect_url=${encodeURIComponent(redirectUrl)}`
    console.log('[Clerk] Opening native browser for sign-up:', signUpUrl)

    await Browser.open({
      url: signUpUrl,
      presentationStyle: 'popover'
    })
  } else {
    // Web: Use Clerk's modal
    console.log('[Clerk] Opening web sign-up modal')
    try {
      await clerk.openSignUp({
        fallbackRedirectUrl: window.location.href,
        ...options
      })
    } catch (err) {
      console.error('[Clerk] openSignUp error:', err)
    }
  }
}

/**
 * Sign out (handles both web and native)
 */
export async function signOut() {
  const clerk = getClerk()
  if (!clerk) return

  await clerk.signOut()
}

export default {
  initClerk,
  getClerk,
  isNativeApp,
  openSignIn,
  openSignUp,
  signOut
}
