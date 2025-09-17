/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
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
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}