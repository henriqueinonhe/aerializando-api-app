import { User } from "../../domain/users/User"
import { UserRepository } from "../../domain/users/UserRepository"
import client from "../db/instance"

const makeUserRepository = (): UserRepository => ({
  store: async (user: Omit<User, "id">) => {
    return await client.user.create({ data: user })
  },
  update: async (user: User) => {
    return await client.user.update({ where: { id: user.id }, data: user })
  },
  findByEmail: async (email: string) => {
    return await client.user.findUnique({ where: { email } })
  }
})

export default makeUserRepository