import { Server } from 'http'
import express from 'express'
import { config } from '../config'

export const startServer = (): Server => {
    const app = express()

    const server = app.listen(config.port)

    console.log(`Server at http://localhost:${config.port} started`)

    return server
}
