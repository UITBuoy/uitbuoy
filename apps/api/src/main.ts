import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ConfigService } from '@nestjs/config';
import { WinstonLogger } from './logger/winston.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalInterceptors(new LoggingInterceptor());

    app.enableShutdownHooks();

    const configService = app.get(ConfigService);
    const PORT = parseInt(configService.get<string>('APP_PORT'));

    await app.listen(PORT);

    WinstonLogger.info(`Run server on port ${PORT}`);
}
bootstrap();
