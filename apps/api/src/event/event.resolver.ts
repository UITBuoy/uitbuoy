import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Course } from '@/course/entities/course.entity';
import { User } from '@/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { EventEntity } from './entities/event.entity';
import { EventApiService } from './services/event-api.service';
import { EventService } from './services/event.service';

@Resolver(() => EventEntity)
export class EventResolver {
    constructor(
        private readonly eventService: EventService,
        private readonly eventApiService: EventApiService,
    ) {}

    @Query(() => [EventEntity])
    @UseGuards(JwtAuthGuard)
    async userEvents(
        @CurrentUser() user: User,
        @Args('isComing', {
            type: () => Boolean,
            nullable: true,
            defaultValue: true,
        })
        isComing: boolean,
    ) {
        return this.eventApiService.getEventList({ ...user, isComing });
    }

    @ResolveField(() => Course)
    course(@Parent() event: EventEntity) {
        return event.course;
    }
}
