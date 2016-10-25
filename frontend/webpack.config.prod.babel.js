import CompressionPlugin from 'compression-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

let config = require('./webpack.config.base.babel.js');

const webpack = require('webpack');
const path = require('path');

module.exports = {
    ...config,
    devtool: 'source-map',
    output: {
        // Absolute output directory
        path: path.join(__dirname, '/production/static/build/'),
        // Filename for entry points
        // Only adds hash in build mode
        filename: '[name].bundle.js',
        // Output path from the view of the page
        // Uses webpack-dev-server in development
        publicPath: 'static/build/',
        // Filename for non-entry points
        // Only adds hash in build mode
        chunkFilename: '[name].[hash].js'
    },
    plugins: [
        ...config.plugins,
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['require', 'export', '$super'],
            },
            compress: {
                warnings: false,
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: false,
            },
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
        // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
        // Only emit files when there are no errors
        new webpack.NoErrorsPlugin(),
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files
        // Disabled when in test mode or not in build mode
        new ExtractTextPlugin('[name].[hash].css', {
            disable: false
        })
    ]
};
