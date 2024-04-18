import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthEntity } from './entities/auth.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
@Resolver(() => AuthEntity)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => AuthEntity)
    async login(
        @Args('username', { type: () => String }) username: string,
        @Args('password', { type: () => String }) password: string,
    ) {
        const data = new AuthEntity(
            await this.authService.validateUser(username, password),
        );

        const {
            access_token,
            refresh_token,
            accessTokenExpiredDate,
            refreshTokenExpiredDate,
        } = this.authService.generateToken(data);

        return {
            access_token,
            refresh_token,
            accessTokenExpiredDate,
            refreshTokenExpiredDate,
            ...data,
        };
    }

    @Mutation(() => AuthEntity)
    @UseGuards(JwtRefreshAuthGuard)
    async refreshToken(@CurrentUser() user: User) {
        const { access_token, accessTokenExpiredDate } =
            this.authService.refreshToken(user);
        return { access_token, accessTokenExpiredDate, ...user };
    }

    @Query(() => User)
    @UseGuards(JwtAuthGuard)
    profile(@CurrentUser() user: User) {
        return user;
    }
}
