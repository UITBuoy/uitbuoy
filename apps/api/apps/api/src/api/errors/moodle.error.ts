import { BaseException } from 'src/common/errors/base.error';

export class MoodleException extends BaseException {
    constructor(
        public exception: string,
        public error_code: string,
        message?: string,
    ) {
        super(MoodleException.name, message);
    }
}
