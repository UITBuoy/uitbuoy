import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthEntity } from './entities/auth.entity';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => AuthEntity)
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) {}

    @Query(() => AuthEntity)
    async login(
        @Args('username', { type: () => String }) username: string,
        @Args('password', { type: () => String }) password: string,
    ) {
        const data = new AuthEntity(
            await this.authService.validateUser(username, password),
        );
        return {
            access_token: this.jwtService.sign({
                ...data,
                sub: data.username,
            }),
            ...data,
        };
    }

    @Query(() => User)
    @UseGuards(JwtAuthGuard)
    profile(@CurrentUser() user: User) {
        return user;
    }
}
