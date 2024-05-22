import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { EventReminder } from '../entities/event-reminder.entity';

@InputType()
export class EventReminderInput extends OmitType(
    EventReminder,
    ['id', 'event'],
    InputType,
) {}
