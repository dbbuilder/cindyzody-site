<script setup>
import { computed } from 'vue'
import { HeartIcon, SparklesIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  feeling: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  },
  compact: {
    type: Boolean,
    default: false
  },
  showDetails: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select', 'click'])

const isMet = computed(() => props.feeling.category === 'needs_met')

const cardClasses = computed(() => {
  const base = [
    'relative rounded-xl border transition-all duration-200 cursor-pointer',
    'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2'
  ]

  if (props.selected) {
    base.push(
      isMet.value
        ? 'bg-feeling-met-light border-feeling-met ring-2 ring-feeling-met'
        : 'bg-feeling-unmet-light border-feeling-unmet ring-2 ring-feeling-unmet'
    )
  } else {
    base.push(
      'bg-white border-slate-200 hover:border-slate-300',
      isMet.value ? 'focus:ring-feeling-met' : 'focus:ring-feeling-unmet'
    )
  }

  if (props.compact) {
    base.push('px-3 py-2')
  } else {
    base.push('p-4')
  }

  return base.join(' ')
})

const intensityDots = computed(() => {
  const intensity = props.feeling.intensity
  return {
    low: intensity === 'low' || intensity === 'medium' || intensity === 'high',
    medium: intensity === 'medium' || intensity === 'high',
    high: intensity === 'high'
  }
})

function handleClick() {
  emit('select', props.feeling)
  emit('click', props.feeling)
}

function handleKeydown(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    handleClick()
  }
}
</script>

<template>
  <div
    :class="cardClasses"
    role="button"
    tabindex="0"
    :aria-pressed="selected"
    :aria-label="`${feeling.label} - ${isMet ? 'when needs are met' : 'when needs are unmet'}`"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <!-- Selected indicator -->
    <CheckCircleIcon
      v-if="selected"
      class="absolute top-2 right-2 w-5 h-5"
      :class="isMet ? 'text-feeling-met-dark' : 'text-feeling-unmet-dark'"
    />

    <!-- Compact view -->
    <template v-if="compact">
      <div class="flex items-center gap-2">
        <component
          :is="isMet ? SparklesIcon : HeartIcon"
          class="w-4 h-4 flex-shrink-0"
          :class="isMet ? 'text-feeling-met' : 'text-feeling-unmet'"
        />
        <span class="font-medium text-slate-700 text-sm">{{ feeling.label }}</span>
      </div>
    </template>

    <!-- Full view -->
    <template v-else>
      <div class="flex items-start gap-3">
        <!-- Icon -->
        <div
          class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          :class="isMet ? 'bg-feeling-met-light' : 'bg-feeling-unmet-light'"
        >
          <component
            :is="isMet ? SparklesIcon : HeartIcon"
            class="w-5 h-5"
            :class="isMet ? 'text-feeling-met' : 'text-feeling-unmet'"
          />
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <h3 class="font-semibold text-slate-800">{{ feeling.label }}</h3>

            <!-- Intensity indicator -->
            <div class="flex gap-0.5" :title="`Intensity: ${feeling.intensity}`">
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="intensityDots.low ? 'bg-intensity-low' : 'bg-slate-200'"
              />
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="intensityDots.medium ? 'bg-intensity-medium' : 'bg-slate-200'"
              />
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="intensityDots.high ? 'bg-intensity-high' : 'bg-slate-200'"
              />
            </div>
          </div>

          <p class="text-sm text-slate-600 line-clamp-2">{{ feeling.description }}</p>

          <!-- Expanded details -->
          <template v-if="showDetails">
            <!-- Body sensations -->
            <div v-if="feeling.bodySensations?.length" class="mt-3">
              <p class="text-xs font-medium text-slate-500 mb-1">Body sensations</p>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="sensation in feeling.bodySensations"
                  :key="sensation"
                  class="inline-flex px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-600"
                >
                  {{ sensation }}
                </span>
              </div>
            </div>

            <!-- Related needs -->
            <div v-if="feeling.relatedNeeds?.length" class="mt-3">
              <p class="text-xs font-medium text-slate-500 mb-1">Related needs</p>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="need in feeling.relatedNeeds"
                  :key="need"
                  class="inline-flex px-2 py-0.5 text-xs rounded-full"
                  :class="isMet ? 'bg-feeling-met-light text-feeling-met-dark' : 'bg-feeling-unmet-light text-feeling-unmet-dark'"
                >
                  {{ need }}
                </span>
              </div>
            </div>

            <!-- Synonyms -->
            <div v-if="feeling.synonyms?.length" class="mt-3">
              <p class="text-xs font-medium text-slate-500 mb-1">Similar words</p>
              <p class="text-xs text-slate-600">{{ feeling.synonyms.join(', ') }}</p>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
