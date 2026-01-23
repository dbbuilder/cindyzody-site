/**
 * Progress & Check-in API routes
 */

import { Router } from 'express'
import {
  getProgress,
  saveCheckIn,
  getCheckIns
} from '../services/database.js'
import logger from '../utils/logger.js'

const router = Router()
const progressLogger = logger.child({ module: 'progress' })

/**
 * Get user progress
 * GET /api/progress
 */
router.get('/', async (req, res) => {
  try {
    const { userId, guestId } = req.query

    if (!userId && !guestId) {
      return res.status(400).json({ error: 'userId or guestId required' })
    }

    const progress = getProgress(userId || guestId)

    res.json({ progress })
  } catch (error) {
    progressLogger.error('Get progress error', { error: error.message })
    res.status(500).json({ error: 'Failed to get progress' })
  }
})

/**
 * Save a daily check-in
 * POST /api/check-in
 */
router.post('/check-in', async (req, res) => {
  try {
    const { userId, guestId, feelings, needs, energyLevel, notes } = req.body

    if (!userId && !guestId) {
      return res.status(400).json({ error: 'userId or guestId required' })
    }

    if (!feelings || !Array.isArray(feelings) || feelings.length === 0) {
      return res.status(400).json({ error: 'At least one feeling required' })
    }

    const date = new Date().toISOString().split('T')[0]

    const { id } = saveCheckIn({
      userId,
      guestId,
      date,
      feelings,
      needs,
      energyLevel,
      notes
    })

    // Get updated progress
    const progress = getProgress(userId || guestId)

    res.json({
      id,
      date,
      message: 'Check-in saved',
      progress
    })
  } catch (error) {
    progressLogger.error('Save check-in error', { error: error.message })
    res.status(500).json({ error: 'Failed to save check-in' })
  }
})

/**
 * Get check-in history
 * GET /api/check-ins
 */
router.get('/check-ins', async (req, res) => {
  try {
    const { userId, guestId, limit = 30, offset = 0 } = req.query

    if (!userId && !guestId) {
      return res.status(400).json({ error: 'userId or guestId required' })
    }

    const checkIns = getCheckIns({
      userId,
      guestId,
      limit: parseInt(limit),
      offset: parseInt(offset)
    })

    res.json({ checkIns })
  } catch (error) {
    progressLogger.error('Get check-ins error', { error: error.message })
    res.status(500).json({ error: 'Failed to get check-ins' })
  }
})

/**
 * Get insights based on progress data
 * GET /api/insights
 */
router.get('/insights', async (req, res) => {
  try {
    const { userId, guestId } = req.query

    if (!userId && !guestId) {
      return res.status(400).json({ error: 'userId or guestId required' })
    }

    const progress = getProgress(userId || guestId)

    // Generate insights from progress data
    const insights = []

    // Top feelings
    const topFeelings = Object.entries(progress.feelingCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    if (topFeelings.length > 0) {
      insights.push({
        type: 'top_feelings',
        title: 'Your most common feelings',
        data: topFeelings.map(([id, count]) => ({ id, count }))
      })
    }

    // Top needs
    const topNeeds = Object.entries(progress.needCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    if (topNeeds.length > 0) {
      insights.push({
        type: 'top_needs',
        title: 'Your most explored needs',
        data: topNeeds.map(([id, count]) => ({ id, count }))
      })
    }

    // Streak insight
    if (progress.currentStreak >= 3) {
      insights.push({
        type: 'streak',
        title: `${progress.currentStreak} day streak!`,
        message: 'Keep up the great work with your daily practice.'
      })
    }

    // Session milestone
    if (progress.totalSessions >= 10) {
      insights.push({
        type: 'milestone',
        title: `${progress.totalSessions} sessions completed`,
        message: 'You\'re building a strong practice habit.'
      })
    }

    res.json({ insights })
  } catch (error) {
    progressLogger.error('Get insights error', { error: error.message })
    res.status(500).json({ error: 'Failed to get insights' })
  }
})

export default router
