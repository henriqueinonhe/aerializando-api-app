import { TrickType } from "../../domain/tricks/Trick";
import { TrickTypeRepository } from "../../domain/tricks/TrickRepository";
import client from "../db/instance";

const makeTrickTypeRepository = (): TrickTypeRepository => ({
  findAll: async (): Promise<TrickType[]> => {
    return (await client.trickType.findMany()) as TrickType[];
  },
  store: async (trickType: Omit<TrickType, "id">): Promise<TrickType> => {
    return (await client.trickType.create({ data: trickType })) as TrickType;
  },
  
});

export default makeTrickTypeRepository;
