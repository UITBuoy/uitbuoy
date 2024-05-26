import { Module } from '@nestjs/common';
import { ApiService } from './services/api.service';
import { UserApiService } from './services/user-api.service';
import { GoogleTasksApiService } from './services/google-task-api.service';

@Module({
    providers: [ApiService, UserApiService, GoogleTasksApiService],
    exports: [ApiService, UserApiService, GoogleTasksApiService],
})
export class ApiModule {}
