import { PrismaClient } from '@prisma/client'
import { logger } from '../logging/logger'

const database = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
})

database.$use(async (params, next) => {
    try {
        return await next(params)
    } catch (e) {
        logger.error(`Prisma failed action ${params.model}.${params.action} caused by`, e)

        throw e
    }
})

database.$on('query', (event) => {
    logger.debug(`query: ${event.query}, params: ${event.params}, duration: ${event.duration}`)
})

database.$on('info', (event) => {
    logger.info(event.message)
})

database.$on('warn', (event) => {
    logger.warn(event.message)
})

export { database }
