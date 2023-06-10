import { Trick, TrickType } from "./Trick";

interface TrickRepository {
  findAll: () => Promise<Trick[]>; // TODO: paginate? Maybe
  findById: (id: number) => Promise<Trick | null>;
  store: (data: Omit<Trick, "id">) => Promise<Trick>;
  update: (data: Trick) => Promise<Trick>;
  delete: (id: number) => Promise<void>;
}

interface TrickTypeRepository {
  findAll: () => Promise<TrickType[]>;
  store: (data: Omit<TrickType, "id">) => Promise<TrickType>;
}

export { TrickRepository, TrickTypeRepository };
