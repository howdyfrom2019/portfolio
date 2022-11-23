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
      blackTint: "rgba(0, 0, 0, 0.2)",
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
        "1001": 1001,
      },
      spacing: {
        "64": "64rem",
        "px-2": "2px",
        "0.5": "0.5rem",
        "1vw": "1vw",
        "2vw": "2vw",
        "3vw": "3vw",
        "4vw": "4vw",
        "5vw": "5vw",
        "10vw": "10vw",
        "20vw": "20vw",
        "2vmax": "2vmax",
        "10vmax": "10vmax",
        "20vmax": "20vmax",
        "full-4": "calc(100% + 4px)",
      },
      maxWidth: {
        "70": "70%",
      },
      maxHeight: {
        "px-712": "712px",
      },
      flex: {
        "5": 5,
        "8": "8 1 400px",
      },
      borderRadius: {
        "upperCircle": "calc(10vmax + 1px)",
      },
      borderWidth: {
        "1": "1px",
      },
      scale: {
        "200": "2",
      },
      transitionDuration: {
        "540": "540ms",
        "1200": "1200ms"
      },
      animation: {
        'sound': 'soundScale 1.5s infinite ease',
        'scroll': "scroll 1.2s infinite ease-in-out",
        'slideIn': "slideIn 0.54s ease",
        "slideOut": "slideOut 1.2s ease",
      },
      keyframes: {
        soundScale: {
          '0% 100%': { transform: 'scaleY(2)' },
          '50%': { transform: 'scaleY(15)' },
        },
        scroll: {
          '0%': { top: '1.5rem' },
          '100%': { top: '4rem' },
        },
        slideIn: {
          '0%': { transform: "translateX(100%)" },
          '100%': { transform: "translateX(0)" },
        },
        slideOut: {
          '0%': { transform: "translateX(0)" },
          '100%': { transform: "translateX(100%)" },
        },
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
