import { UpdateUser, User } from "./User";

interface UserRepository {
  store: (
    user: Omit<User, "id" | "createdAt">
  ) => Promise<Omit<User, "password" | "salt">>;
  update: (user: UpdateUser) => Promise<Omit<User, "password" | "salt">>;
  findByEmail: (email: string) => Promise<User | null>;
}

export { UserRepository };
