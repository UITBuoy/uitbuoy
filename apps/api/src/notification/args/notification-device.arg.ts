import { ArgsType, InputType, OmitType } from '@nestjs/graphql';
import { NotificationDevice } from '../entities/notification-device.entity';

@InputType()
export class UpdatedNotificationDevice extends OmitType(
    NotificationDevice,
    ['user', 'lastNotificationDate'],
    InputType,
) {}
