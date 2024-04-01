import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class TokenService {
    private token: string;

    constructor() {}

    setToken = (token: string) => {
        this.token = token;
    };

    getToken() {
        return this.token;
    }
}
