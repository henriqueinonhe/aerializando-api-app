import { Exercise } from "../../domain/exercises/Exercise";
import { ExerciseRepository } from "../../domain/exercises/ExerciseRepository";

const exercisesService = (repository: ExerciseRepository) => ({
  store: async (exercise: Omit<Exercise, "id">) => {
    return await repository.store(exercise);
  },
  update: async (exercise: Exercise) => {
    return await repository.update(exercise);
  },
  findAll: async () => {
    return await repository.findAll();
  },
});

export default exercisesService;
