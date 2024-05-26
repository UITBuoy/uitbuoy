import { BaseException } from 'src/common/errors/base.error';

export class UserNotFoundException extends BaseException {
    constructor(
        public id: string,
        message?: string,
    ) {
        super(UserNotFoundException.name, message);
    }
}
