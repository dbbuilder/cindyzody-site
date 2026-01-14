<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50" @close="close">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <!-- Close button -->
              <button
                @click="close"
                class="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <XMarkIcon class="w-5 h-5" />
              </button>

              <!-- Header -->
              <div class="text-center mb-6">
                <div class="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartIcon class="w-6 h-6 text-brand-600" />
                </div>
                <DialogTitle class="text-xl font-bold text-slate-900">
                  {{ mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password' }}
                </DialogTitle>
                <p class="text-sm text-slate-600 mt-1">
                  {{ mode === 'login' ? 'Sign in to save your practice sessions' : mode === 'signup' ? 'Start tracking your NVC journey' : 'Enter your email to reset your password' }}
                </p>
              </div>

              <!-- Login Form -->
              <form v-if="mode === 'login'" @submit.prevent="handleLogin" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    v-model="email"
                    type="email"
                    required
                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <input
                    v-model="password"
                    type="password"
                    required
                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    placeholder="••••••••"
                  />
                </div>

                <div class="flex items-center justify-between text-sm">
                  <label class="flex items-center">
                    <input type="checkbox" v-model="rememberMe" class="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                    <span class="ml-2 text-slate-600">Remember me</span>
                  </label>
                  <button type="button" @click="mode = 'forgot'" class="text-brand-600 hover:text-brand-700">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full bg-brand-600 text-white py-2.5 rounded-lg font-medium hover:bg-brand-700 transition-colors disabled:opacity-50"
                >
                  {{ loading ? 'Signing in...' : 'Sign In' }}
                </button>

                <p v-if="errorMessage" class="text-sm text-red-600 text-center">
                  {{ errorMessage }}
                </p>
              </form>

              <!-- Signup Form -->
              <form v-else-if="mode === 'signup'" @submit.prevent="handleSignup" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input
                    v-model="name"
                    type="text"
                    required
                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    v-model="email"
                    type="email"
                    required
                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <input
                    v-model="password"
                    type="password"
                    required
                    minlength="8"
                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    placeholder="At least 8 characters"
                  />
                </div>

                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full bg-brand-600 text-white py-2.5 rounded-lg font-medium hover:bg-brand-700 transition-colors disabled:opacity-50"
                >
                  {{ loading ? 'Creating account...' : 'Create Account' }}
                </button>

                <p v-if="errorMessage" class="text-sm text-red-600 text-center">
                  {{ errorMessage }}
                </p>

                <p v-if="successMessage" class="text-sm text-green-600 text-center">
                  {{ successMessage }}
                </p>
              </form>

              <!-- Forgot Password Form -->
              <form v-else @submit.prevent="handleForgotPassword" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    v-model="email"
                    type="email"
                    required
                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full bg-brand-600 text-white py-2.5 rounded-lg font-medium hover:bg-brand-700 transition-colors disabled:opacity-50"
                >
                  {{ loading ? 'Sending...' : 'Send Reset Link' }}
                </button>

                <p v-if="successMessage" class="text-sm text-green-600 text-center">
                  {{ successMessage }}
                </p>

                <button type="button" @click="mode = 'login'" class="w-full text-sm text-slate-600 hover:text-slate-900">
                  Back to sign in
                </button>
              </form>

              <!-- Divider -->
              <div v-if="mode !== 'forgot'" class="relative my-6">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-slate-200"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="bg-white px-4 text-slate-500">or continue with</span>
                </div>
              </div>

              <!-- OAuth Providers -->
              <div v-if="mode !== 'forgot'" class="space-y-3">
                <button
                  @click="handleOAuth('google')"
                  class="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span class="text-sm font-medium text-slate-700">Google</span>
                </button>
              </div>

              <!-- Toggle Mode -->
              <p v-if="mode !== 'forgot'" class="text-center text-sm text-slate-600 mt-6">
                {{ mode === 'login' ? "Don't have an account?" : 'Already have an account?' }}
                <button
                  type="button"
                  @click="mode = mode === 'login' ? 'signup' : 'login'"
                  class="text-brand-600 hover:text-brand-700 font-medium ml-1"
                >
                  {{ mode === 'login' ? 'Sign up' : 'Sign in' }}
                </button>
              </p>

              <!-- Guest Mode -->
              <div class="mt-6 pt-4 border-t border-slate-100">
                <button
                  @click="continueAsGuest"
                  class="w-full text-sm text-slate-500 hover:text-slate-700"
                >
                  Continue as guest (data stored locally)
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, watch } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild
} from '@headlessui/vue'
import { XMarkIcon, HeartIcon } from '@heroicons/vue/24/outline'
import { useAuth } from '../../composables/useAuth'

const props = defineProps({
  isOpen: Boolean,
  initialMode: {
    type: String,
    default: 'login'
  }
})

const emit = defineEmits(['close', 'authenticated', 'guest'])

const { signIn, signUp, signInWithProvider, resetPassword, loading } = useAuth()

const mode = ref(props.initialMode)
const email = ref('')
const password = ref('')
const name = ref('')
const rememberMe = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    // Reset form when opened
    email.value = ''
    password.value = ''
    name.value = ''
    errorMessage.value = ''
    successMessage.value = ''
    mode.value = props.initialMode
  }
})

function close() {
  emit('close')
}

async function handleLogin() {
  errorMessage.value = ''
  const { error } = await signIn({ email: email.value, password: password.value })

  if (error) {
    errorMessage.value = error
  } else {
    emit('authenticated')
    close()
  }
}

async function handleSignup() {
  errorMessage.value = ''
  successMessage.value = ''

  const { data, error } = await signUp({
    email: email.value,
    password: password.value,
    name: name.value
  })

  if (error) {
    errorMessage.value = error
  } else if (data?.user?.identities?.length === 0) {
    errorMessage.value = 'An account with this email already exists'
  } else {
    successMessage.value = 'Check your email to confirm your account!'
  }
}

async function handleForgotPassword() {
  errorMessage.value = ''
  successMessage.value = ''

  const { error } = await resetPassword(email.value)

  if (error) {
    errorMessage.value = error
  } else {
    successMessage.value = 'Check your email for the reset link!'
  }
}

async function handleOAuth(provider) {
  await signInWithProvider(provider)
}

function continueAsGuest() {
  emit('guest')
  close()
}
</script>
