import { AuthModule } from '@/auth/auth.module';
import { LecturerModule } from '@/lecturer/lecturer.module';
import { Module } from '@nestjs/common';
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

@Module({
    imports: [
        ApiModule,
        AuthModule,
        LecturerModule,
        TypeOrmModule.forFeature([Course]),
        TypeOrmModule.forFeature([CourseSectionEntity]),
        TypeOrmModule.forFeature([CourseModuleEntity]),
        TypeOrmModule.forFeature([CourseContentEntity]),
    ],
    providers: [
        CourseResolver,
        SectionResolver,
        ModuleResolver,
        CourseApiService,
        CourseService,
        CourseConfiguration,
    ],
    exports: [CourseService, CourseApiService],
})
export class CourseModule {}
