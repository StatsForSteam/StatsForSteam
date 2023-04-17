/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      Roboto: ["Roboto"],
    },
    colors: {
      'dark': '#06283D',
      'seconday': '#1363DF',
      'primary': '#47B5FF',
      'light': '#DFF6FF',
    },
  },
  plugins: [],
}