import { Module } from '@nestjs/common';
import { GoogleCalendarResolver } from './google-calendar.resolver';
import { GoogleCalendarService } from './google-calendar.service';
import { EventModule } from '@/event/event.module';
import { GoogleUserService } from '@/user/services/google-user.service';

@Module({
    imports: [EventModule],
    providers: [
        GoogleCalendarResolver,
        GoogleCalendarService,
        GoogleUserService,
    ],
})
export class GoogleCalendarModule {}
