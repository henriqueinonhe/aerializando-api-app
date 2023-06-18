import { Repositories } from "../../infra/repositories";
import exercisesService from "../../infra/services/exercises-service";
import { Request, Response } from "../types";

export default function deleteExerciseController({
  exerciseRepository,
}: Repositories) {
  return async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };
    const service = exercisesService(exerciseRepository());

    await service.remove(Number(id));

    return response.status(204).send();
  };
}
