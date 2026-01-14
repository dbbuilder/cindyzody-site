<template>
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-3">
          <img src="/logo.png" class="h-9 w-auto" alt="Cindy Zody Logo" />
          <span class="font-semibold tracking-tight">Cindy Zody</span>
          <span class="hidden sm:inline text-slate-500">— Communications Practitioner</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-6">
          <RouterLink class="hover:text-brand-600" to="/services">Services</RouterLink>
          <RouterLink class="hover:text-brand-600" to="/approach">Approach</RouterLink>
          <RouterLink class="hover:text-brand-600" to="/practice">Practice</RouterLink>
          <RouterLink class="hover:text-brand-600" to="/groups">Groups</RouterLink>
          <RouterLink class="hover:text-brand-600" to="/resources">Resources</RouterLink>
          <RouterLink class="hover:text-brand-600" to="/about">About</RouterLink>
          <UserMenu @openAuth="showAuthModal = true" />
        </nav>

        <!-- Mobile menu button -->
        <div class="flex items-center gap-3 md:hidden">
          <UserMenu @openAuth="showAuthModal = true" />
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
      <div class="px-4 py-3 flex flex-col gap-3">
        <RouterLink @click="open=false" to="/services">Services</RouterLink>
        <RouterLink @click="open=false" to="/approach">Approach</RouterLink>
        <RouterLink @click="open=false" to="/practice">Practice</RouterLink>
        <RouterLink @click="open=false" to="/groups">Groups</RouterLink>
        <RouterLink @click="open=false" to="/resources">Resources</RouterLink>
        <RouterLink @click="open=false" to="/about">About</RouterLink>
        <div class="mt-2 pt-2 border-t border-slate-100">
          <ScheduleButton />
        </div>
      </div>
    </div>
  </header>

  <!-- Auth Modal -->
  <AuthModal
    :isOpen="showAuthModal"
    @close="showAuthModal = false"
    @authenticated="handleAuthenticated"
    @guest="handleGuest"
  />
</template>

<script setup>
import { ref } from 'vue'
import { trackEvent } from '../utils/analytics'
import ScheduleButton from './ScheduleButton.vue'
import { UserMenu, AuthModal } from './auth'

const open = ref(false)
const showAuthModal = ref(false)

function handleAuthenticated() {
  trackEvent('auth_success', { method: 'email' })
}

function handleGuest() {
  trackEvent('auth_guest')
}
</script>
