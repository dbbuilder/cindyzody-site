<script setup>
import { computed } from 'vue'
import {
  EyeIcon,
  HeartIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  ShareIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  // OFNR data
  observation: {
    type: String,
    default: ''
  },
  feelings: {
    type: Array,
    default: () => []
  },
  needs: {
    type: Array,
    default: () => []
  },
  request: {
    type: String,
    default: ''
  },
  // Session metadata
  sessionDate: {
    type: String,
    default: ''
  },
  sessionType: {
    type: String,
    default: 'self-empathy'
  },
  // Display options
  compact: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit', 'copy', 'share'])

// Check if session is complete
const isComplete = computed(() => {
  return props.observation && props.feelings.length > 0 && props.needs.length > 0
})

// Progress percentage
const progress = computed(() => {
  let count = 0
  if (props.observation) count++
  if (props.feelings.length > 0) count++
  if (props.needs.length > 0) count++
  if (props.request) count++
  return Math.round((count / 4) * 100)
})

// Session type labels
const sessionTypeLabels = {
  'self-empathy': 'Self-Empathy',
  'empathy': 'Empathy Practice',
  'prep': 'Conversation Prep',
  'scenario': 'Scenario Practice'
}

// Format date
const formattedDate = computed(() => {
  if (!props.sessionDate) return ''
  const date = new Date(props.sessionDate)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
})

// Generate copyable text
function generateText() {
  let text = `NVC Practice Session - ${sessionTypeLabels[props.sessionType] || 'Practice'}\n`
  if (props.sessionDate) text += `Date: ${formattedDate.value}\n`
  text += '\n'

  if (props.observation) {
    text += `OBSERVATION:\n${props.observation}\n\n`
  }

  if (props.feelings.length > 0) {
    text += `FEELINGS:\n${props.feelings.map(f => `- ${f.label || f}`).join('\n')}\n\n`
  }

  if (props.needs.length > 0) {
    text += `NEEDS:\n${props.needs.map(n => `- ${n.label || n}`).join('\n')}\n\n`
  }

  if (props.request) {
    text += `REQUEST:\n${props.request}\n`
  }

  return text
}

// Copy to clipboard
async function copyToClipboard() {
  const text = generateText()
  try {
    await navigator.clipboard.writeText(text)
    emit('copy', text)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Share (mobile)
async function shareSession() {
  const text = generateText()
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'NVC Practice Session',
        text
      })
      emit('share', text)
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Failed to share:', err)
      }
    }
  } else {
    copyToClipboard()
  }
}

// Edit section
function editSection(section) {
  emit('edit', section)
}
</script>

<template>
  <div
    class="session-summary bg-white rounded-xl border shadow-sm overflow-hidden"
    :class="{ 'p-4': compact, 'p-6': !compact }"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4" :class="{ 'mb-3': compact }">
      <div>
        <h3 class="font-semibold" :class="compact ? 'text-sm' : 'text-lg'">
          {{ sessionTypeLabels[sessionType] || 'Practice Session' }}
        </h3>
        <p v-if="sessionDate" class="text-xs text-slate-500 mt-0.5">
          {{ formattedDate }}
        </p>
      </div>

      <div class="flex items-center gap-2">
        <!-- Progress indicator -->
        <div class="flex items-center gap-2">
          <div class="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              class="h-full bg-brand-500 transition-all duration-500"
              :style="{ width: `${progress}%` }"
            />
          </div>
          <span class="text-xs text-slate-500">{{ progress }}%</span>
        </div>

        <!-- Actions -->
        <button
          @click="copyToClipboard"
          class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          title="Copy to clipboard"
        >
          <ClipboardDocumentIcon class="w-4 h-4" />
        </button>
        <button
          @click="shareSession"
          class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          title="Share"
        >
          <ShareIcon class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- OFNR Grid -->
    <div
      class="grid gap-4"
      :class="compact ? 'grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4'"
    >
      <!-- Observation -->
      <div
        class="rounded-lg p-3 border transition-colors"
        :class="observation ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'"
        @click="editable && editSection('observation')"
        :role="editable ? 'button' : undefined"
        :tabindex="editable ? 0 : undefined"
      >
        <div class="flex items-center gap-2 mb-2">
          <div
            class="w-6 h-6 rounded-full flex items-center justify-center"
            :class="observation ? 'bg-blue-100' : 'bg-slate-100'"
          >
            <EyeIcon class="w-3.5 h-3.5" :class="observation ? 'text-blue-600' : 'text-slate-400'" />
          </div>
          <span class="text-xs font-medium" :class="observation ? 'text-blue-700' : 'text-slate-500'">
            Observation
          </span>
          <CheckCircleIcon v-if="observation" class="w-4 h-4 text-blue-500 ml-auto" />
        </div>
        <p
          v-if="observation"
          class="text-sm text-slate-700 line-clamp-3"
        >
          {{ observation }}
        </p>
        <p v-else class="text-sm text-slate-400 italic">
          What did you observe?
        </p>
      </div>

      <!-- Feelings -->
      <div
        class="rounded-lg p-3 border transition-colors"
        :class="feelings.length ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200'"
        @click="editable && editSection('feelings')"
        :role="editable ? 'button' : undefined"
        :tabindex="editable ? 0 : undefined"
      >
        <div class="flex items-center gap-2 mb-2">
          <div
            class="w-6 h-6 rounded-full flex items-center justify-center"
            :class="feelings.length ? 'bg-rose-100' : 'bg-slate-100'"
          >
            <HeartIcon class="w-3.5 h-3.5" :class="feelings.length ? 'text-rose-600' : 'text-slate-400'" />
          </div>
          <span class="text-xs font-medium" :class="feelings.length ? 'text-rose-700' : 'text-slate-500'">
            Feelings
          </span>
          <CheckCircleIcon v-if="feelings.length" class="w-4 h-4 text-rose-500 ml-auto" />
        </div>
        <div v-if="feelings.length" class="flex flex-wrap gap-1">
          <span
            v-for="feeling in feelings.slice(0, compact ? 3 : 5)"
            :key="feeling.id || feeling"
            class="inline-flex px-2 py-0.5 text-xs rounded-full bg-rose-100 text-rose-700"
          >
            {{ feeling.label || feeling }}
          </span>
          <span v-if="feelings.length > (compact ? 3 : 5)" class="text-xs text-rose-500">
            +{{ feelings.length - (compact ? 3 : 5) }} more
          </span>
        </div>
        <p v-else class="text-sm text-slate-400 italic">
          How are you feeling?
        </p>
      </div>

      <!-- Needs -->
      <div
        class="rounded-lg p-3 border transition-colors"
        :class="needs.length ? 'bg-purple-50 border-purple-200' : 'bg-slate-50 border-slate-200'"
        @click="editable && editSection('needs')"
        :role="editable ? 'button' : undefined"
        :tabindex="editable ? 0 : undefined"
      >
        <div class="flex items-center gap-2 mb-2">
          <div
            class="w-6 h-6 rounded-full flex items-center justify-center"
            :class="needs.length ? 'bg-purple-100' : 'bg-slate-100'"
          >
            <StarIcon class="w-3.5 h-3.5" :class="needs.length ? 'text-purple-600' : 'text-slate-400'" />
          </div>
          <span class="text-xs font-medium" :class="needs.length ? 'text-purple-700' : 'text-slate-500'">
            Needs
          </span>
          <CheckCircleIcon v-if="needs.length" class="w-4 h-4 text-purple-500 ml-auto" />
        </div>
        <div v-if="needs.length" class="flex flex-wrap gap-1">
          <span
            v-for="need in needs.slice(0, compact ? 3 : 5)"
            :key="need.id || need"
            class="inline-flex px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700"
          >
            {{ need.label || need }}
          </span>
          <span v-if="needs.length > (compact ? 3 : 5)" class="text-xs text-purple-500">
            +{{ needs.length - (compact ? 3 : 5) }} more
          </span>
        </div>
        <p v-else class="text-sm text-slate-400 italic">
          What do you need?
        </p>
      </div>

      <!-- Request -->
      <div
        class="rounded-lg p-3 border transition-colors"
        :class="request ? 'bg-brand-50 border-brand-200' : 'bg-slate-50 border-slate-200'"
        @click="editable && editSection('request')"
        :role="editable ? 'button' : undefined"
        :tabindex="editable ? 0 : undefined"
      >
        <div class="flex items-center gap-2 mb-2">
          <div
            class="w-6 h-6 rounded-full flex items-center justify-center"
            :class="request ? 'bg-brand-100' : 'bg-slate-100'"
          >
            <ChatBubbleLeftRightIcon class="w-3.5 h-3.5" :class="request ? 'text-brand-600' : 'text-slate-400'" />
          </div>
          <span class="text-xs font-medium" :class="request ? 'text-brand-700' : 'text-slate-500'">
            Request
          </span>
          <CheckCircleIcon v-if="request" class="w-4 h-4 text-brand-500 ml-auto" />
        </div>
        <p
          v-if="request"
          class="text-sm text-slate-700 line-clamp-3"
        >
          {{ request }}
        </p>
        <p v-else class="text-sm text-slate-400 italic">
          What would you like to request?
        </p>
      </div>
    </div>

    <!-- Completion message -->
    <div
      v-if="isComplete"
      class="mt-4 p-3 bg-brand-50 rounded-lg border border-brand-200 flex items-center gap-3"
    >
      <CheckCircleIcon class="w-5 h-5 text-brand-600 flex-shrink-0" />
      <p class="text-sm text-brand-700">
        Great work! You've completed the core OFNR process.
        {{ request ? '' : 'Consider adding a request to complete your practice.' }}
      </p>
    </div>
  </div>
</template>
