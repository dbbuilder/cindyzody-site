<template>
  <span class="scrambled-container inline-flex" :style="{ '--letter-count': letters.length }">
    <span
      v-for="(letter, index) in letters"
      :key="index"
      class="letter"
      :class="{ 'is-settled': isSettled }"
      :style="getLetterStyle(index)"
    >
      {{ letter }}
    </span>
  </span>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  delay: {
    type: Number,
    default: 300 // ms before animation starts
  },
  duration: {
    type: Number,
    default: 800 // ms for animation
  },
  stagger: {
    type: Number,
    default: 50 // ms between each letter
  },
  scrambleIntensity: {
    type: Number,
    default: 40 // pixels of displacement
  },
  color: {
    type: String,
    default: 'currentColor'
  },
  highlightFirst: {
    type: Boolean,
    default: true
  },
  highlightColor: {
    type: String,
    default: '#38a169' // brand green
  }
})

const letters = computed(() => props.text.split(''))
const isSettled = ref(false)

// Generate random offsets for each letter
const offsets = ref([])

function generateOffsets() {
  offsets.value = letters.value.map(() => ({
    x: (Math.random() - 0.5) * props.scrambleIntensity * 2,
    y: (Math.random() - 0.5) * props.scrambleIntensity * 2,
    rotation: (Math.random() - 0.5) * 60 // -30 to 30 degrees
  }))
}

function getLetterStyle(index) {
  const offset = offsets.value[index] || { x: 0, y: 0, rotation: 0 }
  const letterDelay = props.delay + (index * props.stagger)

  // Determine color - first letter can be highlighted
  const letterColor = props.highlightFirst && index === 0
    ? props.highlightColor
    : props.color

  if (!isSettled.value) {
    return {
      transform: `translate(${offset.x}px, ${offset.y}px) rotate(${offset.rotation}deg)`,
      opacity: 0.6,
      transition: `all ${props.duration}ms cubic-bezier(0.34, 1.56, 0.64, 1) ${letterDelay}ms`,
      color: letterColor,
      fontWeight: props.highlightFirst && index === 0 ? '700' : 'inherit'
    }
  }

  return {
    transform: 'translate(0, 0) rotate(0deg)',
    opacity: 1,
    transition: `all ${props.duration}ms cubic-bezier(0.34, 1.56, 0.64, 1) ${letterDelay}ms`,
    color: letterColor,
    fontWeight: props.highlightFirst && index === 0 ? '700' : 'inherit'
  }
}

onMounted(() => {
  generateOffsets()

  // Trigger settle animation after delay
  setTimeout(() => {
    isSettled.value = true
  }, 50)
})

// Re-scramble if text changes
watch(() => props.text, () => {
  isSettled.value = false
  generateOffsets()
  setTimeout(() => {
    isSettled.value = true
  }, 50)
})
</script>

<style scoped>
.scrambled-container {
  position: relative;
  display: inline-flex;
}

.letter {
  display: inline-block;
  white-space: pre;
  will-change: transform, opacity;
}

.letter.is-settled {
  transform: translate(0, 0) rotate(0deg) !important;
  opacity: 1 !important;
}
</style>
