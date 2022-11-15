/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    colors: {
      black: "#000000",
      white: "#ffffff",
      gray: "#A9A7A1",
    },
    fontFamily: {
      sans: ["Linlegrey", "Roboto"],
      serif: ["Destine", "Helvetica Neue"],
      genshin: ["Genshin", "Roboto"]
    },
    extend: {
      spacing: {
        "1vw": "1vw",
        "2vw": "2vw"
      },
      scale: {
        "200": "2",
      },
      animation: {
        'sound': 'soundScale 0.5s infinite',
      },
      keyframes: {
        soundScale: {
          '0%': { transform: 'scaleY(2)' },
          '100%': { transform: 'scaleY(15)' },
        }
      }
    },
  },
  plugins: [],
}
