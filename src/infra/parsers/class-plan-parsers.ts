import { ClassPlan } from "../../domain/class-plans/ClassPlan";
import { parseExercises } from "./exercise-parsers";
import { parseTricks } from "./tricks-parsers";

export const parseClassPlan = {
  toData: (classPlan: ClassPlan | Omit<ClassPlan, "id">) => {
    const { tricks, exerciseBlocs, ...classPlanData } = classPlan;

    return {
      ...classPlanData,
      tricks: tricks?.map(({ id }) => ({ id })),
      exerciseBlocs: exerciseBlocs?.map(({ id, exercises }) => ({
        id,
        exercises: exercises.map(({ id }) => ({ id })),
      })),
    };
  },
  toEntity: (classPlan: any): ClassPlan => {
    const { tricks, exerciseBlocs, ...result } = classPlan;

    return {
      ...result,
      tricks: parseTricks(tricks),
      exerciseBlocs: exerciseBlocs.map(
        ({ id, exercises }: { id: number; exercises: any[] }) => ({
          id,
          exercises: parseExercises(exercises),
        })
      ),
    };
  },
};
