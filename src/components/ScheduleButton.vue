<template>
  <div class="schedule-button-container">
    <!-- Schedule Button -->
    <RouterLink
      to="/contact"
      class="schedule-btn"
      @click="trackEvent('schedule_click', { source: 'header_button' })"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
      <span class="hidden sm:inline ml-2">Schedule</span>
    </RouterLink>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { trackEvent } from '../utils/analytics'

const props = defineProps({
  schedulerUrl: {
    type: String,
    default: 'https://app.squarespacescheduling.com/schedule/bbdef557'
  },
  position: {
    type: String,
    default: 'right', // 'left', 'right', 'center'
    validator: (value) => ['left', 'right', 'center'].includes(value)
  }
})

const showScheduler = ref(false)

const toggleScheduler = () => {
  showScheduler.value = !showScheduler.value
  if (showScheduler.value) {
    trackEvent('schedule_open', { source: 'button' })
  }
}
</script>

<style scoped>
.schedule-button-container {
  @apply relative;
}

.schedule-btn {
  @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all duration-200 shadow-sm;
}

.schedule-btn-active {
  @apply bg-brand-700 ring-2 ring-brand-500 ring-offset-2;
}

.scheduler-dropdown {
  @apply absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50;
  max-width: calc(100vw - 2rem);
}

.scheduler-header {
  @apply p-4 border-b border-gray-200;
}

.quick-actions {
  @apply p-4 space-y-2;
}

.quick-action-btn {
  @apply flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-brand-50 rounded-md transition-colors duration-150;
}

.quick-action-btn svg {
  @apply mr-3 text-gray-400;
}

.scheduler-embed {
  @apply p-4 pt-0;
}

/* Position variants */
.schedule-button-container.position-left .scheduler-dropdown {
  @apply left-0 right-auto;
}

.schedule-button-container.position-center .scheduler-dropdown {
  @apply left-1/2 right-auto transform -translate-x-1/2;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .scheduler-dropdown {
    @apply w-80;
  }

  .scheduler-embed iframe {
    @apply h-96;
  }
}

@media (max-width: 640px) {
  .scheduler-dropdown {
    @apply w-72;
  }
}
</style>