/**
 * Authentication Composable using Clerk
 * Handles user authentication state and methods
 * Works for both web and Capacitor iOS app
 */

import { ref, computed, onMounted, watch } from 'vue'
import { initClerk, getClerk, openSignIn as clerkSignIn, openSignUp as clerkSignUp, signOut as clerkSignOut, isNativeApp } from '../lib/clerk'

// Shared state across components
const user = ref(null)
const isLoaded = ref(false)
const loading = ref(true)
const error = ref(null)

// Initialize auth state
let authInitialized = false

async function initAuth() {
  if (authInitialized) return
  authInitialized = true

  try {
    const clerk = await initClerk()

    if (!clerk) {
      loading.value = false
      isLoaded.value = true
      return
    }

    // Set initial user state
    user.value = clerk.user
    loading.value = false
    isLoaded.value = true

    // Listen for user changes
    clerk.addListener(({ user: clerkUser }) => {
      user.value = clerkUser
    })
  } catch (err) {
    console.error('Auth initialization error:', err)
    error.value = err.message
    loading.value = false
    isLoaded.value = true
  }
}

export function useAuth() {
  // Initialize on first use
  onMounted(() => {
    initAuth()
  })

  const isAuthenticated = computed(() => !!user.value)
  const isLoading = computed(() => loading.value)

  const displayName = computed(() => {
    if (!user.value) return 'Guest'
    return user.value.fullName ||
           user.value.firstName ||
           user.value.emailAddresses?.[0]?.emailAddress?.split('@')[0] ||
           'User'
  })

  const email = computed(() => {
    return user.value?.primaryEmailAddress?.emailAddress || null
  })

  const userId = computed(() => {
    return user.value?.id || null
  })

  const avatarUrl = computed(() => {
    return user.value?.imageUrl || null
  })

  /**
   * Open sign-in (works for both web modal and native browser)
   */
  async function signIn() {
    const clerk = getClerk()
    if (!clerk) {
      error.value = 'Authentication not configured'
      return
    }

    try {
      await clerkSignIn()
    } catch (err) {
      error.value = err.message
    }
  }

  /**
   * Open sign-up (works for both web modal and native browser)
   */
  async function signUp() {
    const clerk = getClerk()
    if (!clerk) {
      error.value = 'Authentication not configured'
      return
    }

    try {
      await clerkSignUp()
    } catch (err) {
      error.value = err.message
    }
  }

  /**
   * Sign out (works for both web and native)
   */
  async function signOut() {
    const clerk = getClerk()
    if (!clerk) return

    loading.value = true
    try {
      await clerkSignOut()
      user.value = null
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  /**
   * Open user profile modal
   */
  async function openUserProfile() {
    const clerk = getClerk()
    if (!clerk) return

    try {
      await clerk.openUserProfile()
    } catch (err) {
      error.value = err.message
    }
  }

  /**
   * Get session token for API calls
   */
  async function getToken() {
    const clerk = getClerk()
    if (!clerk?.session) return null

    try {
      return await clerk.session.getToken()
    } catch (err) {
      console.error('Error getting token:', err)
      return null
    }
  }

  return {
    // State
    user,
    loading: isLoading,
    error,
    isLoaded,
    isAuthenticated,
    isNative: isNativeApp(),
    displayName,
    email,
    userId,
    avatarUrl,

    // Methods
    signIn,
    signUp,
    signOut,
    openUserProfile,
    getToken
  }
}

/**
 * Guest mode composable for users who don't want to sign up
 * Stores data in localStorage instead
 */
export function useGuestMode() {
  const GUEST_KEY = 'feelings_needs_guest'
  const GUEST_ID_KEY = 'feelings_needs_guest_id'

  const guestData = ref(null)

  function getGuestId() {
    let guestId = localStorage.getItem(GUEST_ID_KEY)
    if (!guestId) {
      guestId = 'guest_' + Date.now().toString(36) + Math.random().toString(36).substr(2)
      localStorage.setItem(GUEST_ID_KEY, guestId)
    }
    return guestId
  }

  function loadGuestData() {
    try {
      const stored = localStorage.getItem(GUEST_KEY)
      guestData.value = stored ? JSON.parse(stored) : {
        sessions: [],
        checkIns: [],
        progress: {
          currentStreak: 0,
          totalSessions: 0
        }
      }
    } catch {
      guestData.value = { sessions: [], checkIns: [], progress: {} }
    }
  }

  function saveGuestData() {
    localStorage.setItem(GUEST_KEY, JSON.stringify(guestData.value))
  }

  function addSession(session) {
    guestData.value.sessions.unshift(session)
    guestData.value.sessions = guestData.value.sessions.slice(0, 50)
    guestData.value.progress.totalSessions++
    saveGuestData()
  }

  function addCheckIn(checkIn) {
    guestData.value.checkIns.unshift(checkIn)
    guestData.value.checkIns = guestData.value.checkIns.slice(0, 30)
    updateStreak()
    saveGuestData()
  }

  function updateStreak() {
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    const lastCheckIn = guestData.value.checkIns[0]?.date

    if (lastCheckIn === today) {
      // Already checked in today
    } else if (lastCheckIn === yesterday) {
      guestData.value.progress.currentStreak++
    } else {
      guestData.value.progress.currentStreak = 1
    }
  }

  function clearGuestData() {
    localStorage.removeItem(GUEST_KEY)
    localStorage.removeItem(GUEST_ID_KEY)
    guestData.value = null
  }

  // Load on init
  loadGuestData()

  return {
    guestId: getGuestId(),
    guestData,
    addSession,
    addCheckIn,
    clearGuestData,
    getGuestId
  }
}

export default useAuth
