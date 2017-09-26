// Provide custom regenerator runtime and core-js
require('babel-polyfill');
const AV = require('leanengine');
const webpack = require('webpack');
const statics = require('koa-static');
const koaWebpackMiddleware = require('koa-webpack-middleware');
const historyApiFallbackMiddleware = require('koa-history-api-fallback');
// const ora = require('ora');

const app = require('./app');
const webpackConfig = require('../build/webpack/webpack.dev.conf');

// const spinner = ora(`building for ${process.env.NODE_ENV}...`);

AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

// Start the spinner. Returns the instance. Set the current text if text is provided
// spinner.start();
const compiler = webpack(webpackConfig);

const devMiddleware = koaWebpackMiddleware.devMiddleware(compiler, {
  noInfo: false,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
});

const hotMiddleware = koaWebpackMiddleware.hotMiddleware(compiler);

// handle fallback for HTML5 history API
app.use(historyApiFallbackMiddleware());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// 静态文件, wenpack dev
app.use(statics(`${__dirname}/dist/client/`, { maxage: 0 }));

// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
const PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000, 10);

app.listen(PORT, () => {
  console.log(`\r\nListening at http://localhost:${PORT}`);
  console.log('Node app is running on port:', PORT);

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', (err) => {
    console.error('Caught exception:', err.stack);
  });
  process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack);
  });
});
