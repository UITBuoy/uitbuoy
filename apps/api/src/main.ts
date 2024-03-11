import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FetchSubjectData } from './subject/fetch-subject-data.cron';
import { FetchSubjectSummaryData } from './subject/fetch-subject-sumary-data.cron';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    FetchSubjectSummaryData.fetch();
    await app.listen(3000);
}
bootstrap();
