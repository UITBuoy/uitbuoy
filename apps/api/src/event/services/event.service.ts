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
        return this.eventRepo.findOne({ where: { id } });
    }

    async findAll(isComing?: boolean): Promise<EventEntity[]> {
        return this.eventRepo.find({
            where: isComing
                ? {
                      timestart: MoreThan(new Date().getTime() / 1000),
                  }
                : {},
        });
    }
}
