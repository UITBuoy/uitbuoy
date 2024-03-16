import { BaseException } from 'src/common/errors/base.error';

export class CourseNotFoundException extends BaseException {
    constructor(
        public id: string,
        message?: string,
    ) {
        super(CourseNotFoundException.name, message);
    }
}
