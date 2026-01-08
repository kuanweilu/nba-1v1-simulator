/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nba-blue': '#1a365d',
        'nba-orange': '#ed8936',
        'nba-dark': '#1a202c',
      }
    },
  },
  plugins: [],
}
