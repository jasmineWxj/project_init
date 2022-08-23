const { resolve } = require('path');
const { PROJECT_PATH, isDev } = require('../constant');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css 单独文件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // css 代码压缩

module.exports = {
    entry: {
        app: resolve(PROJECT_PATH, './src/index.js'),
    },
    output: {
        filename: `js/[name]${isDev ? '' : '.[hash:8]'}.js`,
        path: resolve(PROJECT_PATH, './dist'),
        clean: true, //清理dist
        assetModuleFilename: 'images/[contenthash][ext]',
    },
    module: {
        rules: [
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash:8][ext][query]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
            },
            {
                test: /\.(mp3|mp4|avi)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/[hash:8][ext]',
                },
            },

            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash:8][ext][query]',
                },
            },
            {
                test: /\.txt$/,
                type: 'asset/source',
            },
            {
                test: /\.css$/, //只检测 css 为后缀的文件
                use: [
                    // 执行顺序 从下到上
                    // 'style-loader', //style-loader 将js 中的css通过创建style 标签添加
                    MiniCssExtractPlugin.loader,
                    // html 文件中生效
                    'css-loader', //将css 资源编译成commonjs的模块到js
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env', //能解决大部分兼容问题
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env', //能解决大部分兼容问题
                                ],
                            },
                        },
                    },
                    'less-loader',
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(PROJECT_PATH, './public/index.html'),
            filename: 'index.html',
            cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
            minify: isDev
                ? false
                : {
                      removeAttributeQuotes: true,
                      collapseWhitespace: true,
                      removeComments: true,
                      collapseBooleanAttributes: true,
                      collapseInlineTagWhitespace: true,
                      removeRedundantAttributes: true,
                      removeScriptTypeAttributes: true,
                      removeStyleLinkTypeAttributes: true,
                      minifyCSS: true,
                      minifyJS: true,
                      minifyURLs: true,
                      useShortDoctype: true,
                  },
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].bundle.css',
        }),
        new CssMinimizerPlugin(),
    ],
};
