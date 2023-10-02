const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  resolve: {
    extensions:['.js']
  },
  module:{
    rules:[
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: 'index.html'
    })

  ]
}

// in order to execute this file without a webpack.config.js 
// use npx webpack --mode production --config webpack.config.js