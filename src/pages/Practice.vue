<template>
  <section class="py-6">
    <div class="mx-auto max-w-6xl px-4">
      <!-- Condensed Hero Section -->
      <div class="text-center mb-4">
        <h1 class="text-2xl font-bold mb-1">Feelings & Needs Practice</h1>
        <p class="text-sm text-slate-600">
          Interactive tools for exploring feelings, needs, and practicing NVC
        </p>
      </div>

      <!-- Tab Navigation - GOFNR with highlighted first letters -->
      <div class="flex justify-center mb-4">
        <div class="inline-flex bg-slate-100 rounded-lg p-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-4 py-2 rounded-md font-medium text-sm transition-all"
            :class="activeTab === tab.id
              ? 'bg-white shadow text-slate-900'
              : 'text-slate-600 hover:text-slate-900'"
          >
            <component :is="tab.icon" class="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
            <span class="text-brand-600 font-bold">{{ tab.label.charAt(0) }}</span>{{ tab.label.slice(1) }}
          </button>
        </div>
      </div>

      <!-- Goals Explorer Tab -->
      <div v-if="activeTab === 'goals'" class="animate-fade-in">
        <!-- AI Goal Planner Card -->
        <div class="bg-gradient-to-br from-amber-50 to-brand-50 rounded-xl p-5 border border-amber-200 mb-4">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <SparklesIcon class="w-5 h-5 text-amber-600" />
            </div>
            <div class="flex-1">
              <h2 class="text-lg font-bold text-slate-900 mb-1">Create Your Personalized GOFNR Plan</h2>
              <p class="text-sm text-slate-600 mb-3">
                Get a customized goal-setting roadmap for your specific situation with step-by-step guidance.
              </p>

              <!-- Input form when not generating -->
              <div v-if="!generatedPlan && !isGeneratingPlan" class="space-y-3">
                <!-- Write your own situation first -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Describe your situation</label>
                  <textarea
                    v-model="goal.situation"
                    rows="2"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none text-sm"
                    placeholder="What conversation or situation are you preparing for?"
                  ></textarea>
                </div>
                <!-- Example scenario selector -->
                <div>
                  <label class="block text-sm font-medium text-slate-500 mb-1">Or start from an example scenario</label>
                  <select
                    @change="selectExampleScenario($event.target.value)"
                    class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm bg-slate-50"
                  >
                    <option value="">Select an example...</option>
                    <optgroup label="Self-Compassion">
                      <option v-for="s in selfScenarios.slice(0, 3)" :key="s.id" :value="s.id">{{ s.title }}</option>
                    </optgroup>
                    <optgroup label="Workplace">
                      <option v-for="s in workplaceScenarios.slice(0, 3)" :key="s.id" :value="s.id">{{ s.title }}</option>
                    </optgroup>
                    <optgroup label="Family">
                      <option v-for="s in familyScenarios.slice(0, 3)" :key="s.id" :value="s.id">{{ s.title }}</option>
                    </optgroup>
                    <optgroup label="Relationships">
                      <option v-for="s in romanticScenarios.slice(0, 3)" :key="s.id" :value="s.id">{{ s.title }}</option>
                    </optgroup>
                  </select>
                </div>
                <div class="flex flex-wrap gap-3">
                  <button
                    @click="generateGOFNRPlan"
                    :disabled="!goal.situation.trim()"
                    class="inline-flex items-center bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SparklesIcon class="w-4 h-4 mr-2" />
                    Build My GOFNR Roadmap
                  </button>
                  <button
                    v-if="goal.situation.trim()"
                    @click="activeTab = 'observations'"
                    class="inline-flex items-center border border-slate-300 px-4 py-2 rounded-lg hover:bg-white transition-colors font-medium text-sm"
                  >
                    Continue to Observations
                    <ArrowRightIcon class="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>

              <!-- Loading state -->
              <div v-if="isGeneratingPlan" class="flex items-center gap-3 py-3">
                <div class="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                <span class="text-sm text-slate-600">Creating your personalized plan...</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Generated Plan Display -->
        <div v-if="generatedPlan" class="bg-white rounded-xl border shadow-sm p-6 mb-4">
          <!-- Header -->
          <div class="flex items-center justify-between mb-4 pb-3 border-b">
            <div class="flex items-center gap-3">
              <img src="/logo.png" class="h-8 w-auto" alt="Cindy Zody Logo" />
              <div>
                <div class="font-semibold text-sm">Cindy Zody</div>
                <div class="text-xs text-slate-500">Communications Practitioner</div>
              </div>
            </div>
            <div class="text-xs text-slate-500 text-right">
              <div>Personal GOFNR Roadmap</div>
              <div>{{ new Date().toLocaleDateString() }}</div>
            </div>
          </div>

          <!-- Plan content -->
          <div class="prose prose-sm prose-slate max-w-none" v-html="generatedPlan"></div>

          <!-- Footer -->
          <div class="mt-6 pt-3 border-t text-center text-xs text-slate-500">
            <p>Created with the GOFNR Goal Planning Tool at cindyzody.com</p>
          </div>

          <!-- Action buttons -->
          <div class="mt-4 flex flex-wrap gap-3">
            <button
              @click="downloadGOFNRPDF"
              :disabled="isDownloadingPDF"
              class="inline-flex items-center bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors font-medium text-sm disabled:opacity-70"
            >
              <template v-if="isDownloadingPDF">
                <div class="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </template>
              <template v-else>
                <ArrowDownTrayIcon class="w-4 h-4 mr-2" />
                Download PDF
              </template>
            </button>
            <button
              @click="resetPlan"
              class="inline-flex items-center border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors font-medium text-sm"
            >
              New Plan
            </button>
            <button
              @click="activeTab = 'observations'"
              class="inline-flex items-center bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium text-sm"
            >
              Continue to Observations
              <ArrowRightIcon class="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        <!-- Quick link to learn more -->
        <div v-if="!generatedPlan" class="text-center">
          <p class="text-sm text-slate-500">
            <RouterLink to="/practice/goals" class="text-brand-600 hover:underline">Learn more</RouterLink> about why goals matter in the GOFNR process.
          </p>
        </div>
      </div>

      <!-- Observations Tab -->
      <div v-if="activeTab === 'observations'" class="animate-fade-in">
        <div class="bg-white rounded-xl border shadow-sm p-6">
          <!-- Navigation breadcrumb -->
          <div class="flex items-center gap-2 mb-4 text-sm">
            <button
              @click="activeTab = 'goals'"
              class="inline-flex items-center text-slate-500 hover:text-brand-600 transition-colors"
            >
              <FlagIcon class="w-4 h-4 mr-1.5" />
              <span class="text-brand-600 font-bold">G</span>oals
            </button>
            <span class="text-slate-300">→</span>
            <span class="inline-flex items-center text-slate-900 font-medium">
              <EyeIcon class="w-4 h-4 mr-1.5 text-brand-600" />
              <span class="text-brand-600 font-bold">O</span>bservations
            </span>
          </div>

          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-lg font-bold">What Happened?</h2>
              <p class="text-sm text-slate-600">Describe the situation as you experienced it</p>
            </div>
            <button
              v-if="observation.initial.trim()"
              @click="activeTab = 'feelings'"
              class="inline-flex items-center bg-brand-600 text-white px-3 py-1.5 rounded-lg hover:bg-brand-700 transition-colors font-medium text-sm"
            >
              Continue to <span class="text-white font-bold ml-1">F</span>eelings
              <ArrowRightIcon class="w-4 h-4 ml-1" />
            </button>
          </div>

          <!-- Educational context -->
          <div class="bg-blue-50 rounded-lg p-4 mb-5 border border-blue-100">
            <div class="flex items-start gap-3">
              <LightBulbIcon class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div class="text-sm text-blue-800">
                <p class="font-medium mb-1">Why we start here</p>
                <p>Write down what happened in your own words—don't worry about being "correct" yet.
                After exploring your feelings and needs, you'll have a chance to refine this into a
                cleaner observation without judgments. This comparison often reveals important insights.</p>
              </div>
            </div>
          </div>

          <!-- Initial observation input -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">
                Describe what happened
              </label>
              <textarea
                v-model="observation.initial"
                rows="4"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none"
                placeholder="Write about the situation... What did the other person say or do? What were the circumstances? Include any thoughts or interpretations you have about it."
              ></textarea>
            </div>

            <!-- Prompts to help -->
            <div class="grid sm:grid-cols-2 gap-3">
              <div class="bg-slate-50 rounded-lg p-3">
                <p class="text-xs font-medium text-slate-600 mb-1">Consider including:</p>
                <ul class="text-xs text-slate-500 space-y-1">
                  <li>• What specifically was said or done</li>
                  <li>• When and where it happened</li>
                  <li>• Your interpretations of why</li>
                </ul>
              </div>
              <div class="bg-amber-50 rounded-lg p-3">
                <p class="text-xs font-medium text-amber-700 mb-1">It's okay to include:</p>
                <ul class="text-xs text-amber-600 space-y-1">
                  <li>• Your judgments and opinions</li>
                  <li>• Words like "always" or "never"</li>
                  <li>• Character assessments</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Goal context if available -->
          <div v-if="goal.situation" class="mt-5 pt-4 border-t">
            <p class="text-xs text-slate-500 mb-2">Your stated goal for this situation:</p>
            <p class="text-sm text-slate-700 bg-slate-50 rounded-lg p-3 italic">"{{ goal.situation }}"</p>
          </div>
        </div>
      </div>

      <!-- Feelings Explorer Tab -->
      <div v-if="activeTab === 'feelings'" class="animate-fade-in">
        <div class="bg-white rounded-xl border shadow-sm p-4">
          <!-- Navigation breadcrumb -->
          <div class="flex items-center gap-2 mb-4 text-sm">
            <button
              @click="activeTab = 'observations'"
              class="inline-flex items-center text-slate-500 hover:text-brand-600 transition-colors"
            >
              <EyeIcon class="w-4 h-4 mr-1.5" />
              <span class="text-brand-600 font-bold">O</span>bservations
            </button>
            <span class="text-slate-300">→</span>
            <span class="inline-flex items-center text-slate-900 font-medium">
              <HeartIcon class="w-4 h-4 mr-1.5 text-brand-600" />
              <span class="text-brand-600 font-bold">F</span>eelings
            </span>
          </div>

          <div class="flex items-center justify-between mb-3">
            <div>
              <h2 class="text-lg font-bold">Explore Feelings</h2>
              <p class="text-sm text-slate-600">Select feelings that resonate with your experience</p>
            </div>
            <button
              v-if="selectedFeelings.length > 0"
              @click="proceedToNeeds"
              class="inline-flex items-center bg-brand-600 text-white px-3 py-1.5 rounded-lg hover:bg-brand-700 transition-colors font-medium text-sm"
            >
              Continue to <span class="text-white font-bold ml-1">N</span>eeds
              <ArrowRightIcon class="w-4 h-4 ml-1" />
            </button>
          </div>

          <!-- Selected feelings inline summary -->
          <div v-if="selectedFeelings.length > 0" class="mb-3 p-2 bg-slate-50 rounded-lg flex items-center gap-2 flex-wrap">
            <span class="text-xs text-slate-500">Selected:</span>
            <span
              v-for="feeling in selectedFeelings"
              :key="feeling.id"
              class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
              :class="feeling.category === 'needs_met'
                ? 'bg-feeling-met text-white'
                : 'bg-feeling-unmet text-white'"
            >
              {{ feeling.label }}
            </span>
          </div>

          <EmotionWheel
            v-model="selectedFeelings"
            :maxSelections="5"
          />
        </div>
      </div>

      <!-- Needs Explorer Tab -->
      <div v-if="activeTab === 'needs'" class="animate-fade-in">
        <div class="bg-white rounded-xl border shadow-sm p-4">
          <!-- Navigation breadcrumb -->
          <div class="flex items-center gap-2 mb-4 text-sm">
            <button
              @click="activeTab = 'feelings'"
              class="inline-flex items-center text-slate-500 hover:text-brand-600 transition-colors"
            >
              <HeartIcon class="w-4 h-4 mr-1.5" />
              <span class="text-brand-600 font-bold">F</span>eelings
            </button>
            <span class="text-slate-300">→</span>
            <span class="inline-flex items-center text-slate-900 font-medium">
              <StarIcon class="w-4 h-4 mr-1.5 text-brand-600" />
              <span class="text-brand-600 font-bold">N</span>eeds
            </span>
          </div>

          <div class="flex items-center justify-between mb-3">
            <div>
              <h2 class="text-lg font-bold">Explore Needs</h2>
              <p class="text-sm text-slate-600">Identify the universal needs underneath your feelings</p>
            </div>
            <button
              v-if="selectedNeeds.length > 0"
              @click="activeTab = 'request'"
              class="inline-flex items-center bg-brand-600 text-white px-3 py-1.5 rounded-lg hover:bg-brand-700 transition-colors font-medium text-sm"
            >
              Continue to <span class="text-white font-bold ml-1">R</span>equest
              <ArrowRightIcon class="w-4 h-4 ml-1" />
            </button>
          </div>

          <!-- Selected needs inline summary -->
          <div v-if="selectedNeeds.length > 0" class="mb-3 p-2 bg-slate-50 rounded-lg flex items-center gap-2 flex-wrap">
            <span class="text-xs text-slate-500">Selected:</span>
            <span
              v-for="need in selectedNeeds"
              :key="need.id"
              class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-brand-600 text-white"
            >
              {{ need.label }}
            </span>
          </div>

          <NeedsWheel
            v-model="selectedNeeds"
            :maxSelections="5"
          />
        </div>
      </div>

      <!-- Request Tab -->
      <div v-if="activeTab === 'request'" class="animate-fade-in">
        <div class="bg-white rounded-xl border shadow-sm p-6">
          <!-- Navigation breadcrumb -->
          <div class="flex items-center gap-2 mb-4 text-sm">
            <button
              @click="activeTab = 'needs'"
              class="inline-flex items-center text-slate-500 hover:text-brand-600 transition-colors"
            >
              <StarIcon class="w-4 h-4 mr-1.5" />
              <span class="text-brand-600 font-bold">N</span>eeds
            </button>
            <span class="text-slate-300">→</span>
            <span class="inline-flex items-center text-slate-900 font-medium">
              <ChatBubbleLeftRightIcon class="w-4 h-4 mr-1.5 text-brand-600" />
              <span class="text-brand-600 font-bold">R</span>equest
            </span>
          </div>

          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-lg font-bold">Craft Your Request</h2>
              <p class="text-sm text-slate-600">Create a clear, specific, and doable request</p>
            </div>
          </div>

          <!-- Your journey summary -->
          <div class="bg-gradient-to-br from-brand-50 to-sage-50 rounded-xl p-5 mb-6 border border-brand-100">
            <h3 class="font-semibold text-sm text-slate-900 mb-3">Your GOFNR Journey So Far</h3>
            <div class="grid sm:grid-cols-2 gap-4 text-sm">
              <div v-if="goal.situation" class="bg-white/70 rounded-lg p-3">
                <span class="text-brand-600 font-bold">G</span><span class="text-slate-600">oal:</span>
                <p class="text-slate-700 mt-1 text-xs">{{ goal.situation }}</p>
              </div>
              <div v-if="observation.initial" class="bg-white/70 rounded-lg p-3">
                <span class="text-brand-600 font-bold">O</span><span class="text-slate-600">bservation:</span>
                <p class="text-slate-700 mt-1 text-xs line-clamp-2">{{ observation.initial }}</p>
              </div>
              <div v-if="selectedFeelings.length > 0" class="bg-white/70 rounded-lg p-3">
                <span class="text-brand-600 font-bold">F</span><span class="text-slate-600">eelings:</span>
                <div class="flex flex-wrap gap-1 mt-1">
                  <span v-for="f in selectedFeelings.slice(0, 3)" :key="f.id" class="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{{ f.label }}</span>
                  <span v-if="selectedFeelings.length > 3" class="text-xs text-slate-500">+{{ selectedFeelings.length - 3 }} more</span>
                </div>
              </div>
              <div v-if="selectedNeeds.length > 0" class="bg-white/70 rounded-lg p-3">
                <span class="text-brand-600 font-bold">N</span><span class="text-slate-600">eeds:</span>
                <div class="flex flex-wrap gap-1 mt-1">
                  <span v-for="n in selectedNeeds.slice(0, 3)" :key="n.id" class="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">{{ n.label }}</span>
                  <span v-if="selectedNeeds.length > 3" class="text-xs text-slate-500">+{{ selectedNeeds.length - 3 }} more</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Request type selection -->
          <div class="mb-5">
            <label class="block text-sm font-medium text-slate-700 mb-2">What type of request do you want to make?</label>
            <div class="flex flex-wrap gap-2">
              <button
                @click="request.type = 'action'"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                :class="request.type === 'action' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
              >
                Action Request
              </button>
              <button
                @click="request.type = 'connection'"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                :class="request.type === 'connection' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
              >
                Connection Request
              </button>
              <button
                @click="request.type = 'information'"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                :class="request.type === 'information' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
              >
                Information Request
              </button>
            </div>
          </div>

          <!-- Request type guidance -->
          <div class="bg-blue-50 rounded-lg p-4 mb-5 border border-blue-100">
            <div class="flex items-start gap-3">
              <LightBulbIcon class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div class="text-sm text-blue-800">
                <template v-if="request.type === 'action'">
                  <p class="font-medium mb-1">Action Requests</p>
                  <p>Ask for something specific and doable. "Would you be willing to [specific action]?"</p>
                  <p class="mt-2 text-xs">Example: "Would you be willing to text me if you're going to be more than 15 minutes late?"</p>
                </template>
                <template v-else-if="request.type === 'connection'">
                  <p class="font-medium mb-1">Connection Requests</p>
                  <p>Check understanding and connection. "Would you tell me what you heard me say?"</p>
                  <p class="mt-2 text-xs">Example: "I want to make sure I'm being clear. Would you be willing to tell me what you're hearing?"</p>
                </template>
                <template v-else>
                  <p class="font-medium mb-1">Information Requests</p>
                  <p>Learn more about the other person's experience. "Would you share what's going on for you?"</p>
                  <p class="mt-2 text-xs">Example: "I'd like to understand your perspective. Would you be willing to share what led to that decision?"</p>
                </template>
              </div>
            </div>
          </div>

          <!-- Request draft -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">
                Draft your request
              </label>
              <textarea
                v-model="request.draft"
                rows="3"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none"
                :placeholder="request.type === 'action'
                  ? 'Would you be willing to...'
                  : request.type === 'connection'
                    ? 'I want to make sure we understand each other. Would you...'
                    : 'I would like to understand more about... Would you share...'"
              ></textarea>
            </div>

            <!-- Request checklist -->
            <div class="bg-slate-50 rounded-lg p-4">
              <p class="text-sm font-medium text-slate-700 mb-2">Good requests are:</p>
              <div class="grid sm:grid-cols-2 gap-2">
                <label class="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" class="rounded text-brand-600" />
                  <span>Specific (not vague)</span>
                </label>
                <label class="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" class="rounded text-brand-600" />
                  <span>Doable (realistic)</span>
                </label>
                <label class="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" class="rounded text-brand-600" />
                  <span>Positive (what you want, not don't want)</span>
                </label>
                <label class="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" class="rounded text-brand-600" />
                  <span>A true request (open to "no")</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Compare observation -->
          <div v-if="observation.initial" class="mt-6 pt-5 border-t">
            <h3 class="font-semibold text-sm text-slate-900 mb-3">
              <EyeIcon class="w-4 h-4 inline-block mr-1 text-brand-600" />
              Refine Your Observation
            </h3>
            <p class="text-sm text-slate-600 mb-3">
              Now that you've explored your feelings and needs, try rewriting your observation without judgments.
              What would a camera have recorded?
            </p>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-amber-50 rounded-lg p-3 border border-amber-100">
                <p class="text-xs font-medium text-amber-700 mb-1">Your initial description:</p>
                <p class="text-sm text-amber-900">{{ observation.initial }}</p>
              </div>
              <div>
                <textarea
                  v-model="observation.refined"
                  rows="3"
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none text-sm"
                  placeholder="Rewrite as a pure observation... What specifically happened?"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Complete statement -->
          <div v-if="request.draft && observation.refined" class="mt-6 pt-5 border-t">
            <h3 class="font-semibold text-slate-900 mb-3">Your Complete NVC Statement</h3>
            <div class="bg-gradient-to-br from-brand-50 to-emerald-50 rounded-xl p-5 border border-brand-200">
              <p class="text-slate-800 leading-relaxed">
                <span class="font-medium">When</span> {{ observation.refined || observation.initial }},
                <span class="font-medium">I feel</span> {{ selectedFeelings.map(f => f.label.toLowerCase()).join(', ') || '[feelings]' }}
                <span class="font-medium">because I need</span> {{ selectedNeeds.map(n => n.label.toLowerCase()).join(', ') || '[needs]' }}.
                <span class="font-medium">{{ request.draft }}</span>
              </p>
            </div>
            <div class="mt-4 flex flex-wrap gap-3">
              <button
                @click="downloadGOFNRPDF"
                :disabled="isDownloadingPDF"
                class="inline-flex items-center bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors font-medium text-sm"
              >
                <ArrowDownTrayIcon class="w-4 h-4 mr-2" />
                Download Summary PDF
              </button>
              <button
                @click="startSession"
                class="inline-flex items-center bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors font-medium text-sm"
              >
                <SparklesIcon class="w-4 h-4 mr-2" />
                Practice with AI
              </button>
            </div>
          </div>
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
        <h2 class="text-2xl font-semibold text-center mb-8">The GOFNR Process</h2>
        <div class="grid md:grid-cols-5 gap-4">
          <div class="text-center">
            <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FlagIcon class="w-6 h-6 text-amber-600" />
            </div>
            <h3 class="font-semibold mb-2">Goals</h3>
            <p class="text-sm text-slate-600">Clarify what you want to achieve and why it matters.</p>
          </div>
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
import { ref, computed, nextTick } from 'vue'
import {
  HeartIcon,
  StarIcon,
  BoltIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  ArrowDownTrayIcon,
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
  XMarkIcon,
  FlagIcon,
  PencilIcon,
  LightBulbIcon
} from '@heroicons/vue/24/outline'
import { EmotionWheel, NeedsWheel, ChatInterface } from '../components/lib'
import ScenarioCard from '../components/ScenarioCard.vue'
import { useAI, useMockAI } from '../composables/useAI'
import { csrfFetch } from '../composables/useCsrf'
import { trackEvent } from '../utils/analytics'
import scenariosData from '../data/scenarios.json'
import { categoryGradients, categoryLabels } from '../lib/colors'

// AI service - use mock in development if no API configured
const useMock = import.meta.env.DEV && !import.meta.env.VITE_API_URL
const ai = useMock ? useMockAI() : useAI()

// Tab state - GOFNR process tabs only
const tabs = [
  { id: 'goals', label: 'Goals', icon: FlagIcon },
  { id: 'observations', label: 'Observations', icon: EyeIcon },
  { id: 'feelings', label: 'Feelings', icon: HeartIcon },
  { id: 'needs', label: 'Needs', icon: StarIcon },
  { id: 'request', label: 'Request', icon: ChatBubbleLeftRightIcon }
]
const activeTab = ref('goals')

// Selection state
const selectedFeelings = ref([])
const selectedNeeds = ref([])

// Goal state
const goal = ref({
  situation: '',
  outcome: '',
  importance: ''
})
const goalComplete = computed(() => goal.value.situation && goal.value.outcome)

// Observation state - user's initial interpretation before NVC learning
const observation = ref({
  initial: '', // What they initially think happened (may include judgments)
  refined: ''  // After going through feelings/needs, a cleaner observation
})

// Request state - crafting their request based on GOFN
const request = ref({
  draft: '',    // Their initial request attempt
  refined: '',  // Refined based on guidance
  type: 'action' // action, connection, or information
})

// GOFNR Plan generation state
const generatedPlan = ref('')
const isGeneratingPlan = ref(false)
const isDownloadingPDF = ref(false)

// Generate GOFNR Plan
async function generateGOFNRPlan() {
  if (!goal.value.situation.trim()) return
  isGeneratingPlan.value = true

  try {
    const response = await csrfFetch('/api/ai/goal-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ situation: goal.value.situation })
    })

    if (response.ok) {
      const data = await response.json()
      generatedPlan.value = data.plan
    } else {
      generatedPlan.value = generateTemplatePlan(goal.value.situation)
    }
  } catch (err) {
    generatedPlan.value = generateTemplatePlan(goal.value.situation)
  } finally {
    isGeneratingPlan.value = false
  }
}

function generateTemplatePlan(situation) {
  return `
    <h2>Your GOFNR Communication Roadmap</h2>
    <p><strong>Situation:</strong> ${situation}</p>

    <h3>Step 1: Goal Clarity</h3>
    <p>Before entering this conversation, consider:</p>
    <ul>
      <li><strong>Connection goal:</strong> What kind of relationship do you want with this person after the conversation?</li>
      <li><strong>Understanding goal:</strong> What do you want to understand better about their perspective?</li>
      <li><strong>Outcome goal:</strong> What specific agreement or change would feel satisfying?</li>
      <li><strong>Process goal:</strong> How do you want to show up? (e.g., calm, curious, honest)</li>
    </ul>

    <h3>Step 2: Observation Preparation</h3>
    <p>Practice describing the situation without judgment:</p>
    <ul>
      <li>What specific actions or words triggered your feelings?</li>
      <li>What would a camera have recorded?</li>
      <li>Can you state facts without using words like "always," "never," or character labels?</li>
    </ul>

    <h3>Step 3: Feelings Exploration</h3>
    <p>When you think about this situation, notice:</p>
    <ul>
      <li>What emotions come up? (frustrated, anxious, sad, hopeful, etc.)</li>
      <li>Where do you feel them in your body?</li>
      <li>Are these feelings pointing to met or unmet needs?</li>
    </ul>

    <h3>Step 4: Needs Identification</h3>
    <p>The feelings you identified likely point to these universal needs:</p>
    <ul>
      <li><strong>Connection needs:</strong> belonging, understanding, acceptance, closeness</li>
      <li><strong>Autonomy needs:</strong> choice, independence, space, freedom</li>
      <li><strong>Meaning needs:</strong> purpose, contribution, growth, competence</li>
      <li><strong>Peace needs:</strong> harmony, order, ease, rest</li>
    </ul>

    <h3>Step 5: Request Crafting</h3>
    <p>Based on your goal and identified needs, consider these requests:</p>
    <ul>
      <li><strong>Connection request:</strong> "Would you be willing to tell me what you heard me say?"</li>
      <li><strong>Action request:</strong> Think of one specific, doable thing that would meet your need</li>
      <li><strong>Information request:</strong> "I'd like to understand... would you share what's going on for you?"</li>
    </ul>

    <h3>Conversation Anchor</h3>
    <p>When the conversation gets difficult, return to this statement:</p>
    <blockquote>"My goal in this conversation is [your goal]. What I'm saying right now—is it serving that goal?"</blockquote>

    <h3>Self-Compassion Reminder</h3>
    <p>You don't have to do this perfectly. Progress is more important than perfection. If things don't go as planned, you can always:</p>
    <ul>
      <li>Take a break and return to the conversation later</li>
      <li>Acknowledge that you're learning a new way of communicating</li>
      <li>Ask for a do-over: "Can I try saying that differently?"</li>
    </ul>
  `
}

function resetPlan() {
  generatedPlan.value = ''
  goal.value.situation = ''
}

// Select an example scenario and fill in the situation
function selectExampleScenario(scenarioId) {
  if (!scenarioId) return
  const scenario = scenarios.value.find(s => s.id === scenarioId)
  if (scenario) {
    goal.value.situation = scenario.description
    // Also pre-fill observation if available
    if (scenario.context) {
      observation.value.initial = scenario.context
    }
  }
}

async function downloadGOFNRPDF() {
  isDownloadingPDF.value = true

  try {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter'
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 50
    const contentWidth = pageWidth - (margin * 2)
    let y = margin

    // Header
    doc.setFillColor(74, 124, 89) // brand green
    doc.rect(margin, y, 40, 40, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('CZ', margin + 20, y + 26, { align: 'center' })

    doc.setTextColor(74, 124, 89)
    doc.setFontSize(16)
    doc.text('Cindy Zody', margin + 50, y + 15)
    doc.setTextColor(100, 116, 139)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Communications Practitioner', margin + 50, y + 28)

    // Date and title on right
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    doc.setTextColor(30, 41, 59)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Personal GOFNR Roadmap', pageWidth - margin, y + 15, { align: 'right' })
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 116, 139)
    doc.setFontSize(10)
    doc.text(dateStr, pageWidth - margin, y + 28, { align: 'right' })

    y += 50

    // Divider line
    doc.setDrawColor(74, 124, 89)
    doc.setLineWidth(1.5)
    doc.line(margin, y, pageWidth - margin, y)
    y += 25

    // Convert HTML to plain text sections
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = generatedPlan.value
    const sections = tempDiv.querySelectorAll('h2, h3, p, li, blockquote')

    doc.setTextColor(30, 41, 59)

    sections.forEach(el => {
      // Check if we need a new page
      if (y > 700) {
        doc.addPage()
        y = margin
      }

      const text = el.textContent.trim()
      if (!text) return

      if (el.tagName === 'H2') {
        y += 15
        doc.setFontSize(16)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(74, 124, 89)
        doc.text(text, margin, y)
        y += 20
      } else if (el.tagName === 'H3') {
        y += 12
        doc.setFontSize(13)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(30, 41, 59)
        doc.text(text, margin, y)
        y += 18
      } else if (el.tagName === 'LI') {
        doc.setFontSize(11)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(51, 65, 85)
        const lines = doc.splitTextToSize('• ' + text, contentWidth - 20)
        doc.text(lines, margin + 15, y)
        y += lines.length * 14 + 4
      } else if (el.tagName === 'BLOCKQUOTE') {
        doc.setFontSize(11)
        doc.setFont('helvetica', 'italic')
        doc.setTextColor(74, 124, 89)
        const lines = doc.splitTextToSize('"' + text + '"', contentWidth - 40)
        doc.text(lines, margin + 20, y)
        y += lines.length * 14 + 10
      } else {
        doc.setFontSize(11)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(51, 65, 85)
        const lines = doc.splitTextToSize(text, contentWidth)
        doc.text(lines, margin, y)
        y += lines.length * 14 + 8
      }
    })

    // Footer
    y = Math.max(y + 30, 680)
    if (y > 700) {
      doc.addPage()
      y = 680
    }
    doc.setDrawColor(226, 232, 240)
    doc.setLineWidth(0.5)
    doc.line(margin, y, pageWidth - margin, y)
    y += 15

    doc.setFontSize(9)
    doc.setTextColor(100, 116, 139)
    doc.setFont('helvetica', 'normal')
    doc.text('Created with the GOFNR Goal Planning Tool at cindyzody.com', pageWidth / 2, y, { align: 'center' })
    y += 12
    doc.text('For personalized coaching, schedule a session at cindyzody.com/contact', pageWidth / 2, y, { align: 'center' })
    y += 12
    doc.setFontSize(8)
    doc.setTextColor(148, 163, 184)
    doc.text('(206) 992-5992 • cindyzody@gmail.com', pageWidth / 2, y, { align: 'center' })

    doc.save(`GOFNR-Roadmap-${new Date().toISOString().split('T')[0]}.pdf`)
  } catch (err) {
    console.error('PDF generation failed:', err)
    window.print()
  } finally {
    isDownloadingPDF.value = false
  }
}

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
