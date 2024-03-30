import { forwardRef, Module } from '@nestjs/common';
import { CourseService } from './services/course.service';
import { CourseResolver } from './course.resolver';
import { ApiModule } from 'src/api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CourseConfiguration } from './configuration/course.cofiguration';
import { CourseModuleEntity } from './entities/course-module.entity';
import { CourseContentEntity } from './entities/course-content.entity';
import { AuthModule } from '@/auth/auth.module';
import { CourseApiService } from './services/course-api.service';
import { EventModule } from '@/event/event.module';

@Module({
    imports: [
        ApiModule,
        AuthModule,
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
