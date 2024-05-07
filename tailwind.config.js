/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grey:'#2b2b2b',
        orange:'#d35029',
        bluish:"#00afb0"
      },
      fontFamily: {
        'play': ['Play', 'sans-serif'],
      },
    },
  },
  plugins: [],
}