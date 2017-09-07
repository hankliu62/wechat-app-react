const path = require('path');
// const os = require('os');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VisualizerPlugin = require('webpack-visualizer-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// const HappyPackPlugin = require('happypack');
const webpackConfig = require('./webpack.base.conf');
const config = require('../../config/config');
const cssLoaders = require('../loaders/css-loaders');
const HappyPackPluginDecorator = require('../plugins/happypack-plugins');

const pathsUtils = config.utils_paths;
// const happyThreadPool = HappyPackPlugin.ThreadPool({ size: os.cpus().length });

webpackConfig.devtool = 'eval';

// add hot-reload related code to entry chunks
const polyfill = 'eventsource-polyfill'; // 兼容ie
const devClient = './build/dev/dev-client';
const entry = webpackConfig.entry;
for (const key in entry) {
  if (({}).hasOwnProperty.call(entry, key)) {
    const isVendorEntry = key === config.compiler_vendor_key;
    const extras = isVendorEntry ? [polyfill, devClient] : [devClient];
    entry[key] = extras.concat(entry[key]);
  }
}

// 默认的webpack会将require("style.css")文件嵌入js文件中，使用该插件会将css从js中提取出来
webpackConfig.module.rules = webpackConfig.module.rules.concat(cssLoaders({
  sourceMap: false,
  extract: true
}));

webpackConfig.module.rules = HappyPackPluginDecorator.ReplaceToHappyLoaders(webpackConfig.module.rules);

// 自动写入将引用写入html
webpackConfig.plugins = webpackConfig.plugins.concat([
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  ...HappyPackPluginDecorator.GetHappyPackPlugins(),
  // webpack dllplugin
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require(config.dev.dll.manifest),
  }),
  new HtmlWebpackPlugin({
    title: '云汐吐槽网',
    filename: 'index.html',
    template: pathsUtils.client('template.html'),
    inject: 'body'
  }),
  new AddAssetHtmlPlugin([
    {
      filepath: path.resolve(__dirname, config.dev.dll.fileName),
      // outputPath: path.join('/'),
      // publicPath: path.join('/'),
      includeSourcemap: true
    }
  ]),
  new ProgressBarPlugin({ summary: false }),
  new VisualizerPlugin({
    filename: './statistics.html'
  })
]);

module.exports = webpackConfig;
