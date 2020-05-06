const fs = require('fs');

class Loader {

  loader(path) {
    const dir = fs.readdirSync(path);
    const r = dir.map((filename) => {
      const module = require(`${path}/${filename}`);
      return { name: filename.split('.')[0], module };
    });
    const d = {};
    for (const t of r) {
      d[t.name] = t.module;
    }
    return d;
  }

  loadController() {
    const url = `${process.cwd()}/src/controllers`;
    return this.loader(url);
  }

  loadMiddleware() {
    const url = `${process.cwd()}/src/middlewares`;
    return this.loader(url);
  }

  loadServices() {
    const url = `${process.cwd()}/src/services`;
    return this.loader(url);
  }

}

module.exports = Loader;