const knex = require('knex');

module.exports = knex({
  debug: process.env.NODE_ENV === 'development',
  client: 'mysql2',
  connection: {
    host : process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASS,
    database : process.env.MYSQL_NAME,
  },
  pool: {
    min: 5,
    max: 100
  },
  acquireConnectionTimeout: 60000,
  asyncStackTraces: false, // 捕获堆栈跟踪，正式环境不要开启，会消耗性能
  log: {
    warn (message) {
      console.log('[knex warn]', message) // eslint-disable-line
    },
    error (message) {
      console.log('[knex error]', message) // eslint-disable-line
    },
    deprecate (message) {
      console.log('[knex deprecate]', message) // eslint-disable-line
    },
    debug (message) {
      console.log('[knex debug]', message) // eslint-disable-line
    }
  }
});