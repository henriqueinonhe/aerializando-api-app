import { ClassPlan } from "../../domain/class-plans/ClassPlan";

export const parseClassPlan = (
  classPlan: any,
  tricks: any[],
  exerciseBlocsWithExercises: any[]
): ClassPlan => {
  const { tricksIds, exerciseBlocs, ...result } = classPlan;

  return {
    ...result,
    tricks,
    exerciseBlocs: exerciseBlocsWithExercises,
  };
};
