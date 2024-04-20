import { BaseException } from 'src/common/errors/base.error';

export class SubjectNotFoundException extends BaseException {
    constructor(
        message?: string,
    ) {
        super(SubjectNotFoundException.name, message);
    }
}
