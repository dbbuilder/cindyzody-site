<template>
  <!-- Safe area spacer for iOS notch/dynamic island -->
  <div class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur h-[env(safe-area-inset-top)]"></div>

  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100 pt-[env(safe-area-inset-top)]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-3">
          <img src="/logo.png" class="h-9 w-auto" alt="Cindy Zody Logo" />
          <div class="flex flex-col">
            <span class="font-semibold tracking-tight leading-tight">Cindy Zody</span>
            <span class="hidden sm:inline text-xs text-slate-500 leading-tight">Communications Practitioner</span>
          </div>
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-6">
          <!-- Services Dropdown -->
          <div class="relative" @mouseenter="servicesOpen = true" @mouseleave="servicesOpen = false">
            <RouterLink class="hover:text-brand-600 flex items-center gap-1" to="/services">
              Services
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </RouterLink>
            <div v-if="servicesOpen" class="absolute top-full left-0 pt-2">
              <div class="bg-white rounded-lg shadow-lg border border-slate-200 py-2 min-w-[200px]">
                <RouterLink to="/services/individual" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600">Individual Coaching</RouterLink>
                <RouterLink to="/services/couples" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600">Couples & Family</RouterLink>
                <RouterLink to="/services/groups" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600">Groups & Workshops</RouterLink>
                <RouterLink to="/services/workplace" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600">Workplace Facilitation</RouterLink>
              </div>
            </div>
          </div>

          <!-- Approach Dropdown -->
          <div class="relative" @mouseenter="approachOpen = true" @mouseleave="approachOpen = false">
            <RouterLink class="hover:text-brand-600 flex items-center gap-1" to="/approach">
              Approach
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </RouterLink>
            <div v-if="approachOpen" class="absolute top-full left-0 pt-2">
              <div class="bg-white rounded-lg shadow-lg border border-slate-200 py-2 min-w-[240px]">
                <RouterLink to="/approach/emotional-intelligence" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600">Emotional Intelligence</RouterLink>
                <RouterLink to="/approach/nvc" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600">Non-Violent Communication</RouterLink>
                <RouterLink to="/approach/ifs" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600">Internal Family Systems</RouterLink>
                <RouterLink to="/approach/mindfulness" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600">Mindfulness</RouterLink>
                <RouterLink to="/approach/attitudinal-healing" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600">Attitudinal Healing</RouterLink>
                <div class="border-t border-slate-100 my-1"></div>
                <RouterLink to="/approach/conflict-resolution" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600">Conflict Resolution</RouterLink>
                <RouterLink to="/approach/outcomes" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600">Mutually Satisfying Outcomes</RouterLink>
              </div>
            </div>
          </div>

          <!-- Practice Dropdown -->
          <div class="relative" @mouseenter="practiceOpen = true" @mouseleave="practiceOpen = false">
            <RouterLink class="hover:text-brand-600 flex items-center gap-1" to="/practice">
              Practice
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </RouterLink>
            <div v-if="practiceOpen" class="absolute top-full left-0 pt-2">
              <div class="bg-white rounded-lg shadow-lg border border-slate-200 py-2 min-w-[200px]">
                <div class="px-4 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wide">GOFNR Process</div>
                <RouterLink to="/practice/goals" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600"><span class="text-brand-600 font-bold">G</span>oals</RouterLink>
                <RouterLink to="/practice/observation" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600"><span class="text-brand-600 font-bold">O</span>bservation</RouterLink>
                <RouterLink to="/practice/feelings" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600"><span class="text-brand-600 font-bold">F</span>eelings</RouterLink>
                <RouterLink to="/practice/needs" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600"><span class="text-brand-600 font-bold">N</span>eeds</RouterLink>
                <RouterLink to="/practice/request" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600"><span class="text-brand-600 font-bold">R</span>equest</RouterLink>
                <div class="border-t border-slate-100 my-1"></div>
                <RouterLink to="/practice/scenarios" class="block px-4 py-2 text-sm hover:bg-violet-50 hover:text-violet-600">
                  <span class="inline-flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Example Scenarios
                  </span>
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- Groups Dropdown -->
          <div class="relative" @mouseenter="groupsOpen = true" @mouseleave="groupsOpen = false">
            <RouterLink class="hover:text-brand-600 flex items-center gap-1" to="/groups">
              Groups
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </RouterLink>
            <div v-if="groupsOpen" class="absolute top-full left-0 pt-2">
              <div class="bg-white rounded-lg shadow-lg border border-slate-200 py-2 min-w-[220px]">
                <RouterLink to="/groups/nvc-foundations" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600">NVC Foundations</RouterLink>
                <RouterLink to="/groups/mindful-communication" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600">Mindful Communication Lab</RouterLink>
                <RouterLink to="/groups/repair-after-conflict" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600">Repair After Conflict</RouterLink>
              </div>
            </div>
          </div>
          <RouterLink class="hover:text-brand-600" to="/resources">Resources</RouterLink>
          <RouterLink class="hover:text-brand-600" to="/about">About</RouterLink>
          <!-- Practice tracking links -->
          <div class="flex items-center gap-2 pl-2 border-l border-slate-200">
            <RouterLink
              to="/progress"
              class="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
              title="Your Progress"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </RouterLink>
            <RouterLink
              to="/history"
              class="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
              title="Session History"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </RouterLink>
          </div>
          <!-- AI Practice Magic Button -->
          <RouterLink
            to="/practice?tab=ai"
            class="inline-flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors font-medium text-sm shadow-sm"
            title="Practice with AI"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
            AI Practice
          </RouterLink>
          <UserMenu />
        </nav>

        <!-- Mobile menu button -->
        <div class="flex items-center gap-3 md:hidden">
          <UserMenu />
          <button class="inline-flex items-center p-2" @click="open = !open" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="open" class="md:hidden border-t border-slate-100">
      <div class="px-4 py-3 flex flex-col gap-1">
        <!-- Services Section -->
        <div>
          <button @click="mobileServicesOpen = !mobileServicesOpen" class="flex items-center justify-between w-full py-2 font-medium">
            Services
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': mobileServicesOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="mobileServicesOpen" class="pl-4 flex flex-col gap-1">
            <RouterLink @click="open=false" to="/services" class="py-1.5 text-sm text-slate-600">Overview</RouterLink>
            <RouterLink @click="open=false" to="/services/individual" class="py-1.5 text-sm text-slate-600">Individual Coaching</RouterLink>
            <RouterLink @click="open=false" to="/services/couples" class="py-1.5 text-sm text-slate-600">Couples & Family</RouterLink>
            <RouterLink @click="open=false" to="/services/groups" class="py-1.5 text-sm text-slate-600">Groups & Workshops</RouterLink>
            <RouterLink @click="open=false" to="/services/workplace" class="py-1.5 text-sm text-slate-600">Workplace Facilitation</RouterLink>
          </div>
        </div>

        <!-- Approach Section -->
        <div>
          <button @click="mobileApproachOpen = !mobileApproachOpen" class="flex items-center justify-between w-full py-2 font-medium">
            Approach
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': mobileApproachOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="mobileApproachOpen" class="pl-4 flex flex-col gap-1">
            <RouterLink @click="open=false" to="/approach" class="py-1.5 text-sm text-slate-600">Overview</RouterLink>
            <RouterLink @click="open=false" to="/approach/emotional-intelligence" class="py-1.5 text-sm text-slate-600">Emotional Intelligence</RouterLink>
            <RouterLink @click="open=false" to="/approach/nvc" class="py-1.5 text-sm text-slate-600">Non-Violent Communication</RouterLink>
            <RouterLink @click="open=false" to="/approach/ifs" class="py-1.5 text-sm text-slate-600">Internal Family Systems</RouterLink>
            <RouterLink @click="open=false" to="/approach/mindfulness" class="py-1.5 text-sm text-slate-600">Mindfulness</RouterLink>
            <RouterLink @click="open=false" to="/approach/attitudinal-healing" class="py-1.5 text-sm text-slate-600">Attitudinal Healing</RouterLink>
            <RouterLink @click="open=false" to="/approach/conflict-resolution" class="py-1.5 text-sm text-slate-600">Conflict Resolution</RouterLink>
            <RouterLink @click="open=false" to="/approach/outcomes" class="py-1.5 text-sm text-slate-600">Mutually Satisfying Outcomes</RouterLink>
          </div>
        </div>

        <!-- Practice Section -->
        <div>
          <button @click="mobilePracticeOpen = !mobilePracticeOpen" class="flex items-center justify-between w-full py-2 font-medium">
            Practice
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': mobilePracticeOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="mobilePracticeOpen" class="pl-4 flex flex-col gap-1">
            <RouterLink @click="open=false" to="/practice" class="py-1.5 text-sm text-slate-600">Interactive Tools</RouterLink>
            <div class="py-1 text-xs font-semibold text-slate-400 uppercase">GOFNR Process</div>
            <RouterLink @click="open=false" to="/practice/goals" class="py-1.5 text-sm text-slate-600"><span class="text-brand-600 font-bold">G</span>oals</RouterLink>
            <RouterLink @click="open=false" to="/practice/observation" class="py-1.5 text-sm text-slate-600"><span class="text-brand-600 font-bold">O</span>bservation</RouterLink>
            <RouterLink @click="open=false" to="/practice/feelings" class="py-1.5 text-sm text-slate-600"><span class="text-brand-600 font-bold">F</span>eelings</RouterLink>
            <RouterLink @click="open=false" to="/practice/needs" class="py-1.5 text-sm text-slate-600"><span class="text-brand-600 font-bold">N</span>eeds</RouterLink>
            <RouterLink @click="open=false" to="/practice/request" class="py-1.5 text-sm text-slate-600"><span class="text-brand-600 font-bold">R</span>equest</RouterLink>
            <div class="border-t border-slate-100 my-1"></div>
            <RouterLink @click="open=false" to="/practice/scenarios" class="py-1.5 text-sm text-violet-600">Example Scenarios</RouterLink>
          </div>
        </div>

        <!-- Groups Section -->
        <div>
          <button @click="mobileGroupsOpen = !mobileGroupsOpen" class="flex items-center justify-between w-full py-2 font-medium">
            Groups
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': mobileGroupsOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="mobileGroupsOpen" class="pl-4 flex flex-col gap-1">
            <RouterLink @click="open=false" to="/groups" class="py-1.5 text-sm text-slate-600">Overview</RouterLink>
            <RouterLink @click="open=false" to="/groups/nvc-foundations" class="py-1.5 text-sm text-slate-600">NVC Foundations</RouterLink>
            <RouterLink @click="open=false" to="/groups/mindful-communication" class="py-1.5 text-sm text-slate-600">Mindful Communication Lab</RouterLink>
            <RouterLink @click="open=false" to="/groups/repair-after-conflict" class="py-1.5 text-sm text-slate-600">Repair After Conflict</RouterLink>
          </div>
        </div>

        <RouterLink @click="open=false" to="/resources" class="py-2 font-medium">Resources</RouterLink>
        <RouterLink @click="open=false" to="/about" class="py-2 font-medium">About</RouterLink>
        <div class="mt-2 pt-2 border-t border-slate-100">
          <ScheduleButton />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { trackEvent } from '../utils/analytics'
import ScheduleButton from './ScheduleButton.vue'
import { UserMenu } from './auth'

const open = ref(false)

// Desktop dropdown states
const servicesOpen = ref(false)
const approachOpen = ref(false)
const practiceOpen = ref(false)
const groupsOpen = ref(false)

// Mobile dropdown states
const mobileServicesOpen = ref(false)
const mobileApproachOpen = ref(false)
const mobilePracticeOpen = ref(false)
const mobileGroupsOpen = ref(false)
</script>
