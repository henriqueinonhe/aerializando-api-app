import { Exercise } from './Exercise';

interface ExerciseRepository {
  store: (entry: Omit<Exercise, "id">) => Promise<Exercise>;
  update: (entry: Exercise) => Promise<Exercise>;
  delete: (id: number) => Promise<void>;
  findAll: () => Promise<Exercise[]>; // TODO: paginate? Maybe
}

export { ExerciseRepository };