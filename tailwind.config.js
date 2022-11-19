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
      fontSize: {
        "240": "10vw",
      },
      zIndex: {
        "999": 999,
        "1000": 1000,
      },
      spacing: {
        "px-2": "2px",
        "0.5": "0.5rem",
        "1vw": "1vw",
        "2vw": "2vw",
        "3vw": "3vw",
        "4vw": "4vw",
        "5vw": "5vw",
        "10vw": "10vw",
        "20vw": "20vw",
      },
      borderRadius: {
        "upperCircle": "calc(10vw + 1px)",
      },
      scale: {
        "200": "2",
      },
      animation: {
        'sound': 'soundScale 1.5s infinite ease',
      },
      keyframes: {
        soundScale: {
          '0% 100%': { transform: 'scaleY(2)' },
          '50%': { transform: 'scaleY(15)' },
        }
      }
    },
  },
  variants: {
    animationDelay: ["responsive", "hover"],
  },
  plugins: [
    require("tailwindcss-animation-delay"),
  ],
}
