const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { SourceMapDevToolPlugin } = require('webpack')

module.exports = {
	devServer: {
		historyApiFallback: true,
		port: 3000, // To do: Get from env variable.
		proxy: {
			'/api': 'http://localhost:3080', // To do: Get from env variable.
		},
	},
	devtool: 'source-map',
	entry: './src/index.tsx',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]__[hash:base64:5]',
							},
						},
					},
				],
			},
		],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		sourceMapFilename: '[name].js.map',
	},
	resolve: {
		extensions: ['.css', '.js', '.jsx', '.ts', '.tsx'],
		alias: {
			'#components': path.resolve(process.cwd(), 'src/components'),
			'#interfaces/*': path.resolve(process.cwd(), '../server/src/interfaces/'),
			'#models': path.resolve(process.cwd(), 'src/models'),
			'#views': path.resolve(process.cwd(), 'src/views'),
			'#utils': path.resolve(process.cwd(), 'src/utils'),
		},
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: 'public/index.html',
		}),
		new SourceMapDevToolPlugin({
			filename: '[file].map[query]',
		}),
	],
}
