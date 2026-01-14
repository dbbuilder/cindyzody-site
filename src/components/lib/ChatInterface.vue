<script setup>
import { ref, computed, nextTick, watch, onMounted } from 'vue'
import {
  PaperAirplaneIcon,
  SparklesIcon,
  UserIcon,
  StopIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/solid'
import {
  HeartIcon,
  StarIcon,
  LightBulbIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  // Initial context from feelings/needs selection
  initialContext: {
    type: Object,
    default: () => ({ feelings: [], needs: [] })
  },
  // Placeholder text for input
  placeholder: {
    type: String,
    default: "Share what's on your mind..."
  },
  // System message for AI
  systemPrompt: {
    type: String,
    default: ''
  },
  // Whether to show typing indicator
  isTyping: {
    type: Boolean,
    default: false
  },
  // External messages (for controlled mode)
  messages: {
    type: Array,
    default: null
  },
  // AI Service instance (from useAI or useMockAI)
  aiService: {
    type: Object,
    default: null
  },
  // Use mock AI instead of real API
  useMock: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['send', 'suggest-feeling', 'suggest-need', 'reset', 'message-sent'])

// Internal message state (used when not in controlled mode)
const internalMessages = ref([])
const actualMessages = computed(() => {
  // Priority: AI service messages > props.messages > internal messages
  if (props.aiService?.messages?.value?.length > 0) {
    return props.aiService.messages.value
  }
  return props.messages ?? internalMessages.value
})

// AI state (when using integrated AI service)
const internalLoading = ref(false)
const aiError = ref(null)

// Computed loading state - use AI service state if available
const isActuallyTyping = computed(() => {
  if (props.aiService) {
    return props.aiService.isLoading?.value ?? internalLoading.value
  }
  return props.isTyping || internalLoading.value
})

// Input state
const inputText = ref('')
const inputRef = ref(null)
const messagesContainerRef = ref(null)

// Generate initial greeting based on context
const initialGreeting = computed(() => {
  const feelings = props.initialContext.feelings || []
  const needs = props.initialContext.needs || []

  if (feelings.length > 0 && needs.length > 0) {
    return `I see you're exploring feelings of ${feelings.map(f => f.label.toLowerCase()).join(', ')} and needs for ${needs.map(n => n.label.toLowerCase()).join(', ')}. Tell me more about what's happening for you.`
  } else if (feelings.length > 0) {
    return `You mentioned feeling ${feelings.map(f => f.label.toLowerCase()).join(', ')}. What situation brought up these feelings?`
  } else if (needs.length > 0) {
    return `You identified needs for ${needs.map(n => n.label.toLowerCase()).join(', ')}. What's making these needs feel important right now?`
  }
  return "Hello! I'm here to help you practice NVC. What situation would you like to explore today?"
})

// Initialize with greeting
function initializeChat() {
  if (props.messages === null) {
    internalMessages.value = [
      {
        id: 'greeting',
        role: 'assistant',
        content: initialGreeting.value,
        timestamp: new Date().toISOString()
      }
    ]
  }
}

// Watch for context changes to reinitialize
watch(() => props.initialContext, () => {
  initializeChat()
}, { immediate: true, deep: true })

// Send message
async function sendMessage() {
  const text = inputText.value.trim()
  if (!text) return

  const message = {
    id: `user-${Date.now()}`,
    role: 'user',
    content: text,
    timestamp: new Date().toISOString()
  }

  // If using AI service, let it handle message state
  if (props.aiService) {
    inputText.value = ''
    aiError.value = null

    try {
      // Build context from initial selections
      const context = {
        feelings: props.initialContext.feelings || [],
        needs: props.initialContext.needs || []
      }

      await props.aiService.sendMessage(text, context)
      emit('message-sent', message)
    } catch (err) {
      aiError.value = err.message
      console.error('AI send error:', err)
    }

    nextTick(scrollToBottom)
    return
  }

  // Fallback: manual message handling
  if (props.messages === null) {
    internalMessages.value.push(message)
  }

  emit('send', message)
  inputText.value = ''

  // Scroll to bottom
  nextTick(() => {
    scrollToBottom()
  })
}

// Handle keyboard shortcuts
function handleKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

// Scroll to bottom of messages
function scrollToBottom() {
  if (messagesContainerRef.value) {
    messagesContainerRef.value.scrollTop = messagesContainerRef.value.scrollHeight
  }
}

// Add assistant message (for external control)
function addAssistantMessage(content, suggestions = {}) {
  if (props.messages === null) {
    internalMessages.value.push({
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content,
      suggestions,
      timestamp: new Date().toISOString()
    })
    nextTick(scrollToBottom)
  }
}

// Handle suggestion click
function handleFeelingSuggestion(feeling) {
  emit('suggest-feeling', feeling)
}

function handleNeedSuggestion(need) {
  emit('suggest-need', need)
}

// Reset chat
function resetChat() {
  // Reset AI service if available
  if (props.aiService) {
    props.aiService.resetSession()
    aiError.value = null
  }

  if (props.messages === null) {
    internalMessages.value = []
  }
  emit('reset')
  nextTick(initializeChat)
}

// Expose methods for parent component
defineExpose({
  addAssistantMessage,
  resetChat,
  scrollToBottom
})
</script>

<template>
  <div class="chat-interface flex flex-col h-full bg-white rounded-xl border shadow-sm overflow-hidden">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-3 bg-slate-50 border-b">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center">
          <SparklesIcon class="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 class="font-semibold text-sm">NVC Facilitator</h3>
          <p class="text-xs text-slate-500">
            {{ isActuallyTyping ? 'Thinking...' : 'Ready to help' }}
          </p>
        </div>
      </div>
      <button
        @click="resetChat"
        class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        title="Start new conversation"
      >
        <ArrowPathIcon class="w-4 h-4" />
      </button>
    </div>

    <!-- Messages -->
    <div
      ref="messagesContainerRef"
      class="flex-1 overflow-y-auto p-4 space-y-4"
    >
      <div
        v-for="message in actualMessages"
        :key="message.id"
        class="animate-slide-up"
        :class="message.role === 'user' ? 'flex justify-end' : ''"
      >
        <!-- Assistant message -->
        <div v-if="message.role === 'assistant'" class="flex gap-3 max-w-[85%]">
          <div class="flex-shrink-0 w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center">
            <SparklesIcon class="w-4 h-4 text-brand-600" />
          </div>
          <div class="flex-1">
            <div class="bg-slate-50 rounded-lg rounded-tl-none p-3">
              <p class="text-sm text-slate-700 whitespace-pre-wrap">{{ message.content }}</p>
            </div>

            <!-- Suggestions -->
            <div v-if="message.suggestions" class="mt-2 space-y-2">
              <!-- Feeling suggestions -->
              <div v-if="message.suggestions.feelings?.length" class="flex flex-wrap gap-1">
                <button
                  v-for="feeling in message.suggestions.feelings"
                  :key="feeling"
                  @click="handleFeelingSuggestion(feeling)"
                  class="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-feeling-unmet-light text-feeling-unmet-dark hover:bg-feeling-unmet/20 transition-colors"
                >
                  <HeartIcon class="w-3 h-3" />
                  {{ feeling }}
                </button>
              </div>

              <!-- Need suggestions -->
              <div v-if="message.suggestions.needs?.length" class="flex flex-wrap gap-1">
                <button
                  v-for="need in message.suggestions.needs"
                  :key="need"
                  @click="handleNeedSuggestion(need)"
                  class="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-brand-50 text-brand-700 hover:bg-brand-100 transition-colors"
                >
                  <StarIcon class="w-3 h-3" />
                  {{ need }}
                </button>
              </div>

              <!-- Follow-up prompt -->
              <div v-if="message.suggestions.followUp" class="flex items-start gap-2 mt-2 p-2 bg-amber-50 rounded-lg border border-amber-200">
                <LightBulbIcon class="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p class="text-xs text-amber-800">{{ message.suggestions.followUp }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- User message -->
        <div v-else class="flex gap-3 max-w-[85%]">
          <div class="flex-1">
            <div class="bg-brand-600 text-white rounded-lg rounded-tr-none p-3">
              <p class="text-sm whitespace-pre-wrap">{{ message.content }}</p>
            </div>
          </div>
          <div class="flex-shrink-0 w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
            <UserIcon class="w-4 h-4 text-slate-600" />
          </div>
        </div>
      </div>

      <!-- Error display -->
      <div v-if="aiError" class="flex gap-3">
        <div class="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
          <ExclamationTriangleIcon class="w-4 h-4 text-red-600" />
        </div>
        <div class="bg-red-50 rounded-lg rounded-tl-none p-3 border border-red-200">
          <p class="text-sm text-red-700">{{ aiError }}</p>
          <button
            @click="aiError = null"
            class="text-xs text-red-500 hover:text-red-700 mt-1"
          >
            Dismiss
          </button>
        </div>
      </div>

      <!-- Typing indicator -->
      <div v-if="isActuallyTyping" class="flex gap-3">
        <div class="flex-shrink-0 w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center">
          <SparklesIcon class="w-4 h-4 text-brand-600" />
        </div>
        <div class="bg-slate-50 rounded-lg rounded-tl-none p-3">
          <div class="flex gap-1">
            <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
            <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
            <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Input area -->
    <div class="border-t p-4 bg-white">
      <div class="flex gap-2">
        <div class="flex-1 relative">
          <textarea
            ref="inputRef"
            v-model="inputText"
            :placeholder="placeholder"
            rows="1"
            class="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 pr-12 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-colors"
            @keydown="handleKeydown"
          />
        </div>
        <button
          @click="sendMessage"
          :disabled="!inputText.trim() || isActuallyTyping"
          class="flex-shrink-0 w-10 h-10 bg-brand-600 text-white rounded-lg flex items-center justify-center hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <PaperAirplaneIcon v-if="!isActuallyTyping" class="w-5 h-5" />
          <StopIcon v-else class="w-5 h-5" />
        </button>
      </div>
      <p class="text-xs text-slate-400 mt-2 text-center">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  </div>
</template>

<style scoped>
.chat-interface {
  min-height: 400px;
}

textarea {
  min-height: 44px;
  max-height: 120px;
}
</style>
