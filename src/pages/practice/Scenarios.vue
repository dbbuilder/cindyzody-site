<template>
  <section class="py-10 bg-gradient-to-b from-sage-50/50 to-white min-h-screen">
    <div class="mx-auto max-w-5xl px-4">
      <!-- Warm Header -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <BookOpenIcon class="w-4 h-4" />
          Practice Makes Progress
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
          Real-Life Scenarios to Practice With
        </h1>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Sometimes it helps to practice with a situation that isn't your own.
          Browse these common scenarios and work through the GOFNR process at your own pace.
        </p>
      </div>

      <!-- Category Pills - Softer Style -->
      <div class="flex flex-wrap gap-2 justify-center mb-10">
        <button
          @click="selectedCategory = 'all'"
          class="px-5 py-2.5 rounded-full text-sm font-medium transition-all"
          :class="selectedCategory === 'all'
            ? 'bg-brand-600 text-white shadow-md'
            : 'bg-white text-slate-600 hover:bg-brand-50 border border-slate-200'"
        >
          All Stories
        </button>
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="selectedCategory = cat.id"
          class="px-5 py-2.5 rounded-full text-sm font-medium transition-all inline-flex items-center gap-2"
          :class="selectedCategory === cat.id
            ? `${cat.activeBg} text-white shadow-md`
            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'"
        >
          <component :is="cat.icon" class="w-4 h-4" />
          {{ cat.label }}
        </button>
      </div>

      <!-- Scenarios as Friendly Cards -->
      <div class="space-y-6">
        <div
          v-for="scenario in filteredScenarios"
          :key="scenario.id"
          class="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-brand-300 hover:shadow-lg transition-all duration-300"
        >
          <div class="p-6 md:p-8">
            <div class="flex flex-wrap items-start justify-between gap-3 mb-4">
              <!-- Category & Difficulty -->
              <div class="flex items-center gap-2">
                <span
                  class="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full"
                  :class="getCategoryStyle(scenario.category)"
                >
                  <component :is="getCategoryIcon(scenario.category)" class="w-3.5 h-3.5" />
                  {{ getCategoryLabel(scenario.category) }}
                </span>
                <span
                  v-if="scenario.difficulty === 'beginner'"
                  class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                >
                  Great for beginners
                </span>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-slate-800 mb-2">{{ scenario.title }}</h3>
            <p class="text-slate-600 mb-5 leading-relaxed">{{ scenario.description }}</p>

            <!-- What you might explore -->
            <div class="bg-slate-50 rounded-xl p-4 mb-5">
              <p class="text-sm font-medium text-slate-700 mb-2">In this scenario, you might explore:</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="feeling in scenario.suggestedFeelings?.slice(0, 4)"
                  :key="feeling"
                  class="text-sm bg-white border border-indigo-200 text-indigo-700 px-3 py-1 rounded-full"
                >
                  {{ feeling }}
                </span>
                <span
                  v-for="need in scenario.suggestedNeeds?.slice(0, 3)"
                  :key="need"
                  class="text-sm bg-white border border-teal-200 text-teal-700 px-3 py-1 rounded-full"
                >
                  {{ need }}
                </span>
              </div>
            </div>

            <button
              @click="startWithScenario(scenario)"
              class="inline-flex items-center bg-brand-600 text-white px-6 py-3 rounded-xl hover:bg-brand-700 transition-colors font-medium"
            >
              Practice with This Scenario
              <ArrowRightIcon class="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="filteredScenarios.length === 0" class="text-center py-16 bg-white rounded-2xl border">
        <HeartIcon class="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <p class="text-slate-500 text-lg">No scenarios in this category yet.</p>
        <button @click="selectedCategory = 'all'" class="mt-4 text-brand-600 hover:underline">
          View all scenarios
        </button>
      </div>

      <!-- Warm CTA -->
      <div class="mt-16 bg-gradient-to-br from-brand-50 via-sage-50 to-earth-50 rounded-2xl p-8 md:p-10 text-center border border-brand-100">
        <div class="max-w-xl mx-auto">
          <h2 class="text-2xl font-semibold text-slate-800 mb-3">Ready to Work on Your Own Situation?</h2>
          <p class="text-slate-600 mb-6 leading-relaxed">
            These examples are great for practice, but the real magic happens when you apply
            GOFNR to your own life. There's no wrong way to start—just begin where you are.
          </p>
          <RouterLink
            to="/practice"
            class="inline-flex items-center bg-brand-600 text-white px-8 py-3.5 rounded-xl hover:bg-brand-700 transition-colors font-medium shadow-sm"
          >
            Start Your Own GOFNR Journey
            <ArrowRightIcon class="w-5 h-5 ml-2" />
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowRightIcon,
  BookOpenIcon,
  HeartIcon,
  SparklesIcon,
  BriefcaseIcon,
  HomeIcon,
  UsersIcon
} from '@heroicons/vue/24/outline'
import scenariosData from '../../data/scenarios.json'

const router = useRouter()
const scenarios = ref(scenariosData.scenarios)
const selectedCategory = ref('all')

const categories = [
  { id: 'self', label: 'Self-Compassion', icon: SparklesIcon, activeBg: 'bg-amber-500' },
  { id: 'workplace', label: 'Workplace', icon: BriefcaseIcon, activeBg: 'bg-blue-600' },
  { id: 'family', label: 'Family', icon: HomeIcon, activeBg: 'bg-emerald-600' },
  { id: 'romantic', label: 'Relationships', icon: HeartIcon, activeBg: 'bg-rose-500' },
  { id: 'friendship', label: 'Friendships', icon: UsersIcon, activeBg: 'bg-violet-600' }
]

const filteredScenarios = computed(() => {
  if (selectedCategory.value === 'all') {
    return scenarios.value
  }
  return scenarios.value.filter(s => s.category === selectedCategory.value)
})

function getCategoryLabel(category) {
  const cat = categories.find(c => c.id === category)
  return cat?.label || category
}

function getCategoryIcon(category) {
  const cat = categories.find(c => c.id === category)
  return cat?.icon || SparklesIcon
}

function getCategoryStyle(category) {
  const styles = {
    self: 'bg-amber-100 text-amber-700',
    workplace: 'bg-blue-100 text-blue-700',
    family: 'bg-emerald-100 text-emerald-700',
    romantic: 'bg-rose-100 text-rose-700',
    friendship: 'bg-violet-100 text-violet-700'
  }
  return styles[category] || 'bg-slate-100 text-slate-700'
}

function startWithScenario(scenario) {
  // Navigate to practice with the scenario pre-filled
  router.push({
    path: '/practice',
    query: { scenario: scenario.id }
  })
}
</script>
