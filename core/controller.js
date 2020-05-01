class Controller {
  constructor(ctx) {
    this.ctx = ctx;
  }

  /**
   * 成功返回
   * @param {*} res
   */
  success(r = undefined) {
    return this.ctx.success(r);
  }

  /**
   * 失败返回
   */
  error({ code = 500, message = '' }) {
    return this.ctx.success({ code, message });
  }

  /**
   * 获取body参数
   * @param {String} name 
   * @return { import("koa-bouncer").Validator }
   */
  getBody(name) {
    return this.ctx.validateBody(name);
  }

  /**
   * 获取body参数
   * @param {String} name 
   * @return { import("koa-bouncer").Validator }
   */
  getQuery(name) {
    return this.ctx.validateQuery(name);
  }

}

module.exports = Controller;