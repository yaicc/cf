const IORedis = require('ioredis');

class Redis extends IORedis {

  async read(key) {
    let rs = await this.get(key);
    if (rs) {
      try {
        rs = JSON.parse(rs);
      } catch (_) {
        // ignore
      }
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

  async auto(key, expire, closure) {
    let r = await this.read(key);
    if (!r) {
      r = await closure();
      await this.write(key, r, expire);
    }
    return r;
  }

}

const ioredis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  db: process.env.REDIS_DB
});

module.exports = ioredis;
