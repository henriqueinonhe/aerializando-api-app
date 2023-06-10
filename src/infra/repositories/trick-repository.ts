import { Trick } from "../../domain/tricks/Trick";
import { TrickRepository } from "../../domain/tricks/TrickRepository";
import client from "../db/instance";

const parseTrick = (trick: any): Trick => {
  const { typeId, ...result } = trick;
  return result;
};

const parseTricks = (tricks: any[]): Trick[] => {
  return tricks.map(parseTrick);
};

const makeTrickRepository = (): TrickRepository => ({
  findAll: async (): Promise<Trick[]> => {
    const result = await client.trick.findMany({ include: { type: true } });
    return parseTricks(result);
  },
  findById: async (id: number): Promise<Trick | null> => {
    const result = await client.trick.findUnique({
      where: { id },
      include: { type: true },
    });
    return result ? parseTrick(result) : null;
  },
  store: async (trick: Omit<Trick, "id">): Promise<Trick> => {
    const { type, ...inputTrick } = trick;
    const data = {
      ...inputTrick,
      ...(type.id
        ? { typeId: type.id }
        : { type: { create: { name: type.name } } }),
    };

    const result = await client.trick.create({ data, include: { type: true } });

    return parseTrick(result);
  },
  update: async (trick: Trick): Promise<Trick> => {
    const { type, id, ...inputTrick } = trick;

    const data = {
      ...inputTrick,
      ...(type.id
        ? { typeId: type.id }
        : { type: { update: { name: type.name } } }),
    };

    const result = await client.trick.update({
      where: { id: trick.id },
      data,
      include: { type: true },
    });

    return parseTrick(result);
  },
  delete: async (id: number): Promise<void> => {
    await client.trick.delete({ where: { id } });
  },
});

export default makeTrickRepository;
