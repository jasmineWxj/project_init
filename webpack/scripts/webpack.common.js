const { resolve } = require('path');
const { PROJECT_PATH, isDev } = require('../constant');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css 单独文件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // css 代码压缩
const WebpackBar = require('webpackbar'); // 显示打包速度
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'); // 打包或启动本地服务时给予错误提示
console.log(resolve(PROJECT_PATH, './src/components'));
module.exports = {
    entry: {
        app: resolve(PROJECT_PATH, './src/index.tsx'),
    },
    output: {
        filename: `js/[name]${isDev ? '' : '.[hash:8]'}.js`,
        path: resolve(PROJECT_PATH, './dist'),
        clean: true, //清理dist
        assetModuleFilename: 'images/[contenthash][ext]',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            '@': resolve(PROJECT_PATH, './src/components'),
        },
    },
    performance: {
        hints: 'warning', // 枚举
        maxAssetSize: 30000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
        assetFilter: function (assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        },
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
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                options: { cacheDirectory: true }, // 公共文件缓存
                exclude: /node_modules/,
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
        new WebpackBar({
            name: isDev ? '正在启动⛷‍' : '正在打包⛷‍',
            color: '#fa8c16',
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: resolve(PROJECT_PATH, './tsconfig.json'),
            },
        }),
    ],
};
