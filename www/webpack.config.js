const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        bundle: path.join(__dirname, 'src', 'index')
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    devServer: {
        contentBase: './public'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ]
};
