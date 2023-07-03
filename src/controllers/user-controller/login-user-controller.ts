import { JWT } from "@fastify/jwt";
import { User } from "../../domain/users/User";
import { Repositories } from "../../infra/repositories";
import { loginSchema } from "../../infra/schemas/user-schema";
import authService from "../../infra/services/auth-service";
import { Request, Response } from "../types";

export default function loginUserController(
  { userRepository }: Repositories,
  jwt: JWT
) {
  return async (request: Request, response: Response) => {
    const { email, password } = loginSchema.parse(request.body);

    const service = authService(userRepository());

    const getAccessToken = (user: Omit<User, "id" | "password" | "salt">) => {
      return jwt.sign(user, { expiresIn: "5m" });
    };

    const accessToken = await service.login(email, password, getAccessToken);

    return response.status(200).send({ accessToken });
  };
}
