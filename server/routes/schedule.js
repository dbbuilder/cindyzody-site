/**
 * Appointment scheduling API route
 */

import { Router } from 'express'
import { sendAppointmentNotification, sendAppointmentConfirmation } from '../services/email.js'
import { saveAppointment } from '../services/database.js'
import logger from '../utils/logger.js'

const router = Router()
const scheduleLogger = logger.child({ module: 'schedule' })

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

router.post('/', async (req, res) => {
  try {
    const { service, date, time, client, timestamp } = req.body

    // Validation
    if (!service || !date || !time || !client || !client.email || !client.consent) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (!EMAIL_REGEX.test(client.email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    if (client.message && client.message.length > 2000) {
      return res.status(400).json({ error: 'Message too long (max 2000 characters)' })
    }

    // Format appointment data
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const formattedTime = formatTime(time)

    const appointmentData = {
      id: generateAppointmentId(),
      service: {
        name: service.name,
        duration: service.duration,
        type: service.id
      },
      date: formattedDate,
      time: formattedTime,
      client: {
        name: `${client.firstName} ${client.lastName}`.trim(),
        email: client.email,
        phone: client.phone || null,
        notes: client.message || null
      },
      timestamp: timestamp || new Date().toISOString(),
      status: 'pending'
    }

    // Log the appointment
    scheduleLogger.info('New appointment scheduled', {
      id: appointmentData.id,
      service: appointmentData.service.name,
      date: formattedDate,
      clientEmail: appointmentData.client.email
    })

    // Save to database
    try {
      saveAppointment({
        id: appointmentData.id,
        service: appointmentData.service,
        date: formattedDate,
        time: formattedTime,
        client: appointmentData.client,
        status: 'pending'
      })
      scheduleLogger.debug('Appointment saved to database', { id: appointmentData.id })
    } catch (dbError) {
      scheduleLogger.error('Failed to save appointment to database', { error: dbError.message })
      // Continue - don't fail the request if DB save fails
    }

    // Send notification email to Cindy
    try {
      await sendAppointmentNotification({
        service: appointmentData.service,
        date: formattedDate,
        time: formattedTime,
        client: appointmentData.client
      })
      scheduleLogger.debug('Appointment notification email sent')
    } catch (emailError) {
      scheduleLogger.error('Failed to send appointment notification', { error: emailError.message })
    }

    // Send confirmation email to client
    try {
      await sendAppointmentConfirmation({
        service: appointmentData.service,
        date: formattedDate,
        time: formattedTime,
        client: appointmentData.client
      })
      scheduleLogger.debug('Appointment confirmation sent', { email: appointmentData.client.email })
    } catch (emailError) {
      scheduleLogger.error('Failed to send appointment confirmation', { error: emailError.message })
    }

    res.json({
      status: 'success',
      message: 'Appointment request submitted successfully',
      appointment: {
        id: appointmentData.id,
        service: appointmentData.service.name,
        date: appointmentData.date,
        time: appointmentData.time
      }
    })
  } catch (error) {
    scheduleLogger.error('Scheduling error', { error: error.message })
    res.status(500).json({
      error: 'Failed to schedule appointment',
      message: 'Please try again or contact us directly'
    })
  }
})

// Utility functions
function generateAppointmentId() {
  return 'apt_' + Date.now().toString(36) + Math.random().toString(36).substr(2)
}

function formatTime(time) {
  const hour = Math.floor(time / 100)
  const minute = time % 100
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`
}

export default router
