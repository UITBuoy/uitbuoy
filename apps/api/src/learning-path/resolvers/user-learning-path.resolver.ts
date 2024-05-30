import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { User } from '@/user/entities/user.entity';
import { UserService } from '@/user/services/user.service';
import { UseGuards } from '@nestjs/common';
import { Int, ResolveField, Resolver } from '@nestjs/graphql';
import { LearningPathService } from '../learning-path.service';

@Resolver(() => User)
export class UserLearningPathResolver {
    constructor(
        private readonly learningPathService: LearningPathService,
        private readonly userService: UserService,
    ) {}

    @ResolveField(() => String, {
        description: "Major's fullname of current user",
    })
    @UseGuards(JwtAuthGuard)
    async majorName(@CurrentUser() user: User): Promise<string> {
        return this.learningPathService.findMajorName(user);
    }

    @ResolveField(() => String, {
        description: 'Entrance year of current user',
    })
    @UseGuards(JwtAuthGuard)
    async year(@CurrentUser() user: User): Promise<string> {
        return this.userService.findYear(user);
    }

    @ResolveField(() => Int, {
        description: 'Current semester of the user',
    })
    @UseGuards(JwtAuthGuard)
    async semester(@CurrentUser() user: User): Promise<number> {
        return this.userService.findSemester(user);
    }
}
