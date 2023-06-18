import { Prisma } from "@prisma/client";
import { ClassPlan } from "../../domain/class-plans/ClassPlan";
import { ClassPlanRepository } from "../../domain/class-plans/ClassPlanRepository";
import client from "../db/instance";
import { parseClassPlan, parseClassPlans } from "../parsers/class-plan-parsers";

const loadExercisesAndTricks = async (
  tricksIds: number[],
  exerciseBlocs: any[]
): Promise<{ tricks: any[]; exerciseBlocs: any[] }> => {
  const tricks =
    (await client.$queryRaw`SELECT * FROM "Trick" WHERE "id" IN (${Prisma.join(
      tricksIds
    )});`) as any[];
  const promises = exerciseBlocs.map(async ({ id, exercisesIds }) => {
    const dbExercises =
      await client.$queryRaw`SELECT * FROM "Exercise" WHERE "id" IN (${Prisma.join(
        exercisesIds
      )});`;

    return {
      id,
      exercises: dbExercises,
    };
  });
  const exerciseBlocsWithExercises = await Promise.all(promises);

  return { tricks, exerciseBlocs: exerciseBlocsWithExercises };
};

const makeClassPlanRepository = (): ClassPlanRepository => {
  const findAll = async (): Promise<ClassPlan[]> => {
    const result = await client.classPlan.findMany({});

    return parseClassPlans(result);
  };

  const findById = async (id: number): Promise<ClassPlan> => {
    const result = await client.classPlan.findUnique({ where: { id } });

    return {} as ClassPlan;
    // return parseClassPlan(result);
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

  return {
    findAll,
    findById,
    store,
    update,
    remove,
  };
};

export default makeClassPlanRepository;
