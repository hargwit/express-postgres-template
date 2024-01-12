import { setupServer, teardownServer } from '../../util/test/server'
import { Server } from 'http'
import request from 'supertest'
import { Status } from '../../server/status'

describe('GET /live', () => {
    let server: Server

    beforeAll(async () => {
        server = await setupServer()
    })

    afterAll(async () => {
        await teardownServer(server)
    })

    it('returns expected response', async () => {
        const response = await request(server).get('/live')

        expect(response.status).toBe(200)
        expect(response.body).toStrictEqual({
            uptime: expect.any(Number),
            status: Status.UP,
        })
    })
})
