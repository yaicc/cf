let cfg = {};

try {
  cfg = require(`${process.cwd()}/app.js`);
} catch (error) {
  // pass
}

module.exports = {
  cfg
};