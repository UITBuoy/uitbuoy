import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { CourseApiService } from './services/course-api.service';
import { UserApiService } from './services/user-api.service';
import { CalenderApiService } from './services/calender-api.service';

@Module({
    providers: [
        ApiService,
        UserApiService,
        CourseApiService,
        CalenderApiService,
    ],
    exports: [ApiService, CourseApiService, UserApiService, CalenderApiService],
})
export class ApiModule {}
