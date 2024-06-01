import serverlessExpress from '@codegenie/serverless-express';
import { NestFactory } from '@nestjs/core';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';

async function bootstrap(): Promise<Handler> {
    const app = await NestFactory.create(AppModule);

    app.enableShutdownHooks();
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
