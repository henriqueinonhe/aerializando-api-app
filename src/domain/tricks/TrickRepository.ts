import { Trick, TrickType } from "./Trick";

interface TrickRepository {
  findAll: () => Promise<Trick[]>; // TODO: paginate? Maybe
  findById: (id: number) => Promise<Trick | null>;
  findInBatch: (ids: number[]) => Promise<Trick[]>;
  store: (data: Omit<Trick, "id">) => Promise<Trick>;
  update: (data: Trick) => Promise<Trick>;
  remove: (id: number) => Promise<void>;
}

interface TrickTypeRepository {
  findAll: () => Promise<TrickType[]>;
  store: (data: Omit<TrickType, "id">) => Promise<TrickType>;
}

export { TrickRepository, TrickTypeRepository };
