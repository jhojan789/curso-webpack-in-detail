const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


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
      },
      {
        test: /\.css|.styl$/i,
        use:[MiniCssExtractPlugin.loader, 'css-loader','stylus-loader']
      },
      {
        test: /.png/,
        type: 'asset/resource',
        generator:{
          filename: 'assets/images/[hash][ext][query]'
        }

      },
      {
        test: /\.(woff|woff2)$/i,
        type: 'asset/resource',
        // loader: 'url-loader',
        // options: {
        //   limit: 10000,
        //   mimetype: 'application/font-woff',
        //   name: '[name].[ext]', 
        //   outputPath: 'assets/fonts',
        //   publicPath: 'assets/fonts',
        //   esModule: false
        // },
        generator:{
          filename: 'assets/fonts/[hash][ext][query]'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname,"src","assets/images"),
    //       to: "assets/images"
    //     }
    //   ]
    // })

  ]
}

// in order to execute this file without a webpack.config.js 
// use npx webpack --mode production --config webpack.config.js