import { Server } from 'http'
import express from 'express'
import { config } from '../config'
import { infraRouter } from '../api/infraRouter'
import { appRouter } from '../api/appRouter'
import { errorHandler } from './errorHandler'
import { initialiseLogger, logger } from '../util/logging/logger'
import { Environment } from '../config/environment'
import { expressLogger } from '../util/logging/middleware'

initialiseLogger({
    service: config.service,
    version: config.version,
    logLevel: config.logLevel,
    isLocal: config.environment === Environment.LOCAL,
})

export const startServer = (): Server => {
    const app = express()

    app.use(express.json())
    app.use(infraRouter())

    app.use(expressLogger())

    app.use(appRouter())

    app.use(errorHandler)

    const server = app.listen(config.port)

    logger.info(`Server at http://localhost:${config.port} started`)

    return server
}
