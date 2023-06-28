import { User } from "../../domain/users/User";

export const parserUser = (user: any): User => {
  return {
    ...user,
    revokedAccessTokens: user?.revokedAccessTokens.map(
      ({ token }: { token: string }) => token
    ),
  };
};
