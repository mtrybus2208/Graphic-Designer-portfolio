const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isProd = process.env.NODE_ENV!="development";

const cssDev = ['style-loader', 'css-loader', 'postcss-loader' , 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
	    			fallback:'style-loader',
	    			loader: ['css-loader','postcss-loader','sass-loader'],
	    			publicPath: ''
	    		});
const cssConfig = isProd ? cssProd : cssDev;
module.exports = {
	//define entry
	context: __dirname,
	entry: {
		main: './src/main.js',
		contact: './src/contact.js',
		portfolio: './src/portfolio.js'
	},

	output: {
 		path: __dirname + "/dist/",
		filename: '[name].boundle.js'
	},

	module: {
	  loaders: [
	    	{
	    		 test: /\.js$/, 
	    		 exclude: /(node_modules)/, 
	    		 loader: "babel-loader" ,
	    		 query: {
	    		 	presets:['env']	    		 	
	    		 }
	    	},
	    	{
	    		test: /\.scss$/,
	    		use: cssConfig 
	    	},
	    	{
	    		test: /\.(jpe?g|gif|png|svg)$/i,
	    		 
	    		use: "file-loader?name=img/[name].[ext]"

	    	},
			{
				test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader?name=/fonts/dancingscript/[name].[ext]'
			}
	  ]
	},
	plugins: [

		new HtmlWebpackPlugin({
			filename: './index.html',
	 
		    title: 'Grzegorz Barwiński | Graphic designer | O mnie',
		    excludeChunks: ['contact','portfolio'],
	 
		    template: './src/index.html',
		}),
		//contact
		new HtmlWebpackPlugin({
			filename: './contact.html',
	 
		    title: 'Grzegorz Barwiński | Graphic designer | Kontakt',
		    chunks: ['contact'],
		    template: './src/contact.html',
		}),
		//portfolio
		new HtmlWebpackPlugin({
			filename: './portfolio.html', 
 
		    title: 'Grzegorz Barwiński | Graphic designer | Portfolio',
		    chunks: ['portfolio'],
		    template: './src/portfolio.html', 
		}),
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: !isProd,
            allChunks: true
        }),
	]

};