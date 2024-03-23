import { BaseException } from 'src/common/errors/base.error';

export class CalendarNotFoundException extends BaseException {
    constructor(
        message?: string,
    ) {
        super(CalendarNotFoundException.name, message);
    }
}
