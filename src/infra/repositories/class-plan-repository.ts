import { Prisma } from "@prisma/client";
import { ClassPlan } from "../../domain/class-plans/ClassPlan";
import { ClassPlanRepository } from "../../domain/class-plans/ClassPlanRepository";
import client from "../db/instance";
import { parseClassPlan } from "../parsers/class-plan-parsers";

const makeClassPlanRepository = (): ClassPlanRepository => {
  const include = {
    exerciseBlocs: { include: { exercises: true } },
    tricks: true,
  } as const;

  const findAll = async (): Promise<ClassPlan[]> => {
    const result = await client.classPlan.findMany({ include });

    return result.map(parseClassPlan.toEntity);
  };

  const findById = async (id: number): Promise<ClassPlan | null> => {
    const classPlan = await client.classPlan.findUnique({
      where: { id },
      include,
    });

    if (!classPlan) return null;

    return parseClassPlan.toEntity(classPlan);
  };

  const store = async (
    classPlan: Omit<ClassPlan, "id">
  ): Promise<ClassPlan> => {
    const { tricks, exerciseBlocs, ...classPlanData } =
      parseClassPlan.toData(classPlan);

    const data: Prisma.ClassPlanCreateInput = {
      ...classPlanData,
      tricks: {
        connect: tricks,
      },
      exerciseBlocs: {
        create: exerciseBlocs.map(({ exercises }) => ({
          exercises: { connect: exercises },
        })),
      },
    };

    const classPlanCreated = await client.classPlan.create({ data, include });

    return parseClassPlan.toEntity(classPlanCreated);
  };

  const update = async (
    classPlan: Partial<ClassPlan> & { id: number }
  ): Promise<ClassPlan> => {
    const { tricks, exerciseBlocs, ...classPlanData } = parseClassPlan.toData(
      classPlan as ClassPlan
    );

    const existentExercisesBlocs = exerciseBlocs?.filter(({ id }) => id);
    const newExercisesBlocs = exerciseBlocs?.filter(({ id }) => !id);

    const data: Prisma.ClassPlanUpdateInput = {
      ...classPlanData,
      ...(tricks ? { tricks: { set: tricks } } : {}),
      ...(exerciseBlocs
        ? {
            exerciseBlocs: {
              update: existentExercisesBlocs?.map(({ id, exercises }) => ({
                where: { id: id },
                data: { exercises: { set: exercises } },
              })),
              create: newExercisesBlocs?.map(({ exercises }) => ({
                exercises: { connect: exercises },
              })),
            },
          }
        : {}),
    };

    const clanPlanUpdated = await client.classPlan.update({
      where: { id: classPlan.id },
      data,
      include,
    });

    return parseClassPlan.toEntity(clanPlanUpdated);
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
