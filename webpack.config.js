const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const DIST_PATH = path.resolve(__dirname, 'dist');
const SRC_PATH = path.resolve(__dirname, 'src');
const NODE_MODULES_PATH = path.resolve(__dirname, 'node_modules');

module.exports = env => {
  const isProduction = env && env.production;

  return {
    entry: {
      index: path.join(SRC_PATH, 'index.jsx'),
    },
    output: {
      path: DIST_PATH,
      filename: '[name]_[hash].js',
      publicPath: '/',
    },
    resolve: {
      modules: [SRC_PATH, NODE_MODULES_PATH],
      extensions: ['.js', '.jsx', '.css'],
    },
    mode: isProduction ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.(woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name]_[hash].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [{loader: 'svg-sprite-loader'}],
        },
        {
          test: /(\.js|.jsx)$/,
          use: [{loader: 'babel-loader'}],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]',
                camelCase: 'only',
                minimize: isProduction,
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: isProduction,
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: path.join(DIST_PATH, 'index.html'),
        template: path.join(SRC_PATH, 'index.html'),
        chunks: ['index'],
      }),
      new CopyWebpackPlugin([
        {
          from: path.join(SRC_PATH, 'images'),
          to: path.join(DIST_PATH, 'images'),
        },
        {
          from: path.join(SRC_PATH, 'manifest.json'),
          to: path.join(DIST_PATH, 'manifest.json'),
        },
        {
          from: path.join(SRC_PATH, '.htaccess'),
          to: path.join(DIST_PATH),
        },
        {
          from: path.join(SRC_PATH, 'robots.txt'),
          to: path.join(DIST_PATH, 'robots.txt'),
        },
        {
          from: path.join(SRC_PATH, 'sitemap.xml'),
          to: path.join(DIST_PATH, 'sitemap.xml'),
        },
      ]),
      new MiniCssExtractPlugin({
        filename: '[name]_[hash].css',
        chunkFilename: '[id]_[hash].css',
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        canPrint: true,
      }),
      new CleanWebpackPlugin(),
      new WorkboxPlugin.GenerateSW({
        swDest: 'serviceWorker.js',
        clientsClaim: true,
        skipWaiting: true,
        exclude: [/^manifest.*\.js$/, /^.htaccess$/],
      }),
    ],
  };
};
