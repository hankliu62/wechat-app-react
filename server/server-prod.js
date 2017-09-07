// Provide custom regenerator runtime and core-js
require('babel-polyfill');
const AV = require('leanengine');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const statics = require('koa-static');
const Router = require('koa-router');
const render = require('koa-ejs');

const app = require('./app');
// const clientRoute = require('./middlewares/client-route');

// use webpack to build and package client codes
const config = require('../build/webpack/webpack.prod.conf');

AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

const createServer = function () {
  // create server
  const clientPath = path.resolve(config.output.path);

  app.use(statics(clientPath));

  const router = new Router();
  app.use(router.routes());

  render(app, {
    root: clientPath,
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
  });
  router.get('*', async (ctx) => {
    ctx.state.currentTime = new Date();
    await ctx.render('index');
    ctx.type = 'text/html; charset=utf-8';
  });

  // 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
  // LeanEngine 运行时会分配端口并赋值到该变量。
  const PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000, 10);

  app.listen(PORT, () => {
    console.log('Node app is running on port:', PORT);

    // 注册全局未捕获异常处理器
    process.on('uncaughtException', (e) => {
      console.error('Caught exception:', e.stack);
    });
    process.on('unhandledRejection', (reason, p) => {
      console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack);
    });
  });
};

const webpackedHandler = function (error, stats) {
  if (error) {
    if (console.error) {
      // show error to console
      console.error(error);
    }
  }

  if (console.log) {
    // show build info to console
    console.log(stats.toString({ chunks: false, color: true }));
  }

  // save build info to file
  fs.writeFile(path.resolve(__dirname, '../logs/', 'webpack.build.log'), stats.toString({ color: true }));

  // create server to listen request
  createServer();
};

webpack(config, webpackedHandler);
