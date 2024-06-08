import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const logger = app.get(LoggerService);
    const configService = app.get(ConfigService);

    logger.info('Api service started');

    app.useGlobalInterceptors(new LoggingInterceptor(logger));
    app.enableShutdownHooks();
    app.useLogger(logger);
    app.enableCors({ origin: true, credentials: true });

    app.startAllMicroservices();

    const PORT = parseInt(configService.get<string>('APP_PORT'));

    await app.listen(PORT);
}
bootstrap();
