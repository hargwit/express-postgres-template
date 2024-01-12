import { Server } from 'http'

export const setupServer = async (): Promise<Server> => {
    // We have to dynamic import so that env vars are populated prior to the config being imported for the first time
    const { startServer } = await import('../../server')

    return startServer()
}

export const teardownServer = (server: Server): Promise<void> =>
    new Promise((resolve) => {
        server.close(() => resolve())
    })
