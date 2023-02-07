const medfinLogger = require('./medfinLogger');
const productionLogger = require('./productionLogger.js');

let logger = null;

if (process.env.NODE_ENV !== 'dev') {
  logger = medfinLogger();
}

module.exports = logger;
