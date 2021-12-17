const { commonConfig } = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: '127.0.0.1',
        port: 9000,
        hot: true,
        open: true,
        historyApiFallback: true
    }
});