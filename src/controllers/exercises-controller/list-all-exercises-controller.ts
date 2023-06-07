import { FastifyReply, FastifyRequest } from "fastify";
import makeExerciseRepository from "../../infra/repositories/exercise-repository";
import exercisesService from "../../infra/services/exercises-service";

export default async function listAllExercisesController(_: FastifyRequest, response: FastifyReply) {
  const service = exercisesService(makeExerciseRepository());

  const exercises = await service.findAll();

  return response.status(200).send(exercises);
}