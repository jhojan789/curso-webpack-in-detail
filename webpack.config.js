const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'
  },
  resolve: {
    extensions:['.js'],
    alias:{
      '@utils' : path.resolve(__dirname,'src/utils/'),
      '@templates' : path.resolve(__dirname,'src/templates/'),
      '@styles' : path.resolve(__dirname,'src/styles/'),
      '@images' : path.resolve(__dirname,'src/assets/images/')

      
    }
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
          filename: 'assets/fonts/[name].[contenthash][ext][query]'
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
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css'
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname,"src","assets/images"),
    //       to: "assets/images"
    //     }
    //   ]
    // })
    new DotenvWebpack(),
    new CleanWebpackPlugin()
  ],
  optimization:{
    minimize: true,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }
}

// in order to execute this file without a webpack.config.js 
// use npx webpack --mode production --config webpack.config.js