import { UpdateUser, User } from "../../domain/users/User";
import { UserRepository } from "../../domain/users/UserRepository";
import client from "../db/instance";

const makeUserRepository = (): UserRepository => ({
  store: async (
    user: Omit<User, "id" | "createdAt">
  ): Promise<Omit<User, "password" | "salt">> => {
    const { password, salt, ...result } = await client.user.create({
      data: user,
    });

    return result;
  },
  update: async (user: UpdateUser): Promise<Omit<User, "password" | "salt">> => {
    return await client.user.update({ where: { id: user.id }, data: user });
  },
  findByEmail: async (email: string): Promise<User | null> => {
    return await client.user.findUnique({ where: { email } });
  },
});

export default makeUserRepository;
