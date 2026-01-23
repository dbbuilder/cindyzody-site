<template>
  <form @submit.prevent="submit" class="space-y-4" aria-label="Contact form">
    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label for="contact-first-name" class="block text-sm font-medium">First name</label>
        <input
          id="contact-first-name"
          v-model="form.firstName"
          type="text"
          required
          autocomplete="given-name"
          class="mt-1 block w-full rounded-md border-slate-300 focus:border-brand-500 focus:ring-brand-500"
        />
      </div>
      <div>
        <label for="contact-last-name" class="block text-sm font-medium">Last name</label>
        <input
          id="contact-last-name"
          v-model="form.lastName"
          type="text"
          required
          autocomplete="family-name"
          class="mt-1 block w-full rounded-md border-slate-300 focus:border-brand-500 focus:ring-brand-500"
        />
      </div>
      <div class="sm:col-span-2">
        <label for="contact-email" class="block text-sm font-medium">Email</label>
        <input
          id="contact-email"
          v-model="form.email"
          type="email"
          required
          autocomplete="email"
          class="mt-1 block w-full rounded-md border-slate-300 focus:border-brand-500 focus:ring-brand-500"
        />
      </div>
      <div class="sm:col-span-2">
        <label for="contact-phone" class="block text-sm font-medium">
          Phone <span class="text-slate-400 font-normal">(optional)</span>
        </label>
        <input
          id="contact-phone"
          v-model="form.phone"
          type="tel"
          autocomplete="tel"
          class="mt-1 block w-full rounded-md border-slate-300 focus:border-brand-500 focus:ring-brand-500"
        />
      </div>
      <div class="sm:col-span-2">
        <label for="contact-message" class="block text-sm font-medium">How can I help?</label>
        <textarea
          id="contact-message"
          v-model="form.message"
          rows="5"
          required
          class="mt-1 block w-full rounded-md border-slate-300 focus:border-brand-500 focus:ring-brand-500"
        ></textarea>
      </div>
      <div class="sm:col-span-2">
        <div class="flex items-start gap-2">
          <input
            id="contact-consent"
            type="checkbox"
            v-model="form.consent"
            required
            class="mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <label for="contact-consent" class="text-sm">
            I consent to be contacted and agree to the <RouterLink to="/privacy" class="text-brand-600 hover:underline">privacy notice</RouterLink>.
          </label>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-4">
      <button
        type="submit"
        :disabled="loading"
        class="inline-flex items-center rounded-md bg-brand-600 px-6 py-3 text-white hover:bg-brand-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      >
        <span v-if="!loading">Send Inquiry</span>
        <span v-else>Sending…</span>
      </button>
      <p v-if="success" class="text-sm text-green-700" role="status" aria-live="polite">Thank you — I will respond shortly.</p>
      <p v-if="error" class="text-sm text-red-700" role="alert">Something went wrong. Please email <a href="mailto:cindyzody@gmail.com" class="underline">cindyzody@gmail.com</a>.</p>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { trackEvent } from '../utils/analytics'
import { csrfFetch } from '../composables/useCsrf'

const form = ref({
  firstName: '', lastName: '', email: '', phone: '', message: '', consent: false
})
const loading = ref(false)
const success = ref(false)
const error = ref(false)

const submit = async () => {
  loading.value = true; success.value = false; error.value = false
  const endpoint = import.meta.env.VITE_CONTACT_API || '/api/contact'
  try {
    const res = await csrfFetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    if (!res.ok) throw new Error('Bad response')
    success.value = true
    trackEvent('lead_submit', { source: 'ContactForm' })
    form.value = { firstName:'', lastName:'', email:'', phone:'', message:'', consent:false }
  } catch (e) {
    console.error(e)
    error.value = true
  } finally {
    loading.value = false
  }
}
</script>