<template>
  <Hero />
  <section class="py-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
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
  </section>
  <CTA />
</template>

<script setup>
import Hero from '../components/Hero.vue'
import CTA from '../components/CTA.vue'
</script>