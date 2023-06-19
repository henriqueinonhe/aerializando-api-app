import { ClassPlan } from "../../domain/class-plans/ClassPlan";
import { ClassPlanRepository } from "../../domain/class-plans/ClassPlanRepository";
import { NotFoundError } from "../../errors/custom-errors";

const classPlansService = (repository: ClassPlanRepository) => ({
  store: async (classPlan: Omit<ClassPlan, "id">) => {
    return await repository.store(classPlan);
  },
  update: async (classPlan: Partial<ClassPlan> & { id: number }) => {
    return await repository.update(classPlan);
  },
  findAll: async () => {
    return await repository.findAll();
  },
  findById: async (id: number) => {
    const classPlan = await repository.findById(id);

    if (!classPlan) throw new NotFoundError(`Class Plan ${id} not found`);

    return classPlan;
  },
  remove: async (id: number) => {
    try {
      await repository.remove(id);
    } catch (error: any) {
      if (error.constructor.name === "PrismaClientKnownRequestError")
        throw new NotFoundError(`Class Plan ${id} not found`);

      throw error;
    }
  },
});

export default classPlansService;
