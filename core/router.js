const router = require('koa-router')();
const compose = require('koa-compose');

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

  const middlewares = Array.isArray($controller.middleware)
        && $controller.middleware.length > 0
        && $controller.middleware.reduce((stack, middle) => {
          if (typeof middle === 'string') {
            middle = { middleware: middle };
          }
          if (middle.except && (Array.isArray(middle.except) ? middle.except.includes($action) : [middle.except].includes($action))) {
            return stack;
          }
          if (middle.accept && (Array.isArray(middle.accept) ? !middle.accept.includes($action) : ![middle.accept].includes($action))) {
            return stack;
          }

          return stack.concat(async (tmpCtx, tmpNext) => {
            const $middleware = app.middlewares[middle.middleware];
            if(!$middleware || typeof $middleware !== 'function') {
                throw new Error(`中间件${middle.middleware}不存在`);
            }

            // 执行中间件方法
            await $middleware(tmpCtx, tmpNext);
          });
      }, []) || [];

  // 执行控制器方法
  await compose(middlewares)(ctx, async () => {
    await $controller[$action]();
  });

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