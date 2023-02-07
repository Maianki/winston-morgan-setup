const winston = require('winston');
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf((message, label, timestamp) => {
  return `[${label}] : ${timestamp} ${message}`;
});

const productionLogger = () => {
  return winston.createLogger({
    level: 'debug',
    format: combine(
      colorize({ all: true }),
      label({ label: 'WEB' }),
      timestamp({
        format: 'YYYY-MM-DD hh:mm:ss',
      }),
      myFormat
    ),
    transports: [new winston.transports.Console()],
  });
};

module.exports = productionLogger;
