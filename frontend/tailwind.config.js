/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          200: '#9ae6b4',
          300: '#68d391',
          500: '#48bb78',
          600: '#38a169',
          700: '#2f855a',
        },
      },
    },
  },
  plugins: [],
}