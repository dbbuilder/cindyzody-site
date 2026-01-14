<template>
  <div class="space-y-6">
    <!-- Step 1: Select feelings -->
    <div>
      <h3 class="text-sm font-medium text-slate-700 mb-3">How are you feeling right now?</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="feeling in quickFeelings"
          :key="feeling.id"
          @click="toggleFeeling(feeling.id)"
          class="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all"
          :class="selectedFeelings.includes(feeling.id)
            ? feeling.category === 'needs_met'
              ? 'bg-green-500 text-white'
              : 'bg-rose-500 text-white'
            : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'"
        >
          {{ feeling.label }}
        </button>
      </div>
      <button
        @click="showMoreFeelings = !showMoreFeelings"
        class="mt-2 text-sm text-brand-600 hover:text-brand-700"
      >
        {{ showMoreFeelings ? 'Show less' : 'Show more feelings...' }}
      </button>

      <!-- More feelings -->
      <div v-if="showMoreFeelings" class="mt-3">
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-2">
          <button
            v-for="feeling in moreFeelings"
            :key="feeling.id"
            @click="toggleFeeling(feeling.id)"
            class="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all text-left"
            :class="selectedFeelings.includes(feeling.id)
              ? feeling.category === 'needs_met'
                ? 'bg-green-500 text-white'
                : 'bg-rose-500 text-white'
              : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'"
          >
            {{ feeling.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Step 2: Energy level -->
    <div v-if="selectedFeelings.length > 0">
      <h3 class="text-sm font-medium text-slate-700 mb-3">What's your energy level?</h3>
      <div class="flex items-center gap-3">
        <span class="text-sm text-slate-500">Low</span>
        <div class="flex gap-2">
          <button
            v-for="level in 5"
            :key="level"
            @click="energyLevel = level"
            class="w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all"
            :class="energyLevel === level
              ? 'bg-amber-500 text-white'
              : energyLevel > 0 && level <= energyLevel
                ? 'bg-amber-200 text-amber-700'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
          >
            {{ level }}
          </button>
        </div>
        <span class="text-sm text-slate-500">High</span>
      </div>
    </div>

    <!-- Step 3: Optional notes -->
    <div v-if="selectedFeelings.length > 0 && energyLevel > 0">
      <h3 class="text-sm font-medium text-slate-700 mb-3">Anything you'd like to note? (optional)</h3>
      <textarea
        v-model="notes"
        placeholder="What's happening? What needs might be alive for you?"
        rows="2"
        class="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
      ></textarea>
    </div>

    <!-- Submit -->
    <div v-if="selectedFeelings.length > 0 && energyLevel > 0" class="flex justify-end">
      <button
        @click="submitCheckIn"
        :disabled="isSubmitting"
        class="inline-flex items-center px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium disabled:opacity-50"
      >
        <template v-if="isSubmitting">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Saving...
        </template>
        <template v-else>
          Save Check-in
          <CheckIcon class="w-4 h-4 ml-2" />
        </template>
      </button>
    </div>

    <!-- Error message -->
    <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
import { useProgress } from '../composables/useProgress'
import feelingsData from '../data/feelings.json'

const emit = defineEmits(['complete'])

const { saveCheckIn } = useProgress()

const selectedFeelings = ref([])
const energyLevel = ref(0)
const notes = ref('')
const showMoreFeelings = ref(false)
const isSubmitting = ref(false)
const error = ref(null)

// Quick access feelings - most common ones
const quickFeelingIds = [
  'peaceful', 'joyful', 'grateful', 'hopeful', 'content', 'calm',
  'anxious', 'frustrated', 'sad', 'overwhelmed', 'tired', 'stressed'
]

const quickFeelings = computed(() => {
  return quickFeelingIds.map(id => {
    const feeling = feelingsData.feelings.find(f => f.id === id)
    return feeling || { id, label: id, category: 'needs_unmet' }
  }).filter(Boolean)
})

const moreFeelings = computed(() => {
  return feelingsData.feelings.filter(f => !quickFeelingIds.includes(f.id))
})

function toggleFeeling(id) {
  const index = selectedFeelings.value.indexOf(id)
  if (index === -1) {
    if (selectedFeelings.value.length < 5) {
      selectedFeelings.value.push(id)
    }
  } else {
    selectedFeelings.value.splice(index, 1)
  }
}

async function submitCheckIn() {
  if (selectedFeelings.value.length === 0) {
    error.value = 'Please select at least one feeling'
    return
  }

  isSubmitting.value = true
  error.value = null

  try {
    await saveCheckIn({
      feelings: selectedFeelings.value,
      energyLevel: energyLevel.value,
      notes: notes.value.trim() || null
    })

    // Reset form
    selectedFeelings.value = []
    energyLevel.value = 0
    notes.value = ''
    showMoreFeelings.value = false

    emit('complete')
  } catch (err) {
    error.value = err.message || 'Failed to save check-in. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
