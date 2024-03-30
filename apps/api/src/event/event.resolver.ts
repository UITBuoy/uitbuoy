import { Resolver } from '@nestjs/graphql';
import { EventService } from './event.service';

@Resolver(() => Event)
export class EventResolver {
    constructor(private readonly courseService: EventService) {}
}
