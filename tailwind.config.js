/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cinzel'", "serif"],
        body: ["'Rajdhani'", "sans-serif"],
        mono: ["'Fira Mono'", "monospace"],
      },
      colors: {
        black: "#050a05",
        deep: "#0a110a",
        green: "#1a7a1a",
        bright: "#2ecc2e",
        glow: "#4dff4d",
        pale: "#a8d5a8",
        cream: "#e8f5e8",
        gold: "#c9a84c",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        float: "float 4s ease-in-out infinite",
        pulse2: "pulse2 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: { from: { opacity: 0, transform: "translateY(20px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        pulse2: { "0%,100%": { boxShadow: "0 0 0 0 rgba(46,204,46,0)" }, "50%": { boxShadow: "0 0 20px 4px rgba(46,204,46,0.3)" } },
      },
    },
  },
  plugins: [],
};
