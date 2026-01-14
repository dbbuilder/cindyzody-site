/**
 * Centralized Color Constants
 * Serene, healing-focused palette for NVC practice
 */

// Category gradients - serene, calming tones (no reds, no grays)
export const categoryGradients = {
  workplace: 'bg-gradient-to-br from-sky-400 via-cyan-500 to-teal-500',
  family: 'bg-gradient-to-br from-teal-400 via-emerald-500 to-green-500',
  romantic: 'bg-gradient-to-br from-purple-400 via-violet-400 to-indigo-400',
  friendship: 'bg-gradient-to-br from-indigo-400 via-blue-400 to-cyan-400',
  self: 'bg-gradient-to-br from-amber-300 via-yellow-400 to-lime-400'
}

// Category colors - serene, inviting (no reds, no grays)
export const categoryColors = {
  workplace: {
    bg: 'bg-sky-100',
    text: 'text-sky-700',
    accent: 'text-cyan-600',
    light: 'bg-sky-50'
  },
  family: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    accent: 'text-teal-600',
    light: 'bg-emerald-50'
  },
  romantic: {
    bg: 'bg-violet-100',
    text: 'text-violet-700',
    accent: 'text-purple-600',
    light: 'bg-violet-50'
  },
  friendship: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    accent: 'text-indigo-600',
    light: 'bg-blue-50'
  },
  self: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    accent: 'text-lime-600',
    light: 'bg-amber-50'
  }
}

// Category labels
export const categoryLabels = {
  workplace: 'Workplace',
  family: 'Family',
  romantic: 'Romantic',
  friendship: 'Friendship',
  self: 'Self-Compassion'
}

// Difficulty styles - serene colors
export const difficultyStyles = {
  beginner: {
    label: 'Beginner',
    class: 'bg-emerald-100/80 text-emerald-700 border border-emerald-200'
  },
  intermediate: {
    label: 'Intermediate',
    class: 'bg-sky-100/80 text-sky-700 border border-sky-200'
  },
  advanced: {
    label: 'Advanced',
    class: 'bg-violet-100/80 text-violet-700 border border-violet-200'
  }
}

// Feeling colors - serene tones for emotion wheel and displays
export const feelingColors = {
  needs_met: {
    primary: 'bg-teal-500',
    light: 'bg-teal-100',
    text: 'text-teal-700',
    dark: 'text-teal-800'
  },
  needs_unmet: {
    primary: 'bg-indigo-400',
    light: 'bg-indigo-100',
    text: 'text-indigo-700',
    dark: 'text-indigo-800'
  }
}

// Need category colors - serene palette
export const needCategoryColors = {
  connection: { gradient: 'from-teal-400 to-cyan-400', icon: 'text-teal-500' },
  physical: { gradient: 'from-amber-400 to-yellow-400', icon: 'text-amber-500' },
  honesty: { gradient: 'from-sky-400 to-cyan-400', icon: 'text-sky-500' },
  play: { gradient: 'from-violet-400 to-purple-400', icon: 'text-violet-500' },
  peace: { gradient: 'from-emerald-400 to-green-400', icon: 'text-emerald-500' },
  autonomy: { gradient: 'from-indigo-400 to-blue-400', icon: 'text-indigo-500' },
  meaning: { gradient: 'from-purple-400 to-violet-400', icon: 'text-purple-500' }
}

// Hero/featured section colors - serene palette
export const heroGradients = {
  primary: 'bg-gradient-to-br from-brand-500 via-brand-600 to-teal-700',
  warm: 'bg-gradient-to-br from-amber-400 via-yellow-400 to-lime-500',
  calm: 'bg-gradient-to-br from-teal-400 via-emerald-500 to-brand-600',
  soft: 'bg-gradient-to-br from-sky-300 via-cyan-400 to-teal-500'
}

// Helper functions
export function getCategoryGradient(category) {
  return categoryGradients[category] || categoryGradients.self
}

export function getCategoryLabel(category) {
  return categoryLabels[category] || 'Practice'
}

export function getCategoryColors(category) {
  return categoryColors[category] || categoryColors.self
}

export function getDifficultyStyle(difficulty) {
  return difficultyStyles[difficulty] || difficultyStyles.beginner
}
