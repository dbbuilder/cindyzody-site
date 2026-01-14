/**
 * Email Service using Resend
 * Handles all outbound email for contact forms and appointment confirmations
 */

import { Resend } from 'resend'

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

// Default sender (must be verified domain or use Resend's test domain)
const DEFAULT_FROM = 'Cindy Zody <noreply@resend.dev>'
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'cindy@cindyzody.com'

/**
 * Send contact form submission to Cindy
 */
export async function sendContactNotification({ name, email, phone, message, subject }) {
  const emailSubject = subject || `New Contact Form: ${name}`

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #15803d;">New Contact Form Submission</h2>
      <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
      </div>
      <div style="background: #fafafa; padding: 20px; border-radius: 8px;">
        <h3 style="margin-top: 0;">Message:</h3>
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
      <p style="color: #666; font-size: 12px; margin-top: 20px;">
        Sent from cindyzody.com contact form
      </p>
    </div>
  `

  return resend.emails.send({
    from: DEFAULT_FROM,
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: emailSubject,
    html
  })
}

/**
 * Send confirmation email to person who submitted contact form
 */
export async function sendContactConfirmation({ name, email }) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #15803d;">Thank You for Reaching Out</h2>
      <p>Dear ${escapeHtml(name)},</p>
      <p>Thank you for contacting me. I've received your message and will get back to you within 1-2 business days.</p>
      <p>In the meantime, feel free to explore my website for resources on Nonviolent Communication and mindful practices.</p>
      <p style="margin-top: 30px;">
        Warmly,<br>
        <strong>Cindy Zody</strong><br>
        Communications Practitioner
      </p>
      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">
        This is an automated confirmation. Please do not reply to this email.
      </p>
    </div>
  `

  return resend.emails.send({
    from: DEFAULT_FROM,
    to: email,
    subject: 'Thank you for contacting Cindy Zody',
    html
  })
}

/**
 * Send appointment booking notification to Cindy
 */
export async function sendAppointmentNotification({ service, date, time, client }) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #15803d;">New Appointment Request</h2>

      <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #15803d;">${escapeHtml(service.name)}</h3>
        <p><strong>Duration:</strong> ${service.duration} minutes</p>
        <p><strong>Date:</strong> ${escapeHtml(date)}</p>
        <p><strong>Time:</strong> ${escapeHtml(time)}</p>
      </div>

      <div style="background: #fafafa; padding: 20px; border-radius: 8px;">
        <h3 style="margin-top: 0;">Client Information</h3>
        <p><strong>Name:</strong> ${escapeHtml(client.name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(client.email)}">${escapeHtml(client.email)}</a></p>
        ${client.phone ? `<p><strong>Phone:</strong> ${escapeHtml(client.phone)}</p>` : ''}
        ${client.notes ? `<p><strong>Notes:</strong> ${escapeHtml(client.notes)}</p>` : ''}
      </div>

      <p style="color: #666; font-size: 12px; margin-top: 20px;">
        Please confirm this appointment with the client directly.
      </p>
    </div>
  `

  return resend.emails.send({
    from: DEFAULT_FROM,
    to: CONTACT_EMAIL,
    replyTo: client.email,
    subject: `New Appointment: ${service.name} - ${date} at ${time}`,
    html
  })
}

/**
 * Send appointment confirmation to client
 */
export async function sendAppointmentConfirmation({ service, date, time, client }) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #15803d;">Appointment Request Received</h2>

      <p>Dear ${escapeHtml(client.name)},</p>

      <p>Thank you for scheduling a session with me. Here are your appointment details:</p>

      <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #15803d;">${escapeHtml(service.name)}</h3>
        <p><strong>Duration:</strong> ${service.duration} minutes</p>
        <p><strong>Date:</strong> ${escapeHtml(date)}</p>
        <p><strong>Time:</strong> ${escapeHtml(time)} (Pacific Time)</p>
      </div>

      <p><strong>Please note:</strong> This is a request confirmation. I will contact you within 24 hours to confirm the appointment and provide meeting details.</p>

      <p>If you need to reschedule or have any questions, please reply to this email or contact me directly.</p>

      <p style="margin-top: 30px;">
        Looking forward to connecting with you,<br>
        <strong>Cindy Zody</strong><br>
        Communications Practitioner
      </p>

      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">
        Cindy Zody - NVC & IFS Coaching<br>
        <a href="https://www.cindyzody.com">www.cindyzody.com</a>
      </p>
    </div>
  `

  return resend.emails.send({
    from: DEFAULT_FROM,
    to: client.email,
    subject: `Appointment Request: ${service.name} on ${date}`,
    html
  })
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  if (!text) return ''
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return String(text).replace(/[&<>"']/g, m => map[m])
}

export default {
  sendContactNotification,
  sendContactConfirmation,
  sendAppointmentNotification,
  sendAppointmentConfirmation
}
