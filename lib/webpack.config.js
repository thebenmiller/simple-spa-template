const path = require('path');

const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackConfig = require('./htmlwebpack.config.js');

const PROD = process.env.NODE_ENV === 'production';
const DEV = !PROD;

const BASE = path.resolve('./');
const DIST = path.join(BASE, 'dist');
const SRC = path.join(BASE, 'src');
const CSS = path.join(SRC, 'css');

module.exports = {
  entry: {
    app: path.join(SRC, 'index.js')
  },
  devtool: DEV ? 'inline-source-map' : 'false',
  devServer: {
    contentBase: DIST
  },
  plugins: [new DashboardPlugin(), new HtmlWebpackPlugin(htmlWebpackConfig)],
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
          {
            loader: 'css-loader',
            options: { importLoaders: 1, sourceMap: DEV }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: { path: './lib/postcss.config.js' },
              sourceMap: DEV
            }
          }
        ]
      }
    ]
  }
};
