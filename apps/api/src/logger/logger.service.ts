import { Inject, Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class LoggerService {
    @Client({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'logger',
                brokers: ['localhost:29092'],
            },
            consumer: {
                groupId: 'logger-consumer',
            },
        },
    })
    client: ClientKafka;

    constructor(
        @Inject('LOGGER_SERVICE') private readonly logger: ClientKafka,
    ) {}

    log(message: string, meta?: any, context?: string) {
        this.logger.emit('log', {
            service: 'api',
            level: 'log',
            message,
            context,
            ...meta,
        });
    }

    info(message: string, meta?: any, context?: string) {
        this.logger.emit('log', {
            service: 'api',
            level: 'info',
            message,
            context,
            ...meta,
        });
    }

    error(message: string, context?: string, meta?: Record<string, any>) {
        this.logger.emit('log', {
            service: 'api',
            level: 'error',
            message,
            context,
            ...meta,
        });
    }

    warn(message: string, meta?: any, context?: string) {
        this.logger.emit('log', {
            service: 'api',
            level: 'warn',
            message,
            context,
            ...meta,
        });
    }

    debug(message: string, meta?: any, context?: string) {
        this.logger.emit('log', {
            service: 'api',
            level: 'debug',
            message,
            context,
            ...meta,
        });
    }
}
