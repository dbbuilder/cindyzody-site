/**
 * Practice Sessions API routes
 */

import { Router } from 'express'
import { randomUUID } from 'crypto'
import {
  saveSession,
  getSession,
  getSessions,
  deleteSession,
  updateProgressOnSession
} from '../services/database.js'
import logger from '../utils/logger.js'

const router = Router()
const sessionsLogger = logger.child({ module: 'sessions' })

/**
 * Create a new session
 * POST /api/sessions
 */
router.post('/', async (req, res) => {
  try {
    const { userId, guestId, type, scenarioId, feelings, needs } = req.body

    if (!userId && !guestId) {
      return res.status(400).json({ error: 'userId or guestId required' })
    }

    const id = randomUUID()

    saveSession({
      id,
      userId,
      guestId,
      type: type || 'self-empathy',
      scenarioId,
      feelings: feelings || [],
      needs: needs || [],
      messages: [],
      completed: false
    })

    res.json({
      id,
      message: 'Session created',
      createdAt: new Date().toISOString()
    })
  } catch (error) {
    sessionsLogger.error('Create session error', { error: error.message })
    res.status(500).json({ error: 'Failed to create session' })
  }
})

/**
 * Get sessions for user
 * GET /api/sessions
 */
router.get('/', async (req, res) => {
  try {
    const { userId, guestId, limit = 20, offset = 0 } = req.query

    if (!userId && !guestId) {
      return res.status(400).json({ error: 'userId or guestId required' })
    }

    const sessions = getSessions({
      userId,
      guestId,
      limit: parseInt(limit),
      offset: parseInt(offset)
    })

    res.json({ sessions })
  } catch (error) {
    sessionsLogger.error('Get sessions error', { error: error.message })
    res.status(500).json({ error: 'Failed to get sessions' })
  }
})

/**
 * Get a specific session
 * GET /api/sessions/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const session = getSession(id)

    if (!session) {
      return res.status(404).json({ error: 'Session not found' })
    }

    res.json({ session })
  } catch (error) {
    sessionsLogger.error('Get session error', { error: error.message })
    res.status(500).json({ error: 'Failed to get session' })
  }
})

/**
 * Update a session
 * PUT /api/sessions/:id
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { feelings, needs, messages, summary, durationSeconds, completed } = req.body

    const existing = getSession(id)
    if (!existing) {
      return res.status(404).json({ error: 'Session not found' })
    }

    saveSession({
      id,
      userId: existing.user_id,
      guestId: existing.guest_id,
      type: existing.type,
      scenarioId: existing.scenario_id,
      feelings: feelings ?? existing.feelings,
      needs: needs ?? existing.needs,
      messages: messages ?? existing.messages,
      summary: summary ?? existing.summary,
      durationSeconds: durationSeconds ?? existing.duration_seconds,
      completed: completed ?? existing.completed
    })

    // Update progress if session completed
    if (completed && !existing.completed) {
      const userId = existing.user_id || existing.guest_id
      updateProgressOnSession(userId, feelings || existing.feelings, needs || existing.needs)
    }

    res.json({ message: 'Session updated' })
  } catch (error) {
    sessionsLogger.error('Update session error', { error: error.message })
    res.status(500).json({ error: 'Failed to update session' })
  }
})

/**
 * Delete a session
 * DELETE /api/sessions/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.query

    if (!userId) {
      return res.status(400).json({ error: 'userId required' })
    }

    deleteSession(id, userId)

    res.json({ message: 'Session deleted' })
  } catch (error) {
    sessionsLogger.error('Delete session error', { error: error.message })
    res.status(500).json({ error: 'Failed to delete session' })
  }
})

export default router
