module.exports = {
    plugins: [
        // 处理postcss规范
        require('postcss-import'),
        // tailwindcss插件
        require('tailwindcss'),
        // 自动写--webkit--代码，用来兼容不同浏览器
        require('autoprefixer'),
    ]
}