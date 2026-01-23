/**
 * Progress Tracking Composable
 * Handles streaks, check-ins, and insights
 */

import { ref, computed } from 'vue'
import { useAuth } from './useAuth'
import { csrfFetch } from './useCsrf'

// API base
const API_BASE = import.meta.env.VITE_API_URL || '/api'

// Get guest ID
function getGuestId() {
  return localStorage.getItem('feelings_needs_guest_id') || null
}

export function useProgress() {
  const { user, isAuthenticated } = useAuth()

  const progress = ref(null)
  const checkIns = ref([])
  const insights = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Get user identifier
  const identifier = computed(() => {
    if (isAuthenticated.value && user.value) {
      return { userId: user.value.id }
    }
    const guestId = getGuestId()
    return guestId ? { guestId } : null
  })

  /**
   * Load user progress
   */
  async function loadProgress() {
    if (!identifier.value) {
      progress.value = {
        currentStreak: 0,
        longestStreak: 0,
        totalSessions: 0,
        totalCheckIns: 0
      }
      return progress.value
    }

    isLoading.value = true
    error.value = null

    try {
      const params = new URLSearchParams(identifier.value)
      const response = await fetch(`${API_BASE}/progress?${params}`)

      if (!response.ok) throw new Error('Failed to load progress')

      const data = await response.json()
      progress.value = data.progress
      return data.progress
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Save daily check-in
   */
  async function saveCheckIn({ feelings, needs = null, energyLevel = null, notes = null }) {
    if (!identifier.value) {
      error.value = 'No user identifier'
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await csrfFetch(`${API_BASE}/progress/check-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...identifier.value,
          feelings,
          needs,
          energyLevel,
          notes
        })
      })

      if (!response.ok) throw new Error('Failed to save check-in')

      const data = await response.json()

      // Update local progress
      progress.value = data.progress

      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Load check-in history
   */
  async function loadCheckIns(limit = 30) {
    if (!identifier.value) {
      checkIns.value = []
      return []
    }

    isLoading.value = true

    try {
      const params = new URLSearchParams({
        ...identifier.value,
        limit: limit.toString()
      })

      const response = await fetch(`${API_BASE}/progress/check-ins?${params}`)

      if (!response.ok) throw new Error('Failed to load check-ins')

      const data = await response.json()
      checkIns.value = data.checkIns
      return data.checkIns
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Load personalized insights
   */
  async function loadInsights() {
    if (!identifier.value) {
      insights.value = []
      return []
    }

    try {
      const params = new URLSearchParams(identifier.value)
      const response = await fetch(`${API_BASE}/progress/insights?${params}`)

      if (!response.ok) throw new Error('Failed to load insights')

      const data = await response.json()
      insights.value = data.insights
      return data.insights
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  /**
   * Check if user has checked in today
   */
  const hasCheckedInToday = computed(() => {
    if (!checkIns.value.length) return false
    const today = new Date().toISOString().split('T')[0]
    return checkIns.value[0]?.date === today
  })

  /**
   * Get streak display info
   */
  const streakInfo = computed(() => {
    if (!progress.value) return { current: 0, longest: 0, message: '' }

    const current = progress.value.currentStreak || 0
    const longest = progress.value.longestStreak || 0

    let message = ''
    if (current === 0) {
      message = 'Start your streak today!'
    } else if (current === 1) {
      message = 'Great start! Keep it going tomorrow.'
    } else if (current < 7) {
      message = `${current} days strong! Keep building.`
    } else if (current < 30) {
      message = `${current} days! You're on fire!`
    } else {
      message = `${current} days! Incredible dedication!`
    }

    return { current, longest, message }
  })

  return {
    // State
    progress,
    checkIns,
    insights,
    isLoading,
    error,

    // Computed
    hasCheckedInToday,
    streakInfo,

    // Methods
    loadProgress,
    saveCheckIn,
    loadCheckIns,
    loadInsights
  }
}

export default useProgress
