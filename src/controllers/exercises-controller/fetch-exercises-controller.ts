import { Repositories } from "../../infra/repositories";
import exercisesService from "../../infra/services/exercises-service";
import { Request, Response } from "../types";

export default function fetchExercisesController({
  exerciseRepository,
}: Repositories) {
  return async (_: Request, response: Response) => {
    const service = exercisesService(exerciseRepository());

    const exercises = await service.findAll();

    return response.status(200).send(exercises);
  };
}
