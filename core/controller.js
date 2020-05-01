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


  error() {

  }

}

module.exports = Controller;