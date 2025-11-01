/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3faf9',
          100: '#d9f3f1',
          300: '#7fe0d7',
          500: '#06b6a4',
          600: '#0D9488',
          700: '#057a6b',
          // 50: '#E6FFFA',
          // 100: '#B2F5EA',
          // 500: '#14B8A6',
          // 600: '#0D9488',
          // 700: '#0F766E',
        },
      },
    },
  },
  plugins: [],
}
