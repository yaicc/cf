const { Controller } = require('../../..');

class Home extends Controller {

  constructor(...args) {
    super(...args);
    this.middleware = [
      {
        middleware: 'auth',
        except: ''
      }
    ];
  }

  async index() {
    return this.success();
  }

}

module.exports = Home;