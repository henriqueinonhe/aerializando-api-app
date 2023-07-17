import jwt from "@fastify/jwt";
import fastify from "fastify";
import classPlansRoutes from "./controllers/class-plans-controller";
import exercisesRoutes from "./controllers/exercises-controller";
import healthRoute from "./controllers/health-controller";
import tricksRoutes from "./controllers/tricks-controller";
import { Request, Response } from "./controllers/types";
import userRoutes from "./controllers/user-controller";
import errorsHandler from "./errors/errors-handler";
import repositories from "./infra/repositories";
import authenticate from "./middleware/authenticate";
import appEnv from "./env";

const build = () => {
  const app = fastify({ logger: true });
  app.register(require("@fastify/swagger"), {});
  app.register(require("@fastify/swagger-ui"), {
    routePrefix: "/docs",
    swagger: {
      info: {
        title: "Aerializando API Documentation",
        description: "Aerializando API Documentation description",
        version: "1.0.0",
      },
      host: "127.0.0.1:3000", // WHAT?
      basePath: "",
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
      default: false,
    },
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (req: Request, res: Response, next: Function) {
        next();
      },
      preHandler: function (req: Request, res: Response, next: Function) {
        next();
      },
    },
    staticCSP: false,
    transformStaticCSP: (header: any) => header,
    transformSpecification: (
      swaggerObject: object,
      req: Request,
      res: Response
    ) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  app.ready((err: any) => {
    if (err) throw err;
    (app as any).swagger();
  });

  app.register(healthRoute);
  app.register(jwt, { secret: appEnv.jwtSecret as string });
  app.register(userRoutes(repositories));
  app.register(exercisesRoutes(repositories));
  app.register(tricksRoutes(repositories));
  app.register(classPlansRoutes(repositories));

  app.addHook(
    "onRequest",
    async function (request: Request, response: Response) {
      if (appEnv.useAuth)
        await authenticate(this.jwt, repositories, request, response);
    }
  );

  app.setErrorHandler(function (error, request, reply) {
    errorsHandler(this.log, error, request, reply);
  });

  return app;
};

export default build;
