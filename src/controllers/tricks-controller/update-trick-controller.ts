import { FastifyReply, FastifyRequest } from "fastify";
import makeTrickRepository from "../../infra/repositories/trick-repository";
import { trickSchema } from "../../infra/schemas/trick-schema";
import tricksService from "../../infra/services/tricks-service";

export default async function updateTrickController(request: FastifyRequest, response: FastifyReply) {
  const input = trickSchema.parse(request.body);

  const service = tricksService(makeTrickRepository());
  const updatedTrick = await service.update(input);

  return response.status(200).send(updatedTrick);
}