const IORedis = require('ioredis');

class Redis extends IORedis {

  async read(key) {
    let rs = await this.get(key);
    try {
      rs = JSON.parse(rs);
    } catch (_) {
      // ignore
    }
    return rs;
  }

  async write(key, value, expire) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    if (expire) {
      return this.setex(key, expire, value);
    }
    return this.set(key, value);
  }

}

const ioredis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  db: process.env.REDIS_DB
});

module.exports = ioredis;
