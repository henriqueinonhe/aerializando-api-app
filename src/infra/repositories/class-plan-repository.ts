import { Prisma } from "@prisma/client";
import repositories from ".";
import { ClassPlan } from "../../domain/class-plans/ClassPlan";
import { ClassPlanRepository } from "../../domain/class-plans/ClassPlanRepository";
import { Trick } from "../../domain/tricks/Trick";
import client from "../db/instance";
import { parseClassPlan } from "../parsers/class-plan-parsers";

const makeClassPlanRepository = (): ClassPlanRepository => {
  const findAll = async (): Promise<ClassPlan[]> => {
    const result = await client.classPlan.findMany({
      include: { exerciseBlocs: true },
    });

    const promises = result.map(async (classPlan) => {
      const result = await loadExercisesAndTricks(
        classPlan.tricksIds,
        classPlan.exerciseBlocs
      );

      return parseClassPlan(classPlan, result.tricks, result.exerciseBlocs);
    });

    return await Promise.all(promises);
  };

  const findById = async (id: number): Promise<ClassPlan | null> => {
    const classPlan = await client.classPlan.findUnique({
      where: { id },
      include: { exerciseBlocs: true },
    });

    if (!classPlan) return null;

    const result = await loadExercisesAndTricks(
      classPlan.tricksIds,
      classPlan.exerciseBlocs
    );

    return parseClassPlan(classPlan, result.tricks, result.exerciseBlocs);
  };

  const store = async (
    classPlan: Omit<ClassPlan, "id">
  ): Promise<ClassPlan> => {
    const { tricks, exerciseBlocs, ...input } = classPlan;

    const data = {
      ...input,
      tricksIds: tricks.map(({ id }) => id),
      exerciseBlocs: {
        create: exerciseBlocs.map(({ exercises }) => ({
          exercisesIds: exercises.map(({ id }) => id),
        })),
      },
    };

    const clanPlanCreated = await client.classPlan.create({
      data,
      include: { exerciseBlocs: true },
    });

    const result = await loadExercisesAndTricks(
      clanPlanCreated.tricksIds,
      clanPlanCreated.exerciseBlocs
    );

    return parseClassPlan(clanPlanCreated, result.tricks, result.exerciseBlocs);
  };

  const update = async (
    classPlan: Partial<ClassPlan> & { id: number }
  ): Promise<ClassPlan> => {
    const { tricks, exerciseBlocs, ...input } = classPlan;

    const existentExercisesBlocs = exerciseBlocs?.filter(({ id }) => id);
    const newExercisesBlocs = exerciseBlocs?.filter(({ id }) => !id);

    const data: Prisma.ClassPlanUpdateArgs["data"] = {
      ...input,
      ...(tricks
        ? {
            tricksIds: {
              set: tricks.map(({ id }) => id),
            },
          }
        : {}),
      ...(exerciseBlocs
        ? {
            exerciseBlocs: {
              update: existentExercisesBlocs?.map(({ id, exercises }) => ({
                where: { id: id },
                data: {
                  exercisesIds: {
                    set: exercises.map(({ id }) => id),
                  },
                },
              })),
              create: newExercisesBlocs?.map(({ exercises }) => ({
                exercisesIds: exercises.map(({ id }) => id),
              })),
            },
          }
        : {}),
    };

    const clanPlanUpdated = await client.classPlan.update({
      where: { id: classPlan.id },
      data,
      include: { exerciseBlocs: true },
    });

    const result = await loadExercisesAndTricks(
      clanPlanUpdated.tricksIds,
      clanPlanUpdated.exerciseBlocs
    );

    return parseClassPlan(clanPlanUpdated, result.tricks, result.exerciseBlocs);
  };

  const remove = async (id: number): Promise<void> => {
    await client.classPlan.delete({ where: { id } });
  };

  const loadExercisesAndTricks = async (
    tricksIds: number[],
    exerciseBlocs: any[]
  ): Promise<{
    tricks: Trick[];
    exerciseBlocs: ClassPlan["exerciseBlocs"];
  }> => {
    const tricks = await repositories.trickRepository().findInBatch(tricksIds);
    const promises = exerciseBlocs.map(async ({ id, exercisesIds }) => {
      const exercises = await repositories
        .exerciseRepository()
        .findInBatch(exercisesIds);

      return { id, exercises };
    });
    const exerciseBlocsWithExercises = await Promise.all(promises);

    return { tricks, exerciseBlocs: exerciseBlocsWithExercises };
  };

  return {
    findAll,
    findById,
    store,
    update,
    remove,
  };
};

export default makeClassPlanRepository;
