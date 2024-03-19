import * as winston from 'winston';
import * as winstonMongoDB from 'winston-mongodb';

const transports = [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.printf(
                ({ timestamp, level, message, context, trace }) => {
                    return `[Winston] - ${new Intl.DateTimeFormat('en-GB', {
                        dateStyle: 'short',
                        timeStyle: 'long',
                        timeZone: 'Asia/Ho_Chi_Minh',
                    }).format(
                        new Date(timestamp),
                    )} - [${context}] ${level}: ${message}`;
                },
            ),
        ),
    }),
    new winstonMongoDB.MongoDB({
        level: 'info',
        db: 'mongodb://localhost:27017/uitbuoy',
        options: {
            useUnifiedTopology: true,
        },
        collection: 'logs',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
            winston.format.metadata(),
        ),
    }),
];

export const WinstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports,
});
