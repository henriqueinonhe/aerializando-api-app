
import makeUserRepository from '../../../src/infra/repositories/user-repository'

describe('makeUserRepository', () => {
  test('store', async () => {
    const repository = makeUserRepository();

    const user = await repository.store({
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
    const repository = makeUserRepository();

    const user = await repository.store({
      name: 'John Doe',
      email: 'j@j.com',
      password: '123456',
    })

    const updatedUser = await repository.update({ ...user, name: 'Jane Doe', email: 'j@ja.com' })

    expect(updatedUser.name).toBe('Jane Doe')
    expect(updatedUser.email).toBe('j@ja.com')
  })

  describe('findByEmail', () => {
    test('found user', async () => {
      const repository = makeUserRepository();

      const user = await repository.store({
        name: 'John Doe',
        email: 'j@j.com',
        password: '123456',
      })

      const foundUser = await repository.findByEmail('j@j.com')

      expect(foundUser).toStrictEqual(user)
    })

    test('not found user', async () => {
      const repository = makeUserRepository();

      const foundUser = await repository.findByEmail('j@j.com')

      expect(foundUser).toBeNull()
    })
  })
})

