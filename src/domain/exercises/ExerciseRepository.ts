import { Exercise } from './Exercise';

interface ExerciseRepository {
  store: (data: Omit<Exercise, "id">) => Promise<Exercise>;
  update: (data: Exercise) => Promise<Exercise>;
  delete: (id: number) => Promise<void>;
  findAll: () => Promise<Exercise[]>; // TODO: paginate? Maybe
}

export { ExerciseRepository };