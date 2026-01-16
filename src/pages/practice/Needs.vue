<template>
  <section class="py-14">
    <div class="mx-auto max-w-5xl px-4">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm">
        <RouterLink to="/practice" class="text-brand-600 hover:text-brand-700">Practice</RouterLink>
        <span class="mx-2 text-slate-400">/</span>
        <span class="text-slate-600">Needs</span>
      </nav>

      <div class="prose prose-slate max-w-none">
        <h1>Needs: The Universal Human Foundation</h1>

        <p class="lead text-xl text-slate-600">Beneath every feeling lies a need. When we learn to identify and honor these universal human needs, we find common ground with anyone—because everyone has the same needs, even if we try to meet them in different ways.</p>

        <p>This is perhaps the most transformative insight in NVC: all human beings share the same needs. We all need safety, connection, meaning, autonomy, and rest—among others. What differs is how we try to meet those needs. Conflict usually isn't about needs (which are shared) but about strategies (which differ).</p>

        <p>When you can identify the need beneath your feeling, you open up possibilities. Instead of being stuck on one strategy ("I need you to call me every day"), you can name the underlying need ("I need connection and reassurance that I matter to you") and then explore many strategies that might meet it.</p>

        <h2>Needs vs. Strategies</h2>

        <div class="space-y-4 my-8 not-prose">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-50 rounded-xl p-5 border border-blue-200">
              <div class="text-sm font-medium text-blue-700 mb-2">Strategy (specific)</div>
              <p class="text-slate-700">"I need you to come to my parents' dinner."</p>
            </div>
            <div class="bg-purple-50 rounded-xl p-5 border border-purple-200">
              <div class="text-sm font-medium text-purple-700 mb-2">Need (universal)</div>
              <p class="text-slate-700">"I need partnership and support with my family."</p>
            </div>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-50 rounded-xl p-5 border border-blue-200">
              <div class="text-sm font-medium text-blue-700 mb-2">Strategy (specific)</div>
              <p class="text-slate-700">"I need you to text me when you're running late."</p>
            </div>
            <div class="bg-purple-50 rounded-xl p-5 border border-purple-200">
              <div class="text-sm font-medium text-purple-700 mb-2">Need (universal)</div>
              <p class="text-slate-700">"I need consideration and ease in planning my time."</p>
            </div>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-50 rounded-xl p-5 border border-blue-200">
              <div class="text-sm font-medium text-blue-700 mb-2">Strategy (specific)</div>
              <p class="text-slate-700">"I need this promotion."</p>
            </div>
            <div class="bg-purple-50 rounded-xl p-5 border border-purple-200">
              <div class="text-sm font-medium text-purple-700 mb-2">Need (universal)</div>
              <p class="text-slate-700">"I need recognition, growth, and financial security."</p>
            </div>
          </div>
        </div>

        <h2>Categories of Universal Human Needs</h2>

        <div class="grid md:grid-cols-2 gap-6 not-prose my-8">
          <div class="bg-sage-50 rounded-xl p-6 border border-sage-200">
            <h3 class="font-semibold text-lg text-slate-900 mb-3">Connection</h3>
            <p class="text-slate-600 mb-3">The need to feel close to others and part of something larger.</p>
            <div class="flex flex-wrap gap-2 text-sm">
              <span class="px-2 py-1 bg-white rounded-full border">acceptance</span>
              <span class="px-2 py-1 bg-white rounded-full border">affection</span>
              <span class="px-2 py-1 bg-white rounded-full border">belonging</span>
              <span class="px-2 py-1 bg-white rounded-full border">closeness</span>
              <span class="px-2 py-1 bg-white rounded-full border">community</span>
              <span class="px-2 py-1 bg-white rounded-full border">companionship</span>
              <span class="px-2 py-1 bg-white rounded-full border">intimacy</span>
              <span class="px-2 py-1 bg-white rounded-full border">love</span>
              <span class="px-2 py-1 bg-white rounded-full border">support</span>
            </div>
          </div>
          <div class="bg-sage-50 rounded-xl p-6 border border-sage-200">
            <h3 class="font-semibold text-lg text-slate-900 mb-3">Autonomy</h3>
            <p class="text-slate-600 mb-3">The need to have choice and self-determination.</p>
            <div class="flex flex-wrap gap-2 text-sm">
              <span class="px-2 py-1 bg-white rounded-full border">choice</span>
              <span class="px-2 py-1 bg-white rounded-full border">freedom</span>
              <span class="px-2 py-1 bg-white rounded-full border">independence</span>
              <span class="px-2 py-1 bg-white rounded-full border">self-determination</span>
              <span class="px-2 py-1 bg-white rounded-full border">space</span>
            </div>
          </div>
          <div class="bg-sage-50 rounded-xl p-6 border border-sage-200">
            <h3 class="font-semibold text-lg text-slate-900 mb-3">Meaning</h3>
            <p class="text-slate-600 mb-3">The need to contribute and have purpose.</p>
            <div class="flex flex-wrap gap-2 text-sm">
              <span class="px-2 py-1 bg-white rounded-full border">contribution</span>
              <span class="px-2 py-1 bg-white rounded-full border">creativity</span>
              <span class="px-2 py-1 bg-white rounded-full border">growth</span>
              <span class="px-2 py-1 bg-white rounded-full border">learning</span>
              <span class="px-2 py-1 bg-white rounded-full border">purpose</span>
              <span class="px-2 py-1 bg-white rounded-full border">self-expression</span>
            </div>
          </div>
          <div class="bg-sage-50 rounded-xl p-6 border border-sage-200">
            <h3 class="font-semibold text-lg text-slate-900 mb-3">Physical Well-being</h3>
            <p class="text-slate-600 mb-3">The need for body care and safety.</p>
            <div class="flex flex-wrap gap-2 text-sm">
              <span class="px-2 py-1 bg-white rounded-full border">air</span>
              <span class="px-2 py-1 bg-white rounded-full border">food</span>
              <span class="px-2 py-1 bg-white rounded-full border">movement</span>
              <span class="px-2 py-1 bg-white rounded-full border">rest</span>
              <span class="px-2 py-1 bg-white rounded-full border">safety</span>
              <span class="px-2 py-1 bg-white rounded-full border">shelter</span>
              <span class="px-2 py-1 bg-white rounded-full border">touch</span>
              <span class="px-2 py-1 bg-white rounded-full border">water</span>
            </div>
          </div>
          <div class="bg-sage-50 rounded-xl p-6 border border-sage-200">
            <h3 class="font-semibold text-lg text-slate-900 mb-3">Honesty</h3>
            <p class="text-slate-600 mb-3">The need for authenticity and integrity.</p>
            <div class="flex flex-wrap gap-2 text-sm">
              <span class="px-2 py-1 bg-white rounded-full border">authenticity</span>
              <span class="px-2 py-1 bg-white rounded-full border">integrity</span>
              <span class="px-2 py-1 bg-white rounded-full border">presence</span>
              <span class="px-2 py-1 bg-white rounded-full border">self-connection</span>
            </div>
          </div>
          <div class="bg-sage-50 rounded-xl p-6 border border-sage-200">
            <h3 class="font-semibold text-lg text-slate-900 mb-3">Peace</h3>
            <p class="text-slate-600 mb-3">The need for harmony and ease.</p>
            <div class="flex flex-wrap gap-2 text-sm">
              <span class="px-2 py-1 bg-white rounded-full border">beauty</span>
              <span class="px-2 py-1 bg-white rounded-full border">ease</span>
              <span class="px-2 py-1 bg-white rounded-full border">equality</span>
              <span class="px-2 py-1 bg-white rounded-full border">harmony</span>
              <span class="px-2 py-1 bg-white rounded-full border">order</span>
              <span class="px-2 py-1 bg-white rounded-full border">peace</span>
            </div>
          </div>
        </div>

        <h2>Finding the Need Beneath the Feeling</h2>

        <p>When you notice a feeling, ask yourself: "What need is this feeling pointing to?"</p>

        <ul>
          <li><strong>Frustration</strong> often points to needs for effectiveness, progress, or consideration</li>
          <li><strong>Loneliness</strong> often points to needs for connection, belonging, or companionship</li>
          <li><strong>Anxiety</strong> often points to needs for safety, predictability, or competence</li>
          <li><strong>Resentment</strong> often points to needs for fairness, respect, or appreciation</li>
          <li><strong>Exhaustion</strong> often points to needs for rest, support, or ease</li>
        </ul>

        <div class="bg-brand-50 rounded-xl p-8 border border-brand-200 my-8">
          <h3 class="font-semibold text-lg text-slate-900 mb-3">Explore Your Needs</h3>
          <p class="text-slate-600 mb-4">Use the interactive Needs Wheel to identify the universal human needs beneath your feelings.</p>
          <RouterLink to="/practice" class="inline-flex items-center bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors font-medium">
            Open Needs Explorer
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
