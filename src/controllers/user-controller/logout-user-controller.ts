import { JWT } from "@fastify/jwt";
import { Repositories } from "../../infra/repositories";
import authService from "../../infra/services/auth-service";
import { Request, Response } from "../types";

export default function logoutUserController(
  { userRepository }: Repositories,
  jwt: JWT,
) {
  return async (
    request: Request<{ authorization: string }>,
    response: Response,
  ) => {
    const { authorization } = request.headers;
    const service = authService(userRepository());

    const user = jwt.decode(authorization) as { email: string; iat: number };

    await service.logout(String(user.iat), user.email);

    return response.status(200).send();
  };
}
