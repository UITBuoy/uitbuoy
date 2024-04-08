import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { EventEntity } from '../entities/event.entity';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(EventEntity)
        private eventRepo: Repository<EventEntity>,
    ) {}

    async save(events: EventEntity[]) {
        return this.eventRepo.save(events);
    }

    async findById(id: number): Promise<EventEntity> {
        return this.eventRepo.findOne({
            where: { id },
            relations: { course: true },
        });
    }

    async findAll(
        userId: number,
        isComing?: boolean,
        withCourse = true,
    ): Promise<EventEntity[]> {
        return this.eventRepo.find({
            where: isComing
                ? {
                      timeusermidnight: MoreThan(
                          Math.floor(new Date().getTime() / 1000),
                      ),
                      course: { users: { id: userId } },
                  }
                : { course: { users: { id: userId } } },
            order: { timeusermidnight: 'ASC' },
            relations: { course: withCourse },
        });
    }
}
