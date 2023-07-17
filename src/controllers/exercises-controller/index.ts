import { FastifyInstance } from "fastify";
import { Repositories } from "../../infra/repositories";
import createExerciseController from "./create-exercise-controller";
import deleteExerciseController from "./delete-exercise-controller";
import fetchExercisesController from "./fetch-exercises-controller";
import findExerciseController from "./find-exercise-controller";
import updateExerciseController from "./update-exercise-controller";
import docs from "./docs";

export default function routes(repositories: Repositories) {
  return async (fastify: FastifyInstance) => {
    fastify.get(
      "/exercises",
      docs.fetchAll,
      fetchExercisesController(repositories)
    );
    fastify.get(
      "/exercises/:id",
      docs.fetchById,
      findExerciseController(repositories)
    );
    fastify.post(
      "/exercises",
      docs.create,
      createExerciseController(repositories)
    );
    fastify.put(
      "/exercises",
      docs.update,
      updateExerciseController(repositories)
    );
    fastify.delete(
      "/exercises/:id",
      docs.delete,
      deleteExerciseController(repositories)
    );
  };
}
