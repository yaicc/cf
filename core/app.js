const Koa = require('koa');
const Loader = require('./utils/loader');
const config = require('./config');
const middleware = require('./middleware');
const router = require('./router');

const app = new Koa();

app.run = (port = 3000) => {
  const loader = new Loader();

  // 装载配置文件
  app.config = config;
  // 装载控制器
  app.controllers = loader.loadController();
  // 装载中间件
  app.middlewares = loader.loadMiddleware();
  // 装载逻辑处理类
  app.services = loader.loadServices();

  // 中间件
  middleware(app);
  // 路由
  router(app);

  app.listen(port);
};

module.exports = app;