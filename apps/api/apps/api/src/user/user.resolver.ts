import { GoogleTasksApiService } from '@/api/services/google-task-api.service';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateGoogleUserInput } from './dto/create-google-user.input';
import { GoogleUser } from './entities/google-user.entity';
import { User } from './entities/user.entity';
import { GoogleUserService } from './services/google-user.service';
import { UserService } from './services/user.service';

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly googleTasksApiService: GoogleTasksApiService,
        private readonly googleUserService: GoogleUserService,
    ) {}

    @Query(() => User)
    @UseGuards(JwtAuthGuard)
    profile(@CurrentUser() user: User) {
        return user;
    }

    @Query(() => String)
    @UseGuards(JwtAuthGuard)
    async year(@CurrentUser() user: User) {
        const responseUser = await this.userService.findById(user.id);
        return Math.floor(
            parseInt(responseUser.username) / 1000000 - 5,
        ).toString();
    }

    @Mutation(() => GoogleUser)
    @UseGuards(JwtAuthGuard)
    async addGoogleUser(
        @CurrentUser() user: User,
        @Args({ name: 'googleUser', type: () => CreateGoogleUserInput })
        googleUser: CreateGoogleUserInput,
        @Args('accessToken')
        accessToken: string,
    ) {
        const googleUserResponse = await this.googleUserService.findById(
            googleUser.id,
        );
        if (googleUserResponse) {
            return googleUserResponse;
        }
        const taskList =
            await this.googleTasksApiService.createTaskList(accessToken);
        googleUser.taskListId = taskList.id;
        return this.userService.createGoogleUser(googleUser, user);
    }

    @ResolveField(() => Boolean, { nullable: true })
    async isIntegrateWithGoogle(@CurrentUser() user: User) {
        const responseUser = await this.userService.findById(user.id);
        return responseUser.googleUsers.length;
    }

    @ResolveField(() => [GoogleUser])
    async googleUsers(@CurrentUser() user: User) {
        const responseUser = await this.userService.findById(user.id);
        return responseUser.googleUsers;
    }
}
