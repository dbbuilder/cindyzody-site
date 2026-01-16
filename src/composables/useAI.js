import { ref, computed, watch } from 'vue'

/**
 * AI Service Composable for NVC Practice
 * Handles communication with the backend AI API
 */
export function useAI() {
  // State
  const isLoading = ref(false)
  const error = ref(null)
  const currentSessionId = ref(null)
  const messages = ref([])

  // API base URL
  const apiBase = computed(() => {
    return import.meta.env.VITE_API_URL || '/api'
  })

  /**
   * Create a new chat session
   */
  async function createSession(options = {}) {
    const { type = 'self-empathy', feelings = [], needs = [], scenario = null } = options

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${apiBase.value}/ai/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, feelings, needs, scenario })
      })

      if (!response.ok) {
        throw new Error(`Failed to create session: ${response.statusText}`)
      }

      const data = await response.json()
      currentSessionId.value = data.sessionId

      // Add initial greeting message
      messages.value = [{
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.greeting,
        suggestions: data.suggestions || {},
        timestamp: new Date().toISOString()
      }]

      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Send a message to the AI
   */
  async function sendMessage(content, context = {}) {
    if (!content.trim()) return null

    isLoading.value = true
    error.value = null

    // Add user message immediately
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    }
    messages.value.push(userMessage)

    try {
      // Build conversation history for context (exclude the message we just added)
      const history = messages.value.slice(0, -1).map(m => ({
        role: m.role,
        content: m.content
      }))

      const response = await fetch(`${apiBase.value}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: currentSessionId.value,
          message: content,
          context: {
            selectedFeelings: context.feelings || [],
            selectedNeeds: context.needs || [],
            history, // Include conversation history
            ...context
          }
        })
      })

      if (!response.ok) {
        throw new Error(`Chat request failed: ${response.statusText}`)
      }

      const data = await response.json()

      // Add assistant response
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.message,
        suggestions: data.suggestions || {},
        timestamp: new Date().toISOString()
      }
      messages.value.push(assistantMessage)

      // Check for crisis detection
      if (data.crisisDetected) {
        console.warn('Crisis content detected in conversation')
      }

      return data
    } catch (err) {
      error.value = err.message
      // Remove user message on error
      messages.value = messages.value.filter(m => m.id !== userMessage.id)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get session summary (OFNR extraction)
   */
  async function getSessionSummary() {
    if (!currentSessionId.value) return null

    try {
      const response = await fetch(`${apiBase.value}/ai/session/${currentSessionId.value}/summary`)

      if (!response.ok) {
        throw new Error(`Failed to get summary: ${response.statusText}`)
      }

      return await response.json()
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  /**
   * Reset the current session
   */
  function resetSession() {
    currentSessionId.value = null
    messages.value = []
    error.value = null
  }

  /**
   * Load messages from localStorage (for persistence)
   */
  function loadFromStorage(sessionId) {
    const stored = localStorage.getItem(`nvc_session_${sessionId}`)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        currentSessionId.value = sessionId
        messages.value = data.messages || []
        return true
      } catch {
        return false
      }
    }
    return false
  }

  /**
   * Save messages to localStorage
   */
  function saveToStorage() {
    if (!currentSessionId.value) return
    localStorage.setItem(`nvc_session_${currentSessionId.value}`, JSON.stringify({
      sessionId: currentSessionId.value,
      messages: messages.value,
      savedAt: new Date().toISOString()
    }))
    // Also update recent sessions index
    updateRecentSessionsIndex(currentSessionId.value)
  }

  /**
   * Update the index of recent sessions
   */
  function updateRecentSessionsIndex(sessionId) {
    const indexKey = 'nvc_recent_sessions'
    let recent = []
    try {
      recent = JSON.parse(localStorage.getItem(indexKey) || '[]')
    } catch {
      recent = []
    }

    // Remove existing entry for this session
    recent = recent.filter(s => s.id !== sessionId)

    // Add to front
    recent.unshift({
      id: sessionId,
      lastAccess: new Date().toISOString()
    })

    // Keep only last 10 sessions
    recent = recent.slice(0, 10)

    localStorage.setItem(indexKey, JSON.stringify(recent))
  }

  /**
   * Get list of recent sessions
   */
  function getRecentSessions() {
    try {
      const recent = JSON.parse(localStorage.getItem('nvc_recent_sessions') || '[]')
      return recent.map(item => {
        const sessionData = localStorage.getItem(`nvc_session_${item.id}`)
        if (sessionData) {
          const data = JSON.parse(sessionData)
          return {
            ...item,
            messageCount: data.messages?.length || 0,
            savedAt: data.savedAt
          }
        }
        return item
      }).filter(s => localStorage.getItem(`nvc_session_${s.id}`))
    } catch {
      return []
    }
  }

  /**
   * Clear old sessions (keep only recent ones)
   */
  function clearOldSessions() {
    const recent = getRecentSessions()
    const recentIds = new Set(recent.map(s => s.id))

    // Find and remove any sessions not in recent list
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('nvc_session_') && key !== 'nvc_recent_sessions') {
        const sessionId = key.replace('nvc_session_', '')
        if (!recentIds.has(sessionId)) {
          localStorage.removeItem(key)
        }
      }
    }
  }

  // Auto-save when messages change
  watch(messages, () => {
    if (currentSessionId.value && messages.value.length > 0) {
      saveToStorage()
    }
  }, { deep: true })

  return {
    // State
    isLoading,
    error,
    currentSessionId,
    messages,

    // Methods
    createSession,
    sendMessage,
    getSessionSummary,
    resetSession,
    loadFromStorage,
    saveToStorage,
    getRecentSessions,
    clearOldSessions
  }
}

/**
 * Mock AI service for development/demo
 * Used when backend is not available
 */
export function useMockAI() {
  const isLoading = ref(false)
  const error = ref(null)
  const currentSessionId = ref(null)
  const messages = ref([])

  // Simulated responses based on NVC patterns
  const nvcResponses = [
    {
      patterns: ['angry', 'frustrated', 'upset', 'mad'],
      response: "I hear that you're feeling [FEELING]. It sounds like there might be some important needs not being met. Can you tell me more about what happened? What specifically did you observe?",
      suggestions: { feelings: ['frustrated', 'angry', 'hurt'], needs: ['respect', 'consideration', 'understanding'] }
    },
    {
      patterns: ['sad', 'lonely', 'down', 'depressed'],
      response: "Thank you for sharing that you're feeling [FEELING]. That takes courage. I'm wondering what needs might be underneath this feeling. Could it be a need for connection, understanding, or support?",
      suggestions: { feelings: ['sad', 'lonely', 'disconnected'], needs: ['connection', 'belonging', 'support'] }
    },
    {
      patterns: ['anxious', 'worried', 'scared', 'nervous'],
      response: "I can sense there's some anxiety or worry present. These feelings often point to unmet needs for safety, predictability, or reassurance. What situation is bringing up these feelings?",
      suggestions: { feelings: ['anxious', 'worried', 'scared'], needs: ['safety', 'reassurance', 'predictability'] }
    },
    {
      patterns: ['colleague', 'work', 'boss', 'coworker', 'job'],
      response: "Workplace situations can bring up strong feelings. Let's slow down and look at this through the NVC lens. What specifically happened? Try to describe just the facts, without evaluation.",
      suggestions: { needs: ['respect', 'autonomy', 'consideration', 'competence'] }
    },
    {
      patterns: ['partner', 'spouse', 'husband', 'wife', 'relationship'],
      response: "Relationships are where our deepest needs show up. I appreciate you sharing this. What did you observe your partner do or say? Let's start with the concrete observation.",
      suggestions: { needs: ['connection', 'intimacy', 'understanding', 'appreciation'] }
    }
  ]

  const defaultResponse = {
    response: "Thank you for sharing that. I want to understand better. When you think about this situation, what feelings come up for you? Take a moment to notice what's happening in your body.",
    suggestions: { followUp: "Try naming 2-3 feelings that resonate with your experience." }
  }

  function findResponse(text) {
    const lowerText = text.toLowerCase()
    for (const item of nvcResponses) {
      if (item.patterns.some(p => lowerText.includes(p))) {
        return item
      }
    }
    return defaultResponse
  }

  async function createSession(options = {}) {
    const { feelings = [], needs = [] } = options
    isLoading.value = true

    await new Promise(resolve => setTimeout(resolve, 500))

    currentSessionId.value = `mock-${Date.now()}`

    let greeting = "Hello! I'm here to help you practice Non-Violent Communication. "
    if (feelings.length > 0) {
      greeting += `I see you're exploring feelings of ${feelings.map(f => f.label || f).join(', ')}. `
    }
    if (needs.length > 0) {
      greeting += `And you've identified needs for ${needs.map(n => n.label || n).join(', ')}. `
    }
    greeting += "What situation would you like to work through today?"

    messages.value = [{
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: greeting,
      timestamp: new Date().toISOString()
    }]

    isLoading.value = false
    return { sessionId: currentSessionId.value, greeting }
  }

  async function sendMessage(content) {
    if (!content.trim()) return null

    isLoading.value = true

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    }
    messages.value.push(userMessage)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    const responseData = findResponse(content)
    let responseText = responseData.response

    // Replace placeholders
    const feelingMatch = content.toLowerCase().match(/feeling\s+(\w+)|feel\s+(\w+)|i'm\s+(\w+)|i am\s+(\w+)/)
    if (feelingMatch) {
      const feeling = feelingMatch[1] || feelingMatch[2] || feelingMatch[3] || feelingMatch[4]
      responseText = responseText.replace('[FEELING]', feeling)
    } else {
      responseText = responseText.replace('[FEELING]', 'this way')
    }

    const assistantMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: responseText,
      suggestions: responseData.suggestions || {},
      timestamp: new Date().toISOString()
    }
    messages.value.push(assistantMessage)

    isLoading.value = false
    return { message: responseText, suggestions: responseData.suggestions }
  }

  function resetSession() {
    currentSessionId.value = null
    messages.value = []
    error.value = null
  }

  return {
    isLoading,
    error,
    currentSessionId,
    messages,
    createSession,
    sendMessage,
    getSessionSummary: async () => null,
    resetSession,
    loadFromStorage: () => false,
    saveToStorage: () => {},
    getRecentSessions: () => [],
    clearOldSessions: () => {}
  }
}
