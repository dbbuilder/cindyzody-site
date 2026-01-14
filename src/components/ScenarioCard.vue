<template>
  <div
    class="bg-white rounded-xl border hover:shadow-md transition-all cursor-pointer"
    :class="{ 'ring-2 ring-brand-500': selected }"
    @click="$emit('select', scenario)"
  >
    <div class="p-5">
      <!-- Header -->
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center"
            :class="categoryClasses"
          >
            <component :is="categoryIcon" class="w-4 h-4" />
          </div>
          <span class="text-xs font-medium uppercase tracking-wide" :class="categoryTextClass">
            {{ categoryLabel }}
          </span>
        </div>
        <span
          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
          :class="difficultyClasses"
        >
          {{ scenario.difficulty }}
        </span>
      </div>

      <!-- Title & Description -->
      <h3 class="font-semibold text-slate-900 mb-2">{{ scenario.title }}</h3>
      <p class="text-sm text-slate-600 mb-4 line-clamp-2">{{ scenario.description }}</p>

      <!-- Suggested feelings/needs preview -->
      <div class="flex flex-wrap gap-1.5 mb-4">
        <span
          v-for="feeling in scenario.suggestedFeelings?.slice(0, 3)"
          :key="feeling"
          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-rose-100 text-rose-700"
        >
          {{ feeling }}
        </span>
        <span
          v-for="need in scenario.suggestedNeeds?.slice(0, 2)"
          :key="need"
          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-brand-100 text-brand-700"
        >
          {{ need }}
        </span>
      </div>

      <!-- Action button -->
      <button
        @click.stop="$emit('start', scenario)"
        class="w-full inline-flex items-center justify-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors text-sm font-medium"
      >
        Practice This Scenario
        <ArrowRightIcon class="w-4 h-4 ml-2" />
      </button>
    </div>

    <!-- Expanded details (when selected) -->
    <div v-if="selected && showDetails" class="border-t border-slate-100 p-5 bg-slate-50">
      <div class="space-y-4">
        <!-- Context -->
        <div>
          <h4 class="text-sm font-medium text-slate-700 mb-1">Context</h4>
          <p class="text-sm text-slate-600">{{ scenario.context }}</p>
        </div>

        <!-- Practice Goals -->
        <div v-if="scenario.practiceGoals?.length > 0">
          <h4 class="text-sm font-medium text-slate-700 mb-2">Practice Goals</h4>
          <ul class="space-y-1">
            <li
              v-for="(goal, idx) in scenario.practiceGoals"
              :key="idx"
              class="flex items-start gap-2 text-sm text-slate-600"
            >
              <CheckCircleIcon class="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
              {{ goal }}
            </li>
          </ul>
        </div>

        <!-- Sample Opening -->
        <div v-if="scenario.sampleOpening">
          <h4 class="text-sm font-medium text-slate-700 mb-1">Sample Opening</h4>
          <p class="text-sm text-slate-600 italic">"{{ scenario.sampleOpening }}"</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  ArrowRightIcon,
  CheckCircleIcon,
  BriefcaseIcon,
  HomeIcon,
  HeartIcon,
  UsersIcon,
  SparklesIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  scenario: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  },
  showDetails: {
    type: Boolean,
    default: true
  }
})

defineEmits(['select', 'start'])

const categoryData = {
  workplace: {
    icon: BriefcaseIcon,
    label: 'Workplace',
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-700'
  },
  family: {
    icon: HomeIcon,
    label: 'Family',
    bgClass: 'bg-rose-100',
    textClass: 'text-rose-700'
  },
  romantic: {
    icon: HeartIcon,
    label: 'Romantic',
    bgClass: 'bg-pink-100',
    textClass: 'text-pink-700'
  },
  friendship: {
    icon: UsersIcon,
    label: 'Friendship',
    bgClass: 'bg-purple-100',
    textClass: 'text-purple-700'
  },
  self: {
    icon: SparklesIcon,
    label: 'Self',
    bgClass: 'bg-amber-100',
    textClass: 'text-amber-700'
  }
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced: 'bg-red-100 text-red-700'
}

const category = computed(() => categoryData[props.scenario.category] || categoryData.self)
const categoryIcon = computed(() => category.value.icon)
const categoryLabel = computed(() => category.value.label)
const categoryClasses = computed(() => `${category.value.bgClass} ${category.value.textClass}`)
const categoryTextClass = computed(() => category.value.textClass)
const difficultyClasses = computed(() => difficultyColors[props.scenario.difficulty] || difficultyColors.beginner)
</script>
