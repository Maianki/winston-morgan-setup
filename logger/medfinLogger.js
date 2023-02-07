const { level } = require('winston');
const winston = require('winston');
const { combine, timestamp, label, printf, colorize } = winston.format;
require('winston-daily-rotate-file');

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${label} ${level}] : ${timestamp} ${message}`;
});

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: 'combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

const medfinLogger = () => {
  return winston.createLogger({
    level: 'http',
    format: combine(
      colorize({ all: true }),
      label({ label: 'WEB' }),
      timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
      }),
      myFormat
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: './logger/development.log',
      }),
      new winston.transports.File({
        filename: './logger/app-error.log',
        level: 'error',
      }),
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: 'exception.log' }),
    ],
    rejectionHandlers: [
      new winston.transports.File({ filename: 'rejections.log' }),
    ],
  });
};

module.exports = medfinLogger;
