<template>
  <Hero />
  <section class="py-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- AI Practice Feature -->
      <div class="bg-gradient-to-r from-brand-50 to-rose-50 rounded-2xl p-8 mb-12 border">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div class="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              New: AI-Powered Practice
            </div>
            <h2 class="text-2xl font-bold mb-3">Practice NVC with AI Guidance</h2>
            <p class="text-slate-700 mb-4">
              Our AI facilitator provides 24/7 practice opportunities, guiding you through real NVC conversations 
              and offering personalized feedback in a safe, judgment-free environment.
            </p>
            <RouterLink 
              to="/practice" 
              class="inline-flex items-center bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors font-medium"
            >
              Try AI Practice
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </RouterLink>
          </div>
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-sm">AI Facilitator</h3>
                <p class="text-xs text-slate-500">Ready to guide you</p>
              </div>
            </div>
            <div class="space-y-2 text-sm">
              <div class="bg-slate-50 rounded-lg p-3">
                <p class="text-slate-700">"Let's practice expressing your needs clearly. What situation would you like to work through?"</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Service Cards -->
      <div class="grid md:grid-cols-3 gap-8">
        <div class="p-6 rounded-xl border">
          <h3 class="font-semibold text-lg">Individuals</h3>
          <p class="mt-2 text-sm text-slate-700">Cultivate self-connection, resilience, and communication skills rooted in needs and values.</p>
        </div>
        <div class="p-6 rounded-xl border">
          <h3 class="font-semibold text-lg">Couples & Families</h3>
          <p class="mt-2 text-sm text-slate-700">Move from reactivity to empathy, develop shared understanding, and repair trust.</p>
        </div>
        <div class="p-6 rounded-xl border">
          <h3 class="font-semibold text-lg">Organizations</h3>
          <p class="mt-2 text-sm text-slate-700">Workshops and coaching for compassionate cultures, conflict resolution, and collaborative teams.</p>
        </div>
      </div>
    </div>
  </section>
  <CTA />
</template>

<script setup>
import Hero from '../components/Hero.vue'
import CTA from '../components/CTA.vue'
</script>