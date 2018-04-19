const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

const SRC = path.resolve(__dirname, 'src');
const DIST = path.resolve(__dirname, 'dist');
const JS_PATH = path.join(SRC, 'js');
const IMG_PATH = path.join(SRC, 'img');
const NODE_MODULES_PATH = path.resolve(SRC, '../node_modules');

const getPlugins = isProduction => {
  const plugins = [
    new CopyWebpackPlugin([{from: IMG_PATH, to: path.join(DIST, 'img')}]),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.LoaderOptionsPlugin({options: {postcss: [autoprefixer]}}),
    new webpack.DefinePlugin({
      __IS_PRODUCTION__: JSON.stringify(isProduction)
    }),
    new HtmlWebpackPlugin({
      chunks: ['index'],
      filename: path.join(DIST, 'index.html'),
      template: path.join(SRC, 'index.html')
    }),
    new CleanWebpackPlugin([DIST])
  ];

  return plugins;
};

module.exports = env => {
  const isProduction = env && env.production;
  const plugins = getPlugins(isProduction);

  return {
    mode: isProduction ? 'production' : 'development',
    resolve: {
      modules: [
        JS_PATH,
        NODE_MODULES_PATH
      ],
      extensions: ['.js', '.jsx']
    },
    entry: {
      index: path.join(JS_PATH, 'index.jsx')
    },
    output: {
      publicPath: '/',
      path: DIST,
      filename: '[name].[hash].js'
    },
    module: {
      rules: [
        {
          test: /\.js|.jsx$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }, {
          test: /\.scss|.css$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: isProduction,
                  url: false
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  minimize: isProduction,
                  config: {
                    path: './postcss.config.js'
                  }
                }
              },
              {loader: 'sass-loader', options: {minimize: isProduction}}
            ]
          })
        }
      ]
    },
    plugins,
    devtool: isProduction ? false : 'source-map'
  };
};
