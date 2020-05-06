const assert = require('assert');
const DB = require('./utils/mysql');

class Controller {
  constructor(ctx, next) {
    this.ctx = ctx;
    this.next = next;
  }

  get DB() {
    return DB;
  }

  service(name) {
    assert(this.ctx.app.services[name], 'invalid service');
    return new this.ctx.app.services[name](this.ctx);
  }

  async middleware(name) {
    const MIDDLE = this.ctx.app.middlewares[name];
    if (!MIDDLE || typeof MIDDLE !== 'function') {
      throw Error('invalid middleware');
    }
    return MIDDLE(this.ctx, this.next);
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