/**
 * Contact form API route
 */

import { Router } from 'express'
import { sendContactNotification, sendContactConfirmation } from '../services/email.js'
import { saveContact } from '../services/database.js'
import logger from '../utils/logger.js'

const router = Router()
const contactLogger = logger.child({ module: 'contact' })

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message, consent } = req.body

    // Validation
    if (!email || !message || !consent) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    if (message.length > 5000) {
      return res.status(400).json({ error: 'Message too long (max 5000 characters)' })
    }

    const name = [firstName, lastName].filter(Boolean).join(' ') || 'Anonymous'

    // Log the inquiry
    contactLogger.info('New contact form submission', { name, email, phone, messageLength: message.length })

    // Save to database
    try {
      const { id } = saveContact({ name, email, phone, message })
      contactLogger.debug('Contact saved to database', { id })
    } catch (dbError) {
      contactLogger.error('Failed to save contact to database', { error: dbError.message })
      // Continue - don't fail the request if DB save fails
    }

    // Send notification email to Cindy
    try {
      await sendContactNotification({ name, email, phone, message })
      contactLogger.debug('Contact notification email sent')
    } catch (emailError) {
      contactLogger.error('Failed to send notification email', { error: emailError.message })
      // Continue - don't fail the request if email fails
    }

    // Send confirmation email to submitter
    try {
      await sendContactConfirmation({ name, email })
      contactLogger.debug('Confirmation email sent', { email })
    } catch (emailError) {
      contactLogger.error('Failed to send confirmation email', { error: emailError.message })
      // Continue - don't fail the request if email fails
    }

    res.json({
      status: 'success',
      message: 'Thank you for your inquiry. We will respond shortly.'
    })
  } catch (error) {
    contactLogger.error('Contact form error', { error: error.message })
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
