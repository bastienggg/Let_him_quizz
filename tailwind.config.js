/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"], // Ajoutez vos chemins ici
  theme: {
    extend: {
      fontFamily: {
        title: ["Permanent Marker", 'sans-serif'],
      },
    },
  },
  plugins: [],
}