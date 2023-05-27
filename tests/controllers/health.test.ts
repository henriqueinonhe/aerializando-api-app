import { afterAll, expect, test } from 'vitest'

import app from "../../src/server"
import supertest from 'supertest'

afterAll(async () => {
  await app.close()
})

test('with a running server', async () => {
  await app.ready()

  const response = await supertest(app.server)
    .get('/health')
    .expect(200)

  expect(response.body).toStrictEqual({
    db: 'live',
    version: '0.0.1',
  })
})