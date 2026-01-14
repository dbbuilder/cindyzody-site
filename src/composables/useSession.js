/**
 * Session Management Composable
 * Handles practice session persistence and retrieval
 */

import { ref, computed, watch } from 'vue'
import { useAuth } from './useAuth'

// API base
const API_BASE = import.meta.env.VITE_API_URL || '/api'

// Generate guest ID for non-authenticated users
function getGuestId() {
  let guestId = localStorage.getItem('feelings_needs_guest_id')
  if (!guestId) {
    guestId = 'guest_' + Date.now().toString(36) + Math.random().toString(36).substr(2)
    localStorage.setItem('feelings_needs_guest_id', guestId)
  }
  return guestId
}

export function useSession() {
  const { user, isAuthenticated } = useAuth()

  const currentSession = ref(null)
  const sessions = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Get user identifier (user ID or guest ID)
  const identifier = computed(() => {
    if (isAuthenticated.value && user.value) {
      return { userId: user.value.id }
    }
    return { guestId: getGuestId() }
  })

  /**
   * Create a new practice session
   */
  async function createSession({ type = 'self-empathy', scenarioId = null, feelings = [], needs = [] } = {}) {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...identifier.value,
          type,
          scenarioId,
          feelings,
          needs
        })
      })

      if (!response.ok) throw new Error('Failed to create session')

      const data = await response.json()
      currentSession.value = {
        id: data.id,
        type,
        scenarioId,
        feelings,
        needs,
        messages: [],
        startTime: Date.now(),
        completed: false
      }

      return currentSession.value
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Update current session (auto-save)
   */
  async function updateSession(updates = {}) {
    if (!currentSession.value?.id) return

    try {
      const response = await fetch(`${API_BASE}/sessions/${currentSession.value.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })

      if (!response.ok) throw new Error('Failed to update session')

      // Update local state
      Object.assign(currentSession.value, updates)
    } catch (err) {
      console.error('Session update error:', err)
      // Don't throw - this is background saving
    }
  }

  /**
   * Complete current session
   */
  async function completeSession(summary = null) {
    if (!currentSession.value?.id) return

    const durationSeconds = Math.floor((Date.now() - currentSession.value.startTime) / 1000)

    await updateSession({
      completed: true,
      durationSeconds,
      summary
    })

    const completedSession = { ...currentSession.value }
    currentSession.value = null

    return completedSession
  }

  /**
   * Add message to current session
   */
  async function addMessage(message) {
    if (!currentSession.value) return

    const messages = [...(currentSession.value.messages || []), message]
    currentSession.value.messages = messages

    // Background save
    updateSession({ messages })
  }

  /**
   * Load user's session history
   */
  async function loadSessions(limit = 20, offset = 0) {
    isLoading.value = true
    error.value = null

    try {
      const params = new URLSearchParams({
        ...identifier.value,
        limit: limit.toString(),
        offset: offset.toString()
      })

      const response = await fetch(`${API_BASE}/sessions?${params}`)

      if (!response.ok) throw new Error('Failed to load sessions')

      const data = await response.json()
      sessions.value = data.sessions
      return data.sessions
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Load a specific session
   */
  async function loadSession(sessionId) {
    isLoading.value = true

    try {
      const response = await fetch(`${API_BASE}/sessions/${sessionId}`)

      if (!response.ok) throw new Error('Session not found')

      const data = await response.json()
      return data.session
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Delete a session
   */
  async function deleteSession(sessionId) {
    try {
      const params = new URLSearchParams(identifier.value)
      const response = await fetch(`${API_BASE}/sessions/${sessionId}?${params}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete session')

      sessions.value = sessions.value.filter(s => s.id !== sessionId)
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  /**
   * Resume an incomplete session
   */
  function resumeSession(session) {
    currentSession.value = {
      ...session,
      startTime: Date.now() - (session.duration_seconds || 0) * 1000
    }
  }

  return {
    // State
    currentSession,
    sessions,
    isLoading,
    error,

    // Methods
    createSession,
    updateSession,
    completeSession,
    addMessage,
    loadSessions,
    loadSession,
    deleteSession,
    resumeSession
  }
}

export default useSession
