import { User } from '@/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expo } from 'expo-server-sdk';
import { Repository } from 'typeorm';
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

    async notifyEvents() {
        let expo = new Expo({
            useFcmV1: true,
        });

        const devices = await this.repo.findBy({});

        devices.forEach((device) => {
            expo.sendPushNotificationsAsync([
                {
                    to: device.token,
                    sound: 'default',
                    title: 'This is title',
                    body: 'Body neee',
                    data: { cc: 1 },
                    channelId: 'assignment_due',
                },
            ]);
        });

        return true;
    }
}
