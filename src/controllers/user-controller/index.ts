import { FastifyInstance } from "fastify";
import { Repositories } from "../../infra/repositories";
import loginUserController from "./login-user-controller";
import logoutUserController from "./logout-user-controller";
import registerUserController from "./register-user-controller";
import docs from "./docs";

export default function routes(repositories: Repositories) {
  return async (fastify: FastifyInstance) => {
    fastify.post(
      "/user/register",
      docs.register,
      registerUserController(repositories),
    );
    fastify.post(
      "/user/login",
      docs.login,
      loginUserController(repositories, fastify.jwt),
    );
    fastify.post(
      "/user/logout",
      docs.logout,
      logoutUserController(repositories, fastify.jwt),
    );
  };
}
