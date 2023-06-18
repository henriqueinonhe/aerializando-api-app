import { Trick } from "../../domain/tricks/Trick";
import {
  TrickRepository,
  TrickTypeRepository,
} from "../../domain/tricks/TrickRepository";
import { NotFoundError } from "../../errors/custom-errors";

const tricksService = (trickRepository: TrickRepository) => ({
  store: async (trick: Omit<Trick, "id">) => {
    return await trickRepository.store(trick);
  },
  update: async (trick: Trick) => {
    return await trickRepository.update(trick);
  },
  findAll: async () => {
    return await trickRepository.findAll();
  },
  findById: async (id: number) => {
    const trick = await trickRepository.findById(id);

    if (!trick) throw new NotFoundError(`Trick ${id} not found`);

    return trick;
  },
  remove: async (id: number) => {
    try {
      await trickRepository.remove(id);
    } catch (error: any) {
      if (error.constructor.name === "PrismaClientKnownRequestError")
        throw new NotFoundError(`Trick ${id} not found`);

      throw error;
    }
  },
});

export default tricksService;
