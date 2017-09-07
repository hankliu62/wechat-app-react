

const path = require('path');

const AV = require('leanengine');
const Koa = require('koa');
const Router = require('koa-router');
const statics = require('koa-static');
const bodyParser = require('koa-bodyparser');

const logger = require('./utils/logger');
const errorHanlder = require('./middlewares/error-handler');

// 加载云函数定义，你可以将云函数拆分到多个文件方便管理，但需要在主文件中加载它们
require('./cloud');

const app = new Koa();

// 设置静态资源目录
app.use(statics(path.join(__dirname, 'public')));

const router = new Router();
app.use(router.routes());

// 加载云引擎中间件
app.use(AV.koa());

app.use(bodyParser());

// 错误处理中间件
app.use(errorHanlder);

app.on('error', (err, ctx) => {
  logger.error(ctx.url);
  logger.error(err);
  logger.error(err.stack);
});

module.exports = app;
