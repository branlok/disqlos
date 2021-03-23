module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'base-gray':'#E9E8EB',
        'custom-pink': {
          400: '#F9F6FF',
          500: '#F3F1F5',
          550: '#ECE9F1',
          600: '#E5DEEC',
          900: '#755D8D',
          950: '#221C38',
        },
        'custom-gray': {
          500: '#F5F1F1'
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
