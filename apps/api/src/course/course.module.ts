import { AuthModule } from '@/auth/auth.module';
import { EventModule } from '@/event/event.module';
import { LecturerModule } from '@/lecturer/lecturer.module';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from 'src/api/api.module';
import { CourseConfiguration } from './configuration/course.cofiguration';
import { CourseResolver } from './course.resolver';
import { CourseContentEntity } from './entities/course-content.entity';
import { CourseModuleEntity } from './entities/course-module.entity';
import { Course } from './entities/course.entity';
import { CourseApiService } from './services/course-api.service';
import { CourseService } from './services/course.service';

@Module({
    imports: [
        ApiModule,
        AuthModule,
        LecturerModule,
        forwardRef(() => EventModule),
        TypeOrmModule.forFeature([Course]),
        TypeOrmModule.forFeature([CourseModuleEntity]),
        TypeOrmModule.forFeature([CourseContentEntity]),
    ],
    providers: [
        CourseResolver,
        CourseApiService,
        CourseService,
        CourseConfiguration,
    ],
    exports: [CourseService, CourseApiService],
})
export class CourseModule {}
