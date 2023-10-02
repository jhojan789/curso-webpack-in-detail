const path = require('path');


module.exports = {
  entry: './src/index.js',
  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  resolve: {
    extensions:['.js']
  }
}

// in order to execute this file without a webpack.config.js 
// use npx webpack --mode production --config webpack.config.js