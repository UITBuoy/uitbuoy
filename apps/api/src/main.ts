import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FetchSubjectData } from './subject/fetch-subject-data.cron';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
bootstrap();
