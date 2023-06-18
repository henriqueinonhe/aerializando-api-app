import { FastifyReply, FastifyRequest } from "fastify";
import makeExerciseRepository from "../../infra/repositories/exercise-repository";
import exercisesService from "../../infra/services/exercises-service";

export default async function deleteExerciseController(
  request: FastifyRequest<{ Params: { id: string } }>,
  response: FastifyReply
) {
  const { id } = request.params as { id: string };
  const service = exercisesService(makeExerciseRepository());

  await service.remove(Number(id));

  return response.status(204).send();
}
