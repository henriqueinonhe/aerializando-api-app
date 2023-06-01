import { User } from "../../domain/User"
import client from "../db/instance"

const UserRepository = () => ({
  create: async (user: Omit<User, "id">) => {
    return await client.user.create({ data: user })
  },
  update: async (user: User) => {
    return await client.user.update({ where: { id: user.id }, data: user })
  },
  findByEmail: async (email: string) => {
    return await client.user.findUnique({ where: { email } })
  }
})

export default UserRepository