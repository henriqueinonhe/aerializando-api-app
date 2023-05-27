
import { describe, expect, test } from 'vitest'
import UserRepository from '../../../src/infra/repositories/user-repository'

describe('UserRepository', () => {
  test('create', async () => {
    const repository = UserRepository();

    const user = await repository.create({
      name: 'John Doe',
      email: 'j@j.com',
      password: '123456',
    })

    expect(user).toStrictEqual({
      id: expect.any(Number),
      name: 'John Doe',
      email: 'j@j.com',
      password: '123456',
    })
  })

  test('update', async () => {
    const repository = UserRepository();

    const user = await repository.create({
      name: 'John Doe',
      email: 'j@j.com',
      password: '123456',
    })

    const updatedUser = await repository.update({ ...user, name: 'Jane Doe', email: 'j@ja.com' })

    expect(updatedUser.name).toBe('Jane Doe')
    expect(updatedUser.email).toBe('j@ja.com')
  })
})

