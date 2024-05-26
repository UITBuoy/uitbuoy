import { BaseException } from '@/common/errors/base.error';

export class NoteNotFoundException extends BaseException {
    constructor(private readonly id: string) {
        super(NoteNotFoundException.name);
    }
}
