import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from 'src/api/api.module';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './services/user.service';
import { GoogleUser } from './entities/google-user.entity';
import { GoogleUserService } from './services/google-user.service';

@Module({
    imports: [ApiModule, TypeOrmModule.forFeature([User, GoogleUser])],
    providers: [UserResolver, UserService, GoogleUserService],
    exports: [UserService, GoogleUserService],
})
export class UserModule {}
