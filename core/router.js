const router = require('koa-router')();

async function control(ctx, next) {
  const { app, CONTROLLER, ACTION } = ctx;
  const { controllers } = app;

  if (!controllers[CONTROLLER]) {
    throw Error('控制器不存在！');
  }

  const $controller = new controllers[CONTROLLER](ctx, next);
  // 下划线转驼峰
  const $action = ACTION.indexOf('_') > 0 ? ACTION.replace(/_(\w)/g, (_, letter) => letter.toUpperCase()) : ACTION;

  if (!$controller[$action] || typeof $controller[$action] !== 'function') {
    throw Error('路由方法不存在');
  }

  await $controller[$action]();
}

router.all('/:controller?/:action?', async (ctx, next) => {
  ctx.CONTROLLER = ctx.params.controller || 'home';
  ctx.ACTION = ctx.params.action || 'index';
  delete ctx.params.controller;
  delete ctx.params.action;
  await control(ctx, next);
});

module.exports = app => {
  router.prefix('/:version');
  app.use(router.routes(), router.allowedMethods());
};