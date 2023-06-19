import { ClassPlan } from "./ClassPlan";

interface ClassPlanRepository {
  findAll: () => Promise<ClassPlan[]>; // TODO: paginate? Maybe
  findById: (id: number) => Promise<ClassPlan | null>;
  store: (data: Omit<ClassPlan, "id">) => Promise<ClassPlan>;
  update: (data: Partial<ClassPlan> & { id: number }) => Promise<ClassPlan>;
  remove: (id: number) => Promise<void>;
}

export { ClassPlanRepository };
