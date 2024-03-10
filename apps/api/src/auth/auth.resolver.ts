import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthEntity } from './entities/auth.entity';
import { AuthService } from './auth.service';

@Resolver(() => AuthEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthEntity, { name: 'login' })
  login(
    @Args('username', { type: () => String }) username: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    return this.authService.validateUser(username, password);
  }
}
