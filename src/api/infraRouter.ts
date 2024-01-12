import { Router } from 'express'
import { live } from './endpoints/live'
import { ready } from './endpoints/ready'

/**
 * These routes are not part of the business logic of the application, they exist only to allow the service to function and to provide utilities to developers.
 * These routes are not logged or authenticated.
 */
export const infraRouter = (): Router => {
    const router = Router()

    router.get('/live', live)
    router.get('/ready', ready)

    return router
}
