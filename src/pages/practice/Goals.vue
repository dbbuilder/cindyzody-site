<template>
  <section class="py-14">
    <div class="mx-auto max-w-5xl px-4">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm">
        <RouterLink to="/practice" class="text-brand-600 hover:text-brand-700">Practice</RouterLink>
        <span class="mx-2 text-slate-400">/</span>
        <span class="text-slate-600">Goals</span>
      </nav>

      <!-- AI Goal Planner Card -->
      <div class="bg-gradient-to-br from-amber-50 to-brand-50 rounded-xl p-6 border border-amber-200 mb-8">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <SparklesIcon class="w-6 h-6 text-amber-600" />
          </div>
          <div class="flex-1">
            <h2 class="text-xl font-bold text-slate-900 mb-2">Create Your Personalized GOFNR Plan</h2>
            <p class="text-slate-600 mb-4">
              Get a customized goal-setting roadmap for your specific situation. Our AI will guide you through clarifying your goals, anticipating challenges, and preparing for each step of the GOFNR process.
            </p>

            <!-- Input form when not generating -->
            <div v-if="!generatedPlan && !isGenerating" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Describe your situation</label>
                <textarea
                  v-model="situationInput"
                  rows="3"
                  class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
                  placeholder="What conversation or situation are you preparing for? The more detail you provide, the more personalized your plan will be."
                ></textarea>
              </div>
              <button
                @click="generatePlan"
                :disabled="!situationInput.trim()"
                class="inline-flex items-center bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SparklesIcon class="w-5 h-5 mr-2" />
                Build My GOFNR Roadmap
              </button>
            </div>

            <!-- Loading state -->
            <div v-if="isGenerating" class="flex items-center gap-3 py-4">
              <div class="w-6 h-6 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
              <span class="text-slate-600">Creating your personalized plan...</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Generated Plan Display -->
      <div v-if="generatedPlan" ref="planContainer" class="bg-white rounded-xl border shadow-sm p-8 mb-8">
        <!-- On-screen display -->
        <div class="mb-6 pb-4 border-b">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img src="/logo.png" class="h-10 w-auto" alt="Cindy Zody Logo" />
              <div>
                <div class="font-semibold">Cindy Zody</div>
                <div class="text-sm text-slate-500">Communications Practitioner</div>
              </div>
            </div>
            <div class="text-sm text-slate-500 text-right">
              <div>Personal GOFNR Roadmap</div>
              <div>{{ new Date().toLocaleDateString() }}</div>
            </div>
          </div>
        </div>

        <!-- Plan content -->
        <div class="prose prose-slate max-w-none" v-html="generatedPlan"></div>

        <!-- Footer -->
        <div class="mt-8 pt-4 border-t text-center text-sm text-slate-500">
          <p>Created with the GOFNR Goal Planning Tool at cindyzody.com</p>
          <p class="mt-1">For personalized coaching, schedule a session at cindyzody.com/contact</p>
        </div>

        <!-- Action buttons -->
        <div class="mt-6 flex flex-wrap gap-4">
          <button
            @click="downloadPDF"
            :disabled="isDownloading"
            class="inline-flex items-center bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors font-medium disabled:opacity-70 disabled:cursor-wait"
          >
            <template v-if="isDownloading">
              <div class="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating PDF...
            </template>
            <template v-else>
              <ArrowDownTrayIcon class="w-5 h-5 mr-2" />
              Download as PDF
            </template>
          </button>
          <button
            @click="resetPlan"
            class="inline-flex items-center border border-slate-300 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium"
          >
            Create New Plan
          </button>
          <RouterLink
            to="/practice"
            class="inline-flex items-center bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            Start Practicing
            <ArrowRightIcon class="w-5 h-5 ml-2" />
          </RouterLink>
        </div>
      </div>

      <div class="prose prose-slate max-w-none">
        <h1>Goals: The Foundation of Intentional Communication</h1>

        <p class="lead text-xl text-slate-600">Before diving into observation, feelings, and needs, take time to clarify what you're actually trying to achieve. Clear goals keep you grounded when emotions run high.</p>

        <p>The Goals step is often overlooked in NVC practice, but it's foundational. When you're clear about what you want from a conversation—not just what you want the other person to do, but what would feel satisfying to you—you have an anchor point. When the conversation gets difficult, you can return to your goal and ask: "Is what I'm about to say serving this goal?"</p>

        <h2>Why Goals Matter</h2>

        <div class="grid md:grid-cols-2 gap-6 not-prose my-8">
          <div class="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h3 class="font-semibold text-lg text-slate-900 mb-3">Clarity Under Pressure</h3>
            <p class="text-slate-600">When emotions intensify, it's easy to lose track of what you actually want. A clearly defined goal gives you something to return to when you feel yourself reacting rather than responding.</p>
          </div>
          <div class="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h3 class="font-semibold text-lg text-slate-900 mb-3">Evaluate Your Requests</h3>
            <p class="text-slate-600">Not every request serves your goal. Sometimes what feels satisfying in the moment (like proving you're right) doesn't actually lead to what you really want (like connection and resolution).</p>
          </div>
          <div class="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h3 class="font-semibold text-lg text-slate-900 mb-3">Recognize Success</h3>
            <p class="text-slate-600">How will you know when the conversation has been successful? Clear goals make it possible to recognize when you've achieved what you wanted—or when you need to adjust your approach.</p>
          </div>
          <div class="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h3 class="font-semibold text-lg text-slate-900 mb-3">Internal vs External Goals</h3>
            <p class="text-slate-600">Some goals are about outcomes (reaching an agreement); others are about process (staying calm and connected). Both matter. Sometimes your goal is simply to understand the other person better.</p>
          </div>
        </div>

        <h2>Types of Goals</h2>

        <div class="space-y-4 my-8">
          <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 class="font-semibold text-brand-700 mb-2">Connection Goals</h3>
            <p class="text-slate-600">"I want to feel closer to this person." "I want them to understand my experience." "I want to repair the trust between us."</p>
          </div>
          <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 class="font-semibold text-brand-700 mb-2">Understanding Goals</h3>
            <p class="text-slate-600">"I want to understand why they did that." "I want to figure out what's really bothering me." "I want to discover what we both need."</p>
          </div>
          <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 class="font-semibold text-brand-700 mb-2">Agreement Goals</h3>
            <p class="text-slate-600">"I want to find a solution we both support." "I want to create clear expectations going forward." "I want to reach a decision together."</p>
          </div>
          <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 class="font-semibold text-brand-700 mb-2">Process Goals</h3>
            <p class="text-slate-600">"I want to stay calm even if they get defensive." "I want to listen without interrupting." "I want to express myself honestly without blaming."</p>
          </div>
        </div>

        <h2>Questions to Clarify Your Goal</h2>

        <ul>
          <li><strong>What would feel satisfying?</strong> Not just what you want to happen, but how you want to feel at the end of this conversation.</li>
          <li><strong>What's at stake?</strong> Why does this matter to you? What need is driving the conversation?</li>
          <li><strong>What would success look like?</strong> How will you know if the conversation went well?</li>
          <li><strong>What are you afraid of?</strong> Sometimes clarifying our fears reveals what we really want.</li>
          <li><strong>Is this within your control?</strong> Goals that depend entirely on someone else's behavior often lead to frustration.</li>
        </ul>

        <h2>Common Pitfalls</h2>

        <div class="bg-slate-50 rounded-xl p-6 border my-8">
          <h3 class="font-semibold mb-4">Goals to Reconsider</h3>
          <ul class="space-y-3">
            <li class="flex items-start gap-2">
              <span class="text-red-500">x</span>
              <span><strong>"I want them to admit they were wrong"</strong> — Focus instead on understanding or repair</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-red-500">x</span>
              <span><strong>"I want them to stop feeling that way"</strong> — You can't control others' feelings</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-red-500">x</span>
              <span><strong>"I want to win the argument"</strong> — Ask what winning would actually give you</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-red-500">x</span>
              <span><strong>"I want them to change"</strong> — Focus on specific behaviors, not personality</span>
            </li>
          </ul>
        </div>

        <div class="bg-brand-50 rounded-xl p-8 border border-brand-200 my-8">
          <h3 class="font-semibold text-lg text-slate-900 mb-3">Practice Setting Goals</h3>
          <p class="text-slate-600 mb-4">Use the interactive practice tool to work through the GOFNR process with your real situations.</p>
          <RouterLink to="/practice" class="inline-flex items-center bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors font-medium">
            Start Practicing
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { SparklesIcon, ArrowDownTrayIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

const situationInput = ref('')
const isGenerating = ref(false)
const isDownloading = ref(false)
const generatedPlan = ref('')

async function generatePlan() {
  if (!situationInput.value.trim()) return

  isGenerating.value = true

  try {
    // Call the AI API to generate a personalized plan
    const response = await fetch('/api/ai/goal-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ situation: situationInput.value })
    })

    if (response.ok) {
      const data = await response.json()
      generatedPlan.value = data.plan
    } else {
      // Fallback to a template-based plan if API is not available
      generatedPlan.value = generateTemplatePlan(situationInput.value)
    }
  } catch (err) {
    // Fallback to template if API fails
    generatedPlan.value = generateTemplatePlan(situationInput.value)
  } finally {
    isGenerating.value = false
  }
}

function generateTemplatePlan(situation) {
  return `
    <h2>Your GOFNR Communication Roadmap</h2>
    <p><strong>Situation:</strong> ${situation}</p>

    <h3>Step 1: Goal Clarity</h3>
    <p>Before entering this conversation, consider:</p>
    <ul>
      <li><strong>Connection goal:</strong> What kind of relationship do you want with this person after the conversation?</li>
      <li><strong>Understanding goal:</strong> What do you want to understand better about their perspective?</li>
      <li><strong>Outcome goal:</strong> What specific agreement or change would feel satisfying?</li>
      <li><strong>Process goal:</strong> How do you want to show up? (e.g., calm, curious, honest)</li>
    </ul>

    <h3>Step 2: Observation Preparation</h3>
    <p>Practice describing the situation without judgment:</p>
    <ul>
      <li>What specific actions or words triggered your feelings?</li>
      <li>What would a camera have recorded?</li>
      <li>Can you state facts without using words like "always," "never," or character labels?</li>
    </ul>

    <h3>Step 3: Feelings Exploration</h3>
    <p>When you think about this situation, notice:</p>
    <ul>
      <li>What emotions come up? (frustrated, anxious, sad, hopeful, etc.)</li>
      <li>Where do you feel them in your body?</li>
      <li>Are these feelings pointing to met or unmet needs?</li>
    </ul>

    <h3>Step 4: Needs Identification</h3>
    <p>The feelings you identified likely point to these universal needs:</p>
    <ul>
      <li><strong>Connection needs:</strong> belonging, understanding, acceptance, closeness</li>
      <li><strong>Autonomy needs:</strong> choice, independence, space, freedom</li>
      <li><strong>Meaning needs:</strong> purpose, contribution, growth, competence</li>
      <li><strong>Peace needs:</strong> harmony, order, ease, rest</li>
    </ul>

    <h3>Step 5: Request Crafting</h3>
    <p>Based on your goal and identified needs, consider these requests:</p>
    <ul>
      <li><strong>Connection request:</strong> "Would you be willing to tell me what you heard me say?"</li>
      <li><strong>Action request:</strong> Think of one specific, doable thing that would meet your need</li>
      <li><strong>Information request:</strong> "I'd like to understand... would you share what's going on for you?"</li>
    </ul>

    <h3>Conversation Anchor</h3>
    <p>When the conversation gets difficult, return to this statement:</p>
    <blockquote>"My goal in this conversation is [your goal]. What I'm saying right now—is it serving that goal?"</blockquote>

    <h3>Self-Compassion Reminder</h3>
    <p>You don't have to do this perfectly. Progress is more important than perfection. If things don't go as planned, you can always:</p>
    <ul>
      <li>Take a break and return to the conversation later</li>
      <li>Acknowledge that you're learning a new way of communicating</li>
      <li>Ask for a do-over: "Can I try saying that differently?"</li>
    </ul>
  `
}

function resetPlan() {
  generatedPlan.value = ''
  situationInput.value = ''
}

async function downloadPDF() {
  isDownloading.value = true

  try {
    // Dynamically import html2pdf to avoid SSR issues
    const html2pdf = (await import('html2pdf.js')).default

    await nextTick()

    // Create a temporary container that's visible but off-screen
    const tempContainer = document.createElement('div')
    tempContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 8.5in; background: white; z-index: -1000;'

    // Build the PDF content HTML
    const dateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    tempContainer.innerHTML = `
      <div style="font-family: Georgia, serif; color: #1e293b; padding: 0.5in;">
        <!-- PDF Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #4a7c59; padding-bottom: 16px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 48px; height: 48px; background: #4a7c59; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-size: 20px; font-weight: bold;">CZ</span>
            </div>
            <div>
              <div style="font-size: 18px; font-weight: 600; color: #4a7c59;">Cindy Zody</div>
              <div style="font-size: 12px; color: #64748b;">Communications Practitioner</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 16px; font-weight: 600; color: #1e293b;">Personal GOFNR Roadmap</div>
            <div style="font-size: 12px; color: #64748b;">${dateStr}</div>
          </div>
        </div>

        <!-- PDF Body -->
        <div style="font-size: 11pt; line-height: 1.6;">
          ${generatedPlan.value}
        </div>

        <!-- PDF Footer -->
        <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 10pt; color: #64748b;">
          <p style="margin: 0;">Created with the GOFNR Goal Planning Tool at <strong>cindyzody.com</strong></p>
          <p style="margin: 4px 0 0 0;">For personalized coaching, schedule a session at <strong>cindyzody.com/contact</strong></p>
          <p style="margin: 8px 0 0 0; font-size: 9pt; color: #94a3b8;">(206) 992-5992 • cindyzody@gmail.com</p>
        </div>
      </div>
    `

    document.body.appendChild(tempContainer)

    const opt = {
      margin: [0.25, 0.25, 0.25, 0.25],
      filename: `GOFNR-Roadmap-${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false
      },
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait'
      }
    }

    await html2pdf().set(opt).from(tempContainer).save()

    // Clean up
    document.body.removeChild(tempContainer)
  } catch (err) {
    console.error('PDF generation failed:', err)
    // Fallback to browser print
    window.print()
  } finally {
    isDownloading.value = false
  }
}
</script>

<style>
/* PDF Content Styling */
.pdf-content h2 {
  font-size: 16pt;
  font-weight: 600;
  color: #4a7c59;
  margin: 20px 0 12px 0;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 8px;
}

.pdf-content h3 {
  font-size: 13pt;
  font-weight: 600;
  color: #1e293b;
  margin: 16px 0 8px 0;
}

.pdf-content p {
  margin: 8px 0;
}

.pdf-content ul {
  margin: 8px 0;
  padding-left: 20px;
}

.pdf-content li {
  margin: 4px 0;
}

.pdf-content blockquote {
  background: #f8fafc;
  border-left: 4px solid #4a7c59;
  padding: 12px 16px;
  margin: 16px 0;
  font-style: italic;
  color: #475569;
}

.pdf-content strong {
  color: #1e293b;
}
</style>
