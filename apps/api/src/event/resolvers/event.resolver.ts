import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Course } from '@/course/entities/course.entity';
import { User } from '@/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import {
    Args,
    Int,
    Mutation,
    Parent,
    PartialType,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { EventReminder } from '../entities/event-reminder.entity';
import { EventEntity } from '../entities/event.entity';
import { EventApiService } from '../services/event-api.service';
import { EventReminderService } from '../services/event-reminder.service';
import { EventService } from '../services/event.service';
import { EventReminderInput } from '../dto/event-reminder.dto';
import { QueryArgs } from '@/common/args/query.arg';

@Resolver(() => EventEntity)
export class EventResolver {
    constructor(
        private readonly eventService: EventService,
        private readonly eventApiService: EventApiService,
        private readonly eventReminderService: EventReminderService,
    ) {}

    @Query(() => [EventEntity], { description: 'All events of current user' })
    @UseGuards(JwtAuthGuard)
    async userEvents(
        @CurrentUser() user: User,
        @Args()
        queryArgs: QueryArgs,
        @Args('isComing', {
            type: () => Boolean,
            nullable: true,
            defaultValue: true,
        })
        isComing: boolean,
    ) {
        if (queryArgs.isNew) {
            const eventsResponse = await this.eventApiService.getEventList({
                ...user,
                isComing,
            });
            const events = await this.eventService.save(eventsResponse);
            return events.sort(
                (a, b) => a.timeusermidnight - b.timeusermidnight,
            );
        }
        return this.eventService.findAll(user.id, isComing);
    }

    @ResolveField(() => Course, {
        description: 'Information of the course of the current event',
    })
    course(@Parent() event: EventEntity) {
        return event.course;
    }

    @Mutation(() => EventReminder, { description: 'Add new event reminder' })
    @UseGuards(JwtAuthGuard)
    async addEventReminder(
        @CurrentUser() user: User,
        @Args({ name: 'event_id', type: () => Int }) event_id: number,
        @Args('reminder', { type: () => EventReminderInput })
        reminderInput: EventReminderInput,
    ) {
        const reminder = new EventReminder(
            reminderInput.isMute,
            reminderInput.minutes,
        );
        const event = await this.eventService.findById(event_id);
        reminder.event = event;
        reminder.user = user;
        const result = await this.eventReminderService.create([reminder]);
        return result[0];
    }
}
