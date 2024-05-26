import { CourseApiService } from '@/course/services/course-api.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from 'src/api/api.module';
import { Action } from './entities/action.entity';
import { Assignment } from './entities/assignment.entity';
import { EventReminder } from './entities/event-reminder.entity';
import { EventEntity } from './entities/event.entity';
import { EventResolver } from './resolvers/event.resolver';
import { AssignmentApiService } from './services/assignment-api.service';
import { EventApiService } from './services/event-api.service';
import { EventReminderService } from './services/event-reminder.service';
import { EventService } from './services/event.service';
import { AssignmentResolver } from './resolvers/assignment.resolver';
import { CourseModule } from '@/course/course.module';

@Module({
    imports: [
        ApiModule,
        CourseModule,
        TypeOrmModule.forFeature([
            EventEntity,
            Action,
            Assignment,
            EventReminder,
        ]),
    ],
    providers: [
        CourseApiService,
        EventService,
        EventApiService,
        EventReminderService,
        AssignmentApiService,
        AssignmentResolver,
        EventResolver,
    ],
    exports: [EventService, EventApiService, AssignmentApiService],
})
export class EventModule {}
