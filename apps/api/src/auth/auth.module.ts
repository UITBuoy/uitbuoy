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
import { GoogleOAuth2Strategy } from './strategies/google-oauth2.strategy';
import { GoogleOAuth2SessionSerializer } from './serializer/google-oauth2.serializer';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        UserModule,
        ApiModule,
        PassportModule.register({
            session: false,
        }),
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
        GoogleOAuth2SessionSerializer,
        AuthService,
        ApiService,
        TokenService,
        GoogleOAuth2Strategy,
        JwtStrategy,
        JwtRefreshStrategy,
        AuthResolver,
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
