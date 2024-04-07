import { BaseException } from './base.error';

export class UnauthorizedException extends BaseException {
    constructor() {
        super(UnauthorizedException.name);
    }
}
