<template>
  <section class="py-14">
    <div class="mx-auto max-w-4xl px-4">
      <!-- Header -->
      <div class="mb-8">
        <RouterLink
          to="/practice"
          class="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-4"
        >
          <ArrowLeftIcon class="w-4 h-4 mr-1" />
          Back to Practice
        </RouterLink>
        <h1 class="text-3xl font-bold">Session History</h1>
        <p class="text-slate-600 mt-2">Review your past practice sessions and continue your growth journey.</p>
      </div>

      <!-- Auth prompt for guests -->
      <div v-if="!isAuthenticated && sessions.length === 0" class="bg-brand-50 rounded-xl p-6 mb-8 border border-brand-100">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
            <UserIcon class="w-5 h-5 text-brand-600" />
          </div>
          <div>
            <h3 class="font-semibold text-brand-900">Sign in to track your progress</h3>
            <p class="text-sm text-brand-700 mt-1">
              Create an account to save your sessions across devices and track your growth over time.
            </p>
            <button
              @click="signIn"
              class="mt-4 inline-flex items-center px-4 py-2 bg-brand-600 text-white text-sm rounded-lg hover:bg-brand-700 transition-colors"
            >
              Sign In
              <ArrowRightIcon class="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="isLoading && sessions.length === 0" class="space-y-4">
        <div v-for="n in 3" :key="n" class="bg-white rounded-xl border p-6 animate-pulse">
          <div class="flex justify-between items-start mb-4">
            <div class="h-5 bg-slate-200 rounded w-32"></div>
            <div class="h-4 bg-slate-200 rounded w-24"></div>
          </div>
          <div class="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
          <div class="h-4 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="sessions.length === 0" class="text-center py-16">
        <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ClockIcon class="w-8 h-8 text-slate-400" />
        </div>
        <h3 class="text-lg font-semibold text-slate-900 mb-2">No sessions yet</h3>
        <p class="text-slate-600 mb-6 max-w-md mx-auto">
          Start your first practice session to begin tracking your journey with feelings and needs.
        </p>
        <RouterLink
          to="/practice"
          class="inline-flex items-center px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium"
        >
          Start Practicing
          <SparklesIcon class="w-4 h-4 ml-2" />
        </RouterLink>
      </div>

      <!-- Session list -->
      <div v-else class="space-y-4">
        <div
          v-for="session in sessions"
          :key="session.id"
          class="bg-white rounded-xl border hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center"
                  :class="session.completed ? 'bg-green-100' : 'bg-amber-100'"
                >
                  <CheckCircleIcon v-if="session.completed" class="w-5 h-5 text-green-600" />
                  <ClockIcon v-else class="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 class="font-semibold">{{ getSessionTypeLabel(session.type) }}</h3>
                  <p class="text-sm text-slate-500">{{ formatDate(session.created_at) }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span v-if="session.duration_seconds" class="text-sm text-slate-500">
                  {{ formatDuration(session.duration_seconds) }}
                </span>
                <span
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  :class="session.completed
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700'"
                >
                  {{ session.completed ? 'Completed' : 'In Progress' }}
                </span>
              </div>
            </div>

            <!-- Feelings and needs -->
            <div v-if="session.feelings?.length > 0 || session.needs?.length > 0" class="mb-4">
              <div v-if="session.feelings?.length > 0" class="mb-2">
                <span class="text-xs text-slate-500 uppercase tracking-wide">Feelings</span>
                <div class="flex flex-wrap gap-1.5 mt-1">
                  <span
                    v-for="feeling in session.feelings"
                    :key="feeling.id || feeling"
                    class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-rose-100 text-rose-700"
                  >
                    {{ feeling.label || feeling }}
                  </span>
                </div>
              </div>
              <div v-if="session.needs?.length > 0">
                <span class="text-xs text-slate-500 uppercase tracking-wide">Needs</span>
                <div class="flex flex-wrap gap-1.5 mt-1">
                  <span
                    v-for="need in session.needs"
                    :key="need.id || need"
                    class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-brand-100 text-brand-700"
                  >
                    {{ need.label || need }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Summary -->
            <p v-if="session.summary" class="text-sm text-slate-600 mb-4 line-clamp-2">
              {{ session.summary }}
            </p>

            <!-- Actions -->
            <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
              <button
                v-if="!session.completed"
                @click="resumeSession(session)"
                class="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                <PlayIcon class="w-4 h-4 mr-1" />
                Resume
              </button>
              <button
                @click="viewSession(session)"
                class="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                <EyeIcon class="w-4 h-4 mr-1" />
                View Details
              </button>
              <button
                @click="confirmDelete(session)"
                class="inline-flex items-center text-sm font-medium text-slate-400 hover:text-red-600 ml-auto"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Load more -->
        <div v-if="hasMore" class="text-center pt-4">
          <button
            @click="loadMore"
            :disabled="isLoading"
            class="inline-flex items-center px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            <template v-if="isLoading">Loading...</template>
            <template v-else>Load More</template>
          </button>
        </div>
      </div>

      <!-- Session detail modal -->
      <TransitionRoot :show="showDetail" as="template">
        <Dialog as="div" class="relative z-50" @close="showDetail = false">
          <TransitionChild
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="ease-in duration-200"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
                  <DialogTitle class="text-xl font-semibold mb-4">Session Details</DialogTitle>

                  <div v-if="selectedSession" class="space-y-4">
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-slate-500">{{ formatDate(selectedSession.created_at) }}</span>
                      <span class="text-slate-500">{{ formatDuration(selectedSession.duration_seconds) }}</span>
                    </div>

                    <div v-if="selectedSession.feelings?.length > 0">
                      <h4 class="text-sm font-medium text-slate-700 mb-2">Feelings Explored</h4>
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="feeling in selectedSession.feelings"
                          :key="feeling.id || feeling"
                          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-700"
                        >
                          {{ feeling.label || feeling }}
                        </span>
                      </div>
                    </div>

                    <div v-if="selectedSession.needs?.length > 0">
                      <h4 class="text-sm font-medium text-slate-700 mb-2">Needs Identified</h4>
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="need in selectedSession.needs"
                          :key="need.id || need"
                          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-100 text-brand-700"
                        >
                          {{ need.label || need }}
                        </span>
                      </div>
                    </div>

                    <div v-if="selectedSession.summary">
                      <h4 class="text-sm font-medium text-slate-700 mb-2">Session Summary</h4>
                      <p class="text-slate-600">{{ selectedSession.summary }}</p>
                    </div>

                    <!-- Conversation transcript -->
                    <div v-if="selectedSession.messages?.length > 0">
                      <h4 class="text-sm font-medium text-slate-700 mb-2">Conversation</h4>
                      <div class="bg-slate-50 rounded-lg p-4 max-h-64 overflow-y-auto space-y-3">
                        <div
                          v-for="(msg, idx) in selectedSession.messages"
                          :key="idx"
                          class="text-sm"
                          :class="msg.role === 'user' ? 'text-slate-700' : 'text-brand-700'"
                        >
                          <span class="font-medium">{{ msg.role === 'user' ? 'You' : 'AI' }}:</span>
                          {{ msg.content }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 flex justify-end">
                    <button
                      @click="showDetail = false"
                      class="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
                    >
                      Close
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

      <!-- Delete confirmation modal -->
      <TransitionRoot :show="showDeleteConfirm" as="template">
        <Dialog as="div" class="relative z-50" @close="showDeleteConfirm = false">
          <TransitionChild
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="ease-in duration-200"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
                  <DialogTitle class="text-lg font-semibold text-slate-900">Delete Session?</DialogTitle>
                  <p class="mt-2 text-sm text-slate-600">
                    This action cannot be undone. The session and all its data will be permanently removed.
                  </p>
                  <div class="mt-6 flex gap-3 justify-end">
                    <button
                      @click="showDeleteConfirm = false"
                      class="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      @click="handleDelete"
                      class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild
} from '@headlessui/vue'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ClockIcon,
  CheckCircleIcon,
  SparklesIcon,
  PlayIcon,
  EyeIcon,
  TrashIcon,
  UserIcon
} from '@heroicons/vue/24/outline'
import { useSession } from '../composables/useSession'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { sessions, isLoading, loadSessions, deleteSession, resumeSession: resumeSessionAction } = useSession()
const { isAuthenticated, signIn } = useAuth()

const showDetail = ref(false)
const showDeleteConfirm = ref(false)
const selectedSession = ref(null)
const sessionToDelete = ref(null)
const hasMore = ref(true)
const offset = ref(0)
const limit = 20

onMounted(async () => {
  try {
    const loaded = await loadSessions(limit, 0)
    hasMore.value = loaded.length === limit
  } catch (err) {
    console.error('Failed to load sessions:', err)
  }
})

async function loadMore() {
  offset.value += limit
  try {
    const loaded = await loadSessions(limit, offset.value)
    hasMore.value = loaded.length === limit
  } catch (err) {
    console.error('Failed to load more sessions:', err)
  }
}

function getSessionTypeLabel(type) {
  const labels = {
    'self-empathy': 'Self-Empathy Practice',
    'empathy': 'Empathy Practice',
    'expression': 'Honest Expression',
    'conflict': 'Conflict Resolution',
    'check-in': 'Daily Check-in'
  }
  return labels[type] || 'Practice Session'
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now - date
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) {
    return 'Today at ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  } else if (days === 1) {
    return 'Yesterday at ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  } else if (days < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'long', hour: 'numeric', minute: '2-digit' })
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
}

function formatDuration(seconds) {
  if (!seconds) return ''
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}m`
}

function viewSession(session) {
  selectedSession.value = session
  showDetail.value = true
}

function resumeSession(session) {
  resumeSessionAction(session)
  router.push('/practice')
}

function confirmDelete(session) {
  sessionToDelete.value = session
  showDeleteConfirm.value = true
}

async function handleDelete() {
  if (!sessionToDelete.value) return
  try {
    await deleteSession(sessionToDelete.value.id)
    showDeleteConfirm.value = false
    sessionToDelete.value = null
  } catch (err) {
    console.error('Failed to delete session:', err)
  }
}
</script>
