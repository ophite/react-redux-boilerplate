let config = require('./webpack.config.base.babel.js');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    ...config,
    devtool: 'eval-source-map',
    devServer: {
        inline: true,
        host: '0.0.0.0',
        port: 3032,
        historyApiFallback: true,
        contentBase: path.join(__dirname, '/public')
        // contentBase: './public'
        // contentBase:  path.join(__dirname, '/public/static/')
        // stats: {
        //  colors: true,
        //  hash: false,
        //  timings: true,
        //  chunks: false,
        //  chunkModules: false,
        //  modules: false,
        // },
    },
    plugins: [
        ...config.plugins,
    ]
};
