<script setup>
import { ref, computed, watch } from 'vue'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import FeelingCard from './FeelingCard.vue'
import feelingsData from '../../data/feelings.json'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: true
  },
  maxSelections: {
    type: Number,
    default: 5
  },
  showFauxFeelings: {
    type: Boolean,
    default: false
  },
  compact: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'select'])

// Local state
const searchQuery = ref('')
const activeTab = ref('needs_unmet') // Start with unmet - more common when seeking support

// Compute selected feeling IDs
const selectedIds = computed(() => new Set(props.modelValue.map(f => f.id)))

// Intensity labels and order
const intensityGroups = {
  high: { label: 'Strong', description: 'Intense feelings that demand attention' },
  medium: { label: 'Moderate', description: 'Clear feelings present in awareness' },
  low: { label: 'Subtle', description: 'Gentle feelings often in the background' }
}
const intensityOrder = ['high', 'medium', 'low']

// Filter feelings based on search and tab
const filteredFeelings = computed(() => {
  let feelings = feelingsData.feelings.filter(f => f.category === activeTab.value)

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    feelings = feelingsData.feelings.filter(f => {
      return (
        f.label.toLowerCase().includes(query) ||
        f.description.toLowerCase().includes(query) ||
        f.synonyms?.some(s => s.toLowerCase().includes(query))
      )
    })
  }

  return feelings
})

// Group feelings by intensity
const feelingsByIntensity = computed(() => {
  const groups = {}
  for (const intensity of intensityOrder) {
    const feelings = filteredFeelings.value.filter(f => f.intensity === intensity)
    if (feelings.length > 0) {
      groups[intensity] = feelings
    }
  }
  return groups
})

// Check if we're in search mode (flat display)
const isSearching = computed(() => searchQuery.value.trim().length > 0)

// Faux feelings for translation
const filteredFauxFeelings = computed(() => {
  if (!props.showFauxFeelings) return []

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    return feelingsData.fauxFeelings.filter(f =>
      f.label.toLowerCase().includes(query) ||
      f.interpretation.toLowerCase().includes(query)
    )
  }

  return feelingsData.fauxFeelings
})

// Check if selection limit reached
const isAtLimit = computed(() =>
  props.multiple && props.modelValue.length >= props.maxSelections
)

// Handle feeling selection
function selectFeeling(feeling) {
  const isSelected = selectedIds.value.has(feeling.id)

  let newValue
  if (isSelected) {
    // Deselect
    newValue = props.modelValue.filter(f => f.id !== feeling.id)
  } else if (props.multiple) {
    // Multi-select: add if not at limit
    if (isAtLimit.value) return
    newValue = [...props.modelValue, feeling]
  } else {
    // Single select: replace
    newValue = [feeling]
  }

  emit('update:modelValue', newValue)
  emit('select', feeling)
}

// Handle faux feeling click - show real feelings
const expandedFauxFeeling = ref(null)
function toggleFauxFeeling(fauxFeeling) {
  if (expandedFauxFeeling.value?.id === fauxFeeling.id) {
    expandedFauxFeeling.value = null
  } else {
    expandedFauxFeeling.value = fauxFeeling
  }
}

// Get real feeling objects from IDs
function getRealFeelings(feelingIds) {
  return feelingIds
    .map(id => feelingsData.feelings.find(f => f.id === id))
    .filter(Boolean)
}

// Clear search
function clearSearch() {
  searchQuery.value = ''
}
</script>

<template>
  <div class="feeling-picker">
    <!-- Search bar -->
    <div class="relative mb-4">
      <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search feelings..."
        class="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-colors"
      />
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 transition-colors"
        aria-label="Clear search"
      >
        <XMarkIcon class="w-4 h-4 text-slate-400" />
      </button>
    </div>

    <!-- Tabs (only show when not searching) -->
    <div v-if="!searchQuery" class="flex gap-2 mb-4">
      <button
        @click="activeTab = 'needs_unmet'"
        class="flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors"
        :class="activeTab === 'needs_unmet'
          ? 'bg-feeling-unmet-light text-feeling-unmet-dark border-2 border-feeling-unmet'
          : 'bg-slate-50 text-slate-600 border-2 border-transparent hover:bg-slate-100'"
      >
        When needs are unmet
      </button>
      <button
        @click="activeTab = 'needs_met'"
        class="flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors"
        :class="activeTab === 'needs_met'
          ? 'bg-feeling-met-light text-feeling-met-dark border-2 border-feeling-met'
          : 'bg-slate-50 text-slate-600 border-2 border-transparent hover:bg-slate-100'"
      >
        When needs are met
      </button>
    </div>

    <!-- Selection count -->
    <div v-if="multiple && modelValue.length > 0" class="flex items-center justify-between mb-3">
      <p class="text-sm text-slate-600">
        {{ modelValue.length }} of {{ maxSelections }} selected
      </p>
      <button
        v-if="modelValue.length > 0"
        @click="emit('update:modelValue', [])"
        class="text-sm text-slate-500 hover:text-slate-700 underline"
      >
        Clear all
      </button>
    </div>

    <!-- Selected feelings preview -->
    <div v-if="modelValue.length > 0" class="flex flex-wrap gap-2 mb-4 p-3 bg-slate-50 rounded-lg">
      <button
        v-for="feeling in modelValue"
        :key="feeling.id"
        @click="selectFeeling(feeling)"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
        :class="feeling.category === 'needs_met'
          ? 'bg-feeling-met-light text-feeling-met-dark hover:bg-feeling-met/20'
          : 'bg-feeling-unmet-light text-feeling-unmet-dark hover:bg-feeling-unmet/20'"
      >
        {{ feeling.label }}
        <XMarkIcon class="w-4 h-4" />
      </button>
    </div>

    <!-- Faux feelings section -->
    <div v-if="showFauxFeelings && filteredFauxFeelings.length > 0" class="mb-6">
      <h3 class="text-sm font-medium text-slate-500 mb-2">
        Not sure? These might be thoughts disguised as feelings:
      </h3>
      <div class="space-y-2">
        <div
          v-for="faux in filteredFauxFeelings"
          :key="faux.id"
          class="border border-amber-200 rounded-lg bg-amber-50 overflow-hidden"
        >
          <button
            @click="toggleFauxFeeling(faux)"
            class="w-full p-3 text-left hover:bg-amber-100 transition-colors"
          >
            <div class="flex items-center justify-between">
              <span class="font-medium text-amber-800">{{ faux.label }}</span>
              <span class="text-xs text-amber-600">Click to see real feelings</span>
            </div>
            <p class="text-sm text-amber-700 mt-1">{{ faux.interpretation }}</p>
          </button>

          <!-- Expanded real feelings -->
          <div v-if="expandedFauxFeeling?.id === faux.id" class="p-3 bg-white border-t border-amber-200">
            <p class="text-xs font-medium text-slate-500 mb-2">You might actually be feeling:</p>
            <div class="grid grid-cols-2 gap-2">
              <FeelingCard
                v-for="feeling in getRealFeelings(faux.realFeelings)"
                :key="feeling.id"
                :feeling="feeling"
                :selected="selectedIds.has(feeling.id)"
                compact
                @select="selectFeeling"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Feelings by intensity groups -->
    <div v-if="!isSearching" class="space-y-6">
      <div
        v-for="intensity in intensityOrder"
        :key="intensity"
        v-show="feelingsByIntensity[intensity]?.length"
      >
        <!-- Group header -->
        <div class="flex items-center gap-3 mb-3">
          <div
            class="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
            :class="{
              'bg-red-100 text-red-700': intensity === 'high',
              'bg-amber-100 text-amber-700': intensity === 'medium',
              'bg-blue-100 text-blue-700': intensity === 'low'
            }"
          >
            <span
              class="w-2 h-2 rounded-full"
              :class="{
                'bg-red-500': intensity === 'high',
                'bg-amber-500': intensity === 'medium',
                'bg-blue-500': intensity === 'low'
              }"
            ></span>
            {{ intensityGroups[intensity].label }}
          </div>
          <span class="text-xs text-slate-500">{{ intensityGroups[intensity].description }}</span>
        </div>

        <!-- Feelings in group -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="feeling in feelingsByIntensity[intensity]"
            :key="feeling.id"
            @click="selectFeeling(feeling)"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all border-2"
            :class="[
              selectedIds.has(feeling.id)
                ? (activeTab === 'needs_met'
                    ? 'bg-feeling-met text-white border-feeling-met shadow-md scale-105'
                    : 'bg-feeling-unmet text-white border-feeling-unmet shadow-md scale-105')
                : (activeTab === 'needs_met'
                    ? 'bg-feeling-met-light text-feeling-met-dark border-feeling-met-light hover:border-feeling-met hover:shadow-sm'
                    : 'bg-feeling-unmet-light text-feeling-unmet-dark border-feeling-unmet-light hover:border-feeling-unmet hover:shadow-sm'),
              { 'opacity-50 cursor-not-allowed': isAtLimit && !selectedIds.has(feeling.id) }
            ]"
            :disabled="isAtLimit && !selectedIds.has(feeling.id)"
            :title="feeling.description"
          >
            {{ feeling.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Search results (flat grid) -->
    <div v-else class="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      <FeelingCard
        v-for="feeling in filteredFeelings"
        :key="feeling.id"
        :feeling="feeling"
        :selected="selectedIds.has(feeling.id)"
        compact
        :class="{ 'opacity-50 pointer-events-none': isAtLimit && !selectedIds.has(feeling.id) }"
        @select="selectFeeling"
      />
    </div>

    <!-- Empty state -->
    <div v-if="filteredFeelings.length === 0 && !searchQuery" class="text-center py-8">
      <p class="text-slate-500">No feelings in this category</p>
    </div>

    <div v-if="filteredFeelings.length === 0 && searchQuery" class="text-center py-8">
      <p class="text-slate-500">No feelings match "{{ searchQuery }}"</p>
      <button
        @click="clearSearch"
        class="mt-2 text-brand-600 hover:text-brand-700 text-sm underline"
      >
        Clear search
      </button>
    </div>
  </div>
</template>
