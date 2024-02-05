/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        'ig-pink':'#FF6476',
        'ig-blue':'#112640',
        'ig-teal':'#86D7EA',
        'ig-pink-100':'#cf5160',
      }
    },
  },

  plugins: [require('@tailwindcss/forms')],
}
