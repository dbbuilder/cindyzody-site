# Scheduling System Documentation

This project includes a flexible scheduling system that can easily switch between different providers.

## Current Setup

✅ **Active**: Custom Static Scheduler (built-in)
❌ **Disabled**: Squarespace Scheduling (external, currently broken)
❌ **Not Configured**: Calendly (external)
❌ **Not Configured**: Google Calendar (external)

## Features

### Custom Static Scheduler
- ✅ **No Dependencies**: Works offline, no external service required
- ✅ **Full Control**: Complete customization of availability, services, and pricing
- ✅ **Cost-Free**: No monthly fees or per-booking charges
- ✅ **Professional UI**: Matches site design with nature color palette
- ✅ **Mobile Responsive**: Works perfectly on all devices
- ✅ **Data Storage**: Appointments saved locally and via API endpoint

### Scheduling Features
- **Service Selection**: Individual, Couple, Extended sessions, Free consultations
- **Calendar Picker**: Visual date selection with business hours
- **Time Slots**: 30-minute intervals during business hours
- **Contact Form**: Integrated appointment booking with client details
- **Confirmation**: Email confirmations (ready for integration)
- **Analytics**: Built-in tracking for booking events

## Configuration

All scheduling settings are in `/src/config/scheduling.js`:

### Switching Providers

To switch to a different scheduler, edit the `ACTIVE_SCHEDULER` setting:

```javascript
// Current setting (custom scheduler)
export const ACTIVE_SCHEDULER = SCHEDULER_PROVIDERS.CUSTOM

// To switch to Calendly (when available)
export const ACTIVE_SCHEDULER = SCHEDULER_PROVIDERS.CALENDLY

// To switch to Squarespace (when working)
export const ACTIVE_SCHEDULER = SCHEDULER_PROVIDERS.SQUARESPACE
```

### Business Hours

Edit the availability configuration:

```javascript
availability: {
  workDays: [1, 2, 3, 4, 5], // Monday to Friday
  workHours: { start: 9, end: 17 }, // 9 AM to 5 PM
  timeZone: 'America/Los_Angeles',
  sessionDuration: 60,
  bufferTime: 15,
  daysAhead: 30
}
```

### Adding Services

Add new services to the configuration:

```javascript
services: [
  {
    id: 'new-service',
    name: 'New Service Type',
    description: 'Description of the service',
    duration: 45, // minutes
    price: '$150',
    enabled: true
  }
]
```

### Special Hours & Closures

Block out specific dates or set special hours:

```javascript
availability: {
  unavailableDates: ['2025-12-25', '2025-01-01'], // Holidays
  specialHours: {
    '2025-12-24': { start: 9, end: 14 }, // Half day
    '2025-12-25': 'closed' // Closed
  }
}
```

## External Scheduler Integration

### When Squarespace is Fixed

1. Update the URL in `/src/config/scheduling.js`:
```javascript
[SCHEDULER_PROVIDERS.SQUARESPACE]: {
  enabled: true, // Change to true
  url: 'https://app.squarespacescheduling.com/schedule/bbdef557'
}
```

2. Switch the active scheduler:
```javascript
export const ACTIVE_SCHEDULER = SCHEDULER_PROVIDERS.SQUARESPACE
```

### Adding Calendly

1. Get your Calendly booking URL
2. Update the configuration:
```javascript
[SCHEDULER_PROVIDERS.CALENDLY]: {
  name: 'Calendly',
  type: 'external',
  enabled: true,
  url: 'https://calendly.com/your-username',
  fallbackToCustom: true
}
```

3. Switch the active scheduler to Calendly

### Adding Google Calendar

Similar process - just add the Google Calendar booking URL to the configuration.

## API Integration

The custom scheduler submits appointments to `/api/schedule.js`. This can be enhanced to:

- ✅ **Email Notifications**: Send confirmations to client and practitioner
- ✅ **Database Storage**: Save to Google Sheets, Airtable, or database
- ✅ **Calendar Integration**: Sync with Google Calendar, Outlook, etc.
- ✅ **Payment Processing**: Add Stripe, PayPal integration
- ✅ **SMS Reminders**: Twilio integration for appointment reminders

## Advantages of Current Setup

1. **Reliability**: Never breaks due to external service outages
2. **Cost**: $0 monthly fees vs $10-20/month for external services
3. **Customization**: Perfect integration with site design and branding
4. **Control**: Full control over booking flow and user experience
5. **Data**: All appointment data stays with you
6. **Performance**: No iframe loading delays or external dependencies

## Future Enhancements

- **Recurring Appointments**: Weekly/monthly session scheduling
- **Group Sessions**: Multi-participant booking
- **Waitlist**: Automatic rebooking when slots open
- **Time Zone Detection**: Automatic client timezone handling
- **Booking Limits**: Prevent overbooking with session caps
- **Package Deals**: Multi-session booking discounts