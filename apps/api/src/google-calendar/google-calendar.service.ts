import { EventEntity } from '@/event/entities/event.entity';
import { GoogleUser } from '@/user/entities/google-user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleCalendarEventDto } from './dto/google-calendar-event.dto';
import { GoogleCalendarEvent } from './entities/google-calendar-event.entity';

@Injectable()
export class GoogleCalendarService {
    constructor(
        @InjectRepository(GoogleCalendarEvent)
        private readonly repo: Repository<GoogleCalendarEvent>,
    ) {}

    async sync(
        events: EventEntity[],
        googleUser: GoogleUser,
        accessToken: string,
    ): Promise<GoogleCalendarEvent[]> {
        const googleCalendarEvents: GoogleCalendarEventDto[] = events.map(
            (event) => {
                // TODO: call Google API to create new event

                return {
                    id: '',
                    lastSync: new Date().getTime(),
                    event,
                    googleUser,
                };
            },
        );

        return this.repo.save(googleCalendarEvents);
    }
}
