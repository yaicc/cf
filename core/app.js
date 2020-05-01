const Koa = require('koa');
const Loader = require('./utils/loader');
const middleware = require('./middleware');
const router = require('./router');

const app = new Koa();

app.run = (port = 3000) => {
  const loader = new Loader();

  // 装载控制器
  app.controllers = loader.loadController();

  // 中间件
  middleware(app);
  // 路由
  router(app);

  app.listen(port);
};

module.exports = app;