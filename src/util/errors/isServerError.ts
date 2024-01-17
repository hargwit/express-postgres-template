import { DatabaseConnectionError } from '../database/DatabaseConnectionError'
import { ServerError } from './ServerError'

export const isServerError = (error: Error): error is ServerError => {
    return error instanceof DatabaseConnectionError
}
