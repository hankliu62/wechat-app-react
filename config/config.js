const path = require('path');
const debug = require('debug')('app:config');
const pkg = require('../package.json');

const config = {
  env: process.env.NODE_ENV || 'development',

  // path options
  path_base: path.resolve(__dirname, '..'),
  dir_html: 'server/views',
  dir_client: 'client',
  dir_server: 'server',
  dir_dist: 'dist',

  // compiler options
  compiler_babel: {
    cacheDirectory: true,
    plugins: ['transform-runtime'],
    presets: ['es2015', 'react', 'stage-0']
  },
  compiler_devtool: 'source-map',
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_stats: {
    chunk: false,
    chunkModules: false,
    color: true
  },
  compiler_vendors: [
    'react',
    'react-redux',
    'react-router',
    'redux',
    'axios'
  ],
  compiler_vendor_key: 'vendor',

  // Proxy Configuration -> path: host
  proxyTable: {},

  dev: {
    dll: {
      basePath: path.resolve(__dirname, '../dist/dll/dev'),
      fileName: path.resolve(__dirname, '../dist/dll/dev', 'lib.dll.js'),
      manifest: path.resolve(__dirname, '../dist/dll/dev', 'manifest.json'),
      outputPath: '/static/dll/dev', // 生成目录
      publicPath: '/static/dll/dev' // 注入地址
    },
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    staticPath: '../dist'
  },
  build: {
    dll: {
      basePath: path.resolve(__dirname, '../dist/dll/js'),
      fileName: path.resolve(__dirname, '../dist/dll/js', 'lib.dll.js'),
      manifest: path.resolve(__dirname, '../dist/dll/js', 'manifest.json'),
      outputPath: '/static/dll/js', // 生成目录
      publicPath: '/static/dll/js' // 注入地址
    },
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionGzipExtensions: ['js', 'css']
  }
};

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
config.compiler_vendors = config.compiler_vendors.filter((dep) => {
  if (pkg.dependencies[dep]) {
    return true;
  }

  debug(`Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from compiler_vendors in ~/config/config.js`);
  return false;
});

// ------------------------------------
// Utilities
// ------------------------------------
function base(...restArgs) {
  const args = [config.path_base].concat(([]).slice.apply(restArgs));
  return path.resolve(...args);
}

config.utils_paths = {
  base,
  client: base.bind(null, config.dir_client),
  html: base.bind(null, config.dir_html),
  dist: base.bind(null, config.dir_dist)
};

module.exports = config;
