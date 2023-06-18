import { FastifyReply, FastifyRequest } from "fastify";
import makeExerciseRepository from "../../infra/repositories/exercise-repository";
import { createExerciseSchema } from "../../infra/schemas/exercise-schema";
import exercisesService from "../../infra/services/exercises-service";

export default async function createExerciseController(request: FastifyRequest, response: FastifyReply) {
  const input = createExerciseSchema.parse(request.body);

  const service = exercisesService(makeExerciseRepository());
  const newExercise = await service.store(input);

  return response.status(201).send(newExercise);
}