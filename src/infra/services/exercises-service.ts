import { Exercise } from "../../domain/exercises/Exercise";
import { ExerciseRepository } from "../../domain/exercises/ExerciseRepository";
import { NotFoundError } from "../../errors/custom-errors";
import makeExerciseRepository from "../repositories/exercise-repository";

const exercisesService = (repository: ExerciseRepository = makeExerciseRepository()) => ({
  store: async (exercise: Omit<Exercise, "id">) => {
    return await repository.store(exercise);
  },
  update: async (exercise: Exercise) => {
    return await repository.update(exercise);
  },
  findAll: async () => {
    return await repository.findAll();
  },
  findById: async (id: number) => {
    const exercise = await repository.findById(id);

    if (!exercise) throw new NotFoundError(`Exercise ${id} not found`);

    return exercise;
  },
  remove: async (id: number) => {
    try {
      await repository.remove(id);
    } catch (error: any) {
      if (error.constructor.name === "PrismaClientKnownRequestError")
        throw new NotFoundError(`Exercise ${id} not found`);

      throw error;
    }
  },
});

export default exercisesService;
