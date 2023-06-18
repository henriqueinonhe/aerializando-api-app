import { FastifyReply, FastifyRequest } from "fastify";
import makeTrickRepository from "../../infra/repositories/trick-repository";
import tricksService from "../../infra/services/tricks-service";

export default async function fetchTricksController(_: FastifyRequest, response: FastifyReply) {
  const service = tricksService(makeTrickRepository());

  const tricks = await service.findAll();

  return response.status(200).send(tricks);
}