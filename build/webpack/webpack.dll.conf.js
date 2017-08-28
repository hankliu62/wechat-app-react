const os = require('os');
const path = require('path');
const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsParallelPlugin = require('webpack-parallel-uglify-plugin');
const config = require('../../config/config');
const lib = require('../../config/lib.dependencies');

const pathsUtils = config.utils_paths;
const isDebug = process.env.NODE_ENV === 'development';
const outputPath = isDebug ? config.dev.dll.basePath : config.build.dll.basePath;

const plugins = [
  new webpack.DllPlugin({
    path: path.join(outputPath, 'manifest.json'),
    name: '[name]_[hash:8]',
    context: __dirname
  })
];

if (!isDebug) {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // gzip uglify
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html|css)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    // 增强 uglifyPlugin 替代webpack.optimize.UglifyJsPlugin
    new UglifyJsParallelPlugin({
      workers: os.cpus().length,
      mangle: {
        except: ['$', 'exports', 'require']
      },
      compressor: {
        warnings: false,
        drop_console: true,
        drop_debugger: true
      },
      output: { comments: false }
    })
  );
}

module.exports = {
  devtool: '#source-map',
  entry: {
    lib
  },
  output: {
    path: outputPath,
    filename: '[name].dll.js',
    library: '[name]_[hash:8]',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins
};
