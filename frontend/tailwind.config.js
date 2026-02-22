/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        hera: {
          lavender: "#E6E6FA",
          purple: "#6B46C1",
          deep: "#1A0B2E", /* Warmer, darker background */
          gold: "#D4AF37",
          pink: "#E03C8A", /* Powerful Luxury Pink */
          blush: "#FFD1DC" /* Soft highlight */
        },
      },
    },
  },
  plugins: [],
}