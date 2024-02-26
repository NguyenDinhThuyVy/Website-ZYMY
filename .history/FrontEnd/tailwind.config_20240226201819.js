/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: '#fc428fff',
        pink_1: '#f5ebedff',
        pink_2: '#f582b2ff'
      }
    }
  },
  plugins: []
}
