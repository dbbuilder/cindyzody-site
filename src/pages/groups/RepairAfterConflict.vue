<template>
  <section class="py-14">
    <div class="mx-auto max-w-5xl px-4">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm">
        <RouterLink to="/groups" class="text-brand-600 hover:text-brand-700">Groups</RouterLink>
        <span class="mx-2 text-slate-400">/</span>
        <span class="text-slate-600">Repair After Conflict</span>
      </nav>

      <!-- Hero -->
      <div class="bg-gradient-to-br from-violet-50 to-rose-50 rounded-2xl p-8 md:p-12 mb-12 border border-violet-100">
        <div class="flex items-start gap-6">
          <div class="w-16 h-16 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <HeartIcon class="w-8 h-8 text-violet-600" />
          </div>
          <div>
            <div class="text-sm font-medium text-violet-600 mb-2">1-Day Intensive Retreat</div>
            <h1 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Repair After Conflict</h1>
            <p class="text-lg text-slate-600 max-w-2xl">
              Heal relationships after difficult conflicts. Learn restorative dialogue practices
              that rebuild trust, understanding, and connection.
            </p>
          </div>
        </div>
      </div>

      <!-- Format Overview -->
      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white rounded-xl border p-6 text-center">
          <div class="text-3xl font-bold text-violet-600 mb-2">6</div>
          <div class="text-slate-600">Hours (with breaks)</div>
        </div>
        <div class="bg-white rounded-xl border p-6 text-center">
          <div class="text-3xl font-bold text-violet-600 mb-2">1</div>
          <div class="text-slate-600">Day Retreat</div>
        </div>
        <div class="bg-white rounded-xl border p-6 text-center">
          <div class="text-3xl font-bold text-violet-600 mb-2">6-8</div>
          <div class="text-slate-600">Participants</div>
        </div>
      </div>

      <!-- Why This Matters -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6">Why Repair Matters</h2>
        <div class="bg-white rounded-xl border p-6 md:p-8">
          <p class="text-slate-600 mb-4">
            Conflict isn't the problem—it's what happens after conflict that determines whether
            relationships grow stronger or fall apart. Many of us never learned how to repair.
            We either sweep things under the rug or keep rehashing the same argument.
          </p>
          <p class="text-slate-600 mb-4">
            Restorative dialogue offers a third path: a structured way to acknowledge hurt,
            express what was really going on beneath the surface, and create new understanding
            that becomes the foundation for trust.
          </p>
          <p class="text-slate-700 font-medium">
            This retreat gives you the tools and practice to repair—whether that's with a partner,
            family member, friend, or colleague.
          </p>
        </div>
      </div>

      <!-- What You'll Learn -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6">What You'll Learn</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl border p-6">
            <div class="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
              <ChatBubbleBottomCenterTextIcon class="w-5 h-5 text-violet-600" />
            </div>
            <h3 class="font-semibold text-lg mb-2">Restorative Dialogue Process</h3>
            <p class="text-slate-600">
              A structured approach to repair that ensures both people feel heard before
              moving toward resolution. Learn to create safety for vulnerability.
            </p>
          </div>

          <div class="bg-white rounded-xl border p-6">
            <div class="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheckIcon class="w-5 h-5 text-violet-600" />
            </div>
            <h3 class="font-semibold text-lg mb-2">Trust Rebuilding Strategies</h3>
            <p class="text-slate-600">
              Understand how trust breaks down and the specific behaviors that rebuild it.
              Learn to make and receive apologies that actually heal.
            </p>
          </div>

          <div class="bg-white rounded-xl border p-6">
            <div class="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
              <HeartIcon class="w-5 h-5 text-violet-600" />
            </div>
            <h3 class="font-semibold text-lg mb-2">Emotional Healing Practices</h3>
            <p class="text-slate-600">
              Process your own hurt so you can show up with an open heart. Learn self-empathy
              practices that help you move through resentment and grief.
            </p>
          </div>

          <div class="bg-white rounded-xl border p-6">
            <div class="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
              <ArrowPathRoundedSquareIcon class="w-5 h-5 text-violet-600" />
            </div>
            <h3 class="font-semibold text-lg mb-2">Creating New Agreements</h3>
            <p class="text-slate-600">
              Move from repair to renewal. Learn to create clear agreements that prevent
              the same conflicts from recurring and build a stronger foundation.
            </p>
          </div>
        </div>
      </div>

      <!-- Retreat Schedule -->
      <div class="bg-violet-50 rounded-xl p-8 mb-12 border border-violet-200">
        <h2 class="text-2xl font-bold mb-6">Retreat Schedule</h2>
        <div class="space-y-4">
          <div class="flex items-start gap-4">
            <div class="text-sm font-medium text-violet-700 w-24 flex-shrink-0">9:00 AM</div>
            <div>
              <div class="font-medium">Opening & Grounding</div>
              <div class="text-sm text-slate-600">Welcome, intentions, and creating safety</div>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="text-sm font-medium text-violet-700 w-24 flex-shrink-0">9:30 AM</div>
            <div>
              <div class="font-medium">Understanding Conflict Patterns</div>
              <div class="text-sm text-slate-600">How we react, why repair fails, and what's possible</div>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="text-sm font-medium text-violet-700 w-24 flex-shrink-0">11:00 AM</div>
            <div>
              <div class="font-medium">Self-Empathy Practice</div>
              <div class="text-sm text-slate-600">Processing your own experience before repair</div>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="text-sm font-medium text-violet-700 w-24 flex-shrink-0">12:00 PM</div>
            <div>
              <div class="font-medium">Mindful Lunch Break</div>
              <div class="text-sm text-slate-600">Nourishment and integration time</div>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="text-sm font-medium text-violet-700 w-24 flex-shrink-0">1:00 PM</div>
            <div>
              <div class="font-medium">Restorative Dialogue Process</div>
              <div class="text-sm text-slate-600">Learning and practicing the repair structure</div>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="text-sm font-medium text-violet-700 w-24 flex-shrink-0">2:30 PM</div>
            <div>
              <div class="font-medium">Paired Practice Sessions</div>
              <div class="text-sm text-slate-600">Working with real scenarios in a supported environment</div>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="text-sm font-medium text-violet-700 w-24 flex-shrink-0">4:00 PM</div>
            <div>
              <div class="font-medium">Creating New Agreements</div>
              <div class="text-sm text-slate-600">Moving from repair to renewal</div>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="text-sm font-medium text-violet-700 w-24 flex-shrink-0">4:45 PM</div>
            <div>
              <div class="font-medium">Closing Circle</div>
              <div class="text-sm text-slate-600">Integration, resources, and next steps</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Who It's For -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6">This Retreat Is For You If...</h2>
        <div class="bg-white rounded-xl border p-6">
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <CheckCircleIcon class="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
              <span>You're carrying unresolved hurt from a conflict and don't know how to move forward</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircleIcon class="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
              <span>You want to repair a relationship but attempts so far haven't worked</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircleIcon class="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
              <span>You struggle to apologize or receive apologies authentically</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircleIcon class="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
              <span>You want tools to help couples, families, or teams you work with</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircleIcon class="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
              <span>You recognize that your conflict patterns aren't serving your relationships</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- CTA -->
      <div class="bg-white rounded-xl border shadow-sm p-8 text-center">
        <h2 class="text-2xl font-bold mb-3">Ready to Heal & Rebuild?</h2>
        <p class="text-slate-600 max-w-2xl mx-auto mb-6">
          Join our next retreat and learn the art of repair. Mention "Repair Retreat"
          when you reach out.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <RouterLink
            to="/contact"
            class="inline-flex items-center bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors font-medium"
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
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  ShieldCheckIcon,
  ArrowPathRoundedSquareIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'
</script>
