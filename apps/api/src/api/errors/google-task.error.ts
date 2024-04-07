import { BaseException } from 'src/common/errors/base.error';

export class GoogleTaskException extends BaseException {
    constructor(message?: string) {
        super(GoogleTaskException.name, message);
    }
}
