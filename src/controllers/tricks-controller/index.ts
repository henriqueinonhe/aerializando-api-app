import { FastifyInstance } from "fastify";

export default async function routes(fastify: FastifyInstance) {
  fastify.get("/tricks", () => {});
  fastify.get("/tricks/:id", () => {});
  fastify.post("/tricks", () => {});
  fastify.put("/tricks", () => {});
  fastify.delete("/tricks/:id", () => {});
}
