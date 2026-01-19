/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#F6F0D7",
          primary: "#C5D89D",
          secondary: "#9CAB84",
          dark: "#89986D",
        }, 
      },
    },
  },
  plugins: [],
}