import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CalendarService } from './services/calendar.service';
import { Calendar } from './entities/calendar.entity';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Calendar)
export class CalendarResolver {
    constructor(private readonly calenderService: CalendarService) {}

    @Mutation(() => [Calendar])
    @UseGuards(JwtAuthGuard)
    async findAllEventByCourseIds(
        @CurrentUser() user: User,
        @Args('courseids', { type: () => [Int] }) courseids: number[],
    ): Promise<Calendar[]> {
        return this.calenderService.save(user, courseids);
    }
}
