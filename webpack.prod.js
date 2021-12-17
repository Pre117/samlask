const { commonConfig } = require('./webpack.common');
const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(commonConfig, {
    mode: 'production',
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    }
});