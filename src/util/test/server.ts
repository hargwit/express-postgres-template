import { Server } from 'http'

export const setupServer = async (): Promise<Server> => {
    // We have to dynamic import so that env vars are populated prior to the config being imported for the first time
    const { startServer } = await import('../../server')

    return startServer()
}

export const teardownServer = async (server: Server): Promise<void> => {
    await new Promise<void>((resolve) => {
        server.close(() => resolve())
    })
}
