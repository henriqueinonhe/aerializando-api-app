import { ClassPlan, CreateClassPlan } from "./ClassPlan";

interface ClassPlanRepository {
  findAll: () => Promise<ClassPlan[]>; // TODO: paginate? Maybe
  findById: (id: number) => Promise<ClassPlan>;
  store: (data: Omit<CreateClassPlan, "id">) => Promise<ClassPlan>;
  update: (data: Partial<ClassPlan> & { id: number }) => Promise<ClassPlan>;
  remove: (id: number) => Promise<void>;
}

export { ClassPlanRepository };
