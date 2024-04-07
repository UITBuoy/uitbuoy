import { Resolver } from '@nestjs/graphql';
// import { GoogleCalendar } from './entities/google-calendar.entity';
import { GoogleCalendarService } from './google-calendar.service';

@Resolver(() => String)
export class GoogleCalendarResolver {
    constructor(
        private readonly googleCalendarService: GoogleCalendarService,
    ) {}
}
