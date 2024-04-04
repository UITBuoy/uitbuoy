import { CourseApiService } from '@/course/services/course-api.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from 'src/api/api.module';
import { Action } from './entities/action.entity';
import { Assignment } from './entities/assignment.entity';
import { EventResolver } from './event.resolver';
import { AssignmentApiService } from './services/assignment-api.service';
import { EventApiService } from './services/event-api.service';
import { EventService } from './services/event.service';

@Module({
    imports: [
        ApiModule,
        TypeOrmModule.forFeature([Event]),
        TypeOrmModule.forFeature([Action]),
        TypeOrmModule.forFeature([Assignment]),
    ],
    providers: [
        CourseApiService,
        EventService,
        EventApiService,
        EventResolver,
        AssignmentApiService,
    ],
    exports: [EventService, EventApiService, AssignmentApiService],
})
export class EventModule {}
