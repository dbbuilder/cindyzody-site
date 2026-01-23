/**
 * CSRF Token Composable
 * Handles CSRF token fetching and inclusion in API requests
 */

import { ref } from 'vue'

// Shared CSRF token (singleton)
let csrfToken = null
let tokenPromise = null

/**
 * Fetch a fresh CSRF token from the server
 */
async function fetchCsrfToken() {
  try {
    const response = await fetch('/api/csrf-token', {
      credentials: 'include' // Include cookies
    })

    if (!response.ok) {
      throw new Error('Failed to fetch CSRF token')
    }

    const data = await response.json()
    csrfToken = data.token
    return csrfToken
  } catch (error) {
    console.error('CSRF token fetch error:', error)
    throw error
  }
}

/**
 * Get the current CSRF token, fetching if necessary
 * Uses singleton pattern to prevent multiple simultaneous fetches
 */
async function getToken() {
  if (csrfToken) {
    return csrfToken
  }

  // If already fetching, wait for that promise
  if (tokenPromise) {
    return tokenPromise
  }

  // Fetch new token
  tokenPromise = fetchCsrfToken()
  try {
    const token = await tokenPromise
    return token
  } finally {
    tokenPromise = null
  }
}

/**
 * Clear the cached token (call after 403 errors)
 */
function clearToken() {
  csrfToken = null
}

/**
 * Fetch wrapper that automatically includes CSRF token
 * @param {string} url - The URL to fetch
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<Response>}
 */
export async function csrfFetch(url, options = {}) {
  // Only add CSRF token for state-changing methods
  const method = (options.method || 'GET').toUpperCase()
  const needsCsrf = !['GET', 'HEAD', 'OPTIONS'].includes(method)

  if (needsCsrf) {
    const token = await getToken()

    options.headers = {
      ...options.headers,
      'X-CSRF-Token': token
    }

    // Ensure credentials are included for cookies
    options.credentials = options.credentials || 'include'
  }

  const response = await fetch(url, options)

  // If we get a 403, clear token and retry once
  if (response.status === 403) {
    const data = await response.clone().json().catch(() => ({}))
    if (data.error?.includes('CSRF')) {
      clearToken()

      // Retry with fresh token
      if (needsCsrf) {
        const newToken = await getToken()
        options.headers['X-CSRF-Token'] = newToken
        return fetch(url, options)
      }
    }
  }

  return response
}

/**
 * Vue composable for CSRF token management
 */
export function useCsrf() {
  const loading = ref(false)
  const error = ref(null)

  /**
   * Initialize CSRF token (call on app mount)
   */
  async function initCsrf() {
    loading.value = true
    error.value = null

    try {
      await getToken()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    initCsrf,
    csrfFetch,
    clearToken
  }
}

export default useCsrf
