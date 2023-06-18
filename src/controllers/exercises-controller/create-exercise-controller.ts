import { Repositories } from "../../infra/repositories";
import { createExerciseSchema } from "../../infra/schemas/exercise-schema";
import exercisesService from "../../infra/services/exercises-service";
import { Request, Response } from "../types";

export default function createExerciseController({
  exerciseRepository,
}: Repositories) {
  return async (request: Request, response: Response) => {
    const input = createExerciseSchema.parse(request.body);

    const service = exercisesService(exerciseRepository());
    const newExercise = await service.store(input);

    return response.status(201).send(newExercise);
  };
}
