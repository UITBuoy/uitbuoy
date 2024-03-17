import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { CourseApiService } from './services/course-api.service';
import { UserApiService } from './services/user-api.service';

@Module({
    providers: [ApiService, UserApiService, CourseApiService],
    exports: [ApiService, CourseApiService, UserApiService],
})
export class ApiModule {}
