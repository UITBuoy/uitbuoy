import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calendar } from '../entities/calendar.entity';
import { CalendarApiService } from '@/calendar/services/calender-api.service';
import { EventEntity } from 'src/event/entities/event.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CalendarService {
    constructor(
        @InjectRepository(Calendar) private calenderRepo: Repository<Calendar>,
        @InjectRepository(EventEntity)
        private eventRepo: Repository<EventEntity>,
        private readonly userService: UserService,
        private readonly calenderApiService: CalendarApiService,
    ) {}

    async save(user: User, courseids: number[]): Promise<Calendar[]> {
        const response = await this.calenderApiService.getEventCalendar({
            token: user.token,
            courseids,
        });

        const calendars = await Promise.all(
            response.map(async ({ events }) => {
                const userEntity = await this.userService.findById(user.id);

                const eventEntity = await this.eventRepo.save(events);

                const calendars = eventEntity.map((event) => {
                    const calendar = new Calendar();
                    // calendar.event = event;
                    calendar.user = userEntity;
                    return this.calenderRepo.save(calendar);
                });

                return await Promise.all(calendars);
            }),
        );
        let result = [];
        calendars.forEach((calendar) => {
            result = [...result, ...calendar];
        });
        return result;
    }
}
