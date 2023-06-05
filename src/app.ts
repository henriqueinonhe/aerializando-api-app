import fastify from "fastify";
import health from "./controllers/health";
import exercisesRoutes from "./controllers/exercises-controller";
import errorsHandler from "./errors/errorsHandler";

const build = () => {
  // Declare a route
  const app = fastify({ logger: true });

  app.get("/health", health);
  app.register(exercisesRoutes);

  app.setErrorHandler(function (error, request, reply) {
    errorsHandler(this.log, error, request, reply);
  });

  return app;
};

export default build;
