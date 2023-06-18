import { FastifyInstance } from "fastify";
import createTrickController from "./create-trick-controller";
import deleteTrickController from "./delete-trick-controller";
import fetchTricksController from "./fetch-tricks-controller";
import findTrickController from "./find-trick-controller";
import updateTrickController from "./update-trick-controller";

export default async function routes(fastify: FastifyInstance) {
  fastify.get("/tricks", fetchTricksController);
  fastify.get("/tricks/:id", findTrickController);
  fastify.post("/tricks", createTrickController);
  fastify.put("/tricks", updateTrickController);
  fastify.delete("/tricks/:id", deleteTrickController);
}
