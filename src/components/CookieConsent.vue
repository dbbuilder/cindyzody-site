<template>
  <div v-if="visible" class="fixed bottom-4 inset-x-0 px-4">
    <div class="mx-auto max-w-3xl rounded-lg border bg-white shadow p-4 flex items-start gap-4">
      <div class="text-sm">
        We use cookies/analytics to improve this site. By continuing, you accept our
        <RouterLink to="/privacy" class="underline">privacy policy</RouterLink>.
      </div>
      <div class="ml-auto flex gap-2">
        <button class="rounded-md border px-3 py-1" @click="decline">Decline</button>
        <button class="rounded-md bg-brand-600 text-white px-3 py-1" @click="accept">Accept</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const visible = ref(false)
onMounted(() => { visible.value = !localStorage.getItem('cookie-consent') })
const accept = () => { localStorage.setItem('cookie-consent','1'); visible.value = false }
const decline = () => { localStorage.setItem('cookie-consent','0'); visible.value = false }
</script>