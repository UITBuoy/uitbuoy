import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateGoogleUserInput } from './dto/create-google-user.input';
import { GoogleUser } from './entities/google-user.entity';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => GoogleUser)
    @UseGuards(JwtAuthGuard)
    addGoogleUser(
        @CurrentUser() user: User,
        @Args({ name: 'googleUser', type: () => CreateGoogleUserInput })
        googleUser: CreateGoogleUserInput,
    ) {
        return this.userService.createGoogleUser(googleUser, user);
    }

    @ResolveField(() => Boolean)
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
