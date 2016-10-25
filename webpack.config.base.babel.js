// 'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: {
        'main': './app/entry/app.js'
    },
    output: {
        // Absolute output directory
        path: path.join(__dirname, '/public/static/build/'),
        // Filename for entry points
        // Only adds hash in build mode
        filename: '[name].bundle.js',
        // Output path from the view of the page
        // Uses webpack-dev-server in development
        publicPath: 'static/build',
        // publicPath: path.join(__dirname, 'static/build/'),
        // publicPath: isProd ? '/' : 'http://localhost:8080/',
        // Filename for non-entry points
        // Only adds hash in build mode
        chunkFilename: '[name].bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.(sass|scss)/, loader: 'style!css!resolve-url!sass?sourceMap' },

            { test: /\.gif$/, loader: 'url?limit=16000&mimetype=image/gif' },
            { test: /\.jpg$/, loader: 'url?limit=16000&mimetype=image/jpg' },
            { test: /\.png$/, loader: 'url?limit=16000&mimetype=image/png' },
            { test: /\.svg/, loader: 'url?limit=50000&mimetype=image/svg+xml' },
            { test: /\.(woff|woff2|ttf|eot)/, loader: 'url?limit=1' },

            { test: /\.jsx$/, loader: 'react-hot!babel', exclude: [/node_modules/, /public/] },
            { test: /\.js$/, loader: 'babel', exclude: [/node_modules/, /public/] },

            { test: /\.json$/, loader: 'json' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../../index.html',
            template: 'app/index.html'
        }),
        new webpack.ProvidePlugin({
            'React': 'react'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        // https://webpack.github.io/docs/list-of-plugins.html#2-explicit-vendor-chunk
        // new webpack.optimize.CommonsChunkPlugin({
        //
        // 	// This name 'vendor' ties into the entry definition
        // 	name: 'vendor',
        //
        // 	// We don't want the default vendor.js name
        // 	filename: 'vendor-bundle.js',
        //
        // 	// Passing Infinity just creates the commons chunk, but moves no modules into it.
        // 	// In other words, we only put what's in the vendor entry definition in vendor-bundle.js
        // 	minChunks: Infinity,
        // }),
    ],
    eslint: {
        configFile: '.eslintrc'
    },
    // /**
    //  * PostCSS
    //  * Reference: https://github.com/postcss/autoprefixer-core
    //  * Add vendor prefixes to your css
    //  */
    // postcss: [
    // 	autoprefixer({
    // 		browsers: [ 'last 2 version' ]
    // 	})
    // ]
};
