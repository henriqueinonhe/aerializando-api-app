import { FastifyInstance } from "fastify";
import { Repositories } from "../../infra/repositories";
import createExerciseController from "./create-exercise-controller";
import deleteExerciseController from "./delete-exercise-controller";
import fetchExercisesController from "./fetch-exercises-controller";
import findExerciseController from "./find-exercise-controller";
import updateExerciseController from "./update-exercise-controller";

export default function routes(repositories: Repositories) {
  return async (fastify: FastifyInstance) => {
    fastify.get("/exercises", fetchExercisesController(repositories));
    fastify.get("/exercises/:id", findExerciseController(repositories));
    fastify.post("/exercises", createExerciseController(repositories));
    fastify.put("/exercises", updateExerciseController(repositories));
    fastify.delete("/exercises/:id", deleteExerciseController(repositories));
  };
}
