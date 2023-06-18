import { FastifyReply, FastifyRequest } from "fastify";
import makeTrickRepository from "../../infra/repositories/trick-repository";
import tricksService from "../../infra/services/tricks-service";

export default async function findTrickController(
  request: FastifyRequest<{ Params: { id: string } }>,
  response: FastifyReply
) {
  const { id } = request.params;
  const service = tricksService(makeTrickRepository());

  const trick = await service.findById(Number(id));

  return response.status(200).send(trick);
}
