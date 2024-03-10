import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { ApiModule } from 'src/api/api.module';

@Module({
    imports: [ApiModule],
    providers: [UserResolver, UserService],
    exports: [UserService],
})
export class UserModule {}
