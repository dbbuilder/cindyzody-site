<template>
  <Transition name="splash-fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-stone-50"
    >
      <div class="relative flex items-center justify-center" style="width: 500px; height: 200px;">
        <!-- Feelings circle (pink/rose) -->
        <div
          class="absolute w-36 h-36 rounded-full flex items-center justify-center transition-all duration-1000 ease-out"
          :class="merged ? 'opacity-100' : 'opacity-90'"
          :style="{
            background: 'linear-gradient(135deg, #E8B4B8 0%, #D4A5A5 100%)',
            left: merged ? '80px' : '40px',
            top: '50%',
            transform: 'translateY(-50%)'
          }"
        >
          <!-- Scrambled FEELINGS text -->
          <div class="text-white font-serif text-lg tracking-wide">
            <span
              v-for="(letter, index) in feelingsLetters"
              :key="'f-' + index"
              class="inline-block transition-all duration-700 ease-out"
              :style="getLetterStyle('feelings', index)"
            >{{ letter }}</span>
          </div>
        </div>

        <!-- Needs circle (green/sage) -->
        <div
          class="absolute w-36 h-36 rounded-full flex items-center justify-center transition-all duration-1000 ease-out"
          :class="merged ? 'opacity-100' : 'opacity-90'"
          :style="{
            background: 'linear-gradient(135deg, #9CBFA7 0%, #7BA889 100%)',
            right: merged ? '80px' : '40px',
            top: '50%',
            transform: 'translateY(-50%)'
          }"
        >
          <!-- Scrambled NEEDS text -->
          <div class="text-white font-serif text-xl tracking-wide">
            <span
              v-for="(letter, index) in needsLetters"
              :key="'n-' + index"
              class="inline-block transition-all duration-700 ease-out"
              :style="getLetterStyle('needs', index)"
            >{{ letter }}</span>
          </div>
        </div>

        <!-- Overlap blend with rotating benefits (appears when merged) -->
        <div
          class="absolute w-36 h-36 rounded-full transition-all duration-500 pointer-events-none flex items-center justify-center"
          :class="merged ? 'opacity-70' : 'opacity-0'"
          :style="{
            background: 'linear-gradient(135deg, #C4B5A8 0%, #B8A99C 100%)',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }"
        >
          <!-- Rotating benefit words -->
          <Transition name="benefit-fade" mode="out-in">
            <span
              :key="currentBenefit"
              class="text-white text-center text-sm font-medium px-3 leading-tight"
            >
              {{ currentBenefit }}
            </span>
          </Transition>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Capacitor } from '@capacitor/core'
import { SplashScreen } from '@capacitor/splash-screen'

const visible = ref(true)
const merged = ref(false)
const lettersSettled = ref(false)

const feelingsLetters = 'FEELINGS'.split('')
const needsLetters = 'NEEDS'.split('')

// NVC benefits to rotate through
const benefits = [
  'Deeper Connection',
  'True Understanding',
  'Peaceful Resolution',
  'Authentic Expression',
  'Compassionate Listening',
  'Emotional Clarity',
  'Stronger Relationships',
  'Inner Peace',
  'Mutual Respect',
  'Heartfelt Communication',
  'Empathy & Growth',
  'Healing Conversations'
]

const currentBenefitIndex = ref(0)
const currentBenefit = ref(benefits[0])
let benefitInterval = null

// Generate random offsets for each letter
const feelingsOffsets = feelingsLetters.map(() => ({
  x: (Math.random() - 0.5) * 60,
  y: (Math.random() - 0.5) * 60,
  rotation: (Math.random() - 0.5) * 90
}))

const needsOffsets = needsLetters.map(() => ({
  x: (Math.random() - 0.5) * 50,
  y: (Math.random() - 0.5) * 50,
  rotation: (Math.random() - 0.5) * 90
}))

function getLetterStyle(word, index) {
  const offsets = word === 'feelings' ? feelingsOffsets : needsOffsets
  const offset = offsets[index]
  const staggerDelay = index * 80

  if (!lettersSettled.value) {
    return {
      transform: `translate(${offset.x}px, ${offset.y}px) rotate(${offset.rotation}deg)`,
      opacity: 0.4,
      transitionDelay: `${staggerDelay}ms`
    }
  }

  return {
    transform: 'translate(0, 0) rotate(0deg)',
    opacity: 1,
    transitionDelay: `${staggerDelay}ms`
  }
}

// Start rotating benefits
function startBenefitRotation() {
  benefitInterval = setInterval(() => {
    currentBenefitIndex.value = (currentBenefitIndex.value + 1) % benefits.length
    currentBenefit.value = benefits[currentBenefitIndex.value]
  }, 800) // Change every 800ms
}

// Stop rotating benefits
function stopBenefitRotation() {
  if (benefitInterval) {
    clearInterval(benefitInterval)
    benefitInterval = null
  }
}

onMounted(async () => {
  // Hide native splash screen if in Capacitor
  if (Capacitor.isNativePlatform()) {
    try {
      await SplashScreen.hide()
    } catch (e) {
      // Ignore if already hidden
    }
  }

  // Check if we've shown splash recently
  const lastShown = sessionStorage.getItem('splash_shown')
  if (lastShown) {
    visible.value = false
    return
  }

  // Animation sequence:
  // 1. Circles start apart with scrambled letters
  // 2. Letters settle into place
  // 3. Circles merge together with rotating benefits
  // 4. Fade out

  // Start letter animation after brief delay
  setTimeout(() => {
    lettersSettled.value = true
  }, 200)

  // Merge circles and start benefit rotation after letters settle
  setTimeout(() => {
    merged.value = true
    startBenefitRotation()
  }, 1000)

  // Fade out
  setTimeout(() => {
    stopBenefitRotation()
    visible.value = false
    sessionStorage.setItem('splash_shown', 'true')
  }, 3500) // Extended to show more benefits
})

onUnmounted(() => {
  stopBenefitRotation()
})
</script>

<style scoped>
.splash-fade-leave-active {
  transition: opacity 0.6s ease-out;
}
.splash-fade-leave-to {
  opacity: 0;
}

/* Benefit text rotation animation */
.benefit-fade-enter-active,
.benefit-fade-leave-active {
  transition: all 0.3s ease;
}
.benefit-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.benefit-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
