const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300, checkperiod: 320, maxKeys: 50 });

module.exports = cache;
