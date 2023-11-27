import { Exercise } from "../../domain/exercises/Exercise";

export const parseExercise = (exercise: any): Exercise => {
  const { exerciseBlocId, ...result } = exercise;
  return result;
};

export const parseExercises = (exercises: any[]): Exercise[] => {
  return exercises.map(parseExercise);
};
