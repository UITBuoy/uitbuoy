import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectResolver } from './subject.resolver';
import { ApiModule } from 'src/api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { SubjectConfiguration } from './configuration/subject.cofiguration';
import { EducationProgramConfiguration } from './configuration/educationProgram.configuration';
import { EducationProgram } from './entities/educationProgram.entity';

@Module({
    imports: [ApiModule, TypeOrmModule.forFeature([Subject]), TypeOrmModule.forFeature([EducationProgram])],
    providers: [SubjectResolver, SubjectService, SubjectConfiguration, EducationProgramConfiguration],
})
export class SubjectModule {}
