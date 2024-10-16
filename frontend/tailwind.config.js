const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Poppins"', ...defaultTheme.fontFamily.sans],
        'mono': ['"Inconsolata"', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        'background': '#101010',
      }
    },
  },
  plugins: [],
}
