import { FastifyReply, FastifyRequest } from "fastify";
import makeTrickRepository from "../../infra/repositories/trick-repository";
import { createTrickSchema } from "../../infra/schemas/trick-schema";
import tricksService from "../../infra/services/tricks-service";

export default async function createTrickController(request: FastifyRequest, response: FastifyReply) {
  const input = createTrickSchema.parse(request.body);

  const service = tricksService(makeTrickRepository());
  const newTrick = await service.store(input);

  return response.status(201).send(newTrick);
}