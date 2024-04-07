import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { EventApiService } from '@/event/services/event-api.service';
import { User } from '@/user/entities/user.entity';
import { GoogleUserService } from '@/user/services/google-user.service';
import { UseGuards } from '@nestjs/common';
import { GoogleCalendarEvent } from './entities/google-calendar-event.entity';
import { GoogleCalendarService } from './google-calendar.service';

@Resolver(() => GoogleCalendarEvent)
export class GoogleCalendarResolver {
    constructor(
        private readonly googleCalendarService: GoogleCalendarService,
        private readonly eventApiService: EventApiService,
        private readonly googleUserService: GoogleUserService,
    ) {}

    @Mutation(() => [GoogleCalendarEvent])
    @UseGuards(JwtAuthGuard)
    async syncEvent(
        @CurrentUser() user: User,
        @Args('googleUserId') googleUserId: string,
        @Args('accessToken') accessToken: string,
    ): Promise<GoogleCalendarEvent[]> {
        const events = await this.eventApiService.getEventList({
            token: user.token,
        });
        const googleUser = await this.googleUserService.findById(googleUserId);

        return this.googleCalendarService.sync(events, googleUser, accessToken);
    }
}
