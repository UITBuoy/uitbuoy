import { User } from '@/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { NotificationDevice } from './entities/notification-device.entity';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(NotificationDevice)
        private readonly repo: Repository<NotificationDevice>,
    ) {}

    async update(user: User, token: string): Promise<NotificationDevice> {
        return this.repo.save({ token, user });
    }

    async remove(user: User, token: string): Promise<number> {
        return (await this.repo.delete({ token, user: { id: user.id } }))
            .affected;
    }
}
