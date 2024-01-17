import { ServerErrorCode } from './ServerErrorCode'

export class ServerError extends Error {
    public errorCode: ServerErrorCode
    public cause?: Error

    constructor(message: string, errorCode: ServerErrorCode, cause?: Error) {
        super(message)

        this.errorCode = errorCode
        this.cause = cause
    }
}
