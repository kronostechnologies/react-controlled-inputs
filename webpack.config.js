const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, 'src', 'index'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'react-input.js',
        library: 'ReactControlledInputs',
        libraryTarget: 'umd',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
            test: /\.js(x)*?$/,
            exclude: /node_modules/,
            loader: 'babel'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    externals: [
        {
            react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
            }
        }
    ]
};
