import { FastifyInstance } from "fastify";
import { Repositories } from "../../infra/repositories";
import createTrickController from "./create-trick-controller";
import deleteTrickController from "./delete-trick-controller";
import fetchTricksController from "./fetch-tricks-controller";
import findTrickController from "./find-trick-controller";
import updateTrickController from "./update-trick-controller";

export default function routes(repositories: Repositories) {
  return async (fastify: FastifyInstance) => {
    fastify.get("/tricks", fetchTricksController(repositories));
    fastify.get("/tricks/:id", findTrickController(repositories));
    fastify.post("/tricks", createTrickController(repositories));
    fastify.put("/tricks", updateTrickController(repositories));
    fastify.delete("/tricks/:id", deleteTrickController(repositories));
  };
}
