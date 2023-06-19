import { Exercise } from "./Exercise";

interface ExerciseRepository {
  findAll: () => Promise<Exercise[]>; // TODO: paginate? Maybe
  findInBatch: (ids: number[]) => Promise<Exercise[]>;
  findById: (id: number) => Promise<Exercise | null>;
  store: (data: Omit<Exercise, "id">) => Promise<Exercise>;
  update: (data: Exercise) => Promise<Exercise>;
  remove: (id: number) => Promise<void>;
}

export { ExerciseRepository };
