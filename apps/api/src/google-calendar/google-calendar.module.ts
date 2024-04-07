import { Module } from '@nestjs/common';
import { GoogleCalendarResolver } from './google-calendar.resolver';
import { GoogleCalendarService } from './google-calendar.service';

@Module({
    providers: [GoogleCalendarResolver, GoogleCalendarService],
})
export class GoogleCalendarModule {}
