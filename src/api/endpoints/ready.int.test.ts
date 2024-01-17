import { setupServer, teardownServer } from '../../util/test/server'
import { Server } from 'http'
import request from 'supertest'

import { faker } from '@faker-js/faker'

jest.mock('../../util/logging/logger')

describe('GET /ready', () => {
    let server: Server

    afterAll(async () => {
        await teardownServer(server)
    })

    describe('given no database connection', () => {
        beforeAll(async () => {
            process.env.DATABASE_URL = faker.internet.url()
            server = await setupServer()
        })

        it('should return unavailable if database connection is lost', async () => {
            const response = await request(server).get('/ready')

            expect(response.status).toBe(503)
            expect(response.body).toStrictEqual({
                errorCode: '00001',
                message: expect.any(String),
            })
        })
    })
})
