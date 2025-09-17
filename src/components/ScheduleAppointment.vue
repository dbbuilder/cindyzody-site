<template>
  <div class="schedule-appointment">
    <!-- Always show custom scheduler inline -->
    <CustomScheduler
      :availability-config="schedulerConfig.availability"
      :services="schedulerConfig.services"
    />

    <!-- Fallback external scheduler link (if needed) -->
    <div v-if="hasExternalFallback" class="mt-6 text-center border-t border-gray-200 pt-6">
      <p class="text-sm text-gray-600 mb-3">
        Prefer to use an external scheduling system?
      </p>
      <a
        :href="externalSchedulerUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium text-sm"
      >
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
        {{ externalSchedulerName }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CustomScheduler from './CustomScheduler.vue'
import { getActiveSchedulerConfig, SCHEDULER_CONFIG, SCHEDULER_PROVIDERS, getSchedulerUrl } from '../config/scheduling'

const props = defineProps({
  variant: {
    type: String,
    default: 'inline',
    validator: (value) => ['button', 'inline', 'compact'].includes(value)
  },
  // These props are kept for backward compatibility but now use config
  schedulerUrl: {
    type: String,
    default: ''
  }
})

// Get active scheduler configuration
const schedulerConfig = computed(() => getActiveSchedulerConfig())

// Check if there's an external scheduler available as fallback
const hasExternalFallback = computed(() => {
  // Check if Squarespace or other external schedulers have URLs configured
  return !!(
    SCHEDULER_CONFIG[SCHEDULER_PROVIDERS.SQUARESPACE]?.url ||
    SCHEDULER_CONFIG[SCHEDULER_PROVIDERS.CALENDLY]?.url ||
    props.schedulerUrl
  )
})

const externalSchedulerUrl = computed(() => {
  return props.schedulerUrl ||
         SCHEDULER_CONFIG[SCHEDULER_PROVIDERS.SQUARESPACE]?.url ||
         SCHEDULER_CONFIG[SCHEDULER_PROVIDERS.CALENDLY]?.url ||
         ''
})

const externalSchedulerName = computed(() => {
  if (props.schedulerUrl) return 'External Scheduler'
  if (SCHEDULER_CONFIG[SCHEDULER_PROVIDERS.SQUARESPACE]?.url) return 'Squarespace Scheduling'
  if (SCHEDULER_CONFIG[SCHEDULER_PROVIDERS.CALENDLY]?.url) return 'Calendly'
  return 'External Scheduler'
})
</script>

<style scoped>
.schedule-appointment {
  @apply w-full;
}

.scheduler-container {
  @apply bg-white rounded-lg border border-gray-200;
  min-height: 400px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .scheduler-container iframe {
    height: 500px;
  }
}
</style>