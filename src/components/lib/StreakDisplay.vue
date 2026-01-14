<script setup>
import { computed } from 'vue'
import { FireIcon, CalendarDaysIcon, TrophyIcon } from '@heroicons/vue/24/solid'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  // Current streak count
  currentStreak: {
    type: Number,
    default: 0
  },
  // Longest streak ever
  longestStreak: {
    type: Number,
    default: 0
  },
  // Last 7 days of check-ins (array of booleans, most recent first)
  weekHistory: {
    type: Array,
    default: () => [false, false, false, false, false, false, false]
  },
  // Whether checked in today
  checkedInToday: {
    type: Boolean,
    default: false
  },
  // Display size
  size: {
    type: String,
    default: 'normal', // 'compact', 'normal', 'large'
    validator: (v) => ['compact', 'normal', 'large'].includes(v)
  }
})

// Day labels (most recent first)
const dayLabels = computed(() => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const today = new Date().getDay()
  const result = []
  for (let i = 0; i < 7; i++) {
    result.push(days[(today - i + 7) % 7])
  }
  return result
})

// Streak message
const streakMessage = computed(() => {
  if (props.currentStreak === 0) {
    return props.checkedInToday
      ? "Great start! Keep it going!"
      : "Start your streak today!"
  } else if (props.currentStreak === 1) {
    return "You're on your way!"
  } else if (props.currentStreak < 7) {
    return "Building momentum!"
  } else if (props.currentStreak < 30) {
    return "Impressive consistency!"
  } else if (props.currentStreak < 100) {
    return "You're on fire!"
  } else {
    return "Incredible dedication!"
  }
})

// Fire color based on streak
const fireColor = computed(() => {
  if (props.currentStreak === 0) return 'text-slate-300'
  if (props.currentStreak < 3) return 'text-orange-400'
  if (props.currentStreak < 7) return 'text-orange-500'
  if (props.currentStreak < 30) return 'text-orange-600'
  return 'text-red-500'
})

// Size classes
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'compact':
      return {
        container: 'p-3',
        icon: 'w-6 h-6',
        number: 'text-2xl',
        dayCircle: 'w-6 h-6',
        dayCheck: 'w-3 h-3'
      }
    case 'large':
      return {
        container: 'p-6',
        icon: 'w-12 h-12',
        number: 'text-5xl',
        dayCircle: 'w-10 h-10',
        dayCheck: 'w-5 h-5'
      }
    default:
      return {
        container: 'p-4',
        icon: 'w-8 h-8',
        number: 'text-3xl',
        dayCircle: 'w-8 h-8',
        dayCheck: 'w-4 h-4'
      }
  }
})
</script>

<template>
  <div
    class="streak-display bg-white rounded-xl border shadow-sm overflow-hidden"
    :class="sizeClasses.container"
  >
    <!-- Main streak display -->
    <div class="flex items-center gap-4 mb-4">
      <div class="flex-shrink-0">
        <FireIcon :class="[sizeClasses.icon, fireColor]" />
      </div>
      <div class="flex-1">
        <div class="flex items-baseline gap-1">
          <span :class="['font-bold', sizeClasses.number]">{{ currentStreak }}</span>
          <span class="text-slate-500 text-sm">day{{ currentStreak !== 1 ? 's' : '' }}</span>
        </div>
        <p class="text-sm text-slate-600">{{ streakMessage }}</p>
      </div>

      <!-- Longest streak badge -->
      <div
        v-if="longestStreak > 0 && size !== 'compact'"
        class="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-full"
        title="Longest streak"
      >
        <TrophyIcon class="w-4 h-4 text-amber-500" />
        <span class="text-sm font-medium text-amber-700">{{ longestStreak }}</span>
      </div>
    </div>

    <!-- Week history -->
    <div v-if="size !== 'compact'" class="flex items-center justify-between">
      <div
        v-for="(checked, index) in weekHistory"
        :key="index"
        class="flex flex-col items-center gap-1"
      >
        <div
          class="rounded-full flex items-center justify-center transition-colors"
          :class="[
            sizeClasses.dayCircle,
            checked
              ? 'bg-brand-100'
              : index === 0 && !checkedInToday
                ? 'bg-amber-100 border-2 border-amber-300 border-dashed'
                : 'bg-slate-100'
          ]"
        >
          <CheckCircleIcon
            v-if="checked"
            :class="[sizeClasses.dayCheck, 'text-brand-600']"
          />
          <span
            v-else-if="index === 0 && !checkedInToday"
            class="text-xs font-medium text-amber-600"
          >?</span>
        </div>
        <span class="text-xs text-slate-500">{{ dayLabels[index] }}</span>
      </div>
    </div>

    <!-- Compact week indicator -->
    <div v-else class="flex items-center gap-1">
      <div
        v-for="(checked, index) in weekHistory"
        :key="index"
        class="w-3 h-3 rounded-full transition-colors"
        :class="checked ? 'bg-brand-500' : 'bg-slate-200'"
      />
    </div>

    <!-- Today's check-in reminder -->
    <div
      v-if="!checkedInToday && size !== 'compact'"
      class="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-center gap-3"
    >
      <CalendarDaysIcon class="w-5 h-5 text-amber-600 flex-shrink-0" />
      <p class="text-sm text-amber-800">
        Don't break your streak! Check in today to keep it going.
      </p>
    </div>
  </div>
</template>
