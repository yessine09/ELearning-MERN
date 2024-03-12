/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        font: ['Segoe UI'],
      },
      colors: {
        darkBlue: '#05445E',
        fancyBlue: '#209AB4',
        yellow: '#FFCC29',
        lightGreen: '#42FF74',
        lightBlue: '#D4F1F4',
        fancyYellow: '#FEB421',
        beige: '#FFCC29',
      },
      boxShadow: {
        '3XL': '0 0.1rem 1rem 0.25rem rgba(0, 0, 0, 0.05)',
      },
      borderColor: {
        inputBorderColor: 'rgb(31, 95, 130)',
      },
      minHeight: {
        minH: 'calc(1.4em + 1.55rem)',
      },
      backgroundPosition: {
        showpassPos: 'right calc(0.375em + 0.3875rem) center',
      },
      backgroundSize: {
        showpassSize: 'calc(0.75em + 0.775rem) calc(0.75em + 0.775rem)',
      },
      padding: {
        showpassPR: 'calc(1.5em + 1.55rem)',
        btn: 'calc(0.825rem) calc(1.75rem )',
      },
    },

    plugins: [],
  },
  plugins: [require('tailwind-scrollbar')],
}
