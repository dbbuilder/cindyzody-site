/**
 * Simple Logger Utility
 * Provides structured logging with levels and timestamps
 *
 * Usage:
 *   import logger from './utils/logger.js'
 *   logger.info('Server started', { port: 3000 })
 *   logger.error('Database error', { error: err.message })
 */

const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
}

// In production, only show warn and above
const MIN_LEVEL = process.env.NODE_ENV === 'production' ? LOG_LEVELS.warn : LOG_LEVELS.debug

/**
 * Format a log message with timestamp and level
 */
function formatMessage(level, message, context = {}) {
  const timestamp = new Date().toISOString()
  const contextStr = Object.keys(context).length > 0
    ? ' ' + JSON.stringify(context)
    : ''

  return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`
}

/**
 * Create a log function for a specific level
 */
function createLogger(level) {
  return (message, context = {}) => {
    if (LOG_LEVELS[level] >= MIN_LEVEL) {
      const formatted = formatMessage(level, message, context)

      switch (level) {
        case 'error':
          console.error(formatted)
          break
        case 'warn':
          console.warn(formatted)
          break
        default:
          console.log(formatted)
      }
    }
  }
}

const logger = {
  debug: createLogger('debug'),
  info: createLogger('info'),
  warn: createLogger('warn'),
  error: createLogger('error'),

  /**
   * Log with custom level
   */
  log(level, message, context = {}) {
    const logFn = this[level] || this.info
    logFn(message, context)
  },

  /**
   * Create a child logger with preset context
   */
  child(defaultContext = {}) {
    return {
      debug: (msg, ctx = {}) => logger.debug(msg, { ...defaultContext, ...ctx }),
      info: (msg, ctx = {}) => logger.info(msg, { ...defaultContext, ...ctx }),
      warn: (msg, ctx = {}) => logger.warn(msg, { ...defaultContext, ...ctx }),
      error: (msg, ctx = {}) => logger.error(msg, { ...defaultContext, ...ctx })
    }
  }
}

export default logger
