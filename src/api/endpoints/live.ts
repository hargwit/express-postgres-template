import { Handler } from 'express'
import { ServerHealth } from '../../server/health'
import { Status } from '../../server/status'

export const live: Handler = async (_, res) => {
    const response: ServerHealth = {
        uptime: process.uptime(),
        status: Status.UP,
    }

    res.status(200).json(response)
}
