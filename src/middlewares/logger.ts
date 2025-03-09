import winston from 'winston';
import expressWinston from 'express-winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Транспорт для ротации логов запросов
const requestTransport = new DailyRotateFile({
    filename: 'logs/request-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
    zippedArchive: true,
});

// Транспорт для ротации логов ошибок
const errorTransport = new DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
    zippedArchive: true,
});

// Логгер для запросов
export const requestLogger = expressWinston.logger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        requestTransport,
        new winston.transports.File({
            filename: 'logs/request.log',
        }),
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,
});

// Логгер для ошибок
export const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        errorTransport,
        new winston.transports.File({
            filename: 'logs/error.log',
        }),
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
});