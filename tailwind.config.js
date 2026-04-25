/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./App.tsx",
    "./main.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "#222222",
        background: "#0A0A0A",
        foreground: "#F7F7F5",
        primary: {
          DEFAULT: "#E8FF3A",
          foreground: "#050505",
        },
        muted: {
          DEFAULT: "#888888",
          foreground: "#888888",
        },
        ink: "#050505",
        ash: "#888888",
        lime: "#E8FF3A",
        offwhite: "#F7F7F5",
      },
      fontFamily: {
        barlow: ["Barlow Condensed", "sans-serif"],
        dmsans: ["DM Sans", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
        heading: ["Barlow Condensed", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.01em",
        widest: "0.1em",
      },
      keyframes: {
        "draw-ellipse": {
          "0%": { "stroke-dashoffset": "1000" },
          "100%": { "stroke-dashoffset": "0" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
      animation: {
        "draw-ellipse": "draw-ellipse 1.2s ease-in-out forwards",
        meteor: "meteor 5s linear infinite",
      },
    },
  },
  plugins: [],
}
