import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectResolver } from './subject.resolver';
import { ApiModule } from 'src/api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';

@Module({
    imports: [ApiModule, TypeOrmModule.forFeature([Subject])],
    providers: [SubjectResolver, SubjectService],
})
export class SubjectModule {}
