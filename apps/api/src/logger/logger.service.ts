import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { LogType } from './types/log-type.type';

@Injectable()
export class LoggerService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    log(message: string, meta?: any, context?: string) {
        this.logger.log(message, { context, ...meta });
    }

    info(message: string, meta?: any, context?: string) {
        this.logger.info(message, { ...meta, context });
    }

    error(message: string, context?: string, meta?: Record<string, any>) {
        this.logger.error(message, { context, type: LogType.ERROR, ...meta });
    }

    warn(message: string, meta?: any, context?: string) {
        this.logger.warn(message, { context, ...meta });
    }

    debug(message: string, meta?: any, context?: string) {
        this.logger.debug(message, { context, ...meta });
    }
}
