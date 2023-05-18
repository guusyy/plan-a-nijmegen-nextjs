/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pa-red': '#f0250a',
        'pa-maroon': 'hsl(10,74%,23%)',
      }
    },
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
