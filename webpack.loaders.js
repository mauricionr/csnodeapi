var path = require('path');
module.exports = [
    {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'src'),
        loaders: ['react-hot', 'babel', 'eslint']
    },
    {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass'
    },
    {
        test: /\.svg$/,
        loader: 'svg-inline'
    }
]