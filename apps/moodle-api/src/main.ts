import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { LoggerService } from './logger/logger.service';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
    // const app = await NestFactory.create(AppModule);
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.KAFKA,
            options: {
                client: {
                    brokers: ['localhost:29092'],
                },
            },
        },
    );

    const logger = app.get(LoggerService);

    app.useGlobalInterceptors(new LoggingInterceptor(logger));
    app.enableShutdownHooks();
    app.useLogger(logger);

    await app.listen();
}
bootstrap();
