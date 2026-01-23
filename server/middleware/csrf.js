/**
 * CSRF Protection Middleware
 * Uses double-submit cookie pattern for SPA compatibility
 */

import { randomBytes } from 'crypto'
import logger from '../utils/logger.js'
import { CSRF, HTTP_STATUS } from '../config/constants.js'

const csrfLogger = logger.child({ module: 'csrf' })

/**
 * Generate a cryptographically secure random token
 */
function generateToken() {
  return randomBytes(CSRF.TOKEN_LENGTH).toString('hex')
}

/**
 * CSRF token endpoint handler
 * GET /api/csrf-token - Returns a fresh CSRF token
 */
export function csrfTokenHandler(req, res) {
  const token = generateToken()

  // Set the token in a cookie (httpOnly=false so JS can read it)
  res.cookie(CSRF.COOKIE_NAME, token, {
    httpOnly: false, // Client needs to read this
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: CSRF.COOKIE_MAX_AGE_MS
  })

  res.json({ token })
}

/**
 * CSRF validation middleware
 * Validates token on state-changing requests (POST, PUT, DELETE, PATCH)
 */
export function csrfProtection(req, res, next) {
  // Skip for safe methods
  if (CSRF.SAFE_METHODS.includes(req.method)) {
    return next()
  }

  // Skip for certain paths
  if (CSRF.SKIP_PATHS.some(path => req.path.startsWith(path))) {
    return next()
  }

  // Skip in development if CSRF is disabled
  if (process.env.NODE_ENV !== 'production' && process.env.DISABLE_CSRF === 'true') {
    return next()
  }

  // Get token from cookie and header
  const cookieToken = req.cookies?.[CSRF.COOKIE_NAME]
  const headerToken = req.headers[CSRF.HEADER_NAME]

  // Both must be present
  if (!cookieToken || !headerToken) {
    csrfLogger.warn('Missing CSRF token', {
      path: req.path,
      method: req.method,
      hasCookie: !!cookieToken,
      hasHeader: !!headerToken
    })
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      error: 'CSRF token missing',
      message: 'Please refresh the page and try again'
    })
  }

  // Tokens must match (constant-time comparison to prevent timing attacks)
  if (!timingSafeEqual(cookieToken, headerToken)) {
    csrfLogger.warn('CSRF token mismatch', {
      path: req.path,
      method: req.method
    })
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      error: 'CSRF token invalid',
      message: 'Please refresh the page and try again'
    })
  }

  next()
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
function timingSafeEqual(a, b) {
  if (a.length !== b.length) {
    return false
  }

  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }

  return result === 0
}

export default {
  csrfTokenHandler,
  csrfProtection
}
