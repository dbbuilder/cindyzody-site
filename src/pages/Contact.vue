<template>
  <section class="py-14">
    <div class="mx-auto max-w-3xl px-4">
      <h1 class="text-3xl font-bold">Contact</h1>
      <p class="mt-2 text-slate-600">I offer a complimentary 15-minute consultation. You may also call
        <a href="tel:+12069925992" class="underline">(206) 992-5992</a> or email
        <a href="mailto:cindyzody@gmail.com" class="underline">cindyzody@gmail.com</a>.
      </p>
      <div class="mt-8 rounded-xl border p-6 bg-white">
        <ContactForm />
      </div>
    </div>
  </section>
</template>

<script setup>
import ContactForm from '../components/ContactForm.vue'
</script>