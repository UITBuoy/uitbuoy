/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class GoogleOAuth2SessionSerializer extends PassportSerializer {
    constructor() {
        super();
    }

    serializeUser(user: any, done: Function) {
        console.log('Serializer User');
        done(null, user);
    }

    async deserializeUser(payload: any, done: Function) {
        console.log('Deserialize User');
        console.log(payload);
        return payload ? done(null, payload) : done(null, null);
    }
}
