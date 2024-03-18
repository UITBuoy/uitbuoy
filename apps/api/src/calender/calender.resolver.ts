import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CalenderService } from './calender.service';
import { Calender } from './entities/calender.entity';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Calender)
export class CalenderResolver {
    constructor(private readonly calenderService: CalenderService) {}

    @Mutation(() => [Calender])
    @UseGuards(JwtAuthGuard)
    async findAllEventByCourseIds(
        @CurrentUser() user: User,
        @Args('courseids', { type: () => [Int] }) courseids: number[],
    ): Promise<Calender[]> {
        return this.calenderService.save(user, courseids);
    }
}
