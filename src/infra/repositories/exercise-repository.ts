import { Exercise } from "../../domain/exercises/Exercise";
import { ExerciseRepository } from "../../domain/exercises/ExerciseRepository";
import client from "../db/instance";

const makeExerciseRepository = (): ExerciseRepository => ({
  findAll: async (): Promise<Exercise[]> => {
    return (await client.exercise.findMany()) as Exercise[];
  },
  findById: async (id: number): Promise<Exercise> => {
    return (await client.exercise.findUnique({ where: { id } })) as Exercise;
  },
  store: async (exercise: Omit<Exercise, "id">): Promise<Exercise> => {
    return (await client.exercise.create({ data: exercise })) as Exercise;
  },
  update: async (exercise: Exercise): Promise<Exercise> => {
    return (await client.exercise.update({
      where: { id: exercise.id },
      data: exercise,
    })) as Exercise;
  },
  delete: async (id: number): Promise<void> => {
    await client.exercise.delete({ where: { id } });
  },
});

export default makeExerciseRepository;
