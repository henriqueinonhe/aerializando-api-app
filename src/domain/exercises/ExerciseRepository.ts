import { Exercise } from "./Exercise";

interface ExerciseRepository {
  findAll: () => Promise<Exercise[]>; // TODO: paginate? Maybe
  findById: (id: number) => Promise<Exercise>;
  store: (data: Omit<Exercise, "id">) => Promise<Exercise>;
  update: (data: Exercise) => Promise<Exercise>;
  delete: (id: number) => Promise<void>;
}

export { ExerciseRepository };
