import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class LoggerService {
    constructor(
        @Inject('LOGGER_SERVICE') private readonly logger: ClientKafka,
    ) {}

    log(message: string, meta?: any, context?: string) {
        this.logger.emit('log', {
            service: 'moodle-api',
            level: 'log',
            message,
            context,
            ...meta,
        });
    }

    info(message: string, meta?: any, context?: string) {
        this.logger.emit('log', {
            service: 'moodle-api',
            level: 'info',
            message,
            context,
            ...meta,
        });
    }

    error(message: string, context?: string, meta?: Record<string, any>) {
        this.logger.emit('log', {
            service: 'moodle-api',
            level: 'error',
            message,
            context,
            ...meta,
        });
    }

    warn(message: string, meta?: any, context?: string) {
        this.logger.emit('log', {
            service: 'moodle-api',
            level: 'warn',
            message,
            context,
            ...meta,
        });
    }

    debug(message: string, meta?: any, context?: string) {
        this.logger.emit('log', {
            service: 'moodle-api',
            level: 'debug',
            message,
            context,
            ...meta,
        });
    }
}
