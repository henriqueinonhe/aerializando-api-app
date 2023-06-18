import { ClassPlan } from "../../domain/class-plans/ClassPlan";
import { parseExercises } from "./exercise-parsers";
import { parseTrick } from "./tricks-parsers";

export const parseClassPlan = (
  classPlan: any,
  tricks: any[],
  exerciseBlocsWithExercises: any[]
): ClassPlan => {
  const { tricksIds, exerciseBlocs, ...result } = classPlan;

  return {
    ...result,
    tricks: tricks.map(parseTrick),
    exerciseBlocs: exerciseBlocsWithExercises.map(
      (bloc: { id: number; exercises: any[] }) => ({
        id: bloc.id,
        exercises: parseExercises(bloc.exercises),
      })
    ),
  };
};

export const parseClassPlans = (classPlans: any[]): ClassPlan[] => {
  // return classPlans.map(parseClassPlan);
  return [];
};
