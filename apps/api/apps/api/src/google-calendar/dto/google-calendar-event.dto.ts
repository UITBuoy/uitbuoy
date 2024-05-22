import { OmitType } from '@nestjs/graphql';
import { GoogleCalendarEvent } from '../entities/google-calendar-event.entity';

export class GoogleCalendarEventDto extends OmitType(GoogleCalendarEvent, [
    'id',
]) {}
