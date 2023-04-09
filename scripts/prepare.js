const { install } = require('husky');

if (typeof process.env['CI'] === 'undefined') {
  install();
}
