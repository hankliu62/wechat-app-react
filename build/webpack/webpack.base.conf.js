const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const config = require('../../config/config');
const assetDeps = require('../../config/assets.dependencies');
const LoggerPlugin = require('../plugins/logger-plugin');

const pathsUtils = config.utils_paths;
const APP_ENTRY = pathsUtils.client('index.jsx');
const systemConfigPath = path.resolve(pathsUtils.client('config'));

const entry = {
  app: APP_ENTRY,
  [config.compiler_vendor_key]: config.compiler_vendors
};

const assetHtmlPlugins = assetDeps.map(dep => ({
  filepath: path.resolve(pathsUtils.client('deps'), dep, '*.js'),
  includeSourcemap: false
}));

const baseConfig = {
  entry,
  output: {
    path: pathsUtils.dist('client'),
    publicPath: config.compiler_public_path,
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js'
  },
  resolve: {
    enforceExtension: false,
    extensions: ['.js', '.jsx'],
    alias: {
      systemConfig: process.env.NODE_ENV === 'production' ? path.resolve(systemConfigPath, 'systemConfig.prod.js') : path.resolve(systemConfigPath, 'systemConfig.dev.js')
    }
  },
  module: {
    rules: [
      // { test: /\.jsx?$/, enforce: 'pre', loader: 'eslint-loader' },
      { test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/ },
      {
        test: /\.(png|jpe?g|gif|svg|webp|woff2)$/,
        use: ['url-loader?limit=8192&name=img/[name].[hash:8].[ext]'],
        exclude: /node_modules/
      },
      { test: /\.(eot|woff|svg|ttf|woff2|appcache)(\?|$)/, use: ['file-loader?name=[name].[ext]'], exclude: /node_modules/ }
    ]
  },
  plugins: [
    new LoggerPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: [config.compiler_vendor_key, 'runtime'],
      filename: '[name].[chunkhash:8].js',
      minChunks: 3
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // ( 公共chunk(commnons chunk) 的名称)
      name: 'commons',
      // ( 公共chunk 的文件名)
      filename: 'commons.[hash:8].js',
      // (模块必须被 3个 入口chunk 共享)
      minChunks: 3
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // (选择所有被选 chunks 的子 chunks)
      children: true,
      // (在提取之前需要至少三个子 chunk 共享这个模块)
      minChunks: 3,
    }),
    new ExtractTextPlugin({
      filename: '[id].[name].[contenthash:6].css',
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: pathsUtils.client('deps'), to: 'deps' },
      { from: pathsUtils.client('favicons'), to: 'favicons' }
    ]),
    new AddAssetHtmlPlugin(assetHtmlPlugins),
  ]
};

module.exports = baseConfig;
