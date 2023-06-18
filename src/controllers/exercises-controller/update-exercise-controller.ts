import { FastifyReply, FastifyRequest } from "fastify";
import makeExerciseRepository from "../../infra/repositories/exercise-repository";
import { exerciseSchema } from "../../infra/schemas/exercise-schema";
import exercisesService from "../../infra/services/exercises-service";

export default async function updateExerciseController(request: FastifyRequest, response: FastifyReply) {
  const input = exerciseSchema.parse(request.body);

  const service = exercisesService(makeExerciseRepository());
  const updatedExercise = await service.update(input);

  return response.status(200).send(updatedExercise);
}