import { Query, Resolver } from '@nestjs/graphql';
import { EventService } from './services/event.service';
import { CourseService } from '@/course/services/course.service';
import { EventApiService } from './services/event-api.service';
import { EventEntity } from './entities/event.entity';

@Resolver(() => EventEntity)
export class EventResolver {
    constructor(
        private readonly courseService: CourseService,
        private readonly eventService: EventService,
        private readonly eventApiService: EventApiService,
    ) {}
}
