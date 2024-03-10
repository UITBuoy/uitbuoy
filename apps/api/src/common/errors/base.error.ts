export abstract class BaseException extends Error {
    constructor(
        public code: string,
        message?: string,
    ) {
        super(message);
    }
}
