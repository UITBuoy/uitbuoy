import {
    COOKIE_NAME,
    COOKIE_PATH,
    REFRESH_TIME,
} from '@/common/constants/cookie';
import { UserService } from '@/user/user.service';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express-serve-static-core';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthEntity } from './entities/auth.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@Resolver(() => AuthEntity)
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Mutation(() => AuthEntity)
    async login(
        @Context('res') res: Response,
        @Args('username', { type: () => String }) username: string,
        @Args('password', { type: () => String }) password: string,
    ) {
        const data = new AuthEntity(
            await this.authService.validateUser(username, password),
        );

        const { access_token, refresh_token } =
            this.authService.generateToken(data);

        res.cookie(COOKIE_NAME.ACCESS_TOKEN, access_token, {
            secure: false, // Change latter
            httpOnly: true,
            signed: false, // change me
            path: COOKIE_PATH.DEFAULT,
            expires: new Date(Date.now() + REFRESH_TIME * 1000),
        });

        return {
            access_token,
            refresh_token,
            ...data,
        };
    }

    @Mutation(() => AuthEntity)
    @UseGuards(JwtRefreshAuthGuard)
    async refreshToken(@CurrentUser() user: User) {
        const { access_token } = this.authService.refreshToken(user);
        return { access_token, ...user };
    }

    @Query(() => User)
    @UseGuards(JwtAuthGuard)
    profile(@CurrentUser() user: User) {
        return user;
    }
}
