/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  safelist: [
    // Need category classes (used with dynamic category IDs)
    ...['connection', 'physical', 'honesty', 'play', 'peace', 'autonomy', 'meaning'].flatMap(cat => [
      `bg-need-${cat}`,
      `bg-need-${cat}-light`,
      `bg-need-${cat}-dark`,
      `text-need-${cat}`,
      `text-need-${cat}-light`,
      `text-need-${cat}-dark`,
      `border-need-${cat}`,
      `border-need-${cat}-light`,
      `border-need-${cat}/30`,
      `bg-need-${cat}/20`,
      `hover:border-need-${cat}`,
    ]),
  ],
  theme: {
    extend: {
      colors: {
        // Primary nature green palette
        brand: {
          25: '#f8fdf8',    // Ultra light green
          50: '#f0fdf4',    // Very light green
          100: '#dcfce7',   // Light green background
          200: '#bbf7d0',   // Soft green
          300: '#86efac',   // Medium green
          400: '#4ade80',   // Warm green
          500: '#22c55e',   // Primary green
          600: '#16a34a',   // Darker green
          700: '#15803d',   // Deep green
          800: '#166534',   // Very dark green
          900: '#14532d'    // Darkest green
        },
        // Secondary earthy palette (minimal brown)
        earth: {
          50: '#fefdfb',    // Very light cream
          100: '#fef7f0',   // Light cream
          200: '#feebc8',   // Soft cream
          300: '#fed7aa',   // Medium cream
          400: '#fdba74',   // Warm cream
          500: '#f59e0b',   // Golden
          600: '#d97706',   // Darker gold
          700: '#b45309',   // Deep gold
          800: '#92400e',   // Bronze
          900: '#78350f'    // Dark bronze
        },
        // Sage/forest accents
        sage: {
          25: '#fafbfa',    // Ultra light sage
          50: '#f6f8f6',    // Very light sage
          100: '#ecf0ec',   // Light sage
          200: '#d1ddd1',   // Soft sage
          300: '#a7c4a7',   // Medium sage
          400: '#7da87d',   // Warm sage
          500: '#5a8a5a',   // Primary sage
          600: '#4a7249',   // Darker sage
          700: '#3d5d3c',   // Deep sage
          800: '#2f4a2f',   // Very dark sage
          900: '#243a24'    // Darkest sage
        },
        // Feelings & Needs Design Tokens
        // Feelings when needs are MET (warm, positive colors)
        feeling: {
          met: {
            light: '#ecfdf5',   // Very light teal
            DEFAULT: '#10b981', // Emerald - met needs
            dark: '#047857'     // Dark emerald
          },
          // Feelings when needs are UNMET (cool, softer colors)
          unmet: {
            light: '#f0f9ff',   // Very light blue
            DEFAULT: '#6366f1', // Indigo - unmet needs
            dark: '#4338ca'     // Dark indigo
          }
        },
        // Need category colors
        need: {
          connection: {
            light: '#fdf2f8',   // Pink light
            DEFAULT: '#ec4899', // Pink
            dark: '#be185d'     // Pink dark
          },
          physical: {
            light: '#f0fdf4',   // Green light
            DEFAULT: '#22c55e', // Green
            dark: '#15803d'     // Green dark
          },
          honesty: {
            light: '#eff6ff',   // Blue light
            DEFAULT: '#3b82f6', // Blue
            dark: '#1d4ed8'     // Blue dark
          },
          play: {
            light: '#fefce8',   // Yellow light
            DEFAULT: '#eab308', // Yellow
            dark: '#a16207'     // Yellow dark
          },
          peace: {
            light: '#faf5ff',   // Purple light
            DEFAULT: '#a855f7', // Purple
            dark: '#7e22ce'     // Purple dark
          },
          autonomy: {
            light: '#fff7ed',   // Orange light
            DEFAULT: '#f97316', // Orange
            dark: '#c2410c'     // Orange dark
          },
          meaning: {
            light: '#eef2ff',   // Indigo light
            DEFAULT: '#6366f1', // Indigo
            dark: '#4338ca'     // Indigo dark
          }
        },
        // Intensity levels for feelings
        intensity: {
          low: '#94a3b8',      // Slate 400
          medium: '#64748b',   // Slate 500
          high: '#334155'      // Slate 700
        }
      },
      // Animation for card interactions
      animation: {
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out'
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}