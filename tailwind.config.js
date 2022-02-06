module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateRows: {
        'blogItem': '1.2rem 2.75rem 3.25rem'
      },
      height: {
        'chatRoom': 'calc(100% - 7rem)'
      },
      maxWidth: {
        '3/5': '60%'
      }
    },
  },
  plugins: [],
  variants: {
    extend: {
    }
  }
}
