import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleOAuth2Strategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly configService: ConfigService) {
        super();
    }

    async validate(accessToken: string, refreshToken: string, profile: any) {
        console.log({ accessToken });
        console.log({ refreshToken });
        console.log({ profile });
        return profile || null;
    }
}
