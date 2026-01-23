<template>
  <div class="custom-scheduler">
    <!-- Scheduler Header -->
    <div class="text-center mb-6">
      <h3 class="text-xl font-semibold text-gray-900 mb-2">Schedule Your Session</h3>
      <p class="text-gray-600">Choose your preferred session type and available time</p>
    </div>

    <!-- Step Indicator -->
    <div class="flex items-center justify-center mb-8">
      <div class="flex items-center space-x-4">
        <div class="flex items-center">
          <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium', step >= 1 ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-600']">1</div>
          <span class="ml-2 text-sm text-gray-600">Service</span>
        </div>
        <div class="w-8 h-0.5 bg-gray-200"></div>
        <div class="flex items-center">
          <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium', step >= 2 ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-600']">2</div>
          <span class="ml-2 text-sm text-gray-600">Date & Time</span>
        </div>
        <div class="w-8 h-0.5 bg-gray-200"></div>
        <div class="flex items-center">
          <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium', step >= 3 ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-600']">3</div>
          <span class="ml-2 text-sm text-gray-600">Details</span>
        </div>
      </div>
    </div>

    <!-- Step 1: Service Selection -->
    <div v-if="step === 1" class="space-y-4">
      <h4 class="font-medium text-gray-900 mb-4">Select Session Type</h4>
      <div class="space-y-3">
        <div
          v-for="service in services"
          :key="service.id"
          @click="selectService(service)"
          :class="['p-4 border rounded-lg cursor-pointer transition-all duration-200', selectedService?.id === service.id ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-brand-300 hover:bg-brand-25']"
        >
          <div class="flex items-center justify-between">
            <div>
              <h5 class="font-medium text-gray-900">{{ service.name }}</h5>
              <p class="text-sm text-gray-600 mt-1">{{ service.description }}</p>
              <div class="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {{ service.duration }} min
                </span>
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                  {{ service.price }}
                </span>
              </div>
            </div>
            <div v-if="selectedService?.id === service.id" class="text-brand-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-6">
        <button
          @click="nextStep"
          :disabled="!selectedService"
          :class="['px-6 py-2 rounded-md font-medium transition-colors', selectedService ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed']"
        >
          Continue
        </button>
      </div>
    </div>

    <!-- Step 2: Date & Time Selection -->
    <div v-if="step === 2" class="space-y-6">
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Calendar -->
        <div>
          <h4 class="font-medium text-gray-900 mb-4">Select Date</h4>
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <!-- Calendar Header -->
            <div class="flex items-center justify-between mb-4">
              <button @click="previousMonth" class="p-1 hover:bg-gray-100 rounded">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h5 class="font-medium">{{ currentMonthYear }}</h5>
              <button @click="nextMonth" class="p-1 hover:bg-gray-100 rounded">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>

            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 gap-1 mb-2">
              <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="text-center text-xs font-medium text-gray-500 py-2">
                {{ day }}
              </div>
            </div>
            <div class="grid grid-cols-7 gap-1">
              <button
                v-for="date in calendarDays"
                :key="date.key"
                @click="selectDate(date)"
                :disabled="!date.available"
                :class="[
                  'w-8 h-8 text-sm rounded transition-colors',
                  date.isToday ? 'bg-blue-100 text-blue-600' : '',
                  date.selected ? 'bg-brand-600 text-white' : '',
                  date.available && !date.selected ? 'hover:bg-brand-50 text-gray-900' : '',
                  !date.available ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer',
                  !date.inMonth ? 'text-gray-300' : ''
                ]"
              >
                {{ date.day }}
              </button>
            </div>
          </div>
        </div>

        <!-- Time Slots -->
        <div>
          <h4 class="font-medium text-gray-900 mb-4">Available Times</h4>
          <div v-if="selectedDate" class="space-y-2 max-h-64 overflow-y-auto">
            <button
              v-for="time in availableTimes"
              :key="time"
              @click="selectTime(time)"
              :class="['w-full p-3 text-left border rounded-lg transition-colors', selectedTime === time ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 hover:border-brand-300 hover:bg-brand-25']"
            >
              {{ formatTime(time) }}
            </button>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p>Select a date to see available times</p>
          </div>
        </div>
      </div>

      <div class="flex justify-between">
        <button @click="previousStep" class="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
          Back
        </button>
        <button
          @click="nextStep"
          :disabled="!selectedDate || !selectedTime"
          :class="['px-6 py-2 rounded-md font-medium transition-colors', selectedDate && selectedTime ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed']"
        >
          Continue
        </button>
      </div>
    </div>

    <!-- Step 3: Contact Details -->
    <div v-if="step === 3" class="space-y-6">
      <h4 class="font-medium text-gray-900 mb-4">Your Information</h4>

      <!-- Appointment Summary -->
      <div class="bg-brand-50 border border-brand-200 rounded-lg p-4 mb-6">
        <h5 class="font-medium text-brand-800 mb-2">Appointment Summary</h5>
        <div class="space-y-1 text-sm text-brand-700">
          <p><strong>Service:</strong> {{ selectedService?.name }}</p>
          <p><strong>Date:</strong> {{ formatDate(selectedDate) }}</p>
          <p><strong>Time:</strong> {{ formatTime(selectedTime) }}</p>
          <p><strong>Duration:</strong> {{ selectedService?.duration }} minutes</p>
        </div>
      </div>

      <!-- Contact Form -->
      <form @submit.prevent="submitBooking" class="space-y-4">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            >
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            >
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          >
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          >
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
          <textarea
            id="message"
            v-model="form.message"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            placeholder="Tell me a bit about what you'd like to work on..."
          ></textarea>
        </div>

        <div class="flex items-center">
          <input
            id="consent"
            v-model="form.consent"
            type="checkbox"
            required
            class="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
          >
          <label for="consent" class="ml-2 block text-sm text-gray-700">
            I agree to receive communication about this appointment *
          </label>
        </div>

        <div class="flex justify-between pt-4">
          <button @click="previousStep" type="button" class="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            Back
          </button>
          <button
            type="submit"
            :disabled="submitting || !isFormValid"
            :class="['px-6 py-2 rounded-md font-medium transition-colors flex items-center', isFormValid && !submitting ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed']"
          >
            <svg v-if="submitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ submitting ? 'Booking...' : 'Book Appointment' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Success State -->
    <div v-if="step === 4" class="text-center py-8">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">Appointment Booked!</h3>
      <p class="text-gray-600 mb-6">
        Thank you! Your appointment has been scheduled. You'll receive a confirmation email shortly.
      </p>
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left max-w-md mx-auto">
        <h5 class="font-medium text-gray-900 mb-2">Appointment Details</h5>
        <div class="space-y-1 text-sm text-gray-600">
          <p><strong>Service:</strong> {{ selectedService?.name }}</p>
          <p><strong>Date:</strong> {{ formatDate(selectedDate) }}</p>
          <p><strong>Time:</strong> {{ formatTime(selectedTime) }}</p>
          <p><strong>Duration:</strong> {{ selectedService?.duration }} minutes</p>
        </div>
      </div>
      <button @click="resetScheduler" class="px-6 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700 transition-colors">
        Book Another Appointment
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { trackEvent } from '../utils/analytics'
import { csrfFetch } from '../composables/useCsrf'
import { secureStorage } from '../utils/secureStorage'

// Props
const props = defineProps({
  availabilityConfig: {
    type: Object,
    default: () => ({
      workDays: [1, 2, 3, 4, 5], // Monday to Friday
      workHours: { start: 9, end: 17 }, // 9 AM to 5 PM
      sessionDuration: 60, // minutes
      bufferTime: 15, // minutes between sessions
      daysAhead: 30 // how many days ahead to show
    })
  },
  services: {
    type: Array,
    default: null
  }
})

// State
const step = ref(1)
const submitting = ref(false)
const currentDate = ref(new Date())
const selectedService = ref(null)
const selectedDate = ref(null)
const selectedTime = ref(null)

// Form data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  consent: false
})

// Services configuration - use from props or default
const services = computed(() => {
  return props.services || [
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
  ].filter(service => service.enabled)
})

// Computed properties
const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const days = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    const isToday = date.getTime() === today.getTime()
    const inMonth = date.getMonth() === month
    const isPast = date < today
    const isWorkDay = props.availabilityConfig.workDays.includes(date.getDay())
    const isWithinRange = date <= new Date(today.getTime() + props.availabilityConfig.daysAhead * 24 * 60 * 60 * 1000)

    days.push({
      key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      date: new Date(date),
      day: date.getDate(),
      isToday,
      inMonth,
      available: !isPast && isWorkDay && isWithinRange && inMonth,
      selected: selectedDate.value && date.getTime() === selectedDate.value.getTime()
    })
  }

  return days
})

const availableTimes = computed(() => {
  if (!selectedDate.value) return []

  const times = []
  const { start, end } = props.availabilityConfig.workHours
  const duration = selectedService.value?.duration || 60
  const buffer = props.availabilityConfig.bufferTime

  for (let hour = start; hour < end; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeSlot = hour * 100 + minute
      const endTime = hour * 100 + minute + duration

      // Don't add if session would go past work hours
      if (endTime > end * 100) continue

      times.push(timeSlot)
    }
  }

  return times
})

const isFormValid = computed(() => {
  return form.value.firstName &&
         form.value.lastName &&
         form.value.email &&
         form.value.consent
})

// Methods
const selectService = (service) => {
  selectedService.value = service
  trackEvent('scheduler_service_selected', { service: service.name })
}

const nextStep = () => {
  if (step.value < 4) {
    step.value++
    trackEvent('scheduler_step', { step: step.value })
  }
}

const previousStep = () => {
  if (step.value > 1) {
    step.value--
  }
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const selectDate = (dateObj) => {
  if (dateObj.available) {
    selectedDate.value = dateObj.date
    selectedTime.value = null // Reset time when date changes
    trackEvent('scheduler_date_selected', { date: dateObj.date.toISOString() })
  }
}

const selectTime = (time) => {
  selectedTime.value = time
  trackEvent('scheduler_time_selected', { time })
}

const formatTime = (time) => {
  const hour = Math.floor(time / 100)
  const minute = time % 100
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`
}

const formatDate = (date) => {
  if (!date) return ''
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const submitBooking = async () => {
  submitting.value = true

  try {
    const appointmentData = {
      service: selectedService.value,
      date: selectedDate.value,
      time: selectedTime.value,
      client: form.value,
      timestamp: new Date().toISOString()
    }

    // Save to secure storage as backup (encrypted)
    const existingBookings = await secureStorage.getItem('appointments') || []
    existingBookings.push(appointmentData)
    await secureStorage.setItem('appointments', existingBookings)

    // Try to submit to server with CSRF protection
    const response = await csrfFetch('/api/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(appointmentData)
    })

    if (response.ok) {
      trackEvent('appointment_booked', {
        service: selectedService.value.name,
        date: selectedDate.value.toISOString()
      })
      step.value = 4
    } else {
      throw new Error('Server error')
    }
  } catch (error) {
    console.error('Booking error:', error)
    // Still show success if saved locally
    trackEvent('appointment_booked_offline', {
      service: selectedService.value.name,
      date: selectedDate.value.toISOString()
    })
    step.value = 4
  } finally {
    submitting.value = false
  }
}

const resetScheduler = () => {
  step.value = 1
  selectedService.value = null
  selectedDate.value = null
  selectedTime.value = null
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    consent: false
  }
  currentDate.value = new Date()
}
</script>

<style scoped>
.custom-scheduler {
  @apply max-w-4xl mx-auto;
}

/* Calendar day hover effects */
.calendar-day {
  @apply transition-all duration-200;
}

.calendar-day:hover:not(:disabled) {
  @apply scale-110;
}

/* Form focus styles */
input:focus,
textarea:focus,
select:focus {
  @apply ring-2 ring-brand-500 border-brand-500;
}

/* Smooth transitions */
.step-transition {
  @apply transition-all duration-300 ease-in-out;
}
</style>