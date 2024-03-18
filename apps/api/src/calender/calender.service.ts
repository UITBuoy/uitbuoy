import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calender } from './entities/calender.entity';
import { CalenderApiService } from 'src/api/services/calender-api.service';
import { Event } from 'src/envent/entities/event.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CalenderService {
    constructor(
        @InjectRepository(Calender) private calenderRepo: Repository<Calender>,
        @InjectRepository(Event) private eventRepo: Repository<Event>,
        private readonly userService: UserService,
        private readonly calenderApiService: CalenderApiService,
    ) {}

    async save(user: User, courseids: number[]): Promise<Calender[]> {
        const response = await this.calenderApiService.getEventCalender({
            token: user.token,
            courseids,
        });

        const calendars = await Promise.all(
            response.map(async ({ events }) => {
                const userEntity = await this.userService.findById(user.id);

                const eventEntity = await this.eventRepo.save(events);

                const calendars = eventEntity.map((event) => {
                    const calendar = new Calender();
                    calendar.event = event;
                    calendar.user = userEntity;
                    return this.calenderRepo.save(calendar);
                });

                return await Promise.all(calendars);

                // const calenderEntity = await this.calenderRepo.save(calendars);

                // return calenderEntity;
            }),
        );
        let result = [];
        calendars.forEach((calendar) => {
            result = [...result, ...calendar];
        });
        return result;
    }
}
