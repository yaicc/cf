const router = require('koa-router')();

async function control(ctx) {
  const { app, CONTROLLER, ACTION } = ctx;
  const { controllers } = app;

  if (!controllers[CONTROLLER]) {
    throw Error('控制器不存在！');
  }

  const $controller = new controllers[CONTROLLER](ctx);
  if (!$controller[ACTION] || typeof $controller[ACTION] !== 'function') {
    throw Error('路由方法不存在');
  }

  await $controller[ACTION]();
}

router.all('/:controller?/:action?', async (ctx, next) => {
  ctx.CONTROLLER = ctx.params.controller || 'home';
  ctx.ACTION = ctx.params.action || 'index';
  delete ctx.params.controller;
  delete ctx.params.action;
  await control(ctx, next);
});

module.exports = app => {
  app.use(router.routes(), router.allowedMethods());
};