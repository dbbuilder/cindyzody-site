/**
 * Express server for Cindy Zody Site
 * Handles API routes and serves static frontend
 */

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import logger from './utils/logger.js'

// Import route handlers
import contactRouter from './routes/contact.js'
import scheduleRouter from './routes/schedule.js'
import aiRouter from './routes/ai.js'
import sessionsRouter from './routes/sessions.js'
import progressRouter from './routes/progress.js'
import { optionalAuth } from './middleware/auth.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 21000

// Trust proxy for rate limiting behind reverse proxy (Render)
app.set('trust proxy', 1)

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}))
app.use(express.json())

// Rate limiting configurations
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: { error: 'Too many contact form submissions. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
})

const scheduleLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 appointment requests per hour
  message: { error: 'Too many appointment requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
})

// AI rate limiter with tiered limits based on authentication
// Authenticated users: 30/min, Anonymous users: 10/min
const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: (req) => {
    // After auth middleware runs, check if user is authenticated
    return req.isAuthenticated ? 30 : 10
  },
  keyGenerator: (req) => {
    // Use user ID for authenticated users, IP for anonymous
    return req.user?.id || req.ip
  },
  message: { error: 'Too many requests. Please slow down or sign in for higher limits.' },
  standardHeaders: true,
  legacyHeaders: false
})

// API Routes with rate limiting
app.use('/api/contact', contactLimiter, contactRouter)
app.use('/api/schedule', scheduleLimiter, scheduleRouter)
// AI routes: auth middleware runs first for tiered rate limiting
app.use('/api/ai', optionalAuth, aiLimiter, aiRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/progress', progressRouter)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const distPath = join(__dirname, '../dist')
  app.use(express.static(distPath))

  // SPA fallback - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(join(distPath, 'index.html'))
    }
  })
}

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Server error', { error: err.message, stack: err.stack })
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

app.listen(PORT, () => {
  logger.info('Server started', { port: PORT, env: process.env.NODE_ENV || 'development' })
})

export default app
