<template>
  <form @submit.prevent="submit" class="space-y-4">
    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label class="block text-sm font-medium">First name</label>
        <input v-model="form.firstName" required class="mt-1 block w-full rounded-md border-slate-300" />
      </div>
      <div>
        <label class="block text-sm font-medium">Last name</label>
        <input v-model="form.lastName" required class="mt-1 block w-full rounded-md border-slate-300" />
      </div>
      <div class="sm:col-span-2">
        <label class="block text-sm font-medium">Email</label>
        <input v-model="form.email" type="email" required class="mt-1 block w-full rounded-md border-slate-300" />
      </div>
      <div class="sm:col-span-2">
        <label class="block text-sm font-medium">Phone (optional)</label>
        <input v-model="form.phone" class="mt-1 block w-full rounded-md border-slate-300" />
      </div>
      <div class="sm:col-span-2">
        <label class="block text-sm font-medium">How can I help?</label>
        <textarea v-model="form.message" rows="5" required class="mt-1 block w-full rounded-md border-slate-300"></textarea>
      </div>
      <div class="sm:col-span-2">
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="form.consent" required class="rounded border-slate-300" />
          <span class="text-sm">I consent to be contacted and agree to the privacy notice.</span>
        </label>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <button
        type="submit"
        :disabled="loading"
        class="inline-flex items-center rounded-md bg-brand-600 px-6 py-3 text-white hover:bg-brand-700 disabled:opacity-50"
      >        <span v-if="!loading">Send Inquiry</span>
        <span v-else>Sending…</span>
      </button>
      <p v-if="success" class="text-sm text-green-700">Thank you — I will respond shortly.</p>
      <p v-if="error" class="text-sm text-red-700">Something went wrong. Please email <a href="mailto:cindyzody@gmail.com" class="underline">cindyzody@gmail.com</a>.</p>
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