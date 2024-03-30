import { Args, Query, Resolver } from '@nestjs/graphql';
import { EventService } from './services/event.service';
import { CourseService } from '@/course/services/course.service';
import { EventApiService } from './services/event-api.service';
import { EventEntity } from './entities/event.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { User } from '@/user/entities/user.entity';

@Resolver(() => EventEntity)
export class EventResolver {
    constructor(
        private readonly courseService: CourseService,
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
}
