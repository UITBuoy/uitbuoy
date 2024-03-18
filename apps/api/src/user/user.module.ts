import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from 'src/api/api.module';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports: [ApiModule, TypeOrmModule.forFeature([User])],
    providers: [UserResolver, UserService],
    exports: [UserService],
})
export class UserModule {}
