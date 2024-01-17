import { ServerError } from '../errors/ServerError'
import { ServerErrorCode } from '../errors/ServerErrorCode'

export class DefaultServerError extends ServerError {
    constructor(error: Error) {
        super(`There was a problem`, ServerErrorCode.DefaultServerErrorCode, error)
    }
}
