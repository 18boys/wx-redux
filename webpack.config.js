/**
 * @file webpack.config.js
 * @author shuai.li
 */

const path = require('path');

module.exports = {
  entry: {
    'wx-redux': './src/index.js',
    redux: './node_modules/redux',
  },
  output: {
    filename:'[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.js$/, loader: "babel-loader" }
    ]
  }
};
