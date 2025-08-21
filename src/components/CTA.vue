<template>
  <section class="py-14 bg-slate-50">
    <div class="mx-auto max-w-5xl px-4 text-center">
      <h2 class="text-3xl font-bold">Ready to Begin a Kinder Conversation?</h2>
      <p class="mt-2 text-slate-600">
        Schedule a complimentary 15-minute consultation to explore your goals.
      </p>
      <RouterLink
        to="/contact"
        @click="clicked"
        class="mt-6 inline-flex items-center rounded-md bg-brand-600 px-6 py-3 text-white hover:bg-brand-700"
      >Start the Conversation</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { trackEvent } from '../utils/analytics'
const clicked = () => trackEvent('lead_click', { where: 'CTA' })
</script>