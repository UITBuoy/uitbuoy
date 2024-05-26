import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@codegenie/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap(): Promise<Handler> {
    const app = await NestFactory.create(AppModule);

    const logger = app.get(LoggerService);
    const configService = app.get(ConfigService);

    app.useGlobalInterceptors(new LoggingInterceptor(logger));
    app.enableShutdownHooks();
    app.useLogger(logger);
    app.enableCors();

    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
}

const serverPromise = bootstrap();
let server: Handler;

export const handler: Handler = async (
    event: any,
    context: Context,
    callback: Callback,
) => {
    server = server ?? (await serverPromise);
    return server(event, context, callback);
};
