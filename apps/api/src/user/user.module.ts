import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { ApiModule } from 'src/api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
    imports: [ApiModule, TypeOrmModule.forFeature([User])],
    providers: [UserResolver, UserService],
    exports: [UserService],
})
export class UserModule {}
