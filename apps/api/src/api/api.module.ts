import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { CourseApiService } from '../course/services/course-api.service';
import { UserApiService } from './services/user-api.service';
import { CalendarApiService } from '../calendar/services/calender-api.service';

@Module({
    providers: [
        ApiService,
        UserApiService,
        CourseApiService,
        CalendarApiService,
    ],
    exports: [ApiService, CourseApiService, UserApiService, CalendarApiService],
})
export class ApiModule {}
