<template>
  <section class="py-14">
    <div class="mx-auto max-w-4xl px-4">
      <h1 class="text-3xl font-bold">Contact</h1>
      <p class="mt-2 text-slate-600">Schedule a consultation or send me a message. You may also call
        <a href="tel:+12069925992" class="underline">(206) 992-5992</a> or email
        <a href="mailto:cindyzody@gmail.com" class="underline">cindyzody@gmail.com</a>.
      </p>

      <div class="mt-8 grid md:grid-cols-2 gap-8">
        <!-- Scheduling Section -->
        <div class="rounded-xl border border-brand-200 p-6 bg-brand-50">
          <h2 class="text-xl font-semibold mb-4 text-brand-800">Schedule Appointment</h2>
          <p class="text-slate-600 mb-4">
            Book a session directly through our scheduling system. Choose from individual or couple sessions.
          </p>
          <ScheduleAppointment variant="inline" />
        </div>

        <!-- Contact Form Section -->
        <div class="rounded-xl border border-brand-200 p-6 bg-white">
          <h2 class="text-xl font-semibold mb-4 text-brand-800">Send a Message</h2>
          <p class="text-slate-600 mb-4">
            Have questions? Send me a message and I'll get back to you soon.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ContactForm from '../components/ContactForm.vue'
import ScheduleAppointment from '../components/ScheduleAppointment.vue'
</script>