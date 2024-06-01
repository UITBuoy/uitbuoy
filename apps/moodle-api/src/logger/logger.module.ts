import { Module } from '@nestjs/common';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'LOGGER_SERVICE',
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
            },
        ]),
    ],
    providers: [LoggerService],
    controllers: [LoggerController],
    exports: [LoggerService],
})
export class LoggerModule {}
