const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { resolve } = require('path');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const { PROJECT_PATH } = require('../constant');

module.exports = merge(common, {
    mode: 'production', // 生产
    devtool: 'inline-source-map',
    output: {},
    plugins: [
        new PurgeCSSPlugin({
            // 去除多余的样式
            paths: glob.sync(`${resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,less,css}`, { nodir: true }),
            whitelist: ['html', 'body'],
        }),
    ],
});
