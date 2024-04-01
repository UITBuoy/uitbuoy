import { CommonModule } from '@/common/common.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiModule } from 'src/api/api.module';
import { ApiService } from 'src/api/api.service';
import { LoggerModule } from 'src/logger/logger.module';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.stategy';
import { JwtStrategy } from './strategies/jwt.stategy';
import { TokenService } from '@/common/services/token.service';

@Module({
    imports: [
        UserModule,
        ApiModule,
        PassportModule,
        LoggerModule,
        JwtModule.registerAsync({
            imports: [ConfigModule, CommonModule],
            inject: [ConfigService, TokenService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('ACCESS_TOKEN_SECRET'),
            }),
        }),
        CommonModule,
        ConfigModule,
    ],
    providers: [
        AuthService,
        ApiService,
        TokenService,
        JwtStrategy,
        JwtRefreshStrategy,
        AuthResolver,
    ],
    exports: [AuthService],
})
export class AuthModule {}
