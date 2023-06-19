import { FastifyInstance } from "fastify";
import { Repositories } from "../../infra/repositories";
import createClassPlanController from "./create-class-plan-controller";
import fetchClassPlansController from "./fetch-class-plans-controller";
import findClassPlanController from "./find-class-plan-controller";
import updateClassPlanController from "./update-class-plan-controller";
import deleteClassPlanController from "./delete-class-plan-controller";

export default function routes(repositories: Repositories) {
  return async (fastify: FastifyInstance) => {
    fastify.get("/class-plans", fetchClassPlansController(repositories));
    fastify.get("/class-plans/:id", findClassPlanController(repositories));
    fastify.post("/class-plans", createClassPlanController(repositories));
    fastify.put("/class-plans", updateClassPlanController(repositories));
    fastify.delete("/class-plans/:id", deleteClassPlanController(repositories));
  };
}
