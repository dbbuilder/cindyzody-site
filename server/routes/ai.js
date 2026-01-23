/**
 * AI Chat API routes for NVC practice
 * Protected with optional Clerk authentication (applied in server/index.js)
 */

import { Router } from 'express'
import { randomUUID } from 'crypto'
import logger from '../utils/logger.js'

const router = Router()
const aiLogger = logger.child({ module: 'ai' })

// NVC System Prompt
const NVC_SYSTEM_PROMPT = `You are a compassionate NVC (Nonviolent Communication) facilitator helping someone practice the OFNR framework: Observation, Feeling, Need, Request.

YOUR ROLE:
- Guide users through identifying observations (facts without judgment)
- Help them connect to genuine feelings (not thoughts disguised as feelings)
- Assist in uncovering underlying universal human needs
- Support formulating clear, doable requests

COMMUNICATION STYLE:
- Warm, empathetic, non-judgmental
- Use reflective listening ("It sounds like...", "I'm hearing that...")
- Ask open-ended questions
- Validate emotions before moving forward
- Be patient and allow space for processing

KEY NVC PRINCIPLES:
1. OBSERVATIONS vs EVALUATIONS: Help distinguish "She arrived at 9:15" (observation) from "She's always late" (evaluation)
2. FEELINGS vs FAUX FEELINGS: Real feelings (sad, anxious, joyful) vs thoughts-as-feelings (abandoned, rejected, unappreciated)
3. NEEDS are universal: connection, autonomy, meaning, safety, etc. - not strategies
4. REQUESTS are specific, positive, doable - not demands

CONVERSATION FLOW:
1. Start by understanding their situation
2. Gently guide them to observations
3. Help identify feelings (suggest options if they're stuck)
4. Connect feelings to needs
5. Eventually explore requests (but don't rush)

SAFETY:
- If someone expresses self-harm, suicidal thoughts, or crisis content, acknowledge their pain empathetically and gently suggest professional resources
- You are NOT a therapist - remind users of this if appropriate
- For relationship abuse, prioritize safety over NVC process

RESPONSE FORMAT:
- Keep responses concise (2-4 sentences typically)
- One question or reflection at a time
- You may suggest specific feelings or needs when helpful
- Use the user's own words when reflecting back

Remember: The goal is not perfection but practice. Celebrate attempts and gently guide refinements.`

// Crisis detection
const CRISIS_KEYWORDS = [
  'kill myself', 'end my life', 'suicide', 'want to die',
  'self-harm', 'cutting myself', 'overdose', 'no reason to live'
]

const CRISIS_RESPONSE = `I hear that you're going through something really painful right now. I want you to know that matters, and you matter.

While I'm here to help with NVC practice, what you're describing deserves support from someone trained in crisis care. Please consider reaching out:

📞 988 Suicide & Crisis Lifeline: Call or text 988 (available 24/7)
💬 Crisis Text Line: Text HOME to 741741

Would you like to continue our conversation, or would you prefer some space right now?`

// Session greetings by type
const SESSION_GREETINGS = {
  'self-empathy': (context) => {
    let greeting = "Hello! I'm here to help you practice self-empathy using NVC. "
    if (context.feelings?.length > 0) {
      greeting += `I see you've identified feeling ${context.feelings.map(f => f.label || f).join(', ')}. `
    }
    if (context.needs?.length > 0) {
      greeting += `And you're noticing needs for ${context.needs.map(n => n.label || n).join(', ')}. `
    }
    greeting += "What situation is bringing up these feelings for you? Take your time - I'm here to listen."
    return greeting
  },
  'empathy': () => {
    return "Let's practice giving empathy to someone else. Think of a person you'd like to understand better. What did they say or do that you're trying to make sense of?"
  },
  'prep': () => {
    return "I'll help you prepare for an upcoming conversation. Who would you like to talk to, and what's the topic? Let's start by getting clear on what you're hoping to communicate."
  },
  'scenario': (context) => {
    if (context.scenario) {
      return `Let's work through this scenario: "${context.scenario.title || context.scenario}"\n\nHow would you like to approach this situation?`
    }
    return "Tell me about a situation you'd like to practice handling with NVC. It could be something from the past, present, or a hypothetical scenario you're worried about."
  }
}

/**
 * Create new session
 * POST /api/ai/session
 */
router.post('/session', async (req, res) => {
  try {
    const {
      type = 'self-empathy',
      feelings = [],
      needs = [],
      scenario = null
    } = req.body

    // Validate session type
    const validTypes = ['self-empathy', 'empathy', 'prep', 'scenario']
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid session type' })
    }

    // Generate session ID
    const sessionId = randomUUID()

    // Build context
    const context = { feelings, needs, scenario }

    // Get appropriate greeting
    const greetingFn = SESSION_GREETINGS[type] || SESSION_GREETINGS['self-empathy']
    const greeting = greetingFn(context)

    // Build initial suggestions based on context
    const suggestions = {}
    if (feelings.length === 0) {
      suggestions.followUp = "What feelings are coming up for you in this situation?"
    }

    res.json({
      sessionId,
      type,
      greeting,
      suggestions,
      createdAt: new Date().toISOString()
    })
  } catch (error) {
    aiLogger.error('Session API error', { error: error.message })
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * Chat with AI
 * POST /api/ai/chat
 */
router.post('/chat', async (req, res) => {
  try {
    const { sessionId, message, context = {} } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    // Log request with auth status (for monitoring/debugging)
    const userId = req.user?.id || 'anonymous'
    aiLogger.debug('Chat request', { userId, sessionId, authenticated: req.isAuthenticated })

    // Check for crisis content
    if (detectCrisis(message)) {
      return res.json({
        message: CRISIS_RESPONSE,
        crisisDetected: true,
        suggestions: {}
      })
    }

    // Get API key from environment
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      aiLogger.error('ANTHROPIC_API_KEY not configured')
      return res.status(500).json({ error: 'AI service not configured' })
    }

    // Build conversation context
    const contextParts = []
    if (context.selectedFeelings?.length) {
      contextParts.push(`User has selected these feelings: ${context.selectedFeelings.map(f => f.label || f).join(', ')}`)
    }
    if (context.selectedNeeds?.length) {
      contextParts.push(`User has identified these needs: ${context.selectedNeeds.map(n => n.label || n).join(', ')}`)
    }

    const systemPrompt = contextParts.length > 0
      ? `${NVC_SYSTEM_PROMPT}\n\nCONTEXT:\n${contextParts.join('\n')}`
      : NVC_SYSTEM_PROMPT

    // Build messages array
    const messages = context.history || []
    messages.push({ role: 'user', content: message })

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages.slice(-10)
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      aiLogger.error('Claude API error', { status: response.status, error: errorData })
      return res.status(500).json({ error: 'AI service error' })
    }

    const data = await response.json()
    const assistantMessage = data.content[0].text

    // Extract any suggested feelings/needs from response
    const suggestions = extractSuggestions(assistantMessage)

    res.json({
      message: assistantMessage,
      suggestions,
      crisisDetected: false
    })
  } catch (error) {
    aiLogger.error('Chat API error', { error: error.message, stack: error.stack })
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * Get session summary
 * GET /api/ai/session/:id/summary
 */
router.get('/session/:id/summary', async (req, res) => {
  try {
    const { id } = req.params
    const { messages = [] } = req.query

    // Parse messages if passed as query param
    let conversationHistory = []
    if (typeof messages === 'string') {
      try {
        conversationHistory = JSON.parse(messages)
      } catch {
        conversationHistory = []
      }
    }

    // If no messages provided, return a basic summary structure
    if (conversationHistory.length === 0) {
      return res.json({
        sessionId: id,
        summary: {
          observation: null,
          feelings: [],
          needs: [],
          request: null,
          keyInsights: [],
          practiceNotes: 'Session in progress or no messages recorded.'
        },
        generatedAt: new Date().toISOString()
      })
    }

    // Get API key
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      // Return extracted data without AI summary
      return res.json({
        sessionId: id,
        summary: extractOFNRFromMessages(conversationHistory),
        generatedAt: new Date().toISOString()
      })
    }

    // Use Claude to generate a proper summary
    const summaryPrompt = `Analyze this NVC practice conversation and extract the OFNR components.

CONVERSATION:
${conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n')}

Respond in this exact JSON format:
{
  "observation": "The specific situation or trigger (or null if not identified)",
  "feelings": ["list", "of", "feelings", "identified"],
  "needs": ["list", "of", "needs", "identified"],
  "request": "Any request formulated (or null if not yet)",
  "keyInsights": ["key insight 1", "key insight 2"],
  "practiceNotes": "Brief note on what went well and areas for continued practice"
}`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{ role: 'user', content: summaryPrompt }]
      })
    })

    if (!response.ok) {
      // Fallback to basic extraction
      return res.json({
        sessionId: id,
        summary: extractOFNRFromMessages(conversationHistory),
        generatedAt: new Date().toISOString()
      })
    }

    const data = await response.json()
    const responseText = data.content[0].text

    // Parse the JSON response
    let summary
    try {
      // Extract JSON from response (might have markdown code blocks)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      summary = jsonMatch ? JSON.parse(jsonMatch[0]) : extractOFNRFromMessages(conversationHistory)
    } catch {
      summary = extractOFNRFromMessages(conversationHistory)
    }

    res.json({
      sessionId: id,
      summary,
      generatedAt: new Date().toISOString()
    })
  } catch (error) {
    aiLogger.error('Session summary error', { error: error.message })
    res.status(500).json({ error: 'Failed to generate summary' })
  }
})

/**
 * Extract OFNR components from messages without AI
 */
function extractOFNRFromMessages(messages) {
  const allText = messages.map(m => m.content).join(' ').toLowerCase()

  const feelings = extractSuggestions(allText).feelings || []
  const needs = extractSuggestions(allText).needs || []

  return {
    observation: null,
    feelings,
    needs,
    request: null,
    keyInsights: [],
    practiceNotes: 'Summary generated from conversation keywords.'
  }
}

// Helper functions
function detectCrisis(text) {
  const lowerText = text.toLowerCase()
  return CRISIS_KEYWORDS.some(keyword => lowerText.includes(keyword))
}

function extractSuggestions(text) {
  const suggestions = {}

  const feelingPatterns = [
    'frustrated', 'angry', 'sad', 'anxious', 'worried', 'scared',
    'hurt', 'disappointed', 'overwhelmed', 'lonely', 'confused',
    'peaceful', 'joyful', 'grateful', 'hopeful', 'excited', 'relieved'
  ]

  const needPatterns = [
    'connection', 'understanding', 'respect', 'autonomy', 'safety',
    'support', 'appreciation', 'consideration', 'belonging', 'rest',
    'honesty', 'trust', 'meaning', 'competence', 'ease'
  ]

  const lowerText = text.toLowerCase()

  const mentionedFeelings = feelingPatterns.filter(f => lowerText.includes(f))
  const mentionedNeeds = needPatterns.filter(n => lowerText.includes(n))

  if (mentionedFeelings.length > 0) {
    suggestions.feelings = mentionedFeelings.slice(0, 3)
  }
  if (mentionedNeeds.length > 0) {
    suggestions.needs = mentionedNeeds.slice(0, 3)
  }

  return suggestions
}

export default router
