/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue, js, ts, jsx, tsx}"],
  theme: {
    extend: {
      colors: {
        "color-yellow": "#FCA311",
        "color-yellow-light":"#E5BA74",
        "color-bg": "#14213D",
        "color-grey":"#E5E5E5"
      },
      fontFamily:{
        syne: ['Syne']
      }
    },
  },
  plugins: [],
};
