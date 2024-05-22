import { Module, forwardRef } from '@nestjs/common';
import { SubjectService } from './services/subject.service';
import { SubjectResolver } from './subject.resolver';
import { ApiModule } from 'src/api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { SubjectConfiguration } from './configuration/subject.cofiguration';
import { EducationProgramConfiguration } from './configuration/educationProgram.configuration';
import { EducationProgram } from './entities/educationProgram.entity';
import { Section } from './entities/section.entity';
import { MajorSubject } from './entities/majorSubject.entity';
import { UserModule } from '@/user/user.module';
import { CourseModule } from '@/course/course.module';

@Module({
    imports: [
        ApiModule,
        TypeOrmModule.forFeature([Subject]),
        TypeOrmModule.forFeature([EducationProgram]),
        TypeOrmModule.forFeature([Section]),
        TypeOrmModule.forFeature([MajorSubject]),
        UserModule,
        forwardRef(() => CourseModule),
    ],
    providers: [
        SubjectResolver,
        SubjectService,
        SubjectConfiguration,
        EducationProgramConfiguration,
    ],
    exports: [SubjectService],
})
export class SubjectModule {}
