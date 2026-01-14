<script setup>
import { computed } from 'vue'
import {
  HeartIcon,
  SunIcon,
  ShieldCheckIcon,
  SparklesIcon,
  MoonIcon,
  ArrowPathIcon,
  StarIcon
} from '@heroicons/vue/24/outline'
import { CheckCircleIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  need: {
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

// Map category to icon component
const categoryIcons = {
  connection: HeartIcon,
  physical: SunIcon,
  honesty: ShieldCheckIcon,
  play: SparklesIcon,
  peace: MoonIcon,
  autonomy: ArrowPathIcon,
  meaning: StarIcon
}

const categoryIcon = computed(() => categoryIcons[props.need.category] || HeartIcon)

// Get color classes based on category
const colorClasses = computed(() => {
  const category = props.need.category
  return {
    bg: `bg-need-${category}-light`,
    text: `text-need-${category}`,
    textDark: `text-need-${category}-dark`,
    border: `border-need-${category}`,
    ring: `ring-need-${category}`
  }
})

const cardClasses = computed(() => {
  const base = [
    'relative rounded-xl border transition-all duration-200 cursor-pointer',
    'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2'
  ]

  if (props.selected) {
    base.push(
      colorClasses.value.bg,
      colorClasses.value.border,
      `ring-2 ${colorClasses.value.ring}`
    )
  } else {
    base.push(
      'bg-white border-slate-200 hover:border-slate-300',
      `focus:${colorClasses.value.ring}`
    )
  }

  if (props.compact) {
    base.push('px-3 py-2')
  } else {
    base.push('p-4')
  }

  return base.join(' ')
})

const categoryLabel = computed(() => {
  const labels = {
    connection: 'Connection',
    physical: 'Physical Well-being',
    honesty: 'Honesty',
    play: 'Play',
    peace: 'Peace',
    autonomy: 'Autonomy',
    meaning: 'Meaning'
  }
  return labels[props.need.category] || props.need.category
})

function handleClick() {
  emit('select', props.need)
  emit('click', props.need)
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
    :aria-label="`${need.label} - ${categoryLabel} need`"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <!-- Selected indicator -->
    <CheckCircleIcon
      v-if="selected"
      class="absolute top-2 right-2 w-5 h-5"
      :class="colorClasses.textDark"
    />

    <!-- Compact view -->
    <template v-if="compact">
      <div class="flex items-center gap-2">
        <component
          :is="categoryIcon"
          class="w-4 h-4 flex-shrink-0"
          :class="colorClasses.text"
        />
        <span class="font-medium text-slate-700 text-sm">{{ need.label }}</span>
      </div>
    </template>

    <!-- Full view -->
    <template v-else>
      <div class="flex items-start gap-3">
        <!-- Icon -->
        <div
          class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          :class="colorClasses.bg"
        >
          <component
            :is="categoryIcon"
            class="w-5 h-5"
            :class="colorClasses.text"
          />
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <h3 class="font-semibold text-slate-800">{{ need.label }}</h3>
            <span
              class="inline-flex px-2 py-0.5 text-xs rounded-full"
              :class="[colorClasses.bg, colorClasses.textDark]"
            >
              {{ categoryLabel }}
            </span>
          </div>

          <p class="text-sm text-slate-600 line-clamp-2">{{ need.description }}</p>

          <!-- Expanded details -->
          <template v-if="showDetails">
            <!-- Examples -->
            <div v-if="need.examples?.length" class="mt-3">
              <p class="text-xs font-medium text-slate-500 mb-1">Examples</p>
              <ul class="text-xs text-slate-600 list-disc list-inside space-y-0.5">
                <li v-for="example in need.examples" :key="example">
                  {{ example }}
                </li>
              </ul>
            </div>

            <!-- Reflection questions -->
            <div v-if="need.reflectionQuestions?.length" class="mt-3">
              <p class="text-xs font-medium text-slate-500 mb-1">Reflect on this</p>
              <ul class="text-xs text-slate-600 italic space-y-1">
                <li v-for="question in need.reflectionQuestions" :key="question">
                  "{{ question }}"
                </li>
              </ul>
            </div>

            <!-- Related feelings when met -->
            <div v-if="need.relatedFeelingsMet?.length" class="mt-3">
              <p class="text-xs font-medium text-slate-500 mb-1">When this need is met, you might feel</p>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="feeling in need.relatedFeelingsMet"
                  :key="feeling"
                  class="inline-flex px-2 py-0.5 text-xs rounded-full bg-feeling-met-light text-feeling-met-dark"
                >
                  {{ feeling }}
                </span>
              </div>
            </div>

            <!-- Related feelings when unmet -->
            <div v-if="need.relatedFeelingsUnmet?.length" class="mt-3">
              <p class="text-xs font-medium text-slate-500 mb-1">When this need is unmet, you might feel</p>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="feeling in need.relatedFeelingsUnmet"
                  :key="feeling"
                  class="inline-flex px-2 py-0.5 text-xs rounded-full bg-feeling-unmet-light text-feeling-unmet-dark"
                >
                  {{ feeling }}
                </span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
