<template>
  <section class="py-14">
    <div class="mx-auto max-w-5xl px-4">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm">
        <RouterLink to="/groups" class="text-brand-600 hover:text-brand-700">Groups</RouterLink>
        <span class="mx-2 text-slate-400">/</span>
        <span class="text-slate-600">Mindful Communication Lab</span>
      </nav>

      <!-- Hero -->
      <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12 mb-12 border border-emerald-100">
        <div class="flex items-start gap-6">
          <div class="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <LightBulbIcon class="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <div class="text-sm font-medium text-emerald-600 mb-2">Ongoing Drop-In Practice</div>
            <h1 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Mindful Communication Lab</h1>
            <p class="text-lg text-slate-600 max-w-2xl">
              A supportive space to practice NVC skills with real-life scenarios.
              Drop in whenever you need to refine your approach or work through a challenging situation.
            </p>
          </div>
        </div>
      </div>

      <!-- Format Overview -->
      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white rounded-xl border p-6 text-center">
          <div class="text-3xl font-bold text-emerald-600 mb-2">90</div>
          <div class="text-slate-600">Minutes per Session</div>
        </div>
        <div class="bg-white rounded-xl border p-6 text-center">
          <div class="text-3xl font-bold text-emerald-600 mb-2">2x</div>
          <div class="text-slate-600">Monthly Sessions</div>
        </div>
        <div class="bg-white rounded-xl border p-6 text-center">
          <div class="text-3xl font-bold text-emerald-600 mb-2">6-10</div>
          <div class="text-slate-600">Participants</div>
        </div>
      </div>

      <!-- What to Expect -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6">What to Expect</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl border p-6">
            <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <UserGroupIcon class="w-5 h-5 text-emerald-600" />
            </div>
            <h3 class="font-semibold text-lg mb-2">Peer Learning Circles</h3>
            <p class="text-slate-600">
              Small groups where everyone has the opportunity to practice, receive feedback,
              and learn from each other's experiences. No judgment, just growth.
            </p>
          </div>

          <div class="bg-white rounded-xl border p-6">
            <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <ChatBubbleLeftRightIcon class="w-5 h-5 text-emerald-600" />
            </div>
            <h3 class="font-semibold text-lg mb-2">Real Scenario Practice</h3>
            <p class="text-slate-600">
              Bring your actual situations—a difficult conversation at work, a family conflict,
              a request you need to make—and practice before the real thing.
            </p>
          </div>

          <div class="bg-white rounded-xl border p-6">
            <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <SparklesIcon class="w-5 h-5 text-emerald-600" />
            </div>
            <h3 class="font-semibold text-lg mb-2">Mindfulness Integration</h3>
            <p class="text-slate-600">
              Each session begins with a brief centering practice to help you arrive present
              and open. Learn to bring this same presence to difficult conversations.
            </p>
          </div>

          <div class="bg-white rounded-xl border p-6">
            <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <ArrowPathIcon class="w-5 h-5 text-emerald-600" />
            </div>
            <h3 class="font-semibold text-lg mb-2">Flexible Attendance</h3>
            <p class="text-slate-600">
              Come when you can. There's no commitment required—drop in when you need practice
              or community support. Each session stands alone.
            </p>
          </div>
        </div>
      </div>

      <!-- Session Structure -->
      <div class="bg-emerald-50 rounded-xl p-8 mb-12 border border-emerald-200">
        <h2 class="text-2xl font-bold mb-6">Typical Session Structure</h2>
        <div class="space-y-4">
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-sm font-medium text-emerald-800">1</span>
            </div>
            <div>
              <div class="font-medium">Opening Circle (10 min)</div>
              <div class="text-sm text-slate-600">Brief mindfulness practice and check-in</div>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-sm font-medium text-emerald-800">2</span>
            </div>
            <div>
              <div class="font-medium">Skill Focus (15 min)</div>
              <div class="text-sm text-slate-600">Brief teaching on one aspect of GOFNR</div>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-sm font-medium text-emerald-800">3</span>
            </div>
            <div>
              <div class="font-medium">Practice Rounds (55 min)</div>
              <div class="text-sm text-slate-600">Role-play, empathy practice, or scenario work</div>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-sm font-medium text-emerald-800">4</span>
            </div>
            <div>
              <div class="font-medium">Closing Integration (10 min)</div>
              <div class="text-sm text-slate-600">Reflections and intentions for the week</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Who It's For -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6">Who This Is For</h2>
        <div class="bg-white rounded-xl border p-6">
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <CheckCircleIcon class="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Anyone who has taken NVC Foundations or has basic NVC knowledge</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircleIcon class="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>People who learn best through practice rather than theory</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircleIcon class="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Those preparing for a specific difficult conversation</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircleIcon class="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Anyone seeking community support in their NVC journey</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- CTA -->
      <div class="bg-white rounded-xl border shadow-sm p-8 text-center">
        <h2 class="text-2xl font-bold mb-3">Ready to Practice?</h2>
        <p class="text-slate-600 max-w-2xl mx-auto mb-6">
          Join our practice community and build your skills with supportive peers.
          Mention "Communication Lab" when you reach out.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <RouterLink
            to="/contact"
            class="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            Join Interest List
          </RouterLink>
          <RouterLink
            to="/groups"
            class="inline-flex items-center border border-slate-300 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors"
          >
            View All Groups
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  LightBulbIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  ArrowPathIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'
</script>
