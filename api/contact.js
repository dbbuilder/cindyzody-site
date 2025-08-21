// Simple contact form handler for Vercel serverless functions
// This replaces the Azure Functions API for Vercel deployment

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
    const { firstName, lastName, email, phone, message, consent } = req.body

    // Basic validation
    if (!email || !message || !consent) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send confirmation email
    
    // For now, just log the inquiry (in production, use proper logging/storage)
    console.log('New contact form submission:', {
      firstName, lastName, email, phone, message, consent,
      timestamp: new Date().toISOString()
    })

    // Return success response
    res.status(200).json({ 
      status: 'success',
      message: 'Thank you for your inquiry. We will respond shortly.'
    })

  } catch (error) {    console.error('Contact form error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}