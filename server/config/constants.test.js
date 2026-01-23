/**
 * Unit tests for server constants
 */

import { describe, it, expect } from 'vitest'
import {
  RATE_LIMITS,
  AUTH,
  CSRF,
  HTTP_STATUS,
  VALIDATION,
  AI_CONFIG,
  SERVER,
  EMAIL_REGEX
} from './constants.js'

describe('RATE_LIMITS', () => {
  it('should have valid contact rate limit config', () => {
    expect(RATE_LIMITS.CONTACT.WINDOW_MS).toBe(15 * 60 * 1000)
    expect(RATE_LIMITS.CONTACT.MAX_REQUESTS).toBe(5)
    expect(RATE_LIMITS.CONTACT.MESSAGE).toContain('contact form')
  })

  it('should have valid schedule rate limit config', () => {
    expect(RATE_LIMITS.SCHEDULE.WINDOW_MS).toBe(60 * 60 * 1000)
    expect(RATE_LIMITS.SCHEDULE.MAX_REQUESTS).toBe(10)
    expect(RATE_LIMITS.SCHEDULE.MESSAGE).toContain('appointment')
  })

  it('should have valid AI rate limit config', () => {
    expect(RATE_LIMITS.AI.WINDOW_MS).toBe(60 * 1000)
    expect(RATE_LIMITS.AI.MAX_AUTHENTICATED).toBe(30)
    expect(RATE_LIMITS.AI.MAX_ANONYMOUS).toBe(10)
    expect(RATE_LIMITS.AI.MAX_AUTHENTICATED).toBeGreaterThan(RATE_LIMITS.AI.MAX_ANONYMOUS)
  })
})

describe('AUTH', () => {
  it('should have session cookie name', () => {
    expect(AUTH.SESSION_COOKIE).toBe('__session')
  })

  it('should have rate multiplier', () => {
    expect(AUTH.AUTHENTICATED_RATE_MULTIPLIER).toBe(3)
  })
})

describe('CSRF', () => {
  it('should have valid token length', () => {
    expect(CSRF.TOKEN_LENGTH).toBe(32)
  })

  it('should have cookie and header names', () => {
    expect(CSRF.COOKIE_NAME).toBe('csrf_token')
    expect(CSRF.HEADER_NAME).toBe('x-csrf-token')
  })

  it('should have safe methods defined', () => {
    expect(CSRF.SAFE_METHODS).toContain('GET')
    expect(CSRF.SAFE_METHODS).toContain('HEAD')
    expect(CSRF.SAFE_METHODS).toContain('OPTIONS')
    expect(CSRF.SAFE_METHODS).not.toContain('POST')
  })

  it('should have skip paths', () => {
    expect(CSRF.SKIP_PATHS).toContain('/api/health')
    expect(CSRF.SKIP_PATHS).toContain('/api/csrf-token')
  })
})

describe('HTTP_STATUS', () => {
  it('should have standard HTTP status codes', () => {
    expect(HTTP_STATUS.OK).toBe(200)
    expect(HTTP_STATUS.CREATED).toBe(201)
    expect(HTTP_STATUS.BAD_REQUEST).toBe(400)
    expect(HTTP_STATUS.UNAUTHORIZED).toBe(401)
    expect(HTTP_STATUS.FORBIDDEN).toBe(403)
    expect(HTTP_STATUS.NOT_FOUND).toBe(404)
    expect(HTTP_STATUS.TOO_MANY_REQUESTS).toBe(429)
    expect(HTTP_STATUS.INTERNAL_ERROR).toBe(500)
  })
})

describe('VALIDATION', () => {
  it('should have reasonable message length', () => {
    expect(VALIDATION.MESSAGE_MAX_LENGTH).toBe(2000)
    expect(VALIDATION.MESSAGE_MAX_LENGTH).toBeGreaterThan(100)
  })

  it('should have default limits', () => {
    expect(VALIDATION.SESSION_LIMIT_DEFAULT).toBe(20)
    expect(VALIDATION.CHECK_IN_LIMIT_DEFAULT).toBe(30)
    expect(VALIDATION.CONTACT_LIMIT_DEFAULT).toBe(50)
    expect(VALIDATION.APPOINTMENT_LIMIT_DEFAULT).toBe(50)
  })
})

describe('AI_CONFIG', () => {
  it('should have model configured', () => {
    expect(AI_CONFIG.MODEL).toContain('claude')
  })

  it('should have reasonable token limits', () => {
    expect(AI_CONFIG.MAX_TOKENS).toBe(1024)
    expect(AI_CONFIG.MAX_HISTORY_TOKENS).toBe(2000)
    expect(AI_CONFIG.SUMMARY_MAX_TOKENS).toBe(500)
  })

  it('should have temperature between 0 and 1', () => {
    expect(AI_CONFIG.TEMPERATURE).toBeGreaterThanOrEqual(0)
    expect(AI_CONFIG.TEMPERATURE).toBeLessThanOrEqual(1)
  })
})

describe('SERVER', () => {
  it('should have default port', () => {
    expect(SERVER.DEFAULT_PORT).toBe(21000)
  })

  it('should have trust proxy setting', () => {
    expect(SERVER.TRUST_PROXY).toBe(1)
  })
})

describe('EMAIL_REGEX', () => {
  it('should validate correct email formats', () => {
    expect(EMAIL_REGEX.test('test@example.com')).toBe(true)
    expect(EMAIL_REGEX.test('user.name@domain.org')).toBe(true)
    expect(EMAIL_REGEX.test('user+tag@example.co.uk')).toBe(true)
  })

  it('should reject invalid email formats', () => {
    expect(EMAIL_REGEX.test('invalid')).toBe(false)
    expect(EMAIL_REGEX.test('missing@domain')).toBe(false)
    expect(EMAIL_REGEX.test('@nodomain.com')).toBe(false)
    expect(EMAIL_REGEX.test('spaces not@allowed.com')).toBe(false)
  })
})
