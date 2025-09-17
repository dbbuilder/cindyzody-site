// Enhanced appointment scheduling API for Vercel serverless functions
// Supports multiple notification methods and data persistence

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { service, date, time, client, timestamp } = req.body

    // Basic validation
    if (!service || !date || !time || !client || !client.email || !client.consent) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Format appointment data
    const appointmentData = {
      id: generateAppointmentId(),
      service: {
        name: service.name,
        duration: service.duration,
        type: service.id
      },
      date: new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: formatTime(time),
      client: {
        name: `${client.firstName} ${client.lastName}`,
        email: client.email,
        phone: client.phone || 'Not provided',
        message: client.message || 'No message'
      },
      timestamp: timestamp || new Date().toISOString(),
      status: 'confirmed'
    }

    // Log the appointment (in production, this would go to a database)
    console.log('New appointment scheduled:', JSON.stringify(appointmentData, null, 2))

    // Send confirmation emails (simplified for demo)
    await sendConfirmationEmails(appointmentData)

    // Store in a simple data persistence method
    await storeAppointment(appointmentData)

    // Return success response
    res.status(200).json({
      status: 'success',
      message: 'Appointment scheduled successfully',
      appointment: {
        id: appointmentData.id,
        service: appointmentData.service.name,
        date: appointmentData.date,
        time: appointmentData.time
      }
    })

  } catch (error) {
    console.error('Scheduling error:', error)
    res.status(500).json({
      error: 'Failed to schedule appointment',
      message: 'Please try again or contact us directly'
    })
  }
}

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

async function sendConfirmationEmails(appointment) {
  // In a production environment, you would integrate with an email service
  // like SendGrid, Mailgun, or AWS SES

  const clientEmailContent = `
    Hello ${appointment.client.name},

    Your appointment has been confirmed!

    Appointment Details:
    - Service: ${appointment.service.name}
    - Date: ${appointment.date}
    - Time: ${appointment.time}
    - Duration: ${appointment.service.duration} minutes

    If you need to reschedule or cancel, please contact Cindy directly:
    Phone: (206) 992-5992
    Email: cindyzody@gmail.com

    Looking forward to our session!

    Best regards,
    Cindy Zody
    Communications Practitioner
  `

  const practitionerEmailContent = `
    New Appointment Scheduled

    Client: ${appointment.client.name}
    Email: ${appointment.client.email}
    Phone: ${appointment.client.phone}

    Service: ${appointment.service.name}
    Date: ${appointment.date}
    Time: ${appointment.time}
    Duration: ${appointment.service.duration} minutes

    Client Message: ${appointment.client.message}

    Appointment ID: ${appointment.id}
  `

  // Log email content (in production, send actual emails)
  console.log('Client confirmation email:', clientEmailContent)
  console.log('Practitioner notification email:', practitionerEmailContent)

  // TODO: Implement actual email sending
  // await sendEmail({
  //   to: appointment.client.email,
  //   subject: 'Appointment Confirmation - Cindy Zody',
  //   text: clientEmailContent
  // })

  // await sendEmail({
  //   to: 'cindyzody@gmail.com',
  //   subject: 'New Appointment Scheduled',
  //   text: practitionerEmailContent
  // })

  return { clientEmailSent: true, practitionerEmailSent: true }
}

async function storeAppointment(appointment) {
  // In a production environment, you would store this in a database
  // For now, we'll just log it and rely on email notifications

  // Options for simple data persistence:
  // 1. Google Sheets API
  // 2. Airtable API
  // 3. Simple JSON file storage
  // 4. Database services like Supabase, PlanetScale, etc.

  console.log('Storing appointment:', appointment.id)

  // Example: Store in a simple format that could be easily exported
  const storageData = {
    id: appointment.id,
    timestamp: appointment.timestamp,
    client_name: appointment.client.name,
    client_email: appointment.client.email,
    client_phone: appointment.client.phone,
    service_name: appointment.service.name,
    service_duration: appointment.service.duration,
    appointment_date: appointment.date,
    appointment_time: appointment.time,
    client_message: appointment.client.message,
    status: appointment.status
  }

  // TODO: Implement actual storage
  // await database.appointments.create(storageData)
  // OR
  // await appendToGoogleSheet(storageData)
  // OR
  // await saveToAirtable(storageData)

  return true
}

// Example integration with Google Sheets (commented out)
/*
async function appendToGoogleSheet(data) {
  const { GoogleSpreadsheet } = require('google-spreadsheet')

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID)
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  })

  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]

  await sheet.addRow(data)
}
*/

// Example integration with email service (commented out)
/*
async function sendEmail({ to, subject, text }) {
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to,
    from: 'cindyzody@gmail.com',
    subject,
    text,
  }

  await sgMail.send(msg)
}
*/