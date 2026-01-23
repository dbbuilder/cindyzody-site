<template>
  <!-- Skip link for keyboard users -->
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400"
    @click="skipToMain"
  >
    Skip to main content
  </a>

  <!-- Safe area spacer for iOS notch/dynamic island -->
  <div class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur h-[env(safe-area-inset-top)]"></div>

  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100 pt-[env(safe-area-inset-top)]" role="banner">
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
        <nav class="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <!-- Services Dropdown -->
          <div
            class="relative"
            @mouseenter="servicesOpen = true"
            @mouseleave="servicesOpen = false"
            @keydown="handleDropdownKeydown($event, 'services')"
          >
            <button
              type="button"
              class="hover:text-brand-600 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded"
              :aria-expanded="servicesOpen"
              aria-haspopup="true"
              @click="toggleDropdown('services')"
              @keydown.enter.prevent="toggleDropdown('services')"
              @keydown.space.prevent="toggleDropdown('services')"
            >
              Services
              <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': servicesOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-if="servicesOpen" class="absolute top-full left-0 pt-2">
              <div class="bg-white rounded-lg shadow-lg border border-slate-200 py-2 min-w-[200px]" role="menu" aria-orientation="vertical">
                <RouterLink to="/services" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1">Services Overview</RouterLink>
                <RouterLink to="/services/individual" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1">Individual Coaching</RouterLink>
                <RouterLink to="/services/couples" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1">Couples & Family</RouterLink>
                <RouterLink to="/services/groups" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1">Groups & Workshops</RouterLink>
                <RouterLink to="/services/workplace" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1">Workplace Facilitation</RouterLink>
              </div>
            </div>
          </div>

          <!-- Approach Dropdown -->
          <div
            class="relative"
            @mouseenter="approachOpen = true"
            @mouseleave="approachOpen = false"
            @keydown="handleDropdownKeydown($event, 'approach')"
          >
            <button
              type="button"
              class="hover:text-brand-600 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded"
              :aria-expanded="approachOpen"
              aria-haspopup="true"
              @click="toggleDropdown('approach')"
              @keydown.enter.prevent="toggleDropdown('approach')"
              @keydown.space.prevent="toggleDropdown('approach')"
            >
              Approach
              <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': approachOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-if="approachOpen" class="absolute top-full left-0 pt-2">
              <div class="bg-white rounded-lg shadow-lg border border-slate-200 py-2 min-w-[240px]" role="menu" aria-orientation="vertical">
                <RouterLink to="/approach" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1">Approach Overview</RouterLink>
                <RouterLink to="/approach/emotional-intelligence" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1">Emotional Intelligence</RouterLink>
                <RouterLink to="/approach/nvc" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1">Non-Violent Communication</RouterLink>
                <RouterLink to="/approach/ifs" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1">Internal Family Systems</RouterLink>
                <RouterLink to="/approach/mindfulness" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1">Mindfulness</RouterLink>
                <RouterLink to="/approach/attitudinal-healing" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1">Attitudinal Healing</RouterLink>
                <div class="border-t border-slate-100 my-1" role="separator"></div>
                <RouterLink to="/approach/conflict-resolution" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1">Conflict Resolution</RouterLink>
                <RouterLink to="/approach/outcomes" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1">Mutually Satisfying Outcomes</RouterLink>
              </div>
            </div>
          </div>

          <!-- Practice Dropdown -->
          <div
            class="relative"
            @mouseenter="practiceOpen = true"
            @mouseleave="practiceOpen = false"
            @keydown="handleDropdownKeydown($event, 'practice')"
          >
            <button
              type="button"
              class="hover:text-brand-600 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded"
              :aria-expanded="practiceOpen"
              aria-haspopup="true"
              @click="toggleDropdown('practice')"
              @keydown.enter.prevent="toggleDropdown('practice')"
              @keydown.space.prevent="toggleDropdown('practice')"
            >
              Practice
              <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': practiceOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-if="practiceOpen" class="absolute top-full left-0 pt-2">
              <div class="bg-white rounded-lg shadow-lg border border-slate-200 py-2 min-w-[200px]" role="menu" aria-orientation="vertical">
                <RouterLink to="/practice" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1">Interactive Tools</RouterLink>
                <div class="px-4 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wide" role="presentation">GOFNR Process</div>
                <RouterLink to="/practice/goals" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1"><span class="text-brand-600 font-bold" aria-hidden="true">G</span>oals</RouterLink>
                <RouterLink to="/practice/observation" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1"><span class="text-brand-600 font-bold" aria-hidden="true">O</span>bservation</RouterLink>
                <RouterLink to="/practice/feelings" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1"><span class="text-brand-600 font-bold" aria-hidden="true">F</span>eelings</RouterLink>
                <RouterLink to="/practice/needs" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1"><span class="text-brand-600 font-bold" aria-hidden="true">N</span>eeds</RouterLink>
                <RouterLink to="/practice/request" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1"><span class="text-brand-600 font-bold" aria-hidden="true">R</span>equest</RouterLink>
                <div class="border-t border-slate-100 my-1" role="separator"></div>
                <RouterLink to="/practice/scenarios" class="block px-4 py-2 text-sm hover:bg-violet-50 hover:text-violet-600 focus:bg-violet-50 focus:text-violet-600 focus:outline-none" role="menuitem" tabindex="-1">
                  <span class="inline-flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Example Scenarios
                  </span>
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- Groups Dropdown -->
          <div
            class="relative"
            @mouseenter="groupsOpen = true"
            @mouseleave="groupsOpen = false"
            @keydown="handleDropdownKeydown($event, 'groups')"
          >
            <button
              type="button"
              class="hover:text-brand-600 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded"
              :aria-expanded="groupsOpen"
              aria-haspopup="true"
              @click="toggleDropdown('groups')"
              @keydown.enter.prevent="toggleDropdown('groups')"
              @keydown.space.prevent="toggleDropdown('groups')"
            >
              Groups
              <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': groupsOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-if="groupsOpen" class="absolute top-full left-0 pt-2">
              <div class="bg-white rounded-lg shadow-lg border border-slate-200 py-2 min-w-[220px]" role="menu" aria-orientation="vertical">
                <RouterLink to="/groups" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1">Groups Overview</RouterLink>
                <RouterLink to="/groups/nvc-foundations" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1">NVC Foundations</RouterLink>
                <RouterLink to="/groups/mindful-communication" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1">Mindful Communication Lab</RouterLink>
                <RouterLink to="/groups/repair-after-conflict" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none" role="menuitem" tabindex="-1">Repair After Conflict</RouterLink>
              </div>
            </div>
          </div>
          <RouterLink class="hover:text-brand-600" to="/resources">Resources</RouterLink>
          <RouterLink class="hover:text-brand-600" to="/about">About</RouterLink>
          <!-- Practice tracking links -->
          <div class="flex items-center gap-2 pl-2 border-l border-slate-200">
            <RouterLink
              to="/progress"
              class="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              aria-label="Your Progress"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </RouterLink>
            <RouterLink
              to="/history"
              class="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              aria-label="Session History"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </RouterLink>
          </div>
          <!-- AI Practice Magic Button -->
          <RouterLink
            to="/practice?tab=ai"
            class="inline-flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors font-medium text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
            AI Practice
          </RouterLink>
          <UserMenu />
        </nav>

        <!-- Mobile menu button -->
        <div class="flex items-center gap-3 md:hidden">
          <UserMenu />
          <button
            type="button"
            class="inline-flex items-center p-2 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-lg"
            @click="open = !open"
            :aria-expanded="open"
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path v-if="!open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <nav v-if="open" id="mobile-menu" class="md:hidden border-t border-slate-100" aria-label="Mobile navigation">
      <div class="px-4 py-3 flex flex-col gap-1">
        <!-- Services Section -->
        <div>
          <button
            type="button"
            @click="mobileServicesOpen = !mobileServicesOpen"
            class="flex items-center justify-between w-full py-2 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-inset rounded"
            :aria-expanded="mobileServicesOpen"
            aria-controls="mobile-services-menu"
          >
            Services
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': mobileServicesOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="mobileServicesOpen" id="mobile-services-menu" class="pl-4 flex flex-col gap-1">
            <RouterLink @click="open=false" to="/services" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none">Overview</RouterLink>
            <RouterLink @click="open=false" to="/services/individual" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none">Individual Coaching</RouterLink>
            <RouterLink @click="open=false" to="/services/couples" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none">Couples & Family</RouterLink>
            <RouterLink @click="open=false" to="/services/groups" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none">Groups & Workshops</RouterLink>
            <RouterLink @click="open=false" to="/services/workplace" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none">Workplace Facilitation</RouterLink>
          </div>
        </div>

        <!-- Approach Section -->
        <div>
          <button
            type="button"
            @click="mobileApproachOpen = !mobileApproachOpen"
            class="flex items-center justify-between w-full py-2 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-inset rounded"
            :aria-expanded="mobileApproachOpen"
            aria-controls="mobile-approach-menu"
          >
            Approach
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': mobileApproachOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="mobileApproachOpen" id="mobile-approach-menu" class="pl-4 flex flex-col gap-1">
            <RouterLink @click="open=false" to="/approach" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none">Overview</RouterLink>
            <RouterLink @click="open=false" to="/approach/emotional-intelligence" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none">Emotional Intelligence</RouterLink>
            <RouterLink @click="open=false" to="/approach/nvc" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none">Non-Violent Communication</RouterLink>
            <RouterLink @click="open=false" to="/approach/ifs" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none">Internal Family Systems</RouterLink>
            <RouterLink @click="open=false" to="/approach/mindfulness" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none">Mindfulness</RouterLink>
            <RouterLink @click="open=false" to="/approach/attitudinal-healing" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none">Attitudinal Healing</RouterLink>
            <RouterLink @click="open=false" to="/approach/conflict-resolution" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none">Conflict Resolution</RouterLink>
            <RouterLink @click="open=false" to="/approach/outcomes" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none">Mutually Satisfying Outcomes</RouterLink>
          </div>
        </div>

        <!-- Practice Section -->
        <div>
          <button
            type="button"
            @click="mobilePracticeOpen = !mobilePracticeOpen"
            class="flex items-center justify-between w-full py-2 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-inset rounded"
            :aria-expanded="mobilePracticeOpen"
            aria-controls="mobile-practice-menu"
          >
            Practice
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': mobilePracticeOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="mobilePracticeOpen" id="mobile-practice-menu" class="pl-4 flex flex-col gap-1">
            <RouterLink @click="open=false" to="/practice" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none">Interactive Tools</RouterLink>
            <div class="py-1 text-xs font-semibold text-slate-400 uppercase" aria-hidden="true">GOFNR Process</div>
            <RouterLink @click="open=false" to="/practice/goals" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none"><span class="text-brand-600 font-bold" aria-hidden="true">G</span>oals</RouterLink>
            <RouterLink @click="open=false" to="/practice/observation" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none"><span class="text-brand-600 font-bold" aria-hidden="true">O</span>bservation</RouterLink>
            <RouterLink @click="open=false" to="/practice/feelings" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none"><span class="text-brand-600 font-bold" aria-hidden="true">F</span>eelings</RouterLink>
            <RouterLink @click="open=false" to="/practice/needs" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none"><span class="text-brand-600 font-bold" aria-hidden="true">N</span>eeds</RouterLink>
            <RouterLink @click="open=false" to="/practice/request" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none"><span class="text-brand-600 font-bold" aria-hidden="true">R</span>equest</RouterLink>
            <div class="border-t border-slate-100 my-1" role="separator"></div>
            <RouterLink @click="open=false" to="/practice/scenarios" class="py-1.5 text-sm text-violet-600 focus:text-violet-800 focus:outline-none">Example Scenarios</RouterLink>
          </div>
        </div>

        <!-- Groups Section -->
        <div>
          <button
            type="button"
            @click="mobileGroupsOpen = !mobileGroupsOpen"
            class="flex items-center justify-between w-full py-2 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-inset rounded"
            :aria-expanded="mobileGroupsOpen"
            aria-controls="mobile-groups-menu"
          >
            Groups
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': mobileGroupsOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="mobileGroupsOpen" id="mobile-groups-menu" class="pl-4 flex flex-col gap-1">
            <RouterLink @click="open=false" to="/groups" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none">Overview</RouterLink>
            <RouterLink @click="open=false" to="/groups/nvc-foundations" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none">NVC Foundations</RouterLink>
            <RouterLink @click="open=false" to="/groups/mindful-communication" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none">Mindful Communication Lab</RouterLink>
            <RouterLink @click="open=false" to="/groups/repair-after-conflict" class="py-1.5 text-sm text-slate-600 focus:text-brand-600 focus:outline-none">Repair After Conflict</RouterLink>
          </div>
        </div>

        <RouterLink @click="open=false" to="/resources" class="py-2 font-medium focus:text-brand-600 focus:outline-none">Resources</RouterLink>
        <RouterLink @click="open=false" to="/about" class="py-2 font-medium focus:text-brand-600 focus:outline-none">About</RouterLink>
        <div class="mt-2 pt-2 border-t border-slate-100">
          <ScheduleButton />
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, nextTick } from 'vue'
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

// Skip to main content handler
const skipToMain = (e) => {
  e.preventDefault()
  const main = document.getElementById('main-content')
  if (main) {
    main.focus()
    main.scrollIntoView({ behavior: 'smooth' })
  }
}

// Dropdown state mapping for keyboard navigation
const dropdownStates = {
  services: servicesOpen,
  approach: approachOpen,
  practice: practiceOpen,
  groups: groupsOpen
}

// Toggle dropdown
const toggleDropdown = (name) => {
  // Close all other dropdowns
  Object.keys(dropdownStates).forEach(key => {
    if (key !== name) {
      dropdownStates[key].value = false
    }
  })
  // Toggle the requested dropdown
  dropdownStates[name].value = !dropdownStates[name].value
}

// Handle keyboard navigation within dropdowns
const handleDropdownKeydown = (e, dropdownName) => {
  const dropdown = dropdownStates[dropdownName]

  if (e.key === 'Escape') {
    dropdown.value = false
    // Return focus to the button
    e.currentTarget.querySelector('button')?.focus()
    return
  }

  if (!dropdown.value) return

  const menuItems = e.currentTarget.querySelectorAll('[role="menuitem"]')
  if (!menuItems.length) return

  const currentIndex = Array.from(menuItems).findIndex(item => item === document.activeElement)

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    const nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0
    menuItems[nextIndex]?.focus()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1
    menuItems[prevIndex]?.focus()
  } else if (e.key === 'Home') {
    e.preventDefault()
    menuItems[0]?.focus()
  } else if (e.key === 'End') {
    e.preventDefault()
    menuItems[menuItems.length - 1]?.focus()
  } else if (e.key === 'Tab') {
    // Close dropdown when tabbing out
    dropdown.value = false
  }
}
</script>
