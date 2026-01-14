/**
 * Contact form API route
 */

import { Router } from 'express'
import { sendContactNotification, sendContactConfirmation } from '../services/email.js'
import { saveContact } from '../services/database.js'

const router = Router()

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
    console.log('New contact form submission:', {
      name,
      email,
      phone,
      messageLength: message.length,
      timestamp: new Date().toISOString()
    })

    // Save to database
    try {
      const { id } = saveContact({ name, email, phone, message })
      console.log('Contact saved to database, id:', id)
    } catch (dbError) {
      console.error('Failed to save contact to database:', dbError)
      // Continue - don't fail the request if DB save fails
    }

    // Send notification email to Cindy
    try {
      await sendContactNotification({ name, email, phone, message })
      console.log('Contact notification email sent to Cindy')
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError)
      // Continue - don't fail the request if email fails
    }

    // Send confirmation email to submitter
    try {
      await sendContactConfirmation({ name, email })
      console.log('Confirmation email sent to:', email)
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError)
      // Continue - don't fail the request if email fails
    }

    res.json({
      status: 'success',
      message: 'Thank you for your inquiry. We will respond shortly.'
    })
  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
