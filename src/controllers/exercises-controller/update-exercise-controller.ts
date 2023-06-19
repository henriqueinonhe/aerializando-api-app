import { Repositories } from "../../infra/repositories";
import { exerciseSchema } from "../../infra/schemas/exercise-schema";
import exercisesService from "../../infra/services/exercises-service";
import { Request, Response } from "../types";

export default function updateExerciseController({
  exerciseRepository,
}: Repositories) {
  return async (request: Request, response: Response) => {
    const input = exerciseSchema.parse(request.body);

    const service = exercisesService(exerciseRepository());
    const updatedExercise = await service.update(input);

    return response.status(200).send(updatedExercise);
  };
}
