/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'grid',
    'lg:grid-cols-2',
    'flex',
    'flex-col',
    'lg:flex-row', 
    'gap-14',
    'gap-5',
    'lg:gap-40'
  ]
}
