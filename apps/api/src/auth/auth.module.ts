import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.stategy';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { ApiService } from 'src/api/api.service';
import { ApiModule } from 'src/api/api.module';

@Module({
    imports: [
        UserModule,
        ApiModule,
        PassportModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '2h' },
        }),
    ],
    providers: [AuthService, ApiService, JwtStrategy, AuthResolver],
    exports: [AuthService],
})
export class AuthModule {}
