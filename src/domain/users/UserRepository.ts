import { User } from './User';

interface UserRepository {
  store: (entry: Omit<User, "id">) => Promise<User>;
  update: (entry: User) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
}

export { UserRepository };