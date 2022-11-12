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
    extend: {},
  },
  plugins: [],
}
