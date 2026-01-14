<template>
  <section class="py-14">
    <div class="mx-auto max-w-6xl px-4">
      <!-- Hero Section -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-4">Feelings & Needs Practice</h1>
        <p class="text-lg text-slate-600 max-w-3xl mx-auto">
          Explore your feelings and connect them to your underlying needs.
          Practice Nonviolent Communication with our interactive tools and AI facilitator.
        </p>
      </div>

      <!-- Quick Links -->
      <div class="flex flex-wrap justify-center gap-4 mb-8">
        <RouterLink
          to="/progress"
          class="inline-flex items-center px-4 py-2 bg-brand-50 text-brand-700 rounded-lg hover:bg-brand-100 transition-colors text-sm font-medium"
        >
          <ChartBarIcon class="w-4 h-4 mr-2" />
          Your Progress
        </RouterLink>
        <RouterLink
          to="/history"
          class="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
        >
          <ClockIcon class="w-4 h-4 mr-2" />
          Session History
        </RouterLink>
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

      <!-- Scenarios Tab - Netflix-style -->
      <div v-if="activeTab === 'scenarios'" class="animate-fade-in -mx-4 sm:-mx-6 lg:-mx-8">
        <!-- Hero Featured Scenario -->
        <div v-if="featuredScenario" class="relative mb-12">
          <div class="relative h-80 sm:h-96 overflow-hidden">
            <!-- Gradient background - serene teal/emerald -->
            <div class="absolute inset-0 bg-gradient-to-br from-teal-600 via-emerald-700 to-cyan-800"></div>

            <!-- Decorative circles -->
            <div class="absolute inset-0 overflow-hidden">
              <div class="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-white/10"></div>
              <div class="absolute bottom-10 left-10 w-64 h-64 rounded-full border border-white/5"></div>
              <div class="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-white/5"></div>
            </div>

            <!-- Content -->
            <div class="relative h-full flex items-center px-6 sm:px-12 lg:px-16">
              <div class="max-w-2xl">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white mb-4">
                  <SparklesIcon class="w-3.5 h-3.5 mr-1.5" />
                  Featured Practice
                </span>
                <h2 class="text-3xl sm:text-4xl font-bold text-white mb-3">
                  {{ featuredScenario.title }}
                </h2>
                <p class="text-lg text-white/80 mb-6 line-clamp-2">
                  {{ featuredScenario.description }}
                </p>
                <div class="flex items-center gap-4">
                  <button
                    @click="startScenarioSession(featuredScenario)"
                    class="inline-flex items-center px-6 py-3 bg-white text-slate-900 rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-lg"
                  >
                    <PlayIcon class="w-5 h-5 mr-2" />
                    Start Practice
                  </button>
                  <button
                    @click="selectScenario(featuredScenario)"
                    class="inline-flex items-center px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm"
                  >
                    <InformationCircleIcon class="w-5 h-5 mr-2" />
                    More Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Category Carousels -->
        <div class="space-y-10 px-4 sm:px-6 lg:px-8 pb-8">
          <!-- Self-Compassion Row -->
          <div v-if="selfScenarios.length > 0">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-slate-900 flex items-center">
                <SparklesIcon class="w-5 h-5 mr-2 text-amber-500" />
                Self-Compassion
              </h3>
              <span class="text-sm text-slate-500">{{ selfScenarios.length }} scenarios</span>
            </div>
            <div class="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              <ScenarioCard
                v-for="scenario in selfScenarios"
                :key="scenario.id"
                :scenario="scenario"
                :selected="selectedScenario?.id === scenario.id"
                @select="selectScenario"
                @start="startScenarioSession"
              />
            </div>
          </div>

          <!-- Workplace Row -->
          <div v-if="workplaceScenarios.length > 0">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-slate-900 flex items-center">
                <BriefcaseIcon class="w-5 h-5 mr-2 text-blue-600" />
                Workplace & Career
              </h3>
              <span class="text-sm text-slate-500">{{ workplaceScenarios.length }} scenarios</span>
            </div>
            <div class="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              <ScenarioCard
                v-for="scenario in workplaceScenarios"
                :key="scenario.id"
                :scenario="scenario"
                :selected="selectedScenario?.id === scenario.id"
                @select="selectScenario"
                @start="startScenarioSession"
              />
            </div>
          </div>

          <!-- Family Row -->
          <div v-if="familyScenarios.length > 0">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-slate-900 flex items-center">
                <HomeIcon class="w-5 h-5 mr-2 text-emerald-500" />
                Family Dynamics
              </h3>
              <span class="text-sm text-slate-500">{{ familyScenarios.length }} scenarios</span>
            </div>
            <div class="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              <ScenarioCard
                v-for="scenario in familyScenarios"
                :key="scenario.id"
                :scenario="scenario"
                :selected="selectedScenario?.id === scenario.id"
                @select="selectScenario"
                @start="startScenarioSession"
              />
            </div>
          </div>

          <!-- Romantic Row -->
          <div v-if="romanticScenarios.length > 0">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-slate-900 flex items-center">
                <HeartIcon class="w-5 h-5 mr-2 text-violet-500" />
                Romantic Relationships
              </h3>
              <span class="text-sm text-slate-500">{{ romanticScenarios.length }} scenarios</span>
            </div>
            <div class="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              <ScenarioCard
                v-for="scenario in romanticScenarios"
                :key="scenario.id"
                :scenario="scenario"
                :selected="selectedScenario?.id === scenario.id"
                @select="selectScenario"
                @start="startScenarioSession"
              />
            </div>
          </div>

          <!-- Friendship Row -->
          <div v-if="friendshipScenarios.length > 0">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-slate-900 flex items-center">
                <UsersIcon class="w-5 h-5 mr-2 text-purple-500" />
                Friendships & Social
              </h3>
              <span class="text-sm text-slate-500">{{ friendshipScenarios.length }} scenarios</span>
            </div>
            <div class="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              <ScenarioCard
                v-for="scenario in friendshipScenarios"
                :key="scenario.id"
                :scenario="scenario"
                :selected="selectedScenario?.id === scenario.id"
                @select="selectScenario"
                @start="startScenarioSession"
              />
            </div>
          </div>

          <!-- Beginner Picks -->
          <div v-if="beginnerScenarios.length > 0" class="pt-6 border-t border-slate-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-slate-900 flex items-center">
                <AcademicCapIcon class="w-5 h-5 mr-2 text-green-600" />
                Great for Beginners
              </h3>
              <span class="text-sm text-slate-500">{{ beginnerScenarios.length }} scenarios</span>
            </div>
            <div class="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              <ScenarioCard
                v-for="scenario in beginnerScenarios"
                :key="scenario.id"
                :scenario="scenario"
                :selected="selectedScenario?.id === scenario.id"
                @select="selectScenario"
                @start="startScenarioSession"
              />
            </div>
          </div>
        </div>

        <!-- Selected Scenario Modal -->
        <div
          v-if="selectedScenario && showScenarioDetail"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          @click.self="showScenarioDetail = false"
        >
          <div class="relative bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <!-- Header with gradient -->
            <div class="relative h-48 rounded-t-2xl overflow-hidden" :class="getScenarioGradient(selectedScenario.category)">
              <div class="absolute inset-0 flex items-end p-6">
                <div>
                  <span class="text-xs font-semibold uppercase tracking-wide text-white/80">
                    {{ getCategoryLabel(selectedScenario.category) }}
                  </span>
                  <h3 class="text-2xl font-bold text-white mt-1">{{ selectedScenario.title }}</h3>
                </div>
              </div>
              <button
                @click="showScenarioDetail = false"
                class="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
              >
                <XMarkIcon class="w-5 h-5 text-white" />
              </button>
            </div>

            <!-- Content -->
            <div class="p-6 space-y-5">
              <p class="text-slate-600">{{ selectedScenario.description }}</p>

              <div v-if="selectedScenario.context">
                <h4 class="font-semibold text-slate-900 mb-2">Context</h4>
                <p class="text-sm text-slate-600">{{ selectedScenario.context }}</p>
              </div>

              <div v-if="selectedScenario.practiceGoals?.length">
                <h4 class="font-semibold text-slate-900 mb-2">Practice Goals</h4>
                <ul class="space-y-2">
                  <li v-for="(goal, idx) in selectedScenario.practiceGoals" :key="idx" class="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircleIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {{ goal }}
                  </li>
                </ul>
              </div>

              <div class="flex flex-wrap gap-2">
                <span v-for="feeling in selectedScenario.suggestedFeelings" :key="feeling" class="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                  {{ feeling }}
                </span>
                <span v-for="need in selectedScenario.suggestedNeeds" :key="need" class="px-2.5 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-700">
                  {{ need }}
                </span>
              </div>

              <button
                @click="startScenarioSession(selectedScenario); showScenarioDetail = false"
                class="w-full inline-flex items-center justify-center px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-colors"
              >
                <PlayIcon class="w-5 h-5 mr-2" />
                Start Practice Session
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- AI Practice Tab -->
      <div v-if="activeTab === 'practice'" class="animate-fade-in">
        <!-- Scenario context -->
        <div v-if="selectedScenario" class="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-blue-700 mb-1">Practicing Scenario</p>
              <h3 class="font-semibold text-blue-900">{{ selectedScenario.title }}</h3>
              <p class="text-sm text-blue-700 mt-1">{{ selectedScenario.description }}</p>
            </div>
            <button
              @click="selectedScenario = null"
              class="text-blue-500 hover:text-blue-700 text-sm"
            >
              Clear
            </button>
          </div>
        </div>

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
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon class="w-6 h-6 text-indigo-600" />
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
  CheckCircleIcon,
  ChartBarIcon,
  ClockIcon,
  BookOpenIcon,
  FunnelIcon,
  PlayIcon,
  InformationCircleIcon,
  BriefcaseIcon,
  HomeIcon,
  UsersIcon,
  AcademicCapIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import { EmotionWheel, NeedsWheel, ChatInterface } from '../components/lib'
import ScenarioCard from '../components/ScenarioCard.vue'
import { useAI, useMockAI } from '../composables/useAI'
import { trackEvent } from '../utils/analytics'
import scenariosData from '../data/scenarios.json'
import { categoryGradients, categoryLabels } from '../lib/colors'

// AI service - use mock in development if no API configured
const useMock = import.meta.env.DEV && !import.meta.env.VITE_API_URL
const ai = useMock ? useMockAI() : useAI()

// Tab state
const tabs = [
  { id: 'feelings', label: 'Feelings', icon: HeartIcon },
  { id: 'needs', label: 'Needs', icon: StarIcon },
  { id: 'scenarios', label: 'Scenarios', icon: BookOpenIcon },
  { id: 'practice', label: 'AI Practice', icon: SparklesIcon }
]
const activeTab = ref('feelings')

// Selection state
const selectedFeelings = ref([])
const selectedNeeds = ref([])

// Scenario state
const scenarios = ref(scenariosData.scenarios)
const scenarioCategories = ref(scenariosData.categories)
const selectedCategory = ref('all')
const selectedDifficulty = ref('all')
const selectedScenario = ref(null)

// Filtered scenarios
const filteredScenarios = computed(() => {
  return scenarios.value.filter(s => {
    const categoryMatch = selectedCategory.value === 'all' || s.category === selectedCategory.value
    const difficultyMatch = selectedDifficulty.value === 'all' || s.difficulty === selectedDifficulty.value
    return categoryMatch && difficultyMatch
  })
})

// Category-filtered scenarios for Netflix-style carousels
const selfScenarios = computed(() => scenarios.value.filter(s => s.category === 'self'))
const workplaceScenarios = computed(() => scenarios.value.filter(s => s.category === 'workplace'))
const familyScenarios = computed(() => scenarios.value.filter(s => s.category === 'family'))
const romanticScenarios = computed(() => scenarios.value.filter(s => s.category === 'romantic'))
const friendshipScenarios = computed(() => scenarios.value.filter(s => s.category === 'friendship'))
const beginnerScenarios = computed(() => scenarios.value.filter(s => s.difficulty === 'beginner'))

// Featured scenario for hero section
const featuredScenario = computed(() => {
  // Pick the first beginner scenario or first self-compassion scenario
  return scenarios.value.find(s => s.difficulty === 'beginner' && s.category === 'self') ||
         scenarios.value.find(s => s.difficulty === 'beginner') ||
         scenarios.value[0]
})

// Scenario detail modal state
const showScenarioDetail = ref(false)

// Helper functions for scenario display
function getScenarioGradient(category) {
  return categoryGradients[category] || categoryGradients.self
}

function getCategoryLabel(category) {
  return categoryLabels[category] || 'Practice'
}

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

// Start session from scenario
async function startScenarioSession(scenario) {
  selectedScenario.value = scenario

  // Pre-populate feelings and needs from scenario
  selectedFeelings.value = (scenario.suggestedFeelings || []).map(f => ({
    id: f,
    label: f.charAt(0).toUpperCase() + f.slice(1),
    category: 'needs_unmet'
  }))
  selectedNeeds.value = (scenario.suggestedNeeds || []).map(n => ({
    id: n,
    label: n.charAt(0).toUpperCase() + n.slice(1),
    category: 'connection'
  }))

  trackEvent('nvc_session_start', {
    source: 'scenario',
    scenario_id: scenario.id,
    scenario_category: scenario.category,
    difficulty: scenario.difficulty,
    mode: useMock ? 'mock' : 'live'
  })

  try {
    await ai.createSession({
      type: 'scenario',
      scenarioId: scenario.id,
      feelings: selectedFeelings.value,
      needs: selectedNeeds.value,
      scenario: scenario
    })
    sessionActive.value = true
    activeTab.value = 'practice'
  } catch (err) {
    console.error('Failed to start scenario session:', err)
  }
}

// Select a scenario (show detail modal)
function selectScenario(scenario) {
  if (selectedScenario.value?.id === scenario.id && showScenarioDetail.value) {
    showScenarioDetail.value = false
  } else {
    selectedScenario.value = scenario
    showScenarioDetail.value = true
  }
}
</script>
