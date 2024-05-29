import { CourseModule } from '@/course/course.module';
import { SubjectModule } from '@/subject/subject.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { LearningPathService } from './learning-path.service';
import {
    EducationProgramResolver,
    SectionResolver,
    SectionSubjectResolver,
} from './resolvers/education-program.resolver';
import { LearningPathResolver } from './resolvers/learning-path.resolver';
import { UserLearningPathResolver } from './resolvers/user-learning-path.resolver';

@Module({
    imports: [CourseModule, UserModule, SubjectModule],
    providers: [
        UserLearningPathResolver,
        LearningPathResolver,
        EducationProgramResolver,
        SectionResolver,
        SectionSubjectResolver,
        LearningPathService,
    ],
    exports: [LearningPathService],
})
export class LearningPathModule {}
