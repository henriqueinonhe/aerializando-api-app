import { UpdateUser, User } from "./User";

interface UserRepository {
  store: (
    user: Omit<User, "id" | "createdAt">
  ) => Promise<Omit<User, "password" | "salt" | "revokedAccessTokens">>;
  update: (user: UpdateUser) => Promise<Omit<User, "password" | "salt" | "revokedAccessTokens">>;
  findByEmail: (email: string) => Promise<User | null>;
  storeRevokedAccessToken: (token: string, userId: number) => Promise<void>;
}

export { UserRepository };
