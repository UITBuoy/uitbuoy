import { Injectable } from '@nestjs/common';
import { WinstonLogger } from './winston.config';
import { LogType } from './types/log-type.type';

@Injectable()
export class LoggerService {
    log(message: string, context?: string) {
        WinstonLogger.info(message, { context });
    }

    error(message: string, context?: string, meta?: Record<string, any>) {
        WinstonLogger.error(message, { context, type: LogType.ERROR, ...meta });
    }

    warn(message: string, context?: string) {
        WinstonLogger.warn(message, { context });
    }

    debug(message: string, context?: string) {
        WinstonLogger.debug(message, { context });
    }
}
