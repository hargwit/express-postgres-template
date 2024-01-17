import { Handler } from 'express'
import expressWinston from 'express-winston'
import { logger } from './logger'

export const expressLogger = (): Handler =>
    expressWinston.logger({
        winstonInstance: logger,
        headerBlacklist: ['user-agent', 'x-forwarded-for', 'cookie', 'x-real-ip', 'authorization'],
    })
