const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const WebpackBar = require('webpackbar');
const paths = require('./paths');

module.exports = {
    entry: [paths.src + '/index'],
    output: {
        path: paths.dist,
        filename: '[name].bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
            },
            { test: /\.ts$/i, use: 'ts-loader' },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.hbs$/,
                use: 'handlebars-loader',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new WebpackBar(),
        new EslingPlugin({
            extensions: 'ts',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.public,
                    to: 'assets',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: paths.src + '/index.html',
            filename: 'index.html',
        }),
    ],
    resolve: {
        modules: [paths.src, 'node_modules'],
        extensions: ['.ts', '.js'],
    },
};
