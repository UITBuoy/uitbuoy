import { BaseException } from 'src/common/errors/base.error';

export class CalenderNotFoundException extends BaseException {
    constructor(
        message?: string,
    ) {
        super(CalenderNotFoundException.name, message);
    }
}
