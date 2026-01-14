<script setup>
import { ref, computed, onMounted } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import needsData from '../../data/needs.json'

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
const activeCategory = ref(null)
const hoveredNeed = ref(null)
const focusedNeed = ref(null)
const isLoaded = ref(false)
const needNotes = ref({})
const selectedIds = computed(() => new Set(props.modelValue.map(n => n.id)))

// Category config
const categoryConfig = {
  connection: { label: 'Connection', color: '#ec4899', colorLight: '#fdf2f8' },
  physical: { label: 'Physical', color: '#22c55e', colorLight: '#f0fdf4' },
  honesty: { label: 'Honesty', color: '#3b82f6', colorLight: '#eff6ff' },
  play: { label: 'Play', color: '#eab308', colorLight: '#fefce8' },
  peace: { label: 'Peace', color: '#a855f7', colorLight: '#faf5ff' },
  autonomy: { label: 'Autonomy', color: '#f97316', colorLight: '#fff7ed' },
  meaning: { label: 'Meaning', color: '#6366f1', colorLight: '#eef2ff' }
}

// Check if at selection limit
const isAtLimit = computed(() => props.modelValue.length >= props.maxSelections)

// Group needs by category
const needsByCategory = computed(() => {
  const groups = {}
  needsData.categories.forEach(cat => {
    groups[cat.id] = needsData.needs.filter(n => n.category === cat.id)
  })
  return groups
})

// Inner ring: Category positions (smaller radius)
const categoryPositions = computed(() => {
  return needsData.categories.map((cat, index) => {
    const angle = (2 * Math.PI * index) / 7 - Math.PI / 2
    const radius = 70 // Smaller inner ring
    return {
      ...cat,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      config: categoryConfig[cat.id],
      needCount: needsByCategory.value[cat.id]?.length || 0
    }
  })
})

// Outer ring: Needs for selected category
const expandedNeeds = computed(() => {
  if (!activeCategory.value) return []

  const needs = needsByCategory.value[activeCategory.value]
  const count = needs.length
  const radius = 160 // Larger outer ring

  return needs.map((need, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2
    return {
      ...need,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    }
  })
})

const currentCategoryConfig = computed(() => {
  if (!activeCategory.value) return null
  return categoryConfig[activeCategory.value]
})

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

// Handle category click
function selectCategory(catId) {
  activeCategory.value = catId
  focusedNeed.value = null
}

// Handle need click - focus to show details
function handleNeedClick(need) {
  if (focusedNeed.value?.id === need.id) {
    toggleSelection(need)
  } else {
    focusedNeed.value = need
  }
}

// Toggle selection
function toggleSelection(need) {
  const isSelected = selectedIds.value.has(need.id)
  if (isSelected) {
    emit('update:modelValue', props.modelValue.filter(n => n.id !== need.id))
  } else if (!isAtLimit.value) {
    emit('update:modelValue', [...props.modelValue, { ...need, note: '' }])
    emit('select', need)
  }
}

// Add focused need to selection
function addFocusedToSelection() {
  if (focusedNeed.value && !selectedIds.value.has(focusedNeed.value.id) && !isAtLimit.value) {
    emit('update:modelValue', [...props.modelValue, { ...focusedNeed.value, note: '' }])
    emit('select', focusedNeed.value)
  }
}

// Save note and close
function saveNote() {
  if (focusedNeed.value && needNotes.value[focusedNeed.value.id]) {
    const updated = props.modelValue.map(n =>
      n.id === focusedNeed.value.id
        ? { ...n, note: needNotes.value[focusedNeed.value.id] }
        : n
    )
    emit('update:modelValue', updated)
  }
  focusedNeed.value = null
}

function closeFocusPanel() {
  focusedNeed.value = null
}

function removeNeed(need) {
  emit('update:modelValue', props.modelValue.filter(n => n.id !== need.id))
  if (focusedNeed.value?.id === need.id) {
    focusedNeed.value = null
  }
}
</script>

<template>
  <div class="needs-wheel-container relative">
    <!-- Selection Counter -->
    <div v-if="modelValue.length > 0" class="text-center mb-6">
      <span class="inline-flex items-center gap-2 text-sm text-slate-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
        <span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
        {{ modelValue.length }} of {{ maxSelections }} needs identified
      </span>
    </div>

    <!-- The Wheel Container -->
    <div
      class="relative w-full max-w-xl mx-auto aspect-square transition-all duration-700"
      :class="{ 'scale-95 opacity-0': !isLoaded, 'scale-100 opacity-100': isLoaded }"
    >
      <!-- Ambient glow -->
      <div
        class="absolute inset-0 rounded-full blur-3xl opacity-20 transition-colors duration-500"
        :style="{ backgroundColor: activeCategory ? currentCategoryConfig?.color : '#22c55e' }"
      />

      <svg viewBox="-220 -220 440 440" class="w-full h-full" style="position: relative; z-index: 10;">
        <defs>
          <!-- Text glow filter -->
          <filter id="needTextGlow" x="-50%" y="-50%" width="200%" height="200%">
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
          <filter id="catShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15"/>
          </filter>
        </defs>

        <!-- Outer ring background (shows when category selected) -->
        <circle
          v-if="activeCategory"
          r="160"
          fill="none"
          :stroke="currentCategoryConfig?.color"
          stroke-width="50"
          stroke-opacity="0.08"
        />

        <!-- Inner ring background -->
        <circle
          r="70"
          fill="none"
          stroke="#e2e8f0"
          stroke-width="40"
          stroke-opacity="0.3"
        />

        <!-- OUTER RING: Needs for selected category -->
        <g v-if="activeCategory">
          <g
            v-for="need in expandedNeeds"
            :key="need.id"
            :transform="`translate(${need.x}, ${need.y})`"
          >
            <!-- Hit area -->
            <circle
              r="30"
              fill="transparent"
              class="cursor-pointer"
              @click="handleNeedClick(need)"
              @mouseenter="hoveredNeed = need"
              @mouseleave="hoveredNeed = null"
            />

            <!-- Visual -->
            <g class="pointer-events-none">
              <circle
                v-if="selectedIds.has(need.id) || hoveredNeed?.id === need.id || focusedNeed?.id === need.id"
                r="28"
                :fill="currentCategoryConfig?.color"
                :opacity="selectedIds.has(need.id) ? 0.2 : focusedNeed?.id === need.id ? 0.15 : 0.08"
                class="transition-all duration-300"
              />
              <text
                y="1"
                text-anchor="middle"
                dominant-baseline="middle"
                filter="url(#needTextGlow)"
                class="text-xs font-semibold"
                :fill="selectedIds.has(need.id) ? currentCategoryConfig?.color : '#334155'"
              >
                {{ need.label }}
              </text>
            </g>
          </g>
        </g>

        <!-- INNER RING: Categories (always visible) -->
        <g v-for="cat in categoryPositions" :key="cat.id">
          <g :transform="`translate(${cat.x}, ${cat.y})`">
            <!-- Hit area -->
            <circle
              r="25"
              fill="transparent"
              class="cursor-pointer"
              @click="selectCategory(cat.id)"
            />

            <!-- Visual -->
            <g class="pointer-events-none">
              <!-- Background circle -->
              <circle
                r="22"
                :fill="activeCategory === cat.id ? cat.config.color : cat.config.colorLight"
                :stroke="cat.config.color"
                :stroke-width="activeCategory === cat.id ? 0 : 1.5"
                filter="url(#catShadow)"
                class="transition-all duration-300"
              />

              <!-- Label -->
              <text
                y="1"
                text-anchor="middle"
                dominant-baseline="middle"
                class="font-semibold transition-all duration-300"
                style="font-size: 8px;"
                :fill="activeCategory === cat.id ? 'white' : cat.config.color"
              >
                {{ cat.config.label }}
              </text>

              <!-- Count badge -->
              <g transform="translate(16, -16)">
                <circle r="8" :fill="cat.config.color" />
                <text
                  x="0" y="1"
                  text-anchor="middle"
                  dominant-baseline="middle"
                  class="fill-white font-bold"
                  style="font-size: 7px;"
                >
                  {{ cat.needCount }}
                </text>
              </g>
            </g>
          </g>
        </g>

        <!-- CENTER: YOU -->
        <g>
          <circle
            cx="0" cy="0" r="28"
            class="fill-white"
            stroke="#22c55e"
            stroke-width="2"
            filter="url(#catShadow)"
          />
          <text
            x="0" y="0"
            text-anchor="middle"
            dominant-baseline="middle"
            class="text-sm font-bold fill-brand-600"
          >
            YOU
          </text>
        </g>
      </svg>

      <!-- Detail Panel for focused need -->
      <div
        v-if="focusedNeed"
        class="absolute left-1/2 -translate-x-1/2 bottom-4 z-20 pointer-events-auto"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl border-2 p-5 min-w-80 max-w-md"
          :style="{ borderColor: currentCategoryConfig?.color }"
        >
          <!-- Header -->
          <div class="flex items-start justify-between gap-3 mb-4">
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                :style="{ backgroundColor: currentCategoryConfig?.color }"
              >
                <span class="text-xl font-bold text-white">
                  {{ focusedNeed.label.charAt(0) }}
                </span>
              </div>
              <div>
                <h4 class="font-bold text-xl" :style="{ color: currentCategoryConfig?.color }">
                  {{ focusedNeed.label }}
                </h4>
                <span class="text-xs text-slate-500">
                  {{ currentCategoryConfig?.label }} need
                </span>
              </div>
            </div>
            <button
              @click="closeFocusPanel"
              class="p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <XMarkIcon class="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <!-- Description -->
          <p class="text-sm text-slate-600 mb-4 leading-relaxed">
            {{ focusedNeed.description }}
          </p>

          <!-- Examples -->
          <div v-if="focusedNeed.examples?.length" class="mb-4">
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              This looks like...
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="example in focusedNeed.examples"
                :key="example"
                class="text-sm px-3 py-1.5 rounded-full bg-slate-100 text-slate-700"
              >
                {{ example }}
              </span>
            </div>
          </div>

          <!-- Reflection -->
          <div v-if="focusedNeed.reflectionQuestions?.length" class="mb-4 p-3 rounded-xl" :style="{ backgroundColor: currentCategoryConfig?.colorLight }">
            <p class="text-xs font-semibold uppercase tracking-wider mb-1" :style="{ color: currentCategoryConfig?.color }">
              Reflect
            </p>
            <p class="text-sm italic" :style="{ color: currentCategoryConfig?.color }">
              "{{ focusedNeed.reflectionQuestions[0] }}"
            </p>
          </div>

          <!-- Action area -->
          <div class="pt-3 border-t border-slate-100">
            <div v-if="!selectedIds.has(focusedNeed.id)">
              <button
                @click="addFocusedToSelection"
                :disabled="isAtLimit"
                class="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                :style="{ backgroundColor: currentCategoryConfig?.color }"
              >
                Yes, I need this
              </button>
            </div>

            <div v-else class="space-y-3">
              <div class="flex items-center gap-2 text-sm font-medium" :style="{ color: currentCategoryConfig?.color }">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Added to your needs
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-500 mb-1.5">
                  Add a note (optional)
                </label>
                <textarea
                  v-model="needNotes[focusedNeed.id]"
                  placeholder="How is this need showing up for you?"
                  rows="2"
                  class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 resize-none"
                />
              </div>

              <div class="flex gap-2">
                <button
                  @click="toggleSelection(focusedNeed)"
                  class="flex-1 py-2 px-3 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Remove
                </button>
                <button
                  @click="saveNote"
                  class="flex-1 py-2 px-3 rounded-lg text-sm font-semibold text-white"
                  :style="{ backgroundColor: currentCategoryConfig?.color }"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Helper text -->
    <div v-if="!activeCategory && isLoaded" class="text-center mt-6">
      <p class="text-sm text-slate-500">
        Tap a category to explore the needs within it
      </p>
    </div>

    <!-- Selected needs display -->
    <div v-if="modelValue.length > 0" class="mt-8">
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-5">
        <h4 class="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <span class="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white bg-brand-500">
            {{ modelValue.length }}
          </span>
          Your Identified Needs
        </h4>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="need in modelValue"
            :key="need.id"
            @click="removeNeed(need)"
            class="group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 text-white shadow-lg"
            :style="{ backgroundColor: categoryConfig[need.category].color }"
          >
            {{ need.label }}
            <XMarkIcon class="w-4 h-4 opacity-60 group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Minimal styles - most handled inline */
</style>
