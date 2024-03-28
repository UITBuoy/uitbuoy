import {
    COOKIE_NAME,
    COOKIE_PATH,
    REFRESH_TIME,
} from '@/common/constants/cookie';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express-serve-static-core';
import { LoggerService } from 'src/logger/logger.service';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthEntity } from './entities/auth.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Resolver(() => AuthEntity)
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
        private readonly loggerService: LoggerService,
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

        const access_token = this.jwtService.sign({
            ...data,
            sub: data.username,
        });

        res.cookie(COOKIE_NAME.ACCESS_TOKEN, access_token, {
            secure: false, // Change latter
            httpOnly: true,
            signed: false, // change me
            path: COOKIE_PATH.DEFAULT,
            expires: new Date(Date.now() + REFRESH_TIME * 1000),
        });

        return {
            access_token,
            ...data,
        };
    }

    @Query(() => User)
    @UseGuards(JwtAuthGuard)
    profile(@CurrentUser() user: User) {
        return user;
    }
}
