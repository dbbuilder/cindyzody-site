/**
 * Authentication Composable
 * Handles user authentication state and methods
 */

import { ref, computed, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

// Shared state across components
const user = ref(null)
const profile = ref(null)
const loading = ref(true)
const error = ref(null)

// Initialize auth state listener
let authInitialized = false

function initAuth() {
  if (authInitialized || !supabase) return
  authInitialized = true

  // Get initial session
  supabase.auth.getSession().then(({ data: { session } }) => {
    user.value = session?.user ?? null
    if (session?.user) {
      fetchProfile(session.user.id)
    }
    loading.value = false
  })

  // Listen for auth changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    user.value = session?.user ?? null

    if (event === 'SIGNED_IN' && session?.user) {
      await fetchProfile(session.user.id)
    } else if (event === 'SIGNED_OUT') {
      profile.value = null
    }
  })
}

async function fetchProfile(userId) {
  if (!supabase) return

  try {
    const { data, error: fetchError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching profile:', fetchError)
    }

    profile.value = data
  } catch (err) {
    console.error('Profile fetch error:', err)
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
    return profile.value?.display_name ||
           user.value?.user_metadata?.full_name ||
           user.value?.email?.split('@')[0] ||
           'Guest'
  })

  /**
   * Sign up with email and password
   */
  async function signUp({ email, password, name }) {
    if (!supabase) {
      error.value = 'Authentication not configured'
      return { error: error.value }
    }

    loading.value = true
    error.value = null

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      })

      if (signUpError) throw signUpError

      // Create user profile
      if (data.user) {
        await supabase.from('user_profiles').upsert({
          id: data.user.id,
          display_name: name,
          created_at: new Date().toISOString()
        })
      }

      return { data, error: null }
    } catch (err) {
      error.value = err.message
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  /**
   * Sign in with email and password
   */
  async function signIn({ email, password }) {
    if (!supabase) {
      error.value = 'Authentication not configured'
      return { error: error.value }
    }

    loading.value = true
    error.value = null

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) throw signInError

      return { data, error: null }
    } catch (err) {
      error.value = err.message
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  /**
   * Sign in with OAuth provider
   */
  async function signInWithProvider(provider) {
    if (!supabase) {
      error.value = 'Authentication not configured'
      return { error: error.value }
    }

    try {
      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (oauthError) throw oauthError

      return { data, error: null }
    } catch (err) {
      error.value = err.message
      return { data: null, error: err.message }
    }
  }

  /**
   * Sign out
   */
  async function signOut() {
    if (!supabase) return

    loading.value = true
    try {
      await supabase.auth.signOut()
      user.value = null
      profile.value = null
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  /**
   * Send password reset email
   */
  async function resetPassword(email) {
    if (!supabase) {
      error.value = 'Authentication not configured'
      return { error: error.value }
    }

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      })

      if (resetError) throw resetError

      return { error: null }
    } catch (err) {
      error.value = err.message
      return { error: err.message }
    }
  }

  /**
   * Update password
   */
  async function updatePassword(newPassword) {
    if (!supabase) {
      error.value = 'Authentication not configured'
      return { error: error.value }
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (updateError) throw updateError

      return { error: null }
    } catch (err) {
      error.value = err.message
      return { error: err.message }
    }
  }

  /**
   * Update user profile
   */
  async function updateProfile(updates) {
    if (!supabase || !user.value) {
      error.value = 'Not authenticated'
      return { error: error.value }
    }

    try {
      const { data, error: updateError } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.value.id,
          ...updates,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (updateError) throw updateError

      profile.value = data
      return { data, error: null }
    } catch (err) {
      error.value = err.message
      return { data: null, error: err.message }
    }
  }

  return {
    // State
    user,
    profile,
    loading: isLoading,
    error,
    isAuthenticated,
    displayName,

    // Methods
    signUp,
    signIn,
    signInWithProvider,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile
  }
}

/**
 * Guest mode composable for users who don't want to sign up
 * Stores data in localStorage instead
 */
export function useGuestMode() {
  const GUEST_KEY = 'feelings_needs_guest'

  const guestData = ref(null)

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
    guestData.value.sessions = guestData.value.sessions.slice(0, 50) // Keep last 50
    guestData.value.progress.totalSessions++
    saveGuestData()
  }

  function addCheckIn(checkIn) {
    guestData.value.checkIns.unshift(checkIn)
    guestData.value.checkIns = guestData.value.checkIns.slice(0, 30) // Keep last 30 days
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
    guestData.value = null
  }

  // Load on init
  loadGuestData()

  return {
    guestData,
    addSession,
    addCheckIn,
    clearGuestData
  }
}

export default useAuth
