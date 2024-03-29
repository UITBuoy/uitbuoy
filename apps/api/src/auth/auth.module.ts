import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiModule } from 'src/api/api.module';
import { ApiService } from 'src/api/api.service';
import { LoggerModule } from 'src/logger/logger.module';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.stategy';

@Module({
    imports: [
        UserModule,
        ApiModule,
        PassportModule,
        LoggerModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '2h' },
        }),
    ],
    providers: [AuthService, ApiService, JwtStrategy, AuthResolver],
    exports: [AuthService],
})
export class AuthModule {}
