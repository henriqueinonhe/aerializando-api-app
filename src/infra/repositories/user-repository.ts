import { UpdateUser, User } from "../../domain/users/User";
import { UserRepository } from "../../domain/users/UserRepository";
import client from "../db/instance";
import { parserUser } from "../parsers/user-parsers";

const makeUserRepository = (): UserRepository => ({
  store: async (
    user: Omit<User, "id" | "createdAt" | "revokedAccessTokenIds">
  ): Promise<Omit<User, "password" | "salt" | "revokedAccessTokenIds">> => {
    const { password, salt, ...result } = await client.user.create({
      data: user,
    });

    return result;
  },
  update: async (
    user: UpdateUser
  ): Promise<Omit<User, "password" | "salt" | "revokedAccessTokenIds">> => {
    const { password, salt, ...result } = await client.user.update({
      where: { id: user.id },
      data: user,
    });

    return result;
  },
  findByEmail: async (email: string): Promise<User | null> => {
    const result = await client.user.findUnique({
      where: { email },
      include: { revokedAccessTokenIds: true },
    });

    return result ? parserUser(result) : null;
  },
  storeRevokedAccessTokenId: async (tokenId: string, userId: number) => {
    await client.userRevokedAccessTokenId.create({
      data: { tokenId, user: { connect: { id: userId } } },
    });
  },
});

export default makeUserRepository;
