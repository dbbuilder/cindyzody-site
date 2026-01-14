<template>
  <section class="py-14">
    <div class="mx-auto max-w-6xl px-4">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">Feelings & Needs Practice</h1>
        <p class="text-lg text-slate-600 max-w-3xl mx-auto">
          Explore your feelings and connect them to your underlying needs.
          Practice Nonviolent Communication with our interactive tools and AI facilitator.
        </p>
      </div>

      <!-- Tab Navigation -->
      <div class="flex justify-center mb-8">
        <div class="inline-flex bg-slate-100 rounded-lg p-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-6 py-2.5 rounded-md font-medium text-sm transition-all"
            :class="activeTab === tab.id
              ? 'bg-white shadow text-slate-900'
              : 'text-slate-600 hover:text-slate-900'"
          >
            <component :is="tab.icon" class="w-4 h-4 inline-block mr-2 -mt-0.5" />
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Feelings Explorer Tab -->
      <div v-if="activeTab === 'feelings'" class="animate-fade-in">
        <div class="bg-white rounded-2xl border shadow-sm p-6 mb-8">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-bold">Explore Feelings</h2>
              <p class="text-slate-600 mt-1">
                Select feelings that resonate with your current experience
              </p>
            </div>
            <button
              v-if="selectedFeelings.length > 0"
              @click="proceedToNeeds"
              class="inline-flex items-center bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors font-medium"
            >
              Continue to Needs
              <ArrowRightIcon class="w-4 h-4 ml-2" />
            </button>
          </div>

          <EmotionWheel
            v-model="selectedFeelings"
            :maxSelections="5"
          />
        </div>

        <!-- Selected feelings summary -->
        <div v-if="selectedFeelings.length > 0" class="bg-feeling-met-light/50 rounded-xl p-6 border border-feeling-met/20">
          <h3 class="font-semibold mb-3">Your selected feelings</h3>
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="feeling in selectedFeelings"
              :key="feeling.id"
              class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
              :class="feeling.category === 'needs_met'
                ? 'bg-feeling-met text-white'
                : 'bg-feeling-unmet text-white'"
            >
              {{ feeling.label }}
            </span>
          </div>
          <p class="text-sm text-slate-600">
            These feelings might be pointing to needs for:
            <strong>{{ suggestedNeeds.join(', ') }}</strong>
          </p>
        </div>
      </div>

      <!-- Needs Explorer Tab -->
      <div v-if="activeTab === 'needs'" class="animate-fade-in">
        <div class="bg-white rounded-2xl border shadow-sm p-6 mb-8">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-bold">Explore Needs</h2>
              <p class="text-slate-600 mt-1">
                Identify the universal human needs underneath your feelings
              </p>
            </div>
            <button
              v-if="selectedNeeds.length > 0"
              @click="activeTab = 'practice'"
              class="inline-flex items-center bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors font-medium"
            >
              Practice with AI
              <ArrowRightIcon class="w-4 h-4 ml-2" />
            </button>
          </div>

          <NeedsWheel
            v-model="selectedNeeds"
            :maxSelections="5"
          />
        </div>

        <!-- Selected needs summary -->
        <div v-if="selectedNeeds.length > 0" class="bg-brand-50 rounded-xl p-6 border border-brand-200">
          <h3 class="font-semibold mb-3">Your identified needs</h3>
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="need in selectedNeeds"
              :key="need.id"
              class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-brand-600 text-white"
            >
              {{ need.label }}
            </span>
          </div>
          <p class="text-sm text-slate-600">
            Consider: How might you meet these needs? What requests could you make?
          </p>
        </div>
      </div>

      <!-- AI Practice Tab -->
      <div v-if="activeTab === 'practice'" class="animate-fade-in">
        <!-- Context from selections -->
        <div v-if="selectedFeelings.length > 0 || selectedNeeds.length > 0" class="bg-slate-50 rounded-xl p-4 mb-6 border">
          <p class="text-sm text-slate-600 mb-2">Your current exploration:</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="feeling in selectedFeelings"
              :key="'f-' + feeling.id"
              class="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
              :class="feeling.category === 'needs_met'
                ? 'bg-feeling-met-light text-feeling-met-dark'
                : 'bg-feeling-unmet-light text-feeling-unmet-dark'"
            >
              {{ feeling.label }}
            </span>
            <span v-if="selectedFeelings.length > 0 && selectedNeeds.length > 0" class="text-slate-400">→</span>
            <span
              v-for="need in selectedNeeds"
              :key="'n-' + need.id"
              class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-brand-100 text-brand-700"
            >
              {{ need.label }}
            </span>
          </div>
        </div>

        <!-- NVC AI Tool Card -->
        <div class="bg-gradient-to-br from-brand-50 to-sage-50 rounded-2xl p-8 mb-8 border">
          <div class="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div class="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <BoltIcon class="w-4 h-4" />
                AI-Powered
              </div>
              <h2 class="text-3xl font-bold mb-4">NVC AI Facilitator</h2>
              <p class="text-slate-700 mb-6">
                An intelligent conversation partner that guides you through the four steps of NVC:
                observation, feelings, needs, and requests. Perfect for practicing difficult conversations
                before they happen or processing conflicts after they occur.
              </p>

              <div class="space-y-3 mb-6">
                <div class="flex items-center gap-3">
                  <CheckCircleIcon class="w-5 h-5 text-brand-500" />
                  <span class="text-sm">Step-by-step NVC guidance</span>
                </div>
                <div class="flex items-center gap-3">
                  <CheckCircleIcon class="w-5 h-5 text-brand-500" />
                  <span class="text-sm">Real-time empathy and feedback</span>
                </div>
                <div class="flex items-center gap-3">
                  <CheckCircleIcon class="w-5 h-5 text-brand-500" />
                  <span class="text-sm">Practice conversations safely</span>
                </div>
                <div class="flex items-center gap-3">
                  <CheckCircleIcon class="w-5 h-5 text-brand-500" />
                  <span class="text-sm">Available 24/7 for practice</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-4">
                <button
                  v-if="!sessionActive"
                  @click="startSession"
                  :disabled="ai.isLoading.value"
                  class="inline-flex items-center bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors font-medium disabled:opacity-50"
                >
                  <template v-if="ai.isLoading.value">
                    Starting...
                  </template>
                  <template v-else>
                    Start Practice Session
                    <SparklesIcon class="w-4 h-4 ml-2" />
                  </template>
                </button>
                <button
                  v-else
                  @click="endSession"
                  class="inline-flex items-center bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors font-medium"
                >
                  End Session
                </button>
              </div>
            </div>

            <div class="relative">
              <div class="bg-white rounded-xl shadow-lg p-6 border">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center">
                    <SparklesIcon class="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 class="font-semibold">AI Facilitator</h3>
                    <p class="text-xs text-slate-500">Online now</p>
                  </div>
                </div>
                <div class="space-y-3 text-sm">
                  <div class="bg-slate-50 rounded-lg p-3">
                    <p class="text-slate-700">Hello! I'm here to help you practice NVC. What situation would you like to work through today?</p>
                  </div>
                  <div class="bg-brand-50 rounded-lg p-3 ml-8">
                    <p class="text-slate-700">I had a conflict with my colleague about a project deadline...</p>
                  </div>
                  <div class="bg-slate-50 rounded-lg p-3">
                    <p class="text-slate-700">Let's start with observation. Can you describe what specifically happened without evaluation or judgment?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Active Chat Session -->
        <div v-if="sessionActive" class="mb-8 transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-medium text-slate-600">Session Active</span>
              <span v-if="useMock" class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Demo Mode</span>
            </div>
            <button
              @click="endSession"
              class="text-sm text-slate-500 hover:text-slate-700"
            >
              End Session
            </button>
          </div>
          <div class="h-[500px]">
            <ChatInterface
              ref="chatRef"
              :aiService="ai"
              :initialContext="{ feelings: selectedFeelings, needs: selectedNeeds }"
              placeholder="Share what's on your mind..."
              @suggest-feeling="handleFeelingSuggestion"
              @suggest-need="handleNeedSuggestion"
              @reset="endSession"
            />
          </div>
        </div>

        </div>

      <!-- How It Works Section -->
      <div class="mt-12 mb-12">
        <h2 class="text-2xl font-semibold text-center mb-8">The OFNR Process</h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <EyeIcon class="w-6 h-6 text-blue-600" />
            </div>
            <h3 class="font-semibold mb-2">Observation</h3>
            <p class="text-sm text-slate-600">Describe what happened without judgment or evaluation.</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon class="w-6 h-6 text-rose-600" />
            </div>
            <h3 class="font-semibold mb-2">Feelings</h3>
            <p class="text-sm text-slate-600">Identify what you're feeling in response to the observation.</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <StarIcon class="w-6 h-6 text-purple-600" />
            </div>
            <h3 class="font-semibold mb-2">Needs</h3>
            <p class="text-sm text-slate-600">Connect your feelings to the underlying universal needs.</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChatBubbleLeftRightIcon class="w-6 h-6 text-brand-600" />
            </div>
            <h3 class="font-semibold mb-2">Request</h3>
            <p class="text-sm text-slate-600">Make a clear, specific request to meet those needs.</p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-slate-50 rounded-xl p-8 text-center">
        <h3 class="font-semibold text-lg mb-3">Ready to Go Deeper?</h3>
        <p class="text-slate-600 max-w-2xl mx-auto mb-6">
          Combine self-guided practice with personalized coaching for accelerated learning.
          The tools here help you practice between sessions, while Cindy provides deeper insights and support.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <button
            @click="startSession(); activeTab = 'practice'"
            class="inline-flex items-center bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors font-medium"
          >
            Try AI Practice Now
            <SparklesIcon class="w-4 h-4 ml-2" />
          </button>
          <RouterLink
            to="/contact"
            class="inline-flex items-center border border-slate-300 px-6 py-3 rounded-lg hover:bg-white transition-colors"
          >
            Schedule Human Coaching
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  HeartIcon,
  StarIcon,
  BoltIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  SparklesIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'
import { EmotionWheel, NeedsWheel, ChatInterface } from '../components/lib'
import { useAI, useMockAI } from '../composables/useAI'
import { trackEvent } from '../utils/analytics'

// AI service - use mock in development if no API configured
const useMock = import.meta.env.DEV && !import.meta.env.VITE_API_URL
const ai = useMock ? useMockAI() : useAI()

// Tab state
const tabs = [
  { id: 'feelings', label: 'Feelings', icon: HeartIcon },
  { id: 'needs', label: 'Needs', icon: StarIcon },
  { id: 'practice', label: 'AI Practice', icon: SparklesIcon }
]
const activeTab = ref('feelings')

// Selection state
const selectedFeelings = ref([])
const selectedNeeds = ref([])

// AI session state
const sessionActive = ref(false)
const chatRef = ref(null)

// Compute suggested needs from selected feelings
const suggestedNeeds = computed(() => {
  const needsSet = new Set()
  selectedFeelings.value.forEach(feeling => {
    feeling.relatedNeeds?.forEach(need => needsSet.add(need))
  })
  return Array.from(needsSet).slice(0, 5)
})

// Navigate to needs tab
function proceedToNeeds() {
  activeTab.value = 'needs'
}

// Start AI practice session
async function startSession() {
  trackEvent('nvc_session_start', {
    source: 'practice_page',
    feelings_selected: selectedFeelings.value.length,
    needs_selected: selectedNeeds.value.length,
    mode: useMock ? 'mock' : 'live'
  })

  try {
    await ai.createSession({
      type: 'self-empathy',
      feelings: selectedFeelings.value,
      needs: selectedNeeds.value
    })
    sessionActive.value = true
  } catch (err) {
    console.error('Failed to start session:', err)
  }
}

// End current session
function endSession() {
  ai.resetSession()
  sessionActive.value = false
}

// Handle feeling suggestion from AI
function handleFeelingSuggestion(feeling) {
  const feelingData = { id: feeling, label: feeling, category: 'needs_unmet' }
  if (!selectedFeelings.value.find(f => f.label.toLowerCase() === feeling.toLowerCase())) {
    selectedFeelings.value.push(feelingData)
  }
}

// Handle need suggestion from AI
function handleNeedSuggestion(need) {
  const needData = { id: need, label: need, category: 'connection' }
  if (!selectedNeeds.value.find(n => n.label.toLowerCase() === need.toLowerCase())) {
    selectedNeeds.value.push(needData)
  }
}
</script>
