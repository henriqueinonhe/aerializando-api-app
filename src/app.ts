import jwt from "@fastify/jwt";
import fastify from "fastify";
import classPlansRoutes from "./controllers/class-plans-controller";
import exercisesRoutes from "./controllers/exercises-controller";
import healthController from "./controllers/health-controller";
import tricksRoutes from "./controllers/tricks-controller";
import { Request, Response } from "./controllers/types";
import userRoutes from "./controllers/user-controller";
import errorsHandler from "./errors/errors-handler";
import repositories from "./infra/repositories";
import authenticate from "./middleware/authenticate";

const build = () => {
  const app = fastify({ logger: true });

  app.register(jwt, { secret: process.env.JWT_SECRET as string });

  app.register(userRoutes(repositories));

  app.get("/health", healthController);
  app.register(exercisesRoutes(repositories));
  app.register(tricksRoutes(repositories));
  app.register(classPlansRoutes(repositories));

  app.addHook(
    "onRequest",
    async function (request: Request, response: Response) {
      await authenticate(this.jwt, repositories, request, response);
    }
  );

  app.setErrorHandler(function (error, request, reply) {
    errorsHandler(this.log, error, request, reply);
  });

  return app;
};

export default build;
