const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const proxySetting = require('../../src/setProxy');
const { SERVER_HOST, SERVER_PORT } = require('../constant');
module.exports = merge(common, {
    mode: 'development', // 开发
    devtool: 'cheap-module-source-map', // devtool:'inline-source-map',
    stats: 'errors-only', // 仅仅错误 log
    devServer: {
        host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
        // port: SERVER_PORT, // 指定端口，默认是8080
        // stats: 'errors-only', // 终端仅打印 error
        // clientLogLevel: 'silent', // 日志等级
        compress: true, // 是否启用 gzip 压缩
        open: true, // 打开默认浏览器
        hot: true, // 热更新
        proxy: { ...proxySetting },
        client: {
            logging: 'error', //只打印报错，其实只要这个配置就好了
            overlay: {
                //有报错发生，直接覆盖浏览器视窗，显示错误
                errors: true,
                warnings: false,
            },
        },
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
