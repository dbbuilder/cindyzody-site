/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7f8',
          100: '#ffe6ea',
          200: '#ffc0c7',
          300: '#ff8d98',
          400: '#ff5a69',
          500: '#e6374a',   // warm heart-red (logo)
          600: '#c5273b',
          700: '#a31f31',
          800: '#7f1826',
          900: '#61131e'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}