// Provide custom regenerator runtime and core-js
require('babel-polyfill');
const AV = require('leanengine');
// const path = require('path');
const webpack = require('webpack');
const statics = require('koa-static');
// const convert = require('koa-convert');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const historyApiFallbackMiddleware = require('koa-history-api-fallback');

const app = require('./app');
const webpackConfig = require('../build/webpack/webpack.dev.conf');
// const config = require('../config/config');
// const exec = require('child_process').exec;

AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

const compiler = webpack(webpackConfig);

// use lint-staged and husky to replace pre-commit
// 移动pre-commit到.git/hooks目录下
// exec('cp ./pre-commit ./.git/hooks/pre-commit', (err) => {
//   if (err) {
//     console.error('Caught exception:', err.stack);
//   } else {
//     console.log('moved pre-commit to path ./.git/hooks');
//   }
// });

const devMiddleware = webpackDevMiddleware(compiler, {
  noInfo: false,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
});

const hotMiddleware = webpackHotMiddleware(compiler);
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

// handle fallback for HTML5 history API
app.use(historyApiFallbackMiddleware());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
// const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
// app.use(statics(path.resolve(__dirname, config.dev.staticPath)));
// app.use(statics(`${__dirname}/dist/client/`, { extensions: ['html'] }));

// handle static files
// const staticPath = path.resolve(__dirname, config.dev.staticPath);
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
