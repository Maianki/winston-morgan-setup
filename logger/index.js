const developmentLogger = require('./developmentLogger');
const productionLogger = require('./productionLogger');

let logger = null;

if (process.env.NODE_ENV.trim() === 'dev') {
  logger = developmentLogger();
} else {
  logger = productionLogger();
}

module.exports = logger;
