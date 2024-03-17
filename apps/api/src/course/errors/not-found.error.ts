import { BaseException } from 'src/common/errors/base.error';

export class CourseNotFoundException extends BaseException {
    constructor(
        message?: string,
    ) {
        super(CourseNotFoundException.name, message);
    }
}
