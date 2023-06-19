import { Exercise } from "../../../src/domain/exercises/Exercise";
import repositories from "../../../src/infra/repositories";
import { ExerciseTypes } from "../../../src/infra/schemas/exercise-schema";

export const getExercises = async (): Promise<Exercise[]> => {
  const repository = repositories.exerciseRepository();

  return [
    await repository.store({
      name: "Exercise 1",
      type: ExerciseTypes.STRETCHING_AND_WARM_UP,
    }),
    await repository.store({
      name: "Exercise 2",
      type: ExerciseTypes.STRETCHING_AND_WARM_UP,
    }),
  ];
};
