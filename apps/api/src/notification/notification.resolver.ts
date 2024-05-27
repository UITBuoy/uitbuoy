import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { User } from '@/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import {
    Args,
    Int,
    Mutation,
    ObjectType,
    OmitType,
    Resolver,
} from '@nestjs/graphql';
import { NotificationDevice } from './entities/notification-device.entity';
import { NotificationService } from './notification.service';
import { DeleteResult } from 'typeorm';
import { UpdatedNotificationDevice } from './args/notification-device.arg';

@Resolver(() => NotificationDevice)
export class NotificationResolver {
    constructor(private readonly notificationService: NotificationService) {}

    @Mutation(() => NotificationDevice)
    @UseGuards(JwtAuthGuard)
    async uploadNotificationConfig(
        @CurrentUser() user: User,
        @Args('config') config: UpdatedNotificationDevice,
    ) {
        return this.notificationService.update(user, config);
    }

    @Mutation(() => Boolean)
    @UseGuards(JwtAuthGuard)
    async removeNotificationPushToken(
        @CurrentUser() user: User,
        @Args('token') token: string,
    ) {
        return !!(await this.notificationService.remove(user, token));
    }

    @Mutation(() => Int)
    async notifyEvents() {
        return await this.notificationService.notifyEvents();
    }
}
