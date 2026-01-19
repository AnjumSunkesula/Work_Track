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
          primary: "#B77466",
          light: "#FFE1AF",
          accent: "#E2B59A",
          dark: "#957C62",
        }, 
      },
    },
  },
  plugins: [],
}