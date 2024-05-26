import { Injectable } from '@nestjs/common';
import { EventReminder } from '../entities/event-reminder.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventReminderService {
    constructor(
        @InjectRepository(EventReminder)
        private readonly repo: Repository<EventReminder>,
    ) {}

    async create(
        reminders: Partial<EventReminder>[],
    ): Promise<EventReminder[]> {
        return this.repo.save(reminders);
    }
}
