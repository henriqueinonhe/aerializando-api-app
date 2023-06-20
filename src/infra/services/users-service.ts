import crypto from "crypto";
import { CreateUser, UpdateUser, User } from "../../domain/users/User";
import { UserRepository } from "../../domain/users/UserRepository";
import { UserEmailAlreadyExistsError } from "../../errors/custom-errors";

const userService = (repository: UserRepository) => {
  const hashPassword = (password: string) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");

    return { hash, salt };
  };

  const store = async (user: CreateUser): Promise<void> => {
    const userFound = await findByEmail(user.email);

    if (userFound)
      throw new UserEmailAlreadyExistsError();

    const { password, passwordConfirmation, ...userData } = user;

    const { hash, salt } = hashPassword(password);

    await repository.store({ password: hash, salt, ...userData });
  };

  const update = async (user: UpdateUser): Promise<void> => {
    await repository.update(user);
  };

  const findByEmail = async (email: string): Promise<User | null> => {
    const user = await repository.findByEmail(email);

    if (!user) return null;

    return user;
  };

  return {
    store,
    update,
    findByEmail,
  };
};

export default userService;
