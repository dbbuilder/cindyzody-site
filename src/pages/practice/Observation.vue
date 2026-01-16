<template>
  <section class="py-14">
    <div class="mx-auto max-w-5xl px-4">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm">
        <RouterLink to="/practice" class="text-brand-600 hover:text-brand-700">Practice</RouterLink>
        <span class="mx-2 text-slate-400">/</span>
        <span class="text-slate-600">Observation</span>
      </nav>

      <div class="prose prose-slate max-w-none">
        <h1>Observation: Seeing Without Judging</h1>

        <p class="lead text-xl text-slate-600">The first step of the NVC process is describing what you actually see or hear—the concrete facts—without mixing in evaluation, interpretation, or judgment.</p>

        <p>This sounds simple. It's not. Our minds are meaning-making machines. We see someone frown and think "they're angry." We hear a tone of voice and think "they're being dismissive." But these are interpretations, not observations. The observation is just the frown, just the tone. What it means is a separate question.</p>

        <p>Why does this matter? Because when we start a conversation with evaluation, the other person often hears criticism and becomes defensive. "You're always late" triggers a very different response than "I noticed you arrived 20 minutes after our agreed time." The second opens dialogue; the first closes it.</p>

        <h2>Observation vs. Evaluation</h2>

        <div class="space-y-4 my-8 not-prose">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-red-50 rounded-xl p-5 border border-red-200">
              <div class="text-sm font-medium text-red-700 mb-2">Evaluation (mixed)</div>
              <p class="text-slate-700">"You never listen to me."</p>
            </div>
            <div class="bg-green-50 rounded-xl p-5 border border-green-200">
              <div class="text-sm font-medium text-green-700 mb-2">Observation (pure)</div>
              <p class="text-slate-700">"When I was speaking, you looked at your phone three times."</p>
            </div>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-red-50 rounded-xl p-5 border border-red-200">
              <div class="text-sm font-medium text-red-700 mb-2">Evaluation (mixed)</div>
              <p class="text-slate-700">"You're being selfish about this."</p>
            </div>
            <div class="bg-green-50 rounded-xl p-5 border border-green-200">
              <div class="text-sm font-medium text-green-700 mb-2">Observation (pure)</div>
              <p class="text-slate-700">"When I asked if you could pick up the kids, you said no."</p>
            </div>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-red-50 rounded-xl p-5 border border-red-200">
              <div class="text-sm font-medium text-red-700 mb-2">Evaluation (mixed)</div>
              <p class="text-slate-700">"You did a terrible job on this report."</p>
            </div>
            <div class="bg-green-50 rounded-xl p-5 border border-green-200">
              <div class="text-sm font-medium text-green-700 mb-2">Observation (pure)</div>
              <p class="text-slate-700">"I found three factual errors in the report and the deadline was missed by two days."</p>
            </div>
          </div>
        </div>

        <h2>Common Evaluation Words to Watch For</h2>

        <div class="bg-slate-50 rounded-xl p-6 border my-8">
          <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div class="font-semibold text-slate-700 mb-2">Frequency words</div>
              <p class="text-slate-600">always, never, constantly, rarely</p>
            </div>
            <div>
              <div class="font-semibold text-slate-700 mb-2">Character labels</div>
              <p class="text-slate-600">lazy, selfish, rude, aggressive</p>
            </div>
            <div>
              <div class="font-semibold text-slate-700 mb-2">Quality judgments</div>
              <p class="text-slate-600">good, bad, right, wrong, stupid</p>
            </div>
            <div>
              <div class="font-semibold text-slate-700 mb-2">Comparative words</div>
              <p class="text-slate-600">too much, not enough, better, worse</p>
            </div>
            <div>
              <div class="font-semibold text-slate-700 mb-2">"Should" statements</div>
              <p class="text-slate-600">should, shouldn't, supposed to</p>
            </div>
            <div>
              <div class="font-semibold text-slate-700 mb-2">Mind-reading</div>
              <p class="text-slate-600">They think..., They want..., They don't care...</p>
            </div>
          </div>
        </div>

        <h2>The Camera Test</h2>

        <p>A helpful way to check if something is an observation: Could a video camera capture it? A camera can record words spoken, facial expressions, and actions. It can't record intentions, attitudes, or character traits. If you couldn't play it back on video, it's probably an evaluation.</p>

        <h2>Practice Exercise</h2>

        <p>Think of a recent situation that bothered you. Try to describe only what a camera would have captured:</p>

        <ul>
          <li>What specific words were said?</li>
          <li>What actions occurred?</li>
          <li>What was the sequence of events?</li>
          <li>What was the setting, time, place?</li>
        </ul>

        <p>Notice how challenging it is to keep evaluation out. That's normal. This skill takes practice.</p>

        <div class="bg-brand-50 rounded-xl p-8 border border-brand-200 my-8">
          <h3 class="font-semibold text-lg text-slate-900 mb-3">Practice Making Observations</h3>
          <p class="text-slate-600 mb-4">Use the interactive practice tool to work through observations with AI guidance and feedback.</p>
          <RouterLink to="/practice" class="inline-flex items-center bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors font-medium">
            Start Practicing
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
