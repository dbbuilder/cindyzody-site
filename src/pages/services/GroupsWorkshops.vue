<template>
  <section class="py-14">
    <div class="mx-auto max-w-5xl px-4">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm">
        <RouterLink to="/services" class="text-brand-600 hover:text-brand-700">Services</RouterLink>
        <span class="mx-2 text-slate-400">/</span>
        <span class="text-slate-600">Groups & Workshops</span>
      </nav>

      <div class="prose prose-slate max-w-none">
        <h1>Groups & Workshops</h1>

        <p class="lead text-xl text-slate-600">Community learning experiences that combine teaching, practice, and peer support—from introductory workshops to ongoing practice circles.</p>

        <p>There's something powerful about learning in community. Groups create opportunities for practice that individual sessions can't—you get to hear how others express feelings and needs, you practice with different communication styles, and you build a network of people committed to compassionate communication.</p>

        <p>All group offerings integrate the GOFNR framework (Goals, Observation, Feelings, Needs, Request) with hands-on practice, reflection exercises, and real-time feedback in a supportive environment.</p>

        <h2>Current Offerings</h2>

        <div class="space-y-6 my-8">
          <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-brand-700 mb-2">NVC Foundations (4-week series)</h3>
                <p class="text-slate-600 mb-3">A comprehensive introduction to Non-Violent Communication covering all five steps of GOFNR. Each week focuses on one or two components with plenty of practice time.</p>
                <div class="text-sm text-slate-500">
                  <strong>Format:</strong> 2-hour sessions, weekly for 4 weeks<br>
                  <strong>Size:</strong> 6-12 participants<br>
                  <strong>Best for:</strong> NVC beginners wanting a solid foundation
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-green-700 mb-2">Mindful Communication Lab (Monthly drop-in)</h3>
                <p class="text-slate-600 mb-3">Ongoing practice sessions where you can refine your skills in a supportive environment. Bring real situations to work through with peer support and facilitation.</p>
                <div class="text-sm text-slate-500">
                  <strong>Format:</strong> 90-minute sessions, monthly<br>
                  <strong>Size:</strong> 4-10 participants<br>
                  <strong>Best for:</strong> Anyone with basic NVC knowledge wanting practice
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-purple-700 mb-2">Repair After Conflict (1-day retreat)</h3>
                <p class="text-slate-600 mb-3">Intensive workshop focused on healing relationships after difficult conflicts. Learn restorative dialogue processes and practice with real situations in a safe container.</p>
                <div class="text-sm text-slate-500">
                  <strong>Format:</strong> Full day (6 hours with breaks)<br>
                  <strong>Size:</strong> 8-16 participants<br>
                  <strong>Best for:</strong> Those wanting to heal past hurts and rebuild trust
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2>Custom Workshops</h2>

        <p>I also design custom workshops for organizations, communities, and groups with specific needs. Popular topics include:</p>

        <ul>
          <li>Introduction to NVC for teams</li>
          <li>Giving and receiving feedback with empathy</li>
          <li>Difficult conversations: Preparation and practice</li>
          <li>Conflict transformation for communities</li>
          <li>Self-compassion and inner critic work</li>
        </ul>

        <div class="bg-brand-50 rounded-xl p-8 border border-brand-200 my-8">
          <h3 class="font-semibold text-lg text-slate-900 mb-3">Join Our Community</h3>
          <p class="text-slate-600 mb-4">Get notified about upcoming groups and workshops. Mention "Groups" in your message to join our interest list.</p>
          <RouterLink to="/contact" class="inline-flex items-center bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors font-medium">
            Join Interest List
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
