const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src', 'index'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'react-input.js',
        library: 'ReactInput',
        libraryTarget: 'umd'
    },
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
        // new webpack.DefinePlugin({
        //     "process.env": {
        //         // This has effect on the react lib size
        //         "NODE_ENV": JSON.stringify("production")
        //     }
        // }),
        // new webpack.optimize.UglifyJsPlugin()
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
