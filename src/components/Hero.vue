<template>
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-rose-50 to-white"></div>
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div class="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Compassionate Communication & Mindfulness Coaching
          </h1>
          <p class="mt-5 text-lg text-slate-700 max-w-prose">
            NVC/IFS individual & group facilitation, attitudinal healing, and practical
            mindfulness for relationships at home, at work, and within.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <RouterLink
              to="/contact"
              @click="cta"
              class="inline-flex items-center rounded-md bg-brand-600 px-6 py-3 text-white hover:bg-brand-700"
            >Book a Free 15-minute Call</RouterLink>
            <RouterLink to="/services" class="inline-flex items-center rounded-md border px-6 py-3">
              Explore Services
            </RouterLink>
          </div>
          <p class="mt-4 text-sm text-slate-600">"Creating healing relationships — one moment at a time."</p>
        </div>
        <div class="rounded-xl border bg-white/70 backdrop-blur p-6 shadow-sm">
          <div class="grid grid-cols-1 gap-4 mb-6">
            <div class="flex items-center gap-3 p-3 rounded-lg bg-white/50">
              <div class="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <span class="text-slate-700 font-medium">NVC / IFS — Individual & Group Facilitator</span>
            </div>
            <div class="flex items-center gap-3 p-3 rounded-lg bg-white/50">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <span class="text-slate-700 font-medium">M.Ed. Curriculum & Instruction</span>
            </div>
            <div class="flex items-center gap-3 p-3 rounded-lg bg-white/50">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <span class="text-slate-700 font-medium">Attitudinal Healing</span>
            </div>
            <div class="flex items-center gap-3 p-3 rounded-lg bg-white/50">
              <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <span class="text-slate-700 font-medium">Serving Seattle, WA and Remote Clients</span>
            </div>
          </div>
          <div class="rounded-lg bg-rose-50 p-4 text-sm border border-rose-100">
            <div class="grid grid-cols-1 gap-2">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <strong>Direct:</strong> <a href="tel:+12069925992" class="hover:text-brand-600">(206) 992-5992</a>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <strong>Email:</strong> <a href="mailto:cindyzody@gmail.com" class="hover:text-brand-600">cindyzody@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { trackEvent } from '../utils/analytics'
const cta = () => trackEvent('lead_click', { where: 'Hero' })
</script>