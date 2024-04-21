import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { User } from '@/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import {
    Args,
    Mutation,
    ObjectType,
    OmitType,
    Resolver,
} from '@nestjs/graphql';
import { NotificationDevice } from './entities/notification-device.entity';
import { NotificationService } from './notification.service';
import { DeleteResult } from 'typeorm';

@Resolver(() => NotificationDevice)
export class NotificationResolver {
    constructor(private readonly notificationService: NotificationService) {}

    @Mutation(() => NotificationDevice)
    @UseGuards(JwtAuthGuard)
    async uploadNotificationPushToken(
        @CurrentUser() user: User,
        @Args('token') token: string,
    ) {
        return this.notificationService.update(user, token);
    }

    @Mutation(() => Boolean)
    @UseGuards(JwtAuthGuard)
    async removeNotificationPushToken(
        @CurrentUser() user: User,
        @Args('token') token: string,
    ) {
        return !!(await this.notificationService.remove(user, token));
    }
}
