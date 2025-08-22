<template>
  <section class="py-14">
    <div class="mx-auto max-w-6xl px-4">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">AI-Powered NVC Practice</h1>
        <p class="text-lg text-slate-600 max-w-3xl mx-auto">
          Practice Nonviolent Communication with our AI facilitator. Get real-time guidance 
          through NVC steps, receive personalized feedback, and develop empathic communication skills 
          in a safe, judgment-free environment.
        </p>
      </div>

      <!-- NVC AI Tool Card -->
      <div class="bg-gradient-to-br from-brand-50 to-rose-50 rounded-2xl p-8 mb-12 border">
        <div class="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div class="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              AI-Powered
            </div>
            <h2 class="text-3xl font-bold mb-4">NVC AI Facilitator</h2>
            <p class="text-slate-700 mb-6">
              An intelligent conversation partner that guides you through the four steps of NVC: 
              observation, feelings, needs, and requests. Perfect for practicing difficult conversations 
              before they happen or processing conflicts after they occur.
            </p>
            
            <div class="space-y-3 mb-6">
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-brand-500 rounded-full"></div>
                <span class="text-sm">Step-by-step NVC guidance</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-brand-500 rounded-full"></div>
                <span class="text-sm">Real-time empathy and feedback</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-brand-500 rounded-full"></div>
                <span class="text-sm">Practice conversations safely</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-brand-500 rounded-full"></div>
                <span class="text-sm">Available 24/7 for practice</span>
              </div>
            </div>

            <div class="flex flex-wrap gap-4">
              <button
                @click="openNVCAI"
                class="inline-flex items-center bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors font-medium"
              >
                Start Practice Session
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </button>
              <button
                @click="showDemo = !showDemo"
                class="inline-flex items-center border border-slate-300 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {{ showDemo ? 'Hide' : 'View' }} Demo
              </button>
            </div>
          </div>

          <div class="relative">
            <div class="bg-white rounded-xl shadow-lg p-6 border">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold">AI Facilitator</h3>
                  <p class="text-xs text-slate-500">Online now</p>
                </div>
              </div>
              <div class="space-y-3 text-sm">
                <div class="bg-slate-50 rounded-lg p-3">
                  <p class="text-slate-700">Hello! I'm here to help you practice NVC. What situation would you like to work through today?</p>
                </div>
                <div class="bg-brand-50 rounded-lg p-3 ml-8">
                  <p class="text-slate-700">I had a conflict with my colleague about a project deadline...</p>
                </div>
                <div class="bg-slate-50 rounded-lg p-3">
                  <p class="text-slate-700">Let's start with observation. Can you describe what specifically happened without evaluation or judgment?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Demo Section -->
      <div v-if="showDemo" class="mb-12 transition-all duration-300">
        <div class="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div class="p-6 bg-slate-50 border-b">
            <h3 class="font-semibold text-lg">Interactive Demo</h3>
            <p class="text-slate-600 text-sm mt-1">See the NVC AI Facilitator in action</p>
          </div>
          <div class="aspect-video bg-slate-100 flex items-center justify-center">
            <iframe 
              :src="nvcaiUrl" 
              class="w-full h-full"
              frameborder="0"
              title="NVC AI Facilitator Demo"
            ></iframe>
          </div>
        </div>
      </div>

      <!-- How It Works Section -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold text-center mb-8">How It Works</h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-blue-600 font-bold">1</span>
            </div>
            <h3 class="font-semibold mb-2">Share Your Situation</h3>
            <p class="text-sm text-slate-600">Describe a conflict or communication challenge you're facing.</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-green-600 font-bold">2</span>
            </div>
            <h3 class="font-semibold mb-2">Follow NVC Steps</h3>
            <p class="text-sm text-slate-600">AI guides you through observation, feelings, needs, and requests.</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-purple-600 font-bold">3</span>
            </div>
            <h3 class="font-semibold mb-2">Receive Feedback</h3>
            <p class="text-sm text-slate-600">Get personalized insights and suggestions for improvement.</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-orange-600 font-bold">4</span>
            </div>
            <h3 class="font-semibold mb-2">Practice & Improve</h3>
            <p class="text-sm text-slate-600">Build confidence through repeated practice in a safe environment.</p>
          </div>
        </div>
      </div>

      <!-- Benefits Section -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold text-center mb-8">Why Use AI Practice?</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl border p-6">
            <div class="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="font-semibold mb-2">Available 24/7</h3>
            <p class="text-sm text-slate-600">Practice whenever you need it, without scheduling appointments.</p>
          </div>
          <div class="bg-white rounded-xl border p-6">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="font-semibold mb-2">Safe Environment</h3>
            <p class="text-sm text-slate-600">Practice without fear of judgment or making mistakes.</p>
          </div>
          <div class="bg-white rounded-xl border p-6">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <h3 class="font-semibold mb-2">Personalized Learning</h3>
            <p class="text-sm text-slate-600">AI adapts to your communication style and learning pace.</p>
          </div>
          <div class="bg-white rounded-xl border p-6">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="font-semibold mb-2">Builds Empathy</h3>
            <p class="text-sm text-slate-600">Develop deeper understanding of yourself and others.</p>
          </div>
          <div class="bg-white rounded-xl border p-6">
            <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="font-semibold mb-2">Instant Insights</h3>
            <p class="text-sm text-slate-600">Get immediate feedback and suggestions for improvement.</p>
          </div>
          <div class="bg-white rounded-xl border p-6">
            <div class="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
              </svg>
            </div>
            <h3 class="font-semibold mb-2">Complement Coaching</h3>
            <p class="text-sm text-slate-600">Perfect supplement to one-on-one sessions with Cindy.</p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-slate-50 rounded-xl p-8 text-center">
        <h3 class="font-semibold text-lg mb-3">Ready to Transform Your Communication?</h3>
        <p class="text-slate-600 max-w-2xl mx-auto mb-6">
          Combine AI practice with personalized coaching for accelerated learning. 
          The AI tool helps you practice between sessions, while I provide deeper insights and support.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <button
            @click="openNVCAI"
            class="inline-flex items-center bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors font-medium"
          >
            Try AI Practice Now
          </button>
          <RouterLink 
            to="/contact" 
            class="inline-flex items-center border border-slate-300 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Schedule Human Coaching
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { trackEvent } from '../utils/analytics'

const showDemo = ref(false)

const nvcaiUrl = computed(() => {
  return import.meta.env.VITE_NVCAI_URL || 'https://nvcai-production-c10a.up.railway.app'
})

const openNVCAI = () => {
  trackEvent('nvcai_click', { source: 'practice_page' })
  window.open(nvcaiUrl.value, '_blank', 'noopener,noreferrer')
}
</script>