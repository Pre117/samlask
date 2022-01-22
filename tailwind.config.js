module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  content: [],
  theme: {
    extend: {
      gridTemplateRows: {
        'blogItem': '1.2rem 2.75rem 3.25rem'
      }
    },
  },
  plugins: [],
  variants: {
    extend: {
    }
  }
}
