<template>
  <section class="py-14">
    <div class="mx-auto max-w-5xl px-4">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold">Groups & Workshops</h1>
        <p class="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Quarterly practice groups and custom organizational workshops available. 
          Experience the power of community learning and shared growth.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <!-- NVC Foundations -->
        <div class="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-3">NVC Foundations</h3>
          <p class="text-sm text-slate-500 mb-4">4-week series</p>
          <p class="text-slate-700 mb-4">
            Learn the four steps of Nonviolent Communication through interactive exercises, 
            role-playing, and group reflection.
          </p>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-brand-500 rounded-full"></div>
              <span class="text-sm">Observation without evaluation</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-brand-500 rounded-full"></div>
              <span class="text-sm">Feelings and needs awareness</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-brand-500 rounded-full"></div>
              <span class="text-sm">Clear requests and boundaries</span>
            </div>
          </div>
        </div>

        <!-- Mindful Communication Lab -->
        <div class="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-3">Mindful Communication Lab</h3>
          <p class="text-sm text-slate-500 mb-4">Drop-in practice</p>
          <p class="text-slate-700 mb-4">
            Ongoing practice sessions where you can refine your skills in a supportive, 
            non-judgmental environment with peers.
          </p>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span class="text-sm">Peer learning circles</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span class="text-sm">Real-life scenario practice</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span class="text-sm">Mindfulness integration</span>
            </div>
          </div>
        </div>

        <!-- Repair After Conflict -->
        <div class="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-3">Repair After Conflict</h3>
          <p class="text-sm text-slate-500 mb-4">1-day retreat</p>
          <p class="text-slate-700 mb-4">
            Intensive workshop focused on healing relationships after difficult conflicts 
            and rebuilding trust through restorative dialogue.
          </p>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
              <span class="text-sm">Restorative dialogue process</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
              <span class="text-sm">Trust rebuilding strategies</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
              <span class="text-sm">Emotional healing practices</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Interest List CTA -->
      <div class="bg-gradient-to-br from-brand-50 to-rose-50 rounded-xl p-8 text-center border">
        <h2 class="text-2xl font-semibold mb-3">Join Our Community</h2>
        <p class="text-slate-600 max-w-2xl mx-auto mb-6">
          Get notified about upcoming group sessions, workshops, and practice opportunities. 
          Mention "Group" in your message to join our interest list.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <RouterLink 
            to="/contact" 
            class="inline-flex items-center bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors font-medium"
          >
            Join Interest List
          </RouterLink>
          <RouterLink 
            to="/practice"
            class="inline-flex items-center border border-slate-300 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Try AI Practice
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>