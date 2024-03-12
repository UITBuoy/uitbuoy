import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectResolver } from './subject.resolver';
import { ApiModule } from 'src/api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { FetchSubjectData } from './configuation/fetch-subject-data.cron';
import { FetchSubjectSummaryData } from './configuation/fetch-subject-sumary-data.cron';

@Module({
    imports: [ApiModule, TypeOrmModule.forFeature([Subject])],
    providers: [
        SubjectResolver,
        SubjectService,
        FetchSubjectData,
        FetchSubjectSummaryData,
    ],
})
export class SubjectModule {}
