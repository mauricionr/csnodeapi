var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var friendlyFormatter = require('eslint-friendly-formatter');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: ['webpack-dev-server/client?http://0.0.0.0:3000', 'webpack/hot/only-dev-server', './src/js/render.js'],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'app.js'
    },
    module: {
        loaders: require('./webpack.loaders')
    },
    postcss: function () {
        return [autoprefixer({ browsers: ['last 3 versions'] })];
    },
    eslint: {
        formatter: friendlyFormatter,
    },
    devtool: 'source-map',
    resolve: {
        extensions: require('./webpack.extensions')
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'prevenda',
            template: './src/index.html',
            scriptFilename: 'app.js'
        })
    ]
};
