<template>
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-3">
          <img src="/src/assets/logo.svg" class="h-9 w-auto" alt="Logo" />
          <span class="font-semibold tracking-tight">Cindy Zody</span>
          <span class="hidden sm:inline text-slate-500">— Communications Practitioner</span>
        </RouterLink>
        <nav class="hidden md:flex items-center gap-6">
          <RouterLink class="hover:text-brand-600" to="/services">Services</RouterLink>
          <RouterLink class="hover:text-brand-600" to="/approach">Approach</RouterLink>
          <RouterLink class="hover:text-brand-600" to="/groups">Groups</RouterLink>
          <RouterLink class="hover:text-brand-600" to="/resources">Resources</RouterLink>
          <RouterLink class="hover:text-brand-600" to="/about">About</RouterLink>
          <RouterLink
            class="inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
            to="/contact"
            @click="emitLead('HeaderCTA')"
          >Book a Free 15-min Call</RouterLink>
        </nav>
        <button class="md:hidden inline-flex items-center p-2" @click="open = !open" aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="open" class="md:hidden border-t border-slate-100">
      <div class="px-4 py-3 flex flex-col gap-3">
        <RouterLink @click="open=false" to="/services">Services</RouterLink>
        <RouterLink @click="open=false" to="/approach">Approach</RouterLink>
        <RouterLink @click="open=false" to="/groups">Groups</RouterLink>
        <RouterLink @click="open=false" to="/resources">Resources</RouterLink>
        <RouterLink @click="open=false" to="/about">About</RouterLink>        <RouterLink
          class="mt-2 inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2 text-white"
          @click="emitLead('HeaderCTA-Mobile')"
          to="/contact"
        >Free 15-min Call</RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { trackEvent } from '../utils/analytics'
const open = ref(false)
const emitLead = (where) => trackEvent('lead_click', { where })
</script>