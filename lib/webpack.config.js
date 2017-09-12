const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackConfig = require('./htmlwebpack.config.js');

const BASE = path.resolve('./');
const DIST = path.join(BASE, 'dist');
const SRC = path.join(BASE, 'src');
const CSS = path.join(SRC, 'css');

module.exports = {
  entry: {
    app: path.join(SRC, 'index.js')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: DIST
  },
  plugins: [new HtmlWebpackPlugin(htmlWebpackConfig)],
  output: {
    filename: '[name].bundle.js',
    path: DIST
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: { config: { path: './lib/postcss.config.js' } }
          }
        ]
      }
    ]
  }
};
