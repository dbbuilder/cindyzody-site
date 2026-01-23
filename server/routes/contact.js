/**
 * Contact form API route
 */

import { Router } from 'express'
import { sendContactNotification, sendContactConfirmation } from '../services/email.js'
import { saveContact } from '../services/database.js'
import logger from '../utils/logger.js'
import { EMAIL_REGEX, HTTP_STATUS } from '../config/constants.js'

const router = Router()
const contactLogger = logger.child({ module: 'contact' })

// Message character limit for contact form
const CONTACT_MESSAGE_MAX_LENGTH = 5000

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message, consent } = req.body

    // Validation
    if (!email || !message || !consent) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Missing required fields' })
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid email format' })
    }

    if (message.length > CONTACT_MESSAGE_MAX_LENGTH) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: `Message too long (max ${CONTACT_MESSAGE_MAX_LENGTH} characters)` })
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
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: 'Internal server error' })
  }
})

export default router
