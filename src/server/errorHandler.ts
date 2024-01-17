import type { ErrorRequestHandler } from 'express'
import { isServerError } from '../util/errors/isServerError'
import { ServerErrorCode } from '../util/errors/ServerErrorCode'
import { StatusCodes } from 'http-status-codes'
import { DefaultServerError } from '../util/errors/DefaultServerError'

const statusCodeErrorMapping: Record<ServerErrorCode, StatusCodes> = {
    [ServerErrorCode.DefaultServerErrorCode]: StatusCodes.INTERNAL_SERVER_ERROR,
    [ServerErrorCode.DatabaseConnectionError]: StatusCodes.SERVICE_UNAVAILABLE,
}

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    if (isServerError(error)) {
        // This is an error we threw intentionally
        console.log(`There was an error ${error.errorCode} ${error.message} ${error.cause}`)

        res.status(statusCodeErrorMapping[error.errorCode]).json({
            errorCode: error.errorCode,
            message: error.message,
        })
    } else {
        // We don't know what this error is, so we fall back to a generic error response and log it as an error
        console.log('Unknown error: ', error)

        const e = new DefaultServerError(error)

        res.status(statusCodeErrorMapping[ServerErrorCode.DefaultServerErrorCode]).json({
            errorCode: e.errorCode,
            message: e.message,
        })
    }
}
