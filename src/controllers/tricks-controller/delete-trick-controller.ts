import { FastifyReply, FastifyRequest } from "fastify";
import makeTrickRepository from "../../infra/repositories/trick-repository";
import tricksService from "../../infra/services/tricks-service";

export default async function deleteTrickController(
  request: FastifyRequest<{ Params: { id: string } }>,
  response: FastifyReply
) {
  const { id } = request.params;
  const service = tricksService(makeTrickRepository());

  await service.remove(Number(id));

  return response.status(204).send();
}
