import crypto from "crypto";
import { User } from "../../domain/users/User";
import { UserRepository } from "../../domain/users/UserRepository";
import {
  InvalidUserPasswordError,
  UserEmailNotRegisteredError,
} from "../../errors/custom-errors";

type PasswordProps = {
  candidatePassword: string;
  hash: string;
  salt: string;
};

const authService = (userRepository: UserRepository) => {
  const verifyPassword = ({ candidatePassword, hash, salt }: PasswordProps) => {
    const candidateHash = crypto
      .pbkdf2Sync(candidatePassword, salt, 10000, 64, "sha512")
      .toString("hex");

    const result = candidateHash === hash;

    return result;
  };

  const login = async (
    email: string,
    password: string,
    getAccessToken: (user: Omit<User, "id" | "password" | "salt">) => string,
  ) => {
    const user = await userRepository.findByEmail(email);

    if (!user) throw new UserEmailNotRegisteredError();

    const correctPassword = verifyPassword({
      candidatePassword: password,
      hash: user.password,
      salt: user.salt,
    });

    if (!correctPassword) throw new InvalidUserPasswordError();

    const { password: userPassword, salt, id, ...userData } = user;

    const accessToken = getAccessToken(userData);

    return accessToken;
  };

  const logout = async (tokenId: string, userEmail: string) => {
    const user = await userRepository.findByEmail(userEmail);

    if (!user) throw new UserEmailNotRegisteredError();

    await userRepository.storeRevokedAccessTokenId(tokenId, user.id);
  };

  return { login, logout };
};

export default authService;
