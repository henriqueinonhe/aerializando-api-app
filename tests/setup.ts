import { beforeEach } from 'vitest'
import client from '../src/infra/db/instance'

beforeEach(async () => {
  await client.$transaction([
    client.user.deleteMany()
  ])

  await client.$disconnect()
})