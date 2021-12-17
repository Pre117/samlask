const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolvePath = (_path) => path.resolve(__dirname, _path);

commonConfig = {
    // 入口设置
    entry: resolvePath('./src/index.tsx'),

    // 出口设置
    output: {
        filename: '[name].bundle.js',
        path: resolvePath('./dist'),
        publicPath: '/',
        clean: true
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    // loader设置
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
            // 打包html中的img图片资源
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset'
            }
        ]
    },

    // plugin设置
    plugins: [
        new HtmlWebpackPlugin({
            template: resolvePath('./public/index.html'),
            title: 'samlask',
            filename: 'index.html'
        })
    ],

    target: 'web'
}

module.exports = {
    resolvePath,
    commonConfig
}