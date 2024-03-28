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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.stategy';

@Module({
    imports: [
        UserModule,
        ApiModule,
        PassportModule,
        LoggerModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('ACCESS_TOKEN_SECRET'),
            }),
        }),
        ConfigModule,
    ],
    providers: [
        AuthService,
        ApiService,
        JwtStrategy,
        JwtRefreshStrategy,
        AuthResolver,
    ],
    exports: [AuthService],
})
export class AuthModule {}
