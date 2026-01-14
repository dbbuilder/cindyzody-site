# Phase 1: UI Enhancement Plan

## Objective

Transform the current Vue 3 + Tailwind implementation into a best-of-breed UI with modern component patterns, accessibility compliance, and polished interactions.

---

## Current State Analysis

### Strengths
- Clean, nature-inspired color palette (brand, earth, sage)
- Mobile-responsive layouts
- Consistent card-based design language
- Feature-rich custom scheduler component

### Gaps Identified
- **Unused Dependencies**: @headlessui/vue and @heroicons/vue installed but not used
- **Inline SVGs**: All icons are hand-coded SVGs instead of using Heroicons
- **No Headless UI**: Missing accessible Dialog, Popover, Listbox, Menu components
- **Limited Animations**: No micro-interactions or page transitions
- **Accessibility Gaps**: Missing ARIA live regions, focus management, skip links
- **No Dark Mode**: Single light theme only
- **Inconsistent Components**: Similar patterns reimplemented across pages

---

## Implementation Plan

### 1. Component Library Setup

#### 1.1 Create Base Components

```
src/components/ui/
├── Button.vue           # Primary, secondary, ghost variants
├── Card.vue             # Reusable card wrapper
├── Icon.vue             # Heroicons wrapper
├── Input.vue            # Form input with validation
├── Textarea.vue         # Multiline input
├── Select.vue           # Headless UI Listbox wrapper
├── Dialog.vue           # Headless UI Dialog wrapper
├── Popover.vue          # Headless UI Popover wrapper
├── Menu.vue             # Headless UI Menu wrapper
├── Badge.vue            # Status badges
├── Spinner.vue          # Loading indicator
├── Skeleton.vue         # Content placeholder
└── index.js             # Barrel export
```

#### 1.2 Button Component Specification

```vue
<!-- src/components/ui/Button.vue -->
<template>
  <component
    :is="as"
    :class="[
      'inline-flex items-center justify-center font-medium rounded-lg transition-all',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500',
      sizeClasses[size],
      variantClasses[variant],
      { 'opacity-50 cursor-not-allowed': disabled || loading }
    ]"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <Spinner v-if="loading" class="w-4 h-4 mr-2" />
    <slot />
  </component>
</template>

<script setup>
defineProps({
  as: { type: [String, Object], default: 'button' },
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'ghost', 'danger'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  loading: Boolean,
  disabled: Boolean
})
</script>
```

### 2. Heroicons Integration

#### 2.1 Replace Inline SVGs

**Before (current):**
```vue
<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14..." />
</svg>
```

**After:**
```vue
<EnvelopeIcon class="w-5 h-5" />
```

#### 2.2 Icon Wrapper Component

```vue
<!-- src/components/ui/Icon.vue -->
<template>
  <component :is="icon" :class="sizeClass" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: { type: Object, required: true },
  size: { type: String, default: 'md' }
})

const sizeClass = computed(() => ({
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8'
}[props.size]))
</script>
```

#### 2.3 Common Icons to Replace

| Current Usage | Heroicon |
|--------------|----------|
| Email icon | EnvelopeIcon |
| Phone icon | PhoneIcon |
| Location icon | MapPinIcon |
| Calendar icon | CalendarIcon |
| Clock icon | ClockIcon |
| Check icon | CheckIcon |
| Arrow right | ArrowRightIcon |
| Lightning bolt | BoltIcon |
| Heart icon | HeartIcon |
| Star icon | StarIcon |
| Menu icon | Bars3Icon |
| Close icon | XMarkIcon |

### 3. Headless UI Integration

#### 3.1 Dialog Component (for Modals)

Replace custom modal implementations with Headless UI Dialog:

```vue
<!-- src/components/ui/Dialog.vue -->
<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="$emit('close')" class="relative z-50">
      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel :class="['bg-white rounded-xl shadow-xl', sizeClasses[size]]">
              <slot />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
```

#### 3.2 Use Cases for Headless UI

| Component | Use Case |
|-----------|----------|
| Dialog | Scheduler confirmation, contact success, cookie consent |
| Menu | Mobile navigation, user dropdown |
| Listbox | Service selection, time zone picker |
| Popover | Info tooltips, help text |
| Disclosure | FAQ accordion, expandable sections |
| Switch | Toggle preferences, consent checkbox |

### 4. Animation & Transitions

#### 4.1 Page Transitions

```vue
<!-- src/App.vue -->
<template>
  <RouterView v-slot="{ Component, route }">
    <Transition
      name="page"
      mode="out-in"
      @before-enter="scrollToTop"
    >
      <component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
```

#### 4.2 Micro-interactions

```css
/* Hover lift effect for cards */
.card-hover {
  @apply transition-all duration-200;
}
.card-hover:hover {
  @apply -translate-y-1 shadow-lg;
}

/* Button press effect */
.btn-press:active {
  @apply scale-95;
}

/* Focus ring */
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2;
}
```

#### 4.3 Loading States

```vue
<!-- Skeleton loader for cards -->
<template>
  <div class="animate-pulse">
    <div class="h-48 bg-slate-200 rounded-t-xl" />
    <div class="p-4 space-y-3">
      <div class="h-4 bg-slate-200 rounded w-3/4" />
      <div class="h-4 bg-slate-200 rounded w-1/2" />
    </div>
  </div>
</template>
```

### 5. Accessibility Enhancements

#### 5.1 Skip Links

```vue
<!-- Add to App.vue -->
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
         bg-brand-600 text-white px-4 py-2 rounded-lg z-50"
>
  Skip to main content
</a>
```

#### 5.2 Focus Management

```js
// src/composables/useFocusTrap.js
import { onMounted, onUnmounted } from 'vue'

export function useFocusTrap(containerRef) {
  const handleKeyDown = (e) => {
    if (e.key !== 'Tab') return

    const focusable = containerRef.value?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    if (!focusable?.length) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      last.focus()
      e.preventDefault()
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus()
      e.preventDefault()
    }
  }

  onMounted(() => document.addEventListener('keydown', handleKeyDown))
  onUnmounted(() => document.removeEventListener('keydown', handleKeyDown))
}
```

#### 5.3 ARIA Live Regions

```vue
<!-- For dynamic content updates -->
<div aria-live="polite" aria-atomic="true" class="sr-only">
  {{ statusMessage }}
</div>
```

### 6. Dark Mode Support

#### 6.1 Tailwind Configuration

```js
// tailwind.config.cjs
module.exports = {
  darkMode: 'class', // or 'media' for system preference
  theme: {
    extend: {
      colors: {
        // Existing colors...
        dark: {
          bg: '#0f172a',
          card: '#1e293b',
          border: '#334155',
        }
      }
    }
  }
}
```

#### 6.2 Dark Mode Toggle

```vue
<!-- src/components/DarkModeToggle.vue -->
<template>
  <button @click="toggle" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
    <SunIcon v-if="isDark" class="w-5 h-5" />
    <MoonIcon v-else class="w-5 h-5" />
  </button>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const isDark = ref(false)

const toggle = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('darkMode', isDark.value)
}

onMounted(() => {
  isDark.value = localStorage.getItem('darkMode') === 'true' ||
    (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', isDark.value)
})
</script>
```

### 7. Form Enhancements

#### 7.1 Input Component with Validation

```vue
<!-- src/components/ui/Input.vue -->
<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-slate-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <input
        :id="id"
        v-model="modelValue"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :class="[
          'w-full rounded-lg border px-3 py-2 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500',
          error ? 'border-red-500 bg-red-50' : 'border-slate-300',
          disabled && 'bg-slate-100 cursor-not-allowed'
        ]"
        @blur="validate"
      />
      <ExclamationCircleIcon v-if="error" class="absolute right-3 top-2.5 w-5 h-5 text-red-500" />
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-slate-500">{{ hint }}</p>
  </div>
</template>
```

---

## File-by-File Migration Plan

### Priority 1: Core Components

| File | Changes |
|------|---------|
| `Header.vue` | Replace inline SVGs with Heroicons, add Headless UI Menu for mobile |
| `Footer.vue` | Replace inline SVGs with Heroicons |
| `ContactForm.vue` | Use new Input/Textarea components, add validation UI |
| `CustomScheduler.vue` | Use Dialog for confirmations, Listbox for service select |

### Priority 2: Pages

| Page | Changes |
|------|---------|
| `Home.vue` | Replace cards with Card component, add page transitions |
| `Services.vue` | Use Card component, add hover animations |
| `Practice.vue` | Use Dialog for demo modal, improve loading states |
| `Resources.vue` | Skeleton loaders for book images, consistent cards |

### Priority 3: Global

| Area | Changes |
|------|---------|
| `App.vue` | Add page transitions, skip link, dark mode toggle |
| `main.js` | Register global components |
| `tailwind.config.cjs` | Add dark mode, animation utilities |

---

## New Dependencies

```json
{
  "dependencies": {
    "@headlessui/vue": "^1.7.22",  // Already installed
    "@heroicons/vue": "^2.1.5"     // Already installed
  }
}
```

No new dependencies required - leverage existing unused packages.

---

## Testing Checklist

- [ ] Lighthouse accessibility score > 95
- [ ] All interactive elements have focus states
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces dynamic content
- [ ] Dark mode persists across sessions
- [ ] Page transitions are smooth
- [ ] Loading states appear for async operations
- [ ] Form validation provides clear feedback
- [ ] Mobile navigation is accessible

---

## Success Criteria

1. **Consistency**: Single source of truth for all UI components
2. **Accessibility**: WCAG 2.1 AA compliance
3. **Performance**: No regression in Lighthouse scores
4. **Developer Experience**: Clear component API, documented props
5. **User Experience**: Polished interactions, clear feedback
