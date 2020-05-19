const assert = require('assert');
const DB = require('./utils/mysql');
const Redis = require('./utils/redis');

class Controller {
  constructor(ctx, next) {
    this.ctx = ctx;
    this.next = next;
  }

  get DB() {
    return DB;
  }

  get Redis() {
    return Redis;
  }

  service(name) {
    assert(this.ctx.app.services[name], 'invalid service');
    return new this.ctx.app.services[name](this.ctx);
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
    return this.ctx.error({ code, message });
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

  /**
   * @param {String} key 
   * @param {Any} value 
   */
  state(key, value = null) {
    if (value) {
      this.ctx.state[key] = value;
      return value;
    }
    return this.ctx.state[key] || null;
  }

}

module.exports = Controller;