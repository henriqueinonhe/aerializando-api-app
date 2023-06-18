import { Repositories } from "../../infra/repositories";
import exercisesService from "../../infra/services/exercises-service";
import { Request, Response } from "../types";

export default function findExerciseController({
  exerciseRepository,
}: Repositories) {
  return async (request: Request, response: Response) => {
    const { id } = request.params;
    const service = exercisesService(exerciseRepository());

    const exercise = await service.findById(Number(id));

    return response.status(200).send(exercise);
  };
}
