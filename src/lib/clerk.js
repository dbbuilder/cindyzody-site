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
 */
function getRedirectUrl() {
  if (isNative) {
    // Deep link back to app after OAuth
    return `${APP_SCHEME}://auth/callback`
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
      }
    })

    // Set up deep link handler for native app
    if (isNative) {
      setupDeepLinkHandler()
    }

    console.log(`[Clerk] Initialized (${isNative ? 'native' : 'web'} mode)`)
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

  const redirectUrl = getRedirectUrl()

  if (isNative) {
    // Native: Open sign-in in external browser
    const signInUrl = clerk.buildSignInUrl({
      redirectUrl,
      ...options
    })

    await Browser.open({
      url: signInUrl,
      presentationStyle: 'popover'
    })
  } else {
    // Web: Use Clerk's modal
    await clerk.openSignIn({
      afterSignInUrl: redirectUrl,
      afterSignUpUrl: redirectUrl,
      ...options
    })
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

  const redirectUrl = getRedirectUrl()

  if (isNative) {
    // Native: Open sign-up in external browser
    const signUpUrl = clerk.buildSignUpUrl({
      redirectUrl,
      ...options
    })

    await Browser.open({
      url: signUpUrl,
      presentationStyle: 'popover'
    })
  } else {
    // Web: Use Clerk's modal
    await clerk.openSignUp({
      afterSignInUrl: redirectUrl,
      afterSignUpUrl: redirectUrl,
      ...options
    })
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
