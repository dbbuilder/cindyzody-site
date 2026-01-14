<script setup>
import { ref, computed } from 'vue'
import {
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/vue/24/solid'
import {
  HeartIcon,
  StarIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  // Pre-selected values
  initialFeelings: {
    type: Array,
    default: () => []
  },
  initialNeeds: {
    type: Array,
    default: () => []
  },
  // Quick feeling emojis
  quickFeelings: {
    type: Array,
    default: () => [
      { emoji: '😊', label: 'Happy', id: 'joyful' },
      { emoji: '😌', label: 'Peaceful', id: 'peaceful' },
      { emoji: '😔', label: 'Sad', id: 'sad' },
      { emoji: '😤', label: 'Frustrated', id: 'frustrated' },
      { emoji: '😰', label: 'Anxious', id: 'anxious' },
      { emoji: '😴', label: 'Tired', id: 'exhausted' },
      { emoji: '🥰', label: 'Loved', id: 'loving' },
      { emoji: '😐', label: 'Neutral', id: 'content' }
    ]
  },
  // Whether to show "go deeper" option
  showGoDeeper: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['complete', 'go-deeper'])

// Step state
const currentStep = ref(1) // 1: Quick feelings, 2: Note (optional), 3: Complete

// Selection state
const selectedQuickFeelings = ref([])
const note = ref('')
const isSubmitting = ref(false)
const isComplete = ref(false)

// Handle quick feeling selection
function toggleQuickFeeling(feeling) {
  const index = selectedQuickFeelings.value.findIndex(f => f.id === feeling.id)
  if (index >= 0) {
    selectedQuickFeelings.value.splice(index, 1)
  } else {
    if (selectedQuickFeelings.value.length < 3) {
      selectedQuickFeelings.value.push(feeling)
    }
  }
}

// Check if feeling is selected
function isFeelingSelected(feeling) {
  return selectedQuickFeelings.value.some(f => f.id === feeling.id)
}

// Proceed to next step
function nextStep() {
  if (currentStep.value < 2) {
    currentStep.value++
  } else {
    submitCheckIn()
  }
}

// Skip note
function skipNote() {
  submitCheckIn()
}

// Submit check-in
async function submitCheckIn() {
  if (isSubmitting.value) return
  isSubmitting.value = true

  const checkInData = {
    feelings: selectedQuickFeelings.value,
    note: note.value.trim(),
    timestamp: new Date().toISOString()
  }

  // Simulate submission delay
  await new Promise(resolve => setTimeout(resolve, 500))

  isComplete.value = true
  isSubmitting.value = false

  emit('complete', checkInData)
}

// Go deeper with AI
function goDeeper() {
  emit('go-deeper', {
    feelings: selectedQuickFeelings.value,
    note: note.value.trim()
  })
}

// Reset
function reset() {
  currentStep.value = 1
  selectedQuickFeelings.value = []
  note.value = ''
  isComplete.value = false
}

// Expose reset method
defineExpose({ reset })
</script>

<template>
  <div class="check-in-widget bg-white rounded-xl border shadow-sm overflow-hidden">
    <!-- Header -->
    <div class="px-4 py-3 bg-gradient-to-r from-brand-50 to-sage-50 border-b">
      <h3 class="font-semibold text-sm flex items-center gap-2">
        <HeartIcon class="w-4 h-4 text-brand-600" />
        Daily Check-In
      </h3>
      <p class="text-xs text-slate-500 mt-0.5">How are you feeling right now?</p>
    </div>

    <!-- Content -->
    <div class="p-4">
      <!-- Completed State -->
      <div v-if="isComplete" class="text-center py-6">
        <div class="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircleIcon class="w-8 h-8 text-brand-600" />
        </div>
        <h3 class="font-semibold text-lg mb-2">Check-in Complete!</h3>
        <p class="text-sm text-slate-600 mb-4">
          You're feeling
          <span class="font-medium">
            {{ selectedQuickFeelings.map(f => f.label.toLowerCase()).join(', ') }}
          </span>
          today.
        </p>

        <div v-if="showGoDeeper" class="space-y-2">
          <button
            @click="goDeeper"
            class="w-full inline-flex items-center justify-center gap-2 bg-brand-600 text-white px-4 py-2.5 rounded-lg hover:bg-brand-700 transition-colors font-medium"
          >
            <SparklesIcon class="w-4 h-4" />
            Go Deeper with AI
          </button>
          <button
            @click="reset"
            class="w-full text-sm text-slate-500 hover:text-slate-700 py-2"
          >
            Done for now
          </button>
        </div>
      </div>

      <!-- Step 1: Quick Feelings -->
      <div v-else-if="currentStep === 1">
        <p class="text-sm text-slate-600 mb-3">
          Tap up to 3 feelings that resonate with you:
        </p>

        <div class="grid grid-cols-4 gap-2 mb-4">
          <button
            v-for="feeling in quickFeelings"
            :key="feeling.id"
            @click="toggleQuickFeeling(feeling)"
            class="flex flex-col items-center p-3 rounded-lg border-2 transition-all"
            :class="isFeelingSelected(feeling)
              ? 'border-brand-500 bg-brand-50'
              : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'"
          >
            <span class="text-2xl mb-1">{{ feeling.emoji }}</span>
            <span class="text-xs text-slate-600">{{ feeling.label }}</span>
          </button>
        </div>

        <button
          @click="nextStep"
          :disabled="selectedQuickFeelings.length === 0"
          class="w-full inline-flex items-center justify-center gap-2 bg-brand-600 text-white px-4 py-2.5 rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Continue
          <ArrowRightIcon class="w-4 h-4" />
        </button>
      </div>

      <!-- Step 2: Optional Note -->
      <div v-else-if="currentStep === 2">
        <div class="flex flex-wrap gap-1 mb-3">
          <span
            v-for="feeling in selectedQuickFeelings"
            :key="feeling.id"
            class="inline-flex items-center gap-1 px-2 py-1 text-sm rounded-full bg-brand-100 text-brand-700"
          >
            {{ feeling.emoji }} {{ feeling.label }}
          </span>
        </div>

        <label class="block text-sm text-slate-600 mb-2">
          Add a brief note (optional):
        </label>
        <textarea
          v-model="note"
          placeholder="What's bringing up these feelings?"
          rows="3"
          class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-colors resize-none mb-3"
        />

        <div class="flex gap-2">
          <button
            @click="skipNote"
            class="flex-1 text-sm text-slate-600 hover:text-slate-800 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Skip
          </button>
          <button
            @click="submitCheckIn"
            :disabled="isSubmitting"
            class="flex-1 inline-flex items-center justify-center gap-2 bg-brand-600 text-white px-4 py-2.5 rounded-lg hover:bg-brand-700 disabled:opacity-50 transition-colors font-medium"
          >
            <template v-if="isSubmitting">
              <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </template>
            <template v-else>
              <CheckCircleIcon class="w-4 h-4" />
              Complete Check-In
            </template>
          </button>
        </div>
      </div>
    </div>

    <!-- Step Indicator -->
    <div v-if="!isComplete" class="px-4 pb-3">
      <div class="flex items-center justify-center gap-2">
        <div
          class="w-2 h-2 rounded-full transition-colors"
          :class="currentStep >= 1 ? 'bg-brand-500' : 'bg-slate-200'"
        />
        <div
          class="w-2 h-2 rounded-full transition-colors"
          :class="currentStep >= 2 ? 'bg-brand-500' : 'bg-slate-200'"
        />
      </div>
    </div>
  </div>
</template>
