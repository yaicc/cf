const Koa = require('koa');
const Loader = require('./utils/loader');
const config = require('./config');
const middleware = require('./middleware');
const router = require('./router');

class Application extends Koa {

  run(port = 3000) {
    const loader = new Loader();

    // 装载配置文件
    this.config = config;
    // 装载控制器
    this.controllers = loader.loadController();
    // 装载中间件
    this.middlewares = loader.loadMiddleware();
    // 装载逻辑处理类
    this.services = loader.loadServices();

    // 中间件
    middleware(this);
    // 路由
    router(this);

    this.listen(port);
  }

}

module.exports = Application;