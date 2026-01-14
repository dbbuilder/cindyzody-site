<template>
  <div
    class="group relative flex-shrink-0 w-72 cursor-pointer transform transition-all duration-300 hover:scale-[1.03] hover:z-10"
    @click="$emit('select', scenario)"
  >
    <!-- Card with soft gradient background -->
    <div
      class="relative h-[340px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
      :class="cardGradient"
    >
      <!-- Soft organic shapes overlay -->
      <div class="absolute inset-0 opacity-30">
        <div class="absolute top-6 right-6 w-24 h-24 rounded-full bg-white/20 blur-xl"></div>
        <div class="absolute bottom-12 left-6 w-16 h-16 rounded-full bg-white/15 blur-lg"></div>
        <div class="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-2xl"></div>
      </div>

      <!-- Content -->
      <div class="relative h-full flex flex-col p-5">
        <!-- Category icon -->
        <div class="mb-auto">
          <div class="w-12 h-12 rounded-xl bg-white/25 backdrop-blur-sm flex items-center justify-center mb-3 shadow-sm">
            <component :is="categoryIcon" class="w-6 h-6 text-white" />
          </div>
          <span class="text-xs font-medium uppercase tracking-wider text-white/90">
            {{ categoryLabel }}
          </span>
        </div>

        <!-- Title and description -->
        <div class="mt-auto">
          <h3 class="text-lg font-semibold text-white mb-2 leading-snug">
            {{ scenario.title }}
          </h3>
          <p class="text-sm text-white/80 line-clamp-2 mb-4">
            {{ scenario.description }}
          </p>

          <!-- Difficulty badge -->
          <div class="flex items-center gap-2 mb-4">
            <span
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm"
            >
              {{ difficultyLabel }}
            </span>
            <span class="text-xs text-white/70 flex items-center">
              <ClockIcon class="w-3.5 h-3.5 mr-1" />
              10-15 min
            </span>
          </div>

          <!-- Hover action -->
          <div class="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button
              @click.stop="$emit('start', scenario)"
              class="w-full inline-flex items-center justify-center px-4 py-2.5 bg-white/95 text-slate-800 rounded-xl font-medium text-sm hover:bg-white transition-colors shadow-md"
            >
              <PlayIcon class="w-4 h-4 mr-2" />
              Begin Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  PlayIcon,
  ClockIcon,
  BriefcaseIcon,
  HomeIcon,
  HeartIcon,
  UsersIcon,
  SparklesIcon
} from '@heroicons/vue/24/solid'
import { categoryGradients, categoryLabels, difficultyStyles } from '../lib/colors'

const props = defineProps({
  scenario: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select', 'start'])

const categoryIcons = {
  workplace: BriefcaseIcon,
  family: HomeIcon,
  romantic: HeartIcon,
  friendship: UsersIcon,
  self: SparklesIcon
}

const categoryIcon = computed(() => categoryIcons[props.scenario.category] || SparklesIcon)
const categoryLabel = computed(() => categoryLabels[props.scenario.category] || 'Practice')
const cardGradient = computed(() => categoryGradients[props.scenario.category] || categoryGradients.self)
const difficultyLabel = computed(() => difficultyStyles[props.scenario.difficulty]?.label || 'Beginner')
</script>
