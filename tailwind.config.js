module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            gridTemplateRows: {
                blogItem: '1.2rem 2.75rem 3.5rem 2rem',
            },
            height: {
                chatRoom: 'calc(100% - 7rem)',
            },
            maxWidth: {
                '3/5': '60%',
            },
            colors: {
                dark: {
                    item: '#282828',
                    head: 'rgb(29, 29, 29)',
                    icon: 'rgb(60, 60, 60)',
                    text: 'rgb(179, 179, 179)',
                    bg: 'rgb(26, 26, 26)',
                    fill: 'hsla(0, 0%, 100%, .1)'
                },
            },
        },
    },
    plugins: [],
    variants: {
        extend: {},
    },
}
