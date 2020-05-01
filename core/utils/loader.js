const fs = require('fs');

class Loader {

  loader(path) {
    const dir = fs.readdirSync(path);
    return dir.map((filename) => {
      const module = require(`${path}/${filename}`);
      return { name: filename.split('.')[0], module };
    });
  }

  loadController() {
    const url = `${process.cwd()}/src/controller`;
    const controllers = {};
    for (const c of this.loader(url)) {
      controllers[c.name] = c.module;
    }
    return controllers;
  }

}

module.exports = Loader;