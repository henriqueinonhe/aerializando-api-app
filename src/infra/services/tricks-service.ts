import { Trick } from "../../domain/tricks/Trick";
import { TrickRepository } from "../../domain/tricks/TrickRepository";
import { NotFoundError } from "../../errors/custom-errors";
import makeTrickRepository from "../repositories/trick-repository";

const tricksService = (
  repository: TrickRepository = makeTrickRepository()
) => ({
  store: async (trick: Omit<Trick, "id">) => {
    return await repository.store(trick);
  },
  update: async (trick: Trick) => {
    return await repository.update(trick);
  },
  findAll: async () => {
    return await repository.findAll();
  },
  findById: async (id: number) => {
    const trick = await repository.findById(id);

    if (!trick) throw new NotFoundError(`Trick ${id} not found`);

    return trick;
  },
  remove: async (id: number) => {
    try {
      await repository.remove(id);
    } catch (error: any) {
      if (error.constructor.name === "PrismaClientKnownRequestError")
        throw new NotFoundError(`Trick ${id} not found`);

      throw error;
    }
  },
});

export default tricksService;
