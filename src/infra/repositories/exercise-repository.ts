import { Exercise } from "../../domain/exercises/Exercise";
import { ExerciseRepository } from "../../domain/exercises/ExerciseRepository";
import client from "../db/instance";
import { parseExercise, parseExercises } from "../parsers/exercise-parsers";

const makeExerciseRepository = (): ExerciseRepository => ({
  findAll: async (): Promise<Exercise[]> => {
    const result = await client.exercise.findMany();
    return parseExercises(result);
  },
  findInBatch: async (ids: number[]): Promise<Exercise[]> => {
    const result = await client.exercise.findMany({ where: { id: { in: ids } } });
    return parseExercises(result);
  },
  findById: async (id: number): Promise<Exercise | null> => {
    const result = await client.exercise.findUnique({ where: { id } });
    return result ? parseExercise(result) : null;
  },
  store: async (exercise: Omit<Exercise, "id">): Promise<Exercise> => {
    const result = await client.exercise.create({ data: exercise });
    return parseExercise(result);
  },
  update: async (exercise: Exercise): Promise<Exercise> => {
    const result = await client.exercise.update({
      where: { id: exercise.id },
      data: exercise,
    });
    return parseExercise(result);
  },
  remove: async (id: number): Promise<void> => {
    await client.exercise.delete({ where: { id } });
  },
});

export default makeExerciseRepository;
