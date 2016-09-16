let config = require('./webpack.config.base.babel.js');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	...config,
	devtool: 'eval-source-map',
	devServer: {
		inline: true,
		hot: true,
		host: '0.0.0.0',
		port: 3032,
		historyApiFallback: true,
		contentBase: path.join(__dirname, '/public')
		// contentBase: './public'
		// contentBase:  path.join(__dirname, '/public/static/')
		// stats: {
		// 	colors: true,
		// 	hash: false,
		// 	timings: true,
		// 	chunks: false,
		// 	chunkModules: false,
		// 	modules: false,
		// },
	},
	plugins: [
		...config.plugins,
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: '../../index.html',
			template: 'develop/index.html'
		}),
		new webpack.ProvidePlugin({
			'React': 'react'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		})
	]
};
