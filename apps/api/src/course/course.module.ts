import { AuthModule } from '@/auth/auth.module';
import { LecturerModule } from '@/lecturer/lecturer.module';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from 'src/api/api.module';
import { CourseConfiguration } from './configuration/course.cofiguration';
import { CourseContentEntity } from './entities/course-content.entity';
import { CourseModuleEntity } from './entities/course-module.entity';
import { CourseSectionEntity } from './entities/course-section.entity';
import { Course } from './entities/course.entity';
import { CourseResolver } from './resolvers/course.resolver';
import { ModuleResolver } from './resolvers/module.resolver';
import { SectionResolver } from './resolvers/section.resolver';
import { CourseApiService } from './services/course-api.service';
import { CourseService } from './services/course.service';
import { EventApiService } from '@/event/services/event-api.service';
import { AssignmentApiService } from '@/event/services/assignment-api.service';
import { SubjectModule } from '@/subject/subject.module';
import { SubjectService } from '@/subject/services/subject.service';
import { UserModule } from '@/user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ApiModule,
        AuthModule,
        LecturerModule,
        TypeOrmModule.forFeature([Course]),
        TypeOrmModule.forFeature([CourseSectionEntity]),
        TypeOrmModule.forFeature([CourseModuleEntity]),
        TypeOrmModule.forFeature([CourseContentEntity]),
        forwardRef(() => SubjectModule),
        UserModule,
        ClientsModule.register([
            {
                name: 'MOODLE_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'moodle',
                        brokers: ['localhost:29092'],
                    },
                    consumer: {
                        groupId: 'moodle-consumer',
                    },
                },
            },
        ]),
    ],
    providers: [
        CourseResolver,
        SectionResolver,
        ModuleResolver,
        CourseApiService,
        CourseService,
        CourseConfiguration,
        EventApiService,
        AssignmentApiService,
    ],
    exports: [CourseService, CourseApiService],
})
export class CourseModule {}
