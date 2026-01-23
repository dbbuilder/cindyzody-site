/**
 * Server Configuration Constants
 * Centralizes all magic numbers and configuration values
 * @type {import('../types/index.js')}
 */

// Rate Limiting Configuration
export const RATE_LIMITS = {
  CONTACT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 5,
    MESSAGE: 'Too many contact form submissions. Please try again later.'
  },
  SCHEDULE: {
    WINDOW_MS: 60 * 60 * 1000, // 1 hour
    MAX_REQUESTS: 10,
    MESSAGE: 'Too many appointment requests. Please try again later.'
  },
  AI: {
    WINDOW_MS: 60 * 1000, // 1 minute
    MAX_AUTHENTICATED: 30,
    MAX_ANONYMOUS: 10,
    MESSAGE: 'Too many requests. Please slow down or sign in for higher limits.'
  }
}

// Authentication Configuration
export const AUTH = {
  SESSION_COOKIE: '__session',
  AUTHENTICATED_RATE_MULTIPLIER: 3
}

// CSRF Configuration
export const CSRF = {
  TOKEN_LENGTH: 32,
  COOKIE_NAME: 'csrf_token',
  HEADER_NAME: 'x-csrf-token',
  COOKIE_MAX_AGE_MS: 24 * 60 * 60 * 1000, // 24 hours
  SAFE_METHODS: ['GET', 'HEAD', 'OPTIONS'],
  SKIP_PATHS: ['/api/health', '/api/csrf-token']
}

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500
}

// Validation Limits
export const VALIDATION = {
  MESSAGE_MAX_LENGTH: 2000,
  SESSION_LIMIT_DEFAULT: 20,
  CHECK_IN_LIMIT_DEFAULT: 30,
  CONTACT_LIMIT_DEFAULT: 50,
  APPOINTMENT_LIMIT_DEFAULT: 50
}

// AI Configuration
export const AI_CONFIG = {
  MODEL: 'claude-sonnet-4-20250514',
  MAX_TOKENS: 1024,
  TEMPERATURE: 0.7,
  MAX_HISTORY_TOKENS: 2000,
  SUMMARY_MAX_TOKENS: 500
}

// Server Configuration
export const SERVER = {
  DEFAULT_PORT: 21000,
  TRUST_PROXY: 1
}

// Email validation regex
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default {
  RATE_LIMITS,
  AUTH,
  CSRF,
  HTTP_STATUS,
  VALIDATION,
  AI_CONFIG,
  SERVER,
  EMAIL_REGEX
}
