import { Handler } from 'express'
import { ServerHealth } from '../../server/health'
import { Status } from '../../server/status'
import { healthCheck } from '../../util/database/healthCheck'
import { DatabaseConnectionError } from '../../util/database/DatabaseConnectionError'

export const ready: Handler = async (_, res, next) => {
    const response: ServerHealth = {
        uptime: process.uptime(),
        status: Status.UP,
    }

    try {
        await healthCheck()
    } catch (error) {
        return next(new DatabaseConnectionError(error as Error))
    }

    res.status(200).json(response)
}
