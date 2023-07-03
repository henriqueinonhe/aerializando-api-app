import { User } from "../../domain/users/User";

export const parserUser = (user: any): User => {
  return {
    ...user,
    revokedAccessTokenIds: user?.revokedAccessTokenIds.map(
      ({ tokenId }: { tokenId: string }) => tokenId
    ),
  };
};
