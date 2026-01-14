<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { XMarkIcon, ChevronLeftIcon } from '@heroicons/vue/24/outline'
import feelingsData from '../../data/feelings.json'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  maxSelections: {
    type: Number,
    default: 5
  }
})

const emit = defineEmits(['update:modelValue', 'select'])

// State
const activeCategory = ref('needs_unmet')
const activeIntensity = ref(null) // null = overview, or 'high', 'medium', 'low'
const hoveredFeeling = ref(null)
const focusedFeeling = ref(null) // The feeling being explored in detail
const isLoaded = ref(false)
const visibleNodes = ref(new Set())
const selectedIds = computed(() => new Set(props.modelValue.map(f => f.id)))
const feelingNotes = ref({}) // Store notes by feeling ID
const showNoteInput = ref(false) // Show note input after selection

// Intensity config - warm, personal language
const intensityConfig = {
  high: {
    label: 'I feel this deeply',
    shortLabel: 'Deeply',
    description: 'These feelings are vivid and hard to ignore',
    radius: 160,
    color: '#e11d48',
    bgColor: '#fff1f2'
  },
  medium: {
    label: 'I notice this clearly',
    shortLabel: 'Clearly',
    description: 'These feelings are present in my awareness',
    radius: 120,
    color: '#8b5cf6',
    bgColor: '#f5f3ff'
  },
  low: {
    label: 'I sense this gently',
    shortLabel: 'Gently',
    description: 'These feelings are soft, in the background',
    radius: 80,
    color: '#0ea5e9',
    bgColor: '#f0f9ff'
  }
}

const intensityOrder = ['low', 'medium', 'high']

// Check if at selection limit
const isAtLimit = computed(() => props.modelValue.length >= props.maxSelections)

// Get feelings for current category, organized by intensity
const feelingsByIntensity = computed(() => {
  const feelings = feelingsData.feelings.filter(f => f.category === activeCategory.value)
  return {
    high: feelings.filter(f => f.intensity === 'high'),
    medium: feelings.filter(f => f.intensity === 'medium'),
    low: feelings.filter(f => f.intensity === 'low')
  }
})

// Calculate positions for feelings in the expanded ring
const expandedFeelings = computed(() => {
  if (!activeIntensity.value) return []

  const feelings = feelingsByIntensity.value[activeIntensity.value]
  const count = feelings.length
  const radius = 140

  return feelings.map((feeling, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2
    return {
      ...feeling,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      delay: i * 40
    }
  })
})

// Combined watcher for intensity changes
watch(activeIntensity, (newVal) => {
  if (newVal) {
    // Show all nodes when intensity is selected
    setTimeout(() => {
      visibleNodes.value = new Set(expandedFeelings.value.map(f => f.id))
      console.log('Nodes visible:', visibleNodes.value.size)
    }, 50)
  } else {
    visibleNodes.value = new Set()
    focusedFeeling.value = null
  }
}, { flush: 'post' })

onMounted(() => {
  console.log('EmotionWheel mounted!')
  console.log('Feelings data loaded:', feelingsData.feelings.length, 'feelings')
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

// Reset when category changes
watch(activeCategory, () => {
  activeIntensity.value = null
  focusedFeeling.value = null
})

// Handle clicking on an intensity ring
function selectIntensity(intensity) {
  console.log('Intensity ring clicked:', intensity)
  activeIntensity.value = intensity
}

// Handle feeling click - focus to explore, click again to select
function handleFeelingClick(feeling) {
  console.log('Feeling clicked:', feeling.label)
  if (focusedFeeling.value?.id === feeling.id) {
    // Already focused - toggle selection
    toggleSelection(feeling)
  } else {
    // Focus this feeling to show details
    focusedFeeling.value = feeling
  }
}

// Toggle selection on/off
function toggleSelection(feeling) {
  const isSelected = selectedIds.value.has(feeling.id)

  if (isSelected) {
    emit('update:modelValue', props.modelValue.filter(f => f.id !== feeling.id))
  } else if (!isAtLimit.value) {
    emit('update:modelValue', [...props.modelValue, feeling])
    emit('select', feeling)
  }
}

// Add focused feeling to selection and show note input
function addFocusedToSelection() {
  if (focusedFeeling.value && !selectedIds.value.has(focusedFeeling.value.id) && !isAtLimit.value) {
    const feelingWithNote = {
      ...focusedFeeling.value,
      note: ''
    }
    emit('update:modelValue', [...props.modelValue, feelingWithNote])
    emit('select', feelingWithNote)
    showNoteInput.value = true
  }
}

// Save note for current feeling
function saveNote() {
  if (focusedFeeling.value && feelingNotes.value[focusedFeeling.value.id]) {
    // Update the feeling in modelValue with the note
    const updated = props.modelValue.map(f =>
      f.id === focusedFeeling.value.id
        ? { ...f, note: feelingNotes.value[focusedFeeling.value.id] }
        : f
    )
    emit('update:modelValue', updated)
  }
  closeFocusPanel()
}

// Close the detail panel
function closeFocusPanel() {
  showNoteInput.value = false
  focusedFeeling.value = null
}

function removeFeeling(feeling) {
  emit('update:modelValue', props.modelValue.filter(f => f.id !== feeling.id))
  if (focusedFeeling.value?.id === feeling.id) {
    focusedFeeling.value = null
  }
}

// Get category colors
const categoryColors = computed(() => {
  if (activeCategory.value === 'needs_met') {
    return {
      primary: '#10b981',
      primaryDark: '#047857',
      primaryLight: '#ecfdf5',
      gradient: 'from-emerald-500 to-teal-600'
    }
  } else {
    return {
      primary: '#6366f1',
      primaryDark: '#4338ca',
      primaryLight: '#eef2ff',
      gradient: 'from-indigo-500 to-purple-600'
    }
  }
})

// Go back to overview
function goBack() {
  activeIntensity.value = null
}
</script>

<template>
  <div class="emotion-wheel-container relative">
    <!-- Category Toggle -->
    <div class="flex justify-center mb-8">
      <div class="relative inline-flex bg-slate-100/80 backdrop-blur-sm rounded-2xl p-2 gap-2 shadow-inner">
        <div
          class="absolute top-2 bottom-2 rounded-xl transition-all duration-500 ease-out shadow-lg"
          :class="activeCategory === 'needs_met' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gradient-to-r from-indigo-500 to-purple-600'"
          :style="{
            left: activeCategory === 'needs_unmet' ? '8px' : 'calc(50% + 4px)',
            width: 'calc(50% - 12px)'
          }"
        />
        <button
          @click="activeCategory = 'needs_unmet'"
          class="relative z-10 px-6 py-3 rounded-xl text-sm font-semibold transition-colors duration-300"
          :class="activeCategory === 'needs_unmet' ? 'text-white' : 'text-slate-600 hover:text-slate-900'"
        >
          When needs are unmet
        </button>
        <button
          @click="activeCategory = 'needs_met'"
          class="relative z-10 px-6 py-3 rounded-xl text-sm font-semibold transition-colors duration-300"
          :class="activeCategory === 'needs_met' ? 'text-white' : 'text-slate-600 hover:text-slate-900'"
        >
          When needs are met
        </button>
      </div>
    </div>

    <!-- Selection Counter -->
    <div v-if="modelValue.length > 0" class="text-center mb-4">
      <span class="inline-flex items-center gap-2 text-sm text-slate-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
        <span
          class="w-2 h-2 rounded-full animate-pulse"
          :class="activeCategory === 'needs_met' ? 'bg-emerald-500' : 'bg-indigo-500'"
        />
        {{ modelValue.length }} of {{ maxSelections }} feelings selected
      </span>
    </div>

    <!-- The Wheel Container -->
    <div
      class="relative w-full max-w-xl mx-auto aspect-square transition-all duration-700"
      :class="{ 'scale-95 opacity-0': !isLoaded, 'scale-100 opacity-100': isLoaded }"
    >
      <!-- Ambient glow -->
      <div
        class="absolute inset-0 rounded-full blur-3xl opacity-30 transition-colors duration-700"
        :class="activeCategory === 'needs_met' ? 'bg-emerald-400' : 'bg-indigo-400'"
      />

      <!-- OVERVIEW MODE: Show intensity rings to choose from -->
      <div v-if="!activeIntensity" class="w-full h-full">
        <svg viewBox="-220 -220 440 440" class="w-full h-full relative z-10">
          <!-- Intensity rings (clickable) - rendered from inside out -->
          <g v-for="(intensity, index) in intensityOrder" :key="intensity">
            <!-- Ring background -->
            <circle
              :r="intensityConfig[intensity].radius"
              fill="none"
              :stroke="intensityConfig[intensity].color"
              :stroke-width="index === 2 ? 50 : 38"
              stroke-opacity="0.12"
              class="transition-all duration-300"
            />
            <!-- Clickable ring overlay -->
            <circle
              :r="intensityConfig[intensity].radius"
              fill="none"
              :stroke="intensityConfig[intensity].color"
              :stroke-width="index === 2 ? 50 : 38"
              stroke-opacity="0"
              class="ring-hover cursor-pointer transition-all duration-300"
              style="pointer-events: stroke;"
              @click="selectIntensity(intensity)"
            />

            <!-- Ring label pill -->
            <g
              :transform="`translate(0, ${-intensityConfig[intensity].radius})`"
              class="cursor-pointer"
              @click="selectIntensity(intensity)"
            >
              <rect
                x="-75" y="-16"
                width="150" height="32"
                rx="16"
                :fill="intensityConfig[intensity].bgColor"
                :stroke="intensityConfig[intensity].color"
                stroke-width="1.5"
                stroke-opacity="0.3"
                class="transition-all duration-300"
              />
              <text
                x="0" y="1"
                text-anchor="middle"
                dominant-baseline="middle"
                class="text-xs font-semibold pointer-events-none"
                :fill="intensityConfig[intensity].color"
              >
                {{ intensityConfig[intensity].label }}
              </text>
            </g>

            <!-- Count badge -->
            <g :transform="`translate(${intensityConfig[intensity].radius * 0.7}, ${-intensityConfig[intensity].radius * 0.7})`">
              <circle r="16" :fill="intensityConfig[intensity].color" />
              <text
                x="0" y="1"
                text-anchor="middle"
                dominant-baseline="middle"
                class="text-xs font-bold fill-white"
              >
                {{ feelingsByIntensity[intensity].length }}
              </text>
            </g>
          </g>

          <!-- Center - YOU -->
          <g class="center-you">
            <circle
              cx="0" cy="0" r="45"
              class="fill-white"
              :stroke="categoryColors.primary"
              stroke-width="3"
            />
            <text
              x="0" y="-5"
              text-anchor="middle"
              dominant-baseline="middle"
              class="text-lg font-bold"
              :fill="categoryColors.primary"
            >
              YOU
            </text>
            <text
              x="0" y="14"
              text-anchor="middle"
              class="fill-slate-400"
              style="font-size: 9px"
            >
              how intensely?
            </text>
          </g>
        </svg>
      </div>

      <!-- EXPANDED MODE: Show feelings for selected intensity -->
      <div v-else class="w-full h-full">
        <!-- Back button -->
        <button
          @click="goBack"
          class="absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-white transition-all"
        >
          <ChevronLeftIcon class="w-4 h-4" />
          Back
        </button>

        <!-- Intensity label -->
        <div class="absolute top-4 left-1/2 -translate-x-1/2 z-20">
          <span
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg"
            :style="{ backgroundColor: intensityConfig[activeIntensity].color }"
          >
            {{ intensityConfig[activeIntensity].label }}
          </span>
        </div>

        <svg viewBox="-220 -220 440 440" class="w-full h-full" style="position: relative; z-index: 10;">
          <defs>
            <!-- Text glow - white halo behind text for readability -->
            <filter id="textGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
              <feColorMatrix in="blur" type="matrix"
                values="0 0 0 0 1
                        0 0 0 0 1
                        0 0 0 0 1
                        0 0 0 8 0" result="glow"/>
              <feMerge>
                <feMergeNode in="glow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <!-- Background ring -->
          <circle
            r="140"
            fill="none"
            :stroke="intensityConfig[activeIntensity].color"
            stroke-width="70"
            stroke-opacity="0.08"
          />

          <!-- Center - YOU -->
          <g class="center-you">
            <circle
              cx="0" cy="0" r="40"
              class="fill-white"
              :stroke="categoryColors.primary"
              stroke-width="2"
            />
            <text
              x="0" y="0"
              text-anchor="middle"
              dominant-baseline="middle"
              class="text-base font-bold"
              :fill="categoryColors.primary"
            >
              YOU
            </text>
          </g>

          <!-- Feeling nodes in a circle -->
          <!-- Outer g for POSITION (SVG transform), inner g for ANIMATION (CSS transform) -->
          <g
            v-for="feeling in expandedFeelings"
            :key="feeling.id"
            :transform="`translate(${feeling.x}, ${feeling.y})`"
          >
            <!-- Clickable hit area - invisible but catches all clicks -->
            <circle
              r="35"
              fill="transparent"
              class="cursor-pointer"
              @click="handleFeelingClick(feeling)"
              @mouseenter="hoveredFeeling = feeling"
              @mouseleave="hoveredFeeling = null"
            />

            <g
              class="feeling-node pointer-events-none"
              :class="{
                'node-visible': visibleNodes.has(feeling.id),
                'node-hovered': hoveredFeeling?.id === feeling.id,
                'node-selected': selectedIds.has(feeling.id),
                'node-focused': focusedFeeling?.id === feeling.id
              }"
            >
              <!-- Subtle highlight for selected/hovered -->
              <circle
                v-if="selectedIds.has(feeling.id) || hoveredFeeling?.id === feeling.id"
                r="32"
                :fill="categoryColors.primary"
                :opacity="selectedIds.has(feeling.id) ? 0.15 : 0.08"
                class="transition-all duration-300"
              />

              <!-- Label with glow effect -->
              <text
                y="1"
                text-anchor="middle"
                dominant-baseline="middle"
                class="transition-all duration-300 text-sm font-semibold"
                filter="url(#textGlow)"
                :fill="selectedIds.has(feeling.id) ? categoryColors.primary : '#334155'"
              >
                {{ feeling.label }}
              </text>
            </g>
          </g>
        </svg>

        <!-- Detail Panel - shows only when a feeling is clicked/focused -->
        <div
          v-if="focusedFeeling"
          class="absolute left-1/2 -translate-x-1/2 bottom-4 z-20 transition-all duration-300 pointer-events-auto"
        >
          <div
            class="bg-white rounded-2xl shadow-2xl border-2 p-5 min-w-80 max-w-md"
            :style="{ borderColor: categoryColors.primary }"
          >
            <!-- Header with close button for focused -->
            <div class="flex items-start justify-between gap-3 mb-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                  :style="{
                    backgroundColor: categoryColors.primary,
                    color: 'white'
                  }"
                >
                  <span class="text-xl font-bold">
                    {{ focusedFeeling.label.charAt(0) }}
                  </span>
                </div>
                <div>
                  <h4 class="font-bold text-xl" :style="{ color: categoryColors.primary }">
                    {{ focusedFeeling.label }}
                  </h4>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span
                      class="text-xs px-2 py-0.5 rounded-full font-medium"
                      :style="{
                        backgroundColor: intensityConfig[activeIntensity].bgColor,
                        color: intensityConfig[activeIntensity].color
                      }"
                    >
                      {{ intensityConfig[activeIntensity].shortLabel }}
                    </span>
                    <span class="text-xs text-slate-400">
                      {{ activeCategory === 'needs_met' ? 'when needs are met' : 'when needs are unmet' }}
                    </span>
                  </div>
                </div>
              </div>
              <button
                v-if="focusedFeeling"
                @click="closeFocusPanel"
                class="p-1.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                <XMarkIcon class="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <!-- Description -->
            <p class="text-sm text-slate-600 mb-4 leading-relaxed">
              {{ focusedFeeling.description }}
            </p>

            <!-- Body sensations -->
            <div v-if="focusedFeeling.bodySensations?.length" class="mb-4">
              <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                In your body, you might notice...
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="sensation in focusedFeeling.bodySensations"
                  :key="sensation"
                  class="text-sm px-3 py-1.5 rounded-full bg-slate-100 text-slate-700"
                >
                  {{ sensation }}
                </span>
              </div>
            </div>

            <!-- Similar words -->
            <div v-if="focusedFeeling.synonyms?.length" class="mb-4">
              <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Similar feelings
              </p>
              <p class="text-sm text-slate-600 italic">
                {{ focusedFeeling.synonyms.join(', ') }}
              </p>
            </div>

            <!-- Related needs - important connection! -->
            <div v-if="focusedFeeling.relatedNeeds?.length" class="mb-4 p-3 rounded-xl" :style="{ backgroundColor: categoryColors.primaryLight }">
              <p class="text-xs font-semibold uppercase tracking-wider mb-2" :style="{ color: categoryColors.primary }">
                This feeling often points to needs for...
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="need in focusedFeeling.relatedNeeds"
                  :key="need"
                  class="text-sm px-3 py-1 rounded-full bg-white/80 font-medium"
                  :style="{ color: categoryColors.primary }"
                >
                  {{ need }}
                </span>
              </div>
            </div>

            <!-- Action area -->
            <div class="pt-3 border-t border-slate-100">
              <!-- Not yet selected - show "Yes, I feel this" button -->
              <div v-if="!selectedIds.has(focusedFeeling.id)">
                <button
                  @click="addFocusedToSelection"
                  :disabled="isAtLimit"
                  class="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  :style="{ backgroundColor: categoryColors.primary }"
                >
                  Yes, I feel this
                </button>
              </div>

              <!-- Selected - show note input -->
              <div v-else class="space-y-3">
                <div class="flex items-center gap-2 text-sm font-medium" :style="{ color: categoryColors.primary }">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Added to your feelings
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-500 mb-1.5">
                    Add a note (optional)
                  </label>
                  <textarea
                    v-model="feelingNotes[focusedFeeling.id]"
                    placeholder="What's bringing up this feeling? Where do you notice it in your body?"
                    rows="2"
                    class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 resize-none"
                    :style="{ '--tw-ring-color': categoryColors.primary }"
                  />
                </div>

                <div class="flex gap-2">
                  <button
                    @click="toggleSelection(focusedFeeling)"
                    class="flex-1 py-2 px-3 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Remove
                  </button>
                  <button
                    @click="saveNote"
                    class="flex-1 py-2 px-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    :style="{ backgroundColor: categoryColors.primary }"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Selected feelings display -->
    <div v-if="modelValue.length > 0" class="mt-8">
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-5">
        <h4 class="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <span
            class="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white"
            :class="activeCategory === 'needs_met' ? 'bg-emerald-500' : 'bg-indigo-500'"
          >
            {{ modelValue.length }}
          </span>
          Your Selected Feelings
        </h4>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="feeling in modelValue"
            :key="feeling.id"
            @click="removeFeeling(feeling)"
            class="group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
            :class="feeling.category === 'needs_met'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'"
          >
            {{ feeling.label }}
            <XMarkIcon class="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </div>

    <!-- Helper text -->
    <div v-if="modelValue.length === 0 && isLoaded && !activeIntensity" class="text-center mt-6">
      <p class="text-sm text-slate-500">
        How strongly are you feeling right now? Choose a ring to explore.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Ring hover effect */
.ring-hover:hover {
  stroke-opacity: 0.25 !important;
}

/* Soft pulse for selected items */
@keyframes pulse-soft {
  0%, 100% { transform: scale(1); opacity: 0.25; }
  50% { transform: scale(1.1); opacity: 0.15; }
}

.animate-pulse-soft {
  animation: pulse-soft 2s ease-in-out infinite;
  transform-origin: center;
}

/* Feeling node styles - always visible, scale on hover/select */
.feeling-node {
  opacity: 1;
  transform: scale(1);
  transition: transform 0.3s ease-out;
}

.feeling-node.node-hovered {
  transform: scale(1.15);
}

.feeling-node.node-selected {
  transform: scale(1.1);
}

.feeling-node.node-focused {
  transform: scale(1.25);
}
</style>
