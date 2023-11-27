import { Repositories } from "../../infra/repositories";
import { createUserSchema } from "../../infra/schemas/user-schema";
import userService from "../../infra/services/users-service";
import { Request, Response } from "../types";

export default function registerUserController({
  userRepository,
}: Repositories) {
  return async (request: Request, response: Response) => {
    const payload = createUserSchema.parse(request.body);

    const service = userService(userRepository());

    await service.store(payload);

    return response
      .status(201)
      .send({ message: `User ${payload.name} created` });
  };
}
