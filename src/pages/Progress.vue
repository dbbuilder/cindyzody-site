<template>
  <section class="py-14">
    <div class="mx-auto max-w-4xl px-4">
      <!-- Header -->
      <div class="mb-8">
        <RouterLink
          to="/practice"
          class="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-4"
        >
          <ArrowLeftIcon class="w-4 h-4 mr-1" />
          Back to Practice
        </RouterLink>
        <h1 class="text-3xl font-bold">Your Progress</h1>
        <p class="text-slate-600 mt-2">Track your growth and discover patterns in your practice.</p>
      </div>

      <!-- Auth prompt for guests -->
      <div v-if="!isAuthenticated" class="bg-brand-50 rounded-xl p-6 mb-8 border border-brand-100">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
            <UserIcon class="w-5 h-5 text-brand-600" />
          </div>
          <div>
            <h3 class="font-semibold text-brand-900">Sign in to track your progress</h3>
            <p class="text-sm text-brand-700 mt-1">
              Create an account to save your progress across devices and unlock personalized insights.
            </p>
            <button
              @click="signIn"
              class="mt-4 inline-flex items-center px-4 py-2 bg-brand-600 text-white text-sm rounded-lg hover:bg-brand-700 transition-colors"
            >
              Sign In
              <ArrowRightIcon class="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="isLoading" class="space-y-6">
        <div class="grid sm:grid-cols-3 gap-4">
          <div v-for="n in 3" :key="n" class="bg-white rounded-xl border p-6 animate-pulse">
            <div class="h-4 bg-slate-200 rounded w-20 mb-2"></div>
            <div class="h-8 bg-slate-200 rounded w-16"></div>
          </div>
        </div>
      </div>

      <template v-else>
        <!-- Stats Overview -->
        <div class="grid sm:grid-cols-3 gap-4 mb-8">
          <div class="bg-white rounded-xl border p-6">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <FireIcon class="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p class="text-sm text-slate-500">Current Streak</p>
                <p class="text-2xl font-bold">{{ progress?.currentStreak || 0 }} <span class="text-sm font-normal text-slate-500">days</span></p>
              </div>
            </div>
            <p class="text-xs text-slate-500">Longest: {{ progress?.longestStreak || 0 }} days</p>
          </div>

          <div class="bg-white rounded-xl border p-6">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                <SparklesIcon class="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <p class="text-sm text-slate-500">Total Sessions</p>
                <p class="text-2xl font-bold">{{ progress?.totalSessions || 0 }}</p>
              </div>
            </div>
            <p class="text-xs text-slate-500">AI practice sessions completed</p>
          </div>

          <div class="bg-white rounded-xl border p-6">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <HeartIcon class="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p class="text-sm text-slate-500">Check-ins</p>
                <p class="text-2xl font-bold">{{ progress?.totalCheckIns || 0 }}</p>
              </div>
            </div>
            <p class="text-xs text-slate-500">Daily emotional check-ins</p>
          </div>
        </div>

        <!-- Daily Check-in Card -->
        <div class="bg-gradient-to-br from-brand-50 to-sage-50 rounded-xl border p-6 mb-8">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-xl font-semibold">Daily Check-in</h2>
              <p class="text-sm text-slate-600">How are you feeling today?</p>
            </div>
            <div v-if="hasCheckedInToday" class="flex items-center gap-2 text-green-600">
              <CheckCircleIcon class="w-5 h-5" />
              <span class="text-sm font-medium">Done today</span>
            </div>
          </div>

          <DailyCheckIn v-if="!hasCheckedInToday" @complete="handleCheckInComplete" />

          <div v-else class="text-center py-4">
            <p class="text-slate-600 mb-2">{{ streakInfo.message }}</p>
            <RouterLink to="/practice" class="text-brand-600 hover:text-brand-700 text-sm font-medium">
              Continue to practice →
            </RouterLink>
          </div>
        </div>

        <!-- Insights Section -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4">Your Insights</h2>

          <div v-if="insights.length === 0" class="bg-white rounded-xl border p-8 text-center">
            <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LightBulbIcon class="w-6 h-6 text-slate-400" />
            </div>
            <p class="text-slate-600 mb-2">No insights yet</p>
            <p class="text-sm text-slate-500">Complete a few sessions to see personalized insights about your practice patterns.</p>
          </div>

          <div v-else class="grid sm:grid-cols-2 gap-4">
            <!-- Top Feelings -->
            <div v-if="topFeelingsInsight" class="bg-white rounded-xl border p-6">
              <div class="flex items-center gap-2 mb-4">
                <HeartIcon class="w-5 h-5 text-rose-500" />
                <h3 class="font-semibold">{{ topFeelingsInsight.title }}</h3>
              </div>
              <div class="space-y-2">
                <div
                  v-for="feeling in topFeelingsInsight.data"
                  :key="feeling.id"
                  class="flex items-center gap-3"
                >
                  <div class="flex-1">
                    <div class="flex justify-between text-sm mb-1">
                      <span>{{ getFeelingLabel(feeling.id) }}</span>
                      <span class="text-slate-500">{{ feeling.count }}x</span>
                    </div>
                    <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-rose-400 rounded-full"
                        :style="{ width: `${(feeling.count / topFeelingsInsight.data[0].count) * 100}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Top Needs -->
            <div v-if="topNeedsInsight" class="bg-white rounded-xl border p-6">
              <div class="flex items-center gap-2 mb-4">
                <StarIcon class="w-5 h-5 text-brand-500" />
                <h3 class="font-semibold">{{ topNeedsInsight.title }}</h3>
              </div>
              <div class="space-y-2">
                <div
                  v-for="need in topNeedsInsight.data"
                  :key="need.id"
                  class="flex items-center gap-3"
                >
                  <div class="flex-1">
                    <div class="flex justify-between text-sm mb-1">
                      <span>{{ getNeedLabel(need.id) }}</span>
                      <span class="text-slate-500">{{ need.count }}x</span>
                    </div>
                    <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-brand-400 rounded-full"
                        :style="{ width: `${(need.count / topNeedsInsight.data[0].count) * 100}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Streak Achievement -->
            <div v-if="streakInsight" class="bg-white rounded-xl border p-6">
              <div class="flex items-center gap-2 mb-4">
                <FireIcon class="w-5 h-5 text-amber-500" />
                <h3 class="font-semibold">{{ streakInsight.title }}</h3>
              </div>
              <p class="text-slate-600">{{ streakInsight.message }}</p>
            </div>

            <!-- Milestone -->
            <div v-if="milestoneInsight" class="bg-white rounded-xl border p-6">
              <div class="flex items-center gap-2 mb-4">
                <TrophyIcon class="w-5 h-5 text-yellow-500" />
                <h3 class="font-semibold">{{ milestoneInsight.title }}</h3>
              </div>
              <p class="text-slate-600">{{ milestoneInsight.message }}</p>
            </div>
          </div>
        </div>

        <!-- Check-in History -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">Recent Check-ins</h2>
            <button
              v-if="checkIns.length > 0"
              @click="showAllCheckIns = !showAllCheckIns"
              class="text-sm text-brand-600 hover:text-brand-700"
            >
              {{ showAllCheckIns ? 'Show Less' : 'Show All' }}
            </button>
          </div>

          <div v-if="checkIns.length === 0" class="bg-white rounded-xl border p-8 text-center">
            <p class="text-slate-600">No check-ins yet. Start tracking your daily feelings above!</p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="(checkIn, idx) in displayedCheckIns"
              :key="checkIn.id || idx"
              class="bg-white rounded-xl border p-4"
            >
              <div class="flex items-start justify-between mb-2">
                <span class="text-sm text-slate-500">{{ formatCheckInDate(checkIn.date) }}</span>
                <div v-if="checkIn.energy_level" class="flex items-center gap-1">
                  <span class="text-xs text-slate-400">Energy:</span>
                  <div class="flex">
                    <span
                      v-for="n in 5"
                      :key="n"
                      class="w-2 h-2 rounded-full mx-0.5"
                      :class="n <= checkIn.energy_level ? 'bg-amber-400' : 'bg-slate-200'"
                    ></span>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="feeling in checkIn.feelings"
                  :key="feeling"
                  class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-rose-100 text-rose-700"
                >
                  {{ getFeelingLabel(feeling) }}
                </span>
              </div>
              <p v-if="checkIn.notes" class="text-sm text-slate-600 mt-2">{{ checkIn.notes }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FireIcon,
  SparklesIcon,
  HeartIcon,
  StarIcon,
  CheckCircleIcon,
  LightBulbIcon,
  TrophyIcon,
  UserIcon
} from '@heroicons/vue/24/outline'
import { useProgress } from '../composables/useProgress'
import { useAuth } from '../composables/useAuth'
import DailyCheckIn from '../components/DailyCheckIn.vue'

import feelingsData from '../data/feelings.json'
import needsData from '../data/needs.json'

const { isAuthenticated, signIn } = useAuth()
const {
  progress,
  checkIns,
  insights,
  isLoading,
  hasCheckedInToday,
  streakInfo,
  loadProgress,
  loadCheckIns,
  loadInsights
} = useProgress()

const showAllCheckIns = ref(false)

onMounted(async () => {
  try {
    await Promise.all([
      loadProgress(),
      loadCheckIns(),
      loadInsights()
    ])
  } catch (err) {
    console.error('Failed to load progress data:', err)
  }
})

const displayedCheckIns = computed(() => {
  if (showAllCheckIns.value) return checkIns.value
  return checkIns.value.slice(0, 5)
})

const topFeelingsInsight = computed(() => {
  return insights.value.find(i => i.type === 'top_feelings')
})

const topNeedsInsight = computed(() => {
  return insights.value.find(i => i.type === 'top_needs')
})

const streakInsight = computed(() => {
  return insights.value.find(i => i.type === 'streak')
})

const milestoneInsight = computed(() => {
  return insights.value.find(i => i.type === 'milestone')
})

function getFeelingLabel(id) {
  const feeling = feelingsData.feelings.find(f => f.id === id)
  return feeling?.label || id
}

function getNeedLabel(id) {
  const need = needsData.needs.find(n => n.id === id)
  return need?.label || id
}

function formatCheckInDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (dateStr === today.toISOString().split('T')[0]) {
    return 'Today'
  } else if (dateStr === yesterday.toISOString().split('T')[0]) {
    return 'Yesterday'
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }
}

async function handleCheckInComplete() {
  await loadProgress()
  await loadCheckIns()
  await loadInsights()
}
</script>
