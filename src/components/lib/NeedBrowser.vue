<script setup>
import { ref, computed } from 'vue'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import {
  HeartIcon,
  SunIcon,
  ShieldCheckIcon,
  SparklesIcon,
  MoonIcon,
  ArrowPathIcon,
  StarIcon
} from '@heroicons/vue/24/outline'
import NeedCard from './NeedCard.vue'
import needsData from '../../data/needs.json'

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
  compact: {
    type: Boolean,
    default: false
  },
  showDetails: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'select'])

// Local state
const searchQuery = ref('')
const activeCategory = ref(null) // null = show all

// Category icons map
const categoryIcons = {
  connection: HeartIcon,
  physical: SunIcon,
  honesty: ShieldCheckIcon,
  play: SparklesIcon,
  peace: MoonIcon,
  autonomy: ArrowPathIcon,
  meaning: StarIcon
}

// Category colors for pills
const categoryColors = {
  connection: 'bg-need-connection-light text-need-connection-dark border-need-connection',
  physical: 'bg-need-physical-light text-need-physical-dark border-need-physical',
  honesty: 'bg-need-honesty-light text-need-honesty-dark border-need-honesty',
  play: 'bg-need-play-light text-need-play-dark border-need-play',
  peace: 'bg-need-peace-light text-need-peace-dark border-need-peace',
  autonomy: 'bg-need-autonomy-light text-need-autonomy-dark border-need-autonomy',
  meaning: 'bg-need-meaning-light text-need-meaning-dark border-need-meaning'
}

// Compute selected need IDs
const selectedIds = computed(() => new Set(props.modelValue.map(n => n.id)))

// Filter needs based on search and category
const filteredNeeds = computed(() => {
  let needs = needsData.needs

  // Filter by category if one is selected
  if (activeCategory.value) {
    needs = needs.filter(n => n.category === activeCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    needs = needsData.needs.filter(n => {
      return (
        n.label.toLowerCase().includes(query) ||
        n.description.toLowerCase().includes(query) ||
        n.examples?.some(e => e.toLowerCase().includes(query))
      )
    })
  }

  return needs
})

// Group needs by category (for default view)
const needsByCategory = computed(() => {
  const groups = {}
  for (const category of needsData.categories) {
    const categoryNeeds = filteredNeeds.value.filter(n => n.category === category.id)
    if (categoryNeeds.length > 0) {
      groups[category.id] = {
        ...category,
        needs: categoryNeeds
      }
    }
  }
  return groups
})

// Check if we're in search mode or filtered mode
const isSearching = computed(() => searchQuery.value.trim().length > 0)
const showGroupedView = computed(() => !isSearching.value && !activeCategory.value)

// Check if selection limit reached
const isAtLimit = computed(() =>
  props.multiple && props.modelValue.length >= props.maxSelections
)

// Handle need selection
function selectNeed(need) {
  const isSelected = selectedIds.value.has(need.id)

  let newValue
  if (isSelected) {
    // Deselect
    newValue = props.modelValue.filter(n => n.id !== need.id)
  } else if (props.multiple) {
    // Multi-select: add if not at limit
    if (isAtLimit.value) return
    newValue = [...props.modelValue, need]
  } else {
    // Single select: replace
    newValue = [need]
  }

  emit('update:modelValue', newValue)
  emit('select', need)
}

// Toggle category filter
function toggleCategory(categoryId) {
  if (activeCategory.value === categoryId) {
    activeCategory.value = null
  } else {
    activeCategory.value = categoryId
  }
}

// Clear search
function clearSearch() {
  searchQuery.value = ''
}
</script>

<template>
  <div class="need-browser">
    <!-- Search bar -->
    <div class="relative mb-4">
      <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search needs..."
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

    <!-- Category filters -->
    <div v-if="!searchQuery" class="flex flex-wrap gap-2 mb-4">
      <button
        v-for="category in needsData.categories"
        :key="category.id"
        @click="toggleCategory(category.id)"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border-2"
        :class="activeCategory === category.id
          ? categoryColors[category.id]
          : 'bg-slate-50 text-slate-600 border-transparent hover:bg-slate-100'"
      >
        <component :is="categoryIcons[category.id]" class="w-4 h-4" />
        {{ category.label }}
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

    <!-- Selected needs preview -->
    <div v-if="modelValue.length > 0" class="flex flex-wrap gap-2 mb-4 p-3 bg-slate-50 rounded-lg">
      <button
        v-for="need in modelValue"
        :key="need.id"
        @click="selectNeed(need)"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
        :class="categoryColors[need.category]?.replace('border-', 'hover:border-') || 'bg-slate-100 text-slate-700'"
      >
        <component :is="categoryIcons[need.category]" class="w-4 h-4" />
        {{ need.label }}
        <XMarkIcon class="w-4 h-4" />
      </button>
    </div>

    <!-- Grouped view by category -->
    <div v-if="showGroupedView" class="space-y-6">
      <div
        v-for="category in needsData.categories"
        :key="category.id"
        v-show="needsByCategory[category.id]?.needs?.length"
        class="rounded-xl border overflow-hidden"
        :class="`border-need-${category.id}/30`"
      >
        <!-- Category header -->
        <div
          class="flex items-center gap-3 px-4 py-3"
          :class="`bg-need-${category.id}-light`"
        >
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center"
            :class="`bg-need-${category.id}/20`"
          >
            <component
              :is="categoryIcons[category.id]"
              class="w-4 h-4"
              :class="`text-need-${category.id}-dark`"
            />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-sm" :class="`text-need-${category.id}-dark`">
              {{ category.label }}
            </h3>
            <p class="text-xs opacity-75" :class="`text-need-${category.id}-dark`">
              {{ category.description }}
            </p>
          </div>
        </div>

        <!-- Needs in category -->
        <div class="p-3 bg-white">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="need in needsByCategory[category.id]?.needs"
              :key="need.id"
              @click="selectNeed(need)"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all border-2"
              :class="[
                selectedIds.has(need.id)
                  ? `bg-need-${category.id} text-white border-need-${category.id} shadow-md scale-105`
                  : `bg-need-${category.id}-light text-need-${category.id}-dark border-need-${category.id}-light hover:border-need-${category.id} hover:shadow-sm`,
                { 'opacity-50 cursor-not-allowed': isAtLimit && !selectedIds.has(need.id) }
              ]"
              :disabled="isAtLimit && !selectedIds.has(need.id)"
              :title="need.description"
            >
              {{ need.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtered/Search view (flat) -->
    <div v-else>
      <!-- Category description when filtered -->
      <div v-if="activeCategory" class="mb-4 p-3 rounded-lg" :class="`bg-need-${activeCategory}-light`">
        <p class="text-sm" :class="`text-need-${activeCategory}-dark`">
          {{ needsData.categories.find(c => c.id === activeCategory)?.description }}
        </p>
      </div>

      <!-- Needs as pills -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="need in filteredNeeds"
          :key="need.id"
          @click="selectNeed(need)"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all border-2"
          :class="[
            selectedIds.has(need.id)
              ? `bg-need-${need.category} text-white border-need-${need.category} shadow-md scale-105`
              : `bg-need-${need.category}-light text-need-${need.category}-dark border-need-${need.category}-light hover:border-need-${need.category} hover:shadow-sm`,
            { 'opacity-50 cursor-not-allowed': isAtLimit && !selectedIds.has(need.id) }
          ]"
          :disabled="isAtLimit && !selectedIds.has(need.id)"
          :title="need.description"
        >
          {{ need.label }}
        </button>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="filteredNeeds.length === 0 && !searchQuery" class="text-center py-8">
      <p class="text-slate-500">No needs in this category</p>
    </div>

    <div v-if="filteredNeeds.length === 0 && searchQuery" class="text-center py-8">
      <p class="text-slate-500">No needs match "{{ searchQuery }}"</p>
      <button
        @click="clearSearch"
        class="mt-2 text-brand-600 hover:text-brand-700 text-sm underline"
      >
        Clear search
      </button>
    </div>
  </div>
</template>
