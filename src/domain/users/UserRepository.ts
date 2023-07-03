import { UpdateUser, User } from "./User";

interface UserRepository {
  store: (
    user: Omit<User, "id" | "createdAt">
  ) => Promise<Omit<User, "password" | "salt" | "revokedAccessTokenIds">>;
  update: (user: UpdateUser) => Promise<Omit<User, "password" | "salt" | "revokedAccessTokenIds">>;
  findByEmail: (email: string) => Promise<User | null>;
  storeRevokedAccessTokenId: (tokenId: string, userId: number) => Promise<void>;
}

export { UserRepository };
