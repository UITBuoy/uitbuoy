import { forwardRef, Module } from '@nestjs/common';
import { Action } from './entities/action.entity';
import { ApiModule } from 'src/api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './services/event.service';
import { EventResolver } from './event.resolver';
import { EventApiService } from './services/event-api.service';
import { CourseModule } from '@/course/course.module';
import { AssignmentApiService } from './services/assignment-api.service';
import { Assignment } from './entities/assignment.entity';

@Module({
    imports: [
        ApiModule,
        forwardRef(() => CourseModule),
        TypeOrmModule.forFeature([Event]),
        TypeOrmModule.forFeature([Action]),
        TypeOrmModule.forFeature([Assignment]),
    ],
    providers: [
        EventService,
        EventApiService,
        EventResolver,
        AssignmentApiService,
    ],
    exports: [EventService, EventApiService, AssignmentApiService],
})
export class EventModule {}
