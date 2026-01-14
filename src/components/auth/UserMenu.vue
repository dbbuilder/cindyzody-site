<template>
  <div class="relative">
    <!-- Loading state -->
    <div v-if="loading" class="w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div>

    <!-- Authenticated user -->
    <Menu v-else-if="isAuthenticated" as="div" class="relative">
      <MenuButton class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
        <div class="w-7 h-7 bg-brand-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {{ initials }}
        </div>
        <span class="text-sm font-medium text-slate-700 hidden sm:block">{{ displayName }}</span>
        <ChevronDownIcon class="w-4 h-4 text-slate-500" />
      </MenuButton>

      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-slate-100 rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
          <div class="px-4 py-3">
            <p class="text-sm font-medium text-slate-900">{{ displayName }}</p>
            <p class="text-xs text-slate-500 truncate">{{ user?.email }}</p>
          </div>

          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <RouterLink
                to="/practice"
                :class="[active ? 'bg-slate-50' : '', 'flex items-center gap-3 px-4 py-2 text-sm text-slate-700']"
              >
                <SparklesIcon class="w-4 h-4 text-slate-400" />
                Practice
              </RouterLink>
            </MenuItem>

            <MenuItem v-slot="{ active }">
              <RouterLink
                to="/history"
                :class="[active ? 'bg-slate-50' : '', 'flex items-center gap-3 px-4 py-2 text-sm text-slate-700']"
              >
                <ClockIcon class="w-4 h-4 text-slate-400" />
                Session History
              </RouterLink>
            </MenuItem>

            <MenuItem v-slot="{ active }">
              <RouterLink
                to="/progress"
                :class="[active ? 'bg-slate-50' : '', 'flex items-center gap-3 px-4 py-2 text-sm text-slate-700']"
              >
                <ChartBarIcon class="w-4 h-4 text-slate-400" />
                Progress
              </RouterLink>
            </MenuItem>
          </div>

          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <RouterLink
                to="/settings"
                :class="[active ? 'bg-slate-50' : '', 'flex items-center gap-3 px-4 py-2 text-sm text-slate-700']"
              >
                <Cog6ToothIcon class="w-4 h-4 text-slate-400" />
                Settings
              </RouterLink>
            </MenuItem>

            <MenuItem v-slot="{ active }">
              <button
                @click="handleSignOut"
                :class="[active ? 'bg-slate-50' : '', 'flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700']"
              >
                <ArrowRightOnRectangleIcon class="w-4 h-4 text-slate-400" />
                Sign out
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>

    <!-- Guest user -->
    <button
      v-else
      @click="$emit('openAuth')"
      class="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors text-sm font-medium"
    >
      <UserIcon class="w-4 h-4" />
      <span class="hidden sm:block">Sign In</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {
  ChevronDownIcon,
  UserIcon,
  SparklesIcon,
  ClockIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'
import { useAuth } from '../../composables/useAuth'

defineEmits(['openAuth'])

const { user, isAuthenticated, displayName, loading, signOut } = useAuth()

const initials = computed(() => {
  const name = displayName.value
  if (!name) return '?'
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
})

async function handleSignOut() {
  await signOut()
}
</script>
