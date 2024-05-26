import { Module } from '@nestjs/common';
import { LecturerService } from './services/lecturer.service';
import { LecturerResolver } from './lecturer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecturer } from './lecturer.entity';
import { ApiModule } from '@/api/api.module';
import { LecturerApiService } from './services/lecturer-api.service';
import { TokenService } from '@/common/services/token.service';
import { LoggerModule } from '@/logger/logger.module';

@Module({
    imports: [TypeOrmModule.forFeature([Lecturer]), ApiModule, LoggerModule],
    providers: [
        LecturerService,
        LecturerApiService,
        LecturerResolver,
        TokenService,
    ],
    exports: [LecturerService],
})
export class LecturerModule {}
