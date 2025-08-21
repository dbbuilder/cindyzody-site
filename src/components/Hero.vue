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
          <ul class="space-y-3 text-slate-700">
            <li>• NVC / IFS — Individual & Group Facilitator</li>
            <li>• M.Ed. Curriculum & Instruction</li>
            <li>• Attitudinal Healing</li>
            <li>• Serving Seattle, WA and Remote Clients</li>
          </ul>
          <div class="mt-6 rounded-lg bg-rose-50 p-4 text-sm">
            <strong>Direct:</strong> <a href="tel:+12069925992" class="hover:text-brand-600">(206) 992-5992</a><br />            <strong>Alt:</strong> <a href="tel:+14254861103" class="hover:text-brand-600">(425) 486-1103</a><br />
            <strong>Email:</strong> <a href="mailto:cindyzody@gmail.com" class="hover:text-brand-600">cindyzody@gmail.com</a>
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