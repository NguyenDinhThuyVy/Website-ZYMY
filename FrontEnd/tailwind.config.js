/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: '#fc428fff',
        pink_1: '#f5ebedff',
        pink_2: '#f582b2ff',
        pink_3: '#f72f7fff',
        yellow: '#ffad8fff'
      }
    }
  },
  plugins: []
}
