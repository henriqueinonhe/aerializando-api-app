import fastify from "fastify";
import classPlansRoutes from "./controllers/class-plans-controller";
import exercisesRoutes from "./controllers/exercises-controller";
import health from "./controllers/health";
import tricksRoutes from "./controllers/tricks-controller";
import errorsHandler from "./errors/errors-handler";
import repositories from "./infra/repositories";

const build = () => {
  const app = fastify({ logger: true });

  app.get("/health", health);
  app.register(exercisesRoutes(repositories));
  app.register(tricksRoutes(repositories));
  app.register(classPlansRoutes(repositories));

  app.setErrorHandler(function (error, request, reply) {
    errorsHandler(this.log, error, request, reply);
  });

  return app;
};

export default build;
