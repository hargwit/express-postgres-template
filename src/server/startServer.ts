import { Server } from 'http'
import express from 'express'
import { config } from '../config'
import { infraRouter } from '../api/infraRouter'
import { appRouter } from '../api/appRouter'

export const startServer = (): Server => {
    const app = express()

    app.use(express.json())
    app.use(infraRouter())

    app.use(appRouter())

    const server = app.listen(config.port)

    console.log(`Server at http://localhost:${config.port} started`)

    return server
}
