/**
 * @file webpack.config.js
 * @author shuai.li
 */

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'wx-redux': './src/index.js',
  },
  output: {
    filename:'[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'node_modules/redux/dist/redux.min.js',
        to: 'redux.js'
      }
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      }
    ]
  }
};
