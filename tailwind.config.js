module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      '40': '10em'
     },
    extend: {
      colors: {
        'base-gray':'#E9E8EB',
        'custom-pink': {
          300: '#F9F6FF',
          400: '#F9F6FF',
          500: '#F3F1F5',
          550: '#ECE9F1',
          600: '#E5DEEC',
          900: '#755D8D',
          950: '#221C38',
          1000: '#221C38',
        },
        'custom-gray': {
          500: '#F5F1F1'
        },
      },
      fontFamily: {
        body: ['Roboto']
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      margin: ['last', 'first'],

    }
  },
  plugins: [],
}
