const crypto = require('crypto');

/**
 * linux timestamp
 */
exports.ts = () => Math.floor(new Date().getTime() / 1000);

/**
 * md5 string with salt
 */
exports.authcode = (str, salt) => crypto.createHash('md5').update(`${salt}/${str}`).digest('hex');

/**
 * Convert an array of objects to a single object
 */
exports.arr2Obj = (arr, identifier) => arr.reduce((a, b) => ({ ...a, [b[identifier]]: b }), {});

/**
 * Check if a value is a number
 */
exports.isNumber = value => !Number.isNaN(parseFloat(value)) && Number.isFinite(value);

/**
 * Wait for an amount of milliseconds
 */
exports.sleep = async (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

/**
 * Rand number between given numbers
 */
exports.rand = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

exports.uniqueId = () => {
  const chs = ['a','b','c','d','e','f','g','h','j','k','l','m','n','p','q','r','s','t','u','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];
  const [, ns] = process.hrtime();
  const ts = `${(Date.now() * 1e4 + ns).toString()}`;

  const output = [];
  for (let i = 0; i < 16; i++) {
    const piece = `${ts[i + 1]}${ts[i + 2]}${ts[i + 3]}` * 1;
    output.push(chs[piece % chs.length]);
  }
  return output.join('');
}
