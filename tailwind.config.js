/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkElmts: '#2b3945',
        darkBg: '#202c37',
        darkMainBg: "#222F38",
        lightTxt: '	#111517',
        lightInput: '#858585',
        lightBg: "#fafafa",
        white: '#ffffff'
      }
    },
  },
  plugins: [],
}