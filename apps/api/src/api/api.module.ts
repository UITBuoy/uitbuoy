import { Module } from '@nestjs/common';
import { ApiService } from './services/api.service';
import { UserApiService } from './services/user-api.service';

@Module({
    providers: [ApiService, UserApiService],
    exports: [ApiService, UserApiService],
})
export class ApiModule {}
