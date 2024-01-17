import { ServerError } from '../errors/ServerError'
import { ServerErrorCode } from '../errors/ServerErrorCode'

export class DatabaseConnectionError extends ServerError {
    constructor(error: Error) {
        super(`Failed to connect to database`, ServerErrorCode.DatabaseConnectionError, error)
    }
}
