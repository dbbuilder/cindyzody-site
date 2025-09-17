// Scheduling Configuration
// This file allows easy switching between scheduling providers

export const SCHEDULER_PROVIDERS = {
  CUSTOM: 'custom',
  SQUARESPACE: 'squarespace',
  CALENDLY: 'calendly',
  GOOGLE: 'google'
}

// Current active scheduler - change this to switch providers
export const ACTIVE_SCHEDULER = SCHEDULER_PROVIDERS.CUSTOM

// Provider configurations
export const SCHEDULER_CONFIG = {
  [SCHEDULER_PROVIDERS.CUSTOM]: {
    name: 'Custom Scheduler',
    type: 'embedded',
    enabled: true,
    availability: {
      workDays: [1, 2, 3, 4, 5], // Monday to Friday
      workHours: { start: 9, end: 17 }, // 9 AM to 5 PM
      timeZone: 'America/Los_Angeles', // Pacific Time
      sessionDuration: 60, // Default session length in minutes
      bufferTime: 15, // Minutes between sessions
      daysAhead: 30, // How many days ahead to show availability
      unavailableDates: [], // Array of dates to block out
      specialHours: {
        // Override hours for specific days
        // '2025-12-25': 'closed',
        // '2025-12-24': { start: 9, end: 14 }
      }
    },
    services: [
      {
        id: 'individual-60',
        name: 'Individual Session',
        description: 'One-on-one NVC/IFS coaching session',
        duration: 60,
        price: 'Contact for pricing',
        enabled: true
      },
      {
        id: 'individual-90',
        name: 'Extended Individual Session',
        description: 'Longer individual session for deeper work',
        duration: 90,
        price: 'Contact for pricing',
        enabled: true
      },
      {
        id: 'couple-60',
        name: 'Couple Session',
        description: 'Relationship coaching for couples',
        duration: 60,
        price: 'Contact for pricing',
        enabled: true
      },
      {
        id: 'couple-90',
        name: 'Extended Couple Session',
        description: 'Extended couple session for complex issues',
        duration: 90,
        price: 'Contact for pricing',
        enabled: true
      },
      {
        id: 'consultation-15',
        name: 'Free Consultation',
        description: 'Brief consultation to discuss your needs',
        duration: 15,
        price: 'Free',
        enabled: true
      }
    ]
  },

  [SCHEDULER_PROVIDERS.SQUARESPACE]: {
    name: 'Squarespace Scheduling',
    type: 'external',
    enabled: false, // Disabled due to current issues
    url: 'https://app.squarespacescheduling.com/schedule/bbdef557',
    fallbackToCustom: true
  },

  [SCHEDULER_PROVIDERS.CALENDLY]: {
    name: 'Calendly',
    type: 'external',
    enabled: false,
    url: '', // Add Calendly URL when available
    fallbackToCustom: true
  },

  [SCHEDULER_PROVIDERS.GOOGLE]: {
    name: 'Google Calendar',
    type: 'external',
    enabled: false,
    url: '', // Add Google Calendar booking URL when available
    fallbackToCustom: true
  }
}

// Helper function to get current scheduler config
export function getActiveSchedulerConfig() {
  const config = SCHEDULER_CONFIG[ACTIVE_SCHEDULER]

  // If external scheduler is down and has fallback enabled, use custom
  if (config.type === 'external' && !config.enabled && config.fallbackToCustom) {
    return SCHEDULER_CONFIG[SCHEDULER_PROVIDERS.CUSTOM]
  }

  return config
}

// Helper function to check if scheduler is available
export function isSchedulerAvailable(provider = ACTIVE_SCHEDULER) {
  const config = SCHEDULER_CONFIG[provider]
  return config && config.enabled
}

// Helper function to get scheduler URL for external providers
export function getSchedulerUrl(provider = ACTIVE_SCHEDULER) {
  const config = SCHEDULER_CONFIG[provider]
  return config?.url || ''
}

// Business hours helper
export function isBusinessDay(date) {
  const config = getActiveSchedulerConfig()
  const dayOfWeek = date.getDay()
  return config.availability?.workDays.includes(dayOfWeek) || false
}

// Business hours helper
export function getBusinessHours(date) {
  const config = getActiveSchedulerConfig()
  const dateString = date.toISOString().split('T')[0]

  // Check for special hours first
  if (config.availability?.specialHours?.[dateString]) {
    const special = config.availability.specialHours[dateString]
    if (special === 'closed') return null
    return special
  }

  // Return regular business hours
  return config.availability?.workHours || { start: 9, end: 17 }
}