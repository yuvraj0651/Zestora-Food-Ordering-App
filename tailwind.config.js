/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        rotateOuter: {
          "0%": { transform: 'rotate(0deg)' },
          "100%": { transform: 'rotate(100deg)' },
        },
      },
      animation: {
        rotateOuter: "rotateOuter 5s linear infinite",
      }
    },
  },
  plugins: [],
}
