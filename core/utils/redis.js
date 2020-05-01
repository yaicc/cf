const Redis = require('ioredis');

const ioredis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  db: process.env.REDIS_DB
});

ioredis.cache = {
  read: async (key) => {
    let rs = await Redis.get(key);
    try {
      rs = JSON.parse(rs);
    } catch (_) {
      // ignore
    }
    return rs;
  },
  write: async (key, value, expire) => {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    if (expire) {
      return Redis.setex(key, expire, value);
    }
    return Redis.set(key, value);
  }
};

module.exports = ioredis;
