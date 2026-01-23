/**
 * Express server for Cindy Zody Site
 * Handles API routes and serves static frontend
 */

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import logger from './utils/logger.js'
import { RATE_LIMITS, SERVER, HTTP_STATUS } from './config/constants.js'

// Import route handlers
import contactRouter from './routes/contact.js'
import scheduleRouter from './routes/schedule.js'
import aiRouter from './routes/ai.js'
import sessionsRouter from './routes/sessions.js'
import progressRouter from './routes/progress.js'
import { optionalAuth } from './middleware/auth.js'
import { csrfProtection, csrfTokenHandler } from './middleware/csrf.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || SERVER.DEFAULT_PORT

// Trust proxy for rate limiting behind reverse proxy (Render)
app.set('trust proxy', SERVER.TRUST_PROXY)

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// CSRF token endpoint (must be before CSRF protection middleware)
app.get('/api/csrf-token', csrfTokenHandler)

// Rate limiting configurations using centralized constants
const contactLimiter = rateLimit({
  windowMs: RATE_LIMITS.CONTACT.WINDOW_MS,
  max: RATE_LIMITS.CONTACT.MAX_REQUESTS,
  message: { error: RATE_LIMITS.CONTACT.MESSAGE },
  standardHeaders: true,
  legacyHeaders: false
})

const scheduleLimiter = rateLimit({
  windowMs: RATE_LIMITS.SCHEDULE.WINDOW_MS,
  max: RATE_LIMITS.SCHEDULE.MAX_REQUESTS,
  message: { error: RATE_LIMITS.SCHEDULE.MESSAGE },
  standardHeaders: true,
  legacyHeaders: false
})

// AI rate limiter with tiered limits based on authentication
const aiLimiter = rateLimit({
  windowMs: RATE_LIMITS.AI.WINDOW_MS,
  max: (req) => {
    return req.isAuthenticated ? RATE_LIMITS.AI.MAX_AUTHENTICATED : RATE_LIMITS.AI.MAX_ANONYMOUS
  },
  keyGenerator: (req) => {
    return req.user?.id || req.ip
  },
  message: { error: RATE_LIMITS.AI.MESSAGE },
  standardHeaders: true,
  legacyHeaders: false
})

// API Routes with rate limiting and CSRF protection
app.use('/api/contact', csrfProtection, contactLimiter, contactRouter)
app.use('/api/schedule', csrfProtection, scheduleLimiter, scheduleRouter)
// AI routes: auth middleware runs first for tiered rate limiting
app.use('/api/ai', csrfProtection, optionalAuth, aiLimiter, aiRouter)
app.use('/api/sessions', csrfProtection, sessionsRouter)
app.use('/api/progress', csrfProtection, progressRouter)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Serve static files in production with cache control
if (process.env.NODE_ENV === 'production') {
  const distPath = join(__dirname, '../dist')

  // Static assets with content hashes - cache for 1 year
  app.use('/assets', express.static(join(distPath, 'assets'), {
    maxAge: '1y',
    immutable: true
  }))

  // Other static files (favicon, etc.) - cache for 1 day
  app.use(express.static(distPath, {
    maxAge: '1d',
    setHeaders: (res, path) => {
      // Never cache index.html to ensure fresh content
      if (path.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
        res.setHeader('Pragma', 'no-cache')
        res.setHeader('Expires', '0')
      }
    }
  }))

  // SPA fallback - serve index.html for all non-API routes (no cache)
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
      res.setHeader('Pragma', 'no-cache')
      res.setHeader('Expires', '0')
      res.sendFile(join(distPath, 'index.html'))
    }
  })
}

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Server error', { error: err.message, stack: err.stack })
  res.status(HTTP_STATUS.INTERNAL_ERROR).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

app.listen(PORT, () => {
  logger.info('Server started', { port: PORT, env: process.env.NODE_ENV || 'development' })
})

export default app
