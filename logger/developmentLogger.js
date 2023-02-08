const { level } = require('winston');
const winston = require('winston');
const { combine, timestamp, label, printf, colorize } = winston.format;
require('winston-daily-rotate-file');

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${label} ${level}] : ${timestamp} ${message}`;
});

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: './logs/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

const developmentLogger = () => {
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
        filename: './logs/development.log',
      }),
      new winston.transports.File({
        filename: './logs/app-error.log',
        level: 'error',
      }),
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: './logs/exception.log' }),
    ],
    rejectionHandlers: [
      new winston.transports.File({ filename: './logs/rejections.log' }),
    ],
  });
};

module.exports = developmentLogger;
