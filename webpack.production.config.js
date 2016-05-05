var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: ['./src/js/render.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        loaders: require('./webpack.loaders')
    },
    postcss: function () {
        return [autoprefixer({ browsers: ['last 3 versions'] })];
    },
    resolve: {
        extensions: require('./webpack.extensions')
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: 'prevenda',
            template: './src/index.html',
            scriptFilename: 'app.js'
        })
    ]
};
