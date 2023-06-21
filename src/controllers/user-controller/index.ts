import { FastifyInstance } from "fastify";
import { Repositories } from "../../infra/repositories";
import loginUserController from "./login-user-controller";
import registerUserController from "./register-user-controller";

export default function routes(repositories: Repositories) {
  return async (fastify: FastifyInstance) => {
    fastify.post("/user/register", registerUserController(repositories));
    fastify.post("/user/login", loginUserController(repositories, fastify.jwt));
  };
}
