/**
 * Authentication Middleware
 * Verifies Clerk session tokens for protected routes
 */

import { createClerkClient } from '@clerk/backend'
import logger from '../utils/logger.js'
import { AUTH, RATE_LIMITS, HTTP_STATUS } from '../config/constants.js'

const authLogger = logger.child({ module: 'auth' })

// Initialize Clerk client (only if secret key is configured)
const clerkSecretKey = process.env.CLERK_SECRET_KEY
const clerk = clerkSecretKey ? createClerkClient({ secretKey: clerkSecretKey }) : null

/**
 * Optional authentication middleware
 * - If Clerk is configured: verifies token and attaches user to request
 * - If not configured: allows request through (dev mode)
 * - Never blocks requests, just enriches with user data
 */
export async function optionalAuth(req, res, next) {
  req.user = null
  req.isAuthenticated = false

  // Skip auth if Clerk not configured (dev mode)
  if (!clerk) {
    return next()
  }

  try {
    // Get token from Authorization header or cookie
    const authHeader = req.headers.authorization
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.slice(7)
      : req.cookies?.[AUTH.SESSION_COOKIE]

    if (!token) {
      return next()
    }

    // Verify the session token
    const { sub: userId } = await clerk.verifyToken(token)

    if (userId) {
      req.user = { id: userId }
      req.isAuthenticated = true
    }
  } catch (error) {
    // Token verification failed - continue as unauthenticated
    // Don't log expected errors like expired tokens
    if (!error.message?.includes('expired')) {
      authLogger.warn('Token verification failed', { error: error.message })
    }
  }

  next()
}

/**
 * Required authentication middleware
 * Blocks requests without valid authentication
 */
export async function requireAuth(req, res, next) {
  await optionalAuth(req, res, () => {})

  if (!req.isAuthenticated) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: 'Authentication required',
      message: 'Please sign in to access this feature'
    })
  }

  next()
}

/**
 * Get rate limit based on authentication status
 * Authenticated users get higher limits
 */
export function getAuthBasedRateLimit(req) {
  return {
    authenticated: req.isAuthenticated,
    limit: req.isAuthenticated ? RATE_LIMITS.AI.MAX_AUTHENTICATED : RATE_LIMITS.AI.MAX_ANONYMOUS,
    window: RATE_LIMITS.AI.WINDOW_MS
  }
}

export default {
  optionalAuth,
  requireAuth,
  getAuthBasedRateLimit
}
