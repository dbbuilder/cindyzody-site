<template>
  <section class="py-14">
    <div class="mx-auto max-w-5xl px-4">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm">
        <RouterLink to="/groups" class="text-brand-600 hover:text-brand-700">Groups</RouterLink>
        <span class="mx-2 text-slate-400">/</span>
        <span class="text-slate-600">NVC Foundations</span>
      </nav>

      <!-- Hero -->
      <div class="bg-gradient-to-br from-brand-50 to-sage-50 rounded-2xl p-8 md:p-12 mb-12 border border-brand-100">
        <div class="flex items-start gap-6">
          <div class="w-16 h-16 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <BookOpenIcon class="w-8 h-8 text-brand-600" />
          </div>
          <div>
            <div class="text-sm font-medium text-brand-600 mb-2">4-Week Series</div>
            <h1 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">NVC Foundations</h1>
            <p class="text-lg text-slate-600 max-w-2xl">
              Build a strong foundation in Non-Violent Communication through the GOFNR process.
              Learn to communicate with clarity, compassion, and connection in every conversation.
            </p>
          </div>
        </div>
      </div>

      <!-- Course Overview -->
      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white rounded-xl border p-6 text-center">
          <div class="text-3xl font-bold text-brand-600 mb-2">4</div>
          <div class="text-slate-600">Weeks</div>
        </div>
        <div class="bg-white rounded-xl border p-6 text-center">
          <div class="text-3xl font-bold text-brand-600 mb-2">2</div>
          <div class="text-slate-600">Hours per Session</div>
        </div>
        <div class="bg-white rounded-xl border p-6 text-center">
          <div class="text-3xl font-bold text-brand-600 mb-2">8-12</div>
          <div class="text-slate-600">Participants</div>
        </div>
      </div>

      <!-- Week by Week -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6">Week-by-Week Curriculum</h2>
        <div class="space-y-4">
          <div class="bg-white rounded-xl border p-6">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="font-bold text-amber-700">G</span>
              </div>
              <div>
                <h3 class="font-semibold text-lg mb-2">Week 1: Goals — Setting Your Intention</h3>
                <p class="text-slate-600 mb-3">
                  Before any conversation, get clear on what you truly want. Learn to distinguish between
                  outcome goals and process goals, and discover how clarity creates confidence.
                </p>
                <ul class="text-sm text-slate-500 space-y-1">
                  <li>• Identifying what would feel satisfying</li>
                  <li>• Connection vs. outcome goals</li>
                  <li>• Creating your conversation anchor</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl border p-6">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="font-bold text-brand-700">O</span>
              </div>
              <div>
                <h3 class="font-semibold text-lg mb-2">Week 2: Observation — Seeing Without Judgment</h3>
                <p class="text-slate-600 mb-3">
                  Learn to describe what you see and hear without adding interpretation or evaluation.
                  This skill alone can transform how others receive your message.
                </p>
                <ul class="text-sm text-slate-500 space-y-1">
                  <li>• The camera test for observations</li>
                  <li>• Removing "always," "never," and labels</li>
                  <li>• Practice with real scenarios</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl border p-6">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="font-bold text-rose-700">F+N</span>
              </div>
              <div>
                <h3 class="font-semibold text-lg mb-2">Week 3: Feelings & Needs — The Heart of NVC</h3>
                <p class="text-slate-600 mb-3">
                  Discover the universal human needs beneath every emotion. Learn to express feelings
                  authentically and identify the needs driving your reactions.
                </p>
                <ul class="text-sm text-slate-500 space-y-1">
                  <li>• Feelings vs. "faux feelings" (thoughts disguised as feelings)</li>
                  <li>• The universal needs list</li>
                  <li>• Connecting feelings to unmet needs</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl border p-6">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="font-bold text-indigo-700">R</span>
              </div>
              <div>
                <h3 class="font-semibold text-lg mb-2">Week 4: Request — Making Clear Asks</h3>
                <p class="text-slate-600 mb-3">
                  Transform complaints into requests. Learn the difference between demands and requests,
                  and how to make asks that invite collaboration rather than resistance.
                </p>
                <ul class="text-sm text-slate-500 space-y-1">
                  <li>• Requests vs. demands</li>
                  <li>• Specific, doable, positive language</li>
                  <li>• Hearing "no" as an unmet need</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- What You'll Gain -->
      <div class="bg-sage-50 rounded-xl p-8 mb-12 border border-sage-200">
        <h2 class="text-2xl font-bold mb-6">What You'll Gain</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="flex items-start gap-3">
            <CheckCircleIcon class="w-6 h-6 text-sage-600 flex-shrink-0 mt-0.5" />
            <div>
              <div class="font-medium">Clarity in difficult conversations</div>
              <div class="text-sm text-slate-600">Know what you want before you speak</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <CheckCircleIcon class="w-6 h-6 text-sage-600 flex-shrink-0 mt-0.5" />
            <div>
              <div class="font-medium">Reduced conflict escalation</div>
              <div class="text-sm text-slate-600">Express yourself without triggering defensiveness</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <CheckCircleIcon class="w-6 h-6 text-sage-600 flex-shrink-0 mt-0.5" />
            <div>
              <div class="font-medium">Deeper self-awareness</div>
              <div class="text-sm text-slate-600">Understand what's really driving your reactions</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <CheckCircleIcon class="w-6 h-6 text-sage-600 flex-shrink-0 mt-0.5" />
            <div>
              <div class="font-medium">A supportive community</div>
              <div class="text-sm text-slate-600">Practice with others on the same journey</div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="bg-white rounded-xl border shadow-sm p-8 text-center">
        <h2 class="text-2xl font-bold mb-3">Ready to Build Your Foundation?</h2>
        <p class="text-slate-600 max-w-2xl mx-auto mb-6">
          Join our next cohort and start transforming your communication. Mention "NVC Foundations"
          when you reach out.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <RouterLink
            to="/contact"
            class="inline-flex items-center bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors font-medium"
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
import { BookOpenIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
</script>
