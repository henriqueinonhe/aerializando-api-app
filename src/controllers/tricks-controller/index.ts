import { FastifyInstance } from "fastify";
import { Repositories } from "../../infra/repositories";
import createTrickController from "./create-trick-controller";
import deleteTrickController from "./delete-trick-controller";
import fetchTricksController from "./fetch-tricks-controller";
import findTrickController from "./find-trick-controller";
import updateTrickController from "./update-trick-controller";
import docs from "./docs";

export default function routes(repositories: Repositories) {
  return async (fastify: FastifyInstance) => {
    fastify.get("/tricks", docs.fetchAll, fetchTricksController(repositories));
    fastify.get(
      "/tricks/:id",
      docs.fetchById,
      findTrickController(repositories)
    );
    fastify.post("/tricks", docs.create, createTrickController(repositories));
    fastify.put("/tricks", docs.update, updateTrickController(repositories));
    fastify.delete(
      "/tricks/:id",
      docs.delete,
      deleteTrickController(repositories)
    );
  };
}
